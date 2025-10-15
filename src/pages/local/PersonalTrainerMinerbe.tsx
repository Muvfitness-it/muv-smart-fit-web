import { Helmet } from "react-helmet";
import LocalLandingTemplate from "@/components/local/LocalLandingTemplate";
import MUVNavigation from "@/components/navigation/MUVNavigation";
import MUVFooter from "@/components/home/MUVFooter";

const PersonalTrainerMinerbe = () => {
  const localTestimonials = [
    {
      name: "Federica T.",
      city: "Minerbe",
      rating: 5,
      text: "Vengo da Minerbe ogni settimana e non cambierei mai! L'ambiente è professionale e i risultati sono incredibili.",
      service: "Pilates Reformer"
    },
    {
      name: "Luca B.",
      city: "Minerbe",
      rating: 5,
      text: "A soli 10 minuti da casa ho trovato il centro fitness più completo della zona. Team top!",
      service: "EMS Training"
    },
    {
      name: "Simona V.",
      city: "Minerbe",
      rating: 5,
      text: "Dopo anni di palestre tradizionali, MUV è stata una rivelazione. Risultati veri in tempi record!",
      service: "Personal Training"
    }
  ];

  const localFAQs = [
    {
      question: "Quanto dista MUV Fitness da Minerbe?",
      answer: `MUV Fitness si trova a Legnago, a circa 5 km da Minerbe. In auto sono solo 8-10 minuti tramite la SP39. Disponiamo di ampio parcheggio gratuito.`
    },
    {
      question: "Avete pacchetti per chi viene da fuori Legnago?",
      answer: `I nostri pacchetti sono gli stessi per tutti! Offriamo soluzioni flessibili che si adattano a qualsiasi esigenza, con sessioni personalizzate e risultati garantiti.`
    },
    {
      question: "Posso combinare più servizi?",
      answer: `Assolutamente sì! Molti clienti da Minerbe combinano EMS Training con Pilates Reformer o Personal Training per risultati ancora più rapidi e completi.`
    },
    {
      question: "Come posso prenotare da Minerbe?",
      answer: `Puoi prenotare online, chiamarci o scriverci su WhatsApp. Fissiamo insieme l'orario migliore per te, considerando anche i tuoi spostamenti.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>Personal Trainer Minerbe | MUV Fitness Legnago - A 8 min da Te</title>
        <meta 
          name="description" 
          content="Personal trainer a Minerbe? Vieni da MUV Fitness Legnago, a soli 8 minuti. EMS, Pilates Reformer, Personal Training personalizzato. Prova gratuita!" 
        />
        <meta name="keywords" content="personal trainer minerbe, palestra minerbe, ems minerbe, fitness minerbe, dimagrire minerbe, pilates minerbe" />
        
        <meta property="og:title" content="Personal Trainer Minerbe | MUV Fitness Legnago" />
        <meta property="og:description" content="Il centro fitness più completo vicino a Minerbe. Tecnologie avanzate e personal training personalizzato a 8 minuti da te." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.muvfitness.it/personal-trainer-minerbe" />
        
        <meta property="business:contact_data:locality" content="Minerbe" />
        <meta property="business:contact_data:region" content="Veneto" />
        
        <link rel="canonical" href="https://www.muvfitness.it/personal-trainer-minerbe" />
      </Helmet>

      <MUVNavigation />
      
      <LocalLandingTemplate
        cityName="Minerbe"
        citySlug="minerbe"
        distance="5 km"
        travelTime="8-10 minuti"
        mainKeyword="Personal Trainer"
        heroImage="/lovable-uploads/francesco-muv.jpg"
        localTestimonials={localTestimonials}
        localFAQs={localFAQs}
      />

      <MUVFooter />
    </>
  );
};

export default PersonalTrainerMinerbe;
