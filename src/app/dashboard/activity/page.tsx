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
import { useEffect, useState } from 'react';
import { getActivity } from '@/lib/actions/dashboard';

export default function ActivityLogPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getActivity();
      setActivities(data);
      setIsLoading(false);
    }
    load();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
      </div>

      {/* Timeline */}
      <div className="relative">
         {/* Vertical Line */}
         <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-100" />

         <div className="space-y-6">
            {activities.length > 0 ? activities.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative flex items-start gap-4 group"
              >
                 {/* Icon Node */}
                 <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-[#F8FAFC] shadow-sm transition-transform group-hover:scale-110 bg-primary/5 text-primary`}>
                    <MessageSquare className="w-5 h-5" />
                 </div>

                 {/* Content Card */}
                 <div className="flex-1 bg-white border border-border rounded-2xl p-4 shadow-sm group-hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-1">
                       <h3 className="text-xs font-semibold text-foreground">
                         Conversation with {item.customers?.name || 'Customer'}
                       </h3>
                       <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                          <Clock className="w-3 h-3" />
                          {new Date(item.created_at).toLocaleTimeString()}
                       </div>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                       AI Handled a new inquiry on WhatsApp via {item.channel || 'Mobile'}.
                    </p>
                    <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-50">
                       <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          <span className={`text-[9px] font-bold uppercase tracking-tighter ${item.status === 'active' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {item.status === 'active' ? 'AI Resolved' : 'Escalated'}
                          </span>
                       </div>
                       <button className="flex items-center gap-1 text-[10px] font-bold text-primary hover:underline">
                          View Log
                          <ArrowRight className="w-3 h-3" />
                       </button>
                    </div>
                 </div>
              </motion.div>
            )) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-300 gap-2">
                <History className="w-10 h-10 opacity-20" />
                <p className="text-[11px] font-bold uppercase tracking-widest">No activity log found</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
}
