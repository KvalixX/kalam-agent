import { Bot } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-6 h-6 rounded-md bg-primary-light border border-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Bot className="w-3.5 h-3.5 text-primary group-hover:text-white transition-colors" />
              </div>
              <span className="font-bold text-base tracking-tight text-foreground">Kalam</span>
            </Link>
            <p className="text-xs text-gray-600 leading-relaxed max-w-xs">
              The AI-powered WhatsApp agent for modern Moroccan e-commerce. Fluent in Darija, built for conversion.
            </p>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-4 text-xs">Product</h4>
            <ul className="space-y-3 text-xs text-gray-500">
              <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#integrations" className="hover:text-primary transition-colors">Integrations</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/changelog" className="hover:text-primary transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-4 text-xs">Company</h4>
            <ul className="space-y-3 text-xs text-gray-500">
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-4 text-xs">Legal</h4>
            <ul className="space-y-3 text-xs text-gray-500">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/dpa" className="hover:text-primary transition-colors">Data Processing</Link></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-border text-[10px] text-gray-400 font-medium">
          <p>© {new Date().getFullYear()} Kalam SARL. All rights reserved. Casablanca, Morocco.</p>
          <div className="flex items-center gap-5 mt-3 md:mt-0">
            <Link href="https://twitter.com/kalam_ai" className="hover:text-primary transition-colors">Twitter</Link>
            <Link href="https://linkedin.com/company/kalam-ai" className="hover:text-primary transition-colors">LinkedIn</Link>
            <Link href="https://github.com/KvalixX/kalam-agent" className="hover:text-primary transition-colors">GitHub</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
