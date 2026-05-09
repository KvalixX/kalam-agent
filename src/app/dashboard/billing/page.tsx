'use client';

import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Download, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Zap,
  History,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';

const invoices = [
  { id: 'INV-001', date: 'May 01, 2024', amount: '290 MAD', status: 'Paid' },
  { id: 'INV-002', date: 'Apr 01, 2024', amount: '290 MAD', status: 'Paid' },
  { id: 'INV-003', date: 'Mar 01, 2024', amount: '290 MAD', status: 'Paid' },
];

export default function BillingPage() {
  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Billing & Subscription</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Manage your plan and payment methods</p>
        </div>
        <button className="px-3 py-1.5 bg-primary text-white text-[11px] font-semibold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2">
           <Zap className="w-3.5 h-3.5 fill-current" />
           Upgrade Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Plan Card */}
        <div className="md:col-span-2 bg-white border border-border rounded-2xl p-6 shadow-sm relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded">Current Plan</span>
                    <h3 className="text-xl font-bold text-foreground">Kalam Pro</h3>
                 </div>
                 <p className="text-xs text-gray-500 font-medium max-w-sm">
                    You are currently on the Pro plan with unlimited AI responses and store synchronization.
                 </p>
                 <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-1.5">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                       <span className="text-[11px] font-semibold text-gray-600">Unlimited Chats</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                       <span className="text-[11px] font-semibold text-gray-600">Custom Knowledge</span>
                    </div>
                 </div>
              </div>
              <div className="text-left md:text-right border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-10">
                 <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Monthly Billing</p>
                 <div className="flex items-baseline gap-1 md:justify-end">
                    <span className="text-2xl font-black text-foreground">290</span>
                    <span className="text-xs font-bold text-gray-400 uppercase">MAD/mo</span>
                 </div>
                 <p className="text-[10px] text-emerald-600 font-bold mt-2 flex items-center gap-1 md:justify-end">
                    <Clock className="w-3 h-3" />
                    Renews on June 1st
                 </p>
              </div>
           </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Payment Method</h3>
                 <CreditCard className="w-4 h-4 text-gray-300" />
              </div>
              <div className="bg-gray-50 border border-border rounded-xl p-3 flex items-center gap-3">
                 <div className="w-10 h-6 bg-white border border-border rounded flex items-center justify-center">
                    <span className="text-[8px] font-bold text-blue-800 italic">VISA</span>
                 </div>
                 <div>
                    <p className="text-[11px] font-bold text-foreground">•••• 4242</p>
                    <p className="text-[9px] text-gray-400 font-medium">Expires 12/26</p>
                 </div>
              </div>
           </div>
           <button className="w-full mt-6 py-1.5 border border-border rounded-lg text-[10px] font-bold text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest">
              Update Card
           </button>
        </div>

        {/* Invoices */}
        <div className="md:col-span-3 bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
           <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <History className="w-4 h-4 text-gray-400" />
                 <h3 className="text-xs font-semibold text-foreground">Invoice History</h3>
              </div>
              <button className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1">
                 View All <ArrowUpRight className="w-3 h-3" />
              </button>
           </div>
           <table className="w-full text-left">
              <thead>
                 <tr className="bg-gray-50/50 border-b border-border">
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Invoice ID</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-3 w-10"></th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-border">
                 {invoices.map((inv) => (
                   <tr key={inv.id} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                      <td className="px-6 py-3 text-[11px] font-semibold text-foreground">{inv.id}</td>
                      <td className="px-6 py-3 text-[11px] font-medium text-gray-500">{inv.date}</td>
                      <td className="px-6 py-3 text-[11px] font-bold text-foreground">{inv.amount}</td>
                      <td className="px-6 py-3">
                         <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase">{inv.status}</span>
                      </td>
                      <td className="px-6 py-3 text-right">
                         <button className="p-1.5 text-gray-300 hover:text-primary transition-all">
                            <Download className="w-4 h-4" />
                         </button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>

        {/* Security / Help */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                 <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                 <h4 className="text-xs font-bold text-emerald-900">Bank-Level Security</h4>
                 <p className="text-[10px] text-emerald-700 font-medium">All payments are encrypted via Stripe and 3D-Secure.</p>
              </div>
           </div>
           <div className="bg-gray-50 border border-border rounded-xl p-4 flex items-center justify-between">
              <div>
                 <h4 className="text-xs font-bold text-gray-900">Need help with billing?</h4>
                 <p className="text-[10px] text-gray-500 font-medium">Our support team is available 24/7.</p>
              </div>
              <button className="px-4 py-2 bg-white border border-border rounded-lg text-[10px] font-bold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2">
                 Contact Us <ExternalLink className="w-3.5 h-3.5" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
