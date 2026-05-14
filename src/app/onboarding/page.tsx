'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  MessageSquare, 
  Store, 
  Settings, 
  ArrowRight, 
  ArrowLeft,
  QrCode,
  Zap
} from 'lucide-react';
import { completeOnboarding } from '@/lib/actions/onboarding';
import Link from 'next/link';

const steps = [
  { id: 1, title: 'Connect Store', icon: Store },
  { id: 2, title: 'Link WhatsApp', icon: MessageSquare },
  { id: 3, title: 'Agent Style', icon: Settings },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [platform, setPlatform] = useState('');
  const [agentStyle, setAgentStyle] = useState('Friendly Darija');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async () => {
    if (currentStep === 3) {
      setIsSubmitting(true);
      try {
        await completeOnboarding({ platform, agentStyle });
        setCurrentStep(4);
      } catch (error) {
        console.error('Onboarding failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">K</div>
        <span className="font-bold text-xl tracking-tight text-foreground">Kalam</span>
      </div>

      <div className="max-w-xl w-full">
        {/* Progress Tracker */}
        <div className="flex justify-between mb-8 px-4">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center gap-2">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                 currentStep >= step.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
               }`}>
                  {currentStep > step.id ? <CheckCircle2 className="w-5 h-5" /> : <step.icon className="w-4 h-4" />}
               </div>
               <span className={`text-[10px] font-bold uppercase tracking-widest ${
                 currentStep >= step.id ? 'text-primary' : 'text-gray-400'
               }`}>
                  {step.title}
               </span>
            </div>
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-white border border-border rounded-[2rem] p-8 md:p-10 shadow-xl shadow-primary/5 min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1"
              >
                <div>
                   <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to Kalam! 👋</h2>
                   <p className="text-sm text-gray-500">First, select your e-commerce platform to sync your products.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {['Shopify', 'YouCan', 'WooCommerce', 'Other'].map(p => (
                     <button
                       key={p}
                       onClick={() => setPlatform(p)}
                       className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                         platform === p ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-primary/20 bg-gray-50/50'
                       }`}
                     >
                        <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center font-bold text-gray-400">
                           {p[0]}
                        </div>
                        <span className="text-xs font-bold text-gray-600">{p}</span>
                     </button>
                   ))}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1 flex flex-col items-center text-center"
              >
                <div>
                   <h2 className="text-2xl font-bold text-foreground mb-2">Connect WhatsApp 📱</h2>
                   <p className="text-sm text-gray-500 max-w-sm">Scan this QR code with your WhatsApp Business app to link your AI agent.</p>
                </div>
                
                <div className="w-48 h-48 bg-white border-8 border-gray-50 rounded-3xl flex items-center justify-center p-4 shadow-inner relative overflow-hidden group">
                   <QrCode className="w-full h-full text-foreground opacity-20" />
                   <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                   </div>
                </div>
                
                <p className="text-[11px] text-primary font-bold animate-pulse">Waiting for scan...</p>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1"
              >
                <div>
                   <h2 className="text-2xl font-bold text-foreground mb-2">Set AI Personality 🎨</h2>
                   <p className="text-sm text-gray-500">How should your agent talk to your Moroccan customers?</p>
                </div>
                
                <div className="space-y-3">
                   {[
                     { name: 'Friendly Darija', desc: 'Warm, helpful, and very local. Best for brands with a young audience.' },
                     { name: 'Professional Mix', desc: 'Polished French & Darija. Best for high-end fashion or electronics.' },
                     { name: 'Direct Sales', desc: 'Focused on closing orders quickly. Best for high-volume dropshipping.' },
                   ].map((style, i) => (
                     <button
                       key={i}
                       onClick={() => setAgentStyle(style.name)}
                       className={`w-full p-4 rounded-2xl border transition-all text-left group ${
                         agentStyle === style.name
                           ? 'border-primary bg-primary/5'
                           : 'border-border bg-gray-50/50 hover:border-primary/40 hover:bg-white'
                       }`}
                     >
                        <p className={`text-xs font-bold transition-colors ${
                          agentStyle === style.name ? 'text-primary' : 'text-foreground group-hover:text-primary'
                        }`}>{style.name}</p>
                        <p className="text-[11px] text-gray-500 mt-1">{style.desc}</p>
                     </button>
                   ))}
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 flex-1 flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                   <Zap className="w-10 h-10 fill-current" />
                </div>
                <div>
                   <h2 className="text-3xl font-bold text-foreground mb-2">You're all set! 🚀</h2>
                   <p className="text-sm text-gray-500 max-w-sm">Kalam is now synced and ready to handle your sales. Welcome to the future of e-commerce in Morocco.</p>
                </div>
                
                <Link href="/dashboard" className="mt-8 px-8 py-3 bg-primary text-white rounded-full font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                   Go to Dashboard
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {currentStep < 4 && (
            <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-100">
               <button 
                 onClick={prevStep}
                 disabled={currentStep === 1}
                 className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-foreground disabled:opacity-0 transition-all"
               >
                  <ArrowLeft className="w-4 h-4" />
                  Back
               </button>
               <button 
                 onClick={handleNext}
                 disabled={isSubmitting || (currentStep === 1 && !platform)}
                 className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full text-xs font-bold shadow-lg shadow-primary/10 hover:bg-primary-dark transition-all disabled:opacity-50"
               >
                 {isSubmitting ? (
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 ) : currentStep === 3 ? (
                   'Finish Setup'
                 ) : (
                   'Next Step'
                 )}
                 <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          )}
        </div>
        
        <p className="mt-8 text-center text-xs text-gray-400 font-medium">
           Need help? <Link href="#support" className="text-primary font-bold hover:underline">Chat with us</Link>
        </p>
      </div>
    </div>
  );
}
