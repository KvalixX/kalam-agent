'use client';

import { motion } from 'framer-motion';
import { 
  Zap, 
  ShoppingBag, 
  MessageSquare, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight,
  Filter,
  Search,
  Clock,
  History
} from 'lucide-react';

const activities = [
  { id: 1, type: 'sale', title: 'Successful Upsell', desc: 'AI suggested "Leather Belt" to Youssef Benali and closed the sale.', time: '2m ago', icon: ShoppingBag, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 2, type: 'support', title: 'Delivery Resolved', desc: 'AI answered tracking inquiry for Sara Kamali using Amana Express data.', time: '12m ago', icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 3, type: 'sync', title: 'Catalog Synced', desc: 'Successfully imported 14 new products from Shopify store.', time: '1h ago', icon: RefreshCw, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 4, type: 'sale', title: 'New Order Confirmed', desc: 'Order #ORD-991 confirmed for Ahmed Mansouri (890 MAD).', time: '3h ago', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 5, type: 'lead', title: 'New Lead Captured', desc: 'New customer inquiry from +212 661-XXXXXX saved to CRM.', time: '5h ago', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

export default function ActivityLogPage() {
  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">AI Activity Log</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Real-time audit of every action taken by your agent</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-1.5 bg-white border border-border rounded-lg text-gray-400 hover:text-primary transition-all">
              <RefreshCw className="w-4 h-4" />
           </button>
           <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-border rounded-lg text-[11px] font-semibold text-gray-600 hover:bg-gray-50 transition-all">
              <History className="w-3.5 h-3.5" />
              Full History
           </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-border rounded-xl p-3 flex items-center justify-between gap-4 shadow-sm">
         <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by action, customer, or type..." 
              className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-border rounded-lg text-[11px] focus:outline-none"
            />
         </div>
         <div className="flex items-center gap-2">
            {['Sales', 'Support', 'Sync'].map(tag => (
              <button key={tag} className="text-[10px] font-semibold px-2 py-1 rounded bg-gray-50 text-gray-400 border border-border hover:bg-primary/5 hover:text-primary transition-all">
                 {tag}
              </button>
            ))}
            <div className="w-px h-4 bg-border mx-1" />
            <button className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-lg">
               <Filter className="w-4 h-4" />
            </button>
         </div>
      </div>

      {/* Timeline */}
      <div className="relative">
         {/* Vertical Line */}
         <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-100" />

         <div className="space-y-6">
            {activities.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative flex items-start gap-4 group"
              >
                 {/* Icon Node */}
                 <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-[#F8FAFC] shadow-sm transition-transform group-hover:scale-110 ${item.bg} ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                 </div>

                 {/* Content Card */}
                 <div className="flex-1 bg-white border border-border rounded-2xl p-4 shadow-sm group-hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-1">
                       <h3 className="text-xs font-semibold text-foreground">{item.title}</h3>
                       <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                          <Clock className="w-3 h-3" />
                          {item.time}
                       </div>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                       {item.desc}
                    </p>
                    <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-50">
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter">Verified Action</span>
                       </div>
                       <button className="flex items-center gap-1 text-[10px] font-bold text-primary hover:underline">
                          View Details
                          <ArrowRight className="w-3 h-3" />
                       </button>
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-4">
         <button className="px-6 py-2 bg-white border border-border rounded-full text-[11px] font-bold text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
            Load More Activity
         </button>
      </div>
    </div>
  );
}
