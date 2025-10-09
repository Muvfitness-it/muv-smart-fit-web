import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Heart, Users, Flower, Star } from "lucide-react";
import { ServicePageLayout } from "@/components/layouts/ServicePageLayout";
import { MinimalHero } from "@/features/hero";
import { ServiceFAQSection } from "@/components/layouts/ServiceFAQSection";
import { ServiceCTASection } from "@/components/layouts/ServiceCTASection";

const PilatesLegnago = () => {
  const canonical = "https://www.muvfitness.it/pilates-legnago/";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.muvfitness.it/" },
          { "@type": "ListItem", "position": 2, "name": "Pilates a Legnago", "item": canonical }
        ]
      },
      {
        "@type": "Service",
        "name": "Pilates a Legnago",
        "serviceType": "Pilates Reformer e Matwork",
        "provider": { "@type": "Organization", "name": "MUV Fitness" },
        "areaServed": [
          "Legnago","Cerea","Bovolone","Nogara","Villa Bartolomea","Minerbe","Castagnaro","Badia Polesine"
        ],
        "url": canonical
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {"@type":"Question","name":"Quante lezioni servono per migliorare la postura?","acceptedAnswer":{"@type":"Answer","text":"I primi benefici si percepiscono in 4–6 settimane con 1–2 lezioni a settimana, in base al punto di partenza."}},
          {"@type":"Question","name":"Reformer o Matwork: cosa scegliere?","acceptedAnswer":{"@type":"Answer","text":"Il Reformer aiuta a guidare il movimento e modulare l'intensità; il Matwork rafforza controllo e consapevolezza. Spesso li alterniamo per un percorso completo."}},
          {"@type":"Question","name":"È adatto se ho dolori lombari?","acceptedAnswer":{"@type":"Answer","text":"Sì, con le dovute precauzioni e dopo la valutazione iniziale. Lavoriamo su mobilità, core stability e respirazione per ridurre il carico sulla zona lombare."}},
          {"@type":"Question","name":"Posso fare una prova?","acceptedAnswer":{"@type":"Answer","text":"Sì, puoi prenotare una lezione di prova per conoscere metodo, trainer e macchinari, senza impegno."}}
        ]
      }
    ]
  };

  const faqs = [
    {
      question: "Quante lezioni servono per migliorare la postura?",
      answer: "I primi benefici si percepiscono in 4–6 settimane con 1–2 lezioni a settimana, in base al punto di partenza. La costanza è la chiave per consolidare i miglioramenti."
    },
    {
      question: "Reformer o Matwork: cosa scegliere?",
      answer: "Il Reformer aiuta a guidare il movimento e modulare l'intensità; il Matwork rafforza controllo e consapevolezza. Spesso alterniamo entrambi per un percorso completo."
    },
    {
      question: "È adatto se ho dolori lombari?",
      answer: "Sì, con le dovute precauzioni e dopo la valutazione iniziale. Lavoriamo su mobilità, core stability e respirazione per ridurre il carico sulla zona lombare."
    },
    {
      question: "Posso fare una prova?",
      answer: "Sì, puoi prenotare una lezione di prova per conoscere metodo, trainer e macchinari, senza impegno."
    }
  ];

  const whatsappMessage = encodeURIComponent("Ciao! Sono interessato/a al Pilates Reformer e Matwork. Vorrei prenotare una lezione di prova per conoscere il programma.");

  return (
    <>
      <ServicePageLayout
        title="Pilates a Legnago | Reformer & Matwork per Postura e Core"
        description="Lezioni individuali e piccoli gruppi. Migliora postura, core e flessibilità con insegnanti qualificati. Prenota ora a Legnago (VR)."
        canonical={canonical}
        structuredData={structuredData}
        keywords="pilates legnago, reformer, matwork, postura, core stability, flessibilità, dolori schiena"
      >
        <MinimalHero
          title="Pilates a Legnago"
          description="Reformer e Matwork per postura, core stability e flessibilità. Lezioni individuali o small group con macchinari professionali."
          gradient="secondary"
          primaryCTA={{
            text: "Prenota Lezione di Prova",
            href: `https://wa.me/393291070374?text=${whatsappMessage}`
          }}
          secondaryCTA={{
            text: "Contattaci",
            href: "/contatti"
          }}
          breadcrumbs={[
            { text: "Home", href: "/" },
            { text: "Pilates a Legnago" }
          ]}
        />

        {/* Perché funziona */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Perché il <span className="text-orange-600">Pilates Funziona</span> per Schiena e Postura
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Il Pilates lavora sul controllo del movimento, sulla stabilità del core e sulla corretta attivazione dei muscoli posturali. Per questo è tra i metodi più efficaci per alleviare fastidi alla schiena, migliorare l'allineamento e sviluppare una forza elegante.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Controllo del movimento e respirazione</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Stabilità del core profondo</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                    <span>Miglioramento dell'allineamento posturale</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg border-2 hover:border-orange-200 transition-all">
                <h3 className="text-2xl font-bold text-center mb-6">Benefici Immediati</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Heart className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Riduzione tensioni muscolari</span>
                  </div>
                  <div className="flex items-center">
                    <Flower className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Maggiore flessibilità</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Controllo e consapevolezza del corpo</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-6 h-6 text-orange-600 mr-3" />
                    <span>Miglioramento della postura quotidiana</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reformer vs Matwork */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="text-orange-600">Reformer vs Matwork:</span> Differenze e Percorsi
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-600">Pilates Reformer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Il Reformer utilizza un carrello scorrevole e molle regolabili per guidare e intensificare il movimento. È ideale per chi cerca supporto nella tecnica, per la progressione controllata e per chi vuole sentire subito il lavoro muscolare in sicurezza.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Supporto e guida nei movimenti</li>
                    <li>• Resistenza variabile con le molle</li>
                    <li>• Ideale per principianti e riabilitazione</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-600">Pilates Matwork</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Il Matwork si svolge a corpo libero su tappetino e sviluppa controllo, equilibrio e consapevolezza. È perfetto per costruire basi solide e per mantenere i benefici nel tempo, anche con semplici routine a casa.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Sviluppo del controllo propriocettivo</li>
                    <li>• Lavoro a corpo libero</li>
                    <li>• Costruzione di basi solide</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Trainer qualificati */}
            <div className="bg-gray-50 p-8 rounded-lg border mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Trainer Qualificati MUV</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-orange-600 mb-4">Competenza e Esperienza</h4>
                  <p className="text-gray-600 mb-4">
                    Le lezioni sono tenute da insegnanti qualificati che curano tecnica, respirazione e progressione. Ogni dettaglio è pensato per farti lavorare in sicurezza e ottenere benefici concreti.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-orange-600 mb-4">Dalla Valutazione alla Progressione</h4>
                  <p className="text-gray-600">
                    Prima lezione: valutazione posturale e definizione degli obiettivi. Quindi costruiamo un percorso su misura, con richiami periodici per verificare miglioramenti e calibrare intensità e difficoltà degli esercizi.
                  </p>
                </div>
              </div>
            </div>

            {/* Percorsi personalizzati */}
            <div className="mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Percorsi Personalizzati</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-2 hover:border-orange-200 transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-600">Mal di Schiena</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Percorsi specifici per alleviare dolori ricorrenti e migliorare la stabilità lombare.</p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-orange-200 transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-600">Lavoro Sedentario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Combatti la rigidità da scrivania con esercizi mirati per mobilità e postura.</p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-orange-200 transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-600">Sport e Danza</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Preparazione fisica e prevenzione infortuni per atleti e danzatori.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <ServiceFAQSection
          title="Domande Frequenti sul Pilates"
          faqs={faqs}
        />

        <ServiceCTASection
          title="Inizia il Tuo Percorso Pilates"
          description="Prenota una lezione di prova per conoscere metodo, trainer e macchinari, senza impegno"
          primaryButton={{
            text: "Prenota Lezione di Prova",
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

export default PilatesLegnago;
