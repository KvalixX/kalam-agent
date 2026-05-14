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
import { getSidebarData } from '@/lib/actions/dashboard';

const sidebarGroups = [
  {
    title: 'Main',
    items: [
      { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
      { icon: MessageSquare, label: 'Live Chats', href: '/dashboard/chats', badge: '0' },
      { icon: History, label: 'Activity', href: '/dashboard/activity' },
    ]
  },
  {
    title: 'Marketing',
    items: [
      { icon: Zap, label: 'Campaigns', href: '/dashboard/campaigns' },
      { icon: MessageCircle, label: 'Chat Widget', href: '/dashboard/widget' },
      { icon: Gift, label: 'Referrals', href: '/dashboard/referrals' },
    ]
  },
  {
    title: 'Management',
    items: [
      { icon: Users, label: 'Customers', href: '/dashboard/customers' },
      { icon: Package, label: 'Catalog', href: '/dashboard/catalog' },
      { icon: BookOpen, label: 'Knowledge', href: '/dashboard/knowledge' },
      { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
    ]
  },
  {
    title: 'System',
    items: [
      { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
      { icon: Download, label: 'Exports', href: '/dashboard/exports' },
      { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
      { icon: LifeBuoy, label: 'Support', href: '/dashboard/support' },
    ]
  }
];

function CollapsibleSection({ 
  title, 
  items, 
  pathname, 
  isDefaultOpen = true 
}: { 
  title: string; 
  items: any[]; 
  pathname: string;
  isDefaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const hasActiveItem = items.some(item => pathname === item.href);
  
  useEffect(() => {
    if (hasActiveItem) setIsOpen(true);
  }, [hasActiveItem]);

  return (
    <div className="mb-2">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-2.5 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors group"
      >
        <span>{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-0.5 mt-0.5"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-2.5 py-1 rounded-md text-[11px] font-medium transition-all group",
                  pathname === item.href
                    ? "bg-primary/5 text-primary"
                    : "text-gray-500 hover:bg-gray-50 hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  <item.icon className={cn("w-3 h-3", pathname === item.href ? "text-primary" : "text-gray-400 group-hover:text-gray-500")} />
                  {item.label}
                </div>
                {item.badge && item.badge !== '0' && (
                  <span className="bg-rose-500 text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSigningOut, startSignOut] = useTransition();
  const [sidebarData, setSidebarData] = useState<any>(null);

  useEffect(() => {
    async function loadSidebar() {
      const data = await getSidebarData();
      setSidebarData(data);
    }
    loadSidebar();
    
    // Refresh sidebar data every 60 seconds
    const interval = setInterval(loadSidebar, 60000);
    return () => clearInterval(interval);
  }, []);

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

  const processedGroups = sidebarGroups.map(group => ({
    ...group,
    items: group.items.map(item => {
      if (item.label === 'Live Chats') {
        return { ...item, badge: sidebarData?.activeConversations?.toString() || '0' };
      }
      return item;
    })
  }));

  const flatItems = processedGroups.flatMap(g => g.items);

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden relative dashboard-root">
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
                    {flatItems.map(item => (
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
        "fixed inset-y-0 left-0 w-64 bg-white border-r border-border flex flex-col z-50 transition-transform lg:relative lg:translate-x-0 lg:w-44",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-3 border-b border-border mb-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center text-white font-semibold text-[10px]">K</div>
            <span className="font-bold text-sm tracking-tight text-foreground uppercase">Kalam</span>
          </Link>
        </div>

        <nav className="flex-1 px-2 overflow-y-auto scrollbar-hide">
          {processedGroups.map((group) => (
            <CollapsibleSection 
              key={group.title} 
              title={group.title} 
              items={group.items} 
              pathname={pathname} 
            />
          ))}
        </nav>

        <div className="p-2 border-t border-border">
          <div className="bg-gray-50 border border-border rounded-lg p-2 mb-2">
             <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                <Zap className="w-2.5 h-2.5" />
                <span className="text-[8px] font-bold uppercase tracking-widest">Usage</span>
             </div>
             <p className="text-[9px] text-gray-600 font-bold mb-1">
                {sidebarData?.usage?.used?.toLocaleString() || '0'}/{sidebarData?.usage?.limit?.toLocaleString() || '500'}
             </p>
             <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${sidebarData?.usage?.percentage || 0}%` }}
                   className="h-full bg-primary rounded-full" 
                />
             </div>
          </div>
          
          <button
            id="logout-btn"
            disabled={isSigningOut}
            onClick={() => startSignOut(() => signOut())}
            className="flex items-center gap-2 px-2.5 py-1.5 w-full text-[11px] font-medium text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all disabled:opacity-50"
          >
            <LogOut className="w-3 h-3" />
            {isSigningOut ? 'Signing out...' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-10 bg-white border-b border-border flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-1 hover:bg-gray-50 rounded lg:hidden"
            >
               <Menu className="w-4 h-4 text-gray-500" />
            </button>
            <div 
              onClick={() => setIsSearchOpen(true)}
              className="relative w-32 sm:w-48 cursor-pointer group"
            >
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-gray-400 group-hover:text-primary transition-colors" />
              <div className="w-full pl-7 pr-2 py-1 bg-gray-50 border border-border rounded text-[10px] text-gray-400 flex items-center justify-between group-hover:border-primary/20 transition-all">
                 <span>Search...</span>
                 <div className="hidden sm:flex items-center gap-0.5">
                    <Command className="w-2 h-2" />
                    <span className="text-[8px] font-bold">K</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative w-7 h-7 flex items-center justify-center text-gray-400 hover:bg-gray-50 rounded transition-all">
               <Bell className="w-3.5 h-3.5" />
               {sidebarData?.activeConversations > 0 && (
                 <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 border-2 border-white rounded-full" />
               )}
            </button>
            <div className="h-4 w-px bg-border mx-1" />
            <div className="flex items-center gap-2">
               <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-bold text-foreground leading-none">
                    {sidebarData?.businessName || 'Mon Compte'}
                  </p>
                  <p className="text-[7px] text-gray-400 font-bold uppercase mt-0.5">Admin</p>
               </div>
               <div className="w-6 h-6 rounded bg-primary-light flex items-center justify-center text-primary font-bold text-[9px]">
                  {sidebarData?.businessName?.[0] || 'K'}
               </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-3 bg-[#F8FAFC]">
          {children}
        </main>
      </div>
    </div>
  );
}
