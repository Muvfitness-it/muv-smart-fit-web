import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import SEOOptimizer from "@/components/SEO/SEOOptimizer";

const Contatti = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contatti MUV Fitness Legnago",
    "description": "Contatta MUV Fitness Legnago per informazioni, consulenze gratuite e appuntamenti. Ti rispondiamo in 10 minuti.",
    "url": "https://www.muvfitness.it/contatti",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "MUV Fitness Legnago",
      "telephone": "+393291070374",
      "email": "info@muvfitness.it",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Legnago",
        "addressRegion": "Veneto",
        "addressCountry": "IT"
      }
    }
  };

  return (
    <>
      <SEOOptimizer
        title="Contatti MUV Fitness Legnago | Prenota Consulenza Gratuita"
        description="Contatta MUV Fitness Legnago per informazioni su Personal Training, EMS, Pancafit e Pilates. Ti richiamiamo in 10 minuti. WhatsApp: 329 107 0374"
        canonicalUrl="https://www.muvfitness.it/contatti"
        structuredData={structuredData}
      />
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12 sm:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-2 leading-tight text-white">
              Parla con noi: ti rispondiamo in pochi minuti
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed">
              <strong className="text-brand-primary">Ti richiamiamo entro 10 minuti</strong> negli orari di apertura. 
              Scegli WhatsApp se preferisci un contatto rapido.
            </p>
          </header>
          
          {/* Pulsanti CTA principali */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16">
            <a 
              href="https://wa.me/393291070374"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg min-h-[44px] focus:outline-none focus:ring-4 focus:ring-green-300"
              aria-label="Scrivici su WhatsApp – MUV Fitness Legnago"
            >
              Scrivici su WhatsApp
            </a>
            <a
              href="tel:+393291070374"
              className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 min-h-[44px]"
              aria-label="Chiamaci al 329 107 0374"
            >
              Chiamaci ora
            </a>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
          
          {/* Mini-FAQ per contatti */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white">Domande frequenti</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-lg font-bold mb-3 text-white">Dove parcheggio?</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Posti auto gratuiti disponibili davanti al centro e nelle vie limitrofe.
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-lg font-bold mb-3 text-white">Posso venire in pausa pranzo?</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Sì, siamo aperti anche durante l'orario di pranzo su appuntamento.
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-lg font-bold mb-3 text-white">Tempi per la prima prova?</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
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
