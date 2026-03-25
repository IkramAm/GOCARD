import TestimonialsCard from '../../../components/ui/TestimonialsCard';
import styles from './Reviews.module.css';

const REVIEWS = [
  {
    quote:
      "Les analyses a elles seules valent le coup. Je sais exactement qui consulte mon profil et comment ils m'ont trouve. Un vrai game changer pour la generation de leads.",
    name: 'Ali Hraich',
    role: 'VP Marketing, DigitalEdge',
    avatarSrc: 'https://i.pravatar.cc/64?img=12',
  },
  {
    quote:
      "Les analyses a elles seules valent le coup. Je sais exactement qui consulte mon profil et comment ils m'ont trouve. Un vrai game changer pour la generation de leads.",
    name: 'Ali Hraich',
    role: 'VP Marketing, DigitalEdge',
    avatarSrc: 'https://i.pravatar.cc/64?img=12',
  },
  {
    quote:
      "Les analyses a elles seules valent le coup. Je sais exactement qui consulte mon profil et comment ils m'ont trouve. Un vrai game changer pour la generation de leads.",
    name: 'Ali Hraich',
    role: 'VP Marketing, DigitalEdge',
    avatarSrc: 'https://i.pravatar.cc/64?img=12',
  },
];

export function Reviews() {
  return (
    <section
      className={styles.section}
      id="reviews"
      aria-labelledby="reviews-heading"
      data-reveal
    >
      <div className={`${styles.textBlock} reveal-item`}>
        <p className={`${styles.label} reveal-item`}>ILS NOUS FONT CONFIANCE</p>
        <h2 id="reviews-heading" className={`${styles.title} reveal-item`}>
          Ils ont scanne. Ils ont reussi.
        </h2>
        <p className={`${styles.subtitle} reveal-item`}>
          Rejoignez des milliers de professionnels qui ont ameliore leur facon de creer des contacts.
        </p>
      </div>

      <div className={`${styles.cards} reveal-item`}>
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
