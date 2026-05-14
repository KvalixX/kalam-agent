'use client';

import { 
  LayoutDashboard, 
  MessageSquare, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Zap,
  Menu,
  BookOpen,
  LifeBuoy,
  Gift,
  CreditCard,
  Package,
  History,
  Download,
  ArrowRight,
  Command,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from '@/lib/actions/auth';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: MessageSquare, label: 'Live Chats', href: '/dashboard/chats', badge: '12' },
  { icon: History, label: 'Activity', href: '/dashboard/activity' },
  { icon: Zap, label: 'Campaigns', href: '/dashboard/campaigns' },
  { icon: MessageCircle, label: 'Chat Widget', href: '/dashboard/widget' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Users, label: 'Customers', href: '/dashboard/customers' },
  { icon: Package, label: 'Catalog', href: '/dashboard/catalog' },
  { icon: BookOpen, label: 'Knowledge', href: '/dashboard/knowledge' },
  { icon: LifeBuoy, label: 'Support', href: '/dashboard/support' },
  { icon: Gift, label: 'Referrals', href: '/dashboard/referrals' },
  { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
  { icon: Download, label: 'Exports', href: '/dashboard/exports' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSigningOut, startSignOut] = useTransition();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden relative">
      {/* Command Palette */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsSearchOpen(false)}
               className="fixed inset-0 bg-black/40 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: -20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: -20 }}
               className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-border overflow-hidden relative z-10"
             >
                <div className="p-4 border-b border-border flex items-center gap-3">
                   <Search className="w-5 h-5 text-gray-400" />
                   <input 
                     autoFocus
                     placeholder="Search customers, pages, or orders..." 
                     className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder-gray-400"
                   />
                   <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded text-[10px] font-bold text-gray-400">
                      ESC
                   </div>
                </div>
                <div className="p-2 max-h-[60vh] overflow-y-auto">
                   <div className="px-2 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quick Navigation</div>
                   {sidebarItems.map(item => (
                     <Link 
                       key={item.href} 
                       href={item.href}
                       onClick={() => setIsSearchOpen(false)}
                       className="w-full px-3 py-2 rounded-xl hover:bg-gray-50 flex items-center justify-between group transition-all"
                     >
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                              <item.icon className="w-4 h-4" />
                           </div>
                           <span className="text-xs font-semibold text-gray-600 group-hover:text-foreground">{item.label}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 transition-all" />
                     </Link>
                   ))}
                   
                   <div className="px-2 py-2 mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recent Customers</div>
                   {['Youssef Benali', 'Sara Kamali', 'Ahmed Mansouri'].map(name => (
                     <button 
                       key={name}
                       className="w-full px-3 py-2 rounded-xl hover:bg-gray-50 flex items-center justify-between group transition-all"
                     >
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary font-bold text-[10px]">
                              {name[0]}
                           </div>
                           <span className="text-xs font-semibold text-gray-600 group-hover:text-foreground">{name}</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-300 uppercase">View Profile</span>
                     </button>
                   ))}
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 bg-white border-r border-border flex flex-col z-50 transition-transform lg:relative lg:translate-x-0 lg:w-48",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white font-semibold text-sm">K</div>
            <span className="font-semibold text-base tracking-tight text-foreground">Kalam</span>
          </Link>
        </div>

        <nav className="flex-1 px-2 space-y-0.5">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all group",
                pathname === item.href
                  ? "bg-primary/5 text-primary"
                  : "text-gray-500 hover:bg-gray-50 hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-2">
                <item.icon className={cn("w-3.5 h-3.5", pathname === item.href ? "text-primary" : "text-gray-400 group-hover:text-gray-500")} />
                {item.label}
              </div>
              {item.badge && (
                <span className="bg-primary/10 text-primary text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-2 mt-auto border-t border-border">
          <div className="bg-primary/5 rounded-xl p-2.5 mb-2">
             <div className="flex items-center gap-1.5 text-primary mb-1">
                <Zap className="w-3 h-3" />
                <span className="text-[8px] font-semibold uppercase tracking-widest">Pro Plan</span>
             </div>
             <p className="text-[9px] text-gray-600 font-semibold mb-1.5">1,242 / 5,000</p>
             <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-[24%] h-full bg-primary rounded-full" />
             </div>
          </div>
          
          <button
            id="logout-btn"
            disabled={isSigningOut}
            onClick={() => startSignOut(() => signOut())}
            className="flex items-center gap-2 px-2.5 py-1.5 w-full text-xs font-medium text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all disabled:opacity-50"
          >
            <LogOut className="w-3.5 h-3.5" />
            {isSigningOut ? 'Signing out...' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-12 bg-white border-b border-border flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 hover:bg-gray-50 rounded-lg lg:hidden"
            >
               <Menu className="w-5 h-5 text-gray-500" />
            </button>
            <div 
              onClick={() => setIsSearchOpen(true)}
              className="relative w-40 sm:w-64 cursor-pointer group"
            >
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 group-hover:text-primary transition-colors" />
              <div className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-border rounded-lg text-xs text-gray-400 flex items-center justify-between group-hover:border-primary/20 transition-all">
                 <span>Search...</span>
                 <div className="hidden sm:flex items-center gap-1">
                    <Command className="w-2.5 h-2.5" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">K</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-50 rounded-lg transition-all">
               <Bell className="w-4 h-4" />
               <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 border-2 border-white rounded-full" />
            </button>
            <div className="h-5 w-px bg-border mx-1" />
            <div className="flex items-center gap-2">
               <div className="text-right hidden sm:block">
                  <p className="text-xs font-semibold text-foreground leading-none">Mon Compte</p>
                  <p className="text-[8px] text-gray-400 font-medium uppercase mt-1">Kalam AI</p>
               </div>
               <div className="w-7 h-7 rounded bg-primary-light flex items-center justify-center text-primary font-semibold text-[10px]">
                  K
               </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-[#F1F5F9]">
          {children}
        </main>
      </div>
    </div>
  );
}
