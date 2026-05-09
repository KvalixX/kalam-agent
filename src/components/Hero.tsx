'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const CHAT_SEQUENCE = [
  { id: 1, type: 'user', text: 'Salam, wach kayna l jacket f taille L?', delay: 1500 },
  { id: 2, type: 'agent', text: 'Wa alaykum salam! Oui kayna f L, bghitiha f noir wla beige? ✨', delay: 2500 },
  { id: 3, type: 'user', text: 'Noir 3afak. Chhal lwa9t dyal livraison l Rabat?', delay: 2000 },
  { id: 4, type: 'agent', text: 'Livraison l Rabat katakhod 24h m3a Amana Express. Ncreer lik commande daba?', delay: 3000 },
];

export default function Hero() {
  const [visibleMessages, setVisibleMessages] = useState<typeof CHAT_SEQUENCE>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const runSequence = async () => {
      setVisibleMessages([]);
      for (const msg of CHAT_SEQUENCE) {
        if (msg.type === 'agent') {
          setIsTyping(true);
          await new Promise(resolve => setTimeout(resolve, 1200));
          setIsTyping(false);
        }
        setVisibleMessages(prev => [...prev, msg]);
        await new Promise(resolve => setTimeout(resolve, msg.delay));
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
      setKey(prev => prev + 1);
    };
    runSequence();
    return () => clearTimeout(timeoutId);
  }, [key]);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-6">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Built for Moroccan E-commerce</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold text-foreground leading-tight mb-6">
              Automate your sales with <span className="text-primary">Superhuman AI</span>
            </h1>
            <p className="text-base text-gray-500 mb-8 max-w-lg font-medium leading-relaxed">
              Kalam speaks fluent Darija, tracks orders in real-time, and closes sales 24/7. Connects to Shopify and YouCan in one click.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup" className="px-8 py-3 bg-primary text-white rounded-full font-semibold text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white border border-border rounded-[2rem] shadow-2xl overflow-hidden max-w-md mx-auto">
              <div className="bg-primary px-4 py-3 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary font-semibold text-sm">K</div>
                 <div className="flex-1">
                    <h3 className="text-white font-semibold text-xs">Kalam AI Agent</h3>
                    <div className="flex items-center gap-1.5">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                       <span className="text-[10px] text-white/80 font-medium">Selling 24/7</span>
                    </div>
                 </div>
              </div>
              <div className="bg-gray-50 p-4 h-[350px] flex flex-col gap-3 overflow-y-auto">
                <AnimatePresence initial={false}>
                  {visibleMessages.map((msg) => (
                    <motion.div
                      key={`${key}-${msg.id}`}
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className={`max-w-[85%] px-3 py-2 rounded-xl text-[13px] shadow-sm ${
                        msg.type === 'user' ? 'self-start bg-white text-gray-800' : 'self-end bg-primary text-white'
                      }`}
                    >
                      <p className="font-medium leading-snug">{msg.text}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isTyping && (
                  <div className="self-end bg-primary/20 px-3 py-2 rounded-xl text-[10px] font-semibold text-primary animate-pulse">
                    AI is typing...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
