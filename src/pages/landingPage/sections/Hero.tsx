import { Header } from '../../../components/layout/Header';
import Card3D from '../../../components/ui/Card3D';
import styles from './Hero.module.css';

export function Hero() {
  const partners = ['APEX VENTURES', 'CLOUDSYNC', 'DIGITAL EDGE', 'NEXGEN', 'VELOCITY', 'PRISMA LABS'];

  return (
    <section className={styles.section}>
      <Header />
      <div className={styles.heroContent}>
        {/* Partie gauche - Texte */}
        <div className={styles.leftBlock}>
          <h1 className={styles.headline1}>Un tap.</h1>
          <h2 className={styles.headline2}>Un impact infini.</h2>
          <p className={styles.description}>
            La carte NFC intelligente la plus premium au monde. Un tap et toute votre identité professionnelle — CV, portfolio, réseaux — s'affiche instantanément sur n'importe quel téléphone. Aucune application requise.
          </p>
          <div className={styles.buttonsRow}>
            <a href="#obtenez" className={styles.btnPrimary}>
              Obtenez votre carte
            </a>
            <a href="#comment" className={styles.btnSecondary}>
              comment ça marche
            </a>
          </div>
          <div className={styles.stats}>
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
        {/* Partie droite - Carte */}
        <div className={styles.rightBlock}>
          <div className={styles.card3d}>
            <Card3D />
          </div>
        </div>
      </div>

      <div className={styles.partnersBar} aria-label="Ils nous font confiance">
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
