
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-background text-foreground">
      <div className="max-w-5xl mx-auto text-center px-4">
        <Star className="w-16 h-16 text-brand-primary mx-auto mb-6 animate-pulse" />
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 font-heading">
          🚀 SEI PRONTO A VEDERE IL <span className="text-brand-primary">CAMBIAMENTO</span> 
          <span className="text-brand-secondary block md:inline"> CHE HAI SEMPRE SOGNATO?</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 font-semibold">
          <strong className="text-brand-primary">🚫 BASTA SCUSE, BASTA RIMANDARE.</strong> 
          Oggi puoi iniziare il percorso che in <span className="text-brand-secondary font-black">30 GIORNI</span> 
          ti farà guardare allo specchio con <span className="text-brand-accent font-black">ORGOGLIO</span>.
        </p>
        
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-8 rounded-2xl border-2 border-brand-primary/30 mb-8">
          <h3 className="text-2xl md:text-3xl font-black text-brand-primary mb-4">
            🎁 OFFERTA ESCLUSIVA LIMITATA - PRIMI 10 CLIENTI
          </h3>
          <p className="text-lg md:text-xl text-gray-700 mb-4 font-semibold">
            <strong className="text-gray-900">🆓 CHECK-UP COMPLETO GRATUITO</strong> (valore €80) + 
            <strong className="text-brand-secondary"> PRIMA SEDUTA DI PROVA</strong> + 
            <strong className="text-brand-accent"> PIANO PERSONALIZZATO</strong>
          </p>
          <p className="text-brand-primary font-black text-xl">
            ✅ ZERO IMPEGNO • RISULTATI GARANTITI • CONSULENZA 1-to-1
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/blog" className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg text-primary-foreground px-8 py-4 rounded-full text-lg md:text-xl font-black transition-all duration-300 transform hover:scale-105">
            📖 SCOPRI IL NOSTRO BLOG
          </Link>
          
          <Link to="/contatti" className="bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-primary-foreground px-8 py-4 rounded-full text-lg md:text-xl font-black transition-all duration-300 transform hover:scale-105">
            📞 CONTATTACI
          </Link>
        </div>
        
        <p className="text-sm md:text-base text-gray-600 mt-6 font-semibold">
          ⏰ <span className="text-brand-primary font-bold">POSTI LIMITATI</span> - 
          Solo <span className="text-brand-secondary font-bold">10 CONSULENZE GRATUITE</span> questo mese
        </p>
      </div>
    </section>
  );
};

export default CTASection;
