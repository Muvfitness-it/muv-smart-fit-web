import { Monitor, Lock, Sparkles } from 'lucide-react';

const NordicValueProps = () => {
  const values = [
    {
      icon: Monitor,
      title: 'TECNOLOGIA',
      description: 'Macchinari connessi e monitoraggio performance in tempo reale.',
    },
    {
      icon: Lock,
      title: 'PRIVACY',
      description: 'Accessi limitati. Niente folla, solo focus sul tuo obiettivo.',
    },
    {
      icon: Sparkles,
      title: 'DESIGN & RELAX',
      description: 'Ambiente curato con Sauna Infrarossi e area Lounge dedicata.',
    },
  ];

  return (
    <section id="metodo" className="py-20 lg:py-28 bg-[hsl(var(--nordic-white))]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[hsl(var(--nordic-text))] mb-4">
            Smetti di allenarti a caso.
          </h2>
          <p className="text-lg text-[hsl(var(--nordic-text))]/60 max-w-2xl mx-auto">
            Un approccio scientifico al fitness, dove ogni dettaglio è progettato per i tuoi risultati.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group p-8 bg-white rounded-2xl border border-gray-100 hover:border-[#C13697]/20 hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C13697]/10 to-[#0055A4]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-7 h-7 text-[#0055A4]" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className="text-sm font-bold tracking-wider text-[#C13697] mb-3">
                {value.title}
              </h3>
              <p className="text-[hsl(var(--nordic-text))]/70 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NordicValueProps;
