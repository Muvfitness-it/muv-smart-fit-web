import { Zap, Heart, Target, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  return (
    <>
    {/* Perché MUV funziona */}
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 font-heading text-white">
            Perché MUV funziona
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="glass-card p-6 rounded-2xl text-center hover-glass group">
            <Clock className="w-12 h-12 text-brand-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            <h3 className="text-lg font-bold mb-2 text-white">Sessioni su appuntamento, zero caos</h3>
          </div>
          
          <div className="glass-card p-6 rounded-2xl text-center hover-glass group">
            <Target className="w-12 h-12 text-brand-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            <h3 className="text-lg font-bold mb-2 text-white">Metodo + tecnologie = risultati misurabili</h3>
          </div>
          
          <div className="glass-card p-6 rounded-2xl text-center hover-glass group">
            <Heart className="w-12 h-12 text-brand-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            <h3 className="text-lg font-bold mb-2 text-white">Team laureato e specializzato in postura</h3>
          </div>
          
          <div className="glass-card p-6 rounded-2xl text-center hover-glass group">
            <Zap className="w-12 h-12 text-brand-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            <h3 className="text-lg font-bold mb-2 text-white">Programmi su misura per obiettivi reali</h3>
          </div>
        </div>
      </div>
    </section>

    {/* Cosa risolviamo */}
    <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 via-transparent to-brand-secondary/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 px-4 py-2 rounded-full mb-6">
            <span className="text-brand-primary text-sm font-semibold">I nostri servizi</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 font-heading text-white animate-fade-in">
            <span className="bg-gradient-to-r from-white via-brand-accent to-white bg-clip-text text-transparent">
              Cosa risolviamo
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Soluzioni mirate per ogni obiettivo con le nostre 
            <span className="text-brand-primary"> tecnologie avanzate</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link 
            to="/servizi/ems" 
            className="group relative glass-card p-8 rounded-3xl hover:from-brand-primary/20 hover:to-brand-secondary/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-brand-primary/50 hover:shadow-2xl hover:shadow-brand-primary/25"
            aria-label="Scopri il servizio EMS per dimagrimento"
          >
            <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full" />
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                Efficace
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-brand-primary transition-colors">
              Dimagrimento con EMS in 45 minuti
            </h3>
            <p className="text-gray-300 text-lg mb-4 group-hover:text-white transition-colors">
              Perdita di peso efficace con EMS guidata da professionisti
            </p>
            <div className="flex items-center gap-2 text-brand-accent">
              <span className="text-sm font-semibold">Scopri di più →</span>
            </div>
          </Link>
          
          <Link 
            to="/servizi/pancafit" 
            className="group relative glass-card p-8 rounded-3xl hover:from-brand-primary/20 hover:to-brand-secondary/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-brand-primary/50 hover:shadow-2xl hover:shadow-brand-primary/25"
            aria-label="Scopri i servizi per mal di schiena e postura"
          >
            <div className="absolute top-4 right-4 w-3 h-3 bg-secondary rounded-full" />
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm font-medium mb-3">
                Postura
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-brand-primary transition-colors">
              Sollievo dal mal di schiena
            </h3>
            <p className="text-gray-300 text-lg mb-4 group-hover:text-white transition-colors">
              Postura corretta e duratura con Pancafit + Pilates Reformer
            </p>
            <div className="flex gap-3 flex-wrap mb-4">
              <span className="bg-brand-secondary/20 text-brand-secondary px-3 py-1 rounded-full text-sm font-medium">Pancafit®</span>
              <span className="bg-brand-secondary/20 text-brand-secondary px-3 py-1 rounded-full text-sm font-medium">Pilates Reformer</span>
            </div>
            <div className="flex items-center gap-2 text-brand-accent">
              <span className="text-sm font-semibold">Scopri di più →</span>
            </div>
          </Link>
          
          <Link 
            to="/servizi/vacuum" 
            className="group relative glass-card p-8 rounded-3xl hover:from-brand-primary/20 hover:to-brand-secondary/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-brand-primary/50 hover:shadow-2xl hover:shadow-brand-primary/25"
            aria-label="Scopri i trattamenti per cellulite e ritenzione"
          >
            <div className="absolute top-4 right-4 w-3 h-3 bg-accent rounded-full" />
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium mb-3">
                Estetica
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-brand-primary transition-colors">
              Trattamento cellulite e ritenzione
            </h3>
            <p className="text-gray-300 text-lg mb-4 group-hover:text-white transition-colors">
              Pelle più tonica con protocolli Vacuum + Pressoterapia
            </p>
            <div className="flex items-center gap-2 text-brand-accent">
              <span className="text-sm font-semibold">Scopri di più →</span>
            </div>
          </Link>
          
          <Link 
            to="/servizi/personal-training" 
            className="group relative glass-card p-8 rounded-3xl hover:from-brand-primary/20 hover:to-brand-secondary/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-brand-primary/50 hover:shadow-2xl hover:shadow-brand-primary/25"
            aria-label="Scopri il servizio Personal Training"
          >
            <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full" />
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium mb-3">
                Premium
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-brand-primary transition-colors">
              Trasformazione corporea completa
            </h3>
            <p className="text-gray-300 text-lg mb-4 group-hover:text-white transition-colors">
              Ricomposizione corporea con coaching 1:1 personalizzato
            </p>
            <div className="flex items-center gap-2 text-brand-accent">
              <span className="text-sm font-semibold">Scopri di più →</span>
            </div>
          </Link>
        </div>
        
        {/* Trust indicators */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-white/5 px-6 py-3 rounded-full backdrop-blur-sm">
            <span className="text-brand-accent font-medium">Tecnologie certificate</span>
            <span className="text-gray-400">•</span>
            <span className="text-brand-accent font-medium">Staff qualificato</span>
            <span className="text-gray-400">•</span>
            <span className="text-brand-accent font-medium">Ambiente riservato</span>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default FeaturesSection;
