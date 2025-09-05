import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, CheckCircle, Clock, TrendingUp, Target, Heart, Flame } from "lucide-react";
import { ServicePageLayout } from "@/components/layouts/ServicePageLayout";
import { ServiceHeroSection } from "@/components/layouts/ServiceHeroSection";
import { ServiceFAQSection } from "@/components/layouts/ServiceFAQSection";
import { ServiceCTASection } from "@/components/layouts/ServiceCTASection";

const HIIT = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Allenamento HIIT Legnago",
    "description": "Allenamento HIIT ad alta intensità a Legnago. Brucia grassi, migliora resistenza e accelera il metabolismo in sessioni da 30-45 minuti.",
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
    "serviceType": "Allenamento HIIT"
  };

  const faqs = [
    {
      question: "Cos'è l'allenamento HIIT e perché è così efficace?",
      answer: "HIIT (High Intensity Interval Training) alterna brevi periodi di esercizio intenso a fasi di recupero. È efficace perché brucia grassi anche 24 ore dopo l'allenamento e migliora rapidamente la resistenza cardiovascolare."
    },
    {
      question: "Quanto dura una sessione HIIT a Legnago?",
      answer: "Le nostre sessioni HIIT durano 30-45 minuti, includendo riscaldamento e defaticamento. Questo tempo è sufficiente per ottenere risultati superiori a un'ora di cardio tradizionale."
    },
    {
      question: "L'allenamento HIIT è adatto a principianti?",
      answer: "Sì, l'HIIT è adattabile a tutti i livelli. I nostri trainer personalizzano intensità e esercizi in base alla tua forma fisica, garantendo progressi sicuri e costanti."
    },
    {
      question: "Quante calorie si bruciano con l'HIIT?",
      answer: "Durante una sessione HIIT si bruciano 400-600 calorie, ma l'effetto continua per 24-48 ore grazie all'EPOC (consumo eccessivo di ossigeno post-esercizio)."
    },
    {
      question: "Quante volte a settimana posso fare HIIT?",
      answer: "Per risultati ottimali raccomandiamo 3-4 sessioni settimanali, con almeno un giorno di riposo tra le sessioni per permettere il recupero completo."
    }
  ];

  const whatsappMessage = encodeURIComponent("Ciao! Sono interessato/a all'allenamento HIIT. Vorrei prenotare una prova gratuita per conoscere il programma.");

  return (
    <>
      <ServicePageLayout
        title="Allenamento HIIT Legnago | Training Alta Intensità MUV Fitness"
        description="Allenamento HIIT a Legnago: brucia grassi, aumenta resistenza e accelera metabolismo. Training ad alta intensità per risultati rapidi. Prova gratuita!"
        keywords="allenamento HIIT Legnago, training alta intensità, brucia grassi, fitness Legnago, cardio intenso, metabolismo"
        canonical="https://www.muvfitness.it/servizi/hiit"
        structuredData={structuredData}
      >
        <ServiceHeroSection
          title="Allenamento HIIT Legnago"
          description="Training ad alta intensità per bruciare grassi e migliorare le performance"
          primaryButton={{
            text: "Prenota HIIT Gratuito",
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
            { text: "HIIT Training" }
          ]}
        />

        {/* Cosa è HIIT */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Cos'è l'<span className="text-orange-600">Allenamento HIIT</span>?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  HIIT (High Intensity Interval Training) è il metodo di allenamento più efficace per chi vuole 
                  risultati massimi in tempi ridotti. Alternando fasi di massima intensità a brevi recuperi, 
                  trasforma il tuo corpo in una macchina brucia-grassi 24 ore su 24.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Brucia grassi fino a 48 ore dopo l'allenamento</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Migliora la resistenza cardiovascolare del 20%</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Aumenta il metabolismo basale permanentemente</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Risultati superiori al cardio tradizionale</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg border-2 hover:border-orange-200 transition-all">
                <h3 className="text-2xl font-bold text-center mb-6">Perché HIIT Funziona</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="font-semibold">Tempo Efficiente</p>
                    <p className="text-sm text-gray-500">30-45 minuti</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="font-semibold">Afterburn</p>
                    <p className="text-sm text-gray-500">24-48h brucia grassi</p>
                  </div>
                  <div className="text-center">
                    <Heart className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="font-semibold">Cardio Potente</p>
                    <p className="text-sm text-gray-500">+20% resistenza</p>
                  </div>
                  <div className="text-center">
                    <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="font-semibold">Performance</p>
                    <p className="text-sm text-gray-500">Atletiche</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefici HIIT */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Benefici dell'<span className="text-orange-600">Allenamento HIIT</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Dimagrimento Esplosivo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Bruci più calorie in meno tempo e continui a bruciare anche ore dopo l'allenamento grazie all'effetto EPOC.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Resistenza Cardiovascolare</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Migliora drasticamente la capacità del cuore e dei polmoni, aumentando la resistenza nella vita quotidiana.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Performance Atletiche</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Aumenta velocità, potenza esplosiva e resistenza per ogni disciplina sportiva.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Metabolismo Accelerato</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Incrementa il metabolismo basale, permettendo di bruciare più calorie anche a riposo.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Efficienza Temporale</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Ottieni risultati superiori a un'ora di cardio tradizionale in soli 30-45 minuti.</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">Versatilità Completa</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Adattabile a tutti i livelli di fitness con progressioni personalizzate.</p>
                </CardContent>
              </Card>
            </div>

            {/* Metodologia HIIT */}
            <div className="bg-white p-8 rounded-lg border mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Il Nostro Metodo HIIT</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Riscaldamento</h4>
                  <p className="text-sm text-gray-600">Preparazione muscolare e cardiovascolare graduale</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Intensità Massima</h4>
                  <p className="text-sm text-gray-600">20-40 secondi di esercizio ad alta intensità</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Recupero Attivo</h4>
                  <p className="text-sm text-gray-600">10-20 secondi di recupero controllato</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Defaticamento</h4>
                  <p className="text-sm text-gray-600">Ritorno graduale alla normalità</p>
                </div>
              </div>
            </div>

            {/* Perfetto Per */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-600">HIIT è Perfetto Per Te Se...</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                      <span>Vuoi dimagrire velocemente</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                      <span>Hai poco tempo per allenarti</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                      <span>Vuoi migliorare le performance sportive</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                      <span>Cerchi un allenamento stimolante</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-600">Risultati Tipici HIIT</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Perdita peso accelerata (1-2 kg/settimana)</li>
                    <li>• Miglioramento resistenza (15-20%)</li>
                    <li>• Riduzione grasso corporeo visibile</li>
                    <li>• Aumento energia quotidiana</li>
                    <li>• Miglioramento umore e stress</li>
                    <li>• Performance atletiche superiori</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <ServiceFAQSection
          title="Domande Frequenti sul HIIT a Legnago"
          faqs={faqs}
        />

        <ServiceCTASection
          title="Sfida Te Stesso con l'HIIT"
          description="Prova una sessione HIIT gratuita da MUV Fitness Legnago e scopri il tuo vero potenziale"
          primaryButton={{
            text: "Prenota HIIT Gratuito",
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

export default HIIT;