
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-secondary/5">
      <div className="max-w-5xl mx-auto text-center px-4">
        <Star className="w-16 h-16 text-primary mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 font-heading text-foreground">
          Senti, <span className="text-primary">parliamoci chiaro.</span> 
          <span className="text-accent block md:inline">Non succederà da solo.</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-semibold">
          Ogni giorno che passa è un giorno in meno per ottenere il corpo che vuoi. 
          Puoi continuare a <span className="text-accent font-bold">rimandare</span> oppure 
          decidere che <span className="text-secondary font-bold">oggi cambi tutto.</span>
        </p>
        
        <div className="bg-primary/10 p-8 rounded-2xl border-2 border-primary/20 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            🎁 Okay, ti faccio una proposta
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 font-semibold">
            <strong className="text-foreground">Vieni a vedere</strong> come lavoriamo. 
            <strong className="text-accent">Prima seduta gratis.</strong> 
            <strong className="text-secondary">Se non ti convince, nessun problema.</strong>
          </p>
          <p className="text-primary font-bold text-xl">
            ✅ Zero impegni • Solo risultati veri • 1-to-1 sempre
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
          ⏰ <span className="text-primary font-bold">Rimangono 8 posti</span> - 
          Poi chiudiamo le <span className="text-accent font-bold">iscrizioni per questo mese</span>
        </p>
      </div>
    </section>
  );
};

export default CTASection;
