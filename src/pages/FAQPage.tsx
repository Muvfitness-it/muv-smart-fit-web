import React from 'react';
import { Helmet } from 'react-helmet';
import BreadcrumbNavigation from '@/components/SEO/BreadcrumbNavigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, MapPin, Clock } from 'lucide-react';

const FAQPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quanto dura una seduta di allenamento EMS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Una sessione EMS dura circa 20 minuti di allenamento attivo, per un totale di 30-35 minuti inclusi preparazione e defaticamento."
        }
      },
      {
        "@type": "Question", 
        "name": "L'allenamento EMS è sicuro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sì, l'EMS è completamente sicuro quando eseguito da personale qualificato. Utilizziamo macchinari certificati e protocolli professionali."
        }
      }
    ]
  };

  const faqCategories = [
    {
      title: "Allenamento EMS",
      icon: "⚡",
      faqs: [
        {
          question: "Quanto dura una sessione di allenamento EMS?",
          answer: "Una sessione di allenamento EMS dura 20 minuti di stimolazione attiva, per un totale di 30-35 minuti includendo preparazione e defaticamento. È l'equivalente di 4 ore di palestra tradizionale!"
        },
        {
          question: "L'allenamento EMS è sicuro?",
          answer: "Assolutamente sì! L'EMS è completamente sicuro quando eseguito da personale qualificato con macchinari certificati. I nostri trainer sono specializzati e la supervisione è costante durante tutta la sessione."
        },
        {
          question: "Chi può fare EMS e ci sono controindicazioni?",
          answer: "L'EMS è adatto a persone dai 18 anni in su, sia principianti che atleti avanzati. Le principali controindicazioni includono gravidanza, pacemaker, epilessia e alcune patologie cardiache. Durante la consulenza gratuita valutiamo sempre la tua situazione specifica."
        },
        {
          question: "Quando vedrò i primi risultati con l'EMS?",
          answer: "I primi cambiamenti sono percepibili già dopo 2-3 settimane, con miglioramenti significativi in termini di forza e tonicità muscolare. Per risultati ottimali si consiglia un percorso di almeno 8-12 settimane."
        }
      ]
    },
    {
      title: "Vacuum Pressoterapia",
      icon: "💧",
      faqs: [
        {
          question: "Cos'è la vacuum pressoterapia e come funziona?",
          answer: "La vacuum pressoterapia utilizza pressione negativa controllata per stimolare il drenaggio linfatico, migliorare la circolazione e ridurre cellulite e ritenzione idrica. È un trattamento completamente rilassante e piacevole."
        },
        {
          question: "Quanto dura una seduta di vacuum?",
          answer: "Una seduta di vacuum pressoterapia dura tipicamente 45-60 minuti. Durante il trattamento puoi rilassarti completamente mentre la tecnologia fa il suo lavoro."
        },
        {
          question: "Quante sedute servono per vedere risultati?",
          answer: "I primi benefici sono percepibili già dalla prima seduta (gambe più leggere, riduzione del gonfiore). Per risultati duraturi si consigliano cicli di 8-12 sedute, 2-3 volte a settimana."
        }
      ]
    },
    {
      title: "Pilates Reformer",
      icon: "🧘‍♀️",
      faqs: [
        {
          question: "Cos'è il Pilates Reformer?",
          answer: "Il Reformer è un attrezzo specifico del Pilates che utilizza un sistema di molle e carrelli per fornire resistenza variabile, permettendo movimenti fluidi e controllati. È perfetto per migliorare postura, flessibilità e forza core."
        },
        {
          question: "È adatto ai principianti?",
          answer: "Assolutamente sì! Il Reformer è ideale per i principianti perché permette di graduare l'intensità e fornisce supporto durante gli esercizi. I nostri istruttori adattano ogni movimento al tuo livello."
        },
        {
          question: "Il Pilates Reformer aiuta con il mal di schiena?",
          answer: "Sì, il Pilates Reformer è particolarmente efficace per chi soffre di mal di schiena. Rafforza i muscoli stabilizzatori della colonna, migliora la postura e riduce le tensioni muscolari."
        }
      ]
    },
    {
      title: "Consulenza Nutrizionale",
      icon: "🍎",
      faqs: [
        {
          question: "Come si svolge la prima consulenza nutrizionale?",
          answer: "La prima visita dura circa 60 minuti. La nostra nutrizionista analizza le tue abitudini alimentari, obiettivi, stile di vita e eventuali problematiche. Include misurazioni antropometriche e definizione del piano personalizzato."
        },
        {
          question: "Il piano alimentare è restrittivo?",
          answer: "Assolutamente no! Creiamo piani equilibrati e sostenibili che tengono conto dei tuoi gusti e del tuo stile di vita. L'obiettivo è creare abitudini durature, non privazioni temporanee."
        },
        {
          question: "Come si integra con l'allenamento?",
          answer: "La nutrizione è perfettamente integrata con i tuoi allenamenti da MUV. Coordiniamo alimentazione e training per massimizzare i risultati di entrambi, ottimizzando anche pre e post workout."
        }
      ]
    },
    {
      title: "Prezzi e Modalità",
      icon: "💰",
      faqs: [
        {
          question: "Quanto costano i servizi di MUV Fitness?",
          answer: "I prezzi variano in base al servizio e al pacchetto scelto. Offriamo soluzioni per tutte le esigenze, dalle sedute singole ai pacchetti mensili. Contattaci per un preventivo personalizzato e scopri le nostre promozioni attuali."
        },
        {
          question: "Posso combinare più servizi?",
          answer: "Certamente! È proprio quello che consigliamo per risultati ottimali. Creiamo percorsi personalizzati che combinano EMS, vacuum, Pilates Reformer e consulenza nutrizionale in base ai tuoi obiettivi specifici."
        },
        {
          question: "Ci sono promozioni per nuovi clienti?",
          answer: "Sì! Offriamo sempre una prova gratuita per nuovi clienti. Inoltre, abbiamo promozioni stagionali e pacchetti scontati per chi sceglie percorsi più lunghi. Chiedi al nostro staff per le offerte attuali."
        },
        {
          question: "Posso sospendere o disdire l'abbonamento?",
          answer: "Sì, offriamo massima flessibilità. Puoi sospendere l'abbonamento per motivi validi (malattia, viaggi) o disdire con il giusto preavviso. La trasparenza e la soddisfazione del cliente sono le nostre priorità."
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Domande Frequenti - MUV Fitness Legnago | EMS, Vacuum, Pilates</title>
        <meta name="description" content="Risposte alle domande più frequenti su allenamento EMS, vacuum pressoterapia e Pilates Reformer a Legnago. Chiarimenti su prezzi e modalità." />
        <meta name="keywords" content="FAQ MUV Fitness, domande EMS Legnago, info vacuum pressoterapia, Pilates Reformer info, prezzi palestra Legnago" />
        <link rel="canonical" href="https://www.muvfitness.it/domande-frequenti" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Domande Frequenti - MUV Fitness Legnago" />
        <meta property="og:description" content="Trova risposte a tutte le tue domande sui nostri servizi EMS, Vacuum, Pilates Reformer e consulenza nutrizionale." />
        <meta property="og:url" content="https://www.muvfitness.it/domande-frequenti" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <BreadcrumbNavigation />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4">
              <MessageCircle className="h-4 w-4 mr-2" />
              Centro Assistenza
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Domande Frequenti
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Trova risposte immediate alle domande più comuni sui nostri servizi. 
              Se non trovi quello che cerchi, contattaci direttamente!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg">
                <Phone className="h-5 w-5 mr-2" />
                Chiama Ora
              </Button>
              <Button variant="outline" size="lg">
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat WhatsApp
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="text-center mb-8">
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                  </div>
                  
                  <Card className="max-w-4xl mx-auto">
                    <CardContent className="p-6">
                      <Accordion type="single" collapsible className="space-y-2">
                        {category.faqs.map((faq, faqIndex) => (
                          <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`} className="border rounded-lg px-4">
                            <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground pb-4">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Non hai trovato la risposta?</h2>
              <p className="text-lg text-muted-foreground">
                Il nostro team è sempre pronto ad aiutarti. Contattaci nel modo che preferisci!
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Telefono</h3>
                  <p className="text-sm text-muted-foreground mb-4">Chiamaci per info immediate</p>
                  <Button variant="outline" size="sm" className="w-full">
                    +39 349 123 4567
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <MessageCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground mb-4">Chat diretta con il team</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Apri Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Visita in Centro</h3>
                  <p className="text-sm text-muted-foreground mb-4">Vieni a trovarci di persona</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Ottieni Indicazioni
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Orari</h3>
                  <p className="text-sm text-muted-foreground mb-4">Siamo sempre disponibili</p>
                  <div className="text-xs space-y-1">
                    <div>Lun-Ven: 7:00-22:00</div>
                    <div>Sab: 8:00-20:00</div>
                    <div>Dom: 9:00-19:00</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Pronto a Iniziare?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Tutte le tue domande avranno risposta durante la prova gratuita. 
                Prenota ora e scopri perché siamo il centro fitness più amato di Legnago!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="flex-1 sm:flex-none">
                  Prenota Prova Gratuita
                </Button>
                <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                  Scopri i Servizi
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FAQPage;