import { useState, type FormEvent } from 'react';
import { Header } from '../../../components/layout/Header';
import CustomCardPreview from '../../../components/ui/CustomCardPreview';
import { ThankYouPage } from '../thank-you/ThankYouPage';
import styles from './DetailsPage.module.css';

export function DetailsPage() {
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);

  const handlePlaceOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsThankYouOpen(true);
  };

  return (
    <section className={styles.page}>
      <Header />

      <div className={styles.content}>
        <div className={styles.previewBlock}>
          <CustomCardPreview showIdentity />
        </div>

        <div className={styles.formBlock}>
          <h1 className={styles.title}>Entrez vos informations</h1>
          <p className={styles.description}>
            Nous imprimerons et expédierons votre carte à l'adresse ci-dessous
          </p>

          <form className={styles.form} onSubmit={handlePlaceOrder}>
            <div className={styles.twoColumnRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.formFieldLabel} htmlFor="full-name">
                  Nom complet
                </label>
                <input id="full-name" className={styles.input} placeholder="Ali Hraich" />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.formFieldLabel} htmlFor="company-name">
                  Nom de l'entreprise
                </label>
                <input id="company-name" className={styles.input} placeholder="VR BOOST AGENCY" />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.formFieldLabel} htmlFor="shipping-address">
                Adresse de livraison
              </label>
              <input id="shipping-address" className={styles.input} placeholder="TECHNOPARK CASABLANCA, MAROC" />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.formFieldLabel} htmlFor="phone-number">
                Numéro de téléphone
              </label>
              <input id="phone-number" className={styles.input} placeholder="+ 212 06 00 29 62 21" />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.formFieldLabel} htmlFor="email-address">
                Email
              </label>
              <input id="email-address" type="email" className={styles.input} placeholder="contact@vrboostagency.com" />
            </div>

            <button type="submit" className={styles.placeOrderButton}>
              Passer la commande
            </button>
          </form>
        </div>
      </div>

      <ThankYouPage isOpen={isThankYouOpen} onClose={() => setIsThankYouOpen(false)} />
    </section>
  );
}
