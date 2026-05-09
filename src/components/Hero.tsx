import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={`container ${styles.heroContainer}`}>
        {/* Left — Text */}
        <div className={styles.heroLeft}>
          <div className="section-tag">
            <span className="dot"></span>
            Agent IA pour l&apos;e-commerce marocain
          </div>

          <h1 className={styles.heroTitle}>
            Ton agent client qui{' '}
            <span className={styles.highlight}>parle comme toi</span>
          </h1>

          <p className={styles.heroDesc}>
            Réponds à tous tes clients sur WhatsApp en <strong>Darija, français et arabe</strong>,
            24h/24 et 7j/7 — sans lever le petit doigt. Connecté à Youcan, Shopify et Amana.
          </p>

          {/* Stats row */}
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statNum}>&lt; 30s</span>
              <span className={styles.statLabel}>Temps de réponse</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNum}>80%+</span>
              <span className={styles.statLabel}>Messages auto-gérés</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statNum}>4,7★</span>
              <span className={styles.statLabel}>Satisfaction client</span>
            </div>
          </div>

          {/* CTAs */}
          <div className={styles.ctaRow}>
            <a href="/inscription" className="btn-primary" id="hero-cta-primary">
              Commencer gratuitement
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#demo" className="btn-secondary" id="hero-cta-demo">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
              </svg>
              Voir la démo
            </a>
          </div>

          <p className={styles.noCc}>✓ 14 jours gratuits · ✓ Aucune carte requise · ✓ Configuration en 20 min</p>
        </div>

        {/* Right — WhatsApp Mockup */}
        <div className={styles.heroRight}>
          {/* Floating badge — response time */}
          <div className={`${styles.floatingBadge} ${styles.badgeTop}`}>
            <div className={styles.badgeIcon}>⚡</div>
            <div>
              <div className={styles.badgeLabel}>Réponse automatique</div>
              <div className={styles.badgeValue}>23 secondes</div>
            </div>
          </div>

          {/* WhatsApp phone mockup */}
          <div className={styles.phoneMockup}>
            <div className={styles.phoneHeader}>
              <div className={styles.phoneAvatar}>S</div>
              <div className={styles.phoneInfo}>
                <div className={styles.phoneName}>Salma · Agent Kalam</div>
                <div className={styles.phoneStatus}>
                  <span className={styles.statusDot}></span>
                  En ligne
                </div>
              </div>
              <div className={styles.phoneIcons}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.43 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.89a16 16 0 0 0 6.2 6.2l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
            </div>

            <div className={styles.phoneMessages}>
              {/* Customer message */}
              <div className={`${styles.msg} ${styles.msgIn}`} style={{ animationDelay: '0.3s' }}>
                <div className={styles.msgBubble}>
                  Salam 👋 wach kayna jacket f taille M?
                </div>
                <div className={styles.msgTime}>19:42</div>
              </div>

              {/* AI response */}
              <div className={`${styles.msg} ${styles.msgOut}`} style={{ animationDelay: '0.9s' }}>
                <div className={styles.msgBubble}>
                  Walaykum assalam! 😊 Ayeh kayna jacket M, bnin bzaf. Disponible f 3 couleurs: noir, beige w bleu marine. Bghi twjih lcommande daba?
                </div>
                <div className={styles.msgTime}>19:42 · ✓✓</div>
              </div>

              {/* Customer */}
              <div className={`${styles.msg} ${styles.msgIn}`} style={{ animationDelay: '1.5s' }}>
                <div className={styles.msgBubble}>
                  Ayeh! w chhal delivery L7ed?
                </div>
                <div className={styles.msgTime}>19:43</div>
              </div>

              {/* AI response */}
              <div className={`${styles.msg} ${styles.msgOut}`} style={{ animationDelay: '2.1s' }}>
                <div className={styles.msgBubble}>
                  Delivery L7ed kayna 🚀 — 35 DH. Twsslek f 48h m3a Amana. Bghi nbda lcommande dyal jacket M? Ay couleur?
                </div>
                <div className={styles.msgTime}>19:43 · ✓✓</div>
              </div>

              {/* Typing indicator */}
              <div className={`${styles.msg} ${styles.msgIn} ${styles.typingMsg}`} style={{ animationDelay: '2.8s' }}>
                <div className={styles.typingBubble}>
                  <span className={styles.typingDot}></span>
                  <span className={styles.typingDot}></span>
                  <span className={styles.typingDot}></span>
                </div>
              </div>
            </div>

            {/* Input bar */}
            <div className={styles.phoneInput}>
              <div className={styles.inputField}>Écrire un message...</div>
              <button className={styles.sendBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Floating badge — auto resolved */}
          <div className={`${styles.floatingBadge} ${styles.badgeBottom}`}>
            <div className={`${styles.badgeIcon} ${styles.badgeIconGreen}`}>✓</div>
            <div>
              <div className={styles.badgeLabel}>Auto-résolu par Kalam</div>
              <div className={styles.badgeValue}>Commande créée · #8432</div>
            </div>
          </div>

          {/* Youcan integration chip */}
          <div className={`${styles.floatingBadge} ${styles.badgeLeft}`}>
            <span style={{ fontSize: '18px' }}>🛍️</span>
            <div>
              <div className={styles.badgeLabel}>Connecté à</div>
              <div className={styles.badgeValue}>Youcan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className={styles.bgBlob1}></div>
      <div className={styles.bgBlob2}></div>
    </section>
  );
}
