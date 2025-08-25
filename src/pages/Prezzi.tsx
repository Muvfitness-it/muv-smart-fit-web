import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Check, Euro, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/contact/ContactForm";
import SEOOptimizer from "@/components/SEO/SEOOptimizer";

const Prezzi = () => {
  const pageTitle = "Prezzi e Pacchetti MUV Legnago – Percorsi Fitness su Misura";
  const pageDescription = "EMS, Personal Training, Pancafit, Pilates e Cellulite Treatment a Legnago. Pacchetti mensili e soluzioni su misura. Prima consulenza GRATUITA. Prenota ora.";
  
  const whatsappMessage = encodeURIComponent("Ciao! Vorrei informazioni sui prezzi e pacchetti MUV Fitness.");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Prezzi e Pacchetti MUV Fitness Legnago",
    "description": pageDescription,
    "url": "https://www.muvfitness.it/prezzi",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "MUV Fitness Legnago",
      "offers": [
        {
          "@type": "Offer",
          "name": "EMS Training",
          "description": "Allenamento con elettrostimolazione muscolare - 20 minuti = 90 min palestra tradizionale"
        },
        {
          "@type": "Offer", 
          "name": "Personal Training",
          "description": "Allenamento personalizzato 1:1 o Small Group con trainer qualificati"
        },
        {
          "@type": "Offer",
          "name": "Pancafit & Postura",
          "description": "Trattamento posturale per mal di schiena e tensioni muscolari"
        }
      ]
    }
  };

  return (
    <>
      <SEOOptimizer
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="https://www.muvfitness.it/prezzi"
        structuredData={structuredData}
      />

      <main className="pt-16">
        <section className="py-16 bg-gradient-to-br from-gray-900 to-purple-900">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Pacchetti chiari, risultati misurabili
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Scegli il percorso più adatto ai tuoi obiettivi
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* EMS Package */}
              <Card className="relative">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600">
                  Più Richiesto
                </Badge>
                <CardHeader className="text-center">
                  <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle>EMS Training</CardTitle>
                  <p className="text-gray-600">20 minuti = 90 min palestra</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold">Prova Gratuita</p>
                      <p className="text-sm text-gray-600">Prima sessione inclusa</p>
                    </div>
                    <div>
                      <p className="font-semibold">Pacchetto 8 sessioni</p>
                      <p className="text-sm text-gray-600">2 volte/settimana x 1 mese</p>
                    </div>
                    <div>
                      <p className="font-semibold">Pacchetto 12 sessioni</p>
                      <p className="text-sm text-gray-600">Per risultati duraturi</p>
                    </div>
                  </div>
                  <Button asChild className="w-full mt-6">
                    <a href={`https://wa.me/393513380770?text=${whatsappMessage}`} target="_blank">
                      Richiedi Prezzi
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Personal Training */}
              <Card>
                <CardHeader className="text-center">
                  <Euro className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <CardTitle>Personal Training</CardTitle>
                  <p className="text-gray-600">1:1 o Small Group</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold">Consulenza Gratuita</p>
                      <p className="text-sm text-gray-600">Valutazione + programma</p>
                    </div>
                    <div>
                      <p className="font-semibold">PT 1:1</p>
                      <p className="text-sm text-gray-600">Attenzione esclusiva</p>
                    </div>
                    <div>
                      <p className="font-semibold">Small Group (5-6)</p>
                      <p className="text-sm text-gray-600">Costi contenuti</p>
                    </div>
                  </div>
                  <Button asChild className="w-full mt-6" variant="outline">
                    <Link to="/contatti">Scopri Prezzi</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Pancafit */}
              <Card>
                <CardHeader className="text-center">
                  <Check className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <CardTitle>Pancafit & Postura</CardTitle>
                  <p className="text-gray-600">Stop mal di schiena</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold">Valutazione Gratuita</p>
                      <p className="text-sm text-gray-600">Analisi posturale completa</p>
                    </div>
                    <div>
                      <p className="font-semibold">Ciclo 6 sedute</p>
                      <p className="text-sm text-gray-600">Primi risultati</p>
                    </div>
                    <div>
                      <p className="font-semibold">Ciclo 12 sedute</p>
                      <p className="text-sm text-gray-600">Riequilibrio completo</p>
                    </div>
                  </div>
                  <Button asChild className="w-full mt-6" variant="outline">
                    <Link to="/contatti">Richiedi Info</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Cellulite */}
              <Card>
                <CardHeader className="text-center">
                  <Euro className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                  <CardTitle>Cellulite Treatment</CardTitle>
                  <p className="text-gray-600">Vacuum + Pressoterapia</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold">Valutazione Gratuita</p>
                      <p className="text-sm text-gray-600">Analisi + prima seduta</p>
                    </div>
                    <div>
                      <p className="font-semibold">Programma 6 settimane</p>
                      <p className="text-sm text-gray-600">Risultati visibili</p>
                    </div>
                    <div>
                      <p className="font-semibold">Programma 8 settimane</p>
                      <p className="text-sm text-gray-600">Trasformazione completa</p>
                    </div>
                  </div>
                  <Button asChild className="w-full mt-6" variant="outline">
                    <Link to="/contatti">Prenota Ora</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Richiedi il Tuo Preventivo</h2>
                <p className="text-gray-600">Ti richiamiamo entro 10 minuti negli orari di apertura</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Prezzi;