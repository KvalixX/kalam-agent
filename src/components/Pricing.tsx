'use client';
import { useState } from 'react';
import styles from './Pricing.module.css';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: { monthly: 990, annual: 825 },
    desc: 'Parfait pour démarrer et tester l\'IA sur ta boutique.',
    features: [
      '500 conversations/mois',
      'Agent WhatsApp IA en Darija',
      '1 intégration e-commerce',
      '1 intégration livreur',
      'CRM basique',
      'Rapports mensuels',
      'Support email (48h)',
    ],
    cta: 'Commencer l\'essai gratuit',
    highlight: false,
    color: '#378ADD',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { monthly: 2490, annual: 2075 },
    desc: 'La solution complète pour les boutiques qui veulent scaler.',
    features: [
      'Conversations illimitées',
      'WhatsApp + Email',
      '3 intégrations e-commerce',
      '3 intégrations livreurs',
      'CRM complet + segmentation',
      'Rapports hebdomadaires IA',
      '3 agents utilisateurs',
      'Support WhatsApp (24h)',
      'Escalade intelligente avancée',
    ],
    cta: 'Démarrer en Pro — 14j gratuits',
    highlight: true,
    color: '#1D9E75',
    badge: 'Le plus populaire',
  },
  {
    id: 'scale',
    name: 'Scale',
    price: { monthly: 5900, annual: 4917 },
    desc: 'Pour les grandes boutiques et les groupes multi-marques.',
    features: [
      'Tout le plan Pro',
      'Tous les canaux (Instagram inclus)',
      'Intégrations illimitées',
      'Agents utilisateurs illimités',
      'CRM complet + API',
      'Rapports quotidiens',
      'Support dédié (4h SLA)',
      'Onboarding assisté',
      'Fine-tuning sur mesure',
    ],
    cta: 'Contacter les ventes',
    highlight: false,
    color: '#8B5CF6',
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className={styles.section} id="pricing">
      <div className="container">
        <div className={styles.header}>
          <div className="section-tag">
            <span className="dot"></span>
            Tarifs transparents
          </div>
          <h2 className={styles.title}>
            Moins cher qu&apos;un{' '}
            <span className={styles.green}>agent SAV à mi-temps</span>
          </h2>
          <p className={styles.subtitle}>
            Commence avec un essai gratuit de 14 jours. Aucune carte de crédit requise.
          </p>

          {/* Toggle */}
          <div className={styles.toggle}>
            <span className={!annual ? styles.activeLabel : styles.inactiveLabel}>Mensuel</span>
            <button
              className={`${styles.toggleBtn} ${annual ? styles.toggleOn : ''}`}
              onClick={() => setAnnual(!annual)}
              id="pricing-toggle"
            >
              <span className={styles.toggleKnob}></span>
            </button>
            <span className={annual ? styles.activeLabel : styles.inactiveLabel}>
              Annuel
              <span className={styles.saveBadge}>-2 mois offerts</span>
            </span>
          </div>
        </div>

        <div className={styles.grid}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`${styles.card} ${plan.highlight ? styles.highlighted : ''}`}
              id={`pricing-${plan.id}`}
            >
              {plan.badge && <div className={styles.badge}>{plan.badge}</div>}

              <div className={styles.cardTop}>
                <h3 className={styles.planName} style={{ color: plan.color }}>{plan.name}</h3>
                <p className={styles.planDesc}>{plan.desc}</p>
              </div>

              <div className={styles.priceBlock}>
                <span className={styles.currency}>MAD</span>
                <span className={styles.price}>
                  {annual ? plan.price.annual.toLocaleString() : plan.price.monthly.toLocaleString()}
                </span>
                <span className={styles.period}>/mois</span>
              </div>
              {annual && (
                <p className={styles.annualNote}>
                  Facturé {(plan.price.annual * 12).toLocaleString()} MAD/an
                </p>
              )}

              <a
                href="/inscription"
                className={`${styles.planCta} ${plan.highlight ? styles.planCtaPrimary : styles.planCtaSecondary}`}
                style={!plan.highlight ? { borderColor: plan.color, color: plan.color } : {}}
              >
                {plan.cta}
              </a>

              <ul className={styles.featureList}>
                {plan.features.map((f, i) => (
                  <li key={i} className={styles.featureItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: plan.color, flexShrink: 0 }}>
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className={styles.note}>
          💡 Le plan Starter à 990 MAD/mois coûte <strong>moins qu&apos;une semaine de salaire</strong> d&apos;un agent SAV.
          Et Kalam travaille 24h/24, 7j/7.
        </p>
      </div>
    </section>
  );
}
