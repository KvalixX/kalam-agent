'use client';
import { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  {
    q: 'Est-ce que l\'agent parle vraiment en Darija ?',
    a: 'Oui, c\'est notre priorité absolue. L\'agent Kalam répond en Darija authentique, en français, en arabe classique, et dans le mélange des deux que parlent la plupart des Marocains. Il s\'adapte automatiquement à la langue du client.',
  },
  {
    q: 'Mes clients vont-ils savoir qu\'ils parlent à une IA ?',
    a: 'Non, sauf s\'ils le demandent directement — dans ce cas l\'agent répond honnêtement. Le ton, les expressions et le style de réponse sont configurés pour ressembler à un vrai agent humain de ta boutique.',
  },
  {
    q: 'Comment fonctionne la connexion à Youcan ou Shopify ?',
    a: 'Tu autorises Kalam via OAuth2 (bouton "Connecter ma boutique") en 2 clics. Kalam accède ensuite aux commandes, au stock et aux infos de livraison pour les mettre dans les réponses en temps réel.',
  },
  {
    q: 'Que se passe-t-il quand l\'IA ne sait pas répondre ?',
    a: 'L\'agent déclenche une escalade automatique : il envoie un message poli au client ("je transfère votre demande à notre équipe"), puis te notifie immédiatement sur WhatsApp et dans le dashboard avec un résumé de la situation.',
  },
  {
    q: 'Puis-je reprendre la main sur une conversation ?',
    a: 'Oui, à tout moment. Tu cliques sur "Prendre en main" dans le dashboard, et l\'IA se met en veille sur cette conversation. Elle peut reprendre automatiquement 24h après résolution.',
  },
  {
    q: 'Combien de temps prend la configuration initiale ?',
    a: 'Moins de 20 minutes pour la configuration complète : nom de l\'agent, FAQ, politique de retour, connexion WhatsApp et boutique. Un assistant IA t\'aide à rédiger si besoin.',
  },
  {
    q: 'Y a-t-il un engagement minimum ?',
    a: 'Aucun engagement. Tu peux annuler à tout moment. Le plan annuel offre 2 mois gratuits, mais reste résiliable (avec remboursement au prorata).',
  },
  {
    q: 'Comment fonctionne l\'essai gratuit de 14 jours ?',
    a: 'Tu crées un compte, tu configures ton agent, et tu as 14 jours d\'accès complet au plan Pro — aucune carte de crédit requise. À la fin, tu choisis le plan qui te convient ou tu arrêtes, sans engagement.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={styles.section} id="faq">
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className="section-tag">
              <span className="dot"></span>
              FAQ
            </div>
            <h2 className={styles.title}>Questions fréquentes</h2>
            <p className={styles.subtitle}>
              Tu as d&apos;autres questions ? Écris-nous sur{' '}
              <a href="mailto:hello@kalam.ma" className={styles.link}>hello@kalam.ma</a>
            </p>
          </div>

          <div className={styles.list}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}
                id={`faq-item-${i}`}
              >
                <button
                  className={styles.question}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span>{faq.q}</span>
                  <div className={`${styles.icon} ${open === i ? styles.iconOpen : ''}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                </button>
                {open === i && (
                  <div className={styles.answer}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
