
import { Card, CardContent } from "@/components/ui/card";

const Team = () => {
  const teamMembers = [
    {
      name: "Marco Verdi",
      role: "Titolare",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Fondatore di MUV Fitness, esperto in metodologie di allenamento innovative e gestione del centro fitness."
    },
    {
      name: "Laura Rossi",
      role: "Personal Trainer - Tecnico in Pancafit",
      image: "https://images.unsplash.com/photo-1494790108755-2616b2e0dca6?w=300&h=300&fit=crop&crop=face",
      description: "Specializzata in correzione posturale e trattamento del mal di schiena attraverso la metodologia Pancafit."
    },
    {
      name: "Andrea Bianchi",
      role: "Personal Trainer EMS",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Esperto in elettrostimolazione muscolare e programmi di allenamento ad alta intensità."
    },
    {
      name: "Giulia Neri",
      role: "Nutrizionista",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
      description: "Specialista in nutrizione sportiva e piani alimentari personalizzati per il raggiungimento degli obiettivi."
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
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gradient-to-r from-pink-600 via-purple-500 to-blue-500"
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
