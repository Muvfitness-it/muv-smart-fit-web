import { Link } from 'react-router-dom';
import { Target, Heart, TrendingUp, ArrowRight } from 'lucide-react';

const MUVServiziSection = () => {
  const servizi = [
    {
      icon: Target,
      title: "Dimagrimento Rapido",
      subtitle: "EMS + Personal Training",
      description: "Perdi grasso 4x più velocemente. Solo 45 minuti a sessione per risultati visibili in 2 settimane.",
      colorClass: "text-accent",
      bgColorClass: "bg-accent/10",
      link: "/servizi#dimagrimento"
    },
    {
      icon: Heart,
      title: "Pilates Reformer",
      subtitle: "Postura e benessere",
      description: "Correggi definitivamente postura e dolori con il Pilates Reformer più avanzato di Legnago.",
      colorClass: "text-secondary",
      bgColorClass: "bg-secondary/10",
      link: "/servizi#postura"
    },
    {
      icon: TrendingUp,
      title: "Vacuum + Pressoterapia",
      subtitle: "Rimodellamento corporeo",
      description: "Elimina cellulite e ritenzione con tecnologia medica avanzata. Risultati visibili in 8 settimane.",
      colorClass: "text-primary",
      bgColorClass: "bg-primary/10",
      link: "/servizi#estetico"
    }
  ];

  return (
    <section id="servizi" className="section-light section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-heading-lg text-center mb-6">
            I nostri Servizi
          </h2>
          
          <p className="text-body-lg text-center mb-16 mx-auto max-w-3xl">
            3 servizi specializzati per 3 obiettivi precisi.<br />
            Ogni percorso è studiato per darti risultati concreti e duraturi.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {servizi.map((servizio, index) => {
              const Icon = servizio.icon;
              return (
                <Link
                  key={index}
                  to={servizio.link}
                  className="card-service group"
                >
                  <div className="mb-6 flex justify-center">
                    <div className={`p-4 rounded-full ${servizio.bgColorClass}`}>
                      <Icon size={48} className={servizio.colorClass} strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  <h3 className="text-heading-sm mb-2">
                    {servizio.title}
                  </h3>
                  
                  <p className={`text-lg font-semibold mb-4 ${servizio.colorClass}`}>
                    {servizio.subtitle}
                  </p>
                  
                  <p className="text-body-md mb-6">
                    {servizio.description}
                  </p>
                  
                  <div className={`flex items-center justify-center gap-2 font-semibold transition-all group-hover:gap-3 ${servizio.colorClass}`}>
                    <span>Scopri di più</span>
                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
          
          <div className="text-center">
            <Link
              to="/servizi"
              className="btn-accent text-lg px-8 py-4 inline-flex items-center justify-center"
            >
              Vedi tutti i servizi
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MUVServiziSection;
