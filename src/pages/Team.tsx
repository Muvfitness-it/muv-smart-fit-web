
import { Card, CardContent } from "@/components/ui/card";

const Team = () => {
  const teamMembers = [
    {
      name: "Bocchino Vincenzo",
      role: "Titolare",
      image: "https://www.muvfitness.it/wp-content/uploads/2022/10/Vincenzo-1.png",
      description: "Fondatore di MUV Fitness, esperto in metodologie di allenamento innovative e gestione del centro fitness."
    },
    {
      name: "Christian Gioso",
      role: "Personal Trainer - Tecnico in Pancafit",
      image: "https://www.muvfitness.it/wp-content/uploads/2022/10/PT_1.png",
      description: "Laureato in Scienze delle Attività Motorie e Sportive. Tecnico del riequilibrio posturale in Pancafit.."
    },
    {
      name: "Serena Portici",
      role: "Personal Trainer EMS",
      image: "https://www.muvfitness.it/wp-content/uploads/2024/07/sticker.webp",
      description: "Laureata in scienze motorie e specializzata nei massaggi sportivi e linfodrenanti."
    },
    {
      name: "Susanna Isante",
      role: "Consulente",
      image: "https://www.muvfitness.it/wp-content/uploads/2022/10/PT_2.png",
      description: "Diplomata in estetica e benessere della persona, con esperienza pluriennale in centri benessere e dimagrimento.."
    },
    {
      name: "Mauro Petterle",
      role: "Personal Trainer",
      image: "https://www.muvfitness.it/wp-content/uploads/2024/03/mauro-petterle-5.png",
      description: "Da quasi venti anni opero in questo settore e nell'altro degli anni mi sono specializzato in allenamenti per il potenziamento muscolare e dimagrimento."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              CONOSCI IL NOSTRO{" "}
              <span className="text-purple-500">TEAM</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professionisti qualificati e appassionati, pronti a guidarti nel tuo percorso di benessere.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-pink-600 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-48 h-48 mx-auto object-cover border-0 border-gradient-to-r from-pink-600 via-purple-500 to-blue-500"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-pink-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-300 leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
