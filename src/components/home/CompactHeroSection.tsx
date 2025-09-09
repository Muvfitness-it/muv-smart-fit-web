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
        <h1 className="text-[clamp(32px,7vw,42px)] md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
          Perdi <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">peso e tonifica</span>
          <br />in soli 30 giorni
        </h1>
        
        <p className="text-xl md:text-2xl text-white mb-6 font-semibold">
          <span className="text-brand-accent">+127 trasformazioni</span> con il nostro metodo EMS + Pancafit
        </p>
        
        <div className="bg-brand-primary/20 border border-brand-primary/30 rounded-lg p-4 mb-6 inline-block">
          <p className="text-white text-base md:text-lg font-medium">
            ⏰ <strong>Solo 15 posti disponibili</strong> al mese
          </p>
        </div>
        
        {/* Compact Services */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm md:text-base text-white">
          <Link to="/dimagrire-legnago" className="bg-white/15 border border-white/20 px-4 py-2 rounded-full hover:bg-white/25 transition-colors duration-300 no-underline text-white">⚡ DIMAGRIMENTO</Link>
          <Link to="/mal-di-schiena-legnago" className="bg-white/15 border border-white/20 px-4 py-2 rounded-full hover:bg-white/25 transition-colors duration-300 no-underline text-white">🧘 MAL DI SCHIENA</Link>
          <Link to="/servizi/personal-training" className="bg-white/15 border border-white/20 px-4 py-2 rounded-full hover:bg-white/25 transition-colors duration-300 no-underline text-white">💪 PERSONAL TRAINER</Link>
          <Link to="/servizi/pilates" className="bg-white/15 border border-white/20 px-4 py-2 rounded-full hover:bg-white/25 transition-colors duration-300 no-underline text-white">🌟 PILATES CON MACCHINARI</Link>
          <Link to="/servizi/small-group" className="bg-white/15 border border-white/20 px-4 py-2 rounded-full hover:bg-white/25 transition-colors duration-300 no-underline text-white">🧘‍♀️ GINNASTICA DOLCE</Link>
        </div>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/contatti" 
            className="no-underline min-h-[56px] flex items-center justify-center bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent hover:from-brand-primary/90 hover:via-brand-secondary/90 hover:to-brand-accent/90 text-white px-10 py-5 rounded-full text-xl font-black transition-all duration-300 transform hover:scale-105 shadow-2xl"
            aria-label="Prenota consulenza gratuita"
          >
            🎯 OTTIENI I RISULTATI CHE VUOI
          </Link>
          
          <a 
            href="tel:+393291070374" 
            className="no-underline min-h-[56px] flex items-center justify-center border-2 border-white/40 bg-white/15 backdrop-blur text-white hover:bg-white/25 px-8 py-5 rounded-full text-lg font-bold transition-all duration-300"
            aria-label="Chiama ora il numero +39 329 107 0374"
          >
            📞 Chiamaci Ora
          </a>
        </div>
        
        <p className="text-white/80 text-sm mt-4">
          ✓ Consulenza 100% gratuita ✓ Senza impegno ✓ Risposta in 10 minuti
        </p>
      </div>
    </section>
  );
};

export default CompactHeroSection;