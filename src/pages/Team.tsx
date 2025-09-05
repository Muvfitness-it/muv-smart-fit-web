import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import UnifiedSEOHead from "@/components/SEO/UnifiedSEOHead";
import { getLocalBusinessSchema, getOrganizationSchema } from "@/utils/seoSchemas";

const Team = () => {
  const structuredData = [
    getLocalBusinessSchema(),
    getOrganizationSchema()
  ];

  const teamMembers = [
    {
      name: "Vincenzo Bocchino",
      role: "Fondatore & CEO",
      image: "/lovable-uploads/470f5162-68c3-4cc1-8e0c-9402f101b13d.png",
      description: "Visionario del fitness innovativo, ha creato Centro fitness MUV per rivoluzionare l'approccio al benessere a Legnago. Esperto in gestione di centri fitness di eccellenza.",
      specialization: "Strategia e Leadership"
    },
    {
      name: "Christian Gioso",
      role: "Personal Trainer & Specialista Pancafit",
      image: "/lovable-uploads/6a6b9274-a4a0-48ab-a512-74641f84240f.png",
      description: "Laureato in Scienze Motorie, tecnico certificato Pancafit. Ha risolto problemi di mal di schiena a centinaia di clienti. Il 95% elimina il dolore entro 6 settimane.",
      specialization: "Postura e Riabilitazione"
    },
    {
      name: "Serena Portici",
      role: "Personal Trainer EMS & Wellness",
      image: "/lovable-uploads/db94c413-bfaa-4e3d-8dbd-08033a2a05f5.png",
      description: "Laureata in Scienze Motorie, specialista in tecnologia EMS e massaggi terapeutici. Esperta nel dimagrimento femminile e rimodellamento corporeo.",
      specialization: "Dimagrimento e Tonificazione"
    },
    {
      name: "Susanna Isante",
      role: "Consulente Benessere",
      image: "/lovable-uploads/15648e16-46c5-49f5-ac4b-1947ae3eed15.png",
      description: "Diplomata in estetica e benessere, con esperienza pluriennale in centri di dimagrimento. Specializzata nell'approccio olistico al benessere femminile.",
      specialization: "Benessere Olistico"
    },
    {
      name: "Mauro Petterle",
      role: "Personal Trainer Senior",
      image: "/lovable-uploads/3a0cd379-08e3-4054-80ae-442258546626.png",
      description: "20 anni di esperienza nel fitness. Specialista in allenamenti per potenziamento muscolare e dimagrimento. Ha trasformato il fisico di oltre 500 clienti.",
      specialization: "Forza e Massa Muscolare"
    },
    {
      name: "Thomas Gabrieli",
      role: "Personal Trainer Senior",
      image: "https://baujoowgqeyraqnukkmw.supabase.co/storage/v1/object/sign/immagini/Thomas%20Gabrieli.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lZmY3Y2EyNC1kNDQ4LTRhZjgtYjA3Ni1jZWQzNGU0OWEzMjEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbW1hZ2luaS9UaG9tYXMgR2FicmllbGkuanBnIiwiaWF0IjoxNzUxNjE5NDA2LCJleHAiOjE3ODMxNTU0MDZ9.YPhebl_VsTVnLF3ehFhN2Ii2V5MOXfqNeqlAk708xc4",
      description: "Mi chiamo Thomas, sono Chinesiologo (Laurea Scienze Motorie) e Massoterapista (MCB/ausiliario sanitario). Il mio percorso di studi mi ha portato a sviluppare un approccio basato sull'embodied cognition.",
      specialization: "Massoterapista e Chinesiologo"
    },
    {
      name: "Jenny",
      role: "Personal Trainer & Istruttrice di Fitness",
      image: "/lovable-uploads/08402c8f-6e39-4e66-ba12-844028213e91.png",
      description: "Mi sono laureata in Scienze delle attività motorie e sportive e Scienze della nutrizione umana con l'obiettivo di aiutare le persone a raggiungere il proprio benessere a 360°! Ho scelto di far parte del team di MUV perché ritengo sia una realtà in cui la cura ed il benessere del cliente vengano poste in primo piano.",
      specialization: "Benessere a 360° e Nutrizione"
    }
  ];

  return (
    <>
      <UnifiedSEOHead
        title="Team MUV Fitness Legnago | Personal Trainer Certificati Verona"
        description="Conosci il team di esperti MUV Fitness: personal trainer certificati, nutrizionisti e massoterapisti a Legnago. Professionalità e risultati garantiti."
        keywords="team personal trainer legnago, staff muv fitness, istruttori certificati verona, nutrizionista legnago, massoterapista"
        structuredData={structuredData}
      />
      
      <Navigation />
      <div className="min-h-screen bg-gray-900 text-white">
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <header className="text-center mb-10 sm:mb-14 lg:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2 text-white">
              I migliori Personal Trainer di{" "}
              <span className="text-brand-primary block sm:inline">Legnago</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white max-w-4xl mx-auto leading-relaxed px-4">
              <strong>Non troverai un team più qualificato e appassionato</strong> in tutta la provincia di Verona. 
              Ogni specialista ha una missione: <span className="text-brand-primary">trasformare il tuo corpo e la tua vita</span>.
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-pink-600 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                  <div className="mb-4 sm:mb-6 lg:mb-8 flex justify-center">
                    <div className="w-32 h-40 sm:w-40 sm:h-48 md:w-44 md:h-52 lg:w-40 lg:h-48 xl:w-44 xl:h-52 overflow-hidden rounded-lg shadow-lg">
                       <img
                        src={member.image}
                        alt={`${member.name} – ${member.role} presso MUV Fitness Legnago`}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                        width="200"
                        height="250"
                      />
                    </div>
                  </div>
                   <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                    <h3 className="text-lg sm:text-xl lg:text-xl xl:text-2xl font-bold text-white">{member.name}</h3>
                    <p className="text-brand-primary font-semibold text-sm sm:text-base lg:text-sm xl:text-base">{member.role}</p>
                    <p className="text-brand-accent font-medium text-xs sm:text-sm lg:text-xs xl:text-sm">{member.specialization}</p>
                    <p className="text-gray-300 leading-relaxed text-xs sm:text-sm lg:text-sm xl:text-base px-1 sm:px-2">{member.description}</p>
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="mt-12 sm:mt-16 lg:mt-20 text-center bg-gradient-to-r from-brand-primary/20 via-brand-accent/20 to-brand-info/20 p-6 sm:p-8 lg:p-10 rounded-lg border border-brand-primary/30">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold text-white mb-4 sm:mb-6 px-2">
              Scegli il tuo specialista
            </h2>
            <p className="text-sm sm:text-base lg:text-sm xl:text-base text-gray-300 mb-6 sm:mb-8 px-4 leading-relaxed max-w-3xl mx-auto">
              <strong>Ogni trainer ha competenze specifiche.</strong> Durante il check-up gratuito ti assegneremo 
              lo specialista perfetto per i tuoi obiettivi. <span className="text-brand-primary">Risultati garantiti</span>.
            </p>
            <Link to="/contatti">
              <Button 
                className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6 text-sm sm:text-base lg:text-lg rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto font-semibold leading-tight min-h-[44px]"
                aria-label="Prenota consulenza gratuita con personal trainer MUV Fitness Legnago"
              >
                <span className="block sm:hidden">Prenota consulenza</span>
                <span className="hidden sm:block">Prenota consulenza con il team</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
    </>
  );
};

export default Team;
