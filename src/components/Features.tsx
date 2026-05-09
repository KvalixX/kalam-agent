'use client';

import { motion } from 'framer-motion';
import { MessageSquare, PackageSearch, BellRing, Users, LineChart, Zap } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Native Darija Intelligence',
    desc: 'The AI speaks fluent Darija, French, and classical Arabic. It seamlessly code-switches just like a real Moroccan agent.',
  },
  {
    icon: PackageSearch,
    title: 'Real-time Order Tracking',
    desc: '"Wach waslet commande dyali?" → The agent instantly fetches the status from Amana or J&T and replies in 2 seconds.',
  },
  {
    icon: Zap,
    title: '24/7 Auto-Sales',
    desc: 'While you sleep, Kalam is answering inquiries, suggesting products, and closing sales on WhatsApp.',
  },
  {
    icon: BellRing,
    title: 'Smart Escalation',
    desc: 'When a situation requires human touch, the AI seamlessly transfers the chat and notifies you with a summary.',
  },
  {
    icon: Users,
    title: 'Automated CRM',
    desc: 'Every customer is identified, segmented (VIP, at-risk), and enriched automatically during the conversation.',
  },
  {
    icon: LineChart,
    title: 'Weekly AI Insights',
    desc: 'Get automated reports highlighting recurring questions, delivery bottlenecks, and new revenue opportunities.',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">Everything you need to scale</h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">Kalam manages the entire customer lifecycle — from product inquiries to returns and delivery tracking.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-6 rounded-3xl border border-border bg-gray-50/50 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
