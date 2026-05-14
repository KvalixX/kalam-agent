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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-400/5 rounded-full blur-[100px] -z-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">K</div>
          <span className="font-bold text-2xl tracking-tight text-foreground">Kalam</span>
        </Link>
        <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900">
          Start your 14-day free trial
        </h2>
        <p className="mt-2 text-center text-[13px] text-gray-500 font-medium">
          Join Moroccan merchants using Kalam AI
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 border border-border shadow-2xl shadow-primary/5 sm:rounded-[2rem] sm:px-10">
          <form action={action} className="space-y-4">

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all disabled:opacity-60"
                    placeholder="My Store"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  WhatsApp Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    name="whatsapp_number"
                    type="tel"
                    disabled={isPending}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all disabled:opacity-60"
                    placeholder="+212..."
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
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all disabled:opacity-60"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Create Password
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
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all disabled:opacity-60"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-emerald-900">Secure & Compliant</p>
                <p className="text-[10px] text-emerald-700 font-medium">Your data and customer conversations are encrypted with bank-level security.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="signup-submit-btn"
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/20 text-xs font-bold text-white bg-primary hover:bg-primary-dark transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating your account...
                  </>
                ) : (
                  <>
                    Create My Account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
              By signing up, you agree to our{' '}
              <a href="#" className="font-bold hover:underline">Terms of Service</a> and{' '}
              <a href="#" className="font-bold hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-[13px] text-gray-500 font-medium">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-primary hover:text-primary-dark underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
