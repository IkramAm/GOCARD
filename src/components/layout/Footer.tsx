import styles from './Footer.module.css'

const productLinks = [
  { label: 'Standard Card', href: '#pricing' },
  { label: 'Pro Card', href: '#pricing' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Bulk Orders', href: '#contact' },
]

const resourceLinks = [
  { label: 'Help Center', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'API Docs', href: '#' },
  { label: 'Case Studies', href: '#' },
  { label: 'Status', href: '#' },
]

const companyLinks = [
  { label: 'About Us', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Contact', href: '#contact' },
  { label: 'Legal', href: '#' },
  { label: 'Privacy', href: '#' },
]

const socialLinks = [
  { label: 'in', href: '#', ariaLabel: 'LinkedIn' },
  { label: 'x', href: '#', ariaLabel: 'X' },
  { label: 'mail', href: '#', ariaLabel: 'Email' },
  { label: 'yt', href: '#', ariaLabel: 'YouTube' },
]

type LinkItem = {
  label: string
  href: string
}

function LinkColumn({ title, links }: { title: string; links: LinkItem[] }) {
  return (
    <div>
      <h3 className={styles.columnTitle}>{title}</h3>
      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.label}>
            <a className={styles.link} href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <h2 className={styles.brandName}>GoCard</h2>
            <p className={styles.brandText}>
              The world&apos;s most premium NFC smart business card. One tap to share your entire
              professional identity instantly.
            </p>

            <ul className={styles.socials}>
              {socialLinks.map((social) => (
                <li key={social.ariaLabel}>
                  <a className={styles.socialLink} href={social.href} aria-label={social.ariaLabel}>
                    <span className={styles.socialLabel}>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <LinkColumn title="Product" links={productLinks} />
          <LinkColumn title="Resources" links={resourceLinks} />
          <LinkColumn title="Company" links={companyLinks} />
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`${styles.container} ${styles.bottomInner}`}>
          <p className={styles.copyright}>© 2026 GoCard Inc. All rights reserved.</p>
          <ul className={styles.legal}>
            <li>
              <a className={styles.link} href="#">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className={styles.link} href="#">
                Terms of Service
              </a>
            </li>
            <li>
              <a className={styles.link} href="#">
                Cookie Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
