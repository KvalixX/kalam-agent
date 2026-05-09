'use client';

import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  MessageCircle, 
  Book, 
  Video, 
  ExternalLink, 
  Search,
  ChevronRight,
  LifeBuoy,
  ShieldCheck
} from 'lucide-react';

const faqs = [
  { q: 'How do I train the AI on new products?', a: 'Go to the Knowledge Base page and upload your latest CSV or PDF catalog. The AI will re-index instantly.' },
  { q: 'Can I take over a chat from the AI?', a: 'Yes! In the Live Chats window, click the "Take Over" button to pause the AI and chat manually.' },
  { q: 'Does Kalam handle delivery tracking?', a: 'If you connect Amana or J&T in Settings, Kalam will automatically update customers on their order status.' },
];

export default function SupportPage() {
  return (
    <div className="max-w-4xl space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Help & Support</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Get help from the Kalam team</p>
        </div>
        <a 
          href="https://wa.me/212000000000" 
          target="_blank"
          className="flex items-center gap-2 px-3 py-1.5 bg-[#25D366] text-white text-[11px] font-semibold rounded-lg hover:opacity-90 transition-all"
        >
           <MessageCircle className="w-3.5 h-3.5 fill-current" />
           Chat on WhatsApp
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Book, title: 'Documentation', desc: 'Read the full guide' },
          { icon: Video, title: 'Video Tutorials', desc: 'Watch how-to videos' },
          { icon: LifeBuoy, title: 'API Reference', desc: 'For developers' },
        ].map((item, i) => (
          <div key={i} className="bg-white border border-border p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
             <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <item.icon className="w-4 h-4" />
             </div>
             <h3 className="text-xs font-semibold text-foreground mb-1">{item.title}</h3>
             <p className="text-[10px] text-gray-400 font-medium">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQs */}
        <div className="lg:col-span-2 space-y-4">
           <div className="bg-white border border-border rounded-xl shadow-sm">
              <div className="p-4 border-b border-border flex items-center justify-between">
                 <h3 className="text-xs font-semibold text-foreground">Frequently Asked Questions</h3>
                 <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search FAQ..." 
                      className="pl-8 pr-3 py-1 bg-gray-50 border border-border rounded text-[10px] focus:outline-none"
                    />
                 </div>
              </div>
              <div className="divide-y divide-border">
                 {faqs.map((faq, i) => (
                   <div key={i} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="flex items-center justify-between">
                         <p className="text-[11px] font-semibold text-foreground">{faq.q}</p>
                         <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
                         {faq.a}
                      </p>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* System Status */}
        <div className="space-y-4">
           <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
              <h3 className="text-xs font-semibold text-foreground mb-4">System Status</h3>
              <div className="space-y-3">
                 {[
                   { name: 'AI Engine', status: 'Operational' },
                   { name: 'WhatsApp API', status: 'Operational' },
                   { name: 'Shopify Sync', status: 'Operational' },
                 ].map((s) => (
                   <div key={s.name} className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-500 font-medium">{s.name}</span>
                      <div className="flex items-center gap-1.5">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                         <span className="text-[9px] font-semibold text-emerald-600 uppercase tracking-tighter">{s.status}</span>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                 <p className="text-[9px] text-gray-400 font-medium italic">
                    Last check: 2 minutes ago
                 </p>
              </div>
           </div>

           <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                 <ShieldCheck className="w-4 h-4 text-primary" />
                 <span className="text-[10px] font-bold text-primary uppercase">Expert Support</span>
              </div>
              <p className="text-[10px] text-gray-600 font-medium leading-relaxed">
                 Kalam Pro users get a dedicated WhatsApp account manager for 24/7 technical assistance.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
