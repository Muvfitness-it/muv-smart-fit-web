import { Helmet } from 'react-helmet';
import { MinimalHero } from '@/features/hero';
import ComparisonTable, { ComparisonRow } from '@/components/shared/ComparisonTable';
import KitZeroPensieri from '@/components/shared/KitZeroPensieri';
import FAQAccordion, { FAQItem } from '@/components/shared/FAQAccordion';
import { Card } from '@/components/ui/card';
import { Target, TrendingUp, LineChart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PercheMUV = () => {
  const confronto: ComparisonRow[] = [
    {
      feature: "Valutazione iniziale personalizzata (gratuita)",
      traditional: false,
      muv: true
    },
    {
      feature: "Programma su misura per i tuoi obiettivi",
      traditional: false,
      muv: true
    },
    {
      feature: "Allenamento EMS con tecnologia Miha Bodytec",
      traditional: false,
      muv: true
    },
    {
      feature: "Pilates Reformer con istruttore dedicato",
      traditional: false,
      muv: true
    },
    {
      feature: "Vacuum & Pressoterapia professionale",
      traditional: false,
      muv: true
    },
    {
      feature: "Sauna Infrarossi per il recupero",
      traditional: false,
      muv: true
    },
    {
      feature: "Pancafit per postura e mal di schiena",
      traditional: false,
      muv: true
    },
    {
      feature: "Piano nutrizionale personalizzato",
      traditional: false,
      muv: true
    },
    {
      feature: "Coaching psicologico incluso",
      traditional: false,
      muv: true
    },
    {
      feature: "Kit Zero Pensieri (asciugamani + vestiario)",
      traditional: false,
      muv: true,
      highlight: true
    },
    {
      feature: "Ambiente non affollato (max 4 persone)",
      traditional: false,
      muv: true
    },
    {
      feature: "Supporto WhatsApp dedicato 7/7",
      traditional: false,
      muv: true
    },
    {
      feature: "Monitoraggio continuo dei progressi",
      traditional: false,
      muv: true
    },
    {
      feature: "Sala pesi generica e affollata",
      traditional: true,
      muv: false
    },
    {
      feature: "Abbonamenti annuali vincolanti",
      traditional: true,
      muv: false
    }
  ];

  const metodologia = [
    {
      icon: Target,
      title: "Valutazione Iniziale",
      description: "Analisi completa della composizione corporea, postura e obiettivi personali. Definiamo insieme il percorso migliore per te."
    },
    {
      icon: TrendingUp,
      title: "Programma Personalizzato",
      description: "Non esistono allenamenti standard da noi. Ogni sessione è progettata sulle tue esigenze, capacità e obiettivi specifici."
    },
    {
      icon: LineChart,
      title: "Monitoraggio Costante",
      description: "Verifichiamo i progressi con dati oggettivi: peso, circonferenze, massa magra/grassa. Adattiamo il programma per risultati ottimali."
    },
    {
      icon: Heart,
      title: "Approccio Olistico",
      description: "Non solo allenamento: integriamo nutrizione, supporto psicologico e tecnologie avanzate per una trasformazione a 360°."
    }
  ];

  const testimonials = [
    {
      text: "In palestra mi sentivo solo un numero. Da MUV ogni sessione è seguita personalmente e ho finalmente ottenuto i risultati che cercavo da anni.",
      author: "Giulia M.",
      result: "-12kg in 3 mesi"
    },
    {
      text: "Il Kit Zero Pensieri è geniale. Vengo in pausa pranzo e trovo tutto pronto: asciugamani, vestiario, doccia. Zero stress, solo allenamento.",
      author: "Marco T.",
      result: "Cliente da 2 anni"
    },
    {
      text: "Soffrivo di mal di schiena cronico. Con Pancafit e il supporto costante del team, ho risolto problemi che avevo da 10 anni.",
      author: "Stefania R.",
      result: "Dolore ridotto del 90%"
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: "Cosa include il Kit Zero Pensieri?",
      answer: "Il Kit Zero Pensieri è la nostra soluzione per eliminare ogni preoccupazione: ti forniamo asciugamani da doccia e palestra, vestiario tecnico completo per allenarti, prodotti doccia professionali e, quando necessario, anche borraccia e integratori. Vieni e pensa solo al tuo allenamento."
    },
    {
      question: "Devo portare qualcosa per allenarmi?",
      answer: "No, assolutamente niente. Forniamo tutto il necessario: abbigliamento tecnico, scarpe da training se serve, asciugamani e prodotti per la doccia. Molti clienti vengono direttamente dall'ufficio in pausa pranzo senza problemi."
    },
    {
      question: "Quanto dura una sessione tipo da MUV?",
      answer: "Una sessione standard dura 50-60 minuti: 10 minuti preparazione e valutazione, 30-40 minuti allenamento intenso e personalizzato, 10 minuti defaticamento. Con l'EMS, 20 minuti equivalgono a 3 ore di palestra tradizionale."
    },
    {
      question: "Posso venire solo per provare?",
      answer: "Sì! Offriamo una prova gratuita completa di 90 minuti che include: valutazione iniziale (composizione corporea + postura), consulenza personalizzata, sessione trial con la tecnologia scelta (EMS o Reformer). Zero impegno, zero costi nascosti."
    },
    {
      question: "MUV è adatto ai principianti?",
      answer: "Assolutamente sì. Il 60% dei nostri clienti arriva da noi senza esperienza pregressa in palestra. Ogni programma parte dal tuo livello attuale e progredisce gradualmente. Segui sempre personalmente da un trainer dedicato."
    },
    {
      question: "Posso allenarmi in qualsiasi orario?",
      answer: "Lavoriamo su appuntamento per garantire attenzione personalizzata. Siamo aperti da lunedì a sabato, 7:00-21:00. Puoi prenotare la fascia oraria che preferisci, molti clienti si allenano in pausa pranzo (12:00-14:00) o dopo lavoro (18:00-20:00)."
    },
    {
      question: "Cosa rende MUV davvero diverso da una palestra?",
      answer: "In una palestra tradizionale compri accesso a una sala con macchine. Da MUV acquisti una trasformazione guidata: valutazione scientifica, programma personalizzato, tecnologie avanzate (EMS, Reformer, Sauna), supporto nutrizionale e psicologico, monitoraggio continuo. Non vendiamo abbonamenti, creiamo risultati."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Perché MUV Non È Una Palestra Tradizionale | Fitness Personalizzato Legnago</title>
        <meta 
          name="description" 
          content="Scopri cosa rende MUV unico: valutazione personalizzata, tecnologie avanzate EMS e Pilates Reformer, Kit Zero Pensieri e risultati garantiti. Non una palestra, un'esperienza di trasformazione a Legnago." 
        />
        <meta 
          name="keywords" 
          content="MUV vs palestra tradizionale, fitness personalizzato Legnago, kit zero pensieri, EMS Legnago, allenamento personalizzato, personal training Legnago" 
        />
        <link rel="canonical" href="https://www.muvfitness.it/perche-muv" />
        <meta property="og:title" content="Perché MUV Non È Una Palestra Tradizionale | Fitness Personalizzato Legnago" />
        <meta property="og:description" content="Scopri cosa rende MUV unico: valutazione personalizzata, tecnologie avanzate, Kit Zero Pensieri e risultati garantiti." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.muvfitness.it/perche-muv" />
      </Helmet>
      
      {/* Hero */}
      <MinimalHero
        title="Perché MUV Non È Una Palestra Tradizionale"
        subtitle="Non Vendiamo Abbonamenti, Creiamo Trasformazioni"
        description="Scopri cosa ci rende unici e perché centinaia di clienti a Legnago hanno scelto di allenarsi diversamente"
        primaryCTA={{
          text: "Prenota la Tua Prova Gratuita",
          href: "/contatti"
        }}
        secondaryCTA={{
          text: "Scopri il Metodo MUV",
          href: "/metodo"
        }}
      />
      
      {/* Intro Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-body-lg leading-relaxed text-muted-foreground mb-6">
              Le palestre tradizionali vendono <strong className="text-foreground">spazi generici</strong> con macchine e sale affollate. 
              Ti danno un abbonamento e ti lasciano solo a capire cosa fare.
            </p>
            <p className="text-body-lg leading-relaxed text-foreground font-semibold mb-6">
              Noi lavoriamo diversamente.
            </p>
            <p className="text-body-lg leading-relaxed text-muted-foreground">
              MUV è un <strong className="text-accent">centro di trasformazione personalizzata</strong> dove ogni cliente ha un programma su misura, 
              tecnologie avanzate, supporto costante e un team dedicato ai suoi risultati. 
              Non sei un numero, sei <em>tu</em> con i tuoi obiettivi unici.
            </p>
          </div>
        </div>
      </section>
      
      {/* Comparison Table */}
      <ComparisonTable 
        rows={confronto}
        title="La Differenza È Evidente"
        description="Confronta cosa offre una palestra tradizionale e cosa trovi da MUV"
      />
      
      {/* Kit Zero Pensieri */}
      <KitZeroPensieri />
      
      {/* Metodologia MUV */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-heading-lg text-center mb-4">
              Il Metodo MUV in 4 Fasi
            </h2>
            <p className="text-body-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Come trasformiamo i tuoi obiettivi in risultati concreti e misurabili
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metodologia.map((fase, index) => {
                const Icon = fase.icon;
                return (
                  <Card key={index} className="p-6 border-2 border-border hover:border-primary/50 transition-all hover:shadow-lg">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                      </div>
                      <h3 className="text-heading-sm mb-3">
                        {fase.title}
                      </h3>
                      <p className="text-body-sm text-muted-foreground">
                        {fase.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-heading-lg text-center mb-4">
              Cosa Dicono i Nostri Clienti
            </h2>
            <p className="text-body-lg text-center text-muted-foreground mb-12">
              Esperienze reali di chi ha scelto MUV invece della palestra tradizionale
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 border-l-4 border-accent">
                  <p className="text-body-md text-muted-foreground italic mb-4">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-primary font-medium">{testimonial.result}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Finale */}
      <section className="section-padding bg-gradient-to-br from-accent via-primary to-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-heading-lg mb-4 text-white">
              Vieni a Provare La Differenza
            </h2>
            <p className="text-body-lg mb-8 text-white/95">
              Prima visita completamente gratuita: valutazione completa, consulenza personalizzata e sessione trial. 
              Nessun impegno, nessun costo nascosto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-6"
              >
                <Link to="/contatti">
                  Prenota Prova Gratuita
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-6"
              >
                <a href="tel:+393291070374">
                  Chiamaci: 329 107 0374
                </a>
              </Button>
            </div>
            <p className="text-sm text-white/80 mt-6">
              Oltre 500 clienti soddisfatti a Legnago hanno già scelto MUV
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <FAQAccordion 
        title="Domande Frequenti su MUV"
        faqs={faqs}
      />
    </>
  );
};

export default PercheMUV;
