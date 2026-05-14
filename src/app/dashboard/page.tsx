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

  const MOCK_STATS = [
    { label: 'Conversations', value: '42', trend: '+12%', icon: 'MessageSquare' },
    { label: 'Revenue Automated', value: '14,200 MAD', trend: '+24%', icon: 'DollarSign' },
    { label: 'Conversion Rate', value: '18.5%', trend: '+5%', icon: 'TrendingUp' },
    { label: 'Orders Placed', value: '28', trend: '+8%', icon: 'ShoppingBag' },
  ];

  const MOCK_CHATS = [
    { id: 'm1', name: 'Amine El Idrissi', message: 'Ahlan! Bghit nchof tapis Azilal...', time: '10:42 AM', status: 'AI Handled', revenue: '2400 MAD' },
    { id: 'm2', name: 'Sara Mansouri', message: 'Wash 3ndkom livraison l Marrakech?', time: '09:15 AM', status: 'AI Handled', revenue: '--' }
  ];

  const stats = data?.stats?.every((s: any) => s.value === '0' || s.value === '0 MAD' || s.value === '0%') ? MOCK_STATS : (data?.stats || []);
  const recentChats = data?.recentChats?.length > 0 ? data.recentChats : MOCK_CHATS;

  return (
    <div className="space-y-4">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-foreground">Sba7 lkhir, {data?.merchant?.business_name || 'Hbibi'}! 👋</h1>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Performance Overview</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {stats.map((stat: any, i: number) => {
          const Icon = iconMap[stat.icon] || MessageSquare;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-border p-2.5 rounded-lg shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="w-6 h-6 rounded bg-primary/5 text-primary flex items-center justify-center">
                  <Icon className="w-3 h-3" />
                </div>
                <span className={cn(
                  "text-[7px] font-bold px-1 py-0.2 rounded uppercase tracking-tighter",
                  stat.trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                )}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-base font-bold text-foreground tracking-tight">{stat.value}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Main Chart Card */}
        <div className="lg:col-span-2 bg-white border border-border rounded-lg p-3 shadow-sm">
           <div className="flex items-center justify-between mb-3">
              <div>
                 <h3 className="text-[11px] font-bold text-foreground uppercase tracking-tight">Sales Performance</h3>
                 <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Revenue Growth</p>
              </div>
              <div className="flex items-center gap-2">
                 <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    <span className="text-[7px] font-bold text-gray-400 uppercase">AI Sales</span>
                 </div>
                 <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-gray-200" />
                    <span className="text-[7px] font-bold text-gray-400 uppercase">Manual</span>
                 </div>
              </div>
           </div>
           
           <div className="h-32 w-full bg-gray-50 rounded-md border border-dashed border-gray-200 flex items-center justify-center">
              <div className="flex flex-col items-center gap-1 text-gray-300">
                 <TrendingUp className="w-4 h-4 opacity-30" />
                 <span className="text-[8px] font-bold uppercase">Chart data will sync as sales arrive</span>
              </div>
           </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white border border-border rounded-lg p-3 shadow-sm">
           <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-bold text-foreground uppercase tracking-tight">Recent Chats</h3>
              <button className="text-[8px] font-bold text-primary hover:underline uppercase tracking-widest">View All</button>
           </div>
           
           <div className="space-y-2">
              {recentChats.length > 0 ? recentChats.map((chat: any) => (
                <div key={chat.id} className="flex items-start gap-2 group cursor-pointer border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                   <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-[9px] shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      {chat.name[0]}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0">
                         <span className="text-[11px] font-bold text-foreground truncate">{chat.name}</span>
                         <span className="text-[7px] text-gray-400 font-bold">{chat.time}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 truncate mb-0.5">{chat.message}</p>
                      <div className="flex items-center gap-2">
                         <span className={cn(
                           "text-[7px] font-bold px-1 py-0.1 rounded uppercase tracking-tighter",
                           chat.status === 'AI Handled' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                         )}>
                            {chat.status}
                         </span>
                         {chat.revenue !== '--' && (
                           <span className="text-[7px] font-bold text-emerald-600">+{chat.revenue}</span>
                         )}
                      </div>
                   </div>
                </div>
              )) : (
                <div className="flex flex-col items-center justify-center h-24 text-gray-300 gap-1">
                   <MessageSquare className="w-4 h-4 opacity-20" />
                   <p className="text-[8px] font-bold uppercase tracking-widest">No conversations yet</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
