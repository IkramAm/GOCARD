import ContactCard from '../../../components/ui/ContactCard'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-heading">
      <div className={styles.textBlock}>
        <p className={styles.label}>CONNECT</p>
        <h2 id="contact-heading" className={styles.title}>
          Get in Touch.
        </h2>
        <p className={styles.subtitle}>
          Have questions or need a custom solution for your team? Our experts are here to help
          you own every introduction.
        </p>
      </div>

      <ContactCard />
    </section>
  )
}
