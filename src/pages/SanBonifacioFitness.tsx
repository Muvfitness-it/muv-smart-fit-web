import React from 'react';
import StaticSEO from '@/components/SEO/StaticSEO';
import EnhancedFAQSchema from '@/components/SEO/EnhancedFAQSchema';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

const SanBonifacioFitness = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MUV Fitness - Servizio per San Bonifacio",
    "description": "Centro Fitness MUV serve anche San Bonifacio con personal training, EMS, Pilates. A 20 minuti da San Bonifacio.",
    "url": "https://www.muvfitness.it/san-bonifacio-fitness",
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
      "name": "San Bonifacio"
    }
  };

  const faqs = [
    {
      question: "Vale la pena venire da San Bonifacio a MUV Fitness?",
      answer: "Assolutamente sì! Molti nostri clienti vengono da San Bonifacio perché offriamo servizi unici come EMS e un approccio personalizzato che non si trova facilmente altrove. Solo 20 minuti di auto."
    },
    {
      question: "MUV Fitness è meglio delle palestre di San Bonifacio?",
      answer: "MUV Fitness offre un approccio completamente diverso: personal training specializzato, tecnologie innovative come EMS, staff qualificato e un ambiente esclusivo. Non siamo una palestra tradizionale ma un centro benessere completo."
    },
    {
      question: "Che vantaggi ho venendo da San Bonifacio?",
      answer: "Avrai accesso a tecnologie uniche nella zona, personal trainer certificati, consulenza nutrizionale specializzata e trattamenti come Pancafit che difficilmente trovi altrove."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <StaticSEO
        title="Fitness San Bonifacio - Personal Training Avanzato | MUV Fitness"
        description="Centro fitness per San Bonifacio: MUV Fitness offre personal training avanzato, EMS, Pilates. A 20 minuti da San Bonifacio. Tecnologie uniche!"
        canonical="https://www.muvfitness.it/san-bonifacio-fitness"
        structuredData={structuredData}
      />
      <BreadcrumbSchema />
      <EnhancedFAQSchema faqs={faqs} pageTitle="Fitness San Bonifacio - Domande Frequenti" />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            <span className="text-primary">Fitness San Bonifacio</span> - 
            <span className="text-secondary"> MUV Fitness</span>
          </h1>
          
          <div className="text-center mb-12">
            <p className="text-xl text-muted-foreground mb-6">
              Cerchi qualcosa di diverso a <strong>San Bonifacio</strong>? 
              MUV Fitness a Legnago offre tecnologie e servizi <strong>unici nella zona</strong>!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                Perché Scegliere MUV da San Bonifacio?
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>🚀 <strong>Tecnologie uniche</strong> come EMS Training</li>
                <li>👨‍⚕️ <strong>Staff specializzato</strong> e certificato</li>
                <li>🎯 <strong>Approccio personalizzato</strong> al 100%</li>
                <li>🏆 <strong>Risultati documentati</strong> e garantiti</li>
                <li>🚗 <strong>Solo 20 minuti</strong> da San Bonifacio</li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                Servizi Esclusivi
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>⚡ <strong>EMS Training</strong> - Tecnologia avanzata</li>
                <li>🧘 <strong>Pilates Reformer</strong> - Attrezzature professionali</li>
                <li>💆 <strong>Pancafit</strong> - Riequilibrio posturale</li>
                <li>🥗 <strong>Nutrizione specializzata</strong> per sportivi</li>
                <li>🧠 <strong>Supporto psicologico</strong> sportivo</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg mb-12">
            <h2 className="text-3xl font-semibold text-center mb-6">
              <span className="text-primary">Tecnologie</span> che 
              <span className="text-secondary"> Non Trovi Altrove</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-primary">EMS Training</h3>
                <p className="text-muted-foreground">
                  Elettrostimolazione muscolare per risultati in tempi record. 
                  20 minuti di EMS equivalgono a 4 ore di palestra tradizionale.
                </p>
              </div>
              <div className="bg-white/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-primary">Analisi Corporea</h3>
                <p className="text-muted-foreground">
                  Tecnologie avanzate per monitorare i progressi e personalizzare 
                  ogni allenamento sui tuoi dati specifici.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg mb-12">
            <h2 className="text-3xl font-semibold text-center mb-8 text-primary">
              Testimonianze da San Bonifacio
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <p className="italic text-lg mb-2">
                  "Vengo da San Bonifacio e vale ogni chilometro. In 3 mesi ho ottenuto 
                  risultati che in palestra non avevo mai visto in anni."
                </p>
                <p className="font-semibold">- Marco, San Bonifacio</p>
              </div>
              <div className="border-l-4 border-secondary pl-6">
                <p className="italic text-lg mb-2">
                  "L'EMS training è incredibile! Lo staff è preparatissimo e l'ambiente 
                  è completamente diverso dalle solite palestre."
                </p>
                <p className="font-semibold">- Laura, San Bonifacio</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-lg text-white">
              <h2 className="text-3xl font-semibold mb-4">
                Prova Gratuitamente
              </h2>
              <p className="text-xl mb-6">
                Prima sessione gratuita per i residenti di San Bonifacio!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+390442179008" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  📞 Prenota: 0442 1790080
                </a>
                <a 
                  href="/contatti" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary transition-colors font-semibold"
                >
                  ✉️ Scrivici
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SanBonifacioFitness;