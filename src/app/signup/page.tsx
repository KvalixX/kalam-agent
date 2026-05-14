'use client';

import { useActionState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  ArrowRight,
  Store,
  Phone,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { signUp, type AuthState } from '@/lib/actions/auth';

export default function SignupPage() {
  const [state, action, isPending] = useActionState<AuthState, FormData>(
    signUp,
    null
  );

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* Left Side - Image */}
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
              Boostez vos ventes <br/> 
              <span className="text-primary-light italic">sans effort.</span>
            </h3>
            <p className="text-lg text-gray-200 max-w-md font-medium">
              Synchronisez votre catalogue YouCan ou Shopify et laissez Kalam s'occuper du reste.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-[320px] lg:w-80">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">K</div>
              <span className="font-bold text-xl tracking-tight text-foreground uppercase">Kalam</span>
            </Link>
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
            <p className="mt-1 text-xs text-gray-500 font-medium">
              Start your 14-day free trial today.
            </p>
          </div>

          <form action={action} className="space-y-3">
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

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Business Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Store className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    name="business_name"
                    type="text"
                    required
                    disabled={isPending}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all disabled:opacity-60 bg-gray-50/30"
                    placeholder="My Store"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  disabled={isPending}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all disabled:opacity-60 bg-gray-50/30"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  disabled={isPending}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all disabled:opacity-60 bg-gray-50/30"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                id="signup-submit-btn"
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/20 text-[13px] font-bold text-white bg-primary hover:bg-primary-dark transition-all group disabled:opacity-70"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Get started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-primary hover:text-primary-dark">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
