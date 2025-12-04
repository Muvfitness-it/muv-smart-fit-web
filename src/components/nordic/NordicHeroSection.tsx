import { ArrowRight } from 'lucide-react';
import { BUSINESS_DATA } from '@/config/businessData';

const NordicHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[hsl(var(--nordic-white))] overflow-hidden pt-16 lg:pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
          alt="MUV Fitness Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nordic-sand))] text-[hsl(var(--nordic-text))] text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-[#C13697] rounded-full animate-pulse" />
          Nuova Apertura a Legnago
        </div>

        {/* H1 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[hsl(var(--nordic-text))] leading-tight mb-6">
          <span className="bg-gradient-to-r from-[#C13697] to-[#0055A4] bg-clip-text text-transparent">MUV.</span>{' '}
          Il Fitness Intelligente
          <br className="hidden sm:block" /> è arrivato a Legnago.
        </h1>

        {/* H2 */}
        <p className="text-lg sm:text-xl md:text-2xl text-[hsl(var(--nordic-text))]/70 max-w-3xl mx-auto mb-10 leading-relaxed">
          {BUSINESS_DATA.address.street}. Un Hub di design dove la biomeccanica incontra il benessere.
        </p>

        {/* CTA */}
        <a
          href="#servizi"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-[#C13697] to-[#0055A4] hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Scopri la Nuova Sede
          <ArrowRight className="w-5 h-5" />
        </a>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-[hsl(var(--nordic-text))]/60 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[hsl(var(--nordic-text))]">500+</span> Clienti Soddisfatti
          </div>
          <div className="w-px h-4 bg-gray-300 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[hsl(var(--nordic-text))]">4.9★</span> su Google
          </div>
          <div className="w-px h-4 bg-gray-300 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[hsl(var(--nordic-text))]">100%</span> Personalizzato
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-[hsl(var(--nordic-text))]/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-[hsl(var(--nordic-text))]/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default NordicHeroSection;
