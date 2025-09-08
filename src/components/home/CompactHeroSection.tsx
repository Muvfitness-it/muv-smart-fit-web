import React from 'react';
import { Link } from 'react-router-dom';

const CompactHeroSection = () => {
  return (
    <section className="section-hero relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/images/professional-bg.jpg')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/80" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-[clamp(28px,7vw,36px)] md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
          Il tuo <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">Personal Trainer</span>
          <br />a Legnago
        </h1>
        
        <p className="text-xl md:text-2xl text-white mb-8 font-semibold">
          Risultati <span className="text-brand-accent">visibili in 30 giorni</span> con EMS + Pancafit
        </p>
        
        {/* Compact Services */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 text-base md:text-lg text-white">
          <span className="bg-white/15 border border-white/20 px-4 py-2 rounded-full">⚡ EMS</span>
          <span className="bg-white/15 border border-white/20 px-4 py-2 rounded-full">🧘 Pancafit</span>
          <span className="bg-white/15 border border-white/20 px-4 py-2 rounded-full">💪 Personal Training</span>
          <span className="bg-white/15 border border-white/20 px-4 py-2 rounded-full">🌟 Pilates Reformer</span>
        </div>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/contatti" 
            className="no-underline min-h-[44px] flex items-center justify-center bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent hover:from-brand-primary/90 hover:via-brand-secondary/90 hover:to-brand-accent/90 text-black px-8 py-4 rounded-full text-lg font-black transition-all duration-300 transform hover:scale-105 shadow-xl"
            aria-label="Prenota consulenza gratuita"
          >
            🚀 Consulenza Gratuita
          </Link>
          
          <a 
            href="tel:+393291070374" 
            className="no-underline min-h-[44px] flex items-center justify-center border-2 border-white/30 bg-white/10 backdrop-blur text-white hover:bg-white/20 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300"
            aria-label="Chiama ora il numero +39 329 107 0374"
          >
            📞 Chiama Ora
          </a>
        </div>
      </div>
    </section>
  );
};

export default CompactHeroSection;