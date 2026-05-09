'use client';

import { motion } from 'framer-motion';
import { 
  FileText, 
  Link as LinkIcon, 
  Globe, 
  Upload, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  AlertCircle,
  Search,
  RefreshCw,
  Zap,
  Play
} from 'lucide-react';
import { useState } from 'react';

const sources = [
  { id: 1, type: 'file', name: 'Product_Catalog_2024.pdf', size: '2.4 MB', status: 'Indexed', date: '2 days ago' },
  { id: 2, type: 'url', name: 'https://mystore.ma/policies', size: '--', status: 'Indexed', date: '5 hours ago' },
  { id: 3, type: 'store', name: 'Shopify Product Sync', size: '412 items', status: 'Syncing', date: 'Just now' },
];

export default function KnowledgeBasePage() {
  const [activeTab, setActiveTab] = useState('sources');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">AI Knowledge Base</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Train your agent on your products and policies</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white text-[11px] font-semibold rounded-lg hover:bg-primary-dark transition-all">
           <Plus className="w-3.5 h-3.5" />
           Add Source
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-4">
           {/* Upload Zone */}
           <div className="bg-white border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center group hover:border-primary/20 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                 <Upload className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Upload New Catalog</h3>
              <p className="text-[11px] text-gray-400 font-medium">Drag and drop your PDF, Excel, or CSV files here</p>
              <p className="text-[9px] text-gray-300 mt-2">Max file size: 20MB</p>
           </div>

           {/* Sources List */}
           <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                 <h3 className="text-xs font-semibold text-foreground">Active Sources</h3>
                 <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Filter sources..." 
                      className="pl-8 pr-3 py-1 bg-gray-50 border border-border rounded text-[10px] focus:outline-none"
                    />
                 </div>
              </div>
              <div className="divide-y divide-border">
                 {sources.map((s) => (
                   <div key={s.id} className="p-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                         <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                           s.type === 'file' ? 'bg-blue-50 text-blue-600' : 
                           s.type === 'url' ? 'bg-purple-50 text-purple-600' : 'bg-amber-50 text-amber-600'
                         }`}>
                            {s.type === 'file' ? <FileText className="w-4 h-4" /> : 
                             s.type === 'url' ? <Globe className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                         </div>
                         <div>
                            <p className="text-[11px] font-semibold text-foreground">{s.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                               <span className="text-[9px] text-gray-400 font-medium">{s.size}</span>
                               <span className="w-1 h-1 rounded-full bg-gray-300" />
                               <span className="text-[9px] text-gray-400 font-medium">{s.date}</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-1.5">
                            {s.status === 'Indexed' ? (
                              <div className="flex items-center gap-1">
                                 <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                 <span className="text-[9px] font-semibold text-emerald-600 uppercase tracking-tighter">Indexed</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                 <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                 <span className="text-[9px] font-semibold text-amber-600 uppercase tracking-tighter">Syncing...</span>
                              </div>
                            )}
                         </div>
                         <button className="p-1 text-gray-300 hover:text-foreground">
                            <MoreVertical className="w-4 h-4" />
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Sidebar: AI Playground */}
        <div className="space-y-4">
           <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                 </div>
                 <div>
                    <h3 className="text-xs font-semibold text-foreground">Test Your Agent</h3>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tight">Real-time Preview</p>
                 </div>
              </div>
              
              <div className="space-y-4">
                 <div className="bg-gray-50 rounded-xl p-3 border border-border">
                    <div className="flex items-start gap-2 mb-3">
                       <div className="w-5 h-5 rounded-full bg-gray-200 shrink-0" />
                       <div className="bg-white p-2 rounded-lg rounded-tl-none border border-border text-[11px] shadow-sm">
                          Salam! 3ndkom chi jacket f noir?
                       </div>
                    </div>
                    <div className="flex items-start justify-end gap-2">
                       <div className="bg-primary p-2 rounded-lg rounded-tr-none text-[11px] text-white shadow-sm max-w-[80%]">
                          Ahlan! Oui, 3ndna "Premium Winter Jacket" f noir. Katkoun f les tailles S hta l XL. Bghiti nchof lik chi taille spécifique?
                       </div>
                       <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                          <Zap className="w-3 h-3 fill-current" />
                       </div>
                    </div>
                 </div>
                 
                 <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Ask the agent anything..." 
                      className="w-full pl-3 pr-10 py-2 bg-gray-50 border border-border rounded-xl text-[11px] focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                       <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                 </div>
              </div>
           </div>

           <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                 <AlertCircle className="w-4 h-4 text-emerald-600" />
                 <span className="text-[11px] font-bold text-emerald-900">Knowledge Tip</span>
              </div>
              <p className="text-[10px] text-emerald-700 font-medium leading-relaxed">
                 Updating your **Product Catalog** regularly ensures the AI always gives accurate stock information to your Moroccan customers.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
