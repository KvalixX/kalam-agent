'use client';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.nav}`}>
        {/* Logo */}
        <a href="/" className={styles.logo} id="nav-logo">
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 13.86 2.5 15.61 3.38 17.1L2.05 21.95L7.05 20.65C8.5 21.49 10.19 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="white"/>
            </svg>
          </div>
          <span>Kalam <span className={styles.arabic}>كلام</span></span>
        </a>

        {/* Desktop Nav */}
        <nav className={styles.navLinks} id="nav-links">
          <a href="#features" className={styles.navLink}>Fonctionnalités</a>
          <a href="#how-it-works" className={styles.navLink}>Comment ça marche</a>
          <a href="#pricing" className={styles.navLink}>Tarifs</a>
          <a href="#faq" className={styles.navLink}>FAQ</a>
        </nav>

        {/* CTA */}
        <div className={styles.navCta}>
          <a href="/connexion" className={styles.loginLink} id="nav-login">Connexion</a>
          <a href="/inscription" className="btn-primary" id="nav-signup" style={{ padding: '10px 22px', fontSize: '14px' }}>
            Essai gratuit 14j
          </a>
        </div>

        {/* Mobile toggle */}
        <button className={styles.burger} onClick={() => setMobileOpen(!mobileOpen)} id="nav-burger" aria-label="Menu">
          <span className={`${styles.burgerLine} ${mobileOpen ? styles.open1 : ''}`}></span>
          <span className={`${styles.burgerLine} ${mobileOpen ? styles.open2 : ''}`}></span>
          <span className={`${styles.burgerLine} ${mobileOpen ? styles.open3 : ''}`}></span>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <a href="#features" onClick={() => setMobileOpen(false)}>Fonctionnalités</a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)}>Comment ça marche</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)}>Tarifs</a>
          <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
          <hr />
          <a href="/connexion">Connexion</a>
          <a href="/inscription" className={styles.mobileSignup}>Essai gratuit 14 jours →</a>
        </div>
      )}
    </header>
  );
}
