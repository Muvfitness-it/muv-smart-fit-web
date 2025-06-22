
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Team = () => {
  const teamMembers = [
    {
      name: "Bocchino Vincenzo",
      role: "Fondatore & CEO",
      image: "https://www.muvfitness.it/wp-content/uploads/2022/10/Vincenzo-1.png",
      description: "Visionario del fitness innovativo, ha creato MUV Smart Fit per rivoluzionare l'approccio al benessere a Legnago. Esperto in gestione di centri fitness di eccellenza.",
      specialization: "Strategia e Leadership"
    },
    {
      name: "Christian Gioso",
      role: "Personal Trainer & Specialista Pancafit",
      image: "https://www.muvfitness.it/wp-content/uploads/2022/10/PT_1.png",
      description: "Laureato in Scienze Motorie, tecnico certificato Pancafit. Ha risolto problemi di mal di schiena a centinaia di clienti. Il 95% elimina il dolore entro 6 settimane.",
      specialization: "Postura e Riabilitazione"
    },
    {
      name: "Serena Portici",
      role: "Personal Trainer EMS & Wellness",
      image: "https://www.muvfitness.it/wp-content/uploads/2024/07/sticker.webp",
      description: "Laureata in Scienze Motorie, specialista in tecnologia EMS e massaggi terapeutici. Esperta nel dimagrimento femminile e rimodellamento corporeo.",
      specialization: "Dimagrimento e Tonificazione"
    },
    {
      name: "Susanna Isante",
      role: "Consulente Benessere",
      image: "https://www.muvfitness.it/wp-content/uploads/2022/10/PT_2.png",
      description: "Diplomata in estetica e benessere, con esperienza pluriennale in centri di dimagrimento. Specializzata nell'approccio olistico al benessere femminile.",
      specialization: "Benessere Olistico"
    },
    {
      name: "Mauro Petterle",
      role: "Personal Trainer Senior",
      image: "https://www.muvfitness.it/wp-content/uploads/2024/03/mauro-petterle-5.png",
      description: "20 anni di esperienza nel fitness. Specialista in allenamenti per potenziamento muscolare e dimagrimento. Ha trasformato il fisico di oltre 500 clienti.",
      specialization: "Forza e Massa Muscolare"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              I MIGLIORI PERSONAL TRAINER DI{" "}
              <span className="text-purple-500 block sm:inline">LEGNAGO</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              <strong>Non troverai un team più qualificato e appassionato</strong> in tutta la provincia di Verona. 
              Ogni specialista ha una missione: <span className="text-purple-400">trasformare il tuo corpo e la tua vita</span>.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-pink-600 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="mb-4 sm:mb-6">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role} presso MUV Smart Fit Legnago`}
                      className="w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56 mx-auto object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-pink-600 font-semibold mb-2 text-sm sm:text-base">{member.role}</p>
                  <p className="text-purple-400 font-medium mb-3 sm:mb-4 text-xs sm:text-sm">{member.specialization}</p>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="mt-12 sm:mt-16 text-center bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-blue-500/20 p-6 sm:p-8 rounded-lg border border-purple-600/30">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 px-2">
              Scegli il Tuo Specialista
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 px-2 leading-relaxed">
              <strong>Ogni trainer ha competenze specifiche.</strong> Durante il check-up gratuito ti assegneremo 
              lo specialista perfetto per i tuoi obiettivi. <span className="text-purple-400">Risultati garantiti</span>.
            </p>
            <Link to="/contatti">
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                aria-label="Prenota consulenza con personal trainer Legnago"
              >
                Prenota Consulenza con il Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
