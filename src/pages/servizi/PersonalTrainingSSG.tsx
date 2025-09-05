import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { generateServiceSchema, generateFAQSchema, personalTrainingFAQs } from '@/utils/structuredDataSchemas';
import SSGHeadUpdater from '@/components/SEO/SSGHeadUpdater';

// Lazy load non-critical components
const Navigation = lazy(() => import('@/components/Navigation'));
const Footer = lazy(() => import('@/components/Footer'));

const PersonalTrainingSSG = () => {
  const serviceSchema = generateServiceSchema(
    "Personal Training Legnago",
    "Allenamento personalizzato 1-to-1 con personal trainer certificati presso MUV Fitness Legnago. Programmi su misura per dimagrimento, tonificazione e miglioramento delle performance fisiche."
  );

  const faqSchema = generateFAQSchema(personalTrainingFAQs);

  const combinedSchema = [serviceSchema, faqSchema];

  return (
    <div className="min-h-screen bg-gray-900">
      <SSGHeadUpdater
        title="Personal Training Legnago | Allenamento Personalizzato MUV Fitness"
        description="Personal Training a Legnago con trainer certificati. Programmi personalizzati per dimagrimento, tonificazione e benessere. Prova gratuita disponibile."
        keywords="personal training Legnago, allenamento personalizzato, trainer certificato, dimagrimento, MUV Fitness"
        canonical="https://www.muvfitness.it/servizi/personal-training"
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
              <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                Personal Training
              </span>{' '}
              <span className="text-white">a Legnago</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Allenamenti personalizzati 1-to-1 con personal trainer certificati. 
              Raggiungi i tuoi obiettivi con programmi su misura per te.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contatti"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold rounded-lg hover:from-pink-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105"
              >
                Prenota Prova Gratuita
              </a>
              <a
                href="https://wa.me/393291070374"
                className="inline-flex items-center px-8 py-4 border-2 border-pink-500 text-pink-500 font-bold rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-300"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="prose prose-lg prose-invert mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Perché Scegliere il Personal Training?</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-pink-500 mb-4">Programmi Personalizzati</h3>
                  <p className="text-gray-300">
                    Ogni allenamento è studiato specificamente per te, considerando i tuoi obiettivi, 
                    il tuo livello di fitness e eventuali limitazioni fisiche.
                  </p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-violet-500 mb-4">Risultati Garantiti</h3>
                  <p className="text-gray-300">
                    Con l'attenzione dedicata di un trainer esperto, raggiungerai i tuoi obiettivi 
                    più velocemente e in modo sicuro.
                  </p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-500 mb-4">Motivazione Costante</h3>
                  <p className="text-gray-300">
                    Il tuo personal trainer ti supporterà in ogni sessione, mantenendo alta 
                    la tua motivazione e spingendoti oltre i tuoi limiti.
                  </p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-green-500 mb-4">Tecnica Perfetta</h3>
                  <p className="text-gray-300">
                    Imparerai l'esecuzione corretta di ogni esercizio, massimizzando i risultati 
                    e prevenendo infortuni.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-8">I Nostri Servizi di Personal Training</h2>
              
              <ul className="space-y-4 text-gray-300 mb-12">
                <li className="flex items-start">
                  <span className="text-pink-500 font-bold mr-2">•</span>
                  <span><strong>Dimagrimento e Tonificazione:</strong> Programmi specifici per perdere peso e definire la muscolatura</span>
                </li>
                <li className="flex items-start">
                  <span className="text-violet-500 font-bold mr-2">•</span>
                  <span><strong>Aumento Massa Muscolare:</strong> Allenamenti mirati per sviluppare forza e volume muscolare</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span><strong>Preparazione Atletica:</strong> Training specifico per migliorare le performance sportive</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">•</span>
                  <span><strong>Riabilitazione Post-Infortunio:</strong> Programmi di recupero funzionale sicuri ed efficaci</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 font-bold mr-2">•</span>
                  <span><strong>Fitness per Over 50:</strong> Allenamenti adattati per mantenersi in forma a ogni età</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Domande Frequenti</h2>
            
            <div className="space-y-6">
              {personalTrainingFAQs.map((faq, index) => (
                <div key={index} className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-pink-500 mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-500 to-violet-500">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Inizia Oggi il Tuo Percorso di Trasformazione
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Prenota la tua prova gratuita di Personal Training e scopri come possiamo aiutarti a raggiungere i tuoi obiettivi.
            </p>
            <a
              href="/contatti"
              className="inline-flex items-center px-8 py-4 bg-white text-pink-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Prenota Prova Gratuita
            </a>
          </div>
        </section>
      </main>

      <Suspense fallback={<div className="h-32 bg-gray-900"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default PersonalTrainingSSG;