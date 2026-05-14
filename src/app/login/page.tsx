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
          <form action={action} className="space-y-5">

            {/* Error Message */}
            {state?.error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2.5"
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
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all disabled:opacity-60"
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
                  disabled={isPending}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all disabled:opacity-60"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                id="login-submit-btn"
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/20 text-xs font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in to Dashboard
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
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
              <button disabled className="w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-border rounded-xl bg-white text-[12px] font-bold text-gray-400 cursor-not-allowed opacity-50">
                <Globe className="w-4 h-4" />
                Google
              </button>
              <button disabled className="w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-border rounded-xl bg-white text-[12px] font-bold text-gray-400 cursor-not-allowed opacity-50">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-400 font-medium mt-2">Coming soon</p>
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
