import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, CheckCircle, Star, Users, Clock, Target } from "lucide-react";
import { ServicePageLayout } from "@/components/layouts/ServicePageLayout";
import { ServiceHeroSection } from "@/components/layouts/ServiceHeroSection";
import { ServiceCTASection } from "@/components/layouts/ServiceCTASection";

const PersonalTraining = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Personal Training Legnago",
    "description": "Personal Training esclusivo a Legnago con risultati garantiti in 30 giorni. Allenamenti 1-to-1 personalizzati, ambiente riservato, zero code.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "MUV Fitness Legnago"
    },
    "areaServed": "Legnago",
    "serviceType": "Personal Training",
    "offers": {
      "@type": "Offer",
      "name": "Prova Gratuita Personal Training",
      "description": "Prima consulenza e valutazione gratuita"
    }
  };

  const whatsappMessage = encodeURIComponent("Ciao! Sono interessato/a al Personal Training. Vorrei prenotare la consulenza gratuita per conoscere i vostri programmi.");

  return (
    <>
      <ServicePageLayout
        title="Personal Training Legnago | Allenamento Personalizzato 1-to-1 – MUV Fitness"
        description="Personal Training esclusivo a Legnago con risultati garantiti in 30 giorni. Allenamenti 1-to-1 personalizzati, ambiente riservato, zero code. Prenota la tua prova gratuita."
        canonical="https://www.muvfitness.it/servizi/personal-training"
        structuredData={structuredData}
        keywords="personal training Legnago, allenamento personalizzato, fitness Legnago, dimagrimento, tonificazione muscolare"
      >
        <ServiceHeroSection
          title="Personal Training Esclusivo"
          description="Risultati garantiti in 30 giorni con allenamenti 1-to-1 completamente personalizzati"
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
            { text: "Personal Training" }
          ]}
        />

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Perché Scegliere il Nostro <span className="text-orange-600">Personal Training</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader className="text-center">
                  <Target className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <CardTitle className="text-xl text-orange-600">Programma Su Misura</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">Ogni allenamento è progettato specificamente per i tuoi obiettivi, il tuo livello e le tue esigenze.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader className="text-center">
                  <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <CardTitle className="text-xl text-orange-600">Ambiente Esclusivo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">Zero code, massima privacy. Ti alleni in un ambiente riservato con attenzione dedicata.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader className="text-center">
                  <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <CardTitle className="text-xl text-orange-600">Risultati Rapidi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">I nostri clienti perdono mediamente 3-5kg al mese e vedono risultati visibili in 2 settimane.</p>
                </CardContent>
              </Card>
            </div>

            {/* Metodologia */}
            <div className="bg-white p-8 rounded-lg border mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">La Nostra Metodologia</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-orange-600 mb-4">1. Valutazione Iniziale Completa</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />Analisi composizione corporea</li>
                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />Test funzionali e posturali</li>
                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />Definizione obiettivi SMART</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-orange-600 mb-4">2. Programmazione Personalizzata</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />Allenamenti adattati alle tue capacità</li>
                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />Progressione scientifica</li>
                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />Monitoraggio costante</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Risultati */}
            <div className="text-center mb-16">
              <h3 className="text-2xl md:text-3xl font-bold mb-8">Risultati <span className="text-orange-600">Garantiti</span></h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg border-2 hover:border-orange-200 transition-all">
                  <div className="text-3xl font-bold text-orange-600 mb-2">-5kg</div>
                  <p className="text-gray-600">Media perdita peso primo mese</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-2 hover:border-orange-200 transition-all">
                  <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
                  <p className="text-gray-600">Clienti soddisfatti</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-2 hover:border-orange-200 transition-all">
                  <div className="text-3xl font-bold text-orange-600 mb-2">30 giorni</div>
                  <p className="text-gray-600">Per vedere i primi risultati</p>
                </div>
              </div>
            </div>

            {/* Local Areas */}
            <div className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Personal Training in Tutta la <span className="text-orange-600">Bassa Veronese</span></h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/personal-trainer-legnago" className="block bg-white p-6 rounded-lg border-2 hover:border-orange-200 transition-all">
                  <h4 className="text-lg font-bold text-orange-600 mb-2">Personal Trainer Legnago</h4>
                  <p className="text-gray-600">Allenamenti personalizzati nel centro di Legnago</p>
                </Link>
                <Link to="/bovolone-fitness" className="block bg-white p-6 rounded-lg border-2 hover:border-orange-200 transition-all">
                  <h4 className="text-lg font-bold text-orange-600 mb-2">Fitness Bovolone</h4>
                  <p className="text-gray-600">Servizi fitness a 15 minuti da Bovolone</p>
                </Link>
                <Link to="/cerea-fitness" className="block bg-white p-6 rounded-lg border-2 hover:border-orange-200 transition-all">
                  <h4 className="text-lg font-bold text-orange-600 mb-2">Fitness Cerea</h4>
                  <p className="text-gray-600">Personal training accessibile da Cerea</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ServiceCTASection
          title="Pronto a Trasformare il Tuo Corpo?"
          description="Prenota una consulenza gratuita e scopri come possiamo aiutarti a raggiungere i tuoi obiettivi"
          primaryButton={{
            text: "Prenota Consulenza Gratuita",
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

export default PersonalTraining;