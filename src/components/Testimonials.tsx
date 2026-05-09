'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Youssef Benali',
    role: 'Founder, Darija Store',
    avatar: 'Y',
    text: 'Before Kalam, I spent 4 hours a day answering WhatsApp messages. Now I only get escalations. My conversion rate increased by 22% because clients get an immediate response in perfect Darija.',
    metric: '+22% conversion',
    color: 'bg-emerald-50'
  },
  {
    name: 'Nadia Chaoui',
    role: 'Manager, Beauté & Co',
    avatar: 'N',
    text: "What sold me was the language switching. The agent replies exactly like a real consultant — even the French/Darija mix my clients use. They don't even know it's an AI.",
    metric: '87% auto-resolved',
    color: 'bg-blue-50'
  },
  {
    name: 'Karim Tahiri',
    role: 'CEO, ElectroPro Maroc',
    avatar: 'K',
    text: 'We get 200 orders a day. The automatic order tracking reduced "where is my order" messages by 60%. Setup took 15 minutes, results showed the next day.',
    metric: '-60% tracking tickets',
    color: 'bg-purple-50'
  },
  {
    name: 'Salma Idrissi',
    role: 'E-commerce Owner',
    avatar: 'S',
    text: 'I was afraid my clients would feel they are talking to a robot. Honestly, some told me "your assistant is very nice" — they were talking to Kalam. The tone is perfect.',
    metric: '4.9/5 satisfaction',
    color: 'bg-amber-50'
  },
  {
    name: 'Ahmed Mansouri',
    role: 'Director, Atlas Fashion',
    avatar: 'A',
    text: 'Connecting Shopify was seamless. The agent knows our stock better than I do. It even handles abandoned carts by sending gentle reminders on WhatsApp.',
    metric: '15% recovery rate',
    color: 'bg-rose-50'
  },
  {
    name: 'Leila Ziani',
    role: 'Founder, Ziani Jewelry',
    avatar: 'L',
    text: 'The best investment for my business this year. It handles the night shift perfectly. I wake up to new orders already processed and confirmed.',
    metric: '24/7 coverage',
    color: 'bg-teal-50'
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden" id="testimonials">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6"
          >
            Social Proof
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
            Trusted by the best <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">Moroccan Merchants</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-gray-600"
          >
            Kalam speaks fluent Darija, tracks orders in real-time, and closes sales 24/7. Connects to Shopify and YouCan in one click.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white/70 backdrop-blur-sm border border-border p-8 rounded-[2rem] hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col group relative overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
              
              <div className="mb-8 relative">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed font-medium italic text-xs">"{t.text}"</p>
              </div>
              
              <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${t.color} flex items-center justify-center text-primary font-bold shadow-inner border border-white`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    <div className="text-[11px] text-gray-500 font-medium">{t.role}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[10px] font-bold text-primary px-3 py-1 bg-primary/5 rounded-full border border-primary/10 whitespace-nowrap">
                     {t.metric}
                   </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
