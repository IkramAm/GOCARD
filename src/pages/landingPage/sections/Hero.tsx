import { useEffect, useState, type CSSProperties } from 'react';
import { Header } from '../../../components/layout/Header';
import Card3D from '../../../components/ui/Card3D';
import styles from './Hero.module.css';

export function Hero() {
  const partners = ['APEX VENTURES', 'CLOUDSYNC', 'DIGITAL EDGE', 'NEXGEN', 'VELOCITY', 'PRISMA LABS'];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener('change', updateIsMobile);

    return () => {
      mediaQuery.removeEventListener('change', updateIsMobile);
    };
  }, []);

  return (
    <section className={styles.section} data-reveal>
      <Header />
      <div className={styles.heroContent}>
        {/* Partie gauche - Texte */}
        <div className={`${styles.leftBlock} reveal-item`}>
          <h1 className={`${styles.headline1} reveal-item`}>Un tap.</h1>
          <h2 className={`${styles.headline2} reveal-item`} style={{ '--reveal-delay': '80ms' } as CSSProperties}>Un impact infini.</h2>
          <p className={`${styles.description} reveal-item`} style={{ '--reveal-delay': '140ms' } as CSSProperties}>
            La carte NFC intelligente la plus premium au monde. Un tap et toute votre identité professionnelle — CV, portfolio, réseaux — s'affiche instantanément sur n'importe quel téléphone. Aucune application requise.
          </p>
          {isMobile && (
            <div className={`${styles.mobileCardBlock} reveal-item`} style={{ '--reveal-delay': '180ms' } as CSSProperties}>
              <div className={`${styles.card3d} landing-float`}>
                <Card3D />
              </div>
            </div>
          )}
          <div className={`${styles.buttonsRow} reveal-item`} style={{ '--reveal-delay': '220ms' } as CSSProperties}>
            <a href="#pricing" className={styles.btnPrimary}>
              Obtenez votre carte
            </a>
            <a href="#how-it-works" className={styles.btnSecondary}>
              comment ça marche
            </a>
          </div>
          <div className={`${styles.stats} reveal-item`} style={{ '--reveal-delay': '300ms' } as CSSProperties}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>50K+</span>
              <span className={styles.statLabel}>Cartes expédiées</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>2M+</span>
              <span className={styles.statLabel}>Connexions créées</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>4.9★</span>
              <span className={styles.statLabel}>Note utilisateurs</span>
            </div>
          </div>
        </div>
        {!isMobile && (
          <div className={`${styles.rightBlock} reveal-item`} style={{ '--reveal-delay': '220ms' } as CSSProperties}>
            <div className={`${styles.card3d} landing-float`}>
              <Card3D />
            </div>
          </div>
        )}
      </div>

      <div className={`${styles.partnersBar} reveal-item`} style={{ '--reveal-delay': '380ms' } as CSSProperties} aria-label="Ils nous font confiance">
        <div className={styles.partnersInner}>
          {partners.map((name) => (
            <span key={name} className={styles.partnerItem}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
