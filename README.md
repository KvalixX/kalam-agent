# 🌴 Kalam AI - Conversational E-Commerce for Morocco

**Kalam AI** is a state-of-the-art conversational sales platform designed specifically for Moroccan merchants. It automates customer interactions on WhatsApp, providing intelligent, natural responses in **Moroccan Darija, French, and Arabic** to close sales 24/7.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-f3d122?style=for-the-badge&logo=groq&logoColor=black)
![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Core Features

- **🚀 Instant AI Responses**: Powered by **Groq (Llama 3.1 70B)** for lightning-fast inference.
- **🇲🇦 Multi-Lingual Intelligence**: Deep understanding of Moroccan Darija, French, and Arabic code-switching.
- **📦 Catalog Integration**: Synchronizes with Shopify and YouCan to answer inventory questions instantly.
- **💬 WhatsApp Dashboard**: A professional, real-time chat interface to take over AI conversations when needed.
- **🎨 Custom Widget**: Embeddable WhatsApp chat widget for your storefront with full color and style customization.
- **📊 Real-time Analytics**: Track AI resolution rates, customer sentiment, and revenue growth.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **AI Inference**: [Groq Cloud API](https://groq.com/)
- **Messaging**: [WhatsApp Business Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api)
- **Styling**: Tailwind CSS & Framer Motion
- **Icons**: Lucide React

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- Supabase Account
- Meta Developer Account (WhatsApp Cloud API)
- Groq Cloud API Key

### 2. Installation
```bash
git clone https://github.com/KvalixX/kalam-agent.git
cd kalam-app
npm install
```

### 3. Environment Setup
Create a `.env.local` file and add your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GROQ_API_KEY=your_groq_api_key
WHATSAPP_ACCESS_TOKEN=your_whatsapp_token
WHATSAPP_PHONE_NUMBER_ID=your_id
WHATSAPP_VERIFY_TOKEN=your_verify_token
```

### 4. Running Locally
```bash
npm run dev
```

## 🔒 Security & Privacy
Kalam AI uses **Supabase Row Level Security (RLS)** to ensure merchant data isolation. Webhook processing is secured via Meta Verify Tokens and Service Role authentication.

## 🇲🇦 Built for Morocco
Designed with the specific needs of the Moroccan e-commerce ecosystem in mind. Supporting local platforms like **YouCan** and understanding the unique linguistic nuances of **Darija**.

---
*Developed with ❤️ for the Moroccan Merchant Community.*
