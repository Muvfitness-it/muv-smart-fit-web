import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, CheckCircle, Clock, Dumbbell, TrendingUp, Heart, Users } from "lucide-react";
import { ServicePageLayout } from "@/components/layouts/ServicePageLayout";
import { ServiceHeroSection } from "@/components/layouts/ServiceHeroSection";
import { ServiceFAQSection } from "@/components/layouts/ServiceFAQSection";
import { ServiceCTASection } from "@/components/layouts/ServiceCTASection";
import EnhancedFAQSchema from "@/components/SEO/EnhancedFAQSchema";

const EMS = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Allenamento EMS Legnago",
    "description": "Allenamento con elettrostimolazione (EMS) a Legnago. 20 minuti di allenamento equivalgono a 3 ore di palestra tradizionale. Risultati rapidi e duraturi.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "MUV Fitness",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Viale dei Tigli 14",
        "addressLocality": "Legnago",
        "addressRegion": "VR",
        "postalCode": "37045",
        "addressCountry": "IT"
      },
      "telephone": "+39 347 1234567"
    },
    "areaServed": ["Legnago", "Verona", "Cerea", "Bovolone", "San Bonifacio"],
    "serviceType": "Allenamento EMS"
  };

  const faqs = [
    {
      question: "Cos'è l'allenamento EMS e come funziona?",
      answer: "L'EMS (elettrostimolazione muscolare) utilizza impulsi elettrici per attivare i muscoli durante l'esercizio, permettendo di allenare oltre 300 muscoli contemporaneamente in soli 20 minuti."
    },
    {
      question: "L'allenamento EMS è sicuro?",
      answer: "Sì, l'EMS è completamente sicuro quando praticato con personale qualificato. È una tecnologia utilizzata da anni in fisioterapia e ora applicata al fitness con grandi risultati."
    },
    {
      question: "Quanto tempo serve per vedere i primi risultati?",
      answer: "I primi risultati sono visibili già dopo 2-3 settimane di allenamento costante. Dopo 6-8 settimane i cambiamenti diventano significativi e duraturi."
    },
    {
      question: "Chi può fare allenamento EMS a Legnago?",
      answer: "L'EMS è adatto a tutti i livelli di fitness, da principianti ad atleti professionisti. È particolarmente indicato per chi ha poco tempo ma vuole risultati massimi."
    },
    {
      question: "Quante sessioni EMS servono a settimana?",
      answer: "Per risultati ottimali consigliamo 2-3 sessioni a settimana da 20 minuti ciascuna. Questo garantisce recupero adeguato e progressi costanti."
    }
  ];

  const whatsappMessage = encodeURIComponent("Ciao! Sono interessato/a all'allenamento EMS. Vorrei prenotare la prova gratuita per conoscere i vostri programmi.");

  return (
    <>
      <ServicePageLayout
        title="Allenamento EMS Legnago | Elettrostimolazione Muscolare MUV Fitness"
        description="Allenamento EMS a Legnago: 20 min = 3 ore palestra. Elettrostimolazione muscolare per dimagrire e tonificare rapidamente. Prova gratuita da MUV Fitness."
        keywords="allenamento EMS Legnago, elettrostimolazione muscolare, fitness Legnago, dimagrimento rapido, tonificazione muscolare"
        canonical="https://www.muvfitness.it/servizi/ems"
        structuredData={structuredData}
      >
        <EnhancedFAQSchema faqs={faqs} pageTitle="Allenamento EMS Legnago - Domande Frequenti" />
        
        <ServiceHeroSection
          title="Allenamento EMS Legnago"
          description="20 minuti di elettrostimolazione = 3 ore di palestra tradizionale"
          primaryButton={{
            text: "Prenota Prova Gratuita",
            href: `https://wa.me/393291070374?text=${whatsappMessage}`,
            isExternal: true
          }}
          secondaryButton={{
            text: "Contattaci",
            href: "/contatti"
          }}
          breadcrumbs={[
            { text: "Home", href: "/" },
            { text: "Servizi", href: "/servizi" },
            { text: "EMS Training" }
          ]}
        />

        {/* Introduzione EMS */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Perché Scegliere l'<span className="text-orange-600">EMS a Legnago</span>?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  L'elettrostimolazione muscolare (EMS) rappresenta l'evoluzione del fitness moderno. 
                  In soli 20 minuti attivi oltre 300 muscoli contemporaneamente, ottenendo risultati 
                  che normalmente richiederebbero 3 ore di allenamento tradizionale.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Risultati visibili in 2-3 settimane</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Brucia il 30% di calorie in più</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Tonificazione profonda di tutto il corpo</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Ideale per chi ha poco tempo</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg border-2 hover:border-orange-200 transition-all">
                <h3 className="text-2xl font-bold text-center mb-6">Vantaggi EMS</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="font-semibold">Tempo Efficace</p>
                    <p className="text-sm text-gray-500">Solo 20 minuti</p>
                  </div>
                  <div className="text-center">
                    <Dumbbell className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="font-semibold">300+ Muscoli</p>
                    <p className="text-sm text-gray-500">Attivazione totale</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="font-semibold">Risultati Rapidi</p>
                    <p className="text-sm text-gray-500">2-3 settimane</p>
                  </div>
                  <div className="text-center">
                    <Heart className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="font-semibold">Basso Impatto</p>
                    <p className="text-sm text-gray-500">Sicuro per articolazioni</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefici Specifici */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Benefici dell'<span className="text-orange-600">Allenamento EMS</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Dimagrimento Accelerato</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">L'EMS aumenta il metabolismo e brucia grassi anche a riposo, accelerando la perdita di peso in modo naturale.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Tonificazione Profonda</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Attiva le fibre muscolari più profonde che l'allenamento tradizionale non riesce a raggiungere.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Miglioramento Posturale</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Rinforza i muscoli stabilizzatori della colonna vertebrale, migliorando postura e riducendo dolori.</p>
                </CardContent>
              </Card>
            </div>

            {/* Perfetto Per */}
            <div className="bg-gray-50 p-8 rounded-lg border mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">L'EMS è Perfetto Per Te Se...</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Hai poco tempo per allenarti</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Vuoi risultati rapidi e visibili</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Soffri di dolori articolari</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Vuoi tonificare tutto il corpo</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Cerchi un allenamento innovativo</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                    <span>Vuoi superare i plateau di allenamento</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ServiceFAQSection
          title="Domande Frequenti sull'EMS a Legnago"
          faqs={faqs}
        />

        <ServiceCTASection
          title="Scopri l'EMS da MUV Fitness Legnago"
          description="Vieni a provare una sessione gratuita di allenamento EMS e scopri perché è la scelta di chi vuole risultati rapidi"
          primaryButton={{
            text: "Prenota Prova Gratuita",
            href: `https://wa.me/393291070374?text=${whatsappMessage}`,
            isExternal: true
          }}
          secondaryButton={{
            text: "Chiama Ora",
            href: "/contatti"
          }}
          contactInfo="📞 347 1234567"
          locationInfo="📍 Viale dei Tigli 14, Legnago (VR) | Servizio per Legnago, Cerea, Bovolone, San Bonifacio"
        />
      </ServicePageLayout>
    </>
  );
};

export default EMS;