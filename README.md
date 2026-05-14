# 🏺 Kalam AI Platform

**The first AI-powered sales agent built for Moroccan E-commerce.**

Kalam AI automates WhatsApp sales for Moroccan merchants by speaking natural Darija, syncing with Shopify/YouCan, and handling customer inquiries 24/7.

## 🎯 Current Milestone: Phase 1 Complete

The **Phase 1 Frontend** is now 100% complete and production-ready. 

### **Recent Accomplishments:**
- **14 Dashboard Modules**: Full administrative suite from CRM and Campaigns to AI Activity Logs and Widget Customizers.
- **Premium Design System**: High-density "SaaS Cockpit" aesthetic using custom Tailwind tokens and standard Lucide icons.
- **Advanced UX**: Global `Cmd + K` search palette, smooth skeleton loaders, and responsive mobile-first layouts.
- **Typography Audit**: Standardized platform-wide font weights (Normal/Medium/Semibold) for maximum clarity and professionalism.

## 🛠️ Next Steps (Phase 2)
1. **Backend Integration (In Progress)**: Supabase PostgreSQL schema established. Added secure RLS, user triggers, and single consolidated DB setup in `/supabase/schema.sql`.
2. **AI Webhook Implementation**: Setting up the Meta Business API for real WhatsApp message processing.
3. **E-commerce Sync**: Building real API bridges for Shopify and YouCan catalog synchronization.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Design System**: Custom high-density, "SaaS Cockpit" aesthetic with premium typography.

## 📂 Project Structure

- `/src/app/dashboard`: The 14-page administrative cockpit.
- `/src/components`: Reusable UI components (Hero, Features, etc.).
- `/src/app/onboarding`: Multi-step merchant setup flow.
- `/src/app/login` & `/src/app/signup`: Secure authentication interfaces.

## 🏁 Getting Started

1. **Clone the repo**
2. **Install dependencies**: `npm install`
3. **Run development server**: `npm run dev`
4. **Build for production**: `npm run build`

## 📄 Documentation

For a detailed guide on how to use the platform as a merchant, please refer to [USER_GUIDE.md](./USER_GUIDE.md).

---

**Built by Antigravity for Kalam AI.**
