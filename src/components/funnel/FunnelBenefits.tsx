import React from 'react';
import { Zap, Sparkles, HeartPulse, UserCheck } from 'lucide-react';

const FunnelBenefits: React.FC = () => {
  // Correzione #2: Benefici contestualizzati nel percorso guidato
  const technologies = [
    {
      icon: Zap,
      title: 'EMS Training',
      description: 'Allenamenti brevi e intensi, inseriti in un percorso guidato dal tuo personal trainer',
      note: 'Ideale per chi ha poco tempo',
    },
    {
      icon: Sparkles,
      title: 'Vacuum Therapy',
      description: 'Supporto efficace per la cellulite, se inserito in un programma personalizzato',
      note: 'Risultati visibili con costanza',
    },
    {
      icon: HeartPulse,
      title: 'Fit Pilates',
      description: 'Migliora postura e flessibilità, con esercizi adattati alle tue esigenze',
      note: 'Adatto a tutti i livelli',
    },
    {
      icon: UserCheck,
      title: 'Ginnastica Posturale',
      description: 'Risolvi dolori e tensioni con un approccio guidato e progressivo',
      note: 'Valutazione iniziale inclusa',
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tecnologie esclusive per{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              risultati concreti
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Non usiamo i macchinari a caso. Ogni tecnologia è integrata nel tuo piano personalizzato, 
            seguito dal tuo personal trainer dedicato.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <tech.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{tech.title}</h3>
                  <p className="text-muted-foreground mb-3">{tech.description}</p>
                  <span className="inline-block text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {tech.note}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nota contestuale - Correzione #1 spostata qui */}
        <div className="mt-12 text-center bg-muted/50 rounded-xl p-6">
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">I nostri clienti vedono i primi risultati già dopo 4-8 settimane</span>, 
            seguendo il programma personalizzato. I risultati variano in base al programma e alla costanza.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FunnelBenefits;
