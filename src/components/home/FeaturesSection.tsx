
import { Zap, Heart, Target } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 font-heading">
            <span className="text-magenta-400">PERCHÉ</span> il <span className="text-viola-400">95%</span> dei Nostri Clienti 
            <span className="text-blu-400 block md:inline"> RAGGIUNGE L'OBIETTIVO?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto font-semibold leading-relaxed">
            <strong className="text-magenta-400">🔬 SCIENZA + TECNOLOGIA + METODO COLLAUDATO</strong> = 
            <span className="text-viola-400"> RISULTATI 3X PIÙ VELOCI</span> rispetto alle palestre tradizionali
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-2xl text-center hover:from-magenta-900/30 hover:to-viola-900/30 transition-all duration-300 transform hover:scale-105 border border-magenta-600/30">
            <Zap className="w-16 h-16 text-magenta-400 mx-auto mb-4" />
            <h3 className="text-2xl font-black mb-4 text-magenta-400">⚡ TECNOLOGIA EMS ESCLUSIVA</h3>
            <p className="text-gray-200 mb-4 font-semibold">
              <strong className="text-white">🎯 20 MINUTI = 3 ORE di palestra tradizionale.</strong> 
              L'EMS attiva <span className="text-magenta-400 font-bold">300+ MUSCOLI</span> simultaneamente, 
              bruciando il <span className="text-viola-400 font-bold">30% DI CALORIE IN PIÙ</span>.
            </p>
            <div className="text-magenta-400 font-bold text-sm">
              ✅ Risultati 3X più veloci ✅ Solo 2 sedute/settimana ✅ Zero spreco di tempo
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-2xl text-center hover:from-viola-900/30 hover:to-blu-900/30 transition-all duration-300 transform hover:scale-105 border border-viola-600/30">
            <Heart className="w-16 h-16 text-viola-400 mx-auto mb-4" />
            <h3 className="text-2xl font-black mb-4 text-viola-400">🧬 PANCAFIT PER MAL DI SCHIENA</h3>
            <p className="text-gray-200 mb-4 font-semibold">
              <strong className="text-white">🎯 95% DI SUCCESSO</strong> nell'eliminare il mal di schiena cronico. 
              <span className="text-viola-400 font-bold">METODO ESCLUSIVO</span> a Legnago per 
              <span className="text-blu-400 font-bold"> RIALLINEAMENTO POSTURALE</span> definitivo.
            </p>
            <div className="text-viola-400 font-bold text-sm">
              ✅ Addio al dolore cronico ✅ Postura corretta ✅ Benessere duraturo
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-2xl text-center hover:from-blu-900/30 hover:to-magenta-900/30 transition-all duration-300 transform hover:scale-105 border border-blu-600/30">
            <Target className="w-16 h-16 text-blu-400 mx-auto mb-4" />
            <h3 className="text-2xl font-black mb-4 text-blu-400">🎯 PERSONAL TRAINING D'ÉLITE</h3>
            <p className="text-gray-200 mb-4 font-semibold">
              <strong className="text-white">🏆 I MIGLIORI SPECIALISTI</strong> di Legnago. 
              Laureati in Scienze Motorie con <span className="text-blu-400 font-bold">TRACK RECORD COMPROVATO</span>: 
              <span className="text-magenta-400 font-bold"> 500+ TRASFORMAZIONI</span> documentate.
            </p>
            <div className="text-blu-400 font-bold text-sm">
              ✅ Specialisti certificati ✅ Metodo scientifico ✅ Risultati misurabili
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
