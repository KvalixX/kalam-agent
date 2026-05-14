'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Eye, 
  Code, 
  Palette, 
  CheckCircle2,
  Copy,
  Zap,
  Globe,
  Loader2,
  Settings2,
  Smartphone,
  Monitor,
  X,
  Send
} from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { getMerchantSettings, updateAgentConfig } from '@/lib/actions/dashboard';

export default function WidgetCustomizerPage() {
  const [color, setColor] = useState('#7C3AED');
  const [position, setPosition] = useState('right');
  const [message, setMessage] = useState('Salam! Kifach n9der n3awnk? ✨');
  const [agentName, setAgentName] = useState('Kalam Assistant');
  const [isOpen, setIsOpen] = useState(false);
  
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function load() {
      const data = await getMerchantSettings();
      const config = data?.agent_configs?.[0];
      if (config) {
        setColor(config.widget_color || '#7C3AED');
        setPosition(config.widget_position || 'right');
        setMessage(config.welcome_message || 'Salam! Kifach n9der n3awnk? ✨');
        setAgentName(config.agent_name || 'Kalam Assistant');
      }
      setIsLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    startTransition(async () => {
      await updateAgentConfig({
        widget_color: color,
        widget_position: position,
        welcome_message: message,
        agent_name: agentName
      });
      setIsSaving(false);
    });
  };

  const embedCode = `<script src="https://cdn.kalam.ai/widget.js" data-id="kalam_62a1" data-color="${color}" data-pos="${position}"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl pb-12 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Widget Customizer</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Design your store's AI shopping assistant</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex bg-gray-100 p-1 rounded-xl">
              <button className="p-1.5 bg-white shadow-sm rounded-lg text-primary"><Monitor className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 text-gray-400"><Smartphone className="w-3.5 h-3.5" /></button>
           </div>
           <button 
             onClick={handleSave}
             disabled={isSaving}
             className="px-4 py-2 bg-primary text-white text-[11px] font-bold rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
           >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
              Publish Changes
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Settings Panel */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-8">
              <div>
                 <div className="flex items-center gap-2 mb-6">
                    <Palette className="w-4 h-4 text-primary" />
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Brand Style</h3>
                 </div>
                 <div className="space-y-4">
                    <div>
                       <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Theme Color</label>
                       <div className="flex items-center gap-3">
                          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 rounded-xl border-none cursor-pointer overflow-hidden shadow-sm" />
                          <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 bg-gray-50 border border-border rounded-xl px-3 py-2 text-[11px] font-mono" />
                       </div>
                    </div>
                    <div>
                       <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Widget Position</label>
                       <div className="grid grid-cols-2 gap-2">
                          {['left', 'right'].map(pos => (
                             <button key={pos} onClick={() => setPosition(pos)} className={`py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                                position === pos ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-gray-50 border-border text-gray-400'
                             }`}>{pos}</button>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="pt-8 border-t border-border">
                 <div className="flex items-center gap-2 mb-6">
                    <Settings2 className="w-4 h-4 text-primary" />
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bot Personality</h3>
                 </div>
                 <div className="space-y-4">
                    <div>
                       <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Assistant Name</label>
                       <input value={agentName} onChange={(e) => setAgentName(e.target.value)} className="w-full bg-gray-50 border border-border rounded-xl px-3 py-2.5 text-[11px] font-bold" />
                    </div>
                    <div>
                       <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Welcome Message</label>
                       <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-gray-50 border border-border rounded-xl px-3 py-2.5 text-[11px] font-medium min-h-[100px] resize-none" />
                    </div>
                 </div>
              </div>

              <div className="pt-8 border-t border-border">
                 <div className="flex items-center gap-2 mb-4">
                    <Code className="w-4 h-4 text-primary" />
                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Installation</h3>
                 </div>
                 <div className="relative group">
                    <div className="bg-gray-900 text-gray-400 p-4 rounded-2xl text-[9px] font-mono leading-relaxed whitespace-pre-wrap">
                       {embedCode}
                    </div>
                    <button onClick={handleCopy} className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all">
                       {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Live Preview */}
        <div className="lg:col-span-8 space-y-4">
           <div className="bg-white border border-border rounded-[2.5rem] p-4 shadow-xl h-[600px] relative overflow-hidden flex flex-col">
              {/* Browser Header */}
              <div className="bg-gray-50 border border-border rounded-2xl p-3 flex items-center justify-between mb-8">
                 <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-200" />
                 </div>
                 <div className="bg-white border border-border rounded-lg px-4 py-1 text-[10px] font-bold text-gray-400 flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    yourstore.com
                 </div>
                 <div className="w-8 h-8 rounded-full bg-gray-200" />
              </div>

              {/* Mock Store Content */}
              <div className="px-12 space-y-12 opacity-30 select-none">
                 <div className="flex items-center justify-between">
                    <div className="w-24 h-6 bg-gray-200 rounded" />
                    <div className="flex gap-4">
                       <div className="w-12 h-2 bg-gray-200 rounded" />
                       <div className="w-12 h-2 bg-gray-200 rounded" />
                       <div className="w-12 h-2 bg-gray-200 rounded" />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-12">
                    <div className="aspect-square bg-gray-100 rounded-3xl" />
                    <div className="space-y-6 py-8">
                       <div className="h-8 w-48 bg-gray-200 rounded" />
                       <div className="h-4 w-64 bg-gray-200 rounded" />
                       <div className="h-12 w-32 bg-primary/20 rounded-xl" />
                    </div>
                 </div>
              </div>

              {/* LIVE WIDGET PREVIEW */}
              <motion.div 
                layout
                className="absolute bottom-8 z-50 flex flex-col gap-4"
                style={{ 
                  right: position === 'right' ? 32 : 'auto', 
                  left: position === 'left' ? 32 : 'auto',
                  alignItems: position === 'right' ? 'flex-end' : 'flex-start'
                }}
              >
                 <AnimatePresence>
                    {!isOpen && (
                       <motion.div initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.8 }} className="bg-white border border-border p-4 rounded-3xl rounded-br-sm shadow-2xl max-w-[240px] relative">
                          <p className="text-[11px] font-bold text-gray-800 leading-relaxed">{message}</p>
                          <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-r border-b border-border rotate-45" />
                       </motion.div>
                    )}
                 </AnimatePresence>

                 {/* Open Chat Window */}
                 <AnimatePresence>
                    {isOpen && (
                       <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.9 }} className="w-[320px] bg-white rounded-3xl shadow-2xl border border-border overflow-hidden mb-4">
                          <div className="p-4 flex items-center justify-between" style={{ backgroundColor: color }}>
                             <div className="flex items-center gap-3 text-white">
                                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"><MessageCircle className="w-5 h-5 fill-current" /></div>
                                <div>
                                   <p className="text-xs font-black uppercase tracking-tight">{agentName}</p>
                                   <p className="text-[9px] font-bold text-white/70 flex items-center gap-1"><div className="w-1 h-1 bg-emerald-400 rounded-full" /> Online Now</p>
                                </div>
                             </div>
                             <button onClick={() => setIsOpen(false)} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"><X className="w-4 h-4" /></button>
                          </div>
                          <div className="h-[280px] bg-gray-50 p-4 space-y-4 overflow-y-auto">
                             <div className="bg-white p-3 rounded-2xl rounded-tl-sm text-[11px] border border-border shadow-sm max-w-[85%]">{message}</div>
                             <div className="flex justify-end"><div className="bg-emerald-500 text-white p-3 rounded-2xl rounded-tr-sm text-[11px] shadow-sm max-w-[85%]">Bghit nchof chi Caftan royal svp</div></div>
                          </div>
                          <div className="p-4 bg-white border-t border-border flex items-center gap-3">
                             <div className="flex-1 bg-gray-50 border border-border rounded-xl px-3 py-2 text-[11px] text-gray-400">Type a message...</div>
                             <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: color }}><Send className="w-4 h-4" /></div>
                          </div>
                       </motion.div>
                    )}
                 </AnimatePresence>

                 <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white relative z-50 overflow-hidden"
                    style={{ backgroundColor: color }}
                 >
                    <AnimatePresence mode="wait">
                       {isOpen ? (
                          <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-8 h-8" /></motion.div>
                       ) : (
                          <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><MessageCircle className="w-8 h-8 fill-current" /></motion.div>
                       )}
                    </AnimatePresence>
                 </motion.button>
              </motion.div>
           </div>
           
           <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-border rounded-2xl p-4 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center"><Zap className="w-5 h-5" /></div>
                 <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">AI Powered</p><p className="text-xs font-bold text-foreground">100% Automated</p></div>
              </div>
              <div className="bg-white border border-border rounded-2xl p-4 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><MessageCircle className="w-5 h-5" /></div>
                 <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">WhatsApp</p><p className="text-xs font-bold text-foreground">Direct Access</p></div>
              </div>
              <div className="bg-white border border-border rounded-2xl p-4 flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><Code className="w-5 h-5" /></div>
                 <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Setup</p><p className="text-xs font-bold text-foreground">Copy & Paste</p></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
