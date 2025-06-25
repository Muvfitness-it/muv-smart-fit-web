
import React, { useEffect } from 'react';
import AnalyticsDisplay from '@/components/analytics/AnalyticsDisplay';

const Analytics = () => {
  useEffect(() => {
    document.title = "Analytics - MUV Fitness";
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-[var(--header-height)]">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            📊 Analytics Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Statistiche in tempo reale dell'utilizzo del sito e del MUV Planner
          </p>
        </header>
        
        <AnalyticsDisplay />
        
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-green-400">
            📈 Informazioni sui Dati
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <h3 className="font-semibold mb-2">Visite al Sito:</h3>
              <p>Traccia ogni accesso alle pagine del sito, inclusa la pagina visitata e l'orario.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Utilizzo MUV Planner:</h3>
              <p>Registra le interazioni con il planner: generazione piani alimentari, liste spesa e domande al coach.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
