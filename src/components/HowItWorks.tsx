'use client';

import { motion } from 'framer-motion';
import { Settings2, Blocks, Bot, LayoutDashboard } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Configure your agent',
    desc: 'Set up the agent\'s name, language preferences, return policy, and FAQ. Connect your WhatsApp Business account in 2 clicks. No coding required.',
    icon: Settings2,
    detail: 'Guided setup · AI writing assistant · Live testing',
  },
  {
    num: '02',
    title: 'Connect your store',
    desc: 'Kalam securely integrates with YouCan, Shopify, or WooCommerce. It instantly accesses real-time orders, inventory, and tracking data.',
    icon: Blocks,
    detail: 'OAuth2 Secure · Real-time sync · Webhooks',
  },
  {
    num: '03',
    title: 'Agent takes over',
    desc: 'Every WhatsApp message is processed in under 3 seconds. The agent replies in natural Darija, handles returns, and escalates if necessary.',
    icon: Bot,
    detail: 'Darija native · Order tracking · Smart routing',
  },
  {
    num: '04',
    title: 'Monitor & Scale',
    desc: 'Access your centralized inbox, intervene on complex cases, and read weekly AI-generated performance reports.',
    icon: LayoutDashboard,
    detail: 'Unified Inbox · Auto-CRM · Growth Insights',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 relative bg-surface border-y border-border" id="how-it-works">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
            From zero to an operational agent in <span className="text-primary">20 minutes</span>
          </h2>
          <p className="text-sm text-gray-600">
            No developers needed. No training required. Kalam is built for merchants, not engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                <div className="flex flex-col h-full bg-white border border-border rounded-2xl p-6 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <span className="text-4xl font-black text-gray-100 group-hover:text-primary-light transition-colors duration-300 pointer-events-none">
                      {step.num}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-3 leading-tight">{step.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6 flex-1">
                    {step.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {step.detail.split(' · ').map((d, j) => (
                      <span key={j} className="text-[10px] font-semibold text-primary bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
