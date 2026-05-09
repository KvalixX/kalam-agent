'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Info
} from 'lucide-react';

const metrics = [
  { label: 'Total Revenue', value: '142,900 MAD', trend: '+12%', sub: 'vs last month' },
  { label: 'AI Resolution', value: '87.4%', trend: '+5%', sub: 'Auto-resolved' },
  { label: 'Conversion Rate', value: '4.2%', trend: '-1%', sub: 'Chat to Order' },
  { label: 'Avg Order Value', value: '458 MAD', trend: '+18%', sub: 'Upsell success' },
];

const topKeywords = [
  { word: 'taille', count: 423, growth: '+22%' },
  { word: 'livraison', count: 312, growth: '+15%' },
  { word: 'prix', count: 289, growth: '+8%' },
  { word: 'stock', count: 145, growth: '+32%' },
  { word: 'couleur', count: 98, growth: '+12%' },
];

export default function AnalyticsPage() {
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

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border border-border p-4 rounded-xl shadow-sm"
          >
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">{m.label}</p>
            <div className="flex items-baseline gap-2">
               <h3 className="text-lg font-semibold text-foreground">{m.value}</h3>
               <span className={`text-[9px] font-semibold flex items-center gap-0.5 ${m.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {m.trend.startsWith('+') ? <ArrowUpRight className="w-2 h-2" /> : <ArrowDownRight className="w-2 h-2" />}
                  {m.trend}
               </span>
            </div>
            <p className="text-[9px] text-gray-400 mt-1 font-medium">{m.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart Placeholder */}
        <div className="lg:col-span-2 bg-white border border-border rounded-xl p-5 shadow-sm">
           <div className="flex items-center justify-between mb-6">
              <div>
                 <h3 className="text-sm font-semibold text-foreground">Revenue Trend</h3>
                 <p className="text-[10px] text-gray-400 font-medium uppercase">Automated Sales Growth</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[9px] font-semibold text-gray-500">AI AGENT</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-gray-200" />
                    <span className="text-[9px] font-semibold text-gray-500">MANUAL</span>
                 </div>
              </div>
           </div>
           <div className="h-64 w-full bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 flex items-end px-4 pb-4 gap-2">
                 {[40, 70, 45, 90, 65, 80, 50, 85, 95, 75, 60, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary rounded-t-sm transition-all hover:opacity-80" style={{ height: `${h}%` }} />
                 ))}
              </div>
              <div className="relative z-10 flex flex-col items-center gap-1 text-gray-400">
                 <TrendingUp className="w-6 h-6 opacity-30" />
                 <span className="text-[10px] font-semibold uppercase">Live Trend Data</span>
              </div>
           </div>
        </div>

        {/* Top Keywords / Insights */}
        <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-foreground">Darija Insights</h3>
              <Info className="w-3.5 h-3.5 text-gray-300" />
           </div>
           <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-4">Top Customer Keywords</p>
           <div className="space-y-4">
              {topKeywords.map((k) => (
                <div key={k.word} className="space-y-1.5">
                   <div className="flex items-center justify-between text-[11px] font-semibold text-foreground">
                      <span>{k.word}</span>
                      <span className="text-emerald-600 text-[10px]">{k.growth}</span>
                   </div>
                   <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(k.count / 423) * 100}%` }}
                        className="h-full bg-primary rounded-full" 
                      />
                   </div>
                   <p className="text-[9px] text-gray-400 font-medium">{k.count} mentions this week</p>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Resolution Funnel */}
         <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-6">Resolution Funnel</h3>
            <div className="space-y-3">
               {[
                 { label: 'Total Inquiries', value: '4,212', p: '100%' },
                 { label: 'AI Processed', value: '3,890', p: '92%' },
                 { label: 'Auto-Resolved', value: '3,420', p: '81%' },
                 { label: 'Order Confirmed', value: '312', p: '7.4%' },
               ].map((step, i) => (
                 <div key={step.label} className="flex items-center gap-4">
                    <div className="w-24 text-[11px] font-semibold text-gray-500 uppercase leading-none">{step.label}</div>
                    <div className="flex-1 h-8 bg-gray-50 border border-border rounded-lg relative overflow-hidden flex items-center px-3">
                       <div className="absolute inset-0 bg-primary/5" style={{ width: step.p }} />
                       <span className="relative z-10 text-[11px] font-semibold text-foreground">{step.value}</span>
                       <span className="ml-auto relative z-10 text-[9px] font-medium text-gray-400">{step.p}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Efficiency Card */}
         <div className="bg-white border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div>
               <h3 className="text-sm font-semibold text-foreground mb-2">Efficiency Gain</h3>
               <p className="text-[10px] text-gray-400 font-medium uppercase mb-6">Human Hours Saved by Kalam</p>
               <div className="flex items-center gap-6">
                  <div className="text-center">
                     <p className="text-2xl font-semibold text-primary">164h</p>
                     <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest mt-1">This Month</p>
                  </div>
                  <div className="h-10 w-px bg-border" />
                  <div>
                     <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                        Kalam has handled the equivalent of **4.1 full-time employees'** workload this month.
                     </p>
                  </div>
               </div>
            </div>
            <div className="mt-6 p-3 bg-primary/5 rounded-lg border border-primary/10">
               <p className="text-[10px] font-semibold text-primary">
                  Pro-tip: Your agent is seeing high volume for "livraison". Consider adding a custom FAQ for shipping policies.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
