'use client';

import { motion } from 'framer-motion';
import { 
  Gift, 
  Share2, 
  Copy, 
  MessageCircle, 
  Users, 
  Trophy,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';

const referrals = [
  { id: 1, name: 'Simo Ecom', date: '2 days ago', status: 'Active', reward: '1 Month Free' },
  { id: 2, name: 'Zineb Cosmetics', date: '1 week ago', status: 'Pending', reward: '--' },
  { id: 3, name: 'Mehdi Watch', date: '2 weeks ago', status: 'Active', reward: '1 Month Free' },
];

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = 'kalam.ai/ref/amine212';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Referral Program</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Invite friends and get free months of Kalam Pro</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-lg">
           <Trophy className="w-4 h-4 text-amber-600" />
           <span className="text-[11px] font-bold text-amber-900">2 Months Earned</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Referral Card */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="relative z-10 space-y-4">
                 <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
                    <Gift className="w-6 h-6" />
                 </div>
                 <h2 className="text-2xl font-bold leading-tight">Give 1 Month, <br />Get 1 Month Free</h2>
                 <p className="text-white/80 text-sm max-w-xs font-medium">
                    When a friend joins Kalam through your link, you both get 1 month of Pro features for free.
                 </p>
                 
                 <div className="pt-4 flex items-center gap-3">
                    <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5 flex items-center justify-between">
                       <code className="text-xs font-mono text-white/90">{referralLink}</code>
                       <button 
                         onClick={handleCopy}
                         className="p-1.5 hover:bg-white/10 rounded-lg transition-all"
                       >
                          {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                       </button>
                    </div>
                    <button className="h-11 px-4 bg-[#25D366] text-white rounded-xl font-bold text-xs flex items-center gap-2 hover:scale-105 transition-all">
                       <MessageCircle className="w-4 h-4 fill-current" />
                       WhatsApp
                    </button>
                 </div>
              </div>
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
           </div>

           {/* Stats Grid */}
           <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Clicks', value: '142', icon: Share2 },
                { label: 'Successful Refs', value: '12', icon: Users },
                { label: 'Next Reward', value: '1 / 3', icon: Trophy },
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-border p-4 rounded-2xl shadow-sm">
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                   <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-foreground">{stat.value}</span>
                      <stat.icon className="w-4 h-4 text-primary opacity-20" />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Recent History */}
        <div className="space-y-4">
           <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border">
                 <h3 className="text-xs font-semibold text-foreground">Referral History</h3>
              </div>
              <div className="divide-y divide-border">
                 {referrals.map((r) => (
                   <div key={r.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div>
                         <p className="text-[11px] font-semibold text-foreground">{r.name}</p>
                         <div className="flex items-center gap-1.5 mt-0.5 text-[9px] text-gray-400 font-medium">
                            <Clock className="w-3 h-3" />
                            {r.date}
                         </div>
                      </div>
                      <div className="text-right">
                         <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter ${
                            r.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400'
                         }`}>
                            {r.status}
                         </span>
                         <p className="text-[9px] text-primary font-bold mt-1">{r.reward}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full p-3 text-[10px] font-bold text-gray-400 hover:text-primary transition-all flex items-center justify-center gap-2 border-t border-border">
                 View All Referrals
                 <ArrowRight className="w-3.5 h-3.5" />
              </button>
           </div>

           <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                 <Trophy className="w-4 h-4 text-amber-600" />
                 <span className="text-[11px] font-bold text-amber-900 uppercase">Ambassador Status</span>
              </div>
              <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                 Invite **5 more friends** to unlock the "Super Merchant" badge and get a 50% discount for life.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
