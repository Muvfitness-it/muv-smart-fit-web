import { Helmet } from "react-helmet";
import ReviewsManager from "@/components/reviews/ReviewsManager";
import { BUSINESS_DATA } from "@/config/businessData";
import { generateLocalBusinessWithReviews } from "@/utils/schemas/review";

const Recensioni = () => {
  // Mock reviews - sostituire con dati reali da API/Database
  const reviews = [
    {
      id: "1",
      author: "Maria Rossi",
      rating: 5,
      date: "2024-01-15",
      text: "Centro fitness fantastico! Ho perso 8kg in 2 mesi con l'EMS Training. Personale competente e sempre disponibile. Consigliatissimo!",
      source: "Google" as const,
      verified: true
    },
    {
      id: "2",
      author: "Luca Bianchi",
      rating: 5,
      date: "2024-01-10",
      text: "Professionalità al top. Francesco e il suo team sanno davvero come far raggiungere gli obiettivi. Ambiente pulito e moderno.",
      source: "Google" as const,
      verified: true
    },
    {
      id: "3",
      author: "Giulia Martini",
      rating: 5,
      date: "2024-01-05",
      text: "Ho risolto il mio mal di schiena cronico grazie a Pancafit e al metodo Mezieres. Non potevo chiedere di meglio!",
      source: "Google" as const,
      verified: true
    },
    {
      id: "4",
      author: "Andrea Verdi",
      rating: 5,
      date: "2023-12-20",
      text: "Il Pilates Reformer ha cambiato il mio corpo. Risultati visibili già dopo poche settimane. Altamente raccomandato!",
      source: "Google" as const,
      verified: true
    },
    {
      id: "5",
      author: "Federica Romano",
      rating: 5,
      date: "2023-12-15",
      text: "Vengo da Cerea e il viaggio vale assolutamente la pena. Tecnologie all'avanguardia e risultati garantiti.",
      source: "Google" as const,
      verified: true
    },
    {
      id: "6",
      author: "Marco Colombo",
      rating: 5,
      date: "2023-12-10",
      text: "Personal training di altissimo livello. Ogni seduta è personalizzata e mirata ai miei obiettivi specifici.",
      source: "Google" as const,
      verified: true
    }
  ];

  const aggregateRating = {
    ratingValue: 5.0,
    reviewCount: reviews.length
  };

  const structuredData = generateLocalBusinessWithReviews(reviews, aggregateRating);

  return (
    <>
      <Helmet>
        <title>Recensioni MUV Fitness Legnago | Testimonianze Clienti</title>
        <meta 
          name="description" 
          content="Leggi le recensioni dei nostri clienti su MUV Fitness Legnago. Oltre 100 recensioni a 5 stelle su Google. Scopri le testimonianze reali dei nostri risultati." 
        />
        <meta name="keywords" content="recensioni muv fitness, testimonianze legnago, palestra recensioni, fitness legnago opinioni" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Recensioni MUV Fitness Legnago" />
        <meta property="og:description" content="Oltre 100 recensioni a 5 stelle. Scopri cosa dicono i nostri clienti." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.muvfitness.it/recensioni" />
        <meta property="og:image" content={BUSINESS_DATA.branding.ogImage} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        <link rel="canonical" href="https://www.muvfitness.it/recensioni" />
      </Helmet>

      <div className="min-h-screen py-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Cosa Dicono i Nostri Clienti
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Oltre <strong>100+ recensioni a 5 stelle</strong> su Google. Scopri le esperienze reali di chi ha trasformato il proprio corpo con MUV Fitness
            </p>
          </div>
        </section>

        {/* Reviews Manager Component */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <ReviewsManager reviews={reviews} showCTA={true} />
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Garanzia di Qualità
            </h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">5.0</div>
                <p className="text-muted-foreground">Rating Google</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <p className="text-muted-foreground">Recensioni Verificate</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <p className="text-muted-foreground">Clienti Soddisfatti</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">4+</div>
                <p className="text-muted-foreground">Anni di Attività</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Recensioni;
