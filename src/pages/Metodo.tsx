import { Helmet } from 'react-helmet';
import HeroComponent from '@/components/shared/HeroComponent';
import FAQAccordion, { FAQItem } from '@/components/shared/FAQAccordion';
import { Target, Heart, Zap, TrendingUp, Users, Award } from 'lucide-react';
import heroImage from '@/assets/hero-fitness-professional.jpg';

const Metodo = () => {
  const principi = [
    {
      icon: Target,
      title: "Personalizzazione Totale",
      description: "Ogni programma è costruito sulle tue esigenze specifiche, obiettivi e condizione fisica attuale. Non esistono protocolli standard.",
      color: 'primary'
    },
    {
      icon: Heart,
      title: "Approccio Olistico",
      description: "Integriamo allenamento, nutrizione, postura e benessere psicofisico per risultati completi e duraturi.",
      color: 'secondary'
    },
    {
      icon: Zap,
      title: "Tecnologie Avanzate",
      description: "EMS, Pilates Reformer, Vacuum Therapy e Sauna Infrarossi: tecnologie certificate e validate scientificamente.",
      color: 'accent'
    },
    {
      icon: TrendingUp,
      title: "Evidence-Based",
      description: "Ogni metodologia è supportata da ricerca scientifica e validata da anni di esperienza sul campo.",
      color: 'primary'
    },
    {
      icon: Users,
      title: "Community & Supporto",
      description: "Non sei mai solo: ti affianchiamo costantemente con motivazione, feedback e supporto professionale.",
      color: 'secondary'
    },
    {
      icon: Award,
      title: "Risultati Misurabili",
      description: "Monitoriamo progressi con metriche oggettive: peso, circonferenze, composizione corporea, performance.",
      color: 'accent'
    }
  ];
  
  const protocollo = [
    {
      step: "1",
      title: "Valutazione Iniziale",
      description: "Analisi completa: composizione corporea, postura, mobilità, obiettivi e vincoli individuali."
    },
    {
      step: "2",
      title: "Progettazione Programma",
      description: "Creazione del protocollo personalizzato integrando tecnologie, frequenza ottimale e timeline realistica."
    },
    {
      step: "3",
      title: "Implementazione Graduale",
      description: "Inizio percorso con monitoraggio costante, adattamenti progressivi e supporto continuativo."
    },
    {
      step: "4",
      title: "Monitoraggio & Ottimizzazione",
      description: "Valutazioni periodiche (ogni 4 settimane) per verificare progressi e ottimizzare il programma."
    },
    {
      step: "5",
      title: "Mantenimento Risultati",
      description: "Strategie per consolidare i risultati raggiunti e mantenerli nel lungo termine."
    }
  ];
  
  const faqs: FAQItem[] = [
    {
      question: "Cosa rende il Metodo MUV diverso dalle palestre tradizionali?",
      answer: "Il Metodo MUV integra tecnologie avanzate (EMS, Reformer, Vacuum) con un approccio personalizzato totale. Non offriamo abbonamenti generici ma programmi costruiti su misura, con supporto costante e risultati misurabili. La nostra filosofia è qualità vs quantità: sessioni brevi ma intense ed efficaci."
    },
    {
      question: "Quanto tempo ci vuole per vedere i primi risultati?",
      answer: "Con il protocollo MUV, i primi risultati visibili si manifestano tipicamente tra le 4-8 settimane, a seconda dell'obiettivo. Per il dimagrimento, già dalla 2a settimana si notano cambiamenti nella composizione corporea. Per la postura, i miglioramenti posturali sono percepibili dalle prime sessioni."
    },
    {
      question: "È necessaria esperienza pregressa in palestra?",
      answer: "Assolutamente no. Il Metodo MUV è progettato per tutti i livelli: principianti assoluti, persone sedentarie, atleti esperti e over 60. Ogni programma parte dalla tua condizione attuale e progredisce gradualmente verso l'obiettivo."
    },
    {
      question: "Come si integrano le diverse tecnologie?",
      answer: "Le tecnologie vengono combinate in base all'obiettivo: per il dimagrimento integriamo EMS + Vacuum + Nutrizione; per la postura Pilates Reformer + Pancafit + Massoterapia. Ogni combinazione è validata scientificamente e ottimizzata per massimizzare l'efficacia."
    },
    {
      question: "Il Metodo MUV funziona anche per chi ha poco tempo?",
      answer: "Sì, proprio per questo abbiamo sviluppato protocolli ad alta efficienza. L'EMS, ad esempio, richiede solo 20 minuti per sessione ma equivale a 90 minuti di allenamento tradizionale. Le sessioni Reformer durano 50 minuti. Tutto è ottimizzato per massimizzare risultati minimizzando il tempo investito."
    }
  ];
  
  return (
    <>
      <Helmet>
        <title>Il Metodo MUV - Approccio Scientifico al Fitness | Legnago</title>
        <meta 
          name="description" 
          content="Scopri il Metodo MUV: approccio evidence-based che integra tecnologie avanzate, personalizzazione totale e supporto continuativo per risultati duraturi e misurabili." 
        />
        <link rel="canonical" href="https://www.muvfitness.it/metodo/" />
      </Helmet>
      
      <HeroComponent
        title="Il Metodo MUV"
        subtitle="Approccio Scientifico"
        description="Evidence-based fitness: integriamo tecnologie avanzate, personalizzazione totale e supporto continuativo per risultati duraturi e misurabili."
        backgroundImage={heroImage}
        variant="gradient"
        primaryCTA={{
          text: "Prenota Consulenza Gratuita",
          href: "/form-contatti"
        }}
        secondaryCTA={{
          text: "Esplora i Servizi",
          href: "/servizi"
        }}
      />
      
      {/* Principi Fondamentali */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-heading-lg text-center mb-4">
              I 6 Principi Fondamentali
            </h2>
            <p className="text-body-lg text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
              Il Metodo MUV si basa su pilastri scientifici e operativi che garantiscono efficacia, sostenibilità e risultati verificabili.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {principi.map((principio, index) => {
                const Icon = principio.icon;
                const colorClass = principio.color === 'primary' ? 'text-primary' : 
                                  principio.color === 'secondary' ? 'text-secondary' : 'text-accent';
                const bgClass = principio.color === 'primary' ? 'bg-primary/10' : 
                               principio.color === 'secondary' ? 'bg-secondary/10' : 'bg-accent/10';
                
                return (
                  <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow border border-border">
                    <div className={`inline-flex p-4 rounded-full ${bgClass} mb-4`}>
                      <Icon className={`w-10 h-10 ${colorClass}`} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-heading-sm mb-3">
                      {principio.title}
                    </h3>
                    <p className="text-body-md text-muted-foreground">
                      {principio.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      {/* Protocollo Step by Step */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading-lg text-center mb-4">
              Il Protocollo MUV: 5 Fasi
            </h2>
            <p className="text-body-lg text-center text-muted-foreground mb-16">
              Dal primo contatto ai risultati consolidati: ecco come lavoriamo con te.
            </p>
            
            <div className="space-y-8">
              {protocollo.map((fase, index) => (
                <div 
                  key={index}
                  className="flex gap-6 items-start p-8 bg-background rounded-lg border-l-4 border-primary hover:shadow-lg transition-shadow"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    {fase.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-heading-sm mb-2">
                      {fase.title}
                    </h3>
                    <p className="text-body-md text-muted-foreground">
                      {fase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Differenziatori */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-heading-lg text-center mb-16">
              MUV vs Palestra Tradizionale
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-muted-foreground">Palestra Tradizionale</h4>
                  <p className="text-body-sm">Abbonamento generico, autonomia totale, zero personalizzazione</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-primary">MUV Fitness</h4>
                  <p className="text-body-sm font-medium">Programma su misura, affiancamento costante, tecnologie avanzate</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-muted-foreground">Palestra Tradizionale</h4>
                  <p className="text-body-sm">Sessioni lunghe (60-90 min), risultati lenti e incerti</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-primary">MUV Fitness</h4>
                  <p className="text-body-sm font-medium">Sessioni brevi ma intense (20-50 min), risultati visibili in 4-8 settimane</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-muted-foreground">Palestra Tradizionale</h4>
                  <p className="text-body-sm">Zero monitoraggio, nessun feedback strutturato</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-primary">MUV Fitness</h4>
                  <p className="text-body-sm font-medium">Valutazioni ogni 4 settimane, metriche oggettive, ottimizzazione continua</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FAQAccordion faqs={faqs} />
    </>
  );
};

export default Metodo;
