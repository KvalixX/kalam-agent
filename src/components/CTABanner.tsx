import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CTABanner() {
  return (
    <section className="py-20 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative z-10">
        <div className="relative rounded-[2rem] bg-primary border border-primary-dark p-8 md:p-12 text-center overflow-hidden shadow-2xl">

          {/* Intense Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-accent/40 blur-[60px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              Ready to reclaim your time?
            </h2>
            <p className="text-sm text-primary-light mb-8 font-medium">
              Join the fastest-growing Moroccan e-commerce brands automating their customer service with Kalam.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-primary text-sm font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                Start building for free
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="#demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-dark/30 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-primary-dark/50 transition-colors shadow-sm"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
