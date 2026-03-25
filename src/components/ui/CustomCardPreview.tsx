import styles from './CustomCardPreview.module.css';

export type CardColor = 'black' | 'white' | 'gold';

/** Ancienne fonctionnalite : placement libre (desactive pour revenir au rendu original). */
export type CardElementZone =
  | 'center'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'topCenter'
  | 'bottomCenter';

export interface LogoVisualProfile {
  luminance: number;
  saturation: number;
  aspectRatio: number;
}

export interface CustomCardPreviewProps {
  logoUrl?: string | null;
  logoProfile?: LogoVisualProfile | null;
  useMonochromeLogo?: boolean;
  cardName?: string;
  jobTitle?: string;
  companyName?: string;
  cardColor?: CardColor;
  showLogo?: boolean;
  showCardName?: boolean;
  showJobTitle?: boolean;
  showCompanyName?: boolean;
  // Props de placement libre (desactivees => ignorées)
  logoZone?: CardElementZone;
  companyZone?: CardElementZone;
  cardNameZone?: CardElementZone;
  jobTitleZone?: CardElementZone;
  showIdentity?: boolean;
  className?: string;
}

const getLogoToneClass = (cardColor: CardColor, logoProfile: LogoVisualProfile | null | undefined) => {
  if (!logoProfile) {
    return '';
  }

  const { luminance, saturation } = logoProfile;

  if (cardColor === 'black') {
    if (luminance < 0.44) {
      return styles.logoOnDarkCard;
    }

    return styles.logoNeutralTone;
  }

  if (cardColor === 'white') {
    if (luminance > 0.68 && saturation < 0.5) {
      return styles.logoOnLightCard;
    }

    return styles.logoNeutralTone;
  }

  if (luminance < 0.38 || (luminance > 0.78 && saturation < 0.45)) {
    return styles.logoOnGoldCard;
  }

  return styles.logoNeutralTone;
};

const getLogoSizeClass = (logoProfile: LogoVisualProfile | null | undefined) => {
  if (!logoProfile) {
    return styles.logoFrameDefault;
  }

  const { aspectRatio } = logoProfile;

  if (aspectRatio >= 2.6) {
    return styles.logoFrameWide;
  }

  if (aspectRatio <= 1.15) {
    return styles.logoFrameTall;
  }

  if (aspectRatio <= 1.7) {
    return styles.logoFrameSquare;
  }

  return styles.logoFrameDefault;
};

export default function CustomCardPreview({
  logoUrl,
  logoProfile,
  useMonochromeLogo = false,
  cardName = 'VOTRE NOM',
  jobTitle = 'VOTRE POSTE',
  companyName = 'NOM ENTREPRISE',
  cardColor = 'black',
  showLogo = true,
  showCardName = true,
  showJobTitle = true,
  showCompanyName = false,
  showIdentity = true,
  className,
}: CustomCardPreviewProps) {
  const rootClassName = [styles.wrapper, className].filter(Boolean).join(' ');

  const cardClassName = [styles.card, styles[cardColor]].join(' ');
  const logoClass = getLogoToneClass(cardColor, logoProfile);
  const logoSizeClass = getLogoSizeClass(logoProfile);
  const shouldUseDarkTextOnGold = useMonochromeLogo && cardColor === 'gold';

  const placeholderAutoColorClass = useMonochromeLogo
    ? cardColor === 'black'
      ? styles.logoPlaceholderAutoLight
      : styles.logoPlaceholderAutoDark
    : '';

  const shouldShowIdentity = showIdentity && (showCardName || showJobTitle);

  return (
    <div className={rootClassName}>
      {/* LIGHT BACKGROUND */}
      <div className={styles.bgGlow} />

      <div className={cardClassName}>
        {/* REFLECTION */}
        <div className={styles.light} />

        {showCompanyName ? (
          <div
            className={[
              styles.companyTop,
              shouldUseDarkTextOnGold ? styles.companyTopDarkOnGold : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <p className={styles.company}>{companyName}</p>
          </div>
        ) : null}

        {/* CENTER LOGO */}
        {showLogo && (
          <div className={styles.centerLogo}>
            {logoUrl ? (
              <div className={[styles.logoFrame, logoSizeClass].join(' ')}>
                {useMonochromeLogo ? (
                  <div
                    className={[
                      styles.logoMask,
                      cardColor === 'black' ? styles.logoMaskWhite : styles.logoMaskDark,
                    ].join(' ')}
                    style={{
                      WebkitMaskImage: `url(${logoUrl})`,
                      maskImage: `url(${logoUrl})`,
                    }}
                    aria-label="Logo entreprise"
                  />
                ) : (
                  <img
                    src={logoUrl}
                    className={[styles.logo, logoClass].filter(Boolean).join(' ')}
                    alt="Logo entreprise"
                  />
                )}
              </div>
            ) : (
              <span
                className={[
                  styles.logoPlaceholder,
                  placeholderAutoColorClass,
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                GoCard
              </span>
            )}
          </div>
        )}

        {/* IDENTITY */}
        {shouldShowIdentity ? (
          <div
            className={[
              styles.identity,
              shouldUseDarkTextOnGold ? styles.identityDarkOnGold : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {showCardName ? <p className={styles.name}>{cardName}</p> : null}
            {showJobTitle ? <p className={styles.role}>{jobTitle}</p> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
