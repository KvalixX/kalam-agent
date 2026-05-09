'use client';

import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink, 
  Plus,
  Settings,
  ShieldCheck,
  MessageSquare,
  Truck,
  Store
} from 'lucide-react';

const platforms = [
  { name: 'Shopify', icon: 'https://cdn.worldvectorlogo.com/logos/shopify.svg', status: 'Connected', lastSync: '2m ago' },
  { name: 'YouCan', icon: 'https://youcan.shop/favicon.ico', status: 'Disconnected', lastSync: '--' },
];

const logistics = [
  { name: 'Amana Express', status: 'Active', config: 'API Key v2.1' },
  { name: 'J&T Express', status: 'Inactive', config: 'Not set' },
];

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Integrations & Settings</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Configure your AI agent and store connections</p>
        </div>
        <button className="px-3 py-1.5 bg-primary text-white text-[11px] font-semibold rounded-lg hover:bg-primary-dark transition-all">
           Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WhatsApp Connection */}
        <div className="bg-white border border-border rounded-xl p-4 shadow-sm">
           <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                 <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                 <h3 className="text-xs font-semibold text-foreground">WhatsApp API</h3>
                 <p className="text-[10px] text-gray-500 font-medium">Business Account Connection</p>
              </div>
           </div>
           
           <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-3 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[11px] font-semibold text-emerald-700">Connected & Online</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-medium">+212 600-XXXXXX</span>
           </div>
           
           <button className="w-full py-1.5 border border-border rounded-lg text-[11px] font-semibold text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <RefreshCw className="w-3 h-3" />
              Refresh Connection
           </button>
        </div>

        {/* AI Behavior */}
        <div className="bg-white border border-border rounded-xl p-4 shadow-sm">
           <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                 <Settings className="w-4 h-4" />
              </div>
              <div>
                 <h3 className="text-xs font-semibold text-foreground">AI Tone & Voice</h3>
                 <p className="text-[10px] text-gray-500 font-medium">Configure conversation style</p>
              </div>
           </div>
           
           <div className="space-y-3">
              <div>
                 <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Preferred Language</label>
                 <select className="w-full bg-gray-50 border border-border rounded-lg px-2 py-1.5 text-[11px] focus:outline-none">
                    <option>Darija + French Mix (Natural)</option>
                    <option>Classical Arabic (Formal)</option>
                    <option>Pure Darija (Friendly)</option>
                 </select>
              </div>
              <div className="flex items-center justify-between">
                 <span className="text-[11px] text-gray-600 font-medium">Auto-upsell products</span>
                 <div className="w-8 h-4 bg-primary rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                 </div>
              </div>
           </div>
        </div>

        {/* E-commerce Platforms */}
        <div className="bg-white border border-border rounded-xl p-4 shadow-sm md:col-span-2">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Store className="w-4 h-4" />
                 </div>
                 <div>
                    <h3 className="text-xs font-semibold text-foreground">E-commerce Stores</h3>
                    <p className="text-[10px] text-gray-500 font-medium">Sync products and orders</p>
                 </div>
              </div>
              <button className="flex items-center gap-1.5 text-[10px] font-bold text-primary hover:underline">
                 <Plus className="w-3 h-3" />
                 Add New Store
              </button>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {platforms.map((p) => (
                <div key={p.name} className="border border-border rounded-lg p-3 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <img src={p.icon} alt={p.name} className="w-6 h-6 object-contain grayscale" />
                      <div>
                         <p className="text-[11px] font-semibold text-foreground">{p.name}</p>
                         <p className="text-[9px] text-gray-400 font-medium">Last sync: {p.lastSync}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                        p.status === 'Connected' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                         {p.status}
                      </span>
                      <ExternalLink className="w-3 h-3 text-gray-300" />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Logistics */}
        <div className="bg-white border border-border rounded-xl p-4 shadow-sm md:col-span-2">
           <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                 <Truck className="w-4 h-4" />
              </div>
              <div>
                 <h3 className="text-xs font-semibold text-foreground">Logistics Providers</h3>
                 <p className="text-[10px] text-gray-500 font-medium">Enable real-time order tracking</p>
              </div>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {logistics.map((l) => (
                <div key={l.name} className="border border-border rounded-lg p-3 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center border border-border">
                         <Truck className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      <div>
                         <p className="text-[11px] font-semibold text-foreground">{l.name}</p>
                         <p className="text-[9px] text-gray-400 font-medium">{l.config}</p>
                      </div>
                   </div>
                   <div className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                      l.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'
                   }`}>
                      {l.status}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Security / API */}
        <div className="bg-white border border-border rounded-xl p-4 shadow-sm md:col-span-2">
           <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                 <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                 <h3 className="text-xs font-semibold text-foreground">Security & API Access</h3>
                 <p className="text-[10px] text-gray-500 font-medium">Manage your secret keys</p>
              </div>
           </div>
           
           <div className="flex items-center gap-3 bg-gray-50 border border-border rounded-lg px-3 py-2">
              <code className="text-[10px] font-mono text-gray-500 flex-1 truncate">kalam_sk_live_9a2b8c4d7e5f1g3h...</code>
              <button className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">Reveal Key</button>
           </div>
        </div>
      </div>
    </div>
  );
}
