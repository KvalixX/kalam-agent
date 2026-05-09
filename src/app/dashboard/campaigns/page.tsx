'use client';

import { motion } from 'framer-motion';
import { 
  Send, 
  Users, 
  MessageSquare, 
  Zap, 
  BarChart3, 
  Plus, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';

const campaigns = [
  { id: 1, name: 'Eid Al-Fitr Promo', status: 'Completed', sent: 1240, read: '98%', conversion: '12%', date: 'Apr 10, 2024' },
  { id: 2, name: 'Flash Sale VIP', status: 'Running', sent: 412, read: '84%', conversion: '8%', date: 'Today' },
  { id: 3, name: 'New Collection Invite', status: 'Scheduled', sent: 0, read: '--', conversion: '--', date: 'In 2 days' },
];

export default function CampaignsPage() {
  return (
    <div className="space-y-6 max-w-5xl pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">WhatsApp Campaigns</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Send personalized bulk messages to your customer segments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-[11px] font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
           <Plus className="w-3.5 h-3.5" />
           New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign Stats Card */}
        <div className="lg:col-span-2 grid grid-cols-3 gap-4">
           {[
             { label: 'Total Messages', value: '4,890', icon: MessageSquare, color: 'text-primary' },
             { label: 'Avg Read Rate', value: '94.2%', icon: CheckCircle2, color: 'text-emerald-500' },
             { label: 'Revenue Generated', value: '18,400 MAD', icon: Zap, color: 'text-amber-500' },
           ].map((stat, i) => (
             <div key={i} className="bg-white border border-border p-4 rounded-2xl shadow-sm">
                <div className={`w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center mb-3 ${stat.color}`}>
                   <stat.icon className="w-4 h-4" />
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-black text-foreground mt-1">{stat.value}</p>
             </div>
           ))}
        </div>

        {/* AI Tip */}
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 flex flex-col justify-center">
           <div className="flex items-center gap-2 mb-2 text-primary">
              <Zap className="w-4 h-4 fill-current" />
              <span className="text-[11px] font-bold uppercase">AI Growth Tip</span>
           </div>
           <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
              Your **"VIP Casablanca"** segment hasn't heard from you in 14 days. Send a "Loyalty Discount" to boost sales today.
           </p>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
         <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-xs font-semibold text-foreground">Campaign History</h3>
            <div className="flex items-center gap-2">
               {['All', 'Running', 'Drafts'].map(tab => (
                 <button key={tab} className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-gray-50 text-gray-400 hover:text-primary hover:bg-primary/5 transition-all">
                    {tab}
                 </button>
               ))}
            </div>
         </div>
         <table className="w-full text-left">
            <thead>
               <tr className="bg-gray-50/50 border-b border-border">
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Campaign Name</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sent</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Read %</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Conv %</th>
                  <th className="px-6 py-3 w-10"></th>
               </tr>
            </thead>
            <tbody className="divide-y divide-border">
               {campaigns.map((c) => (
                 <tr key={c.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                    <td className="px-6 py-3">
                       <p className="text-[11px] font-bold text-foreground leading-none mb-1">{c.name}</p>
                       <p className="text-[9px] text-gray-400 font-medium italic">{c.date}</p>
                    </td>
                    <td className="px-6 py-3">
                       <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${
                          c.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                          c.status === 'Running' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'
                       }`}>
                          {c.status}
                       </span>
                    </td>
                    <td className="px-6 py-3 text-[11px] font-bold text-foreground">{c.sent.toLocaleString()}</td>
                    <td className="px-6 py-3 text-[11px] font-bold text-foreground">{c.read}</td>
                    <td className="px-6 py-3 text-[11px] font-bold text-primary">{c.conversion}</td>
                    <td className="px-6 py-3 text-right">
                       <button className="p-1.5 text-gray-300 hover:text-foreground opacity-0 group-hover:opacity-100 transition-all">
                          <MoreVertical className="w-4 h-4" />
                       </button>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>

      {/* New Campaign Preview Mockup */}
      <div className="bg-white border border-border rounded-2xl p-6 shadow-sm border-dashed">
         <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-border">
               <Plus className="w-5 h-5 text-gray-300" />
            </div>
            <div>
               <h4 className="text-xs font-bold text-foreground">Create New Engagement</h4>
               <p className="text-[10px] text-gray-400 font-medium">Use AI to generate a high-converting message for your VIPs.</p>
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
               <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Target Segment</label>
                  <select className="w-full bg-gray-50 border border-border rounded-xl px-3 py-2 text-[11px] font-medium outline-none">
                     <option>VIP Customers (3+ Orders)</option>
                     <option>Dormant Leads (30 days silent)</option>
                     <option>Casablanca Region</option>
                  </select>
               </div>
               <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Campaign Message</label>
                  <div className="relative">
                     <textarea 
                       className="w-full bg-gray-50 border border-border rounded-xl px-3 py-2 text-[11px] font-medium outline-none min-h-[100px] resize-none"
                       placeholder="Enter your Darija message..."
                       defaultValue="Salam {name}! ✨ Jbnalk wa7d l'offre spécifique lik nti..."
                     />
                     <button className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-lg text-[9px] font-bold hover:bg-primary/20 transition-all">
                        <Zap className="w-2.5 h-2.5 fill-current" />
                        AI Re-write
                     </button>
                  </div>
               </div>
            </div>

            <div className="bg-gray-50 rounded-[2rem] border border-border p-4 flex flex-col h-full min-h-[250px]">
               <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">WhatsApp Preview</span>
               </div>
               <div className="flex-1 flex flex-col justify-end">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-border max-w-[85%]">
                     <p className="text-[11px] font-medium text-gray-800 leading-relaxed">
                        Salam Youssef! ✨ Jbnalk wa7d l'offre spécifique lik nti hitach rak men les VIPs dyalna. Khod 20% discount f la commande jaya b code <span className="font-bold text-primary uppercase">VIP20</span>.
                     </p>
                     <p className="text-[8px] text-gray-400 mt-2 text-right">10:42 AM</p>
                  </div>
               </div>
               <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-[10px] font-bold text-gray-400">
                  <span>Estimated Reach: 1,240 users</span>
                  <span className="text-primary">Send Now <ArrowRight className="w-3 h-3 inline" /></span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
