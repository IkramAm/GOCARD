import styles from './Work.module.css';

export function Work() {
  return (
    <section className={styles.section} id="how-it-works" aria-labelledby="work-heading" data-reveal>
      <div className={`${styles.textBlock} reveal-item`}>
        <p className={`${styles.label} reveal-item`}>COMMENT CA MARCHE</p>
        <h2 id="work-heading" className={`${styles.title} reveal-item`}>Voyez-le en action</h2>
        <p className={`${styles.subtitle} reveal-item`}>
          La carte NFC intelligente la plus premium au monde. Touchez une seule fois et toute votre identite professionnelle — CV, portfolio, reseaux sociaux
        </p>
      </div>

      <div className={`${styles.videoWrapper} reveal-item`}>
        <div className={`${styles.videoPlaceholder} landing-sheen`}>
          <button type="button" className={styles.playButton} aria-label="Lire la video">
            <span className={styles.playInner} aria-hidden="true">
              <span className={styles.playTriangle} aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>

      <div className={`${styles.thumbnails} reveal-item`}>
        <div className={`${styles.thumbnail} landing-hover-lift`} />
        <div className={`${styles.thumbnail} landing-hover-lift`} />
        <div className={`${styles.thumbnail} landing-hover-lift`} />
      </div>
    </section>
  );
}
