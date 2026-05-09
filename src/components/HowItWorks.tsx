import styles from './HowItWorks.module.css';

const steps = [
  {
    num: '01',
    title: 'Tu configures ton agent',
    desc: 'En 20 minutes, tu définis le nom de l\'agent, sa langue, ta politique de retour, ta FAQ et tu connectes ton WhatsApp Business. Pas besoin de développeur.',
    icon: '⚙️',
    detail: 'Formulaire guidé · Assistant IA pour la rédaction · Test en live',
  },
  {
    num: '02',
    title: 'Tu connectes ta boutique',
    desc: 'Kalam se connecte à Youcan, Shopify ou WooCommerce en 2 clics. Il accède aux commandes, au stock et aux infos de livraison en temps réel.',
    icon: '🔗',
    detail: 'OAuth2 sécurisé · Données temps réel · Sync automatique',
  },
  {
    num: '03',
    title: 'L\'agent répond à ta place',
    desc: 'Chaque message WhatsApp est traité en moins de 30 secondes. L\'agent répond en Darija, donne le statut commande, gère les retours, et t\'alerte si besoin.',
    icon: '🤖',
    detail: 'Darija natif · Suivi commande · Escalade intelligente',
  },
  {
    num: '04',
    title: 'Tu pilotes depuis le dashboard',
    desc: 'Consulte les escalades, réponds aux cas complexes, lis les rapports hebdomadaires. Kalam s\'occupe du reste.',
    icon: '📊',
    detail: 'Inbox centralisé · CRM automatique · Rapports IA',
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className="container">
        <div className={styles.header}>
          <div className="section-tag">
            <span className="dot"></span>
            Comment ça marche
          </div>
          <h2 className={styles.title}>
            De zéro à un agent opérationnel{' '}
            <span className={styles.green}>en 20 minutes</span>
          </h2>
          <p className={styles.subtitle}>
            Pas besoin d&apos;un développeur. Pas besoin d&apos;une formation.
            Kalam est conçu pour les marchands, pas pour les ingénieurs.
          </p>
        </div>

        <div className={styles.stepsContainer}>
          {steps.map((step, i) => (
            <div className={styles.step} key={i}>
              <div className={styles.stepLeft}>
                <div className={styles.stepNum}>{step.num}</div>
                {i < steps.length - 1 && <div className={styles.stepLine}></div>}
              </div>
              <div className={styles.stepContent}>
                <div className={styles.stepIcon}>{step.icon}</div>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                  <div className={styles.stepDetail}>
                    {step.detail.split(' · ').map((d, j) => (
                      <span className={styles.detailTag} key={j}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <a href="/inscription" className="btn-primary" id="hiw-cta">
            Démarrer maintenant — c&apos;est gratuit
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
