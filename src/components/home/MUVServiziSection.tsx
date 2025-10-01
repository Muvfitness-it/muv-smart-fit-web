// Sezione Servizi - MUV Fitness Homepage
import { Link } from 'react-router-dom';
import { Target, Heart, TrendingUp, ArrowRight } from 'lucide-react';

const MUVServiziSection = () => {
  const servizi = [
    {
      icon: Target,
      title: "Dimagrimento Rapido",
      subtitle: "EMS + Personal Training",
      description: "Perdi grasso 4x più velocemente. Solo 45 minuti a sessione per risultati visibili in 2 settimane.",
      color: "#F97316",
      link: "/servizi#dimagrimento"
    },
    {
      icon: Heart,
      title: "Pilates Reformer",
      subtitle: "Postura e benessere",
      description: "Correggi definitivamente postura e dolori con il Pilates Reformer più avanzato di Legnago.",
      color: "#10B981",
      link: "/servizi#postura"
    },
    {
      icon: TrendingUp,
      title: "Vacuum + Pressoterapia",
      subtitle: "Rimodellamento corporeo",
      description: "Elimina cellulite e ritenzione con tecnologia medica avanzata. Risultati visibili in 8 settimane.",
      color: "#1E3A8A",
      link: "/servizi#estetico"
    }
  ];

  return (
    <section id="servizi" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Titolo */}
          <h2 
            className="text-center mb-6"
            style={{ 
              fontFamily: 'Poppins', 
              fontSize: '42px', 
              fontWeight: '700', 
              color: '#1E3A8A' 
            }}
          >
            I nostri Servizi
          </h2>
          
          {/* Testo descrittivo */}
          <p 
            className="text-center mb-16 mx-auto"
            style={{ 
              fontFamily: 'Poppins', 
              fontSize: '18px', 
              fontWeight: '400', 
              color: '#374151',
              maxWidth: '800px',
              lineHeight: '1.8'
            }}
          >
            3 servizi specializzati per 3 obiettivi precisi.<br />
            Ogni percorso è studiato per darti risultati concreti e duraturi.
          </p>
          
          {/* 3 Box Servizi */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {servizi.map((servizio, index) => {
              const Icon = servizio.icon;
              return (
                <Link
                  key={index}
                  to={servizio.link}
                  className="bg-white rounded-lg p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
                  style={{ border: '1px solid #CBD5E1' }}
                >
                  <div className="mb-6 flex justify-center">
                    <div 
                      className="p-4 rounded-full"
                      style={{ backgroundColor: `${servizio.color}20` }}
                    >
                      <Icon size={48} style={{ color: servizio.color }} strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  <h3 
                    className="mb-2"
                    style={{ 
                      fontFamily: 'Poppins', 
                      fontSize: '24px', 
                      fontWeight: '700', 
                      color: '#1E3A8A' 
                    }}
                  >
                    {servizio.title}
                  </h3>
                  
                  <p 
                    className="mb-4"
                    style={{ 
                      fontFamily: 'Poppins', 
                      fontSize: '16px', 
                      fontWeight: '600',
                      color: servizio.color
                    }}
                  >
                    {servizio.subtitle}
                  </p>
                  
                  <p 
                    className="mb-6"
                    style={{ 
                      fontFamily: 'Poppins', 
                      fontSize: '16px', 
                      fontWeight: '400', 
                      color: '#6B7280',
                      lineHeight: '1.6'
                    }}
                  >
                    {servizio.description}
                  </p>
                  
                  <div 
                    className="flex items-center justify-center gap-2 font-semibold transition-colors group-hover:gap-3"
                    style={{ color: servizio.color }}
                  >
                    <span style={{ fontFamily: 'Poppins', fontSize: '16px' }}>
                      Scopri di più
                    </span>
                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
          
          {/* CTA per vedere tutti i servizi */}
          <div className="text-center">
            <Link
              to="/servizi"
              className="inline-flex items-center justify-center px-8 py-4 transition-all duration-300 hover:opacity-80"
              style={{ 
                backgroundColor: '#F97316', 
                color: 'white',
                fontFamily: 'Poppins',
                fontSize: '18px',
                fontWeight: '500',
                borderRadius: '12px'
              }}
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
