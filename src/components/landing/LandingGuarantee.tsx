
import React from 'react';
import { Shield, CheckCircle, Award, Clock } from 'lucide-react';

const LandingGuarantee: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-900/20 via-green-800/20 to-green-700/20">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <Shield className="w-20 h-20 text-green-400 mx-auto mb-6 animate-pulse" />
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
          <span className="text-green-400">GARANZIA</span> 
          <span className="text-white"> SODDISFATTI</span> o 
          <span className="text-green-400"> RIMBORSATI</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-12 font-semibold">
          Siamo così sicuri dei nostri risultati che ti offriamo una 
          <span className="text-green-400 font-black"> GARANZIA TOTALE</span>
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-green-900/30 p-6 rounded-xl border-2 border-green-500/50">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">30 GIORNI</h3>
            <p className="text-gray-300">
              Se in 30 giorni non vedi risultati concreti, ti rimborsiamo tutto
            </p>
          </div>
          
          <div className="bg-green-900/30 p-6 rounded-xl border-2 border-green-500/50">
            <Award className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">ZERO DOMANDE</h3>
            <p className="text-gray-300">
              Nessuna giustificazione richiesta. Parola data, parola mantenuta
            </p>
          </div>
          
          <div className="bg-green-900/30 p-6 rounded-xl border-2 border-green-500/50">
            <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">IMMEDIATO</h3>
            <p className="text-gray-300">
              Rimborso processato entro 24 ore dalla richiesta
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-800/50 to-green-900/50 p-8 rounded-2xl border-2 border-green-500/50">
          <h3 className="text-2xl md:text-3xl font-black text-green-400 mb-4">
            🎯 LA NOSTRA PROMESSA
          </h3>
          <p className="text-lg md:text-xl text-white font-semibold mb-4">
            In <span className="text-green-400 font-black">30 GIORNI</span> vedrai risultati concreti e misurabili, 
            oppure ti restituiamo <span className="text-green-400 font-black">OGNI CENTESIMO</span>.
          </p>
          <p className="text-gray-300 font-semibold">
            ✅ Questo è il nostro impegno verso di te • ✅ Nessun rischio • ✅ Solo risultati garantiti
          </p>
        </div>
        
        <div className="mt-8 text-sm text-gray-400">
          <p>* Garanzia valida per tutti i programmi di almeno 30 giorni</p>
          <p>** I risultati individuali possono variare, ma la garanzia rimane invariata</p>
        </div>
      </div>
    </section>
  );
};

export default LandingGuarantee;
