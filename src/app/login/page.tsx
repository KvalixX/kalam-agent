'use client';

import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  User, 
  Globe,
  MessageCircle,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-blue-400/10 rounded-full blur-[120px] -z-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">K</div>
          <span className="font-bold text-2xl tracking-tight text-foreground">Kalam</span>
        </Link>
        <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900">
          Welcome back to Kalam
        </h2>
        <p className="mt-2 text-center text-[13px] text-gray-500 font-medium">
          Manage your AI sales assistant in one place
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-border shadow-2xl shadow-primary/5 sm:rounded-[2rem] sm:px-10">
          <form className="space-y-5" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Password
                </label>
                <div className="text-[11px]">
                  <a href="#" className="font-bold text-primary hover:text-primary-dark">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-[12px] text-gray-500 font-medium">
                Remember me for 30 days
              </label>
            </div>

            <div>
              <Link
                href="/dashboard"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/20 text-xs font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all flex items-center gap-2 group"
              >
                Sign in to Dashboard
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-400 font-medium uppercase tracking-widest text-[10px]">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-border rounded-xl bg-white text-[12px] font-bold text-gray-500 hover:bg-gray-50 transition-all flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Google
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-border rounded-xl bg-[#25D366]/5 text-[#25D366] text-[12px] font-bold hover:bg-[#25D366]/10 transition-all border-[#25D366]/20 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 fill-current" />
                WhatsApp
              </button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[13px] text-gray-500 font-medium">
          New to Kalam?{' '}
          <Link href="/signup" className="font-bold text-primary hover:text-primary-dark underline-offset-4 hover:underline">
            Start your free trial
          </Link>
        </p>
      </div>
    </div>
  );
}
