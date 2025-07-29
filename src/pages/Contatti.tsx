import { useEffect } from "react";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

const Contatti = () => {
  // SEO is now handled by SEOHandler component globally

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12 sm:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-2 leading-tight">
              PRENOTA IL TUO{" "}
              <span className="text-pink-600 block sm:inline">CHECK-UP GRATUITO</span>{" "}
              A LEGNAGO
            </h1>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed">
              <strong>Non è una semplice consulenza</strong>, ma un vero check-up completo del tuo corpo. 
              Analisi composizione corporea, test posturale e piano personalizzato. 
              <span className="text-pink-400 block mt-2">Valore commerciale €80, per te completamente gratuito.</span>
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
          
          {/* Garanzie e Rassicurazioni */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-4 sm:p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-lg sm:text-2xl">✓</span>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-2">Zero Impegno</h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                La consulenza è completamente gratuita e senza alcun obbligo di iscrizione.
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-lg sm:text-2xl">🔒</span>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-2">Privacy Garantita</h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                I tuoi dati sono protetti e non verranno mai condivisi con terze parti.
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-gray-800 rounded-lg border border-gray-700 md:col-span-3 lg:col-span-1">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-lg sm:text-2xl">⚡</span>
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-2">Risposta Rapida</h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
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
