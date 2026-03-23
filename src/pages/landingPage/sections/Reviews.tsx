import TestimonialsCard from '../../../components/ui/TestimonialsCard';
import styles from './Reviews.module.css';

const REVIEWS = [
  {
    quote:
      "The analytics alone are worth it. I know exactly who's viewing my profile and how they found me. Game changer for lead gen.",
    name: 'Ali Hraich',
    role: 'VP of Marketing, DigitalEdge',
    avatarSrc: 'https://i.pravatar.cc/64?img=12',
  },
  {
    quote:
      "The analytics alone are worth it. I know exactly who's viewing my profile and how they found me. Game changer for lead gen.",
    name: 'Ali Hraich',
    role: 'VP of Marketing, DigitalEdge',
    avatarSrc: 'https://i.pravatar.cc/64?img=12',
  },
  {
    quote:
      "The analytics alone are worth it. I know exactly who's viewing my profile and how they found me. Game changer for lead gen.",
    name: 'Ali Hraich',
    role: 'VP of Marketing, DigitalEdge',
    avatarSrc: 'https://i.pravatar.cc/64?img=12',
  },
];

export function Reviews() {
  return (
    <section
      className={styles.section}
      id="reviews"
      aria-labelledby="reviews-heading"
    >
      <div className={styles.textBlock}>
        <p className={styles.label}>TRUSTED BY LEADERS</p>
        <h2 id="reviews-heading" className={styles.title}>
          They Tapped. They Conquered.
        </h2>
        <p className={styles.subtitle}>
          Join thousands of professionals who&apos;ve upgraded how they connect.
        </p>
      </div>

      <div className={styles.cards}>
        {REVIEWS.map((review, index) => (
          <TestimonialsCard
            key={index}
            quote={review.quote}
            name={review.name}
            role={review.role}
            avatarSrc={review.avatarSrc}
            rating={5}
          />
        ))}
      </div>
    </section>
  );
}
