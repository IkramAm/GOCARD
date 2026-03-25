import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Header } from '../../../components/layout/Header';
import CustomCardPreview, {
  type LogoVisualProfile,
} from '../../../components/ui/CustomCardPreview';
import styles from './CostumizePage.module.css';

const ALLOWED_LOGO_TYPES = new Set(['image/png', 'image/webp', 'image/jpeg', 'image/jpg']);

const validateLogoHasTransparency = (file: File): Promise<boolean> =>
  new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const sourceWidth = image.naturalWidth || image.width;
      const sourceHeight = image.naturalHeight || image.height;
      const maxSampleSize = 240;
      const scale = Math.min(1, maxSampleSize / Math.max(sourceWidth, sourceHeight));
      const width = Math.max(1, Math.floor(sourceWidth * scale));
      const height = Math.max(1, Math.floor(sourceHeight * scale));

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext('2d', { willReadFrequently: true });

      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Canvas context unavailable'));
        return;
      }

      context.drawImage(image, 0, 0, width, height);

      const { data } = context.getImageData(0, 0, width, height);
      let hasTransparentPixel = false;

      for (let alphaIndex = 3; alphaIndex < data.length; alphaIndex += 4) {
        if (data[alphaIndex] < 250) {
          hasTransparentPixel = true;
          break;
        }
      }

      URL.revokeObjectURL(objectUrl);
      resolve(hasTransparentPixel);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Unable to read image'));
    };

    image.src = objectUrl;
  });

const removeSolidBackground = (file: File): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const width = image.naturalWidth || image.width;
      const height = image.naturalHeight || image.height;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext('2d', { willReadFrequently: true });

      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Canvas context unavailable'));
        return;
      }

      context.drawImage(image, 0, 0, width, height);

      const { data } = context.getImageData(0, 0, width, height);
      const cornerSampleSize = Math.max(1, Math.floor(Math.min(width, height) * 0.08));
      const cornerColors: Array<[number, number, number]> = [];
      const corners = [
        [0, 0],
        [width - cornerSampleSize, 0],
        [0, height - cornerSampleSize],
        [width - cornerSampleSize, height - cornerSampleSize],
      ] as const;

      for (const [cornerX, cornerY] of corners) {
        let r = 0;
        let g = 0;
        let b = 0;
        let count = 0;

        for (let y = Math.max(0, cornerY); y < Math.min(height, cornerY + cornerSampleSize); y += 1) {
          for (let x = Math.max(0, cornerX); x < Math.min(width, cornerX + cornerSampleSize); x += 1) {
            const index = (y * width + x) * 4;
            r += data[index];
            g += data[index + 1];
            b += data[index + 2];
            count += 1;
          }
        }

        cornerColors.push([r / count, g / count, b / count]);
      }

      const backgroundColor: [number, number, number] = [
        (cornerColors[0][0] + cornerColors[1][0] + cornerColors[2][0] + cornerColors[3][0]) / 4,
        (cornerColors[0][1] + cornerColors[1][1] + cornerColors[2][1] + cornerColors[3][1]) / 4,
        (cornerColors[0][2] + cornerColors[1][2] + cornerColors[2][2] + cornerColors[3][2]) / 4,
      ];

      const colorDistance = (r: number, g: number, b: number) =>
        Math.sqrt(
          (r - backgroundColor[0]) * (r - backgroundColor[0]) +
            (g - backgroundColor[1]) * (g - backgroundColor[1]) +
            (b - backgroundColor[2]) * (b - backgroundColor[2]),
        );

      const hardThreshold = 48;
      const softThreshold = 82;

      for (let index = 0; index < data.length; index += 4) {
        const distance = colorDistance(data[index], data[index + 1], data[index + 2]);

        if (distance <= hardThreshold) {
          data[index + 3] = 0;
          continue;
        }

        if (distance < softThreshold) {
          const ratio = (distance - hardThreshold) / (softThreshold - hardThreshold);
          data[index + 3] = Math.round(data[index + 3] * ratio);
        }
      }

      context.putImageData(new ImageData(data, width, height), 0, 0);

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(objectUrl);

        if (!blob) {
          reject(new Error('Failed to export transparent image'));
          return;
        }

        resolve(blob);
      }, 'image/png');
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Unable to read image'));
    };

    image.src = objectUrl;
  });

const trimTransparentArea = (file: File): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const width = image.naturalWidth || image.width;
      const height = image.naturalHeight || image.height;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext('2d', { willReadFrequently: true });

      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Canvas context unavailable'));
        return;
      }

      context.drawImage(image, 0, 0, width, height);
      const sourceImageData = context.getImageData(0, 0, width, height);
      const { data } = sourceImageData;

      const alphaThreshold = 8;
      let minX = width;
      let minY = height;
      let maxX = -1;
      let maxY = -1;

      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const alpha = data[(y * width + x) * 4 + 3];
          if (alpha <= alphaThreshold) {
            continue;
          }

          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        }
      }

      if (maxX < minX || maxY < minY) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('No non-transparent pixels found'));
        return;
      }

      const contentWidth = maxX - minX + 1;
      const contentHeight = maxY - minY + 1;
      const margin = Math.max(2, Math.round(Math.max(contentWidth, contentHeight) * 0.04));

      const trimmedX = Math.max(0, minX - margin);
      const trimmedY = Math.max(0, minY - margin);
      const trimmedWidth = Math.min(width - trimmedX, contentWidth + margin * 2);
      const trimmedHeight = Math.min(height - trimmedY, contentHeight + margin * 2);

      const trimmedCanvas = document.createElement('canvas');
      trimmedCanvas.width = trimmedWidth;
      trimmedCanvas.height = trimmedHeight;

      const trimmedContext = trimmedCanvas.getContext('2d');
      if (!trimmedContext) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Trim canvas context unavailable'));
        return;
      }

      trimmedContext.putImageData(
        context.getImageData(trimmedX, trimmedY, trimmedWidth, trimmedHeight),
        0,
        0,
      );

      trimmedCanvas.toBlob((blob) => {
        URL.revokeObjectURL(objectUrl);

        if (!blob) {
          reject(new Error('Failed to export trimmed image'));
          return;
        }

        resolve(blob);
      }, 'image/png');
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Unable to read image'));
    };

    image.src = objectUrl;
  });

const analyzeLogoVisualProfile = (file: File): Promise<LogoVisualProfile> =>
  new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const sourceWidth = image.naturalWidth || image.width;
      const sourceHeight = image.naturalHeight || image.height;
      const maxSampleSize = 260;
      const scale = Math.min(1, maxSampleSize / Math.max(sourceWidth, sourceHeight));
      const width = Math.max(1, Math.floor(sourceWidth * scale));
      const height = Math.max(1, Math.floor(sourceHeight * scale));

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d', { willReadFrequently: true });

      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Canvas context unavailable'));
        return;
      }

      context.drawImage(image, 0, 0, width, height);
      const { data } = context.getImageData(0, 0, width, height);

      let sampledPixels = 0;
      let luminanceSum = 0;
      let saturationSum = 0;

      for (let index = 0; index < data.length; index += 4) {
        const alpha = data[index + 3];
        if (alpha < 12) {
          continue;
        }

        const r = data[index] / 255;
        const g = data[index + 1] / 255;
        const b = data[index + 2] / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const saturation = max === 0 ? 0 : (max - min) / max;

        luminanceSum += luminance;
        saturationSum += saturation;
        sampledPixels += 1;
      }

      URL.revokeObjectURL(objectUrl);

      const aspectRatio = sourceHeight > 0 ? sourceWidth / sourceHeight : 1;

      if (sampledPixels === 0) {
        resolve({
          luminance: 0.5,
          saturation: 0.5,
          aspectRatio,
        });
        return;
      }

      resolve({
        luminance: luminanceSum / sampledPixels,
        saturation: saturationSum / sampledPixels,
        aspectRatio,
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Unable to read image'));
    };

    image.src = objectUrl;
  });

export function CostumizePage() {
  const [cardName, setCardName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoProfile, setLogoProfile] = useState<LogoVisualProfile | null>(null);
  const [useMonochromeLogo, setUseMonochromeLogo] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [showCardName, setShowCardName] = useState(true);
  const [showJobTitle, setShowJobTitle] = useState(true);
  const [showCompanyName, setShowCompanyName] = useState(false);
  const [logoError, setLogoError] = useState('');
  const [logoNotice, setLogoNotice] = useState('');
  const [selectedColor, setSelectedColor] = useState<'black' | 'white' | 'gold'>('black');

  useEffect(() => {
    return () => {
      if (logoUrl) {
        URL.revokeObjectURL(logoUrl);
      }
    };
  }, [logoUrl]);

  const handleLogoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!ALLOWED_LOGO_TYPES.has(selectedFile.type)) {
      setLogoError('Formats autorisés : PNG, WEBP, JPEG.');
      setLogoNotice('');
      setLogoProfile(null);
      setLogoUrl((previousLogoUrl) => {
        if (previousLogoUrl) {
          URL.revokeObjectURL(previousLogoUrl);
        }
        return null;
      });
      event.target.value = '';
      return;
    }

    try {
      const hasTransparency = await validateLogoHasTransparency(selectedFile);

      if (!hasTransparency) {
        const transparentBlob = await removeSolidBackground(selectedFile);
        const trimmedBlob = await trimTransparentArea(
          new File([transparentBlob], 'logo-transparent.png', { type: 'image/png' }),
        );
        const processedFile = new File([trimmedBlob], 'logo-processed.png', { type: 'image/png' });
        const processedUrl = URL.createObjectURL(processedFile);
        const profile = await analyzeLogoVisualProfile(processedFile);
        setLogoError('');
        setLogoNotice('Fond détecté puis retiré automatiquement.');
        setLogoProfile(profile);
        setLogoUrl((previousLogoUrl) => {
          if (previousLogoUrl) {
            URL.revokeObjectURL(previousLogoUrl);
          }
          return processedUrl;
        });
        event.target.value = '';
        return;
      }

      const trimmedExistingTransparentBlob = await trimTransparentArea(selectedFile);
      const processedFile = new File([trimmedExistingTransparentBlob], 'logo-trimmed.png', {
        type: 'image/png',
      });
      const processedUrl = URL.createObjectURL(processedFile);
      const profile = await analyzeLogoVisualProfile(processedFile);
      setLogoError('');
      setLogoNotice('');
      setLogoProfile(profile);
      setLogoUrl((previousLogoUrl) => {
        if (previousLogoUrl) {
          URL.revokeObjectURL(previousLogoUrl);
        }
        return processedUrl;
      });
      event.target.value = '';
      return;
    } catch {
      setLogoError('Impossible de traiter ce logo automatiquement. Essayez un PNG transparent.');
      setLogoNotice('');
      setLogoProfile(null);
      event.target.value = '';
      return;
    }

    setLogoError('');
    setLogoNotice('');
  };

  const handleContinueToDetails = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = '/costumize/details';
  };

  return (
    <section className={styles.page}>
      <Header />

      <div className={styles.content}>
        <div className={styles.previewBlock}>
          <CustomCardPreview
            logoUrl={logoUrl}
            logoProfile={logoProfile}
            useMonochromeLogo={useMonochromeLogo}
            cardName={cardName || 'VOTRE NOM'}
            jobTitle={jobTitle || 'VOTRE POSTE'}
            companyName={companyName || 'NOM ENTREPRISE'}
            cardColor={selectedColor}
            showLogo={showLogo}
            showCardName={showCardName}
            showJobTitle={showJobTitle}
            showCompanyName={showCompanyName}
            showIdentity
          />
        </div>

        <div className={styles.formBlock}>
          <h1 className={styles.title}>Personnalisez votre carte</h1>
          <p className={styles.description}>
            La carte NFC intelligente la plus premium au monde. Touchez une fois pour partager toute
            votre identité professionnelle
          </p>

          <form className={styles.form} onSubmit={handleContinueToDetails}>
            <div className={styles.formFieldRow}>
              <label className={styles.formFieldRowLabel} htmlFor="card-name">
                Nom sur la carte :
              </label>
              <label className={styles.inlineCheckboxLabel} htmlFor="toggle-show-name">
                <input
                  id="toggle-show-name"
                  type="checkbox"
                  className={styles.inlineCheckboxInput}
                  checked={showCardName}
                  onChange={(event) => setShowCardName(event.target.checked)}
                />
                <span className={styles.inlineCheckboxText}>Afficher</span>
              </label>
            </div>
            <input
              id="card-name"
              className={styles.input}
              placeholder="Ali Hraich"
              value={cardName}
              onChange={(event) => setCardName(event.target.value)}
              disabled={!showCardName}
            />

            <div className={styles.formFieldRow}>
              <label className={styles.formFieldRowLabel} htmlFor="job-title">
                Poste :
              </label>
              <label className={styles.inlineCheckboxLabel} htmlFor="toggle-show-job">
                <input
                  id="toggle-show-job"
                  type="checkbox"
                  className={styles.inlineCheckboxInput}
                  checked={showJobTitle}
                  onChange={(event) => setShowJobTitle(event.target.checked)}
                />
                <span className={styles.inlineCheckboxText}>Afficher</span>
              </label>
            </div>
            <input
              id="job-title"
              className={styles.input}
              placeholder="Ali Hraich"
              value={jobTitle}
              onChange={(event) => setJobTitle(event.target.value)}
              disabled={!showJobTitle}
            />

            <div className={styles.formFieldRow}>
              <label className={styles.formFieldRowLabel} htmlFor="company-name">
                Nom d&apos;entreprise :
              </label>
              <label className={styles.inlineCheckboxLabel} htmlFor="toggle-show-company">
                <input
                  id="toggle-show-company"
                  type="checkbox"
                  className={styles.inlineCheckboxInput}
                  checked={showCompanyName}
                  onChange={(event) => setShowCompanyName(event.target.checked)}
                />
                <span className={styles.inlineCheckboxText}>Afficher</span>
              </label>
            </div>
            <input
              id="company-name"
              className={styles.input}
              placeholder="GoCard Agency"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              disabled={!showCompanyName}
            />

            <div className={styles.formFieldRow}>
              <span className={styles.formFieldRowLabel}>Logo :</span>
              <label className={styles.inlineCheckboxLabel} htmlFor="toggle-show-logo">
                <input
                  id="toggle-show-logo"
                  type="checkbox"
                  className={styles.inlineCheckboxInput}
                  checked={showLogo}
                  onChange={(event) => setShowLogo(event.target.checked)}
                />
                <span className={styles.inlineCheckboxText}>Afficher</span>
              </label>
            </div>

            <label
              htmlFor="logo-upload"
              className={`${styles.uploadArea} ${!showLogo ? styles.uploadAreaDisabled : ''}`}
            >
              <input
                id="logo-upload"
                type="file"
                className={styles.hiddenInput}
                accept="image/png,image/jpeg,image/gif,image/webp"
                onChange={handleLogoUpload}
                disabled={!showLogo}
              />
              <span className={styles.uploadContent}>
                <span className={styles.uploadIconBox}>
                  <svg
                    className={styles.uploadIcon}
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M4 6.8V2.2" stroke="white" strokeWidth="1" strokeLinecap="round" />
                    <path d="M2.4 3.8L4 2.2L5.6 3.8" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1.6 6.8H6.4" stroke="white" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </span>
                <span className={styles.uploadMainText}>Déposez votre logo ou parcourez</span>
                <span className={styles.uploadHintText}>PNG, WEBP ou JPEG (fond retiré auto)</span>
              </span>
            </label>
            {logoError ? <p className={styles.logoError}>{logoError}</p> : null}
            {logoNotice ? <p className={styles.logoNotice}>{logoNotice}</p> : null}
            <label className={styles.toggleRow} htmlFor="auto-logo-color">
              <span className={styles.toggleText}>Coloration logo auto selon la carte</span>
              <span className={styles.toggleControl}>
                <input
                  id="auto-logo-color"
                  type="checkbox"
                  className={styles.toggleInput}
                  checked={useMonochromeLogo}
                  onChange={(event) => setUseMonochromeLogo(event.target.checked)}
                  disabled={!showLogo}
                />
                <span className={styles.toggleTrack} aria-hidden="true">
                  <span className={styles.toggleThumb} />
                </span>
              </span>
            </label>

            <p className={styles.label}>Couleur de la carte :</p>
            <div className={styles.colorGrid}>
              <button
                type="button"
                className={`${styles.colorOption} ${selectedColor === 'black' ? styles.colorOptionSelected : ''}`}
                onClick={() => setSelectedColor('black')}
                aria-pressed={selectedColor === 'black'}
              >
                <span className={`${styles.colorSwatch} ${styles.blackSwatch}`} />
                NOIR
              </button>
              <button
                type="button"
                className={`${styles.colorOption} ${selectedColor === 'white' ? styles.colorOptionSelected : ''}`}
                onClick={() => setSelectedColor('white')}
                aria-pressed={selectedColor === 'white'}
              >
                <span className={`${styles.colorSwatch} ${styles.whiteSwatch}`} />
                BLANC
              </button>
              <button
                type="button"
                className={`${styles.colorOption} ${selectedColor === 'gold' ? styles.colorOptionSelected : ''}`}
                onClick={() => setSelectedColor('gold')}
                aria-pressed={selectedColor === 'gold'}
              >
                <span className={`${styles.colorSwatch} ${styles.goldSwatch}`} />
                OR
              </button>
            </div>

            <button type="submit" className={styles.continueButton}>
              Continuer vers les détails
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
