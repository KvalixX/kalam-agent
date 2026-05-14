'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Download, 
  User,
  MapPin,
  Plus,
  X,
  Loader2,
  Trash2,
  Edit2,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { getCustomers, addCustomer, deleteCustomer, updateCustomer } from '@/lib/actions/dashboard';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  const load = async () => {
    const data = await getCustomers();
    setCustomers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAddCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      location: formData.get('location'),
      segment: 'new'
    };

    startTransition(async () => {
      const { error } = await addCustomer(payload);
      if (!error) {
        setIsAddModalOpen(false);
        load();
      }
    });
  };

  const handleEditCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCustomer) return;
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      location: formData.get('location')
    };

    startTransition(async () => {
      const { error } = await updateCustomer(selectedCustomer.id, payload);
      if (!error) {
        setIsEditModalOpen(false);
        load();
      }
    });
  };

  const handleDelete = async () => {
    if (!selectedCustomer) return;
    
    startTransition(async () => {
      const { error } = await deleteCustomer(selectedCustomer.id);
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
    <div className="space-y-4 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Customer CRM</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Manage your customer relationships & life-time value</p>
        </div>
        <div className="flex items-center gap-2">
           <button 
             onClick={() => setIsAddModalOpen(true)}
             className="px-4 py-2 bg-primary text-white text-[11px] font-bold rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
           >
              <Plus className="w-3.5 h-3.5" />
              Add Customer
           </button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(isAddModalOpen || isEditModalOpen) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
             <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden relative z-10 p-6" >
                <div className="flex items-center justify-between mb-6">
                   <h2 className="text-sm font-black text-foreground uppercase tracking-tight">{isEditModalOpen ? 'Edit Customer' : 'Add New Customer'}</h2>
                   <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400">
                      <X className="w-4 h-4" />
                   </button>
                </div>
                <form onSubmit={isEditModalOpen ? handleEditCustomer : handleAddCustomer} className="space-y-4">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                      <input name="name" defaultValue={isEditModalOpen ? selectedCustomer?.name : ''} required className="w-full px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all" />
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">WhatsApp Number</label>
                      <input name="phone" defaultValue={isEditModalOpen ? selectedCustomer?.phone : ''} required className="w-full px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all" />
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</label>
                      <input name="location" defaultValue={isEditModalOpen ? selectedCustomer?.location : ''} className="w-full px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all" />
                   </div>
                   <button disabled={isPending} type="submit" className="w-full py-3 bg-primary text-white rounded-xl text-[11px] font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                      {isEditModalOpen ? 'Update Customer' : 'Save Customer'}
                   </button>
                </form>
             </motion.div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteModalOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-border overflow-hidden relative z-10 p-6 text-center" >
                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-foreground uppercase tracking-tight mb-2">Delete Customer?</h3>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed mb-6">Are you sure you want to delete <span className="font-bold text-foreground">{selectedCustomer?.name}</span>? This action cannot be undone.</p>
                <div className="flex gap-3">
                   <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-[10px] font-bold uppercase hover:bg-gray-100 transition-all">Cancel</button>
                   <button onClick={handleDelete} disabled={isPending} className="flex-1 py-2.5 bg-rose-500 text-white rounded-xl text-[10px] font-bold uppercase hover:bg-rose-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-200">
                      {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                      Delete
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Filters & Search */}
      <div className="bg-white border border-border rounded-xl p-3 flex items-center justify-between gap-4 shadow-sm">
         <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input type="text" placeholder="Search customers..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-border rounded-xl text-[11px] focus:outline-none focus:ring-2 focus:ring-primary/5 transition-all" />
         </div>
         <button className="p-2 bg-white border border-border rounded-xl text-gray-400 hover:text-primary transition-all">
            <Download className="w-4 h-4" />
         </button>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
         <table className="w-full text-left">
            <thead>
               <tr className="bg-gray-50/50 border-b border-border">
                  <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Customer</th>
                  <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Location</th>
                  <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">LTV</th>
                  <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-border">
               {customers.length > 0 ? customers.map((c) => (
                 <tr key={c.id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-black text-xs border border-primary/10">
                             {c.name?.[0] || 'C'}
                          </div>
                          <div>
                             <p className="text-xs font-bold text-foreground">{c.name || 'New Client'}</p>
                             <p className="text-[10px] text-gray-400 font-bold tracking-tight">{c.phone}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-tight">
                       <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-gray-300" />
                          {c.location || 'N/A'}
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`text-[8px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest border ${
                          c.segment === 'VIP' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                          'bg-blue-50 text-blue-600 border-blue-100'
                       }`}>
                          {c.segment || 'New'}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                       <p className="text-xs font-black text-foreground">{c.total_spent || 0} MAD</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button onClick={() => { setSelectedCustomer(c); setIsEditModalOpen(true); }} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                             <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => { setSelectedCustomer(c); setIsDeleteModalOpen(true); }} className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                             <Trash2 className="w-3.5 h-3.5" />
                          </button>
                       </div>
                    </td>
                 </tr>
               )) : (
                 <tr>
                    <td colSpan={5} className="px-4 py-24 text-center">
                       <div className="flex flex-col items-center gap-4 text-gray-300">
                          <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center border border-border">
                             <User className="w-8 h-8 opacity-20" />
                          </div>
                          <p className="text-[11px] font-black uppercase tracking-widest">No customers found</p>
                       </div>
                    </td>
                 </tr>
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
}
