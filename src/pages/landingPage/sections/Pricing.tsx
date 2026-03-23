import PrincingCard from '../../../components/ui/PrincingCard';
import styles from './Pricing.module.css';

const SHARED_FEATURES = [
  'Custom colors — Black, White, or Silver',
  'Your logo laser-etched on the card',
  'White-label profile page',
  'NFC + QR code dual activation',
  'Unlimited social & link blocks',
  'Advanced analytics + lead capture',
  'Priority production + shipping',
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
    >
      <div className={styles.textBlock}>
        <p className={styles.label}>PRICING</p>
        <h2 id="pricing-heading" className={styles.title}>
          Choose Your Card.
        </h2>
        <p className={styles.subtitle}>
          One-time payment. No subscriptions. Ships in 48h
        </p>
      </div>

      <div className={styles.cards}>
        <PrincingCard
          planName="Basic"
          price="190dh"
          oldPrice="290 dh"
          cardPreviewVariant="default"
          features={SHARED_FEATURES}
          buttonText="Acheter Basic"
          deliveryText="livraison en 1 à 2 jours"
          onBuy={() => {}}
        />
        <PrincingCard
          planName="Personnalisée"
          price="290dh"
          oldPrice="370 dh"
          badgeLabel="MOST POPULAR"
          cardPreviewVariant="logo"
          features={SHARED_FEATURES}
          buttonText="Personnalisez votre carte"
          buttonVariant="dark"
          buttonIcon={<PencilIcon />}
          deliveryText="livraison en 1 à 2 jours"
          onBuy={() => {}}
        />
      </div>
    </section>
  );
}
