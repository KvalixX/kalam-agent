'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
        scrolled && 'bg-white/80 backdrop-blur-md border-border shadow-sm'
      )}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary-light border border-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
            <Bot className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">Kalam</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Features</Link>
          <Link href="#integrations" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Integrations</Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Pricing</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
            Log in
          </Link>
          <Link
            href="/signup"
            className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-full overflow-hidden transition-all hover:bg-primary-dark hover:shadow-md hover:shadow-primary/20"
          >
            <span className="relative z-10">Start for free</span>
            <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <button
          className="md:hidden text-gray-600 hover:text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-border shadow-lg py-4 px-6 flex flex-col gap-4"
          >
            <Link href="#features" className="text-gray-600 font-medium hover:text-primary py-2" onClick={() => setMobileOpen(false)}>Features</Link>
            <Link href="#integrations" className="text-gray-600 font-medium hover:text-primary py-2" onClick={() => setMobileOpen(false)}>Integrations</Link>
            <Link href="#pricing" className="text-gray-600 font-medium hover:text-primary py-2" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <div className="h-px bg-border my-2" />
            <Link href="/login" className="text-gray-600 font-medium hover:text-primary py-2">Log in</Link>
            <Link href="/signup" className="text-primary font-bold py-2">Start for free &rarr;</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
