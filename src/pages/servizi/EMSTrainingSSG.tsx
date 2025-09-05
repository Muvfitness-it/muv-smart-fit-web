import { lazy, Suspense } from 'react';
import { generateServiceSchema, generateFAQSchema, emsFAQs } from '@/utils/structuredDataSchemas';
import SSGHeadUpdater from '@/components/SEO/SSGHeadUpdater';

// Lazy load non-critical components
const Navigation = lazy(() => import('@/components/Navigation'));
const Footer = lazy(() => import('@/components/Footer'));

const EMSTrainingSSG = () => {
  const serviceSchema = generateServiceSchema(
    "Allenamento EMS Legnago",
    "Allenamento con elettrostimolazione muscolare presso MUV Fitness Legnago. 20 minuti di EMS equivalgono a 3 ore di palestra tradizionale. Tecnologia avanzata per risultati rapidi."
  );

  const faqSchema = generateFAQSchema(emsFAQs);

  const combinedSchema = [serviceSchema, faqSchema];

  return (
    <div className="min-h-screen bg-gray-900">
      <SSGHeadUpdater
        title="Allenamento EMS Legnago | Elettrostimolazione Muscolare MUV"
        description="Allenamento EMS a Legnago: 20 minuti = 3 ore di palestra. Elettrostimolazione muscolare per dimagrire e tonificare rapidamente presso MUV Fitness."
        keywords="allenamento EMS Legnago, elettrostimolazione muscolare, fitness veloce, tonificazione rapida, MUV Fitness"
        canonical="https://www.muvfitness.it/servizi/ems"
        structuredData={combinedSchema}
      />

      <Suspense fallback={<div className="h-20 bg-gray-900"></div>}>
        <Navigation />
      </Suspense>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Allenamento EMS
              </span>{' '}
              <span className="text-white">a Legnago</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              20 minuti di EMS equivalgono a 3 ore di palestra tradizionale. 
              Scopri la rivoluzione del fitness con l'elettrostimolazione muscolare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contatti"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                Prova EMS Gratuita
              </a>
              <a
                href="https://wa.me/393291070374"
                className="inline-flex items-center px-8 py-4 border-2 border-blue-500 text-blue-500 font-bold rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              I Vantaggi dell'Allenamento EMS
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-500 mb-4">⚡ Efficienza Massima</h3>
                <p className="text-gray-300">
                  20 minuti di EMS attivano il 90% della muscolatura, equivalendo a 3 ore di allenamento tradizionale. 
                  Perfetto per chi ha poco tempo ma vuole risultati concreti.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-500 mb-4">🎯 Tonificazione Rapida</h3>
                <p className="text-gray-300">
                  L'elettrostimolazione raggiunge anche i muscoli più profondi, garantendo una tonificazione 
                  completa e uniforme in tempi record.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-500 mb-4">🔥 Brucia Grassi Efficace</h3>
                <p className="text-gray-300">
                  Il metabolismo resta accelerato fino a 48 ore dopo l'allenamento EMS, 
                  continuando a bruciare calorie anche a riposo.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-yellow-500 mb-4">🛡️ Sicuro e Controllato</h3>
                <p className="text-gray-300">
                  Basso impatto articolare, ideale per chi ha problemi fisici o sta recuperando 
                  da infortuni. Sempre sotto controllo del personal trainer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Come Funziona l'EMS</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Valutazione Iniziale</h3>
                  <p className="text-gray-300">
                    Il nostro trainer analizza i tuoi obiettivi e la tua condizione fisica per personalizzare 
                    l'intensità e la durata dell'allenamento EMS.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Vestizione della Tuta EMS</h3>
                  <p className="text-gray-300">
                    Indossi una tuta speciale con elettrodi integrati che stimolano specifici gruppi muscolari 
                    in modo controllato e sicuro.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Allenamento Supervisionato</h3>
                  <p className="text-gray-300">
                    20 minuti di esercizi funzionali con elettrostimolazione sincronizzata. 
                    Il trainer regola l'intensità in tempo reale per massimizzare i risultati.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Domande Frequenti sull'EMS</h2>
            
            <div className="space-y-6">
              {emsFAQs.map((faq, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-blue-500 mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-500">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Prova l'Allenamento del Futuro
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Scopri come 20 minuti di EMS possono trasformare il tuo corpo. 
              Prenota ora la tua sessione di prova gratuita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contatti"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Prova Gratuita EMS
              </a>
              <a
                href="https://wa.me/393291070374"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                WhatsApp per Info
              </a>
            </div>
          </div>
        </section>
      </main>

      <Suspense fallback={<div className="h-32 bg-gray-900"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default EMSTrainingSSG;