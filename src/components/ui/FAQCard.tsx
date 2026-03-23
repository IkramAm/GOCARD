import { useId, useState } from 'react'
import styles from './FAQCard.module.css'

export interface FAQCardProps {
  question: string
  answer: string
  defaultOpen?: boolean
}

export default function FAQCard({
  question,
  answer,
  defaultOpen = false,
}: FAQCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const answerId = useId()

  return (
    <article className={styles.card} data-open={isOpen}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <span className={styles.question}>{question}</span>
        <span className={styles.iconCircle} aria-hidden>
          <span className={isOpen ? styles.iconClose : styles.iconPlus} />
        </span>
      </button>

      {isOpen && (
        <p id={answerId} className={styles.answer}>
          {answer}
        </p>
      )}
    </article>
  )
}
