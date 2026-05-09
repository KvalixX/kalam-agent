'use client';

import { motion } from 'framer-motion';
import { 
  Download, 
  FileText, 
  Table, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Filter,
  Calendar,
  Users,
  ShoppingBag,
  Package,
  ShieldCheck
} from 'lucide-react';

const recentExports = [
  { id: 1, name: 'Q1_Sales_Report.csv', size: '1.2 MB', date: '2 hours ago', status: 'Ready' },
  { id: 2, name: 'VIP_Customer_List.xlsx', size: '450 KB', date: 'Yesterday', status: 'Ready' },
  { id: 3, name: 'Full_Inventory_Snapshot.pdf', size: '8.4 MB', date: '3 days ago', status: 'Expired' },
];

export default function ExportCenterPage() {
  return (
    <div className="space-y-6 max-w-5xl pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Global Export Center</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Download your data for accounting, marketing, or shipping</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Export Configuration */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-8">
              {/* Step 1: Select Data */}
              <div>
                 <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">1</div>
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">Select Data Category</h3>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { icon: ShoppingBag, label: 'Sales & Orders', desc: 'Full transaction history' },
                      { icon: Users, label: 'Customer Data', desc: 'Emails, names, and LTV' },
                      { icon: Package, label: 'Product Catalog', desc: 'Prices, stock, and SKUs' },
                    ].map((item, i) => (
                      <button key={i} className="p-4 rounded-xl border border-border bg-gray-50/50 hover:bg-white hover:border-primary/20 hover:shadow-md transition-all text-left group">
                         <item.icon className="w-5 h-5 text-gray-400 group-hover:text-primary mb-3 transition-colors" />
                         <p className="text-[11px] font-bold text-foreground mb-1">{item.label}</p>
                         <p className="text-[9px] text-gray-400 font-medium leading-tight">{item.desc}</p>
                      </button>
                    ))}
                 </div>
              </div>

              {/* Step 2: Date Range */}
              <div>
                 <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">2</div>
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">Date Range</h3>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {['Last 7 Days', 'Last 30 Days', 'Current Month', 'Last Quarter', 'Custom Range'].map(range => (
                      <button key={range} className="px-3 py-1.5 rounded-lg border border-border bg-white text-[11px] font-semibold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
                         {range === 'Custom Range' && <Calendar className="w-3 h-3 text-gray-400" />}
                         {range}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Step 3: Format */}
              <div>
                 <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">3</div>
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">File Format</h3>
                 </div>
                 <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                       <input type="radio" name="format" className="accent-primary" defaultChecked />
                       <span className="text-[11px] font-bold text-gray-600 group-hover:text-foreground transition-colors">CSV (Best for Excel)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                       <input type="radio" name="format" className="accent-primary" />
                       <span className="text-[11px] font-bold text-gray-600 group-hover:text-foreground transition-colors">JSON (Best for Devs)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                       <input type="radio" name="format" className="accent-primary" />
                       <span className="text-[11px] font-bold text-gray-600 group-hover:text-foreground transition-colors">PDF (Accounting)</span>
                    </label>
                 </div>
              </div>

              <div className="pt-6 border-t border-border flex items-center justify-between">
                 <div className="flex items-center gap-2 text-emerald-600">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase">GDPR Compliant Export</span>
                 </div>
                 <button className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Generate Export
                 </button>
              </div>
           </div>
        </div>

        {/* Recent Exports Sidebar */}
        <div className="space-y-4">
           <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                 <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">Recent Exports</h3>
                 <Clock className="w-3.5 h-3.5 text-gray-300" />
              </div>
              <div className="divide-y divide-border">
                 {recentExports.map((exp) => (
                   <div key={exp.id} className="p-4 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-start justify-between mb-2">
                         <div className="flex items-center gap-2">
                            {exp.name.endsWith('csv') ? <Table className="w-4 h-4 text-emerald-500" /> : <FileText className="w-4 h-4 text-blue-500" />}
                            <span className="text-[11px] font-bold text-foreground truncate max-w-[120px]">{exp.name}</span>
                         </div>
                         <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${
                            exp.status === 'Ready' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                         }`}>
                            {exp.status}
                         </span>
                      </div>
                      <div className="flex items-center justify-between">
                         <p className="text-[9px] text-gray-400 font-medium">{exp.size} • {exp.date}</p>
                         {exp.status === 'Ready' && (
                           <button className="p-1.5 text-primary hover:bg-primary/5 rounded-lg transition-all">
                              <Download className="w-4 h-4" />
                           </button>
                         )}
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full p-3 text-[10px] font-bold text-gray-400 hover:text-primary transition-all flex items-center justify-center gap-2 border-t border-border">
                 View History
                 <ArrowRight className="w-3.5 h-3.5" />
              </button>
           </div>

           <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2 text-amber-600">
                 <Clock className="w-4 h-4" />
                 <span className="text-[11px] font-bold uppercase">Auto-Cleanup</span>
              </div>
              <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                 Exports are automatically deleted after **7 days** to maintain data privacy. Download them promptly.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
