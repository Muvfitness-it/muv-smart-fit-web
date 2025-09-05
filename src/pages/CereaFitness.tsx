import React from 'react';
import StaticSEO from '@/components/SEO/StaticSEO';
import EnhancedFAQSchema from '@/components/SEO/EnhancedFAQSchema';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

const CereaFitness = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MUV Fitness - Servizio per Cerea",
    "description": "Centro Fitness MUV serve anche Cerea con personal training, EMS, Pilates. A soli 15 minuti da Cerea.",
    "url": "https://www.muvfitness.it/cerea-fitness",
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
      "name": "Cerea"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 45.1914,
        "longitude": 11.3065
      },
      "geoRadius": "20000"
    }
  };

  const faqs = [
    {
      question: "MUV Fitness serve anche Cerea?",
      answer: "Sì, MUV Fitness a Legnago serve con orgoglio anche i residenti di Cerea. Siamo a soli 15 minuti di auto da Cerea e molti nostri clienti vengono da lì per i nostri servizi specializzati."
    },
    {
      question: "Quanto dista MUV Fitness da Cerea?",
      answer: "MUV Fitness si trova a Legnago, a circa 15 minuti di auto da Cerea. L'indirizzo è Via Venti Settembre, 5/7, facilmente raggiungibile dalla SS434."
    },
    {
      question: "Quali servizi offrite per i clienti di Cerea?",
      answer: "Offriamo tutti i nostri servizi anche ai clienti di Cerea: personal training, EMS, Pilates, consulenza nutrizionale, Pancafit, massoterapia e small group training."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <StaticSEO
        title="Fitness Cerea - Personal Training e Palestra | MUV Fitness Legnago"
        description="Centro fitness per Cerea: MUV Fitness a Legnago serve Cerea con personal training, EMS, Pilates. A 15 minuti da Cerea. Consulenza gratuita!"
        canonical="https://www.muvfitness.it/cerea-fitness"
        structuredData={structuredData}
      />
      <BreadcrumbSchema />
      <EnhancedFAQSchema faqs={faqs} pageTitle="Fitness Cerea - Domande Frequenti" />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            <span className="text-primary">Fitness a Cerea</span> - 
            <span className="text-secondary"> MUV Fitness</span>
          </h1>
          
          <div className="text-center mb-12">
            <p className="text-xl text-muted-foreground mb-6">
              Sei di <strong>Cerea</strong> e cerchi un centro fitness d'eccellenza? 
              MUV Fitness a Legnago è a soli <strong>15 minuti</strong> da casa tua!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                Perché Scegliere MUV Fitness da Cerea?
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>✓ <strong>Vicinanza</strong>: Solo 15 minuti da Cerea</li>
                <li>✓ <strong>Parcheggio gratuito</strong> sempre disponibile</li>
                <li>✓ <strong>Tecnologie avanzate</strong> come EMS</li>
                <li>✓ <strong>Personal trainer qualificati</strong></li>
                <li>✓ <strong>Orari flessibili</strong> anche per i pendolari</li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                Servizi per Cerea
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>🏋️ <strong>Personal Training</strong> personalizzato</li>
                <li>⚡ <strong>EMS Training</strong> (elettrostimolazione)</li>
                <li>🧘 <strong>Pilates</strong> individuale e gruppo</li>
                <li>🥗 <strong>Consulenza nutrizionale</strong></li>
                <li>💆 <strong>Pancafit e massoterapia</strong></li>
              </ul>
            </div>
          </div>

          <div className="bg-primary/10 p-8 rounded-lg mb-12">
            <h2 className="text-3xl font-semibold text-center mb-6 text-primary">
              Come Raggiungerci da Cerea
            </h2>
            <div className="text-center space-y-4">
              <p className="text-lg">
                📍 <strong>Indirizzo</strong>: Via Venti Settembre, 5/7 - Legnago (VR)
              </p>
              <p className="text-lg">
                🚗 <strong>Percorso</strong>: Prendi la SS434 da Cerea verso Legnago (15 min)
              </p>
              <p className="text-lg">
                🅿️ <strong>Parcheggio</strong>: Gratuito davanti al centro
              </p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg">
            <h2 className="text-3xl font-semibold text-center mb-8 text-primary">
              Domande Frequenti - Cerea
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b pb-4">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-secondary/10 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-secondary">
                Prenota la Tua Consulenza Gratuita
              </h2>
              <p className="text-lg mb-6">
                Chiamaci per una consulenza gratuita e scopri come possiamo aiutarti!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+390442179008" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  📞 Chiama: 0442 1790080
                </a>
                <a 
                  href="/contatti" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  ✉️ Contattaci Online
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CereaFitness;