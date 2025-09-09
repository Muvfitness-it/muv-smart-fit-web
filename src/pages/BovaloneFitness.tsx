import React from 'react';
import StaticSEO from '@/components/SEO/StaticSEO';
import EnhancedFAQSchema from '@/components/SEO/EnhancedFAQSchema';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import BreadcrumbNavigation from "@/components/SEO/BreadcrumbNavigation";

const BovaloneFitness = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MUV Fitness - Servizio per Bovolone",
    "description": "Centro Fitness MUV serve anche Bovolone con personal training, EMS, Pilates. A soli 10 minuti da Bovolone.",
    "url": "https://www.muvfitness.it/bovolone-fitness",
    "telephone": "+39 0442 1790080",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Venti Settembre, 5/7",
      "addressLocality": "Legnago",
      "addressRegion": "VR",
      "postalCode": "37045",
      "addressCountry": "IT"
    },
    "areaServed": {
      "@type": "City",
      "name": "Bovolone"
    }
  };

  const faqs = [
    {
      question: "MUV Fitness è comodo per chi abita a Bovolone?",
      answer: "Assolutamente sì! MUV Fitness si trova a Legnago, a soli 10 minuti di auto da Bovolone. Molti nostri clienti vengono da Bovolone per i nostri servizi specializzati."
    },
    {
      question: "Che servizi offrite per i residenti di Bovolone?",
      answer: "Offriamo tutti i nostri servizi: personal training, EMS, Pilates, consulenza nutrizionale, Pancafit, massoterapia e small group training. Tutti personalizzati per le tue esigenze."
    },
    {
      question: "Ci sono orari adatti per chi lavora a Bovolone?",
      answer: "Sì, siamo aperti dal lunedì al venerdì dalle 8:00 alle 21:00 e il sabato dalle 8:00 alle 12:00. Orari perfetti anche per chi lavora e deve spostarsi da Bovolone."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <StaticSEO
        title="Fitness Bovolone - Palestra e Personal Training | MUV Fitness Legnago"
        description="Centro fitness per Bovolone: MUV Fitness a Legnago serve Bovolone con personal training, EMS, Pilates. A 10 minuti da Bovolone. Consulenza gratuita!"
        canonical="https://www.muvfitness.it/bovolone-fitness"
        structuredData={structuredData}
      />
      <BreadcrumbSchema />
      <EnhancedFAQSchema faqs={faqs} pageTitle="Fitness Bovolone - Domande Frequenti" />
      <BreadcrumbNavigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            <span className="text-primary">Fitness a Bovolone</span> - 
            <span className="text-secondary"> MUV Fitness</span>
          </h1>
          
          <div className="text-center mb-12">
            <p className="text-xl text-muted-foreground mb-6">
              Abiti a <strong>Bovolone</strong> e vuoi allenarti in un centro fitness d'eccellenza? 
              MUV Fitness a Legnago è a soli <strong>10 minuti</strong> da te!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                Vantaggi per Bovolone
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>✓ <strong>Vicinissimo</strong>: Solo 10 minuti da Bovolone</li>
                <li>✓ <strong>Tecnologie uniche</strong> nella zona</li>
                <li>✓ <strong>Staff altamente qualificato</strong></li>
                <li>✓ <strong>Parcheggio comodo</strong> e gratuito</li>
                <li>✓ <strong>Ambiente accogliente</strong> e pulito</li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                Servizi Disponibili
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>💪 <strong>Personal Training</strong> one-to-one</li>
                <li>⚡ <strong>EMS Training</strong> innovativo</li>
                <li>🧘 <strong>Pilates</strong> per tutti i livelli</li>
                <li>👥 <strong>Small Group</strong> training</li>
                <li>🏃 <strong>HIIT</strong> ad alta intensità</li>
              </ul>
            </div>
          </div>

          <div className="bg-primary/10 p-8 rounded-lg mb-12">
            <h2 className="text-3xl font-semibold text-center mb-6 text-primary">
              Raggiungici Facilmente
            </h2>
            <div className="text-center space-y-4">
              <p className="text-lg">
                📍 <strong>Da Bovolone a MUV Fitness</strong>: Via Venti Settembre, 5/7 - Legnago
              </p>
              <p className="text-lg">
                🚗 <strong>Tempo di percorrenza</strong>: Solo 10 minuti in auto
              </p>
              <p className="text-lg">
                📞 <strong>Info e prenotazioni</strong>: 0442 1790080
              </p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg">
            <h2 className="text-3xl font-semibold text-center mb-8 text-primary">
              Perché i Clienti di Bovolone ci Scelgono
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-semibold mb-2">Risultati Garantiti</h3>
                <p className="text-sm text-muted-foreground">
                  Programmi personalizzati che funzionano davvero
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="font-semibold mb-2">Qualità Superiore</h3>
                <p className="text-sm text-muted-foreground">
                  Il miglior centro fitness della zona
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="font-semibold mb-2">Cura Personale</h3>
                <p className="text-sm text-muted-foreground">
                  Ogni cliente è unico e speciale per noi
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-secondary/10 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-secondary">
                Inizia il Tuo Percorso Oggi
              </h2>
              <p className="text-lg mb-6">
                Prima consulenza gratuita per tutti i residenti di Bovolone!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+390442179008" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  📞 Chiama Ora
                </a>
                <a 
                  href="https://wa.me/390442179008" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BovaloneFitness;