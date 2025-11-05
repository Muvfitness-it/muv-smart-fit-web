import OptimizedImage from '@/components/ui/OptimizedImage';

const MUVTeamSection = () => {
  const team = [
    {
      name: "Francesco",
      role: "Responsabile EMS",
      quote: "Motivare e supportare chi sceglie MUV è il mio obiettivo ogni giorno.",
      image: "/lovable-uploads/francesco-muv.png",
      alt: "Francesco - Personal Trainer EMS Legnago, specialista in elettrostimolazione e dimagrimento"
    },
    {
      name: "Laura",
      role: "Coach & Nutrizionista",
      quote: "Credo nel benessere a 360°, aiutando ogni cliente a raggiungere risultati concreti e sostenibili.",
      image: "/lovable-uploads/df526450-5eb6-4c2b-a603-0d3470cb0484.png",
      alt: "Laura - Nutrizionista e Coach Wellness MUV Fitness Legnago, specialista in alimentazione per dimagrimento"
    }
  ];

  return (
    <section className="section-light section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-heading-lg text-center mb-6">
            Il nostro team
          </h2>
          
          <p className="text-body-lg text-center mb-16 mx-auto max-w-3xl">
            Siamo trainer e coach appassionati, specializzati in programmi EMS e motivazione personalizzata. Per noi ogni percorso è unico, proprio come te.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {team.map((member, index) => (
              <div key={index} className="card-team">
                <div className="aspect-[16/12] overflow-hidden">
                  <OptimizedImage
                    src={member.image}
                    alt={member.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-heading-sm mb-1">
                    {member.name}
                  </h3>
                  <p className="text-lg font-medium text-secondary mb-4">
                    {member.role}
                  </p>
                  <p className="text-body-md italic">
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
