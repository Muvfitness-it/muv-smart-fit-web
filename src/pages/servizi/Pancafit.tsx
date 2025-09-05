import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, CheckCircle, User, Shield, Target } from "lucide-react";
import { ServicePageLayout } from "@/components/layouts/ServicePageLayout";
import { ServiceHeroSection } from "@/components/layouts/ServiceHeroSection";
import { ServiceCTASection } from "@/components/layouts/ServiceCTASection";
import PancafitInfographic from "@/components/infographics/PancafitInfographic";

const Pancafit = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Pancafit Legnago",
    "description": "Pancafit a Legnago per eliminare il mal di schiena e migliorare la postura. 95% di successo nel risolvere dolori cronici.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "MUV Fitness Legnago"
    },
    "areaServed": "Legnago",
    "serviceType": "Pancafit"
  };

  const whatsappMessage = encodeURIComponent("Ciao! Sono interessato/a al Pancafit. Vorrei prenotare una valutazione posturale gratuita.");

  return (
    <>
      <ServicePageLayout
        title="Pancafit Legnago | Mal di Schiena, Postura, Riallineamento – MUV Fitness"
        description="Pancafit a Legnago per eliminare il mal di schiena e migliorare la postura. 95% di successo nel risolvere dolori cronici. Prenota la tua sessione."
        canonical="https://www.muvfitness.it/servizi/pancafit"
        structuredData={structuredData}
        keywords="pancafit Legnago, mal di schiena, postura, riallineamento, dolori cronici"
      >
        <ServiceHeroSection
          title="Pancafit per Mal di Schiena"
          description="95% di successo nell'eliminare i dolori cronici e riallineare la postura"
          primaryButton={{
            text: "Prenota Valutazione Posturale",
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
            { text: "Pancafit" }
          ]}
        />

        {/* Infografica Pancafit */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <PancafitInfographic />
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Cos'è il <span className="text-orange-600">Metodo Pancafit</span>?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Pancafit è un metodo di riequilibrio posturale che agisce sulle catene muscolari e fasciali per eliminare le tensioni e gli scompensi che causano dolore e limitazioni funzionali.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Elimina le cause del dolore, non solo i sintomi</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Ripristina l'equilibrio muscolo-scheletrico</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Migliora la funzionalità generale del corpo</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg border-2 hover:border-orange-200 transition-all">
                <h3 className="text-2xl font-bold text-center mb-6">Problemi che Risolviamo</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Shield className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Mal di schiena cronico</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Cervicalgia e torcicollo</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Lombalgia e sciatalgia</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Dolori articolari</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Tensioni muscolari</span>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Benefici del <span className="text-orange-600">Metodo Pancafit</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Eliminazione del Dolore</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Risoluzione definitiva di dolori cronici che limitano la qualità della vita.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Postura Corretta</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Riallineamento della colonna vertebrale e miglioramento della postura generale.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Maggiore Flessibilità</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Aumento significativo dell'elasticità muscolare e della mobilità articolare.</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white p-8 rounded-lg border mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Risultati Comprovati</h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
                  <p className="text-gray-600">Successo nell'eliminare il dolore</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-600 mb-2">3-5</div>
                  <p className="text-gray-600">Sessioni per vedere miglioramenti</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
                  <p className="text-gray-600">Clienti soddisfatti del trattamento</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServiceCTASection
          title="Liberati dal Dolore"
          description="Prenota una valutazione posturale gratuita e scopri come Pancafit può aiutarti"
          primaryButton={{
            text: "Prenota Valutazione Gratuita",
            href: `https://wa.me/393291070374?text=${whatsappMessage}`,
            isExternal: true
          }}
          secondaryButton={{
            text: "Contattaci",
            href: "/contatti"
          }}
        />
      </ServicePageLayout>
    </>
  );
};

export default Pancafit;