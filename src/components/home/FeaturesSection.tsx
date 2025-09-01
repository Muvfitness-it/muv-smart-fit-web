
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
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-2xl text-center border border-gray-600">
            <Clock className="w-12 h-12 text-brand-primary mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-lg font-bold mb-2 text-white">Sessioni su appuntamento, zero caos</h3>
          </div>
          
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-2xl text-center border border-gray-600">
            <Target className="w-12 h-12 text-brand-primary mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-lg font-bold mb-2 text-white">Metodo + tecnologie → risultati misurabili</h3>
          </div>
          
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-2xl text-center border border-gray-600">
            <Heart className="w-12 h-12 text-brand-primary mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-lg font-bold mb-2 text-white">Team laureato e specializzato in postura</h3>
          </div>
          
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-2xl text-center border border-gray-600">
            <Zap className="w-12 h-12 text-brand-primary mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-lg font-bold mb-2 text-white">Programmi su misura per obiettivi reali</h3>
          </div>
        </div>
      </div>
    </section>

    {/* Cosa risolviamo - Enhanced */}
    <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 via-transparent to-brand-secondary/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 px-4 py-2 rounded-full mb-6">
            <span className="text-brand-primary text-sm font-semibold">🎯 PROBLEMI RISOLTI</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 font-heading text-white animate-fade-in">
            <span className="bg-gradient-to-r from-white via-brand-accent to-white bg-clip-text text-transparent">
              Cosa risolviamo
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            <strong className="text-brand-accent">Risultati garantiti</strong> per ogni problema specifico con le nostre 
            <span className="text-brand-primary"> tecnologie avanzate</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link 
            to="/servizi/ems-legnago" 
            className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-3xl hover:from-brand-primary/20 hover:to-brand-secondary/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-600/50 hover:border-brand-primary/50 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-brand-primary/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-brand-primary/25"
            aria-label="Scopri il servizio EMS per dimagrimento rapido"
          >
            <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-bold mb-3">
                ⚡ VELOCE
              </span>
            </div>
            <h3 className="text-2xl font-black mb-4 text-white group-hover:text-brand-primary transition-colors">
              💥 Dimagrimento <span className="text-red-400">SHOCK</span> in 20 minuti
            </h3>
            <p className="text-gray-300 text-lg mb-4 group-hover:text-white transition-colors">
              <strong>-3kg in 2 settimane</strong> con EMS guidata da professionisti
            </p>
            <div className="flex items-center gap-2 text-brand-accent">
              <span className="text-sm font-bold">RISULTATI IMMEDIATI →</span>
            </div>
          </Link>
          
          <Link 
            to="/servizi/pancafit-postura-legnago" 
            className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-3xl hover:from-brand-primary/20 hover:to-brand-secondary/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-600/50 hover:border-brand-primary/50 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-brand-primary/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-brand-primary/25"
            aria-label="Scopri i servizi per mal di schiena e rigidità"
          >
            <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-bold mb-3">
                🎯 PRECISO
              </span>
            </div>
            <h3 className="text-2xl font-black mb-4 text-white group-hover:text-brand-primary transition-colors">
              🦴 <span className="text-blue-400">ADDIO</span> mal di schiena
            </h3>
            <p className="text-gray-300 text-lg mb-4 group-hover:text-white transition-colors">
              <strong>Postura corretta permanente</strong> con Pancafit + Pilates Reformer
            </p>
            <div className="flex gap-3 flex-wrap mb-4">
              <span className="bg-brand-secondary/20 text-brand-secondary px-3 py-1 rounded-full text-sm font-bold">Pancafit®</span>
              <span className="bg-brand-secondary/20 text-brand-secondary px-3 py-1 rounded-full text-sm font-bold">Pilates Reformer</span>
            </div>
            <div className="flex items-center gap-2 text-brand-accent">
              <span className="text-sm font-bold">SOLLIEVO IMMEDIATO →</span>
            </div>
          </Link>
          
          <Link 
            to="/servizi/cellulite-vacuum-pressoterapia-legnago" 
            className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-3xl hover:from-brand-primary/20 hover:to-brand-secondary/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-600/50 hover:border-brand-primary/50 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-brand-primary/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-brand-primary/25"
            aria-label="Scopri i trattamenti per cellulite e ritenzione"
          >
            <div className="absolute top-4 right-4 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-bold mb-3">
                ✨ EFFICACE
              </span>
            </div>
            <h3 className="text-2xl font-black mb-4 text-white group-hover:text-brand-primary transition-colors">
              🌟 <span className="text-purple-400">ELIMINA</span> cellulite ostinata
            </h3>
            <p className="text-gray-300 text-lg mb-4 group-hover:text-white transition-colors">
              <strong>Pelle levigata e tonica</strong> con protocolli Vacuum + Pressoterapia
            </p>
            <div className="flex items-center gap-2 text-brand-accent">
              <span className="text-sm font-bold">PELLE PERFETTA →</span>
            </div>
          </Link>
          
          <Link 
            to="/servizi/personal-trainer-legnago" 
            className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-3xl hover:from-brand-primary/20 hover:to-brand-secondary/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-600/50 hover:border-brand-primary/50 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-brand-primary/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-brand-primary/25"
            aria-label="Scopri il servizio Personal Training"
          >
            <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold mb-3">
                🏆 PREMIUM
              </span>
            </div>
            <h3 className="text-2xl font-black mb-4 text-white group-hover:text-brand-primary transition-colors">
              💪 <span className="text-green-400">TRASFORMA</span> il tuo corpo
            </h3>
            <p className="text-gray-300 text-lg mb-4 group-hover:text-white transition-colors">
              <strong>Ricomposizione corporea totale</strong> con coaching 1:1 personalizzato
            </p>
            <div className="flex items-center gap-2 text-brand-accent">
              <span className="text-sm font-bold">CORPO DA SOGNO →</span>
            </div>
          </Link>
        </div>
        
        {/* Trust indicators */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-white/5 px-6 py-3 rounded-full backdrop-blur-sm">
            <span className="text-brand-accent font-bold">✅ Risultati garantiti</span>
            <span className="text-gray-400">•</span>
            <span className="text-brand-accent font-bold">🔬 Tecnologie certificate</span>
            <span className="text-gray-400">•</span>
            <span className="text-brand-accent font-bold">👨‍⚕️ Staff qualificato</span>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default FeaturesSection;
