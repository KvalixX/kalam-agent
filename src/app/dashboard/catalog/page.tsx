'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  Package, 
  AlertCircle,
  CheckCircle2,
  ArrowUpDown,
  Zap,
  X,
  Loader2,
  Trash2,
  Edit2,
  AlertTriangle,
  Image as ImageIcon
} from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { getCatalog, addProduct, syncCatalog, deleteProduct, updateProduct } from '@/lib/actions/dashboard';

export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  const load = async () => {
    const data = await getCatalog();
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const MOCK_PRODUCTS = [
    { id: 'mock-1', name: 'Tapis Azilal Artisanal', price: 2400, stock: 3, image_url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop' },
    { id: 'mock-2', name: 'Lanterne en Cuivre', price: 450, stock: 12, image_url: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1974&auto=format&fit=crop' },
    { id: 'mock-3', name: 'Caftan Royal Bleu', price: 1800, stock: 5, image_url: 'https://images.unsplash.com/photo-1585011664466-b7bcc905f991?q=80&w=1935&auto=format&fit=crop' },
    { id: 'mock-4', name: 'Service à Thé Complet', price: 850, stock: 8, image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1974&auto=format&fit=crop' }
  ];

  const displayProducts = products.length > 0 ? products : MOCK_PRODUCTS;

  const handleSync = async () => {
    setIsSyncing(true);
    const { success, error } = await syncCatalog();
    if (success) {
      await load();
    } else {
      alert(error);
    }
    setIsSyncing(false);
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      price: parseFloat(formData.get('price') as string),
      stock: parseInt(formData.get('stock') as string),
      image_url: formData.get('image_url') || null
    };

    startTransition(async () => {
      const { error } = await addProduct(payload);
      if (!error) {
        setIsAddModalOpen(false);
        load();
      }
    });
  };

  const handleEditProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct) return;
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      price: parseFloat(formData.get('price') as string),
      stock: parseInt(formData.get('stock') as string),
      image_url: formData.get('image_url') || null
    };

    startTransition(async () => {
      const { error } = await updateProduct(selectedProduct.id, payload);
      if (!error) {
        setIsEditModalOpen(false);
        load();
      }
    });
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    startTransition(async () => {
      const { error } = await deleteProduct(selectedProduct.id);
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

  const outOfStock = products.filter(p => p.stock === 0).length;

  return (
    <div className="space-y-4 pb-12 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Product Catalog</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Manage your AI agent's inventory</p>
        </div>
        <div className="flex items-center gap-2">
           <button onClick={handleSync} disabled={isSyncing} className="px-3 py-1.5 bg-white border border-border rounded-lg text-[11px] font-semibold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
              {isSyncing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Package className="w-3.5 h-3.5" />}
              {isSyncing ? 'Syncing...' : 'Sync Now'}
           </button>
           <button onClick={() => setIsAddModalOpen(true)} className="px-3 py-1.5 bg-primary text-white text-[11px] font-semibold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
              <Plus className="w-3.5 h-3.5" />
              Add Product
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
                   <h2 className="text-sm font-black text-foreground uppercase tracking-tight">{isEditModalOpen ? 'Edit Product' : 'Add New Product'}</h2>
                   <button onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400">
                      <X className="w-4 h-4" />
                   </button>
                </div>
                <form onSubmit={isEditModalOpen ? handleEditProduct : handleAddProduct} className="space-y-4">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product Name</label>
                      <input name="name" defaultValue={isEditModalOpen ? selectedProduct?.name : ''} required className="w-full px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price (MAD)</label>
                         <input name="price" type="number" step="0.01" defaultValue={isEditModalOpen ? selectedProduct?.price : ''} required className="w-full px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all" />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stock</label>
                         <input name="stock" type="number" defaultValue={isEditModalOpen ? selectedProduct?.stock : ''} required className="w-full px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all" />
                      </div>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Image URL</label>
                      <input name="image_url" defaultValue={isEditModalOpen ? selectedProduct?.image_url : ''} className="w-full px-3 py-2.5 bg-gray-50 border border-border rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary/10 transition-all" />
                   </div>
                   <button disabled={isPending} type="submit" className="w-full py-3 bg-primary text-white rounded-xl text-[11px] font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                      {isEditModalOpen ? 'Update Product' : 'Create Product'}
                   </button>
                </form>
             </motion.div>
          </div>
        )}

        {/* Delete Confirmation */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteModalOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-border overflow-hidden relative z-10 p-6 text-center" >
                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                   <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-foreground uppercase tracking-tight mb-2">Delete Product?</h3>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed mb-6">Remove <span className="font-bold text-foreground">{selectedProduct?.name}</span> from catalog? AI will no longer be able to sell this item.</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
         {[
           { label: 'Inventory', value: products.length.toString(), icon: Package },
           { label: 'Out of Stock', value: outOfStock.toString(), icon: AlertCircle },
           { label: 'AI Status', value: 'Active', icon: Zap },
         ].map((stat, i) => (
           <div key={i} className="bg-white border border-border p-4 rounded-2xl shadow-sm flex items-center justify-between">
              <div>
                 <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.1em] mb-1">{stat.label}</p>
                 <p className="text-sm font-black text-foreground">{stat.value}</p>
              </div>
              <stat.icon className={`w-5 h-5 ${stat.label === 'Out of Stock' && outOfStock > 0 ? 'text-rose-500' : 'text-primary opacity-20'}`} />
           </div>
         ))}
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
         <table className="w-full text-left">
            <thead>
               <tr className="bg-gray-50/50 border-b border-border">
                  <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Product</th>
                  <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">Stock</th>
                  <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Price</th>
                  <th className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-border">
               {displayProducts.length > 0 ? displayProducts.map((p) => (
                 <tr key={p.id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl border border-border overflow-hidden bg-gray-50 flex items-center justify-center">
                             {p.image_url ? <img src={p.image_url} alt="" className="w-full h-full object-cover" /> : <Package className="w-5 h-5 text-gray-300" />}
                          </div>
                          <div>
                             <div className="flex items-center gap-2">
                                <p className="text-xs font-bold text-foreground">{p.name}</p>
                                {p.id.toString().startsWith('mock-') && (
                                  <span className="text-[7px] font-black bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded uppercase tracking-widest border border-amber-200">Demo</span>
                                )}
                             </div>
                             <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">ID: {p.id.slice(0,8)}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <span className={`text-xs font-black ${p.stock === 0 ? 'text-rose-500' : 'text-gray-600'}`}>{p.stock}</span>
                       <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter">Units</p>
                    </td>
                    <td className="px-6 py-4">
                       <p className="text-xs font-black text-foreground">{p.price} MAD</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button onClick={() => { setSelectedProduct(p); setIsEditModalOpen(true); }} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                             <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => { setSelectedProduct(p); setIsDeleteModalOpen(true); }} className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                             <Trash2 className="w-3.5 h-3.5" />
                          </button>
                       </div>
                    </td>
                 </tr>
               )) : (
                 <tr>
                    <td colSpan={4} className="px-4 py-24 text-center">
                       <div className="flex flex-col items-center gap-4 text-gray-300">
                          <Package className="w-12 h-12 opacity-20" />
                          <p className="text-[11px] font-black uppercase tracking-widest">Catalog Empty</p>
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
