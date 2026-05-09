import styles from './SocialProof.module.css';

const logos = [
  { name: 'Youcan', icon: '🛍️' },
  { name: 'Shopify', icon: '🏪' },
  { name: 'WooCommerce', icon: '🌐' },
  { name: 'Amana', icon: '🚚' },
  { name: 'J&T Express', icon: '📦' },
  { name: 'WhatsApp', icon: '💬' },
  { name: 'CMI', icon: '💳' },
];

export default function SocialProof() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className={styles.label}>Intégré nativement avec les plateformes que tu utilises déjà</p>
        <div className={styles.logosTrack}>
          {/* Double for seamless loop */}
          {[...logos, ...logos].map((logo, i) => (
            <div className={styles.logoChip} key={i}>
              <span className={styles.logoIcon}>{logo.icon}</span>
              <span className={styles.logoName}>{logo.name}</span>
            </div>
          ))}
        </div>
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <strong>+200</strong>
            <span>boutiques actives</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.statItem}>
            <strong>+50 000</strong>
            <span>messages traités/mois</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.statItem}>
            <strong>4,8/5</strong>
            <span>satisfaction marchands</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.statItem}>
            <strong>99,5%</strong>
            <span>uptime garanti</span>
          </div>
        </div>
      </div>
    </section>
  );
}
