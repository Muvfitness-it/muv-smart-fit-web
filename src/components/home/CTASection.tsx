
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-5xl mx-auto text-center px-4">
        <Star className="w-16 h-16 text-magenta-400 mx-auto mb-6 animate-pulse" />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 font-heading">
          🚀 SEI PRONTO A VEDERE IL <span className="text-magenta-400">CAMBIAMENTO</span> 
          <span className="text-viola-400 block md:inline"> CHE HAI SEMPRE SOGNATO?</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-8 font-semibold">
          <strong className="text-magenta-400">🚫 BASTA SCUSE, BASTA RIMANDARE.</strong> 
          Oggi puoi iniziare il percorso che in <span className="text-viola-400 font-black">30 GIORNI</span> 
          ti farà guardare allo specchio con <span className="text-blu-400 font-black">ORGOGLIO</span>.
        </p>
        
        <div className="bg-gradient-to-r from-magenta-900/50 to-viola-900/50 p-8 rounded-2xl border-2 border-magenta-600/50 mb-8">
          <h3 className="text-2xl md:text-3xl font-black text-magenta-400 mb-4">
            🎁 OFFERTA ESCLUSIVA LIMITATA - PRIMI 10 CLIENTI
          </h3>
          <p className="text-lg md:text-xl text-gray-200 mb-4 font-semibold">
            <strong className="text-white">🆓 CHECK-UP COMPLETO GRATUITO</strong> (valore €80) + 
            <strong className="text-viola-400"> PRIMA SEDUTA DI PROVA</strong> + 
            <strong className="text-blu-400"> PIANO PERSONALIZZATO</strong>
          </p>
          <p className="text-magenta-400 font-black text-xl">
            ✅ ZERO IMPEGNO • RISULTATI GARANTITI • CONSULENZA 1-to-1
          </p>
        </div>
        
        <Link to="/contatti" className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white px-8 py-4 rounded-full text-xl md:text-2xl font-black transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center animate-pulse-glow">
          🎯 PRENOTA ORA LA TUA TRASFORMAZIONE GRATUITA
        </Link>
        
        <p className="text-sm md:text-base text-gray-400 mt-6 font-semibold">
          ⏰ <span className="text-magenta-400 font-bold">POSTI LIMITATI</span> - 
          Solo <span className="text-viola-400 font-bold">10 CONSULENZE GRATUITE</span> questo mese
        </p>
      </div>
    </section>
  );
};

export default CTASection;
