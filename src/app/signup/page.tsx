'use client';

import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Store,
  Phone,
  Globe,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
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
          Join 2,400+ Moroccan merchants using Kalam
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 border border-border shadow-2xl shadow-primary/5 sm:rounded-[2rem] sm:px-10">
          <form className="space-y-4" action="#" method="POST">
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
                      type="text"
                      required
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
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
                      type="tel"
                      required
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
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
                  type="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
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
                  type="password"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-border rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
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
              <Link
                href="/onboarding"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/20 text-xs font-bold text-white bg-primary hover:bg-primary-dark transition-all flex items-center gap-2 group"
              >
                Create My Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
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
