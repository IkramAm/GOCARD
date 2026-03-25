import PrincingCard from '../../../components/ui/PrincingCard';
import styles from './Pricing.module.css';

const SHARED_FEATURES = [
  'Couleurs personnalisees — Noir, Blanc ou Argent',
  'Votre logo grave au laser sur la carte',
  'Page de profil en marque blanche',
  'Activation double NFC + QR code',
  'Blocs sociaux et liens illimites',
  'Analyses avancees + capture de leads',
  'Production et livraison prioritaires',
];

function PencilIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

export function Pricing() {
  return (
    <section
      className={styles.section}
      id="pricing"
      aria-labelledby="pricing-heading"
      data-reveal
    >
      <div className={`${styles.textBlock} reveal-item`}>
        <p className={`${styles.label} reveal-item`}>TARIFS</p>
        <h2 id="pricing-heading" className={`${styles.title} reveal-item`}>
          Choisissez votre carte.
        </h2>
        <p className={`${styles.subtitle} reveal-item`}>
          Paiement unique. Aucun abonnement. Expedition sous 48 h
        </p>
      </div>

      <div className={`${styles.cards} reveal-item`}>
        <PrincingCard
          planName="Basic"
          price="190dh"
          oldPrice="290 dh"
          cardPreviewVariant="default"
          features={SHARED_FEATURES}
          buttonText="Acheter Basic"
          deliveryText="livraison en 1 à 2 jours"
          onBuy={() => {
            window.location.href = '/costumize/details';
          }}
        />
        <PrincingCard
          planName="Personnalisée"
          price="290dh"
          oldPrice="370 dh"
          badgeLabel="LE PLUS POPULAIRE"
          cardPreviewVariant="logo"
          features={SHARED_FEATURES}
          buttonText="Personnalisez votre carte"
          buttonVariant="dark"
          buttonIcon={<PencilIcon />}
          deliveryText="livraison en 1 à 2 jours"
          onBuy={() => {
            window.location.href = '/costumize';
          }}
        />
      </div>
    </section>
  );
}
