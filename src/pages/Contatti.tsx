
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";

const Contatti = () => {
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
