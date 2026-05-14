'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Globe, 
  Upload, 
  Plus, 
  CheckCircle2, 
  Search, 
  Zap,
  Play,
  X,
  Loader2,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { getKnowledge, addKnowledge, deleteKnowledge } from '@/lib/actions/dashboard';

export default function KnowledgeBasePage() {
  const [sources, setSources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  const load = async () => {
    const data = await getKnowledge();
    setSources(data);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      type: formData.get('type'),
      content: formData.get('content') || '',
    };

    startTransition(async () => {
      const { error } = await addKnowledge(payload);
      if (!error) {
        setIsAddModalOpen(false);
        load();
      }
    });
  };

  const handleDelete = async () => {
    if (!selectedSource) return;
    startTransition(async () => {
      const { error } = await deleteKnowledge(selectedSource.id);
      if (!error) {
        setIsDeleteModalOpen(false);
        load();
      }
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
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">AI Knowledge Base</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Train your agent on your products and policies</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-primary text-white text-[11px] font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
        >
           <Plus className="w-3.5 h-3.5" />
           Add Source
        </button>
      </div>

      {/* Add Source Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddModalOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
             <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden relative z-10 p-6" >
                <div className="flex items-center justify-between mb-6">
                   <h2 className="text-sm font-black text-foreground uppercase tracking-tight">Add Knowledge Source</h2>
                   <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400">
                      <X className="w-4 h-4" />
                   </button>
                </div>
                <form onSubmit={handleAdd} className="space-y-4">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Source Name</label>
                      <input name="name" required placeholder="e.g. Return Policy" className="w-full px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all" />
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Type</label>
                      <select name="type" className="w-full px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all">
                         <option value="doc">Document / Text</option>
                         <option value="url">Website URL</option>
                      </select>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Content / Link</label>
                      <textarea name="content" required placeholder="Paste text or URL here..." className="w-full px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all min-h-[120px] resize-none" />
                   </div>
                   <button disabled={isPending} type="submit" className="w-full py-3 bg-primary text-white rounded-xl text-[11px] font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                      Add to Knowledge
                   </button>
                </form>
             </motion.div>
          </div>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteModalOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-border overflow-hidden relative z-10 p-6 text-center" >
                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-foreground uppercase tracking-tight mb-2">Remove Source?</h3>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed mb-6">Are you sure you want to remove <span className="font-bold text-foreground">{selectedSource?.name}</span>? The agent will forget this data.</p>
                <div className="flex gap-3">
                   <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-[10px] font-bold uppercase hover:bg-gray-100 transition-all">Cancel</button>
                   <button onClick={handleDelete} disabled={isPending} className="flex-1 py-2.5 bg-rose-500 text-white rounded-xl text-[10px] font-bold uppercase hover:bg-rose-600 transition-all flex items-center justify-center gap-2">
                      {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                      Remove
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
           {/* Sources List */}
           <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between bg-gray-50/50">
                 <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Training Data</h3>
                 <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                    <input type="text" placeholder="Filter..." className="pl-8 pr-3 py-1 bg-white border border-border rounded-lg text-[10px] outline-none" />
                 </div>
              </div>
              <div className="divide-y divide-border">
                 {sources.length > 0 ? sources.map((s) => (
                    <div key={s.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-all group">
                       <div className="flex items-center gap-4">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            s.type === 'doc' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-purple-50 text-purple-600 border border-purple-100'
                          }`}>
                             {s.type === 'doc' ? <FileText className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                          </div>
                          <div>
                             <p className="text-xs font-bold text-foreground">{s.name}</p>
                             <div className="flex items-center gap-2 mt-1">
                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">{s.type}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-200" />
                                <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-tight flex items-center gap-1">
                                   <CheckCircle2 className="w-2.5 h-2.5" />
                                   Indexed
                                </span>
                             </div>
                          </div>
                       </div>
                       <button onClick={() => { setSelectedSource(s); setIsDeleteModalOpen(true); }} className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 )) : (
                    <div className="p-16 text-center text-gray-300">
                       <FileText className="w-10 h-10 mx-auto mb-2 opacity-20" />
                       <p className="text-[10px] font-black uppercase tracking-[0.2em]">No knowledge added</p>
                    </div>
                 )}
              </div>
           </div>
        </div>

        <div className="space-y-4">
           <div className="bg-white border border-border rounded-2xl p-6 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Zap className="w-16 h-16 text-primary fill-current" />
              </div>
              <h3 className="text-sm font-black text-foreground uppercase tracking-tight mb-4">AI Agent Preview</h3>
              <div className="space-y-4">
                 <div className="bg-gray-50 rounded-2xl p-4 border border-border">
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-3">Recent Interaction</p>
                    <div className="space-y-3">
                       <div className="flex gap-2">
                          <div className="w-6 h-6 rounded-lg bg-white border border-border flex items-center justify-center text-[10px] font-bold">U</div>
                          <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-border text-[11px] shadow-sm">
                             Tell me about your returns.
                          </div>
                       </div>
                       <div className="flex gap-2 justify-end">
                          <div className="bg-primary p-3 rounded-2xl rounded-tr-none text-[11px] text-white shadow-lg shadow-primary/20 max-w-[85%]">
                             We offer a 30-day free return policy on all items!
                          </div>
                          <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-white"><Zap className="w-3.5 h-3.5 fill-current" /></div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
