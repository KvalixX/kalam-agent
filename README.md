# Kalam كلام — Plateforme d'Opérations Client IA

> **Ton agent client qui parle comme toi** — SaaS B2B de service client IA pour l'e-commerce marocain et maghrébin.

## 🚀 Présentation

**Kalam** est une plateforme SaaS qui permet aux marchands e-commerce et aux commerces de détail du Maroc et du Maghreb de gérer automatiquement l'intégralité de leurs communications clients grâce à l'intelligence artificielle.

L'agent IA de Kalam répond aux clients sur **WhatsApp**, **Instagram** et par **email** en **Darija, français et arabe classique**, 24h/24 et 7j/7.

### Avantages Clés

| | |
|---|---|
| 🗣️ **Darija natif** | Maîtrise native du dialecte marocain, code-switching français/arabe |
| ⚡ **< 30 secondes** | Temps de réponse moyen vs 2-8 heures en manuel |
| 🔗 **Intégrations locales** | Youcan, Shopify, Amana, J&T Express, CMI |
| 🤖 **80%+ automatisé** | Messages gérés sans intervention humaine |
| 📊 **CRM automatique** | Fiches clients, segmentation, rapports hebdomadaires IA |

---

## 🛠️ Stack Technique

### Frontend (ce repo — Landing Page v1)

| Technologie | Version | Usage |
|---|---|---|
| **Next.js** | 15+ | Framework React avec App Router |
| **TypeScript** | 5+ | Type safety |
| **CSS Modules** | — | Styling composant par composant |
| **Google Fonts** | Inter + Noto Sans Arabic | Typographie latine + arabe |

### Backend (à venir — Phase 1)

| Technologie | Usage |
|---|---|
| **Node.js / Fastify** | API Gateway |
| **Supabase (PostgreSQL)** | Base de données + Auth + Realtime |
| **Prisma** | ORM type-safe |
| **BullMQ + Redis** | Queue de traitement asynchrone |
| **Claude API (Anthropic)** | LLM principal pour la génération de réponses |
| **WhatsApp Business API** | Canal de communication principal |

---

## 📁 Structure du Projet

```
kalam-app/
├── src/
│   ├── app/
│   │   ├── globals.css          # Design system global (tokens, animations)
│   │   ├── layout.tsx           # Root layout + metadata SEO
│   │   └── page.tsx             # Page principale (assemblage des sections)
│   └── components/
│       ├── Navbar.tsx           # Navigation sticky avec scroll effect
│       ├── Hero.tsx             # Section hero avec mockup WhatsApp Darija animé
│       ├── SocialProof.tsx      # Logos partenaires + stats (marquee animé)
│       ├── Features.tsx         # 6 fonctionnalités clés
│       ├── HowItWorks.tsx       # Process en 4 étapes (timeline)
│       ├── Pricing.tsx          # 3 plans tarifaires avec toggle mensuel/annuel
│       ├── Testimonials.tsx     # 4 témoignages marchands
│       ├── FAQ.tsx              # Accordéon FAQ (8 questions)
│       ├── CTABanner.tsx        # Banner CTA final (gradient vert)
│       └── Footer.tsx           # Footer complet avec liens et socials
├── public/
├── package.json
└── README.md
```

---

## 🏁 Démarrage Rapide

### Prérequis

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Cloner le repo
git clone https://github.com/KvalixX/kalam-agent.git
cd kalam-agent

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

### Build Production

```bash
npm run build
npm start
```

---

## 🎨 Design System

### Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--green-primary` | `#1D9E75` | Couleur principale (CTA, accents) |
| `--green-light` | `#25c48f` | Hover states |
| `--green-pale` | `#e8f8f2` | Backgrounds légers |
| `--blue-accent` | `#378ADD` | Actions secondaires |
| `--red-alert` | `#E24B4A` | Urgences, escalades |
| `--text-primary` | `#0f2b1e` | Texte principal |

### Typographie

- **Latine** : [Inter](https://fonts.google.com/specimen/Inter) — poids 300 à 900
- **Arabe** : [Noto Sans Arabic](https://fonts.google.com/noto/specimen/Noto+Sans+Arabic) — pour les interfaces RTL

---

## 📋 Roadmap

### ✅ Phase 0 — Landing Page (actuelle)
- [x] Design system complet
- [x] Navbar responsive avec scroll effect
- [x] Section Hero avec mockup WhatsApp Darija animé
- [x] Social proof avec marquee intégrations
- [x] 6 features cards
- [x] How it works (timeline 4 étapes)
- [x] Pricing (3 plans + toggle mensuel/annuel)
- [x] Testimonials marchands
- [x] FAQ accordéon
- [x] CTA Banner gradient
- [x] Footer complet

### 🔜 Phase 1 — MVP Backend (Semaines 3-7)
- [ ] Auth (register, login, JWT via Supabase)
- [ ] Schéma DB complet (Prisma + PostgreSQL)
- [ ] Webhook WhatsApp (réception + envoi)
- [ ] Pipeline de traitement messages
- [ ] Intégration Claude API (Darija)
- [ ] Dashboard basique (inbox + conversations)

### 📅 Phase 2 — Intégrations Locales (Semaines 8-12)
- [ ] Intégration Youcan (commandes, tracking)
- [ ] Intégration Shopify
- [ ] Intégration Amana Express
- [ ] CRM client automatique
- [ ] Système d'escalade complet
- [ ] Facturation (CMI / CIH Pay)

### 🚀 Phase 3 — Intelligence (Semaines 13-20)
- [ ] Rapports hebdomadaires IA
- [ ] Canal Instagram DM
- [ ] PWA (notifications push)
- [ ] A/B testing des prompts
- [ ] Score churn automatique

---

## 💰 Plans Tarifaires

| | Starter | Pro | Scale |
|---|---|---|---|
| **Prix/mois** | 990 MAD | 2 490 MAD | 5 900 MAD |
| **Conversations** | 500/mois | Illimité | Illimité |
| **Canaux** | WhatsApp | WhatsApp + Email | Tous |
| **Intégrations** | 1 | 3 | Illimité |
| **Support** | Email 48h | WhatsApp 24h | Dédié 4h |

Essai gratuit 14 jours — aucune carte de crédit requise.

---

## 🔌 Intégrations Supportées

### E-commerce
- 🛍️ **Youcan** — Plateforme e-commerce marocaine (OAuth2)
- 🏪 **Shopify** — OAuth2 + REST Admin API
- 🌐 **WooCommerce** — REST API v3

### Transporteurs
- 🚚 **Amana Express** — Tracking temps réel
- 📦 **J&T Express Maroc** — Tracking temps réel
- 📮 **Marocpost / Chronopost** — Intégration v2

### Paiement
- 💳 **CMI** — Cartes bancaires marocaines
- 💳 **CIH Pay** — Paiement digital

---

## 🔒 Sécurité

- Chiffrement AES-256-GCM pour les tokens API
- JWT (access 15min + refresh 30j avec rotation)
- Rate limiting par IP (100 req/min sur l'auth)
- Isolation multi-tenant par `tenant_id`
- TLS 1.3 minimum, headers HSTS, CSP
- Données hébergées en Europe (RGPD)

---

## 📊 KPIs Cibles (Année 1)

| Métrique | Objectif M6 | Objectif M12 |
|---|---|---|
| Taux résolution automatique | > 75% | > 85% |
| Temps de réponse moyen | < 5s | < 3s |
| CSAT | > 4,0/5 | > 4,3/5 |
| MRR | 50 000 MAD | 180 000 MAD |
| Clients actifs | 30 | 100 |

---

## 📄 Licence

Propriétaire — Kalam SARL, Casablanca, Maroc 🇲🇦

---

*Document mis à jour : Mai 2026 — Version 1.0*

> 💬 **Contact** : hello@kalam.ma
