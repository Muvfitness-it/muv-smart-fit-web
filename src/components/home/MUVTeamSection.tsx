// Sezione Chi Siamo / Team - MUV Fitness
import ImageSEO from '@/components/SEO/ImageSEO';

const MUVTeamSection = () => {
  const team = [
    {
      name: "Francesco",
      role: "Responsabile EMS",
      quote: "Motivare e supportare chi sceglie MUV è il mio obiettivo ogni giorno.",
      image: "/lovable-uploads/470f5162-68c3-4cc1-8e0c-9402f101b13d.png",
      alt: "Francesco - Responsabile EMS MUV Fitness Legnago, esperto in allenamento elettrostimolazione"
    },
    {
      name: "Laura",
      role: "Coach & Nutrizionista",
      quote: "Credo nel benessere a 360°, aiutando ogni cliente a raggiungere risultati concreti e sostenibili.",
      image: "/lovable-uploads/df526450-5eb6-4c2b-a603-0d3470cb0484.png",
      alt: "Laura - Coach e Nutrizionista MUV Fitness Legnago, specialista in alimentazione e benessere"
    }
  ];

  return (
    <section className="py-20" style={{ backgroundColor: '#F9FAFB' }}>
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
            Il nostro team
          </h2>
          
          {/* Testo descrittivo */}
          <p 
            className="text-center mb-16 mx-auto"
            style={{ 
              fontFamily: 'Poppins', 
              fontSize: '18px', 
              fontWeight: '400', 
              color: '#374151',
              maxWidth: '700px',
              lineHeight: '1.8'
            }}
          >
            Siamo trainer e coach appassionati, specializzati in programmi EMS e motivazione personalizzata. Per noi ogni percorso è unico, proprio come te.
          </p>
          
          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div style={{ aspectRatio: '16/12' }} className="overflow-hidden">
                  <ImageSEO
                    src={member.image}
                    alt={member.alt}
                    title={`${member.name} - ${member.role} MUV Fitness Legnago`}
                    width={640}
                    height={480}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 
                    className="mb-1"
                    style={{ 
                      fontFamily: 'Poppins', 
                      fontSize: '24px', 
                      fontWeight: '700', 
                      color: '#1E3A8A' 
                    }}
                  >
                    {member.name}
                  </h3>
                  <p 
                    className="mb-4"
                    style={{ 
                      fontFamily: 'Poppins', 
                      fontSize: '16px', 
                      fontWeight: '500', 
                      color: '#10B981' 
                    }}
                  >
                    {member.role}
                  </p>
                  <p 
                    className="italic"
                    style={{ 
                      fontFamily: 'Poppins', 
                      fontSize: '16px', 
                      fontWeight: '400', 
                      color: '#374151',
                      lineHeight: '1.6'
                    }}
                  >
                    "{member.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MUVTeamSection;
