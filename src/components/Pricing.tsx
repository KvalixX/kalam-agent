'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: { monthly: 990, annual: 825 },
    desc: 'Perfect for launching your first AI agent.',
    features: [
      '500 conversations/month',
      'WhatsApp AI Agent (Darija)',
      '1 E-commerce integration',
      '1 Logistics integration',
      'Basic CRM',
      'Monthly Reports',
      'Email Support (48h)',
    ],
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { monthly: 2490, annual: 2075 },
    desc: 'The complete solution for growing stores.',
    features: [
      'Unlimited conversations',
      'WhatsApp + Email Channels',
      '3 E-commerce integrations',
      '3 Logistics integrations',
      'Full CRM + Segmentation',
      'Weekly AI Insights',
      'WhatsApp Support (24h)',
    ],
    highlight: true,
    badge: 'Most Popular',
  },
  {
    id: 'scale',
    name: 'Scale',
    price: { monthly: 5900, annual: 4917 },
    desc: 'For multi-brand groups and massive volume.',
    features: [
      'Everything in Pro',
      'Instagram DM Channel',
      'Unlimited integrations',
      'Unlimited human agents',
      'API Access',
      'Dedicated Success Manager',
      'Custom Fine-tuning',
    ],
    highlight: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
            Cheaper than a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">part-time agent</span>
          </h2>
          <p className="text-sm text-gray-600 mb-8">
            Start with a 14-day free trial. No credit card required.
          </p>

          <div className="inline-flex items-center gap-3 bg-surface border border-border p-1.5 rounded-full shadow-sm">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "px-5 py-1.5 rounded-full text-xs font-medium transition-colors",
                !annual ? "bg-white text-foreground shadow-sm" : "text-gray-500 hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "px-5 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-2",
                annual ? "bg-white text-foreground shadow-sm" : "text-gray-500 hover:text-foreground"
              )}
            >
              Annual <span className="text-[9px] uppercase tracking-wider font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded-full">Save 2 months</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "relative rounded-[2rem] p-8 flex flex-col h-full bg-white border transition-all duration-500",
                plan.highlight 
                  ? "border-primary/30 shadow-xl shadow-primary/10 bg-gradient-to-b from-primary/[0.03] to-white z-10" 
                  : "border-border hover:border-primary/20 hover:shadow-lg shadow-sm"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-wider py-0.5 px-2.5 rounded-full shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-1.5">{plan.name}</h3>
                <p className="text-xs text-gray-500 h-8">{plan.desc}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold tracking-tight text-foreground">
                    {annual ? plan.price.annual.toLocaleString('en-US') : plan.price.monthly.toLocaleString('en-US')}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">MAD / mo</span>
                </div>
                {annual && (
                  <p className="text-[10px] text-primary mt-1.5 font-medium">Billed {(plan.price.annual * 12).toLocaleString('en-US')} MAD yearly</p>
                )}
              </div>

              <Link
                href="/signup"
                className={cn(
                  "w-full py-2 px-4 rounded-full text-xs font-semibold text-center transition-all mb-6",
                  plan.highlight
                    ? "bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20"
                    : "bg-surface text-foreground hover:bg-gray-100 border border-border shadow-sm"
                )}
              >
                {plan.highlight ? 'Start 14-day free trial' : 'Get Started'}
              </Link>

              <div className="space-y-3 flex-1">
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <CheckCircle2 className={cn("w-4 h-4 shrink-0", plan.highlight ? "text-primary" : "text-gray-400")} />
                    <span className="text-xs text-gray-600">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
