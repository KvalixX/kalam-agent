'use client';

import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical,
  User,
  MessageSquare,
  ShoppingBag,
  MapPin,
  ChevronRight
} from 'lucide-react';

const customers = [
  { id: 1, name: 'Youssef Benali', phone: '+212 661-XXXXXX', location: 'Casablanca', spent: '4,200 MAD', orders: 12, status: 'VIP', lastActive: '2m ago' },
  { id: 2, name: 'Sara Kamali', phone: '+212 662-XXXXXX', location: 'Rabat', spent: '1,850 MAD', orders: 3, status: 'Active', lastActive: '1h ago' },
  { id: 3, name: 'Ahmed Mansouri', phone: '+212 663-XXXXXX', location: 'Marrakech', spent: '890 MAD', orders: 1, status: 'New', lastActive: '4h ago' },
  { id: 4, name: 'Leila Ziani', phone: '+212 664-XXXXXX', location: 'Tangier', spent: '12,400 MAD', orders: 28, status: 'VIP', lastActive: '1d ago' },
  { id: 5, name: 'Karim Tahiri', phone: '+212 665-XXXXXX', location: 'Agadir', spent: '0 MAD', orders: 0, status: 'Lead', lastActive: '2d ago' },
  { id: 6, name: 'Salma Idrissi', phone: '+212 666-XXXXXX', location: 'Fes', spent: '2,100 MAD', orders: 5, status: 'Active', lastActive: '3d ago' },
];

export default function CustomersPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Customer CRM</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Manage your customer relationships & life-time value</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-border rounded-lg text-[11px] font-semibold text-gray-600 hover:bg-gray-50 transition-all">
              <Download className="w-3.5 h-3.5" />
              Export CSV
           </button>
           <button className="px-3 py-1.5 bg-primary text-white text-[11px] font-semibold rounded-lg hover:bg-primary-dark transition-all">
              Add Customer
           </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-border rounded-xl p-3 flex items-center justify-between gap-4">
         <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search name, phone, or location..." 
              className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-border rounded-lg text-[11px] focus:outline-none"
            />
         </div>
         <div className="flex items-center gap-2">
            {['VIP', 'Leads', 'At Risk'].map(tag => (
              <button key={tag} className="text-[10px] font-semibold px-2 py-1 rounded bg-gray-50 text-gray-500 border border-border hover:bg-primary/5 hover:text-primary transition-all">
                 {tag}
              </button>
            ))}
            <div className="w-px h-4 bg-border mx-1" />
            <button className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-lg">
               <Filter className="w-4 h-4" />
            </button>
         </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="bg-gray-50/50 border-b border-border">
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">LTV</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Activity</th>
                  <th className="px-4 py-3 w-10"></th>
               </tr>
            </thead>
            <tbody className="divide-y divide-border">
               {customers.map((c) => (
                 <tr key={c.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                    <td className="px-4 py-3">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center text-primary font-semibold text-xs">
                             {c.name[0]}
                          </div>
                          <div>
                             <p className="text-[11px] font-semibold text-foreground">{c.name}</p>
                             <p className="text-[10px] text-gray-400 font-medium">{c.phone}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-4 py-3">
                       <div className="flex items-center gap-1.5 text-[11px] text-gray-600 font-medium">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          {c.location}
                       </div>
                    </td>
                    <td className="px-4 py-3">
                       <span className={`text-[9px] font-semibold px-2 py-0.5 rounded uppercase tracking-tighter ${
                          c.status === 'VIP' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          c.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          c.status === 'Lead' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-gray-50 text-gray-500 border border-border'
                       }`}>
                          {c.status}
                       </span>
                    </td>
                    <td className="px-4 py-3">
                       <div>
                          <p className="text-[11px] font-semibold text-foreground">{c.spent}</p>
                          <p className="text-[9px] text-gray-400 font-medium">{c.orders} Orders</p>
                       </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                       <p className="text-[11px] font-semibold text-gray-600">{c.lastActive}</p>
                       <p className="text-[9px] text-emerald-500 font-medium flex items-center justify-end gap-1">
                          <MessageSquare className="w-2.5 h-2.5" />
                          AI Active
                       </p>
                    </td>
                    <td className="px-4 py-3 text-right">
                       <button className="p-1.5 text-gray-300 hover:text-foreground hover:bg-gray-100 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                          <ChevronRight className="w-4 h-4" />
                       </button>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>

      {/* Summary Footer */}
      <div className="flex items-center justify-between px-2">
         <p className="text-[10px] text-gray-400 font-medium italic">Showing 6 of 1,240 customers</p>
         <div className="flex items-center gap-1">
            {[1, 2, 3, '...', 42].map((p, i) => (
              <button key={i} className={`w-6 h-6 flex items-center justify-center rounded text-[10px] font-semibold transition-all ${p === 1 ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                 {p}
              </button>
            ))}
         </div>
      </div>
    </div>
  );
}
