import { useState } from 'react';
import { Button } from '../ui/Button';
import styles from './Header.module.css';
import logoGoCardWhite from '../../assets/logo/logo-GOCard-White.png';

const navLinks = [
  { label: 'Comment ça marche', href: '/#how-it-works' },
  { label: 'Avis', href: '/#reviews' },
  { label: 'Tarifs', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.menuOpen : ''}`}>
      <a href="/" className={styles.logo}>
        <img className={styles.logoImage} src={logoGoCardWhite} alt="GoCard" />
      </a>

      <button
        type="button"
        className={styles.menuButton}
        aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={styles.nav}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`header-nav-link ${styles.navLink}`}
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <Button
        variant="primary"
        as="a"
        href="/#contact"
        className={styles.ctaButton}
        onClick={closeMenu}
      >
        Contactez-nous
      </Button>
    </header>
  );
}
