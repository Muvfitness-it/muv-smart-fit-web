// Sezione Valori & Mission - MUV Fitness
import { Target, Users, Zap, TrendingUp } from 'lucide-react';

const MUVValoriSection = () => {
  const valori = [
    {
      icon: Target,
      title: "Personalizzazione totale",
      color: "#1E3A8A"
    },
    {
      icon: Users,
      title: "Community autentica",
      color: "#10B981"
    },
    {
      icon: Zap,
      title: "Tecnologia intelligente",
      color: "#F97316"
    },
    {
      icon: TrendingUp,
      title: "Risultati duraturi",
      color: "#1E3A8A"
    }
  ];

  return (
    <section id="valori" className="py-16 bg-white">
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
            Il nostro Metodo
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
            MUV Fitness è l'unico spazio a Legnago che fonde allenamenti personalizzati, tecnologia EMS all'avanguardia e un'attenzione totale alla persona.<br />
            Crediamo in un fitness sostenibile, nella crescita graduale e nella motivazione che nasce dalla community.<br />
            Qui ogni traguardo è costruito su misura, senza stress e senza pressioni.
          </p>
          
          {/* 4 Box Valori */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valori.map((valore, index) => {
              const Icon = valore.icon;
              return (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-lg"
                  style={{ border: '1px solid #CBD5E1' }}
                >
                  <div className="mb-4 flex justify-center">
                    <Icon size={48} style={{ color: valore.color }} strokeWidth={1.5} />
                  </div>
                  <h3 
                    style={{ 
                      fontFamily: 'Poppins', 
                      fontSize: '20px', 
                      fontWeight: '700', 
                      color: '#1E3A8A' 
                    }}
                  >
                    {valore.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MUVValoriSection;
