import { Helmet } from 'react-helmet';
import HeroComponent from '@/components/shared/HeroComponent';
import FAQAccordion, { FAQItem } from '@/components/shared/FAQAccordion';
import { UnifiedContactForm } from '@/features/forms';
import { Heart, Shield, TrendingUp, Users, Award, Activity } from 'lucide-react';

const Over60Page = () => {
  const obiettivi = [
    {
      icon: Shield,
      title: "Prevenzione Sarcopenia",
      description: "Mantenimento massa muscolare attraverso protocolli EMS a bassa intensità. Contrasta la perdita muscolare fisiologica legata all'età."
    },
    {
      icon: Heart,
      title: "Salute Cardiovascolare",
      description: "Allenamento aerobico controllato per rinforzare cuore e circolazione. Riduce rischio ipertensione e patologie cardiovascolari."
    },
    {
      icon: TrendingUp,
      title: "Equilibrio & Coordinazione",
      description: "Pilates Reformer per migliorare propriocezione ed equilibrio. Riduzione rischio cadute fino al 40%."
    },
    {
      icon: Activity,
      title: "Mobilità Articolare",
      description: "Esercizi funzionali per mantenere autonomia nei movimenti quotidiani. Focus su anche, ginocchia e spalle."
    },
    {
      icon: Award,
      title: "Densità Ossea",
      description: "Stimolazione osteogenesi attraverso carico progressivo controllato. Prevenzione osteoporosi e fratture."
    },
    {
      icon: Users,
      title: "Benessere Psicofisico",
      description: "Socializzazione e motivazione di gruppo. Riduzione isolamento sociale e miglioramento umore."
    }
  ];
  
  const protocollo = [
    {
      settimana: "1-2",
      focus: "Valutazione & Adattamento",
      attività: [
        "Test funzionale completo (forza, equilibrio, mobilità)",
        "Familiarizzazione con tecnologie (EMS, Reformer)",
        "Sessioni brevi e progressive (15-20 min)",
        "Educazione posturale e respiratoria"
      ]
    },
    {
      settimana: "3-6",
      focus: "Costruzione Base",
      attività: [
        "EMS a intensità moderata 2x/settimana",
        "Pilates Reformer 1x/settimana",
        "Aumento graduale durata (20-30 min)",
        "Esercizi equilibrio e propriocezione"
      ]
    },
    {
      settimana: "7-12",
      focus: "Consolidamento",
      attività: [
        "Protocollo completo 3x/settimana",
        "Integrazione esercizi funzionali",
        "Valutazione progressi (ogni 4 settimane)",
        "Ottimizzazione intensità personalizzata"
      ]
    },
    {
      settimana: "13+",
      focus: "Mantenimento Active Aging",
      attività: [
        "Routine consolidata e sostenibile",
        "Focus su obiettivi individuali",
        "Monitoraggio parametri clinici",
        "Supporto continuativo e motivazione"
      ]
    }
  ];
  
  const faqs: FAQItem[] = [
    {
      question: "Sono troppo vecchio per iniziare?",
      answer: "Assolutamente no. Il nostro programma Over 60 è progettato per tutte le condizioni di partenza, anche sedentarietà totale. Partiamo dalla tua condizione attuale e progrediamo gradualmente. Abbiamo clienti attivi fino a 78 anni che hanno trasformato la loro qualità di vita."
    },
    {
      question: "L'EMS è sicuro alla mia età?",
      answer: "Sì, l'EMS è sicuro e validato clinicamente per tutte le età. Utilizziamo protocolli specifici a bassa intensità, certificati per popolazione senior. Durante la valutazione iniziale verifichiamo idoneità (ECG recente richiesto) e monitoriamo parametri vitali ad ogni sessione."
    },
    {
      question: "Ho problemi articolari e osteoporosi: posso allenarmi?",
      answer: "Il nostro programma è ideale proprio per queste condizioni. Il Pilates Reformer elimina carico articolare pur stimolando muscoli e ossa. L'EMS lavora senza impatto su giunture. Migliaia di studi validano questi protocolli per osteoporosi e artrite."
    },
    {
      question: "Quanto tempo ci vuole per vedere miglioramenti?",
      answer: "I primi benefici (energia, umore, sonno) si percepiscono dalla 2a settimana. Forza e equilibrio migliorano visibilmente dalla 4a-6a settimana. Per consolidamento completo e riduzione rischio cadute, sono necessarie 12 settimane di protocollo costante."
    },
    {
      question: "Devo allenarmi da solo o in gruppo?",
      answer: "Offriamo entrambe le opzioni. Le sessioni EMS sono sempre 1:1 con trainer dedicato. Il Pilates Reformer può essere individuale o small group (max 4 persone). Molti clienti over 60 apprezzano la socializzazione del gruppo per motivazione reciproca."
    },
    {
      question: "Il programma include anche consulenza nutrizionale?",
      answer: "Sì, tutti i pacchetti Focus ed Evolution includono consulenza nutrizionale specifica per età senior: proteine per massa muscolare, calcio/vitamina D per ossa, antiossidanti, idratazione. Il dimagrimento over 60 richiede approccio diverso e più delicato."
    }
  ];
  
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Programma Fitness Over 60 Legnago",
    "description": "Active aging a Legnago: protocolli certificati per mantenere forza, equilibrio e autonomia dopo i 60 anni. Prevenzione sarcopenia, osteoporosi e cadute.",
    "provider": {
      "@type": "HealthAndBeautyBusiness",
      "name": "MUV Fitness Legnago"
    },
    "areaServed": {
      "@type": "City",
      "name": "Legnago"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Over 60 Active Aging",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Programma Over 60 Personalizzato"
          }
        }
      ]
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Fitness Over 60 Legnago | Active Aging, Forza ed Equilibrio - MUV Fitness</title>
        <meta 
          name="description" 
          content="Programma fitness over 60 a Legnago: mantieni forza, equilibrio e autonomia con protocolli sicuri e certificati. Prevenzione sarcopenia, osteoporosi e cadute." 
        />
        <meta 
          name="keywords" 
          content="fitness over 60 legnago, ginnastica anziani legnago, active aging, sarcopenia, osteoporosi prevenzione" 
        />
        <link rel="canonical" href="https://www.muvfitness.it/servizi/over-60-legnago/" />
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>
      
      <HeroComponent
        title="Active Aging Over 60 a Legnago"
        subtitle="Forza, Equilibrio, Autonomia"
        description="Protocolli certificati per mantenere massa muscolare, prevenire osteoporosi e ridurre rischio cadute. Allenamento sicuro, efficace e motivante per la tua età."
        variant="gradient"
        primaryCTA={{
          text: "Prenota Valutazione Gratuita",
          href: "#contatti"
        }}
        secondaryCTA={{
          text: "Scopri il Metodo",
          href: "/metodo"
        }}
      />
      
      {/* Introduzione */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading-lg mb-6 text-center">
              Active Aging: Scienza e Qualità di Vita
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-body-lg leading-relaxed mb-4">
                L'<strong>invecchiamento attivo</strong> non è solo longevità, ma <strong>qualità di vita</strong>: mantenere autonomia, 
                forza funzionale ed equilibrio per continuare a fare ciò che ami senza limitazioni o paura di cadute.
              </p>
              <p className="text-body-lg leading-relaxed mb-4">
                Dopo i 60 anni, il corpo perde naturalmente <strong>3-5% di massa muscolare ogni decade</strong> (sarcopenia) 
                e <strong>densità ossea</strong> (osteoporosi), aumentando rischio fratture e perdita autonomia. 
                Ma la ricerca scientifica è chiara: <strong>l'allenamento mirato inverte questo processo</strong>.
              </p>
              <p className="text-body-lg leading-relaxed">
                A MUV Fitness, abbiamo progettato un programma specifico <strong>Over 60</strong> che integra <strong>EMS a bassa intensità</strong>, 
                <strong>Pilates Reformer</strong> e <strong>esercizi funzionali</strong> per ricostruire forza, equilibrio e fiducia 
                nei movimenti quotidiani. Con supervisione costante e progressione graduale.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Obiettivi */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-heading-lg text-center mb-4">
              I 6 Obiettivi del Programma
            </h2>
            <p className="text-body-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Ogni obiettivo è supportato da protocolli evidence-based e monitoraggio clinico.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {obiettivi.map((obiettivo, index) => {
                const Icon = obiettivo.icon;
                return (
                  <div key={index} className="bg-background p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
                    <Icon className="w-12 h-12 text-primary mb-4" strokeWidth={1.5} />
                    <h3 className="text-heading-sm mb-3">
                      {obiettivo.title}
                    </h3>
                    <p className="text-body-md text-muted-foreground">
                      {obiettivo.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      {/* Protocollo 12 Settimane */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading-lg text-center mb-4">
              Protocollo Progressivo 12+ Settimane
            </h2>
            <p className="text-body-lg text-center text-muted-foreground mb-12">
              Costruzione graduale e sostenibile delle capacità funzionali.
            </p>
            
            <div className="space-y-8">
              {protocollo.map((fase, index) => (
                <div 
                  key={index}
                  className="p-8 bg-muted/30 rounded-lg border-l-4 border-secondary"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-2xl font-bold text-secondary">
                      Settimane {fase.settimana}
                    </div>
                    <div className="h-px flex-1 bg-border"></div>
                  </div>
                  <h3 className="text-heading-sm mb-4">
                    {fase.focus}
                  </h3>
                  <ul className="space-y-3">
                    {fase.attività.map((attività, aIndex) => (
                      <li key={aIndex} className="flex items-start gap-3">
                        <span className="text-secondary mt-1">✓</span>
                        <span className="text-body-md text-muted-foreground">
                          {attività}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonianze Specifiche */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading-lg text-center mb-12">
              Storie di Trasformazione Over 60
            </h2>
            
            <div className="space-y-8">
              <div className="bg-background p-8 rounded-lg border-l-4 border-primary">
                <p className="text-body-lg italic text-muted-foreground mb-4">
                  "A 68 anni, dopo la pensione, mi sentivo sempre più debole e insicura nelle scale. 
                  In 3 mesi con MUV ho ritrovato forza nelle gambe e zero paura di camminare. 
                  Mi sento 10 anni più giovane."
                </p>
                <p className="font-semibold">
                  Carla, 68 anni - Pensionata
                </p>
              </div>
              
              <div className="bg-background p-8 rounded-lg border-l-4 border-secondary">
                <p className="text-body-lg italic text-muted-foreground mb-4">
                  "Osteoporosi diagnosticata a 62 anni. Il medico mi ha consigliato allenamento controllato. 
                  Con EMS e Reformer, ho aumentato densità ossea del 12% in 6 mesi. Risultati clinici certificati."
                </p>
                <p className="font-semibold">
                  Giorgio, 64 anni - Imprenditore
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FAQAccordion 
        title="Domande Frequenti - Over 60"
        faqs={faqs}
      />
      
      {/* CTA Finale */}
      <section id="contatti" className="section-padding bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-heading-lg text-center mb-6 text-white">
              Inizia il Tuo Percorso Active Aging
            </h2>
            <p className="text-body-lg text-center mb-12 text-white/95">
              Valutazione funzionale completa gratuita (60 min): test forza, equilibrio, mobilità + presentazione protocollo personalizzato.
            </p>
            <UnifiedContactForm
              campaign="Over 60 Page"
              source="over60-page-cta"
              showMessage={false}
              showObjective={false}
              className="bg-white rounded-xl p-8"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Over60Page;
