
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

    {/* Cosa risolviamo */}
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-6 font-heading text-white">
            Cosa risolviamo
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link 
            to="/servizi/ems-legnago" 
            className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-2xl hover:from-brand-primary/20 hover:to-brand-secondary/20 transition-all duration-300 transform hover:scale-105 border border-gray-600 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
            aria-label="Scopri il servizio EMS per dimagrimento rapido"
          >
            <h3 className="text-xl font-bold mb-4 text-brand-primary">Dimagrimento quando hai poco tempo (EMS 20 minuti)</h3>
            <p className="text-gray-300">Risultati rapidi con elettrostimolazione guidata</p>
          </Link>
          
          <Link 
            to="/servizi/pancafit-postura-legnago" 
            className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-2xl hover:from-brand-primary/20 hover:to-brand-secondary/20 transition-all duration-300 transform hover:scale-105 border border-gray-600 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
            aria-label="Scopri i servizi per mal di schiena e rigidità"
          >
            <h3 className="text-xl font-bold mb-4 text-brand-primary">Mal di schiena e rigidità</h3>
            <p className="text-gray-300 mb-4">Pancafit + Pilates Reformer per postura corretta</p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm text-brand-secondary">Pancafit</span>
              <span className="text-gray-500">•</span>
              <span className="text-sm text-brand-secondary">Pilates Reformer</span>
            </div>
          </Link>
          
          <Link 
            to="/servizi/cellulite-vacuum-pressoterapia-legnago" 
            className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-2xl hover:from-brand-primary/20 hover:to-brand-secondary/20 transition-all duration-300 transform hover:scale-105 border border-gray-600 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
            aria-label="Scopri i trattamenti per cellulite e ritenzione"
          >
            <h3 className="text-xl font-bold mb-4 text-brand-primary">Cellulite e ritenzione (Vacuum + Pressoterapia)</h3>
            <p className="text-gray-300">Protocolli mirati per microcircolo e drenaggio</p>
          </Link>
          
          <Link 
            to="/servizi/personal-trainer-legnago" 
            className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-2xl hover:from-brand-primary/20 hover:to-brand-secondary/20 transition-all duration-300 transform hover:scale-105 border border-gray-600 min-h-[44px] focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
            aria-label="Scopri il servizio Personal Training"
          >
            <h3 className="text-xl font-bold mb-4 text-brand-primary">Ricomposizione corporea (Personal training 1:1 / Small group)</h3>
            <p className="text-gray-300">Coaching personalizzato per obiettivi specifici</p>
          </Link>
        </div>
      </div>
    </section>
    </>
  );
};

export default FeaturesSection;
