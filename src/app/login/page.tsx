'use client';

import { useActionState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  ArrowRight,
  Globe,
  MessageCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { signIn, type AuthState } from '@/lib/actions/auth';

export default function LoginPage() {
  const [state, action, isPending] = useActionState<AuthState, FormData>(
    signIn,
    null
  );

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-[320px] lg:w-80">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">K</div>
              <span className="font-bold text-xl tracking-tight text-foreground uppercase">Kalam</span>
            </Link>
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h2>
            <p className="mt-1 text-xs text-gray-500 font-medium">
              Manage your AI sales assistant in one place
            </p>
          </div>

          <form action={action} className="space-y-4">
            {state?.error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2.5"
              >
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <p className="text-xs font-medium text-rose-700">{state.error}</p>
              </motion.div>
            )}

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
                  disabled={isPending}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all disabled:opacity-60 bg-gray-50/30"
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
                    Forgot?
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
                  disabled={isPending}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all disabled:opacity-60 bg-gray-50/30"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/20 text-[13px] font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all group disabled:opacity-70"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              New to Kalam?{' '}
              <Link href="/signup" className="font-bold text-primary hover:text-primary-dark">
                Start trial
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/auth-side.png"
          alt="Kalam AI Auth"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-4xl font-bold text-white mb-4 leading-tight">
              L'agent IA qui parle <br/> 
              <span className="text-primary-light italic">comme vos clients.</span>
            </h3>
            <p className="text-lg text-gray-200 max-w-md font-medium">
              Rejoignez des centaines de marchands marocains qui automatisent leurs ventes sur WhatsApp avec Kalam.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
