import { useEffect } from 'react';
import styles from './ThankYouPage.module.css';

type ThankYouPageProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ThankYouPage({ isOpen, onClose }: ThankYouPageProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Confirmation de commande">
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div className={styles.modal}>
        <article className={`${styles.card} ${styles.cardCompact}`} aria-label="Confirmation de commande">
          <div className={styles.checkIconPlacement}>
            <div className={styles.checkIcon} aria-hidden="true">
              <svg viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8.3L8.3 13L21 2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <h1 className={styles.title}>Commande confirmée</h1>
          <p className={styles.description}>
            Merci pour votre commande. Votre Gocard est en cours de préparation et sera expédiée bientôt.
          </p>

          <div className={styles.summaryCard}>
            <div className={styles.summaryHeaderRow}>
              <span>Forfait</span>
              <span>Basique</span>
            </div>
            <div className={styles.separator} />

            <div className={styles.detailsColumns}>
              <div className={styles.detailsColumn}>
                <span>Nom</span>
                <span>Entreprise</span>
                <span>Livraison à</span>
                <span>Téléphone</span>
                <span>Email</span>
              </div>
              <div className={styles.detailsColumn}>
                <span>Nom</span>
                <span>Entreprise</span>
                <span>Livraison à</span>
                <span>Téléphone</span>
                <span>Email</span>
              </div>
            </div>
          </div>

          <p className={styles.deliveryNote}>
            <span className={styles.deliveryIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7.5H14V15.5H3V7.5Z" stroke="currentColor" strokeWidth="1.6" />
                <path d="M14 10H18.4L21 12.7V15.5H14V10Z" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="8" cy="17" r="1.6" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.5" cy="17" r="1.6" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
            <span className={styles.deliveryText}>Votre carte sera expédiée sous 3 à 5 jours ouvrés.</span>
          </p>

          <button type="button" className={styles.backButton} onClick={() => (window.location.href = '/')}>
            Retour à Gocard
          </button>
        </article>
      </div>
    </div>
  );
}
