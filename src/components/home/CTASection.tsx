
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="max-w-5xl mx-auto text-center px-4">
        <Star className="w-16 h-16 text-primary mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 font-heading text-foreground">
          🚀 <span className="text-foreground">SEI PRONTO A VEDERE IL</span> <span className="text-primary">CAMBIAMENTO</span> 
          <span className="text-accent block md:inline"> CHE HAI SEMPRE SOGNATO?</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-semibold">
          <strong className="text-primary">🚫 BASTA SCUSE, BASTA RIMANDARE.</strong> 
          Oggi puoi iniziare il percorso che in <span className="text-accent font-bold">30 GIORNI</span> 
          ti farà guardare allo specchio con <span className="text-secondary font-bold">ORGOGLIO</span>.
        </p>
        
        <div className="bg-primary/10 p-8 rounded-2xl border-2 border-primary/20 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            🎁 OFFERTA ESCLUSIVA LIMITATA - PRIMI 10 CLIENTI
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 font-semibold">
            <strong className="text-foreground">🆓 CHECK-UP COMPLETO GRATUITO</strong> + 
            <strong className="text-accent"> PRIMA SEDUTA DI PROVA</strong> + 
            <strong className="text-secondary"> PIANO PERSONALIZZATO</strong>
          </p>
          <p className="text-primary font-bold text-xl">
            ✅ ZERO IMPEGNO • RISULTATI GARANTITI • CONSULENZA 1-to-1
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/blog" className="btn-primary px-8 py-4 rounded-full text-lg md:text-xl font-bold">
            📖 SCOPRI IL NOSTRO BLOG
          </Link>
          
          <Link to="/form-contatti" className="btn-outline px-8 py-4 rounded-full text-lg md:text-xl font-bold">
            🚀 CANDIDATI SUBITO
          </Link>
        </div>
        
        <p className="text-sm md:text-base text-muted-foreground mt-6 font-semibold">
          ⏰ <span className="text-primary font-bold">POSTI LIMITATI</span> - 
          Solo <span className="text-accent font-bold">10 CONSULENZE GRATUITE</span> questo mese
        </p>
      </div>
    </section>
  );
};

export default CTASection;
