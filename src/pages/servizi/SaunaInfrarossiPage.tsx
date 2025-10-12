import { Helmet } from 'react-helmet';
import { MinimalHero } from '@/features/hero';
import FAQAccordion, { FAQItem } from '@/components/shared/FAQAccordion';
import { UnifiedContactForm } from '@/features/forms';
import { Flame, Heart, Droplet, Zap, Shield, Clock } from 'lucide-react';

const SaunaInfrarossiPage = () => {
  const benefici = [
    {
      icon: Flame,
      title: "Detossificazione Profonda",
      description: "Eliminazione tossine attraverso sudorazione intensa a temperatura controllata. 3x più efficace della sauna tradizionale."
    },
    {
      icon: Heart,
      title: "Recupero Muscolare",
      description: "Riduzione acido lattico e infiammazione post-allenamento. Accelera il recupero del 40%."
    },
    {
      icon: Droplet,
      title: "Ritenzione Idrica",
      description: "Stimolazione circolazione linfatica e drenaggio liquidi in eccesso. Riduce gonfiore e cellulite."
    },
    {
      icon: Zap,
      title: "Metabolismo & Dimagrimento",
      description: "Aumento metabolismo basale fino a 600 calorie per sessione. Complemento ideale per dimagrimento."
    },
    {
      icon: Shield,
      title: "Sistema Immunitario",
      description: "Potenziamento difese immunitarie attraverso shock termico controllato. Riduce frequenza malanni stagionali."
    },
    {
      icon: Clock,
      title: "Stress & Sonno",
      description: "Riduzione cortisolo e miglioramento qualità del sonno. Effetto rilassante profondo sul sistema nervoso."
    }
  ];
  
  const protocollo = [
    {
      fase: "Preparazione",
      durata: "5 min",
      descrizione: "Idratazione pre-sessione (500ml acqua) e valutazione parametri vitali."
    },
    {
      fase: "Riscaldamento",
      durata: "10 min",
      descrizione: "Temperatura 40-50°C per abituare il corpo gradualmente all'infrarosso."
    },
    {
      fase: "Fase Attiva",
      durata: "20 min",
      descrizione: "Temperatura 50-60°C con emissione infrarossi a spettro completo. Sudorazione intensa."
    },
    {
      fase: "Raffreddamento",
      durata: "5 min",
      descrizione: "Riduzione graduale temperatura e reidratazione post-sessione."
    }
  ];
  
  const faqs: FAQItem[] = [
    {
      question: "Qual è la differenza tra sauna tradizionale e sauna a infrarossi?",
      answer: "La sauna tradizionale riscalda l'aria a 80-100°C, causando sudorazione superficiale. La sauna a infrarossi lavora a 50-60°C ma penetra 4cm sotto la pelle, attivando detossificazione più profonda. Il comfort è maggiore e la durata sessioni più lunga."
    },
    {
      question: "Quante sessioni servono per vedere risultati?",
      answer: "I benefici immediati (rilassamento, sonno) si percepiscono dalla prima sessione. Per detossificazione e ritenzione, servono 8-12 sessioni (2-3 volte/settimana). Per dimagrimento, integriamo la sauna con EMS per risultati ottimali in 8 settimane."
    },
    {
      question: "È sicura? Ci sono controindicazioni?",
      answer: "La sauna a infrarossi è sicura e validata scientificamente. È controindicata in gravidanza, cardiopatie gravi, ipertensione non controllata e febbre. Durante la valutazione iniziale verifichiamo l'idoneità completa."
    },
    {
      question: "Posso usarla dopo l'allenamento?",
      answer: "Sì, anzi è il momento ideale. Dopo EMS o Pilates, la sauna accelera il recupero muscolare, riduce DOMS (dolori muscolari ritardati) e ottimizza i risultati dell'allenamento. Molti clienti integrano sauna post-workout."
    },
    {
      question: "Devo portare qualcosa?",
      answer: "Forniamo tutto: asciugamani, accappatoio, acqua e sali minerali. Porta solo un costume comodo. Ti consigliamo di idratarti bene 2-3 ore prima della sessione."
    },
    {
      question: "Posso combinare la sauna con altri servizi?",
      answer: "Assolutamente. I pacchetti Focus ed Evolution includono protocolli integrati: EMS + Sauna per dimagrimento accelerato, oppure Pilates + Sauna per recupero e mobilità. La sinergia tra tecnologie moltiplica i risultati."
    }
  ];
  
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Sauna Infrarossi Legnago",
    "description": "Detossificazione profonda, recupero muscolare e riduzione stress con sauna a infrarossi a spettro completo. Protocolli certificati per benessere e dimagrimento.",
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
      "name": "Sauna Infrarossi",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sessione Singola Sauna Infrarossi"
          }
        }
      ]
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Sauna Infrarossi Legnago | Detox, Recupero e Benessere - MUV Fitness</title>
        <meta 
          name="description" 
          content="Sauna a infrarossi a Legnago per detossificazione profonda, recupero muscolare post-allenamento e riduzione stress. Tecnologia certificata, risultati verificabili." 
        />
        <meta 
          name="keywords" 
          content="sauna infrarossi legnago, detox legnago, recupero muscolare, riduzione stress, benessere legnago" 
        />
        <link rel="canonical" href="https://www.muvfitness.it/servizi/sauna-infrarossi-legnago/" />
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>
      
      <MinimalHero
        title="Sauna Infrarossi a Legnago"
        subtitle="Detox & Recovery"
        description="Detossificazione profonda, recupero muscolare accelerato e riduzione stress con tecnologia a infrarossi a spettro completo. Complemento ideale per ogni percorso fitness."
        gradient="dual"
        primaryCTA={{
          text: "Prenota Prova Gratuita",
          href: "#contatti"
        }}
        secondaryCTA={{
          text: "Perché MUV",
          href: "/perche-muv"
        }}
      />
      
      {/* Introduzione Scientifica */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading-lg mb-6 text-center">
              Tecnologia Infrarossi: Evidence-Based Wellness
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-body-lg leading-relaxed mb-4">
                La <strong>sauna a infrarossi</strong> utilizza onde elettromagnetiche a spettro completo (vicino, medio e lontano infrarosso) 
                per penetrare 4cm sotto la pelle, attivando sudorazione profonda a temperature confortevoli (50-60°C vs 80-100°C tradizionale).
              </p>
              <p className="text-body-lg leading-relaxed mb-4">
                Questa tecnologia, validata da oltre 40 anni di ricerca scientifica, stimola <strong>circolazione sanguigna</strong>, 
                <strong>detossificazione cellulare</strong> e <strong>recupero muscolare</strong>, con applicazioni terapeutiche in ambito 
                medico-sportivo e wellness.
              </p>
              <p className="text-body-lg leading-relaxed">
                A MUV Fitness, integriamo la sauna infrarossi nei protocolli <strong>post-allenamento EMS</strong> e <strong>Pilates Reformer</strong> 
                per ottimizzare recupero, ridurre infiammazione e accelerare risultati estetici (cellulite, ritenzione, dimagrimento).
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefici */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-heading-lg text-center mb-4">
              Benefici Evidence-Based
            </h2>
            <p className="text-body-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Ogni beneficio è supportato da ricerca scientifica e validato dall'esperienza clinica.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefici.map((beneficio, index) => {
                const Icon = beneficio.icon;
                return (
                  <div key={index} className="bg-background p-6 rounded-lg border border-border hover:border-accent/50 transition-colors">
                    <Icon className="w-12 h-12 text-accent mb-4" strokeWidth={1.5} />
                    <h3 className="text-heading-sm mb-3">
                      {beneficio.title}
                    </h3>
                    <p className="text-body-md text-muted-foreground">
                      {beneficio.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      {/* Protocollo */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading-lg text-center mb-4">
              Protocollo Sessione Standard
            </h2>
            <p className="text-body-lg text-center text-muted-foreground mb-12">
              Ogni sessione dura 40 minuti totali, con monitoraggio costante.
            </p>
            
            <div className="space-y-6">
              {protocollo.map((step, index) => (
                <div 
                  key={index}
                  className="flex gap-6 items-start p-6 bg-muted/30 rounded-lg border-l-4 border-accent"
                >
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="text-3xl font-bold text-accent mb-1">
                      {index + 1}
                    </div>
                    <div className="text-sm text-muted-foreground font-semibold">
                      {step.durata}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-heading-sm mb-2">
                      {step.fase}
                    </h3>
                    <p className="text-body-md text-muted-foreground">
                      {step.descrizione}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Integrazioni */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-heading-lg mb-6">
              Protocolli Integrati
            </h2>
            <p className="text-body-lg text-muted-foreground mb-12">
              La sauna infrarossi massimizza i risultati quando combinata con altre tecnologie MUV.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background p-8 rounded-lg border-2 border-primary/20">
                <h3 className="text-heading-sm mb-4 text-primary">
                  EMS + Sauna
                </h3>
                <p className="text-body-md text-muted-foreground mb-4">
                  Dimagrimento accelerato: EMS brucia grasso, sauna elimina tossine e ritenzione. Risultati estetici ottimizzati in 8 settimane.
                </p>
                <span className="text-sm font-semibold text-primary">
                  Pacchetto Focus & Evolution
                </span>
              </div>
              
              <div className="bg-background p-8 rounded-lg border-2 border-secondary/20">
                <h3 className="text-heading-sm mb-4 text-secondary">
                  Reformer + Sauna
                </h3>
                <p className="text-body-md text-muted-foreground mb-4">
                  Recupero e mobilità: Pilates migliora postura, sauna riduce infiammazione e rigidità muscolare. Ideale per dolori cronici.
                </p>
                <span className="text-sm font-semibold text-secondary">
                  Pacchetto Focus
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FAQAccordion 
        title="Domande Frequenti - Sauna Infrarossi"
        faqs={faqs}
      />
      
      {/* CTA Finale */}
      <section id="contatti" className="section-padding bg-gradient-to-br from-accent via-secondary to-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-heading-lg text-center mb-6 text-white">
              Prova la Sauna Infrarossi Gratuitamente
            </h2>
            <p className="text-body-lg text-center mb-12 text-white/95">
              Sessione gratuita di 40 minuti con valutazione iniziale e consulenza personalizzata. Zero impegno.
            </p>
            <UnifiedContactForm
              campaign="Sauna Infrarossi Page"
              source="sauna-page-cta"
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

export default SaunaInfrarossiPage;
