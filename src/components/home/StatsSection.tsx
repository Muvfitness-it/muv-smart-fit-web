
import React from 'react';

const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            📊 I NUMERI CHE DIMOSTRANO LA NOSTRA <span className="text-yellow-300">ECCELLENZA</span>
          </h2>
          <p className="text-lg md:text-xl font-semibold opacity-95 max-w-3xl mx-auto">
            <strong>🚫 NON PROMETTIAMO MIRACOLI.</strong> Ti mostriamo <span className="text-yellow-300 font-black">RISULTATI CONCRETI</span>, 
            ottenuti da <strong>PERSONE VERE</strong> che hanno scelto di cambiare la loro vita con noi.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
            <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 text-yellow-300">500+</div>
            <div className="text-lg md:text-xl font-bold">📈 Trasformazioni Completate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
            <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 text-yellow-300">95%</div>
            <div className="text-lg md:text-xl font-bold">🎯 Tasso di Successo</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
