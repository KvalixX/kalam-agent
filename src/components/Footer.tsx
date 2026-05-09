import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 13.86 2.5 15.61 3.38 17.1L2.05 21.95L7.05 20.65C8.5 21.49 10.19 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="white"/>
                </svg>
              </div>
              <span className={styles.logoText}>Kalam <span className={styles.arabic}>كلام</span></span>
            </div>
            <p className={styles.tagline}>
              Ton agent client qui parle comme toi.
              <br />
              E-commerce marocain, Darija natif.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.social} aria-label="LinkedIn" id="footer-linkedin">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className={styles.social} aria-label="Instagram" id="footer-instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://wa.me/212600000000" className={styles.social} aria-label="WhatsApp" id="footer-whatsapp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className={styles.linksGrid}>
            <div className={styles.linkCol}>
              <h4>Produit</h4>
              <a href="#features">Fonctionnalités</a>
              <a href="#how-it-works">Comment ça marche</a>
              <a href="#pricing">Tarifs</a>
              <a href="/changelog">Nouveautés</a>
            </div>
            <div className={styles.linkCol}>
              <h4>Intégrations</h4>
              <a href="#">Youcan</a>
              <a href="#">Shopify</a>
              <a href="#">WooCommerce</a>
              <a href="#">Amana Express</a>
              <a href="#">J&T Express</a>
            </div>
            <div className={styles.linkCol}>
              <h4>Entreprise</h4>
              <a href="#">À propos</a>
              <a href="#">Blog</a>
              <a href="#">Partenaires</a>
              <a href="#">Recrutement</a>
              <a href="mailto:hello@kalam.ma">Contact</a>
            </div>
            <div className={styles.linkCol}>
              <h4>Support</h4>
              <a href="#">Documentation</a>
              <a href="#faq">FAQ</a>
              <a href="#">Statut du service</a>
              <a href="#">CGU</a>
              <a href="#">Confidentialité</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © 2026 Kalam SARL — Casablanca, Maroc 🇲🇦
          </p>
          <p className={styles.legal}>
            Fait avec ❤️ pour l&apos;e-commerce marocain · Données hébergées en Europe (RGPD)
          </p>
        </div>
      </div>
    </footer>
  );
}
