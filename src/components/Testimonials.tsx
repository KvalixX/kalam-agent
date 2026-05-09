import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Youssef Benali',
    role: 'Fondateur, Darija Store',
    avatar: 'Y',
    color: '#1D9E75',
    stars: 5,
    text: 'Avant Kalam, je passais 4 heures par jour à répondre aux WhatsApp. Maintenant je reçois juste les escalades. Mon taux de conversion a augmenté de 22% parce que les clients reçoivent une réponse immédiate.',
    metric: '+22% conversion',
    metricColor: '#1D9E75',
  },
  {
    name: 'Nadia Chaoui',
    role: 'Gérante, Beauté & Co',
    avatar: 'N',
    color: '#378ADD',
    stars: 5,
    text: 'Ce qui m\'a vendu c\'est le Darija. L\'agent répond exactement comme parlerait une vraie conseillère — même le mélange français/darija que font mes clientes. Mes clients ne savent pas que c\'est une IA.',
    metric: '87% auto-résolu',
    metricColor: '#378ADD',
  },
  {
    name: 'Karim Tahiri',
    role: 'CEO, ElectroPro Maroc',
    avatar: 'K',
    color: '#8B5CF6',
    stars: 5,
    text: 'On a 200 commandes par jour. Le suivi commande automatique a réduit de 60% les questions "wach waslet l commande" sur WhatsApp. Setup en 15 minutes, résultats le lendemain.',
    metric: '-60% messages suivi',
    metricColor: '#8B5CF6',
  },
  {
    name: 'Salma Idrissi',
    role: 'E-commerçante, Mode & Style',
    avatar: 'S',
    color: '#F59E0B',
    stars: 5,
    text: 'J\'avais peur que mes clients ressentent que c\'est un robot. Franchement, certains m\'ont dit "ta conseillère est très sympa" — ils parlaient à l\'IA de Kalam sans le savoir. Le ton est parfait.',
    metric: '4,9/5 satisfaction',
    metricColor: '#F59E0B',
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section} id="testimonials">
      <div className="container">
        <div className={styles.header}>
          <div className="section-tag">
            <span className="dot"></span>
            Témoignages
          </div>
          <h2 className={styles.title}>
            Ce que disent les marchands{' '}
            <span className={styles.green}>qui utilisent Kalam</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div className={styles.card} key={i}>
              <div className={styles.stars}>
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className={styles.star}>★</span>
                ))}
              </div>
              <p className={styles.quote}>&ldquo;{t.text}&rdquo;</p>
              <div className={styles.metric} style={{ color: t.metricColor, background: `${t.metricColor}15` }}>
                {t.metric}
              </div>
              <div className={styles.author}>
                <div className={styles.avatar} style={{ background: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <div className={styles.authorName}>{t.name}</div>
                  <div className={styles.authorRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
