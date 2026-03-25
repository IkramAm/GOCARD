import ContactCard from '../../../components/ui/ContactCard'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-heading" data-reveal>
      <div className={`${styles.textBlock} reveal-item`}>
        <p className={`${styles.label} reveal-item`}>CONTACT</p>
        <h2 id="contact-heading" className={`${styles.title} reveal-item`}>
          Prenez contact.
        </h2>
        <p className={`${styles.subtitle} reveal-item`}>
          Vous avez des questions ou besoin d'une solution sur mesure pour votre equipe ? Nos experts
          sont la pour vous aider a reussir chaque prise de contact.
        </p>
      </div>

      <div className="reveal-item">
        <ContactCard />
      </div>
    </section>
  )
}
