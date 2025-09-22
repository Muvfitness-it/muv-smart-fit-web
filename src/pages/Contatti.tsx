import ContactInfo from "@/components/contact/ContactInfo";
import MUVContactForm from "@/components/contact/MUVContactForm";
import UnifiedSEOHead from "@/components/SEO/UnifiedSEOHead";
import BreadcrumbNavigation from "@/components/SEO/BreadcrumbNavigation";
import { getLocalBusinessSchema, getFAQSchema } from "@/utils/seoSchemas";

console.log('Contatti page loading...');

const Contatti = () => {
  const faqs = [
    {
      question: "Dove si trova MUV Fitness?",
      answer: "MUV Fitness si trova in Via Venti Settembre 5/7 a Legnago (VR). Siamo facilmente raggiungibili dal centro città e disponiamo di parcheggio."
    },
    {
      question: "Quali sono gli orari di apertura?",
      answer: "Siamo aperti dal lunedì al venerdì dalle 08:00 alle 21:00, il sabato dalle 8:00 alle 12:00. La domenica su appuntamento per servizi specifici."
    },
    {
      question: "Come posso prenotare una consulenza gratuita?",
      answer: "Puoi prenotare chiamando il 329 107 0374, inviando una email a info@muvfitness.it o compilando il form di contatto sul sito."
    }
  ];

  const structuredData = [
    getLocalBusinessSchema(),
    getFAQSchema(faqs)
  ];

  return (
    <>
      <UnifiedSEOHead
        title="Contatti MUV Fitness Legnago | Centro Fitness Via Venti Settembre"
        description="Contatta MUV Fitness a Legnago: Via Venti Settembre 5/7, tel. 329 107 0374. Consulenza gratuita per EMS, Personal Training, Pilates e Nutrizione."
        keywords="contatti muv fitness legnago, palestra via venti settembre, centro fitness verona telefono, appuntamento personal trainer"
        structuredData={structuredData}
      />
      
      <BreadcrumbNavigation />
      
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 px-2 leading-tight text-foreground">
              Trasforma il tuo corpo in 30 giorni
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed mb-6">
              <strong className="text-primary">Consulenza gratuita</strong> senza impegno. 
              Ti richiamiamo entro 10 minuti negli orari di apertura.
            </p>
            
            <div className="bg-primary/20 border border-primary/30 rounded-lg p-4 inline-block mb-6">
              <p className="text-foreground text-base md:text-lg font-medium">
                🔥 <strong>127+ trasformazioni completate</strong> quest'anno
              </p>
            </div>
          </header>
          
          {/* Pulsanti CTA principali */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16">
            <a 
              href="https://wa.me/393291070374"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-full text-xl font-black transition-all duration-300 transform hover:scale-105 shadow-2xl min-h-[64px] focus:outline-none focus:ring-4 focus:ring-green-300"
              aria-label="Scrivici su WhatsApp – MUV Fitness Legnago"
            >
              💬 SCRIVICI SU WHATSAPP
            </a>
            <a
              href="tel:+393291070374"
              className="bg-card text-foreground hover:bg-muted px-8 py-5 rounded-full font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center min-h-[64px] text-lg shadow-xl border border-border"
              aria-label="Chiamaci al 329 107 0374"
            >
              📞 CHIAMACI ORA
            </a>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <MUVContactForm 
              campaignName="Contatti MUV Fitness"
              className="lg:col-span-1"
            />
            <ContactInfo />
          </div>
          
          {/* Mini-FAQ per contatti */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-foreground">Domande frequenti</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-muted rounded-lg border border-border">
                <h3 className="text-lg font-bold mb-3 text-foreground">Dove parcheggio?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Posti auto gratuiti disponibili davanti al centro e nelle vie limitrofe.
                </p>
              </div>
              
              <div className="text-center p-6 bg-muted rounded-lg border border-border">
                <h3 className="text-lg font-bold mb-3 text-foreground">Posso venire in pausa pranzo?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Sì, siamo aperti anche durante l'orario di pranzo su appuntamento.
                </p>
              </div>
              
              <div className="text-center p-6 bg-muted rounded-lg border border-border">
                <h3 className="text-lg font-bold mb-3 text-foreground">Tempi per la prima prova?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Solitamente riusciamo a programmare la prima consulenza entro 2-3 giorni.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Contatti;
