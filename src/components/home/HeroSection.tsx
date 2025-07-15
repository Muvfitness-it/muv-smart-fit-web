import { Link } from 'react-router-dom';
import LazyImage from '@/components/ui/LazyImage';

const HeroSection = () => {
  return (
    <section 
      className="relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen" 
    >
      <LazyImage 
        src="/images/fitness-professional-bg.jpg"
        alt="MUV Fitness Centro"
        className="absolute inset-0 opacity-25"
        priority={true}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-brand-primary/10 to-brand-secondary/10"></div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 font-heading">
          <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent drop-shadow-2xl">
            CENTRO FITNESS MUV
          </span>
        </h1>
        
        <div className="mb-8 space-y-4">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
            🏆 <span className="text-brand-primary font-black">IL PRIMO</span> Centro Fitness 
            <span className="text-brand-secondary font-black"> SMART</span> di Legnago
          </p>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 font-semibold">
            <strong className="text-brand-primary">✅ RISULTATI GARANTITI IN 30 GIORNI</strong> • 
            <strong className="text-brand-secondary"> 500+ TRASFORMAZIONI DOCUMENTATE</strong> • 
            <strong className="text-brand-accent"> 95% TASSO DI SUCCESSO</strong>
          </p>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-brand-primary/50 mb-8 animate-pulse-glow">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-primary mb-3">
            🎯 METODOLOGIA SCIENTIFICA ESCLUSIVA
          </h2>
          <p className="text-lg md:text-xl text-white font-semibold">
            <span className="text-brand-secondary">💡 TECNOLOGIA EMS</span> + 
            <span className="text-brand-accent"> 🧬 PANCAFIT</span> + 
            <span className="text-brand-primary"> 💪 PERSONAL TRAINING 1-to-1</span>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contatti" className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent hover:opacity-90 text-white px-8 py-4 rounded-full text-lg md:text-xl font-black transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white/20">
            🚀 PRENOTA PROVA GRATUITA - TRASFORMATI IN 30 GIORNI
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
