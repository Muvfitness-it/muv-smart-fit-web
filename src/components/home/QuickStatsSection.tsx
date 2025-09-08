import React from 'react';

const QuickStatsSection = () => {
  const stats = [
    { number: "200+", label: "Clienti trasformati" },
    { number: "30", label: "Giorni per risultati" },
    { number: "20", label: "Minuti per sessione" },
    { number: "5★", label: "Recensioni medie" }
  ];

  return (
    <section className="py-12 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="text-3xl md:text-4xl font-black text-brand-accent mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickStatsSection;