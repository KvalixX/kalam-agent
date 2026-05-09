# Kalam كلام — Cahier des Charges Complet
### Plateforme d'Opérations Client IA pour le E-commerce Maghrébin
**Version 1.0 — Mai 2026**

---

## Table des Matières

1. [Présentation Générale](#1-présentation-générale)
2. [Contexte et Analyse de Marché](#2-contexte-et-analyse-de-marché)
3. [Objectifs du Projet](#3-objectifs-du-projet)
4. [Parties Prenantes](#4-parties-prenantes)
5. [Périmètre Fonctionnel](#5-périmètre-fonctionnel)
6. [Spécifications Fonctionnelles Détaillées](#6-spécifications-fonctionnelles-détaillées)
7. [Architecture Technique](#7-architecture-technique)
8. [Modèle de Données](#8-modèle-de-données)
9. [Intégrations Externes](#9-intégrations-externes)
10. [Interface Utilisateur et Expérience](#10-interface-utilisateur-et-expérience)
11. [Sécurité et Conformité](#11-sécurité-et-conformité)
12. [Performance et Scalabilité](#12-performance-et-scalabilité)
13. [Modèle Économique](#13-modèle-économique)
14. [Roadmap et Planning](#14-roadmap-et-planning)
15. [Ressources et Équipe](#15-ressources-et-équipe)
16. [KPIs et Métriques de Succès](#16-kpis-et-métriques-de-succès)
17. [Risques et Mitigations](#17-risques-et-mitigations)
18. [Glossaire](#18-glossaire)

---

## 1. Présentation Générale

### 1.1 Identité du Projet

| Champ | Valeur |
|---|---|
| **Nom du projet** | Kalam (كلام) |
| **Signification** | "Parole" / "Communication" en arabe |
| **Slogan** | *Ton agent client qui parle comme toi* |
| **Catégorie** | SaaS B2B — Customer Operations IA |
| **Marché cible** | E-commerce et retail, Maroc → Maghreb → Afrique francophone |
| **Date de création** | 2026 |
| **Version du document** | 1.0 |

### 1.2 Résumé Exécutif

Kalam est une plateforme SaaS qui permet aux marchands e-commerce et aux commerces de détail du Maroc et du Maghreb de gérer automatiquement l'intégralité de leurs communications clients grâce à l'intelligence artificielle.

L'agent IA de Kalam répond aux clients sur WhatsApp, Instagram et par email en Darija, français et arabe classique, 24 heures sur 24 et 7 jours sur 7. Il est nativement connecté aux plateformes e-commerce locales (Youcan, Shopify, WooCommerce), aux services de livraison marocains (Amana, J&T Express, Marocpost) et aux systèmes de paiement régionaux (CMI, CIH Pay, Wafacash).

Kalam génère trois avantages compétitifs majeurs et durables :

1. **Fossé linguistique et culturel** — Maîtrise native du Darija, de l'alternance de codes français/arabe et des nuances culturelles locales, impossible à répliquer par des acteurs étrangers.
2. **Fossé d'intégration** — Connexions profondes avec l'écosystème e-commerce local que les plateformes internationales (Gorgias, Tidio, Freshdesk) n'ont pas d'intérêt à développer.
3. **Fossé de données** — Chaque conversation traitée enrichit un corpus propriétaire qui améliore la qualité de l'IA au fil du temps, créant un avantage cumulatif impossible à rattraper.

### 1.3 Problème Résolu

Les marchands e-commerce marocains reçoivent entre 50 et 300 messages WhatsApp par jour. Ces messages portent sur :
- Le suivi de commande et de livraison (40% des messages)
- Les questions sur les produits et la disponibilité (25%)
- Les réclamations et demandes de retour (20%)
- Les demandes de remboursement (10%)
- Autres questions diverses (5%)

Sans solution, ce flux est géré manuellement par le marchand ou par 1 à 3 employés dédiés, générant :
- Des délais de réponse de 2 à 12 heures
- Des messages non répondus (taux d'abandon moyen : 35%)
- Un coût salarial de 6 000 à 18 000 MAD par mois
- Une perte de ventes estimée à 15-20% du chiffre d'affaires

Kalam résout ce problème intégralement, automatiquement, en temps réel.

---

## 2. Contexte et Analyse de Marché

### 2.1 Le Marché E-commerce Marocain

| Indicateur | Valeur | Source |
|---|---|---|
| Revenus e-commerce 2025 | 1,7 milliard USD | Statista / Concli.com |
| Croissance annuelle | +10,27% CAGR 2024-2029 | Statista |
| Part transactions sur mobile | 85%+ | CODRocket 2026 |
| Utilisateurs e-commerce 2025 | ~7,5 millions | Statista |
| Objectif gouvernemental 2025 | 10 milliards MAD | Gouvernement du Maroc |
| Objectif gouvernemental 2030 | 20 milliards MAD | Gouvernement du Maroc |
| Part COD (Cash on Delivery) | ~60% des transactions | CODRocket 2026 |

### 2.2 Catégories Dominantes

- **Mode et accessoires** : 556M USD (32,6% du marché)
- **Électronique grand public** : 370M USD
- **Beauté et soins** : 111M USD
- **Alimentation et épicerie** : en forte croissance

### 2.3 Analyse de la Concurrence

#### Concurrents internationaux (non adaptés au marché local)

| Acteur | Forces | Faiblesses pour le marché marocain |
|---|---|---|
| **Gorgias** | Riche en fonctionnalités, intégrations Shopify | Pas de Darija, pas d'intégration locale, tarifs en USD, SAV inaccessible |
| **Freshdesk** | Mature, multi-canal | Interface complexe, pas de WhatsApp natif, pas de NLP Darija |
| **Tidio** | Facile à utiliser | Chatbot simple sans IA avancée, pas d'arabe |
| **Intercom** | Très complet | Prix prohibitif, aucun support local, pas de Darija |
| **Zendesk** | Leader mondial | Trop complexe et cher pour les TPE/PME marocaines |

#### Concurrents locaux

**Aucun concurrent local direct n'existe** avec l'ensemble des fonctionnalités de Kalam. Quelques acteurs proposent des chatbots WhatsApp basiques mais sans :
- IA générative de qualité en Darija
- Intégration e-commerce locale complète
- CRM client automatique
- Rapports d'intelligence commerciale

### 2.4 Marché Adressable

| Segment | Estimation | Commentaire |
|---|---|---|
| **TAM** (Total Addressable Market) | ~500M MAD/an | Tous les e-commerçants marocains |
| **SAM** (Serviceable Addressable Market) | ~150M MAD/an | E-commerçants avec 10+ commandes/jour |
| **SOM** (Serviceable Obtainable Market) — Année 1 | ~3M MAD/an | 100 clients Pro à 2 490 MAD/mois |
| **SOM** — Année 3 | ~30M MAD/an | Maghreb + Afrique francophone |

### 2.5 Tendances de Marché Favorables

1. **Croissance e-commerce post-COVID** — Le comportement d'achat en ligne est ancré durablement
2. **Pénétration WhatsApp** — 95%+ des Marocains utilisent WhatsApp pour communiquer avec les commerces
3. **Émergence de Youcan** — La plateforme marocaine (alternative à Shopify) crée un écosystème e-commerce local structuré
4. **Disponibilité des LLMs multilingues** — Les modèles de langage supportent maintenant le Darija avec une qualité acceptable
5. **Pression sur les coûts RH** — Le coût des agents SAV augmente, créant un besoin d'automatisation

---

## 3. Objectifs du Projet

### 3.1 Objectifs Stratégiques

1. Devenir **la référence** du service client IA pour l'e-commerce marocain d'ici fin 2027
2. Atteindre **500 clients actifs** et **1M MAD de MRR** d'ici 36 mois
3. Établir un **fossé technique irréversible** via les données propriétaires Darija et les intégrations locales
4. Se positionner pour une **levée de fonds Seed** de 5 à 15M MAD en année 2

### 3.2 Objectifs Produit (Année 1)

- Traiter **80%+ des messages clients** sans intervention humaine
- Atteindre un **temps de réponse moyen < 30 secondes** (contre 2-8 heures en manuel)
- Maintenir un **taux de satisfaction client** (CSAT) supérieur à 4,2/5
- Intégrer **au minimum 5 plateformes e-commerce** et **3 transporteurs locaux**
- Supporter nativement **Darija, français, arabe classique** et le code-switching

### 3.3 Objectifs Commerciaux (Année 1)

| Mois | Clients actifs | MRR cible |
|---|---|---|
| M3 | 10 | 9 900 MAD |
| M6 | 30 | 50 000 MAD |
| M9 | 60 | 110 000 MAD |
| M12 | 100 | 180 000 MAD |

---

## 4. Parties Prenantes

### 4.1 Équipe Projet

| Rôle | Responsabilités | Profil recommandé |
|---|---|---|
| **Fondateur / CTO** | Architecture technique, développement backend, décisions produit | Développeur full-stack 3+ ans, idéalement avec expérience IA |
| **Développeur Frontend** | Dashboard marchand, formulaires d'onboarding, interface d'administration | React / Next.js |
| **Chargé de Croissance** | Acquisition clients, partenariats (Youcan, etc.), démonstrations | Profil commercial digital, maîtrise Darija obligatoire |

> **Note :** La v1 peut être construite par 1 développeur seul. Le CTO peut couvrir l'ensemble des développements jusqu'à 30 clients actifs.

### 4.2 Utilisateurs Finaux

#### Profil Utilisateur Principal — Le Marchand (Admin)

- **Qui :** Gérant d'une boutique e-commerce marocaine, 25-45 ans
- **Revenus boutique :** 30 000 à 500 000 MAD/mois
- **Commandes/jour :** 10 à 500
- **Niveau technique :** Faible à moyen (utilise Facebook, WhatsApp Business, Youcan)
- **Langue :** Darija principalement, français fonctionnel
- **Pain point :** Passe 2 à 5 heures par jour à répondre aux messages clients
- **Objectif Kalam :** Récupérer ce temps, ne plus louper de ventes

#### Profil Utilisateur Secondaire — Agent SAV (Collaborateur)

- **Qui :** Employé gérant le service client pour le compte du marchand
- **Niveau technique :** Faible
- **Objectif Kalam :** Avoir un outil qui filtre les demandes simples et lui transmet les complexes

#### Client Final du Marchand (Acheteur)

- **Qui :** Client de la boutique qui envoie des messages sur WhatsApp ou Instagram
- **Attente :** Réponse rapide, précise, dans sa langue (Darija ou français)
- **Ne sait pas** qu'il interagit avec une IA

---

## 5. Périmètre Fonctionnel

### 5.1 Vue d'Ensemble des Modules

```
KALAM
├── Module 1 — Onboarding & Configuration
│   ├── Formulaire de création de compte marchand
│   ├── Assistant de configuration de l'agent IA
│   ├── Connexion WhatsApp Business
│   └── Connexion plateforme e-commerce
│
├── Module 2 — Agent IA Conversationnel
│   ├── Traitement des messages entrants (WhatsApp, Instagram, Email)
│   ├── Génération de réponses (LLM + contexte marchand)
│   ├── Suivi de commande en temps réel
│   ├── Gestion des retours et réclamations
│   ├── Détection d'intention et routage
│   └── Escalade vers agent humain
│
├── Module 3 — CRM Client Automatique
│   ├── Création automatique de fiches clients
│   ├── Historique complet des conversations
│   ├── Segmentation et tags automatiques
│   └── Détection de clients VIP et à risque
│
├── Module 4 — Dashboard Marchand
│   ├── Vue temps réel des conversations actives
│   ├── File d'escalade (demandes non résolues)
│   ├── Fiche client complète
│   └── Notifications push et alertes
│
├── Module 5 — Intelligence Commerciale
│   ├── Rapport hebdomadaire automatique
│   ├── Analyse des questions fréquentes
│   ├── Indicateurs de satisfaction client
│   └── Détection d'opportunités produit
│
└── Module 6 — Administration SaaS
    ├── Gestion des abonnements et facturation
    ├── Tableau de bord administrateur (super-admin Kalam)
    ├── Monitoring des agents IA
    └── Support client interne
```

### 5.2 Ce qui est INCLUS dans la v1 (MVP)

- ✅ Agent WhatsApp IA en Darija et français
- ✅ Suivi de commande via Youcan et Shopify
- ✅ Gestion des retours (informations et procédures)
- ✅ Dashboard de base avec fil de conversations
- ✅ Escalade vers le marchand (notification WhatsApp)
- ✅ Fiche client automatique
- ✅ Onboarding via formulaire web
- ✅ Facturation (abonnement mensuel CMI/Stripe)

### 5.3 Ce qui est EXCLU de la v1 (prévu v2+)

- ❌ Canal Instagram DM (v2)
- ❌ Canal Email entrant (v2)
- ❌ Application mobile native (v3)
- ❌ Rapports d'intelligence avancés (v2)
- ❌ API publique pour développeurs tiers (v3)
- ❌ Intégration vocale / appels téléphoniques (v3)
- ❌ Multi-agents (plusieurs agents par boutique) (v2)

---

## 6. Spécifications Fonctionnelles Détaillées

### 6.1 Module 1 — Onboarding & Configuration

#### 6.1.1 Inscription du Marchand

**Étape 1 — Informations générales**
```
Champs requis :
- Nom complet
- Email professionnel
- Numéro de téléphone (WhatsApp)
- Nom de la boutique
- Secteur d'activité (mode, électronique, beauté, alimentation, autre)
- Nombre de commandes par jour (fourchette)
- Pays (Maroc, Tunisie, Algérie, autre)
```

**Étape 2 — Configuration de l'agent IA**
```
Champs requis :
- Nom de l'agent (ex : "Salma de Boutique Zara Maroc")
- Langue principale (Darija, français, arabe classique, mixte)
- Ton de communication (formel, amical, professionnel)
- Horaires d'activité (l'agent répond-il 24h/24 ou avec plages horaires ?)
- Message de bienvenue personnalisé
```

**Étape 3 — Catalogue produits et FAQ**
```
Champs requis :
- Liste des produits/services principaux (texte libre ou import CSV)
- 10 questions fréquentes + réponses (formulaire guidé)
- Politique de retour (délai, conditions, procédure)
- Politique de livraison (délais, zones, frais)
- Numéro pour escalade urgente
```

**Étape 4 — Connexion WhatsApp**
```
Processus :
1. L'utilisateur entre son numéro WhatsApp Business
2. Kalam envoie un code de vérification
3. Configuration du webhook Meta (automatisée côté Kalam)
4. Test de connexion avec message de confirmation
5. Activation de l'agent
```

**Étape 5 — Connexion e-commerce (optionnel mais recommandé)**
```
Plateformes supportées v1 :
- Youcan (OAuth2)
- Shopify (OAuth2)
- WooCommerce (clé API + secret)

Données récupérées :
- Liste des commandes (ID, statut, détails client)
- Informations de livraison (trackeur)
- Catalogue produits (stock, prix)
```

#### 6.1.2 Règles de Configuration

- La configuration initiale doit prendre moins de 20 minutes
- Toutes les étapes sont sauvegardées automatiquement (pas de perte de données)
- L'utilisateur peut modifier sa configuration à tout moment depuis le dashboard
- Un assistant IA intégré aide à rédiger les FAQ et réponses types
- Un test de l'agent est proposé à la fin de l'onboarding (conversation simulée)

---

### 6.2 Module 2 — Agent IA Conversationnel

#### 6.2.1 Pipeline de Traitement d'un Message

```
MESSAGE ENTRANT (WhatsApp/Instagram/Email)
        │
        ▼
[1. RÉCEPTION] Webhook reçoit le message
        │
        ▼
[2. IDENTIFICATION CLIENT] 
   - Numéro de téléphone → recherche en base
   - Nouveau client → création fiche automatique
   - Client existant → chargement de l'historique (5 dernières conversations)
        │
        ▼
[3. DÉTECTION D'INTENTION]
   - Classification : suivi commande / question produit / réclamation / 
     retour / paiement / salutation / hors sujet / urgence
   - Langue détectée : Darija / français / arabe / mix
        │
        ▼
[4. ENRICHISSEMENT DU CONTEXTE]
   - Si "suivi commande" → appel API boutique pour récupérer statut commande
   - Si "retour" → récupération des conditions de retour configurées
   - Si "produit" → récupération catalogue produits
   - Ajout de l'historique conversation récent
        │
        ▼
[5. GÉNÉRATION DE RÉPONSE (LLM)]
   Prompt système contient :
   - Identité et personnalité de l'agent
   - Contexte boutique (FAQ, politiques, catalogue)
   - Informations commande si disponibles
   - Historique conversation
   - Instruction de langue (répondre dans la même langue)
        │
        ▼
[6. VALIDATION ET SÉCURITÉ]
   - Vérification que la réponse ne contient pas d'informations sensibles
   - Vérification que la réponse est dans la langue attendue
   - Vérification de la longueur (trop long = reformulation)
   - Détection des cas d'escalade obligatoire
        │
        ▼
[7. ROUTAGE]
   - Réponse normale → envoi direct au client
   - Cas d'escalade → notification au marchand + mise en attente
   - Hors périmètre → message de redirection poli
        │
        ▼
[8. ENREGISTREMENT]
   - Sauvegarde du message + réponse en base
   - Mise à jour de la fiche client
   - Déclenchement des analytics
```

#### 6.2.2 Gestion du Suivi de Commande

**Flux pour "Où est ma commande ?"**

```
1. Détection de l'intention "suivi commande"
2. Extraction de l'identifiant client (téléphone, email ou nom)
3. Appel API boutique → récupération de la dernière commande
4. Appel API livreur → statut de livraison temps réel
5. Génération de réponse contextualisée en Darija/français

Exemples de réponses générées :
- "Assalam 3lik ! Commande #4821 — Votre colis est en route et sera 
  livré aujourd'hui avant 18h à Casablanca. Numéro de suivi : MA1234567."
- "Bonjour ! Votre commande #4821 a été expédiée hier par Amana. 
  Livraison prévue demain 14-18h. Vous pouvez suivre ici : [lien]"
```

**Statuts de commande gérés :**

| Statut | Réponse IA |
|---|---|
| En attente de paiement | Explique les options de paiement disponibles |
| Paiement confirmé | Informe que la préparation est en cours |
| En cours de préparation | Délai estimé d'expédition |
| Expédiée | Numéro de suivi + lien livreur |
| En livraison | Plage horaire du jour + contact livreur si disponible |
| Livrée | Confirmation + demande de satisfaction |
| Retour en cours | Statut du retour et délai de remboursement |
| Annulée | Raison + conditions de remboursement |

#### 6.2.3 Gestion des Réclamations

**Catégories et réponses automatiques :**

| Problème | Seuil d'escalade | Traitement IA |
|---|---|---|
| Produit non reçu (< 7 jours) | Non | Vérification statut + réassurance |
| Produit non reçu (> 7 jours) | Oui | Notification marchand + formulaire réclamation |
| Produit défectueux | Oui | Procédure retour + photo requise |
| Mauvaise taille / couleur | Non (si politique retour claire) | Procédure échange |
| Remboursement | Oui si montant > seuil configuré | Notification marchand |
| Problème paiement | Oui | Escalade immédiate |
| Plainte grave / insulte | Oui + flagging | Escalade + log prioritaire |

#### 6.2.4 Système d'Escalade

**Déclencheurs d'escalade automatique :**

1. Détection de mot-clé d'urgence (liste configurable)
2. Client ayant un historique d'escalades
3. Montant de commande supérieur au seuil défini par le marchand
4. L'IA a échoué à répondre 2 fois de suite sur le même sujet
5. Client ayant explicitement demandé un humain
6. Message contenant une menace légale
7. Commande datant de plus de 15 jours sans résolution

**Processus d'escalade :**

```
1. L'IA envoie un message au client :
   "Je vais transmettre votre demande à notre équipe qui vous 
   contactera dans les 30 minutes. Désolé pour la gêne occasionnée."

2. Notification envoyée au marchand (WhatsApp + dashboard) :
   - Résumé de la conversation
   - Motif de l'escalade
   - Fiche client complète
   - Commande concernée
   - Action recommandée par l'IA

3. Timer déclenché : si pas de réponse dans 30 min → 2e notification

4. Une fois le marchand prend en main :
   - Conversation transférée en mode "humain actif"
   - L'IA se met en veille sur cette conversation
   - L'IA reprend automatiquement après 24h si le ticket est résolu
```

#### 6.2.5 Gestion Multilingue

**Langues supportées :**

| Langue | Niveau de support | Notes |
|---|---|---|
| Darija (arabe marocain) | ⭐⭐⭐⭐⭐ | Priorité absolue, fine-tuning progressif |
| Français | ⭐⭐⭐⭐⭐ | Support natif LLM |
| Arabe classique (MSA) | ⭐⭐⭐⭐ | Support LLM standard |
| Code-switching Darija/Français | ⭐⭐⭐⭐ | Prompt engineering spécialisé |
| Anglais | ⭐⭐⭐ | Support basique, non prioritaire |
| Amazigh / Tamazight | ⭐⭐ | Prévu v3 |

**Règle de langue :**

L'agent répond systématiquement dans la langue utilisée par le client. Si le client écrit en Darija, la réponse est en Darija. Si le client mélange français et arabe, la réponse suit le même mélange.

La langue de l'agent peut être forcée par le marchand (ex : "toujours répondre en français formel").

---

### 6.3 Module 3 — CRM Client Automatique

#### 6.3.1 Fiche Client

Chaque client ayant interagi avec un agent Kalam dispose d'une fiche automatiquement générée et enrichie :

```yaml
Fiche Client :
  Identification :
    - id_unique: UUID
    - telephone: "+212XXXXXXXXX"
    - email: optionnel
    - nom_detecte: "Karima" (extrait des conversations)
    - langue_preferee: "darija"
    
  Activité :
    - premiere_interaction: datetime
    - derniere_interaction: datetime
    - nombre_conversations: int
    - nombre_commandes: int (depuis plateforme e-commerce liée)
    - valeur_totale_commandes: float (MAD)
    
  Comportement :
    - heure_interaction_preferee: "18h-20h"
    - canaux_utilises: ["whatsapp", "instagram"]
    - sujets_frequents: ["suivi", "retour", "produit_X"]
    - taux_satisfaction: 4.2/5 (calculé sur les réponses)
    
  Segmentation automatique :
    - tags: ["client_fidele", "acheteur_frequents", "retours_frequents"]
    - segment: "VIP" | "Régulier" | "Occasionnel" | "À risque" | "Inactif"
    - score_risque_churn: 0-100
    
  Historique :
    - conversations: [liste des 50 dernières]
    - commandes: [liste depuis la boutique liée]
    - escalades: [liste des escalades passées]
    - notes_marchand: texte libre
```

#### 6.3.2 Règles de Segmentation Automatique

| Segment | Critères |
|---|---|
| **VIP** | +5 commandes OU valeur totale > 3 000 MAD OU ancienneté > 6 mois |
| **Régulier** | 2-5 commandes, satisfaction > 3,5/5 |
| **Occasionnel** | 1-2 commandes, dernière interaction < 90 jours |
| **À risque** | Score churn > 70 OU réclamation non résolue > 48h |
| **Inactif** | Dernière interaction > 90 jours |

---

### 6.4 Module 4 — Dashboard Marchand

#### 6.4.1 Vue Principale (Inbox)

```
┌─────────────────────────────────────────────────────────┐
│  KALAM Dashboard — Boutique Zara Maroc                  │
│                                                         │
│  [📊 Aujourd'hui : 47 messages · 43 auto · 4 escalades] │
│                                                         │
│  ESCALADES EN ATTENTE (4)          CONVERSATIONS         │
│  ┌──────────────────────┐          ┌──────────────────┐  │
│  │ 🔴 Karim — Remboursement│        │ ✅ Auto-résolu   │  │
│  │    Commande #4821     │          │ ✅ Auto-résolu   │  │
│  │    Il y a 12 min      │          │ ✅ Auto-résolu   │  │
│  ├──────────────────────┤          │ ✅ Auto-résolu   │  │
│  │ 🟡 Fatima — Retour   │          │ 🔴 Escalade     │  │
│  │    Commande #4799     │          │ ...             │  │
│  │    Il y a 34 min      │          └──────────────────┘  │
│  └──────────────────────┘                               │
│                                                         │
│  [🔍 Rechercher un client]  [📅 Filtres]               │
└─────────────────────────────────────────────────────────┘
```

#### 6.4.2 Vue Conversation

```
┌─────────────────────────────────────────────────────────┐
│  ← Karim El Mansouri  |  +212 6XX XXX XXX              │
│  Client VIP · 8 commandes · 2 400 MAD dépensés         │
│                                                         │
│  [Voir fiche complète]  [Prendre en main]  [Résoudre]  │
│                                                         │
│  RÉSUMÉ IA : Karim réclame un remboursement pour la    │
│  commande #4821 (veste — 450 MAD). Produit reçu avec   │
│  une déchirure. Photos reçues. Recommandation : valider │
│  le remboursement (client VIP, historique excellent).   │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  [Karim] "Salam, 3ndi mochkil m3a lcommande dyali..."  │
│  [Agent IA] "Walaykum assalam Karim ! Wach imkan..."   │
│  [Karim] "Ayeh l jacket wasslat mcherqa..."            │
│  [Agent IA] "Smh 3lik had chi. Wach imkan tsifet..."   │
│  [Karim] [Photo envoyée]                               │
│  [Agent IA] "Merci pour la photo. J'escalade votre..." │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│  [Répondre en tant que moi]  [Laisser l'IA reprendre]  │
└─────────────────────────────────────────────────────────┘
```

#### 6.4.3 Notifications

| Événement | Canal | Délai |
|---|---|---|
| Nouvelle escalade | WhatsApp + Dashboard | Immédiat |
| Escalade non traitée (30 min) | WhatsApp | Après 30 min |
| Nouveau client VIP détecté | Dashboard | Temps réel |
| Rapport hebdomadaire prêt | Email + Dashboard | Chaque lundi 8h |
| Problème technique agent | Email | Immédiat |
| Seuil de messages atteint (plan Starter) | Email + Dashboard | À 80% et 100% |

---

### 6.5 Module 5 — Intelligence Commerciale

#### 6.5.1 Rapport Hebdomadaire Automatique

Le rapport est généré chaque lundi matin et envoyé par email et disponible dans le dashboard.

**Structure du rapport :**

```
RAPPORT KALAM — Semaine du 5 au 11 mai 2026
Boutique : Zara Maroc

📊 VUE D'ENSEMBLE
- Messages reçus : 342
- Gérés automatiquement : 298 (87,1%)
- Escalades humaines : 44 (12,9%)
- Temps de réponse moyen : 23 secondes
- Satisfaction client moyenne : 4,3/5

🏆 TOP QUESTIONS DE LA SEMAINE
1. "Wach kayn delivery L7ad?" (48 fois) → Action suggérée : 
   Ajouter la livraison du dimanche ou clarifier dans la FAQ
2. "L jacket f taille M wayla la?" (31 fois) → Action suggérée :
   Mettre à jour la disponibilité des stocks en temps réel
3. "Chhal kat3ti remboursement?" (27 fois) → Action suggérée :
   Clarifier la politique de remboursement (délai flou)

⚠️ ALERTES
- 3 clients n'ont pas reçu leur commande depuis +10 jours (action requise)
- Taux de réclamations "mauvaise taille" en hausse (+18%) → 
  Recommandation : ajouter un guide des tailles

💚 CLIENTS VIP ACTIFS
- 12 clients VIP ont interagi cette semaine
- Karim El Mansouri : 2e achat cette semaine (client fidèle depuis 14 mois)

📈 TENDANCES
- Les messages arrivent principalement entre 19h et 22h
- Le samedi est votre journée la plus chargée
- La satisfaction est plus basse le vendredi (résolution + lente)
```

---

### 6.6 Module 6 — Administration SaaS

#### 6.6.1 Gestion des Abonnements

**Plans et limites :**

| Fonctionnalité | Starter | Pro | Scale |
|---|---|---|---|
| Prix mensuel | 990 MAD | 2 490 MAD | 5 900 MAD |
| Prix annuel (2 mois offerts) | 9 900 MAD | 24 900 MAD | 59 000 MAD |
| Conversations/mois | 500 | Illimité | Illimité |
| Canaux | WhatsApp | WhatsApp + Email | Tous canaux |
| Intégrations e-commerce | 1 | 3 | Illimité |
| Intégrations livreurs | 1 | 3 | Illimité |
| Agents utilisateurs | 1 | 3 | Illimité |
| CRM client | Basique | Complet | Complet + API |
| Rapports IA | Mensuel | Hebdomadaire | Quotidien |
| Support | Email | WhatsApp | Dédié |
| SLA réponse | 48h | 24h | 4h |

#### 6.6.2 Facturation

- Paiement par carte bancaire (CMI, CIH Pay) ou virement bancaire
- Facturation automatique mensuelle ou annuelle
- Facture PDF générée automatiquement (conformité comptable marocaine)
- Période d'essai gratuite : 14 jours, toutes fonctionnalités Pro
- Pas de carte de crédit requise pour l'essai

---

## 7. Architecture Technique

### 7.1 Vue d'Ensemble de l'Architecture

```
                        INTERNET
                           │
           ┌───────────────┼───────────────┐
           │               │               │
      WhatsApp          Instagram        Email
    Business API       Graph API      (SMTP/IMAP)
           │               │               │
           └───────────────┼───────────────┘
                           │
                    ┌──────▼──────┐
                    │  CLOUDFLARE │  (Protection DDoS + CDN)
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  API GATEWAY│  (Railway / Render)
                    │  Node.js    │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
    ┌──────▼──────┐ ┌──────▼──────┐ ┌─────▼──────┐
    │  MESSAGE    │ │    AI       │ │   WORKER   │
    │  SERVICE   │ │  SERVICE    │ │  SERVICE   │
    │ (Webhooks) │ │ (LLM calls) │ │ (Jobs BG)  │
    └──────┬──────┘ └──────┬──────┘ └─────┬──────┘
           │               │               │
           └───────────────┼───────────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼───┐  ┌─────▼────┐ ┌───▼──────┐
       │PostgreSQL│  │  Redis   │ │ Storage  │
       │(Supabase)│  │  Cache   │ │(Fichiers)│
       └──────────┘  └──────────┘ └──────────┘
              │
    ┌─────────┴──────────┐
    │  INTÉGRATIONS EXT. │
    │  Youcan · Shopify  │
    │  Amana · J&T       │
    │  CMI · CIH Pay     │
    └────────────────────┘
```

### 7.2 Stack Technologique Détaillée

#### Backend Principal

| Composant | Technologie | Justification |
|---|---|---|
| Runtime | Node.js 20 LTS | Performance I/O, écosystème riche, facilité de déploiement |
| Framework | Fastify | 2x plus rapide qu'Express, validation JSON native |
| ORM | Prisma | Type-safe, migrations automatiques, support PostgreSQL |
| Queue | BullMQ + Redis | Traitement asynchrone des messages, retry automatique |
| Auth | JWT + refresh tokens | Standard sécurisé, stateless |
| Validation | Zod | TypeScript-first, excellent DX |
| Tests | Vitest + Supertest | Rapide, compatible ESM |

#### Intelligence Artificielle

| Composant | Technologie | Justification |
|---|---|---|
| LLM Principal | Claude 3.5 Sonnet (Anthropic API) | Meilleure compréhension du Darija parmi les LLMs disponibles |
| LLM Fallback | GPT-4o mini | Alternative si Anthropic indisponible |
| Embeddings | text-embedding-3-small (OpenAI) | Recherche sémantique dans les FAQ et historiques |
| Vector Store | pgvector (PostgreSQL) | Évite un service supplémentaire en v1 |
| Intent Detection | Classificateur custom (fine-tuning léger) | Économie de tokens LLM |

#### Frontend

| Composant | Technologie | Justification |
|---|---|---|
| Framework | Next.js 14 | SSR, App Router, excellent DX |
| Langage | TypeScript | Type safety, réduction des bugs |
| UI Components | shadcn/ui + Tailwind | Composants accessibles, design professionnel |
| État global | Zustand | Léger, simple, sans boilerplate |
| Temps réel | Supabase Realtime | WebSocket intégré, pas de service supplémentaire |
| Charts | Recharts | Léger, personnalisable |

#### Infrastructure

| Composant | Service | Coût estimé |
|---|---|---|
| Hébergement backend | Railway | 20$/mois (scale automatiquement) |
| Base de données | Supabase PostgreSQL | Gratuit jusqu'à 500MB, puis 25$/mois |
| Cache Redis | Railway ou Upstash | 5-10$/mois |
| CDN + Protection | Cloudflare (Free) | 0$/mois |
| Stockage fichiers | Supabase Storage | Inclus dans le plan Supabase |
| Monitoring | Sentry (Free tier) + Better Uptime | ~10$/mois |
| Emails transactionnels | Resend | Gratuit jusqu'à 3000 emails/mois |
| **Total initial** | | **~60$/mois (~600 MAD)** |

### 7.3 Multi-Tenancy

Chaque marchand est un **tenant isolé** avec :
- Un schéma de base de données dédié OU une isolation par `tenant_id` selon le volume
- Des clés API distinctes pour chaque connexion WhatsApp
- Des prompts système distincts (configuration propre à chaque boutique)
- Une isolation des données : aucune donnée d'un tenant n'est accessible par un autre

**Stratégie choisie en v1 :** Isolation par `tenant_id` dans un schéma partagé (plus simple à gérer, migration vers schémas séparés si nécessaire en v2).

### 7.4 Traitement des Messages — Détail Technique

```javascript
// Exemple de flux de traitement d'un message entrant
// POST /webhooks/whatsapp

async function processIncomingMessage(webhookPayload) {
  // 1. Validation et extraction
  const { from, text, messageId, timestamp } = parseWhatsAppPayload(webhookPayload);
  
  // 2. Anti-duplication (Redis, TTL 24h)
  if (await redis.exists(`msg:${messageId}`)) return;
  await redis.setex(`msg:${messageId}`, 86400, '1');
  
  // 3. Identification du tenant (marchand)
  const tenant = await getTenantByWhatsAppNumber(to);
  
  // 4. Récupération/création du client
  const customer = await upsertCustomer({ phone: from, tenantId: tenant.id });
  
  // 5. Historique des conversations (5 dernières)
  const history = await getConversationHistory(customer.id, limit=5);
  
  // 6. Détection d'intention (classificateur rapide)
  const intent = await detectIntent(text); 
  // Retourne: 'order_tracking' | 'product_question' | 'complaint' | 'return' | 'other'
  
  // 7. Enrichissement contextuel
  let contextData = {};
  if (intent === 'order_tracking') {
    contextData.order = await fetchLatestOrder(customer.phone, tenant.ecommerceConfig);
    if (contextData.order?.trackingNumber) {
      contextData.delivery = await fetchDeliveryStatus(contextData.order.trackingNumber, tenant.deliveryConfig);
    }
  }
  
  // 8. Génération de la réponse IA
  const response = await generateAIResponse({
    tenantPrompt: tenant.agentConfig.systemPrompt,
    customerMessage: text,
    history,
    contextData,
    language: detectLanguage(text)
  });
  
  // 9. Vérification du seuil d'escalade
  if (response.shouldEscalate || customer.escalateFlag) {
    await escalateToHuman(tenant, customer, text, history);
    return;
  }
  
  // 10. Envoi de la réponse
  await sendWhatsAppMessage(from, response.text, tenant.whatsappToken);
  
  // 11. Logging et analytics
  await logConversation({ tenant, customer, message: text, response: response.text, intent });
}
```

---

## 8. Modèle de Données

### 8.1 Schéma Principal

```sql
-- TENANTS (Marchands)
CREATE TABLE tenants (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(255) NOT NULL,          -- Nom de la boutique
  email         VARCHAR(255) UNIQUE NOT NULL,
  phone         VARCHAR(20),
  plan          VARCHAR(50) DEFAULT 'trial',    -- trial | starter | pro | scale
  plan_expires  TIMESTAMP,
  status        VARCHAR(50) DEFAULT 'active',   -- active | suspended | cancelled
  country       VARCHAR(10) DEFAULT 'MA',
  created_at    TIMESTAMP DEFAULT NOW(),
  updated_at    TIMESTAMP DEFAULT NOW()
);

-- CONFIGURATION AGENT (1 par tenant en v1)
CREATE TABLE agent_configs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID REFERENCES tenants(id) ON DELETE CASCADE,
  name            VARCHAR(100),                 -- "Salma de Boutique X"
  language        VARCHAR(20) DEFAULT 'darija', -- darija | fr | ar | mixed
  tone            VARCHAR(50) DEFAULT 'friendly',
  system_prompt   TEXT,                         -- Prompt complet généré
  faq             JSONB DEFAULT '[]',           -- [{q: "...", a: "..."}]
  return_policy   TEXT,
  shipping_policy TEXT,
  working_hours   JSONB,                        -- {mon: {from: "9:00", to: "18:00"}, ...}
  escalate_keywords TEXT[],
  escalate_amount DECIMAL(10,2) DEFAULT 500,
  escalate_phone  VARCHAR(20),
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

-- CONNEXIONS WHATSAPP
CREATE TABLE whatsapp_connections (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID REFERENCES tenants(id) ON DELETE CASCADE,
  phone_number_id VARCHAR(100) NOT NULL,         -- ID Meta
  phone_number    VARCHAR(20) NOT NULL,
  access_token    TEXT NOT NULL,                 -- Chiffré en base
  webhook_secret  VARCHAR(255),
  status          VARCHAR(50) DEFAULT 'active',
  connected_at    TIMESTAMP DEFAULT NOW()
);

-- CONNEXIONS E-COMMERCE
CREATE TABLE ecommerce_connections (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID REFERENCES tenants(id) ON DELETE CASCADE,
  platform        VARCHAR(50) NOT NULL,          -- youcan | shopify | woocommerce
  shop_url        VARCHAR(255),
  access_token    TEXT,                          -- Chiffré
  api_key         TEXT,                          -- Chiffré
  api_secret      TEXT,                          -- Chiffré
  status          VARCHAR(50) DEFAULT 'active',
  last_sync       TIMESTAMP,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- CLIENTS (Acheteurs finals)
CREATE TABLE customers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID REFERENCES tenants(id) ON DELETE CASCADE,
  phone           VARCHAR(20) NOT NULL,
  email           VARCHAR(255),
  name            VARCHAR(255),
  language        VARCHAR(20) DEFAULT 'darija',
  segment         VARCHAR(50) DEFAULT 'new',    -- new | regular | vip | at_risk | inactive
  churn_score     INTEGER DEFAULT 0,            -- 0-100
  total_orders    INTEGER DEFAULT 0,
  total_spent     DECIMAL(10,2) DEFAULT 0,
  tags            TEXT[] DEFAULT '{}',
  notes           TEXT,
  first_contact   TIMESTAMP DEFAULT NOW(),
  last_contact    TIMESTAMP DEFAULT NOW(),
  created_at      TIMESTAMP DEFAULT NOW(),
  UNIQUE(tenant_id, phone)
);

-- CONVERSATIONS
CREATE TABLE conversations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID REFERENCES tenants(id) ON DELETE CASCADE,
  customer_id     UUID REFERENCES customers(id),
  channel         VARCHAR(50) DEFAULT 'whatsapp', -- whatsapp | instagram | email
  status          VARCHAR(50) DEFAULT 'open',     -- open | resolved | escalated
  escalated       BOOLEAN DEFAULT FALSE,
  escalated_at    TIMESTAMP,
  resolved_at     TIMESTAMP,
  started_at      TIMESTAMP DEFAULT NOW(),
  last_message_at TIMESTAMP DEFAULT NOW()
);

-- MESSAGES
CREATE TABLE messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  tenant_id       UUID REFERENCES tenants(id),
  customer_id     UUID REFERENCES customers(id),
  direction       VARCHAR(10) NOT NULL,           -- inbound | outbound
  channel         VARCHAR(50) DEFAULT 'whatsapp',
  content         TEXT NOT NULL,
  media_url       TEXT,                           -- URL si image/document
  intent          VARCHAR(100),                   -- intent détecté
  language        VARCHAR(20),                    -- langue détectée
  handled_by      VARCHAR(50) DEFAULT 'ai',       -- ai | human
  tokens_used     INTEGER,                        -- Pour le suivi des coûts LLM
  latency_ms      INTEGER,                        -- Temps de génération
  external_id     VARCHAR(255),                   -- ID du message WhatsApp
  sent_at         TIMESTAMP DEFAULT NOW()
);

-- ESCALADES
CREATE TABLE escalations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID REFERENCES tenants(id),
  conversation_id UUID REFERENCES conversations(id),
  customer_id     UUID REFERENCES customers(id),
  reason          VARCHAR(255) NOT NULL,
  summary         TEXT,                           -- Résumé IA de la situation
  recommendation  TEXT,                           -- Action recommandée par l'IA
  status          VARCHAR(50) DEFAULT 'pending',  -- pending | in_progress | resolved
  resolved_by     VARCHAR(255),
  resolved_at     TIMESTAMP,
  created_at      TIMESTAMP DEFAULT NOW()
);

-- ANALYTICS (agrégats quotidiens)
CREATE TABLE daily_analytics (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID REFERENCES tenants(id),
  date            DATE NOT NULL,
  total_messages  INTEGER DEFAULT 0,
  auto_resolved   INTEGER DEFAULT 0,
  escalated       INTEGER DEFAULT 0,
  avg_latency_ms  INTEGER DEFAULT 0,
  avg_csat        DECIMAL(3,2),
  new_customers   INTEGER DEFAULT 0,
  tokens_used     INTEGER DEFAULT 0,
  cost_usd        DECIMAL(10,4) DEFAULT 0,
  UNIQUE(tenant_id, date)
);

-- ABONNEMENTS ET FACTURATION
CREATE TABLE subscriptions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID REFERENCES tenants(id),
  plan            VARCHAR(50) NOT NULL,
  billing_cycle   VARCHAR(20) DEFAULT 'monthly', -- monthly | annual
  amount_mad      DECIMAL(10,2) NOT NULL,
  status          VARCHAR(50) DEFAULT 'active',
  current_period_start TIMESTAMP,
  current_period_end   TIMESTAMP,
  payment_method  VARCHAR(50),                   -- cmi | cih | bank_transfer
  created_at      TIMESTAMP DEFAULT NOW()
);
```

### 8.2 Index et Performance

```sql
-- Index critiques pour les performances
CREATE INDEX idx_messages_conversation ON messages(conversation_id, sent_at DESC);
CREATE INDEX idx_messages_tenant ON messages(tenant_id, sent_at DESC);
CREATE INDEX idx_customers_tenant_phone ON customers(tenant_id, phone);
CREATE INDEX idx_conversations_tenant_status ON conversations(tenant_id, status, last_message_at DESC);
CREATE INDEX idx_escalations_tenant_status ON escalations(tenant_id, status, created_at DESC);
CREATE INDEX idx_analytics_tenant_date ON daily_analytics(tenant_id, date DESC);
```

---

## 9. Intégrations Externes

### 9.1 WhatsApp Business API (Meta)

**Type d'intégration :** Cloud API (Meta) — pas de serveur WhatsApp nécessaire

**Flux d'authentification :**

```
1. Le marchand crée une application Meta Business
2. Kalam récupère le token via OAuth ou entrée manuelle
3. Kalam enregistre le webhook URL sur les serveurs Meta
4. Vérification du webhook (challenge Meta)
5. Activation de la réception des messages
```

**Endpoints utilisés :**

| Endpoint | Usage |
|---|---|
| `POST /messages` | Envoyer un message texte ou média |
| `GET /phone_numbers` | Récupérer les numéros liés |
| `POST /media` | Envoyer ou récupérer des médias |
| Webhook `messages` | Recevoir les messages entrants |
| Webhook `statuses` | Accusés de réception |

**Limites et gestion :**
- Fenêtre de messagerie : 24h après le dernier message du client
- Messages hors fenêtre : utilisation des templates approuvés (Message Templates)
- Rate limit : 80 messages/seconde (géré par la queue BullMQ)
- Coût Meta : gratuit jusqu'à 1 000 conversations/mois initiées par l'utilisateur

### 9.2 Youcan (E-commerce Local)

**Priorité :** Intégration n°1 — plateforme leader e-commerce marocain

**Type :** REST API + Webhooks

**Données récupérées :**

```javascript
// Commande Youcan
{
  id: "YC-123456",
  status: "shipped" | "delivered" | "pending" | "cancelled",
  customer: { name, phone, email, address },
  items: [{ product_name, sku, quantity, price }],
  total: 450.00,
  created_at: "2026-05-08T14:32:00Z",
  tracking: {
    carrier: "Amana",
    tracking_number: "AM123456789",
    tracking_url: "https://track.amana.ma/...",
    estimated_delivery: "2026-05-10"
  }
}
```

**Webhooks Youcan à écouter :**
- `order.created` — Nouvelle commande
- `order.updated` — Mise à jour de statut
- `order.shipped` — Expédition confirmée
- `order.delivered` — Livraison confirmée

### 9.3 Shopify

**Type :** REST Admin API + GraphQL + Webhooks

**OAuth2 Flow :**
```
1. Marchand entre son URL Shopify (ex: ma-boutique.myshopify.com)
2. Kalam redirige vers Shopify OAuth
3. Marchand autorise les permissions (read_orders, read_products, read_customers)
4. Shopify redirige avec access_token
5. Kalam stocke le token chiffré
```

**Scopes requis :** `read_orders`, `read_products`, `read_inventory`, `read_customers`

### 9.4 WooCommerce

**Type :** REST API v3 (clé API + secret)

**Endpoints utilisés :**
- `GET /orders` — Liste des commandes
- `GET /orders/{id}` — Détail d'une commande
- `GET /products` — Catalogue produits

### 9.5 Transporteurs Locaux

#### Amana Express (priorité 1)

```javascript
// Appel API Amana
GET https://api.amana.ma/tracking/{tracking_number}
Headers: { 'Authorization': 'Bearer {token}' }

// Réponse
{
  tracking_number: "AM123456789",
  status: "in_delivery",
  status_label: "En cours de livraison",
  estimated_date: "2026-05-10",
  events: [
    { date: "2026-05-09 08:30", description: "Prise en charge Casablanca" },
    { date: "2026-05-09 14:00", description: "En route vers Marrakech" }
  ]
}
```

#### J&T Express Maroc (priorité 2)

Même structure d'intégration, endpoint différent.

#### Marocpost / Chronopost Maroc (priorité 3)

Intégration via scraping du portail de tracking ou API partenaire si disponible.

### 9.6 Paiement et Facturation

#### CMI (Centre Monétique Interbancaire)

- Paiement par carte bancaire marocaine (Visa, Mastercard, Maestro)
- Intégration via SDK CMI ou redirection vers page de paiement CMI
- Nécessite un contrat CMI (obtenu auprès d'une banque marocaine partenaire)

#### CIH Pay

- Alternative moderne, API REST
- Support des cartes et portefeuilles digitaux

#### Facturation automatique

```javascript
// Génération de facture PDF (bibliothèque PDFKit)
Invoice {
  numero: "FAC-2026-00123",
  date: "01/05/2026",
  client: { nom, adresse, ICE, IF },
  marchand: { Kalam SARL, ICE: XXXXXXXX, IF: XXXXXXX, RC: XXXXXXX },
  lignes: [
    { designation: "Abonnement Kalam Pro — Mai 2026", quantite: 1, pu: 2075 MAD, tva: 20%, total: 2490 MAD }
  ],
  total_ht: 2075 MAD,
  tva: 415 MAD,
  total_ttc: 2490 MAD
}
```

---

## 10. Interface Utilisateur et Expérience

### 10.1 Principes de Design

1. **Mobile-first** — 80% des marchands gèrent leur activité depuis leur smartphone
2. **Simple avant tout** — Chaque écran a un seul objectif, pas de feature fatigue
3. **Bilingue natif** — Interface disponible en français ET en arabe (RTL), commutable à tout moment
4. **Feedback immédiat** — Chaque action donne un retour visuel en moins de 200ms
5. **Zéro formation nécessaire** — Un marchand doit pouvoir utiliser Kalam sans tutorial

### 10.2 Pages et Écrans

#### Onboarding (Public)

1. `/` — Page d'accueil marketing
2. `/inscription` — Formulaire d'inscription (5 étapes avec progress bar)
3. `/connexion` — Login email + mot de passe

#### Application (Authentifié)

| Route | Écran | Description |
|---|---|---|
| `/dashboard` | Vue principale | Inbox, escalades en attente, métriques du jour |
| `/conversations` | Liste conversations | Toutes les conversations filtrables |
| `/conversations/:id` | Conversation | Fil de messages + fiche client + actions |
| `/clients` | CRM | Liste clients, segmentation, recherche |
| `/clients/:id` | Fiche client | Profil complet, historique, notes |
| `/rapports` | Intelligence | Rapports hebdomadaires et métriques |
| `/configuration` | Paramètres agent | Modifier les infos de l'agent IA |
| `/connexions` | Intégrations | Gérer les connexions WhatsApp, boutique, livraison |
| `/abonnement` | Facturation | Plan actuel, historique, upgrade |

### 10.3 Application Mobile (Progressive Web App)

En v1, Kalam est une PWA (Progressive Web App) installable sur iOS et Android, sans développement natif. Fonctionnalités clés de la PWA :
- Notifications push natives (escalades)
- Fonctionnement offline partiel (lecture du cache)
- Raccourci sur écran d'accueil
- Interface adaptée au touch

### 10.4 Design System

- **Couleurs primaires :** Vert teal (#1D9E75) pour les succès, Bleu (#378ADD) pour les actions, Rouge (#E24B4A) pour les urgences
- **Typographie :** Police sans-serif latine + police arabe (Noto Sans Arabic) pour les interfaces RTL
- **Composants :** shadcn/ui (accessible, open-source)
- **Icônes :** Lucide React

---

## 11. Sécurité et Conformité

### 11.1 Sécurité des Données

#### Chiffrement

| Donnée | Méthode |
|---|---|
| Mots de passe | bcrypt (salt rounds: 12) |
| Tokens API (WhatsApp, e-commerce) | AES-256-GCM, clé en variable d'environnement |
| Communications HTTPS | TLS 1.3 minimum |
| Données en base | PostgreSQL chiffrement at-rest (Supabase) |

#### Authentification

```
- JWT access token (expiration : 15 minutes)
- Refresh token (expiration : 30 jours, rotation automatique)
- Rate limiting par IP : 100 requêtes/minute sur les endpoints d'auth
- Protection CSRF sur toutes les mutations
- Headers de sécurité : HSTS, X-Frame-Options, CSP
```

#### Isolation des tenants

```
- Chaque requête API vérifie que tenant_id de l'utilisateur 
  correspond aux données demandées
- Middleware d'isolation : aucune requête ne peut accéder à des 
  données d'un autre tenant
- Audit log de toutes les accès aux données sensibles
```

### 11.2 Gestion de la Confidentialité

- **Données clients** : Les conversations des clients des marchands sont des données personnelles sensibles.
- **Politique de rétention** : Conversations archivées après 12 mois, suppression définitive sur demande du marchand
- **Droit à la suppression** : API de suppression des données d'un client sur demande
- **Pas de partage de données** : Les données d'un tenant ne sont jamais utilisées pour améliorer le service pour un autre tenant sans consentement explicite
- **Localisation des données** : Données stockées sur serveurs européens (Supabase EU) pour conformité avec les standards internationaux

### 11.3 Conformité Marocaine

- **Loi 09-08** : Protection des données personnelles au Maroc — déclaration CNDP si applicable
- **Facturation** : Conformité aux exigences DGI (Direction Générale des Impôts) — ICE, IF sur toutes les factures
- **TVA** : Application de la TVA à 20% sur toutes les prestations
- **Statut légal recommandé** : SARL au capital minimum (10 000 MAD), RC, patente

---

## 12. Performance et Scalabilité

### 12.1 Objectifs de Performance

| Métrique | Objectif | Critique |
|---|---|---|
| Temps de réponse webhook → réponse WhatsApp | < 5 secondes | Oui |
| Temps de génération LLM | < 3 secondes | Oui |
| Disponibilité (uptime) | 99,5% | Oui |
| Temps de chargement dashboard | < 2 secondes | Non |
| Latence API interne | < 200ms (p95) | Non |

### 12.2 Stratégie de Scalabilité

#### Phase 1 (0-100 clients) — Monolithe simple

```
- 1 serveur Railway (2 vCPU, 2GB RAM) : ~20$/mois
- 1 PostgreSQL Supabase Pro : 25$/mois
- 1 Redis (Upstash) : 5$/mois
- Total infra : ~50$/mois (~500 MAD)
- Capacité : ~50 000 messages/jour
```

#### Phase 2 (100-500 clients) — Séparation des services

```
- API Gateway (2 instances)
- Message Service dédié
- AI Service dédié (optimisation LLM)
- Worker Service dédié
- PostgreSQL : instance dédiée avec réplica lecture
- Total infra : ~200-300$/mois
- Capacité : ~500 000 messages/jour
```

#### Phase 3 (500+ clients) — Architecture distribuée

```
- Kubernetes (GKE ou EKS)
- Microservices complets
- Base de données shardée par région
- CDN multi-régions
- Total infra : à partir de 1 000$/mois
```

### 12.3 Optimisation des Coûts LLM

Le coût principal variable est l'appel à l'API LLM.

**Stratégie de réduction des coûts :**

| Technique | Réduction coût | Complexité |
|---|---|---|
| Cache sémantique des réponses fréquentes | -30% | Faible |
| Classificateur d'intention léger (avant LLM) | -20% | Faible |
| Troncature intelligente de l'historique | -15% | Faible |
| LLM moins cher pour les cas simples | -25% | Moyen |
| Fine-tuning sur modèle open-source (Llama) | -70% | Élevé (v3) |

**Coût LLM estimé par message :**

| Type de message | Tokens moyens | Coût Claude Sonnet |
|---|---|---|
| Question simple | ~500 tokens | ~0,001 USD |
| Suivi commande | ~800 tokens | ~0,0016 USD |
| Réclamation complexe | ~1500 tokens | ~0,003 USD |
| **Moyenne pondérée** | **~700 tokens** | **~0,0014 USD (~0,014 MAD)** |

Pour 100 000 messages/mois : **~140 MAD de coût LLM** — négligeable vs revenus.

---

## 13. Modèle Économique

### 13.1 Structure de Revenus

#### Revenus Principaux (ARR)

| Source | Description | Part des revenus |
|---|---|---|
| Abonnements SaaS | Plans mensuels et annuels | 90% |
| Onboarding Premium | Setup assisté par Kalam (1x) | 5% |
| Dépassement de quotas | Conversations supplémentaires au-delà du plan | 5% |

#### Revenus Futurs (Année 2+)

- Commissions sur transactions e-commerce récupérées (panier abandonnés relancés par l'IA)
- API Kalam pour développeurs tiers (plan Enterprise)
- Formations et certification partenaires

### 13.2 Modèle de Coûts

| Poste | Coût mensuel (50 clients) | Coût mensuel (200 clients) |
|---|---|---|
| Infra cloud | 500 MAD | 2 000 MAD |
| APIs LLM | 700 MAD | 3 000 MAD |
| WhatsApp/Meta | 0 (conversations entrantes) | 0 |
| Facturation/paiement (CMI) | 1% des revenus | 1% des revenus |
| Support client | 0 (fondateur) | 2 000 MAD |
| **Total coûts variables** | **~1 500 MAD** | **~7 500 MAD** |

**Revenus à 50 clients (mix Starter/Pro) :** ~70 000 MAD/mois
**Marge brute à 50 clients :** ~97,8%

### 13.3 Projection Financière sur 36 Mois

| Période | Clients | MRR | Coûts | Bénéfice |
|---|---|---|---|---|
| M6 | 30 | 50 000 MAD | 5 000 MAD | 45 000 MAD |
| M12 | 100 | 180 000 MAD | 15 000 MAD | 165 000 MAD |
| M18 | 200 | 400 000 MAD | 35 000 MAD | 365 000 MAD |
| M24 | 350 | 700 000 MAD | 80 000 MAD | 620 000 MAD |
| M36 | 600 | 1 200 000 MAD | 180 000 MAD | 1 020 000 MAD |

### 13.4 Unité Économique (Unit Economics)

| Métrique | Valeur cible |
|---|---|
| CAC (Coût d'Acquisition Client) | < 500 MAD |
| LTV (Lifetime Value) — Plan Pro | ~30 000 MAD (12 mois avg) |
| LTV/CAC ratio | > 60x |
| Churn mensuel cible | < 3% |
| Payback period | < 1 mois |

### 13.5 Stratégie de Pricing

- **Positionnement :** Le plan Starter (990 MAD) est inférieur au coût d'une demi-heure de travail d'un agent SAV dédié. L'argument de vente est économique et immédiat.
- **Freemium :** Pas de plan gratuit permanent (génère des coûts sans revenus), mais essai 14 jours toutes fonctionnalités Pro.
- **Annual incentive :** 2 mois offerts pour les paiements annuels (augmente le cashflow et réduit le churn).
- **Expansion :** Upsell automatique quand le Starter atteint 80% de son quota de conversations.

---

## 14. Roadmap et Planning

### 14.1 Phase 0 — Préparation (Semaines 1-2)

**Objectif : Poser les fondations**

- [ ] Création de l'entité légale (SARL ou auto-entrepreneur)
- [ ] Ouverture compte bancaire professionnel
- [ ] Achat du nom de domaine (kalam.ma ou kalam.io)
- [ ] Mise en place environnement de développement (repo GitHub, CI/CD basique)
- [ ] Création du compte Meta Business (WhatsApp Business API)
- [ ] Inscription programme partenaire Youcan
- [ ] Setup Supabase + Railway + Cloudflare
- [ ] Design system et composants UI de base

**Livrable :** Infrastructure technique opérationnelle

---

### 14.2 Phase 1 — MVP (Semaines 3-7)

**Objectif : Premier agent WhatsApp fonctionnel**

**Semaine 3-4 : Backend core**
- [ ] Système d'authentification (register, login, JWT)
- [ ] Modèle de données complet (migrations Prisma)
- [ ] Webhook WhatsApp (réception + envoi de messages)
- [ ] Pipeline de traitement de message (sans LLM d'abord)
- [ ] Queue BullMQ pour les jobs asynchrones

**Semaine 5 : Intégration LLM**
- [ ] Intégration Claude API
- [ ] Système de prompt template (par tenant)
- [ ] Détection de langue (Darija/Français/Arabe)
- [ ] Cache Redis pour les réponses fréquentes

**Semaine 6-7 : Frontend et onboarding**
- [ ] Formulaire d'inscription (5 étapes)
- [ ] Dashboard basique (inbox + conversations)
- [ ] Connexion WhatsApp (flow de configuration)
- [ ] Système de notifications (escalade → WhatsApp marchand)

**Livrable :** Agent WhatsApp fonctionnel pour 3 clients beta gratuits

**KPI de validation :**
- [ ] L'agent répond en moins de 5 secondes
- [ ] La réponse est correcte en Darija et en français
- [ ] Pas de crash sur 1000 messages consécutifs

---

### 14.3 Phase 2 — Intégrations Locales (Semaines 8-12)

**Objectif : Le vrai fossé compétitif**

- [ ] Intégration Youcan (commandes, statut, tracking)
- [ ] Intégration Shopify (commandes)
- [ ] Intégration Amana (tracking livraison)
- [ ] Suivi de commande automatique ("où est ma commande ?")
- [ ] Gestion des retours (informations + procédure)
- [ ] CRM client (fiche automatique, segments basiques)
- [ ] Système d'escalade complet
- [ ] Facturation (CMI ou Stripe) + génération factures PDF
- [ ] Plans Starter et Pro

**Livrable :** Version commerciale, premiers clients payants

**KPI de validation :**
- [ ] 10 clients payants actifs
- [ ] Taux de résolution automatique > 75%
- [ ] Aucune escalade manquée

---

### 14.4 Phase 3 — Intelligence et Croissance (Semaines 13-20)

**Objectif : Rétention et upsell**

- [ ] Rapports hebdomadaires automatiques (IA-generated)
- [ ] CRM complet (segmentation, score churn, VIP)
- [ ] Canal Instagram DM
- [ ] Dashboard analytics avancé
- [ ] Application PWA (notifications push mobile)
- [ ] Intégration WooCommerce
- [ ] Intégration J&T Express
- [ ] Système de feedback client (étoiles automatiques en fin de conversation)
- [ ] A/B testing des prompts

**Livrable :** Produit mature, prêt pour l'accélération

**KPI de validation :**
- [ ] 40+ clients payants
- [ ] Churn mensuel < 5%
- [ ] NPS marchand > 50
- [ ] Taux résolution automatique > 85%

---

### 14.5 Phase 4 — Expansion (Mois 6-12)

**Objectif : Leader marocain, premiers pas Maghreb**

- [ ] Ouverture marché Tunisie
- [ ] Canal email entrant
- [ ] Fine-tuning modèle sur corpus Darija propriétaire
- [ ] API publique (plan Scale)
- [ ] Programme partenaires (agences web, développeurs Youcan)
- [ ] Premiers contacts investisseurs (Seed)
- [ ] Recrutement (1er commercial, 1 support)

---

## 15. Ressources et Équipe

### 15.1 Ressources Humaines

#### Phase 1 (Mois 1-3) — Solo

| Rôle | Temps | Budget |
|---|---|---|
| Fondateur/Développeur | 100% | Salaire fondateur ou sweat equity |
| Graphiste (freelance) | Ponctuel (logo, design) | 2 000-5 000 MAD |

#### Phase 2 (Mois 3-6) — Duet

| Rôle | Temps | Budget mensuel |
|---|---|---|
| Fondateur/CTO | 100% | Variable selon CA |
| Commercial/Growth (associé ou CDI) | 100% | 5 000-8 000 MAD |

#### Phase 3 (Mois 6-12) — Équipe de base

| Rôle | Budget mensuel |
|---|---|
| CTO (fondateur) | 15 000-25 000 MAD |
| Commercial Senior | 8 000-12 000 MAD + commission |
| Support Client | 5 000-7 000 MAD |
| Développeur Junior | 6 000-9 000 MAD |

### 15.2 Ressources Financières

**Budget de lancement (Mois 1-3) :**

| Poste | Montant |
|---|---|
| Légal (SARL, RC, etc.) | 3 000-5 000 MAD |
| Domaine + hébergement (12 mois) | 2 000 MAD |
| Meta WhatsApp Business (setup) | 0 MAD |
| APIs LLM (tokens de développement) | 500 MAD |
| Design et UI assets | 3 000 MAD |
| Marketing initial (démos, cartes, etc.) | 2 000 MAD |
| **Total budget initial** | **~12 000-15 000 MAD** |

**Break-even :** Atteint dès 6 clients Pro actifs (~15 000 MAD MRR) ou ~10 clients Starter + 3 clients Pro.

---

## 16. KPIs et Métriques de Succès

### 16.1 Métriques Produit

| KPI | Méthode de calcul | Objectif M6 | Objectif M12 |
|---|---|---|---|
| Taux de résolution automatique | Messages auto / Total messages | > 75% | > 85% |
| Temps de réponse moyen | Somme latences / Nombre messages | < 5s | < 3s |
| CSAT (satisfaction client) | Étoiles collectées en fin de conv. | > 4,0/5 | > 4,3/5 |
| Taux d'escalade | Escalades / Total conversations | < 20% | < 12% |
| Taux de messages hors sujet | Messages non gérés / Total | < 10% | < 5% |

### 16.2 Métriques Business

| KPI | Formule | Objectif M6 | Objectif M12 |
|---|---|---|---|
| MRR | Somme revenus mensuels récurrents | 50 000 MAD | 180 000 MAD |
| Clients actifs | Clients avec au moins 1 conversation/semaine | 30 | 100 |
| Churn mensuel | Clients perdus / Total clients début de période | < 5% | < 3% |
| NPS Marchand | Score recommandation 0-10 → calcul NPS | > 40 | > 55 |
| CAC | Coût marketing + sales / Nouveaux clients | < 500 MAD | < 800 MAD |
| LTV | ARPU / Churn rate | > 15 000 MAD | > 30 000 MAD |

### 16.3 Métriques Techniques

| KPI | Objectif |
|---|---|
| Uptime | > 99,5% |
| Erreurs API (5xx) | < 0,1% des requêtes |
| Coût LLM / message | < 0,015 MAD |
| Temps de déploiement | < 5 minutes (CI/CD) |
| Couverture de tests | > 70% |

---

## 17. Risques et Mitigations

### 17.1 Risques Techniques

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Qualité du Darija insuffisante (LLM) | Moyen | Élevé | Tests utilisateurs extensifs en beta, fine-tuning progressif, feedback loop marchand |
| Indisponibilité API Meta WhatsApp | Faible | Critique | Monitoring Sentry, alertes, SLA Meta 99,9% |
| Coût LLM plus élevé qu'anticipé | Moyen | Moyen | Cache sémantique, modèle moins cher pour cas simples, suivi coût/message |
| Faille de sécurité (données clients) | Faible | Critique | Audit sécurité avant lancement, chiffrement systématique, pen testing |
| Scaling difficile à fort volume | Faible (M1-M6) | Moyen | Architecture conçue pour scale, monitoring performance |

### 17.2 Risques Métier

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Concurrent bien financé qui copie | Moyen (M6-M12) | Élevé | Accélérer les intégrations locales (fossé), données propriétaires Darija, contrats annuels |
| Refus de Meta / suspension compte | Faible | Critique | Respecter strictement les politiques Meta, backup Twilio, relation directe Meta Business |
| Adoption lente (peur de l'IA) | Moyen | Moyen | Démonstration en direct, période d'essai, pilotes avec clients ambassadeurs |
| Changement politique API WhatsApp | Faible | Élevé | Diversification canaux (Instagram, email), veille Meta |
| Client mécontent (mauvaise réponse IA) | Moyen | Moyen | Mode supervision (marchand relit avant envoi) pour les nouveaux clients, feedback continu |

### 17.3 Risques Réglementaires

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Loi 09-08 CNDP non respectée | Faible | Moyen | Consultation juridique, politique confidentialité conforme, DPO si nécessaire |
| Modification TVA sur services SaaS | Très faible | Faible | Monitoring législatif, adaptation rapide de la facturation |

---

## 18. Glossaire

| Terme | Définition |
|---|---|
| **Agent IA** | Système d'intelligence artificielle qui interagit de façon autonome avec les utilisateurs |
| **Darija** | Dialecte arabe marocain parlé par ~40 millions de personnes |
| **Code-switching** | Alternance entre deux langues dans une même conversation (ex : Darija + Français) |
| **Tenant** | Un marchand client de Kalam. Architecture multi-tenant = plusieurs marchands sur la même infrastructure |
| **Escalade** | Transfert d'une conversation de l'IA vers un humain |
| **CSAT** | Customer Satisfaction Score — mesure de la satisfaction client |
| **NPS** | Net Promoter Score — mesure de la propension à recommander |
| **MRR** | Monthly Recurring Revenue — revenus mensuels récurrents |
| **ARR** | Annual Recurring Revenue — MRR × 12 |
| **CAC** | Customer Acquisition Cost — coût pour acquérir un nouveau client |
| **LTV** | Lifetime Value — valeur totale générée par un client sur sa durée de vie |
| **Churn** | Taux d'attrition — pourcentage de clients perdus par période |
| **RAG** | Retrieval-Augmented Generation — technique IA qui enrichit les réponses LLM avec des données externes |
| **Webhook** | Point d'entrée HTTP qui reçoit des notifications en temps réel d'un service tiers |
| **LLM** | Large Language Model — modèle de langage de grande taille (ex : Claude, GPT-4) |
| **Prompt système** | Instructions données à l'IA pour définir son comportement et son contexte |
| **Youcan** | Plateforme e-commerce marocaine, alternative à Shopify |
| **CMI** | Centre Monétique Interbancaire — système de paiement par carte bancaire au Maroc |
| **CIH Pay** | Solution de paiement digital du Crédit Immobilier et Hôtelier |
| **Amana** | Service de livraison express marocain |
| **PWA** | Progressive Web App — application web installable sur mobile sans passer par l'App Store |
| **SaaS** | Software as a Service — logiciel vendu par abonnement en ligne |
| **B2B** | Business to Business — vente aux entreprises (ici : vente aux marchands) |
| **JWT** | JSON Web Token — standard d'authentification sécurisé |
| **ICE** | Identifiant Commun de l'Entreprise — numéro fiscal marocain |
| **TVA** | Taxe sur la Valeur Ajoutée — 20% au Maroc |

---

## Annexes

### Annexe A — Exemple de Prompt Système Agent

```
Tu es [NOM_AGENT], l'assistant client de [NOM_BOUTIQUE], une boutique de [SECTEUR] basée au Maroc.

IDENTITÉ :
- Ton prénom est [NOM_AGENT]
- Tu es professionnel(le), chaleureux(se) et efficace
- Tu réponds TOUJOURS dans la même langue que le client (Darija, français, arabe ou mélange)
- Ne mentionne JAMAIS que tu es une IA sauf si le client le demande directement

BOUTIQUE :
- Nom : [NOM_BOUTIQUE]
- Secteur : [SECTEUR]
- Livraison : [POLITIQUE_LIVRAISON]
- Retours : [POLITIQUE_RETOUR]
- Paiement : [MODES_PAIEMENT]

PRODUITS/SERVICES PRINCIPAUX :
[LISTE_PRODUITS]

FAQ CONFIGURÉE :
[FAQ_FORMATÉE]

RÈGLES STRICTES :
1. Ne jamais inventer des informations sur les commandes — utilise uniquement les données fournies
2. Pour les remboursements > [SEUIL] MAD, escalader vers l'équipe humaine
3. Si le client est agressif ou menaçant, escalader immédiatement
4. Ne jamais partager les informations personnelles d'un autre client
5. Si tu ne sais pas, dis "je vais vérifier ça avec notre équipe et te revenir"

DONNÉES COMMANDE (si disponibles) :
[DONNÉES_COMMANDE]

HISTORIQUE CONVERSATION :
[HISTORIQUE]
```

### Annexe B — Checklist de Lancement

- [ ] Entité légale créée et enregistrée
- [ ] Comptes bancaires ouverts
- [ ] Application Meta approuvée (WhatsApp Business API)
- [ ] CMI ou CIH Pay configuré pour les paiements
- [ ] Politique de confidentialité rédigée et publiée
- [ ] CGU (Conditions Générales d'Utilisation) rédigées
- [ ] Contrat d'abonnement client standardisé
- [ ] DNS configuré (kalam.ma ou kalam.io)
- [ ] SSL/TLS actif
- [ ] Monitoring Sentry actif
- [ ] Backup base de données configuré (quotidien)
- [ ] Plan de reprise d'activité documenté
- [ ] 3 clients beta testés avec succès pendant 2 semaines
- [ ] Support client opérationnel (email + WhatsApp)

### Annexe C — Technologies de Référence et Liens

| Technologie | Documentation |
|---|---|
| WhatsApp Business Cloud API | https://developers.facebook.com/docs/whatsapp |
| Youcan API | https://developers.youcan.shop |
| Shopify Admin API | https://shopify.dev/docs/api/admin-rest |
| Claude API (Anthropic) | https://docs.anthropic.com |
| Supabase | https://supabase.com/docs |
| Prisma ORM | https://www.prisma.io/docs |
| BullMQ | https://docs.bullmq.io |
| Next.js | https://nextjs.org/docs |
| Railway | https://docs.railway.app |

---

*Document préparé pour le projet Kalam — Confidentiel — Version 1.0 — Mai 2026*

*Ce cahier des charges est un document vivant. Il doit être mis à jour à chaque fin de phase de développement.*
