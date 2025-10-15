import { Helmet } from 'react-helmet';
import { MinimalHero } from '@/features/hero';
import ProofMetrics from '@/components/shared/ProofMetrics';
import ServiceCard from '@/components/shared/ServiceCard';
import FAQAccordion, { FAQItem } from '@/components/shared/FAQAccordion';
import { UnifiedContactForm } from '@/features/forms';
import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';
import { Target, Heart, Droplet, Flame, Users, Calendar } from 'lucide-react';

const MUVHomepage = () => {
  const servizi = [
    {
      icon: Target,
      iconColor: 'accent' as const,
      title: "EMS Training",
      subtitle: "Dimagrimento Accelerato",
      description: "Tecnologia EMS all'avanguardia per perdere grasso 4x più velocemente. Sessioni da 20 minuti equivalgono a 90 minuti di workout tradizionale. Risultati visibili in 4 settimane.",
      link: "/servizi/ems-legnago/"
    },
    {
      icon: Heart,
      iconColor: 'secondary' as const,
      title: "Pilates Reformer",
      subtitle: "Postura & Benessere",
      description: "Correggi postura e dolori cronici con il Reformer più avanzato di Legnago. Protocolli evidence-based per mal di schiena, cervicale e mobilità articolare.",
      link: "/servizi/pilates-reformer-legnago/"
    },
    {
      icon: Droplet,
      iconColor: 'primary' as const,
      title: "Vacuum & Pressoterapia",
      subtitle: "Rimodellamento Corporeo",
      description: "Elimina cellulite e ritenzione idrica con tecnologie mediche certificate. Protocollo integrato con EMS per risultati estetici in 8 settimane.",
      link: "/servizi/cellulite-vacuum-pressoterapia-legnago/"
    },
    {
      icon: Flame,
      iconColor: 'accent' as const,
      title: "Sauna Infrarossi",
      subtitle: "Detox & Recovery",
      description: "Sauna a infrarossi per detossificazione profonda, recupero muscolare e riduzione stress. Complemento ideale post-allenamento.",
      link: "/servizi/sauna-infrarossi-legnago/"
    },
    {
      icon: Users,
      iconColor: 'secondary' as const,
      title: "Programma Over 60",
      subtitle: "Active Aging",
      description: "Protocolli specifici per mantenere forza, equilibrio e autonomia. Prevenzione sarcopenia e osteoporosi con approccio sicuro e graduale.",
      link: "/servizi/over-60-legnago/"
    },
    {
      icon: Calendar,
      iconColor: 'primary' as const,
      title: "Postura & Mal di Schiena",
      subtitle: "Riabilitazione Funzionale",
      description: "Percorsi integrati Pilates Reformer + Pancafit + Massoterapia per risolvere definitivamente dolori posturali cronici.",
      link: "/servizi/postura-mal-di-schiena-legnago/"
    }
  ];
  
  const faqs: FAQItem[] = [
    {
      question: "Quanto tempo ci vuole per vedere i primi risultati?",
      answer: "Con il protocollo MUV integrato (EMS + Nutrizione), i primi risultati visibili si manifestano già dalla 4a settimana. Per il dimagrimento, perderai 3-5kg di grasso in 8 settimane. Per la postura, i miglioramenti sono percepibili dalle prime sessioni Reformer."
    },
    {
      question: "L'EMS è sicuro? Ci sono controindicazioni?",
      answer: "L'EMS è una tecnologia certificata e validata scientificamente, utilizzata in ambito medico-riabilitativo da decenni. È controindicato in caso di gravidanza, pacemaker, epilessia o patologie cardiache gravi. Durante la valutazione iniziale verifichiamo l'idoneità completa."
    },
    {
      question: "Devo avere esperienza pregressa in palestra?",
      answer: "Assolutamente no. I nostri protocolli sono progettati per tutti i livelli: principianti assoluti, persone sedentarie, atleti esperti e over 60. Ogni programma parte dalla tua condizione attuale e progredisce gradualmente."
    },
    {
      question: "Quanto durano le sessioni e con quale frequenza?",
      answer: "Le sessioni EMS durano 20 minuti, il Pilates Reformer 50 minuti. La frequenza ottimale è 2-3 volte/settimana per EMS, 2 volte/settimana per Reformer. Tutto dipende dall'obiettivo e dalla disponibilità."
    },
    {
      question: "Offrite anche supporto nutrizionale?",
      answer: "Sì, tutti i pacchetti Focus ed Evolution includono piano nutrizionale personalizzato. Il dimagrimento efficace richiede integrazione allenamento + nutrizione + recupero. Ti affianchiamo su ogni aspetto."
    },
    {
      question: "Posso provare prima di iscrivermi?",
      answer: "Certamente. Offriamo una prova gratuita completa di 90 minuti che include: valutazione posturale e composizione corporea, presentazione del protocollo personalizzato, sessione trial EMS o Reformer. Zero impegno."
    }
  ];

  return (
    <>
      <Helmet>
        <title>MUV Fitness Legnago | Dimagrimento e Postura con Tecnologie EMS, Pilates Reformer</title>
        <meta 
          name="description" 
          content="Centro fitness boutique a Legnago (VR) specializzato in dimagrimento rapido, correzione posturale e riabilitazione. Tecnologie certificate: EMS, Pilates Reformer, Vacuum Therapy. Risultati verificabili in 4-8 settimane." 
        />
        <meta 
          name="keywords" 
          content="dimagrimento legnago, ems legnago, pilates reformer legnago, postura mal di schiena legnago, personal trainer legnago, palestra tecnologica legnago" 
        />
        <link rel="canonical" href="https://www.muvfitness.it/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="MUV Fitness Legnago | Dimagrimento e Postura con Tecnologie Avanzate" />
        <meta property="og:description" content="Risultati verificabili in 4-8 settimane con EMS, Pilates Reformer e Vacuum Therapy. Approccio scientifico, personalizzazione totale." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.muvfitness.it/" />
        <meta property="og:image" content="https://www.muvfitness.it/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MUV Fitness Legnago | Dimagrimento e Postura" />
        <meta name="twitter:description" content="Tecnologie avanzate per risultati rapidi e duraturi" />
      </Helmet>

      <LocalBusinessSchema />

      <MinimalHero
        title="Dimagrimento e Postura a Legnago mediante Tecnologie Avanzate e Approccio Scientifico"
        description="Il protocollo MUV combina EMS, Pilates Reformer e metodologie di riabilitazione posturale per risultati verificabili in 4-8 settimane."
        gradient="dual"
        primaryCTA={{
          text: "Prenota la tua Prova Gratuita",
          href: "/contatti"
        }}
        secondaryCTA={{
          text: "Scopri il Metodo MUV",
          href: "/metodo"
        }}
      />
      
      <ProofMetrics />
      
      {/* Metodo MUV */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-heading-lg mb-6">
              Il Metodo MUV: Evidence-Based Fitness
            </h2>
            <p className="text-body-xl text-muted-foreground mb-8 leading-relaxed">
              MUV Fitness è l'unico centro a Legnago che integra <strong>tecnologie certificate</strong> (EMS, Pilates Reformer, Vacuum Therapy), 
              <strong> personalizzazione totale</strong> e <strong>supporto scientifico continuativo</strong> per garantire risultati misurabili e duraturi.
            </p>
            <p className="text-body-lg text-muted-foreground mb-12">
              Non offriamo abbonamenti generici: ogni protocollo è costruito su misura, con valutazioni mensili, 
              monitoraggio dei progressi e ottimizzazione costante. Il nostro approccio è evidence-based: ogni metodologia è validata scientificamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/metodo" 
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Scopri il Metodo Completo
              </a>
              <a 
                href="/risultati" 
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-secondary border-2 border-secondary rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-colors"
              >
                Vedi le Trasformazioni
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Servizi */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-heading-lg text-center mb-4">
              Tecnologie & Servizi
            </h2>
            <p className="text-body-lg text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
              Ogni servizio è progettato per obiettivi specifici e supportato da ricerca scientifica. 
              Integriamo le tecnologie per massimizzare i risultati.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servizi.map((servizio, index) => (
                <ServiceCard key={index} {...servizio} />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Team */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-heading-lg mb-6">
              Il Team MUV
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Trainer certificati, specialisti in EMS, istruttori Pilates Reformer avanzato, nutrizionisti e coach motivazionali. 
              Il nostro team combina competenze tecniche, empatia e attenzione personalizzata per supportarti in ogni fase del percorso.
            </p>
            <a 
              href="/team" 
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary-hover transition-colors"
            >
              Conosci il Team
            </a>
          </div>
        </div>
      </section>
      
      <FAQAccordion faqs={faqs} />
      
      {/* CTA Finale */}
      <section className="section-padding bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-heading-lg text-center mb-6 text-white">
              Prenota la Tua Prova Gratuita
            </h2>
            <p className="text-body-lg text-center mb-12 text-white/95">
              90 minuti di valutazione completa, presentazione del protocollo personalizzato e sessione trial. 
              Zero impegno, massima trasparenza.
            </p>
            <UnifiedContactForm
              campaign="Homepage CTA"
              source="homepage-final-cta"
              showMessage={false}
              showObjective={true}
              className="bg-white rounded-xl p-8"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default MUVHomepage;