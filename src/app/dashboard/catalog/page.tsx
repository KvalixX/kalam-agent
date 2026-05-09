'use client';

import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  ExternalLink, 
  Package, 
  AlertCircle,
  CheckCircle2,
  MoreVertical,
  ArrowUpDown,
  Zap
} from 'lucide-react';

const products = [
  { id: 1, name: 'Premium Winter Jacket', price: '890 MAD', stock: 12, status: 'AI Selling', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=100' },
  { id: 2, name: 'Leather Boots Brown', price: '450 MAD', stock: 5, status: 'AI Selling', image: 'https://images.unsplash.com/photo-1520639889410-d65c36fcc9ca?auto=format&fit=crop&q=80&w=100' },
  { id: 3, name: 'Cotton T-Shirt Blue', price: '120 MAD', stock: 0, status: 'AI Paused', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=100' },
  { id: 4, name: 'Slim Fit Denim', price: '290 MAD', stock: 45, status: 'AI Selling', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=100' },
  { id: 5, name: 'Wool Scarf Grey', price: '150 MAD', stock: 22, status: 'AI Selling', image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=100' },
];

export default function CatalogPage() {
  return (
    <div className="space-y-4 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Product Catalog</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Manage what your AI agent can sell</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="px-3 py-1.5 bg-white border border-border rounded-lg text-[11px] font-semibold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
              <Package className="w-3.5 h-3.5" />
              Sync Now
           </button>
           <button className="px-3 py-1.5 bg-primary text-white text-[11px] font-semibold rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" />
              Add Product
           </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
         {[
           { label: 'Total Items', value: '412', icon: Package },
           { label: 'AI Selling', value: '389', icon: Zap },
           { label: 'Out of Stock', value: '23', icon: AlertCircle },
           { label: 'Sync Status', value: 'Healthy', icon: CheckCircle2 },
         ].map((stat, i) => (
           <div key={i} className="bg-white border border-border p-3 rounded-xl shadow-sm flex items-center justify-between">
              <div>
                 <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">{stat.label}</p>
                 <p className="text-sm font-bold text-foreground">{stat.value}</p>
              </div>
              <stat.icon className={`w-4 h-4 ${stat.label === 'Out of Stock' ? 'text-rose-500' : 'text-primary opacity-20'}`} />
           </div>
         ))}
      </div>

      {/* Filters */}
      <div className="bg-white border border-border rounded-xl p-3 flex items-center justify-between gap-4 shadow-sm">
         <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, SKU, or category..." 
              className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-border rounded-lg text-[11px] focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
            />
         </div>
         <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-[11px] font-semibold text-gray-600 hover:bg-gray-50">
               <Filter className="w-3.5 h-3.5 text-gray-400" />
               Category
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-[11px] font-semibold text-gray-600 hover:bg-gray-50">
               <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
               Price
            </button>
         </div>
      </div>

      {/* Product Table */}
      <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
         <table className="w-full text-left">
            <thead>
               <tr className="bg-gray-50/50 border-b border-border">
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Stock</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI Status</th>
                  <th className="px-4 py-3 w-10"></th>
               </tr>
            </thead>
            <tbody className="divide-y divide-border">
               {products.map((p) => (
                 <tr key={p.id} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                    <td className="px-4 py-3">
                       <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-border" />
                          <div>
                             <p className="text-[11px] font-semibold text-foreground leading-none mb-1">{p.name}</p>
                             <p className="text-[9px] text-gray-400 font-medium">SKU: {p.id}9023</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                       <span className={`text-[11px] font-bold ${p.stock === 0 ? 'text-rose-500' : 'text-gray-600'}`}>
                          {p.stock}
                       </span>
                       <p className="text-[8px] text-gray-400 font-medium uppercase mt-0.5">Units</p>
                    </td>
                    <td className="px-4 py-3">
                       <p className="text-[11px] font-bold text-foreground">{p.price}</p>
                       <p className="text-[8px] text-gray-400 font-medium uppercase mt-0.5">Price</p>
                    </td>
                    <td className="px-4 py-3">
                       <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'AI Selling' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                          <span className={`text-[9px] font-bold uppercase tracking-tighter ${p.status === 'AI Selling' ? 'text-emerald-600' : 'text-gray-400'}`}>
                             {p.status}
                          </span>
                       </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="p-1.5 text-gray-300 hover:text-primary transition-all">
                             <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 text-gray-300 hover:text-foreground">
                             <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                       </div>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>

      <div className="flex items-center justify-between pt-2">
         <p className="text-[10px] text-gray-400 font-medium italic">Syncing with Shopify every 30 minutes</p>
         <div className="flex items-center gap-1">
            <button className="px-2 py-1 bg-gray-50 border border-border rounded text-[10px] font-bold text-gray-500 hover:bg-white transition-all">Prev</button>
            <button className="px-2 py-1 bg-primary text-white rounded text-[10px] font-bold transition-all">1</button>
            <button className="px-2 py-1 bg-gray-50 border border-border rounded text-[10px] font-bold text-gray-500 hover:bg-white transition-all">2</button>
            <button className="px-2 py-1 bg-gray-50 border border-border rounded text-[10px] font-bold text-gray-500 hover:bg-white transition-all">Next</button>
         </div>
      </div>
    </div>
  );
}
