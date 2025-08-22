import { CheckCircle, Target, TrendingUp } from 'lucide-react';

const MethodSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-6 font-heading text-white">
            Metodo MUV in 3 passi
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-2xl text-center border border-brand-primary/30">
            <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <CheckCircle className="w-12 h-12 text-brand-primary mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold mb-4 text-white">Valutazione iniziale</h3>
            <p className="text-gray-300 leading-relaxed">Obiettivi, misure, test posturale e composizione corporea</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-2xl text-center border border-brand-secondary/30">
            <div className="w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <Target className="w-12 h-12 text-brand-secondary mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold mb-4 text-white">Protocollo su misura</h3>
            <p className="text-gray-300 leading-relaxed">Allenamento + tecnologie calibrate sui tuoi obiettivi</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-2xl text-center border border-brand-accent/30">
            <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <TrendingUp className="w-12 h-12 text-brand-accent mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold mb-4 text-white">Monitoraggio e aggiustamenti</h3>
            <p className="text-gray-300 leading-relaxed">Review ogni 2–4 settimane per ottimizzare i risultati</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodSection;