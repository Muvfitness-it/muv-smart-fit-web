import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NordicServicesGrid = () => {
  const services = [
    {
      title: 'FUNCTIONAL & PERFORMANCE',
      description: 'Allenamento atletico ad alta intensità per risultati veri. EMS Training e circuiti personalizzati.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      link: '/servizi/ems-legnago',
    },
    {
      title: 'PILATES REFORMER',
      description: 'Postura, controllo ed eleganza del movimento. Riabilitazione e prevenzione con macchinari professionali.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
      link: '/servizi/pilates-reformer-legnago',
    },
    {
      title: 'RECOVERY LOUNGE',
      description: 'Recupero metabolico e relax post-workout. Sauna infrarossi, pressoterapia e trattamenti esclusivi.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
      link: '/servizi/sauna-infrarossi-legnago',
    },
  ];

  return (
    <section id="servizi" className="py-20 lg:py-28 bg-[hsl(var(--nordic-sand))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[hsl(var(--nordic-text))] mb-4">
            I Nostri Servizi
          </h2>
          <p className="text-lg text-[hsl(var(--nordic-text))]/60 max-w-2xl mx-auto">
            Tecnologie all'avanguardia e metodologie scientifiche per ogni obiettivo.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.link}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg tracking-wide">
                  {service.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-[hsl(var(--nordic-text))]/70 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-[#C13697] font-semibold text-sm group-hover:gap-4 transition-all duration-300">
                  Scopri di più
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NordicServicesGrid;
