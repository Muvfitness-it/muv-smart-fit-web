
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
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <header className="text-center mb-10 sm:mb-14 lg:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              I MIGLIORI PERSONAL TRAINER DI{" "}
              <span className="text-purple-500 block sm:inline">LEGNAGO</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              <strong>Non troverai un team più qualificato e appassionato</strong> in tutta la provincia di Verona. 
              Ogni specialista ha una missione: <span className="text-purple-400">trasformare il tuo corpo e la tua vita</span>.
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-pink-600 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="mb-6 sm:mb-8 flex justify-center">
                    <div className="w-40 h-48 sm:w-48 sm:h-56 md:w-56 md:h-64 lg:w-48 lg:h-56 xl:w-56 xl:h-64 overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={member.image}
                        alt={`${member.name} - ${member.role} presso MUV Smart Fit Legnago`}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-xl sm:text-2xl lg:text-xl xl:text-2xl font-bold text-white">{member.name}</h3>
                    <p className="text-pink-600 font-semibold text-sm sm:text-base lg:text-sm xl:text-base">{member.role}</p>
                    <p className="text-purple-400 font-medium text-xs sm:text-sm lg:text-xs xl:text-sm">{member.specialization}</p>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-sm xl:text-base px-2">{member.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="mt-12 sm:mt-16 lg:mt-20 text-center bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-blue-500/20 p-6 sm:p-8 lg:p-10 rounded-lg border border-purple-600/30">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold text-white mb-4 sm:mb-6 px-2">
              Scegli il Tuo Specialista
            </h2>
            <p className="text-sm sm:text-base lg:text-sm xl:text-base text-gray-300 mb-6 sm:mb-8 px-4 leading-relaxed max-w-3xl mx-auto">
              <strong>Ogni trainer ha competenze specifiche.</strong> Durante il check-up gratuito ti assegneremo 
              lo specialista perfetto per i tuoi obiettivi. <span className="text-purple-400">Risultati garantiti</span>.
            </p>
            <Link to="/contatti">
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 text-sm sm:text-base lg:text-lg rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto font-semibold"
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
