export default function SocialProof() {
  return (
    <section className="py-16 bg-white border-y border-border relative overflow-hidden">
      <div className="container mx-auto px-4 mb-10 text-center relative z-20">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Native Integrations</h3>
        <p className="text-xl font-semibold text-foreground italic">Connects with the ecosystem you trust</p>
      </div>

      <div className="flex overflow-hidden relative">
        {/* Fade effects for the sides */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
        
        <div className="flex animate-marquee items-center gap-20 py-4 w-max">
          {[1, 2].map((set) => (
            <div key={set} className="flex items-center gap-20 shrink-0">
              {/* Shopify */}
              <div className="h-8 flex items-center gap-2 shrink-0">
                <img src="https://cdn.simpleicons.org/shopify/96BF48" alt="Shopify" className="h-full w-auto" />
                <span className="font-bold text-xl text-[#96BF48] tracking-tight">Shopify</span>
              </div>
              
              {/* YouCan */}
              <div className="h-8 flex items-center gap-0.5 font-black text-2xl tracking-tighter shrink-0">
                <span className="text-[#0055FF]">You</span>
                <span className="text-[#111]">Can</span>
              </div>
              
              {/* WooCommerce */}
              <div className="h-8 flex items-center shrink-0">
                <img src="https://cdn.simpleicons.org/woocommerce/96588A" alt="WooCommerce" className="h-full w-auto" />
              </div>
              
              {/* AMANA */}
              <div className="h-8 flex flex-col justify-center leading-none shrink-0">
                 <span className="font-black text-xl tracking-tight text-[#0094B3]">AMANA</span>
                 <span className="text-[5px] font-black text-[#0094B3] tracking-[0.4em] ml-0.5 mt-0.5">COLIS & LOGISTIQUE</span>
              </div>
              
              {/* J&T EXPRESS */}
              <div className="h-8 flex items-center gap-1.5 shrink-0">
                <div className="bg-[#E31837] px-2 py-0.5 rounded text-white font-black italic text-lg leading-none">J&T</div>
                <span className="text-[10px] font-black text-[#E31837] tracking-widest uppercase">Express</span>
              </div>
              
              {/* Meta */}
              <div className="h-8 flex items-center shrink-0">
                <img src="https://cdn.simpleicons.org/meta/0668E1" alt="Meta" className="h-6 w-auto" />
              </div>
              
              {/* WhatsApp */}
              <div className="h-8 flex items-center gap-2 shrink-0">
                <img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="WhatsApp" className="h-full w-auto" />
                <span className="font-bold text-xl text-[#25D366] tracking-tight">WhatsApp</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
