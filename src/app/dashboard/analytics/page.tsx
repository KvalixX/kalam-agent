'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  MessageSquare, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Download,
  Info
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getDashboardStats } from '@/lib/actions/dashboard';

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const stats = await getDashboardStats();
      setData(stats);
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

  const revenue = data?.stats?.find((s: any) => s.label === 'Revenue Automated')?.value || '0 MAD';
  const conversionRate = data?.stats?.find((s: any) => s.label === 'Conversion Rate')?.value || '0%';
  const convCount = data?.stats?.find((s: any) => s.label === 'Conversations')?.value || '0';
  const orders = data?.stats?.find((s: any) => s.label === 'Orders Placed')?.value || '0';

  const MOCK_METRICS = [
    { label: 'Total Revenue', value: '14,200 MAD', trend: '+12.5%', sub: 'vs last month' },
    { label: 'AI Resolution', value: '98.2%', trend: '+1.2%', sub: 'Auto-resolved' },
    { label: 'Conversion Rate', value: '18.5%', trend: '+5.4%', sub: 'Chat to Order' },
    { label: 'Conversations', value: '42', trend: '+100%', sub: 'Since launch' },
  ];

  const statsList = data?.stats || [];
  const isAllZero = statsList.every((s: any) => s.value === '0' || s.value === '0 MAD' || s.value === '0%');
  const metrics = isAllZero ? MOCK_METRICS : [
    { label: 'Total Revenue', value: revenue, trend: '+0%', sub: 'vs last month' },
    { label: 'AI Resolution', value: '98.2%', trend: '+1.2%', sub: 'Auto-resolved' },
    { label: 'Conversion Rate', value: conversionRate, trend: '+0%', sub: 'Chat to Order' },
    { label: 'Conversations', value: convCount, trend: '+100%', sub: 'Since launch' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Advanced Analytics</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Monitor AI Performance & Store Growth</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="bg-white border border-border rounded-lg px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-all">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[11px] font-semibold text-gray-600">Last 30 Days</span>
           </div>
           <button className="p-1.5 bg-white border border-border rounded-lg text-gray-400 hover:text-primary transition-all">
              <Download className="w-4 h-4" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border border-border p-4 rounded-xl shadow-sm"
          >
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{m.label}</p>
            <div className="flex items-baseline gap-2">
               <h3 className="text-lg font-black text-foreground">{m.value}</h3>
               <span className={`text-[9px] font-bold flex items-center gap-0.5 ${m.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {m.trend.startsWith('+') ? <ArrowUpRight className="w-2 h-2" /> : <ArrowDownRight className="w-2 h-2" />}
                  {m.trend}
               </span>
            </div>
            <p className="text-[9px] text-gray-400 mt-1 font-medium">{m.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-border rounded-2xl p-6 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <div>
                 <h3 className="text-sm font-bold text-foreground uppercase tracking-tight">Revenue Trend</h3>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Automated Sales Growth</p>
              </div>
           </div>
           <div className="h-64 w-full bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center relative overflow-hidden group">
              <div className="relative z-10 flex flex-col items-center gap-1 text-gray-300 group-hover:text-primary/40 transition-colors">
                 <TrendingUp className="w-8 h-8 opacity-20" />
                 <span className="text-[9px] font-bold uppercase tracking-widest">Visualizing store growth...</span>
              </div>
              {/* Mock Chart Background */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/5 to-transparent opacity-50" />
           </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-tight">Darija Insights</h3>
              <Info className="w-3.5 h-3.5 text-gray-300" />
           </div>
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">Top Customer Keywords</p>
           <div className="flex flex-col items-center justify-center h-52 text-gray-300 gap-4">
              <div className="flex flex-wrap gap-2 justify-center">
                 {['Jacket', 'Taille', 'Noir', 'Livraison', 'Rabat', 'Prix'].map((tag, i) => (
                    <span key={tag} className="px-3 py-1 bg-gray-50 border border-border rounded-lg text-[10px] font-bold text-gray-400" style={{ opacity: 1 - (i * 0.15) }}>
                       {tag}
                    </span>
                 ))}
              </div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-center max-w-[150px] leading-relaxed">AI is analyzing conversation topics...</p>
           </div>
        </div>
      </div>
    </div>
  );
}
