import { Link } from 'react-router-dom';
import LazyImage from '@/components/ui/LazyImage';
import EnergyElements from '@/components/ui/EnergyElements';
import FloatingCTA from '@/components/ui/FloatingCTA';
import AnimatedStats from '@/components/ui/AnimatedStats';

const HeroSection = () => {
  return (
    <>
      <section 
        className="relative flex items-center justify-center min-h-screen pt-[calc(var(--header-height)+8px)] sm:pt-[var(--header-height)] hero section-hero above-fold hero-section overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" 
      >
        {/* Background Image with Enhanced Overlay */}
        <LazyImage 
          src="/images/fitness-professional-bg.jpg"
          alt="Personal Trainer Legnago - Centro Fitness MUV con EMS, Pancafit e Pilates Reformer"
          className="absolute inset-0 opacity-30 hero-section object-cover z-0"
          priority={true}
          width={1920}
          height={1080}
          sizes="100vw"
          srcSet="/images/fitness-professional-bg.jpg 1920w"
        />
        
        {/* Dynamic Gradient Overlays */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-black/80 via-brand-primary/20 to-brand-secondary/30"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-transparent via-brand-accent/10 to-brand-primary/20"></div>
        
        {/* Energy Elements Component */}
        <EnergyElements variant="floating" className="z-0" />
        
        {/* Main Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto animate-fade-in">
          {/* Pre-title Badge */}
          <div className="inline-block mb-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider animate-neon-pulse" style={{ boxShadow: 'var(--shadow-neon)' }}>
              🏆 Centro Fitness Smart #1 a Legnago
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 font-display text-white animate-slide-up" style={{animationDelay: '0.4s'}}>
            <span className="block leading-tight drop-shadow-2xl">
              Il tuo <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">Personal Trainer</span>
            </span>
            <span className="block leading-tight drop-shadow-2xl">
              a Legnago, <span className="text-brand-accent">senza palestre affollate.</span>
            </span>
          </h1>
          
          <div className="mb-10 space-y-6 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg font-body">
              Risultati <span className="text-brand-accent">visibili in 30 giorni</span> con 
              <span className="block mt-2 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent font-black text-2xl md:text-3xl lg:text-4xl animate-gradient-shift bg-[length:200%_auto]">
                ⚡ Fitness Intelligente ⚡
              </span>
            </p>
            <p className="text-lg md:text-xl text-gray-200 font-body max-w-4xl mx-auto">
              EMS • Pancafit • Pilates Reformer • Vacuum • Pressoterapia
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8 animate-scale-in" style={{animationDelay: '0.8s'}}>
            <a 
              href="https://wa.me/393513380770"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-full text-lg md:text-xl font-black transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-2xl border-2 border-white/30 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-green-300 animate-pulse-glow overflow-hidden"
              aria-label="Scrivici su WhatsApp – MUV Fitness Legnago"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-energy-wave"></div>
              <span className="relative z-10">📱 Scrivici su WhatsApp</span>
            </a>
            <Link 
              to="/contatti" 
              className="group relative bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-white px-10 py-5 rounded-full text-lg md:text-xl font-black transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-2xl border-2 border-white/30 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-brand-primary/50 animate-neon-pulse overflow-hidden"
              aria-label="Prenota Consulenza Gratuita presso MUV Fitness Legnago"  
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-accent via-brand-primary to-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-energy-wave"></div>
              <span className="relative z-10">🎯 Consulenza Gratuita</span>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-white/80 text-sm md:text-base font-body animate-fade-in" style={{animationDelay: '1s'}}>
            <div className="flex items-center gap-2">
              <span className="text-brand-primary">⭐</span>
              <span>4.9/5 stelle</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-secondary">👥</span>
              <span>200+ clienti trasformati</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-accent">🏆</span>
              <span>Risultati garantiti</span>
            </div>
          </div>
        </div>
        
        {/* Stats Section at bottom of hero */}
        <div className="absolute bottom-20 left-0 right-0 z-10">
          <div className="container mx-auto px-4">
            <AnimatedStats 
              stats={[
                { value: '30', label: 'Giorni per risultati visibili', suffix: '+' },
                { value: '95', label: 'Clienti soddisfatti', suffix: '%' },
                { value: '200', label: 'Trasformazioni completate', suffix: '+' }
              ]}
              className="opacity-90"
            />
          </div>
        </div>
      </section>
      
      {/* Floating CTA */}
      <FloatingCTA />
    </>
  );
};

export default HeroSection;