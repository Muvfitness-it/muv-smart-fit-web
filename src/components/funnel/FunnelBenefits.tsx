import React from 'react';
import { Zap, Wind, Heart } from 'lucide-react';

const FunnelBenefits: React.FC = () => {
  const technologies = [
    {
      icon: Zap,
      title: 'EMS – Electrofitness',
      description: 'Allenamenti brevi e intensi, ideali per chi ha poco tempo.',
      note: 'Sempre inseriti in un programma personalizzato e supervisionato.',
    },
    {
      icon: Wind,
      title: 'Vacuum Therapy',
      description: 'Supporto efficace per cellulite, ritenzione e rimodellamento,',
      note: 'quando utilizzata all\'interno di un percorso strutturato.',
    },
    {
      icon: Heart,
      title: 'Fit Pilates & Ginnastica Posturale',
      description: 'Migliora postura, mobilità e qualità di vita,',
      note: 'riducendo dolori e rigidità nel tempo.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tecnologie avanzate.{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Inserite in un percorso guidato.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <tech.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{tech.title}</h3>
              <p className="text-muted-foreground mb-2">{tech.description}</p>
              <p className="text-sm text-muted-foreground italic">{tech.note}</p>
            </div>
          ))}
        </div>

        {/* Nota finale */}
        <div className="mt-12 text-center">
          <p className="text-lg text-foreground font-medium">
            Qui non vendiamo una tecnologia.
          </p>
          <p className="text-muted-foreground">
            Costruiamo un percorso su misura usando gli strumenti giusti.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FunnelBenefits;
