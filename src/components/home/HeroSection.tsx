import { Link } from 'react-router-dom';
import LazyImage from '@/components/ui/LazyImage';

const HeroSection = () => {
  return (
    <section 
      className="relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen above-fold hero-section has-media" 
    >
      <LazyImage 
        src="/images/fitness-professional-bg.jpg"
        alt="Personal Trainer Legnago - Centro Fitness MUV con EMS, Pancafit e Pilates Reformer"
        className="absolute inset-0 opacity-25 hero-section"
        priority={true}
        width={1920}
        height={1080}
        sizes="100vw"
        srcSet="/images/fitness-professional-bg.jpg 1920w"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-brand-primary/10 to-brand-secondary/10"></div>
      
      {/* Overlay per garantire contrasto WCAG AA */}
      <div className="absolute inset-0 bg-gray-900/40"></div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 font-heading text-primary-foreground drop-shadow-lg">
          Il tuo Personal Trainer a Legnago, senza palestre affollate.
        </h1>
        
        <div className="mb-8 space-y-4">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-foreground drop-shadow-md">
            Risultati visibili in 30 giorni con <span className="text-brand-primary font-black">*Fitness Intelligente*</span>: 
            EMS, Pancafit, Pilates Reformer, Vacuum e Pressoterapia.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a 
            href="https://wa.me/393513380770"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-primary-foreground px-8 py-4 rounded-full text-lg md:text-xl font-black transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white/20 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-green-300"
            aria-label="Scrivici su WhatsApp – MUV Fitness Legnago"
          >
            Scrivici su WhatsApp
          </a>
          <Link 
            to="/contatti" 
            className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent hover:opacity-90 text-primary-foreground px-8 py-4 rounded-full text-lg md:text-xl font-black transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white/20 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
            aria-label="Prenota Consulenza Gratuita presso MUV Fitness Legnago"
          >
            Prenota Consulenza Gratuita (valore €80)
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
