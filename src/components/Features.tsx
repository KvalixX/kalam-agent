import styles from './Features.module.css';

const features = [
  {
    icon: '💬',
    title: 'Réponses en Darija',
    desc: 'L\'IA répond dans la langue de ton client — Darija, français, arabe classique, ou un mélange des trois. Naturellement.',
    color: '#1D9E75',
    bg: '#e8f8f2',
  },
  {
    icon: '📦',
    title: 'Suivi commande automatique',
    desc: '"Wach waslet commande dyali?" → L\'agent récupère le statut en temps réel et répond en 5 secondes.',
    color: '#378ADD',
    bg: '#eaf2fc',
  },
  {
    icon: '🔔',
    title: 'Escalade intelligente',
    desc: 'Quand une situation dépasse l\'IA, elle te notifie instantanément avec un résumé et une recommandation d\'action.',
    color: '#F59E0B',
    bg: '#fef9ec',
  },
  {
    icon: '👥',
    title: 'CRM client automatique',
    desc: 'Chaque client est identifié, segmenté (VIP, régulier, à risque) et sa fiche enrichie automatiquement à chaque échange.',
    color: '#8B5CF6',
    bg: '#f3f0fe',
  },
  {
    icon: '📊',
    title: 'Rapports hebdomadaires IA',
    desc: 'Chaque lundi, un rapport qui te dit les questions qui reviennent, les problèmes à régler, et les opportunités à saisir.',
    color: '#E24B4A',
    bg: '#fdf0f0',
  },
  {
    icon: '⚡',
    title: 'Réponse en 30 secondes',
    desc: 'Ton client envoie un message à 2h du matin. L\'agent répond immédiatement. Ton concurrent, lui, répond à 9h.',
    color: '#1D9E75',
    bg: '#e8f8f2',
  },
];

export default function Features() {
  return (
    <section className={styles.section} id="features">
      <div className="container">
        <div className={styles.header}>
          <div className="section-tag">
            <span className="dot"></span>
            Fonctionnalités
          </div>
          <h2 className={styles.title}>
            Tout ce dont tu as besoin pour{' '}
            <span className={styles.green}>automatiser ton SAV</span>
          </h2>
          <p className={styles.subtitle}>
            Kalam gère l&apos;intégralité de tes communications clients — de la question produit à la réclamation,
            en passant par le suivi de livraison.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <div className={styles.card} key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.iconWrap} style={{ background: f.bg, color: f.color }}>
                <span>{f.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
              <div className={styles.cardArrow} style={{ color: f.color }}>
                En savoir plus →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
