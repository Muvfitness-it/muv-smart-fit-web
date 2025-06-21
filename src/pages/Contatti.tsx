import { useEffect } from "react";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

const Contatti = () => {
  // Meta tag SEO ottimizzati per la pagina contatti
  useEffect(() => {
    // Title
    document.title = "Contatti MUV | Centro Fitness Legnago";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contatta MUV Smart Fit a Legnago: prenota la tua prova gratuita, scrivici o chiamaci. Siamo pronti ad aiutarti a raggiungere i tuoi obiettivi.');
    }

    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'contatti MUV Smart Fit, contattaci fitness Legnago, prenota prova gratuita Legnago');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://muvsmartfit.it/contatti');

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Contatti – MUV Smart Fit Legnago' },
      { property: 'og:description', content: 'Hai domande? Prenota la tua prova gratuita o scrivici. Siamo a tua disposizione da MUV Smart Fit, Legnago.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://muvsmartfit.it/contatti' },
      { property: 'og:image', content: 'https://muvsmartfit.it/og-image-contatti.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'it_IT' }
    ];

    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Contatti – MUV Smart Fit Legnago' },
      { name: 'twitter:description', content: 'Prenota la tua prova gratuita o scrivici subito a MUV Smart Fit Legnago. Siamo pronti ad aiutarti!' },
      { name: 'twitter:image', content: 'https://muvsmartfit.it/og-image-contatti.jpg' }
    ];

    twitterTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', tag.name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              PRENOTA IL TUO{" "}
              <span className="text-pink-600">CHECK-UP GRATUITO</span>{" "}
              A LEGNAGO
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <strong>Non è una semplice consulenza</strong>, ma un vero check-up completo del tuo corpo. 
              Analisi composizione corporea, test posturale e piano personalizzato. 
              <span className="text-pink-400">Valore commerciale €80, per te completamente gratuito.</span>
            </p>
          </header>
          
          <div className="grid md:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
          
          {/* Garanzie e Rassicurazioni */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Zero Impegno</h3>
              <p className="text-gray-300 text-sm">
                La consulenza è completamente gratuita e senza alcun obbligo di iscrizione.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Privacy Garantita</h3>
              <p className="text-gray-300 text-sm">
                I tuoi dati sono protetti e non verranno mai condivisi con terze parti.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Risposta Rapida</h3>
              <p className="text-gray-300 text-sm">
                Ti ricontatteremo entro 24 ore per fissare il tuo appuntamento.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contatti;
