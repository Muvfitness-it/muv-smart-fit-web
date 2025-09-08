import React from 'react';

const TrustBar: React.FC = () => {
  return (
    <section className="py-8 bg-white/95 backdrop-blur border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 text-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="text-sm font-bold text-gray-900">4.9/5 stelle</p>
              <p className="text-xs text-gray-600">127+ recensioni</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="text-sm font-bold text-gray-900">Centro certificato</p>
              <p className="text-xs text-gray-600">Istruttori qualificati</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💪</span>
            <div>
              <p className="text-sm font-bold text-gray-900">+127 trasformazioni</p>
              <p className="text-xs text-gray-600">Solo quest'anno</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="text-sm font-bold text-gray-900">Risultati in 30 giorni</p>
              <p className="text-xs text-gray-600">Metodo testato</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;