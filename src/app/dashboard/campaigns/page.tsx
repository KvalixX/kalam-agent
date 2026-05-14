'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  MessageSquare, 
  Zap, 
  Plus, 
  CheckCircle2,
  X,
  Loader2,
  Trash2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { getCampaigns, createCampaign, deleteCampaign } from '@/lib/actions/dashboard';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  const load = async () => {
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      segment: formData.get('segment'),
      content: formData.get('content'),
      sent: 0,
      read_rate: '0%',
      conversion: '0%'
    };

    startTransition(async () => {
      const { error } = await createCampaign(payload);
      if (!error) {
        setIsAddModalOpen(false);
        load();
      }
    });
  };

  const handleDelete = async () => {
    if (!selectedCampaign) return;
    startTransition(async () => {
      const { error } = await deleteCampaign(selectedCampaign.id);
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
    <div className="space-y-6 max-w-5xl pb-12 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">WhatsApp Campaigns</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Automated bulk marketing & engagement</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-primary text-white text-[11px] font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
        >
           <Plus className="w-3.5 h-3.5" />
           New Campaign
        </button>
      </div>

      <AnimatePresence>
        {/* Add Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddModalOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
             <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-border overflow-hidden relative z-10 p-8" >
                <div className="flex items-center justify-between mb-8">
                   <h2 className="text-sm font-black text-foreground uppercase tracking-tight">Create New Campaign</h2>
                   <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400">
                      <X className="w-5 h-5" />
                   </button>
                </div>
                <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-6">
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Campaign Name</label>
                         <input name="name" required className="w-full px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Segment</label>
                         <select name="segment" className="w-full px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10">
                            <option>All Customers</option>
                            <option>VIPs</option>
                         </select>
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Message Content</label>
                         <textarea name="content" required className="w-full px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10 min-h-[120px] resize-none" />
                      </div>
                      <button disabled={isPending} type="submit" className="w-full py-3 bg-primary text-white rounded-xl text-[11px] font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                         {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                         Save as Draft
                      </button>
                   </div>
                   <div className="bg-gray-50 rounded-[2rem] border border-border p-6 flex flex-col justify-end">
                      <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-border max-w-[90%] mb-4">
                         <p className="text-[12px] text-gray-800 leading-relaxed italic">Draft message preview...</p>
                      </div>
                      <p className="text-[9px] text-gray-400 font-bold uppercase">Estimated Reach: 1,240 Users</p>
                   </div>
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
                <h3 className="text-sm font-black text-foreground uppercase tracking-tight mb-2">Delete Campaign?</h3>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed mb-6">Are you sure you want to delete <span className="font-bold text-foreground">{selectedCampaign?.name}</span>?</p>
                <div className="flex gap-3">
                   <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-[10px] font-bold uppercase hover:bg-gray-100 transition-all">Cancel</button>
                   <button onClick={handleDelete} disabled={isPending} className="flex-1 py-2.5 bg-rose-500 text-white rounded-xl text-[10px] font-bold uppercase hover:bg-rose-600 transition-all flex items-center justify-center gap-2">
                      {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                      Delete
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Sent', value: campaigns.reduce((acc, c) => acc + (c.sent || 0), 0).toString(), icon: MessageSquare, color: 'text-primary' },
           { label: 'Active', value: campaigns.filter(c => c.status === 'Running').length.toString(), icon: CheckCircle2, color: 'text-emerald-500' },
           { label: 'Drafts', value: campaigns.filter(c => c.status === 'Draft').length.toString(), icon: Zap, color: 'text-amber-500' },
         ].map((stat, i) => (
           <div key={i} className="bg-white border border-border p-5 rounded-2xl shadow-sm">
              <stat.icon className={`w-5 h-5 mb-4 ${stat.color}`} />
              <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-foreground mt-1" suppressHydrationWarning>{stat.value}</p>
           </div>
         ))}
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
         <table className="w-full text-left">
            <thead>
               <tr className="bg-gray-50/50 border-b border-border">
                  <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Campaign</th>
                  <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Read</th>
                  <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Conv</th>
                  <th className="px-6 py-4 text-right"></th>
               </tr>
            </thead>
            <tbody className="divide-y divide-border">
               {campaigns.length > 0 ? campaigns.map((c) => (
                 <tr key={c.id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="px-6 py-4">
                       <p className="text-xs font-bold text-foreground leading-none mb-1">{c.name}</p>
                       <p className="text-[9px] text-gray-400 font-bold uppercase">{new Date(c.created_at).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`text-[8px] font-black px-2 py-0.5 rounded-lg uppercase tracking-tighter ${
                          c.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                          c.status === 'Running' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'
                       }`}>
                          {c.status}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-black text-foreground">{c.read_rate || '0%'}</td>
                    <td className="px-6 py-4 text-xs font-black text-primary">{c.conversion || '0%'}</td>
                    <td className="px-6 py-4 text-right">
                       <button onClick={() => { setSelectedCampaign(c); setIsDeleteModalOpen(true); }} className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </td>
                 </tr>
               )) : (
                 <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-gray-300">
                       <p className="text-[10px] font-black uppercase tracking-widest">No campaigns created yet</p>
                    </td>
                 </tr>
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
}
