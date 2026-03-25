import styles from './Profile.module.css'
import verifiedBadgeIcon from '../../../assets/icons/verified-badge-profile-icon-png 1.png'

const socialLinks = [
  { label: 'Facebook', iconClass: 'fi fi-brands-facebook' },
  { label: 'WhatsApp', iconClass: 'fi fi-brands-whatsapp' },
  { label: 'LinkedIn', iconClass: 'fi fi-brands-linkedin' },
  { label: 'Twitter', iconClass: 'fi fi-brands-twitter' },
  { label: 'Skype', iconClass: 'fi fi-brands-skype' },
]

export function ProfileSidebar() {
  const products = [
    { title: 'Indoor Navigation', subtitle: 'This is a small description about The service or Product .' },
    { title: 'Home Staging', subtitle: 'This is a small description about The service or Product .' },
    { title: 'Capture Service', subtitle: 'This is a small description about The service or Product .' },
  ]

  const media = ['Website launch', 'GoCard cinematic', 'D showcase']
  const documents = ['Test data 2016.xlsx', 'Meeting notes Jan 17.doc', 'Resume.PDF']

  return (
    <aside className={styles.sidebar}>
      <section className={styles.profileCard}>
        <button type="button" className={styles.settingsButton} aria-label="Open profile settings">
          <svg className={styles.settingsIcon} viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.09 7.09 0 0 0-1.62-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54c-.58.23-1.12.54-1.62.94l-2.39-.96a.5.5 0 0 0-.6.22L2.7 8.84a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94L2.82 14.52a.5.5 0 0 0-.12.64l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96c.5.4 1.04.71 1.62.94l.36 2.54a.5.5 0 0 0 .5.42h3.84a.5.5 0 0 0 .5-.42l.36-2.54c.58-.23 1.12-.54 1.62-.94l2.39.96a.5.5 0 0 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <div className={styles.topSpacer} aria-hidden="true" />

        <div className={styles.topRow}>
          <div className={styles.avatarWrapper}>
            <img className={styles.verifiedBadgeIcon} src={verifiedBadgeIcon} alt="" aria-hidden="true" />
          </div>
          {/* Likes feature temporarily disabled
          <p className={styles.likes}>
            <span className={styles.likesIcon} aria-hidden="true">
              <svg className={styles.likesHeart} viewBox="0 0 19 16">
                <path
                  d="M9.273 15.944a1.03 1.03 0 0 1-.694-.269L7.14 14.37C2.33 10.048 0 7.883 0 5.192 0 2.986 1.746 1.25 3.943 1.25c1.244 0 2.438.582 3.219 1.498.78-.916 1.975-1.498 3.219-1.498 2.197 0 3.943 1.736 3.943 3.942 0 2.691-2.33 4.856-7.14 9.178l-1.44 1.305a1.03 1.03 0 0 1-.695.269Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className={styles.likesLabel}>7.2k likes</span>
          </p>
          */}
        </div>

        <div className={styles.identityBlock}>
          <h2 className={styles.name}>
            RACHID MOUFAKKIR 
          </h2>
          <p className={styles.role}>Chief Executive Officer @VR BOOST AGENCY</p>
        </div>

        <div className={styles.actions} role="group" aria-label="Profile quick actions">
          <button type="button" className={`${styles.actionButton} ${styles.saveAction}`}>
            <span className={`${styles.actionIcon} ${styles.saveIcon}`} aria-hidden="true">
              <svg viewBox="0 0 12 16" focusable="false">
                <path d="M2 1h6.4L11 3.6V15H1V2a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M3.2 1.6h3.6v3H3.2z" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
            <span className={styles.actionLabel}>Save Contact</span>
          </button>
          <button type="button" className={`${styles.actionButton} ${styles.callAction}`}>
            <span className={`${styles.actionIcon} ${styles.phoneIcon}`} aria-hidden="true">
              <svg viewBox="0 0 16 16" focusable="false">
                <path
                  d="M4.2 1.5c.5-.5 1.3-.5 1.8 0l1.3 1.3c.5.5.5 1.3 0 1.8l-1 1a.7.7 0 0 0-.2.6c.4 1.3 1.1 2.5 2.1 3.5 1 1 2.2 1.7 3.5 2.1.2.1.5 0 .6-.2l1-1c.5-.5 1.3-.5 1.8 0l1.3 1.3c.5.5.5 1.3 0 1.8l-.8.8c-.9.9-2.2 1.2-3.4.8C10.5 15 8.3 13.7 6.4 11.8 4.5 9.9 3.2 7.7 2.6 5c-.4-1.2-.1-2.5.8-3.4z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className={styles.actionLabel}>Call</span>
          </button>
          <button type="button" className={`${styles.actionButton} ${styles.emailAction}`}>
            <span className={`${styles.actionIcon} ${styles.emailIcon}`} aria-hidden="true">
              <svg viewBox="0 0 20 14" focusable="false">
                <rect x="0.5" y="0.5" width="19" height="13" rx="2.4" fill="none" stroke="currentColor" strokeWidth="0.6" />
                <path d="M1.5 2.2 10 8.2l8.5-6" fill="none" stroke="currentColor" strokeWidth="0.8" />
              </svg>
            </span>
            <span className={styles.actionLabel}>Email</span>
          </button>
        </div>

        <section className={styles.contentSection}>
          <header className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>About</h3>
            <button type="button" className={styles.editButton} aria-label="Edit about section">
              ✎
            </button>
          </header>
          <p className={styles.aboutText}>
            I&apos;m a UI/UX Designer with over 5 years of experience in the game development
            industry. I bring strong technical skills, including UI engine implementation, VFX, 3D
            modeling, animation, and coding, to create functional and visually appealing player
            experiences.
          </p>
        </section>

        <section className={styles.contentSection}>
          <header className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Réseaux sociaux</h3>
            <button type="button" className={styles.editButton} aria-label="Edit social links section">
              ✎
            </button>
          </header>
          <ul className={styles.socialList}>
            {socialLinks.map((network) => (
              <li key={network.label}>
                <button type="button" className={styles.socialButton} aria-label={network.label}>
                  <i className={`${network.iconClass} ${styles.socialIcon}`} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.contentSection}>
          <header className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Produits et services</h3>
            <button type="button" className={styles.editButton} aria-label="Edit products section">
              ✎
            </button>
          </header>
          <ul className={styles.productList}>
            {products.map((product, index) => (
              <li key={product.title}>
                <article className={styles.productItem}>
                  <div className={`${styles.productThumb} ${styles[`thumb${index + 1}` as const]}`} />
                  <div className={styles.productText}>
                    <h4>{product.title}</h4>
                    <p>{product.subtitle}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.contentSection}>
          <header className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Media</h3>
            <button type="button" className={styles.editButton} aria-label="Edit media section">
              ✎
            </button>
          </header>
          <ul className={styles.mediaList}>
            {media.map((item, index) => (
              <li key={item} className={`${styles.mediaCard} ${styles[`media${index + 1}` as const]}`}>
                {index === 1 && (
                  <span className={styles.playButton} aria-hidden="true">
                    ▶
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.contentSection}>
          <header className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Testimonials</h3>
            <button type="button" className={styles.editButton} aria-label="Edit testimonials section">
              ✎
            </button>
          </header>
          <div className={styles.testimonialScroller}>
            <article className={styles.testimonialCard}>
              <div className={styles.testimonialIdentity}>
                <div className={styles.testimonialAvatar} />
                <div>
                  <h4>Ali Hraich</h4>
                  <p>UI UX Designer</p>
                </div>
              </div>
              <p className={styles.testimonialQuote}>
                &quot;The analytics alone are worth it. I know exactly who&apos;s viewing my profile and how
                they found me. Game changer for lead gen.&quot;
              </p>
              <p className={styles.testimonialStars}>★★★★★</p>
            </article>
            <article className={styles.testimonialCard} aria-hidden="true">
              <div className={styles.testimonialIdentity}>
                <div className={styles.testimonialAvatar} />
                <div>
                  <h4>Client Review</h4>
                  <p>Product Team</p>
                </div>
              </div>
              <p className={styles.testimonialQuote}>More testimonial content...</p>
              <p className={styles.testimonialStars}>★★★★★</p>
            </article>
          </div>
        </section>

        <section className={styles.contentSection}>
          <header className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Documents And Files</h3>
            <button type="button" className={styles.editButton} aria-label="Edit documents section">
              ✎
            </button>
          </header>
          <ul className={styles.documentsList}>
            {documents.map((document, index) => (
              <li key={document} className={styles.documentItem}>
                <div className={`${styles.fileIcon} ${styles[`file${index + 1}` as const]}`}>
                  {index === 0 ? 'XLSX' : index === 1 ? 'DOC' : 'PDF'}
                </div>
                <span className={styles.documentName}>{document}</span>
                <button type="button" className={styles.downloadButton} aria-label={`Download ${document}`}>
                  ⬇
                </button>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </aside>
  )
}
