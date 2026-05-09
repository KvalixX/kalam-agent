'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Does the agent really speak Darija?',
    a: 'Yes, this is our core advantage. Kalam responds in authentic Darija, French, classical Arabic, and the natural mix of these languages commonly used by Moroccans. It automatically adapts to the customer\'s language.',
  },
  {
    q: 'Will my customers know they are talking to an AI?',
    a: 'No, unless they explicitly ask — in which case the agent answers honestly. The tone, expressions, and style are configured to feel exactly like a real human agent from your store.',
  },
  {
    q: 'How does the Shopify/YouCan connection work?',
    a: 'You authorize Kalam via OAuth2 (click "Connect Store") in 2 clicks. Kalam then securely accesses orders, inventory, and tracking data to include in responses in real-time.',
  },
  {
    q: 'What happens when the AI cannot answer?',
    a: 'The agent triggers an automatic escalation: it sends a polite message to the client ("I am transferring your request to our team"), then immediately notifies you on WhatsApp and your dashboard with a summary.',
  },
  {
    q: 'Can I take over a conversation manually?',
    a: 'Yes, at any time. You click "Take Over" in the dashboard, and the AI goes into standby mode for that specific conversation. It resumes automatically 24 hours after resolution.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-foreground">Frequently Asked Questions</h2>
          <p className="text-sm text-gray-600">Everything you need to know about Kalam.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-border rounded-xl overflow-hidden transition-colors hover:border-primary/20 hover:shadow-sm"
            >
              <button
                className="w-full px-5 py-4 flex items-center justify-between text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-sm font-medium text-foreground">{faq.q}</span>
                <div className="text-primary">
                  {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0 text-gray-600 leading-relaxed text-xs border-t border-border mt-1 pt-3">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
