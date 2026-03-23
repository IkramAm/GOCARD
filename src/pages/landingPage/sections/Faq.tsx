import FAQCard from '../../../components/ui/FAQCard'
import styles from './Faq.module.css'

const FAQ_ITEMS = [
  {
    question: 'Does the other person need an app?',
    answer:
      'No. GoCard uses NFC technology built into 99% of modern smartphones. They tap your card and your profile opens instantly in their browser. No app, no setup - it just works.',
  },
  {
    question: 'Can I edit my profile after sharing my card?',
    answer:
      'Yes. You can update links, contact info, and content anytime from your dashboard, and changes appear instantly everywhere your card is used.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes. We ship worldwide with tracking. Delivery timing depends on your destination and selected shipping method.',
  },
  {
    question: 'Can I add my company logo and colors?',
    answer:
      'Absolutely. You can personalize your card design with your brand identity and keep a professional, consistent look.',
  },
  {
    question: 'What if I lose my card?',
    answer:
      'You can deactivate the lost card and activate a replacement while keeping your existing profile and links.',
  },
]

export function Faq() {
  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-heading">
      <div className={styles.textBlock}>
        <p className={styles.label}>QUESTIONS</p>
        <h2 id="faq-heading" className={styles.title}>
          Clear Answers.
        </h2>
        <p className={styles.subtitle}>
          Everything you need to know about stepping up your networking game.
        </p>
      </div>

      <div className={styles.cards}>
        {FAQ_ITEMS.map((item, index) => (
          <FAQCard
            key={item.question + index}
            question={item.question}
            answer={item.answer}
            defaultOpen={index === 0}
          />
        ))}
      </div>
    </section>
  )
}
