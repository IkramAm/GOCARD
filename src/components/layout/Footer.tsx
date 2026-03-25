import styles from './Footer.module.css'
import logoGoCardWhite from '../../assets/logo/logo-GOCard-White.png';

const productLinks = [
  { label: 'Carte Standard', href: '#pricing' },
  { label: 'Carte Pro', href: '#pricing' },
  { label: 'Comment ca marche', href: '#how-it-works' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'Commandes en lot', href: '#contact' },
]

const resourceLinks = [
  { label: "Centre d'aide", href: '#' },
  { label: 'Blog', href: '#' },
  { label: "Documentation API", href: '#' },
  { label: 'Etudes de cas', href: '#' },
  { label: 'Statut', href: '#' },
]

const companyLinks = [
  { label: 'A propos', href: '#' },
  { label: 'Carrieres', href: '#' },
  { label: 'Contact', href: '#contact' },
  { label: 'Mentions legales', href: '#' },
  { label: 'Confidentialite', href: '#' },
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
            <h2 className={styles.brandName}>
              <img className={styles.brandLogo} src={logoGoCardWhite} alt="GoCard" />
            </h2>
            <p className={styles.brandText}>
              La carte de visite NFC intelligente la plus premium au monde. Un seul contact pour
              partager instantanement toute votre identite professionnelle.
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

          <LinkColumn title="Produit" links={productLinks} />
          <LinkColumn title="Ressources" links={resourceLinks} />
          <LinkColumn title="Entreprise" links={companyLinks} />
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`${styles.container} ${styles.bottomInner}`}>
          <p className={styles.copyright}>© 2026 GoCard Inc. Tous droits reserves.</p>
          <ul className={styles.legal}>
            <li>
              <a className={styles.link} href="#">
                Politique de confidentialite
              </a>
            </li>
            <li>
              <a className={styles.link} href="#">
                Conditions d'utilisation
              </a>
            </li>
            <li>
              <a className={styles.link} href="#">
                Parametres des cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
