'use client';

import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Settings2, 
  Eye, 
  Code, 
  Palette, 
  Layout, 
  CheckCircle2,
  Copy,
  Zap,
  Globe
} from 'lucide-react';
import { useState } from 'react';

export default function WidgetCustomizerPage() {
  const [color, setColor] = useState('#7C3AED');
  const [position, setPosition] = useState('right');
  const [message, setMessage] = useState('Salam! Kifach n9der n3awnk? ✨');
  const [copied, setCopied] = useState(false);

  const embedCode = `<script src="https://cdn.kalam.ai/widget.js" data-id="kalam_62a1" data-color="${color}"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">WhatsApp Widget</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Customize the chat button for your Shopify/YouCan store</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white text-[11px] font-bold rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
           <CheckCircle2 className="w-3.5 h-3.5" />
           Publish Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <div className="space-y-6">
           <div className="bg-white border border-border rounded-2xl p-5 shadow-sm space-y-6">
              <div>
                 <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-4 h-4 text-primary" />
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">Appearance</h3>
                 </div>
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Brand Color</label>
                 <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={color} 
                      onChange={(e) => setColor(e.target.value)}
                      className="w-8 h-8 rounded border-none cursor-pointer" 
                    />
                    <input 
                      type="text" 
                      value={color} 
                      onChange={(e) => setColor(e.target.value)}
                      className="flex-1 bg-gray-50 border border-border rounded-lg px-3 py-1.5 text-[11px] font-mono outline-none"
                    />
                 </div>
              </div>

              <div>
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Button Position</label>
                 <div className="grid grid-cols-2 gap-2">
                    {['left', 'right'].map(pos => (
                      <button 
                        key={pos}
                        onClick={() => setPosition(pos)}
                        className={`py-2 rounded-xl border text-[11px] font-bold uppercase transition-all ${
                          position === pos ? 'bg-primary/5 border-primary text-primary' : 'bg-white border-border text-gray-400'
                        }`}
                      >
                         {pos}
                      </button>
                    ))}
                 </div>
              </div>

              <div>
                 <div className="flex items-center gap-2 mb-4">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">Conversation</h3>
                 </div>
                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Initial Message</label>
                 <textarea 
                   value={message}
                   onChange={(e) => setMessage(e.target.value)}
                   className="w-full bg-gray-50 border border-border rounded-xl px-3 py-2 text-[11px] font-medium outline-none min-h-[80px] resize-none"
                 />
                 <p className="text-[9px] text-gray-400 mt-2 font-medium">This is the first message the AI sends when the chat opens.</p>
              </div>
           </div>

           <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                 <Code className="w-4 h-4 text-primary" />
                 <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">Installation</h3>
              </div>
              <div className="relative">
                 <pre className="bg-gray-900 text-gray-300 p-3 rounded-xl text-[10px] overflow-x-auto font-mono whitespace-pre-wrap leading-relaxed">
                    {embedCode}
                 </pre>
                 <button 
                   onClick={handleCopy}
                   className="absolute top-2 right-2 p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all"
                 >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                 </button>
              </div>
              <p className="text-[9px] text-gray-400 mt-3 font-medium">
                 Paste this code inside your store's <code className="text-primary font-bold">{"<head>"}</code> tag.
              </p>
           </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-2 space-y-4">
           <div className="bg-gray-100 border border-border rounded-2xl overflow-hidden shadow-inner h-[600px] relative flex flex-col">
              {/* Fake Browser Header */}
              <div className="h-10 bg-white border-b border-border flex items-center px-4 gap-2">
                 <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                 </div>
                 <div className="flex-1 max-w-sm mx-auto h-6 bg-gray-50 border border-border rounded-md flex items-center px-3 gap-2">
                    <Globe className="w-3 h-3 text-gray-300" />
                    <span className="text-[9px] text-gray-400 font-medium">your-store.com</span>
                 </div>
              </div>

              {/* Fake Storefront Content */}
              <div className="flex-1 p-8 bg-white space-y-8 overflow-y-auto relative">
                 <div className="h-8 w-32 bg-gray-50 rounded" />
                 <div className="grid grid-cols-2 gap-6">
                    <div className="aspect-square bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center">
                       <Zap className="w-8 h-8 text-gray-100" />
                    </div>
                    <div className="space-y-4">
                       <div className="h-6 w-48 bg-gray-50 rounded" />
                       <div className="h-4 w-64 bg-gray-50 rounded" />
                       <div className="h-10 w-32 bg-primary/10 rounded-xl" />
                    </div>
                 </div>
                 <div className="grid grid-cols-4 gap-4">
                    {[1,2,3,4].map(i => <div key={i} className="aspect-square bg-gray-50 rounded-xl" />)}
                 </div>

                 {/* The Widget Preview */}
                 <motion.div 
                   animate={{ 
                     x: position === 'right' ? 0 : -500, // Very basic positioning for mock
                     left: position === 'left' ? 24 : 'auto',
                     right: position === 'right' ? 24 : 'auto'
                   }}
                   className="fixed bottom-24 lg:absolute lg:bottom-6 z-20 flex flex-col items-end gap-4"
                 >
                    {/* Chat Bubble */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="bg-white border border-border p-3 rounded-2xl rounded-br-sm shadow-2xl max-w-[200px]"
                    >
                       <p className="text-[10px] font-medium text-gray-800 leading-tight">
                          {message}
                       </p>
                    </motion.div>

                    {/* The Button */}
                    <div 
                      className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    >
                       <MessageCircle className="w-7 h-7 fill-current" />
                    </div>
                 </motion.div>
              </div>

              {/* Preview Footer */}
              <div className="absolute top-12 right-6 bg-white/80 backdrop-blur-md border border-white/50 px-3 py-1 rounded-full shadow-sm text-[10px] font-bold text-gray-400 uppercase tracking-widest z-30">
                 Live Preview
              </div>
           </div>

           <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                 <Eye className="w-5 h-5" />
              </div>
              <div>
                 <h4 className="text-xs font-bold text-emerald-900">High-Conversion Design</h4>
                 <p className="text-[10px] text-emerald-700 font-medium leading-relaxed">
                    This widget is optimized to appear 2 seconds after page load for maximum engagement without being intrusive.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
