import styles from './ContactCard.module.css'

export default function ContactCard() {
  return (
    <article className={styles.card}>
      <form className={styles.form} aria-label="Contact form">
        <div className={styles.twoColumns}>
          <div className={styles.fieldGroup}>
            <label htmlFor="full-name" className={styles.label}>
              Nom complet :
            </label>
            <input
              id="full-name"
              name="fullName"
              type="text"
              className={styles.input}
              placeholder="Ali Hraich"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>
              Email :
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="Ali Hraich"
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="phone" className={styles.label}>
            Telephone:
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={styles.input}
            placeholder="+212 00000000"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="you-are" className={styles.label}>
            You are:
          </label>
          <div className={styles.selectWrapper}>
            <select id="you-are" name="youAre" className={styles.select} defaultValue="Individual">
              <option value="Individual">Individual</option>
              <option value="Business">Business</option>
              <option value="Agency">Agency</option>
            </select>
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="reason" className={styles.label}>
            Reason:
          </label>
          <div className={styles.selectWrapper}>
            <select id="reason" name="reason" className={styles.select} defaultValue="Business">
              <option value="Business">Business</option>
              <option value="Partnership">Partnership</option>
              <option value="Support">Support</option>
            </select>
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="message" className={styles.label}>
            Message :
          </label>
          <textarea id="message" name="message" className={styles.textarea} />
        </div>

        <button type="submit" className={styles.submitButton}>
          Send Message
        </button>
      </form>
    </article>
  )
}
