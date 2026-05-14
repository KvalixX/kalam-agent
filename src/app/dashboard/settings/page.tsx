'use client';

import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink, 
  Settings,
  MessageSquare,
  Store,
  Loader2
} from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { getMerchantSettings, updateMerchantSettings, updateAgentConfig } from '@/lib/actions/dashboard';

export default function SettingsPage() {
  const [merchant, setMerchant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Local state for toggles and selects
  const [style, setStyle] = useState('natural');
  const [autoUpsell, setAutoUpsell] = useState(false);
  const [phone, setPhone] = useState('');
  
  // E-commerce state
  const [platform, setPlatform] = useState('Shopify');
  const [shopName, setShopName] = useState('');
  const [token, setToken] = useState('');

  const load = async () => {
    const data = await getMerchantSettings();
    setMerchant(data);
    if (data) {
      const config = data.agent_configs?.[0];
      setStyle(config?.style || 'natural');
      setAutoUpsell(config?.auto_upsell || false);
      setPhone(data.whatsapp_phone_number || '');
      
      setPlatform(data.ecommerce_platform || 'Shopify');
      setShopName(data.ecommerce_shop_name || '');
      setToken(data.ecommerce_token || '');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    startTransition(async () => {
      await updateMerchantSettings({ 
        whatsapp_phone_number: phone,
        ecommerce_platform: platform,
        ecommerce_shop_name: shopName,
        ecommerce_token: token
      });
      await updateAgentConfig({ style, auto_upsell: autoUpsell });
      await load();
      setIsSaving(false);
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Integrations & Settings</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Configure your AI agent and store connections</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 bg-primary text-white text-[11px] font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
        >
           {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
           {isSaving ? 'Saving...' : 'Save Changes'}
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
                 <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tight">Business Account</p>
              </div>
           </div>
           
           <div className="space-y-4">
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-3 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-semibold text-emerald-700">Connected</span>
                 </div>
              </div>
              
              <div className="space-y-1.5">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">WhatsApp Number</label>
                 <input 
                   value={phone}
                   onChange={(e) => setPhone(e.target.value)}
                   placeholder="+212 ..."
                   className="w-full px-3 py-2 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                 />
              </div>
           </div>
        </div>

        {/* AI Behavior */}
        <div className="bg-white border border-border rounded-xl p-4 shadow-sm">
           <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                 <Settings className="w-4 h-4" />
              </div>
              <div>
                 <h3 className="text-xs font-semibold text-foreground">AI Tone & Voice</h3>
                 <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tight">Conversation Style</p>
              </div>
           </div>
           
           <div className="space-y-4">
              <div>
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Preferred Style</label>
                 <select 
                   value={style}
                   onChange={(e) => setStyle(e.target.value)}
                   className="w-full px-3 py-2 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                 >
                    <option value="natural">Darija + French Mix (Natural)</option>
                    <option value="formal">Classical Arabic (Formal)</option>
                    <option value="friendly">Pure Darija (Friendly)</option>
                 </select>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 border border-border rounded-xl">
                 <div>
                    <p className="text-[11px] font-bold text-foreground uppercase tracking-tight">Auto-upsell products</p>
                    <p className="text-[9px] text-gray-400 font-medium">Agent will recommend related items</p>
                 </div>
                 <button 
                   onClick={() => setAutoUpsell(!autoUpsell)}
                   className={`w-10 h-5 rounded-full relative transition-all duration-300 ${autoUpsell ? 'bg-primary' : 'bg-gray-200'}`}
                 >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${autoUpsell ? 'right-0.5' : 'left-0.5'}`} />
                 </button>
              </div>
           </div>
        </div>

        {/* E-commerce Platforms */}
        <div className="bg-white border border-border rounded-xl p-4 shadow-sm md:col-span-2">
           <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Store className="w-4 h-4" />
                 </div>
                 <div>
                    <h3 className="text-xs font-semibold text-foreground">Store Integration</h3>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tight">Connect your catalog</p>
                 </div>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Platform</label>
                 <select 
                   value={platform}
                   onChange={(e) => setPlatform(e.target.value)}
                   className="w-full px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                 >
                    <option value="Shopify">Shopify</option>
                    <option value="YouCan">YouCan.shop</option>
                 </select>
              </div>
              <div className="space-y-1.5">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{platform === 'Shopify' ? 'Shop Name' : 'Shop ID'}</label>
                 <input 
                   value={shopName}
                   onChange={(e) => setShopName(e.target.value)}
                   placeholder={platform === 'Shopify' ? 'kalam-demo' : 'Store name...'}
                   className="w-full px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                 />
              </div>
              <div className="space-y-1.5">
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Access Token</label>
                 <input 
                   type="password"
                   value={token}
                   onChange={(e) => setToken(e.target.value)}
                   placeholder="shpat_..."
                   className="w-full px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                 />
              </div>
           </div>
           
           <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
              <p className="text-[10px] text-gray-400 font-medium leading-relaxed max-w-md">
                 After saving, go to the <span className="font-bold text-foreground">Catalog</span> page and click "Sync Now" to import your products.
              </p>
              <div className="flex items-center gap-2">
                 <span className={`w-2 h-2 rounded-full ${token ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{token ? 'Configured' : 'Not Linked'}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
