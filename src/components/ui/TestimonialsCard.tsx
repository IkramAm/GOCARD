import styles from './TestimonialsCard.module.css';

export interface TestimonialsCardProps {
  quote: string;
  name: string;
  role: string;
  avatarSrc: string;
  avatarAlt?: string;
  rating?: number;
  className?: string;
}

function StarIcon() {
  return (
    <svg
      className={styles.star}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 0.2L10.07 4.42L14.7 5.1L11.35 8.37L12.14 13L8 10.82L3.86 13L4.65 8.37L1.3 5.1L5.93 4.42L8 0.2Z"
        fill="url(#testimonialStarGradient)"
      />
      <defs>
        <linearGradient
          id="testimonialStarGradient"
          x1="1.3"
          y1="6.6"
          x2="14.7"
          y2="6.6"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F5C542" />
          <stop offset="1" stopColor="#F5A925" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function TestimonialsCard({
  quote,
  name,
  role,
  avatarSrc,
  avatarAlt,
  rating = 5,
  className,
}: TestimonialsCardProps) {
  const safeRating = Math.min(5, Math.max(0, Math.round(rating)));

  return (
    <article className={`${styles.cardWrapper} ${className ?? ''}`.trim()}>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.stars} aria-label={`${safeRating} sur 5`}>
            {Array.from({ length: safeRating }).map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>

          <p className={styles.quote}>"{quote}"</p>
        </div>

        <footer className={styles.author}>
          <img
            className={styles.avatar}
            src={avatarSrc}
            alt={avatarAlt ?? `Photo de ${name}`}
            loading="lazy"
          />
          <div className={styles.authorText}>
            <p className={styles.name}>{name}</p>
            <p className={styles.role}>{role}</p>
          </div>
        </footer>
      </div>
    </article>
  );
}
