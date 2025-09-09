import { ArrowRight, Target, Baby, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProgramsSection = () => {
  const programs = [
    {
      id: 'trasformazione-30-giorni',
      title: 'Trasformazione 30 Giorni',
      subtitle: 'Risultati visibili in un mese',
      description: 'Programma intensivo per una trasformazione fisica completa',
      highlights: [
        'Piano alimentare personalizzato',
        'Allenamenti mirati EMS',
        'Supporto costante del coach'
      ],
      icon: Target,
      link: '/trasformazione-30-giorni',
      gradient: 'from-brand-primary to-brand-secondary'
    },
    {
      id: 'gravidanza-post-parto',
      title: 'Gravidanza & Post Parto',
      subtitle: 'Benessere per mamme',
      description: 'Accompagnamento specializzato durante e dopo la gravidanza',
      highlights: [
        'Esercizi sicuri in gravidanza',
        'Recovery post-parto guidata',
        'Supporto nutrizionale specifico'
      ],
      icon: Baby,
      link: '/gravidanza-post-parto',
      gradient: 'from-pink-500 to-purple-600'
    },
    {
      id: 'riabilitazione-infortuni',
      title: 'Riabilitazione Infortuni',
      subtitle: 'Recupero funzionale',
      description: 'Ritorna in forma dopo infortuni con protocolli sicuri',
      highlights: [
        'Valutazione funzionale iniziale',
        'Protocolli riabilitativi graduali',
        'Prevenzione ricadute'
      ],
      icon: Heart,
      link: '/riabilitazione-infortuni',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      id: 'senior-fitness',
      title: 'Senior Fitness',
      subtitle: 'Attività per over 55',
      description: 'Mantieni forza e vitalità con programmi adattati',
      highlights: [
        'Miglioramento mobilità',
        'Rafforzamento muscolare dolce',
        'Prevenzione cadute'
      ],
      icon: Users,
      link: '/senior-fitness',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Programmi <span className="text-brand-primary">Specializzati</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Percorsi guidati e personalizzati per obiettivi specifici, con risultati garantiti
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => {
            const IconComponent = program.icon;
            
            return (
              <Link
                key={program.id}
                to={program.link}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-brand-primary/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl min-h-[400px] flex flex-col"
                aria-label={`Scopri il programma ${program.title}`}
              >
                {/* Gradient Background Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col flex-1">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${program.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors duration-300">
                    {program.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-brand-primary font-medium mb-3">
                    {program.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-300 text-base mb-4 flex-1">
                    {program.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {program.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-400">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${program.gradient} mr-2 flex-shrink-0`} />
                        {highlight}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between text-brand-primary font-medium text-sm group-hover:text-white transition-colors duration-300 mt-auto">
                    <span>Scopri il programma</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Hover Effect Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;