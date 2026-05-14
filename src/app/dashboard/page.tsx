'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  MessageSquare, 
  DollarSign, 
  Clock,
  ArrowUpRight,
  ShoppingBag,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getDashboardStats } from '@/lib/actions/dashboard';

const iconMap: Record<string, any> = {
  MessageSquare,
  DollarSign,
  Clock,
  ShoppingBag
};

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const stats = await getDashboardStats();
      setData(stats);
      setIsLoading(false);
    }
    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = data?.stats || [];
  const recentChats = data?.recentChats || [];

  return (
    <div className="space-y-4">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Sba7 lkhir, {data?.merchant?.business_name || 'Hbibi'}! 👋</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">AI AGENT PERFORMANCE OVERVIEW</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat: any, i: number) => {
          const Icon = iconMap[stat.icon] || MessageSquare;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-border p-3.5 rounded-xl shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-7 h-7 rounded bg-primary/5 text-primary flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className={cn(
                  "text-[8px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-tighter",
                  stat.trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                )}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-[8px] font-semibold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-lg font-semibold text-foreground tracking-tight">{stat.value}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Chart Card */}
        <div className="lg:col-span-2 bg-white border border-border rounded-xl p-4 shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <div>
                 <h3 className="text-sm font-semibold text-foreground uppercase tracking-tight">Sales Performance</h3>
                 <p className="text-[9px] text-gray-400 font-medium uppercase tracking-widest">Revenue automated vs Manual</p>
              </div>
              <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-[8px] font-medium text-gray-400 uppercase tracking-tighter">AI Sales</span>
                 </div>
                 <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                    <span className="text-[8px] font-medium text-gray-400 uppercase tracking-tighter">Manual</span>
                 </div>
              </div>
           </div>
           
           <div className="h-40 w-full bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center">
              <div className="flex flex-col items-center gap-1 text-gray-300">
                 <TrendingUp className="w-5 h-5 opacity-30" />
                 <span className="text-[9px] font-medium uppercase">Chart data will sync as sales arrive</span>
              </div>
           </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white border border-border rounded-xl p-4 shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-tight">Recent Chats</h3>
              <button className="text-[9px] font-semibold text-primary hover:underline uppercase tracking-widest">View All</button>
           </div>
           
           <div className="space-y-3">
              {recentChats.length > 0 ? recentChats.map((chat: any) => (
                <div key={chat.id} className="flex items-start gap-2.5 group cursor-pointer border-b border-gray-50 pb-2.5 last:border-0 last:pb-0">
                   <div className="w-7 h-7 rounded bg-gray-100 flex items-center justify-center text-gray-400 font-semibold text-[10px] shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      {chat.name[0]}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                         <span className="text-xs font-semibold text-foreground truncate">{chat.name}</span>
                         <span className="text-[8px] text-gray-400 font-medium">{chat.time}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 truncate mb-1">{chat.message}</p>
                      <div className="flex items-center gap-2">
                         <span className={cn(
                           "text-[7px] font-semibold px-1 py-0.5 rounded uppercase tracking-tighter",
                           chat.status === 'AI Handled' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                         )}>
                            {chat.status}
                         </span>
                         {chat.revenue !== '--' && (
                           <span className="text-[8px] font-semibold text-emerald-600">+{chat.revenue}</span>
                         )}
                      </div>
                   </div>
                </div>
              )) : (
                <div className="flex flex-col items-center justify-center h-32 text-gray-300 gap-2">
                  <MessageSquare className="w-6 h-6 opacity-20" />
                  <p className="text-[9px] font-medium uppercase">No conversations yet</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
