import type { ReactNode } from 'react';
import styles from './PrincingCard.module.css';

export interface PrincingCardProps {
  /** Nom du plan (ex: "Basic") */
  planName: string;
  /** Prix actuel (ex: "190dh") */
  price: string;
  /** Ancien prix barré, optionnel (ex: "290 dh") */
  oldPrice?: string;
  /** Badge au-dessus de la carte (ex: "MOST POPULAR") */
  badgeLabel?: string;
  /** Aperçu carte: "default" = GoCard, "logo" = YOUR LOGO */
  cardPreviewVariant?: 'default' | 'logo';
  /** Nom affiché sur la carte GoCard (ex: "YOUR NAME") */
  cardName?: string;
  /** Titre / job affiché sur la carte (ex: "AND HERE YOUR JOB TITLE") */
  cardTitle?: string;
  /** Liste des avantages / features */
  features: string[];
  /** Texte du bouton (ex: "Acheter Basic") */
  buttonText: string;
  /** Style du bouton: "primary" = blanc pill, "dark" = sombre 7px (ex. Personnalisez votre carte) */
  buttonVariant?: 'primary' | 'dark';
  /** Icône optionnelle dans le bouton (ex. crayon) */
  buttonIcon?: ReactNode;
  /** Texte de livraison sous le bouton (ex: "livraison en 1 à 2 jours") */
  deliveryText?: string;
  /** Callback au clic sur le bouton */
  onBuy?: () => void;
}

export default function PrincingCard({
  planName,
  price,
  oldPrice,
  badgeLabel,
  cardPreviewVariant = 'default',
  cardName,
  cardTitle,
  features,
  buttonText,
  buttonVariant = 'primary',
  buttonIcon,
  deliveryText,
  onBuy,
}: PrincingCardProps) {
  const isDarkButton = buttonVariant === 'dark';
  const cardContent = (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h3 className={styles.planName}>{planName}</h3>
          <div className={styles.priceBlock}>
            <p className={styles.price}>{price}</p>
            {oldPrice != null && (
              <span className={styles.oldPriceBadge}>{oldPrice}</span>
            )}
          </div>
        </header>

        <div className={styles.cardPreview}>
          <div className={styles.cardPreviewContent}>
            {cardPreviewVariant === 'logo' ? (
              <div className={styles.cardPreviewLogoPlaceholder}>YOUR LOGO</div>
            ) : (
              <div className={styles.cardPreviewLogo}>GoCard</div>
            )}
            <p className={styles.cardPreviewName}>{cardName ?? 'YOUR NAME'}</p>
            <p className={styles.cardPreviewTitle}>
              {cardTitle ?? 'AND HERE YOUR JOB TITLE'}
            </p>
          </div>
        </div>

        <div className={styles.featuresBlock}>
          {features.map((feature, i) => (
            <p key={i} className={styles.featureItem}>
              ✦ {feature}
            </p>
          ))}
        </div>

        <div className={styles.buttonWrapper}>
          <div
            className={
              isDarkButton ? styles.buttonOuterDark : styles.buttonOuter
            }
          >
            <button
              type="button"
              className={isDarkButton ? styles.buttonDark : styles.button}
              onClick={onBuy}
            >
              {buttonIcon}
              {buttonText}
            </button>
          </div>
          {deliveryText != null && (
            <p className={styles.deliveryText}>{deliveryText}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.cardOuter}>
      {badgeLabel != null && (
        <span className={styles.badge}>
          <span className={styles.badgeStar}>✦</span>
          <span className={styles.badgeLabel}>{badgeLabel}</span>
        </span>
      )}
      {cardContent}
    </div>
  );
}
