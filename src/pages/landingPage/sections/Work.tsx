import styles from './Work.module.css';

export function Work() {
  return (
    <section className={styles.section} id="comment" aria-labelledby="work-heading">
      <div className={styles.textBlock}>
        <p className={styles.label}>HOW IT WORKS</p>
        <h2 id="work-heading" className={styles.title}>See It in Action</h2>
        <p className={styles.subtitle}>
          The world's most premium NFC smart card. Tap once and your entire professional identity — CV, portfolio, socials
        </p>
      </div>

      <div className={styles.videoWrapper}>
        <div className={styles.videoPlaceholder}>
          <button type="button" className={styles.playButton} aria-label="Play video">
            <span className={styles.playInner} aria-hidden="true">
              <span className={styles.playTriangle} aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>

      <div className={styles.thumbnails}>
        <div className={styles.thumbnail} />
        <div className={styles.thumbnail} />
        <div className={styles.thumbnail} />
      </div>
    </section>
  );
}
