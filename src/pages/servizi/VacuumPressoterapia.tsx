import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Wind, RotateCw, CheckCircle, Star, Heart, Sparkles } from "lucide-react";
import { ServicePageLayout } from "@/components/layouts/ServicePageLayout";
import { FlexibleHero } from "@/features/hero";
import { ServiceFAQSection } from "@/components/layouts/ServiceFAQSection";
import { ServiceCTASection } from "@/components/layouts/ServiceCTASection";
import EnhancedFAQSchema from "@/components/SEO/EnhancedFAQSchema";
import VacuumPressoterapiaInfographic from "@/components/infographics/VacuumPressoterapiaInfographic";

const VacuumPressoterapia = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Vacuum Pressoterapia Roll Legnago",
    "description": "Trattamenti estetici avanzati a Legnago: Vacuum, Pressoterapia e Roll endermologie per eliminare cellulite e ritenzione idrica. Risultati visibili in 8 sedute.",
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
    "serviceType": "Trattamenti Estetici Vacuum Pressoterapia"
  };

  const faqs = [
    {
      question: "Cos'è la Vacuum terapia e come funziona?",
      answer: "La Vacuum terapia utilizza un'aspirazione controllata per stimolare i tessuti profondi, migliorare la circolazione e ridurre la cellulite attraverso un massaggio meccanico che riattiva il metabolismo cellulare."
    },
    {
      question: "La Pressoterapia è dolorosa?",
      answer: "No, la Pressoterapia è un trattamento molto piacevole e rilassante. La compressione sequenziale simula un massaggio delicato che favorisce il drenaggio linfatico senza causare dolore."
    },
    {
      question: "Quante sedute servono per vedere i primi risultati?",
      answer: "I primi miglioramenti sono visibili già dopo 3-4 sedute, con una riduzione del gonfiore e miglioramento della texture della pelle. Risultati ottimali si ottengono con un ciclo di 8-12 sedute."
    },
    {
      question: "Il Roll endermologie è sicuro?",
      answer: "Sì, il Roll endermologie è un trattamento completamente sicuro e non invasivo. Utilizza rulli meccanici che massaggiano delicatamente i tessuti per stimolare la produzione di collagene ed elastina."
    },
    {
      question: "Chi può fare questi trattamenti a Legnago?",
      answer: "I trattamenti sono adatti a donne e uomini di tutte le età che vogliono migliorare l'aspetto della pelle, ridurre la cellulite e combattere la ritenzione idrica. Non ci sono particolari controindicazioni."
    }
  ];

  const whatsappMessage = encodeURIComponent("Ciao! Sono interessato/a ai trattamenti Vacuum, Pressoterapia e Roll. Vorrei prenotare una consulenza gratuita per valutare il mio caso.");

  return (
    <>
      <ServicePageLayout
        title="Vacuum Pressoterapia Roll Legnago | Cellulite e Ritenzione Idrica – MUV Fitness"
        description="Trattamenti estetici avanzati a Legnago: Vacuum, Pressoterapia e Roll per eliminare cellulite e ritenzione idrica. Risultati visibili in 8 sedute. Prenota la consulenza gratuita."
        keywords="vacuum legnago, pressoterapia legnago, roll endermologie, cellulite legnago, ritenzione idrica, trattamenti estetici"
        canonical="https://www.muvfitness.it/servizi/vacuum-pressoterapia"
        structuredData={structuredData}
      >
        <EnhancedFAQSchema faqs={faqs} pageTitle="Vacuum Pressoterapia Roll Legnago - Domande Frequenti" />
        
        <FlexibleHero
          variant="service"
          title="Vacuum • Pressoterapia • Roll"
          description="Elimina cellulite e ritenzione idrica con i trattamenti estetici più avanzati"
          primaryCTA={{
            text: "Prenota Consulenza Gratuita",
            href: `https://wa.me/393291070374?text=${whatsappMessage}`
          }}
          secondaryCTA={{
            text: "Contattaci",
            href: "/contatti"
          }}
          breadcrumbs={[
            { text: "Home", href: "/" },
            { text: "Servizi", href: "/servizi" },
            { text: "Vacuum Pressoterapia" }
          ]}
        />

        {/* Infografica Vacuum Pressoterapia */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <VacuumPressoterapiaInfographic />
          </div>
        </section>

        {/* Introduzione ai Trattamenti */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Perché Scegliere i Nostri <span className="text-purple-600">Trattamenti Estetici</span>?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  La combinazione di <strong>Vacuum, Pressoterapia e Roll endermologie</strong> rappresenta 
                  l'approccio più completo ed efficace per combattere cellulite, ritenzione idrica e 
                  migliorare l'aspetto generale della pelle.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-0.5" />
                    <span>Risultati visibili dalla 3° seduta</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-0.5" />
                    <span>70% di riduzione della cellulite in 8 sedute</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-0.5" />
                    <span>Trattamento non invasivo e rilassante</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-0.5" />
                    <span>Apparecchiature professionali certificate</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg border-2 hover:border-purple-200 transition-all">
                <h3 className="text-2xl font-bold text-center mb-6">I 3 Trattamenti</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Wind className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Vacuum Terapia</h4>
                      <p className="text-sm text-gray-600">Aspirazione controllata per stimolare i tessuti e migliorare la circolazione</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-pink-100 p-3 rounded-full">
                      <Droplets className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Pressoterapia</h4>
                      <p className="text-sm text-gray-600">Compressione sequenziale per drenaggio linfatico e riduzione gonfiori</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <RotateCw className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Roll Endermologie</h4>
                      <p className="text-sm text-gray-600">Massaggio meccanico per rimodellamento e tonificazione</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefici Specifici */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Benefici dei <span className="text-purple-600">Trattamenti Combinati</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <Card className="border-2 hover:border-purple-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">Riduzione Cellulite</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Elimina la "buccia d'arancia" e migliora significativamente la texture della pelle su cosce, glutei e fianchi.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-pink-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-pink-600">Drenaggio Linfatico</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Elimina i liquidi in eccesso, riduce gonfiori e migliora la circolazione generale dell'organismo.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-purple-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">Rimodellamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Tonifica e ricompatta i tessuti, migliorando i contorni corporei e l'elasticità della pelle.</p>
                </CardContent>
              </Card>
            </div>

            {/* Testimonianze */}
            <div className="bg-white p-8 rounded-lg border mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Cosa Dicono le Nostre Clienti</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-3">
                    "Dopo 8 sedute la mia cellulite è praticamente sparita. Non ci credevo fosse possibile!"
                  </p>
                  <p className="font-semibold">Giulia, 34 anni</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-3">
                    "Gambe sgonfie e pelle più liscia. I trattamenti sono anche super rilassanti!"
                  </p>
                  <p className="font-semibold">Maria, 41 anni</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-3">
                    "Ho perso 3 cm di circonferenza cosce. Finalmente posso indossare quello che voglio!"
                  </p>
                  <p className="font-semibold">Alessandra, 28 anni</p>
                </div>
              </div>
            </div>

            {/* Piano di Trattamento */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-lg border">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Il Tuo Percorso di Trattamento</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">1</div>
                  <h4 className="font-bold mb-2">Consulenza Gratuita</h4>
                  <p className="text-sm text-gray-600">Valutazione personalizzata delle tue esigenze</p>
                </div>
                <div className="text-center">
                  <div className="bg-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
                  <h4 className="font-bold mb-2">Piano Personalizzato</h4>
                  <p className="text-sm text-gray-600">Combinazione ottimale dei 3 trattamenti</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">3</div>
                  <h4 className="font-bold mb-2">Trattamenti</h4>
                  <p className="text-sm text-gray-600">8-12 sedute per risultati ottimali</p>
                </div>
                <div className="text-center">
                  <div className="bg-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">4</div>
                  <h4 className="font-bold mb-2">Mantenimento</h4>
                  <p className="text-sm text-gray-600">Sedute mensili per conservare i risultati</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServiceFAQSection
          title="Domande Frequenti sui Trattamenti Estetici"
          faqs={faqs}
        />

        <ServiceCTASection
          title="Trasforma il Tuo Corpo"
          description="Prenota una consulenza gratuita e scopri come eliminare cellulite e ritenzione idrica definitivamente"
          primaryButton={{
            text: "Prenota Consulenza Gratuita",
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

export default VacuumPressoterapia;