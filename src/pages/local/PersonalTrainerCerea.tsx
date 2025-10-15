import { Helmet } from "react-helmet";
import LocalLandingTemplate from "@/components/local/LocalLandingTemplate";
import MUVNavigation from "@/components/navigation/MUVNavigation";
import MUVFooter from "@/components/home/MUVFooter";
import { BUSINESS_DATA } from "@/config/businessData";

const PersonalTrainerCerea = () => {
  const localTestimonials = [
    {
      name: "Marco R.",
      city: "Cerea",
      rating: 5,
      text: "Vengo da Cerea e in 15 minuti sono da MUV. Il team è fantastico e i risultati parlano chiaro: -8kg in 2 mesi!",
      service: "Personal Training + EMS"
    },
    {
      name: "Giulia M.",
      city: "Cerea",
      rating: 5,
      text: "Avevo mal di schiena cronico. Con Pancafit e il metodo MUV sono rinata. Consigliatissimo anche a chi viene da Cerea!",
      service: "Pancafit & Postura"
    },
    {
      name: "Andrea P.",
      city: "Cerea",
      rating: 5,
      text: "Struttura moderna, personale competente e risultati garantiti. Vale assolutamente il breve viaggio da Cerea!",
      service: "Small Group Training"
    }
  ];

  const localFAQs = [
    {
      question: "Quanto dista MUV Fitness da Cerea?",
      answer: `MUV Fitness si trova a Legnago, a circa 7 km da Cerea. In auto sono solo 12-15 minuti tramite la SP6. Il parcheggio è gratuito e sempre disponibile.`
    },
    {
      question: "Ci sono orari comodi per chi lavora a Cerea?",
      answer: `Assolutamente sì! Siamo aperti dal lunedì al sabato con orari flessibili. Molti nostri clienti da Cerea vengono la mattina presto (dalle 7:00) o la sera dopo il lavoro (fino alle 21:00).`
    },
    {
      question: "Posso fare una prova gratuita venendo da Cerea?",
      answer: `Certamente! Offriamo una prova gratuita a tutti, anche a chi viene da Cerea o altri comuni limitrofi. Prenota ora per scoprire il metodo MUV senza impegno.`
    },
    {
      question: "Quali servizi offrite per chi ha poco tempo?",
      answer: `L'EMS Training è perfetto per chi ha poco tempo: 20 minuti di allenamento equivalgono a 90 minuti di palestra tradizionale. Ideale per ottimizzare i tempi di viaggio da Cerea!`
    }
  ];

  const cityName = "Cerea";
  const citySlug = "cerea";
  const mainKeyword = "Personal Trainer";

  return (
    <>
      <Helmet>
        <title>Personal Trainer Cerea | MUV Fitness Legnago - A 12 min da Te</title>
        <meta 
          name="description" 
          content="Cerchi un personal trainer a Cerea? MUV Fitness Legnago è a soli 12 minuti. EMS Training, Pilates Reformer, Personal Training. Prova gratuita disponibile!" 
        />
        <meta name="keywords" content="personal trainer cerea, palestra cerea, ems training cerea, pilates cerea, fitness cerea, dimagrire cerea" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Personal Trainer Cerea | MUV Fitness Legnago" />
        <meta property="og:description" content="Il tuo personal trainer di fiducia vicino a Cerea. Tecnologie avanzate e risultati garantiti a soli 12 minuti da te." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.muvfitness.it/personal-trainer-cerea" />
        
        {/* Local Business */}
        <meta property="business:contact_data:locality" content="Cerea" />
        <meta property="business:contact_data:region" content="Veneto" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://www.muvfitness.it/personal-trainer-cerea" />
      </Helmet>

      <MUVNavigation />
      
      <LocalLandingTemplate
        cityName={cityName}
        citySlug={citySlug}
        distance="7 km"
        travelTime="12-15 minuti"
        mainKeyword={mainKeyword}
        heroImage="/lovable-uploads/francesco-muv.jpg"
        localTestimonials={localTestimonials}
        localFAQs={localFAQs}
      />

      <MUVFooter />
    </>
  );
};

export default PersonalTrainerCerea;
