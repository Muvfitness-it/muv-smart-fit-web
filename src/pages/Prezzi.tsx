import { Helmet } from 'react-helmet';
import HeroComponent from '@/components/shared/HeroComponent';
import PricingTable, { PricingTier } from '@/components/shared/PricingTable';
import FAQAccordion, { FAQItem } from '@/components/shared/FAQAccordion';
import { Check, X } from 'lucide-react';

const Prezzi = () => {
  const tiers: PricingTier[] = [
    {
      name: "Start",
      description: "Per chi vuole iniziare gradualmente",
      price: "Da €79",
      priceNote: "al mese",
      features: [
        "2 sessioni settimanali",
        "Valutazione iniziale completa",
        "Programma personalizzato base",
        "Accesso tecnologie standard",
        "Supporto via WhatsApp"
      ],
      cta: {
        text: "Prenota Consulenza",
        href: "/form-contatti"
      }
    },
    {
      name: "Focus",
      description: "Il più scelto per risultati rapidi",
      price: "Da €139",
      priceNote: "al mese",
      features: [
        "3 sessioni settimanali",
        "Valutazione posturale avanzata",
        "Programma multi-tecnologia",
        "Accesso a tutte le tecnologie",
        "Piano nutrizionale base",
        "Monitoraggio mensile progressi",
        "Supporto prioritario"
      ],
      highlighted: true,
      cta: {
        text: "Inizia Subito",
        href: "/form-contatti"
      }
    },
    {
      name: "Evolution",
      description: "Trasformazione totale e risultati elite",
      price: "Da €199",
      priceNote: "al mese",
      features: [
        "4+ sessioni settimanali",
        "Valutazione completa 360°",
        "Protocollo avanzato integrato",
        "Priorità su tutte le tecnologie",
        "Piano nutrizionale personalizzato",
        "Coaching psicologico incluso",
        "Monitoraggio settimanale",
        "Supporto dedicato H24"
      ],
      cta: {
        text: "Richiedi Info",
        href: "/form-contatti"
      }
    }
  ];
  
  const confronto = [
    {
      feature: "Valutazione iniziale",
      start: true,
      focus: true,
      evolution: true
    },
    {
      feature: "Programma personalizzato",
      start: true,
      focus: true,
      evolution: true
    },
    {
      feature: "EMS Training",
      start: true,
      focus: true,
      evolution: true
    },
    {
      feature: "Pilates Reformer",
      start: false,
      focus: true,
      evolution: true
    },
    {
      feature: "Vacuum & Pressoterapia",
      start: false,
      focus: true,
      evolution: true
    },
    {
      feature: "Sauna Infrarossi",
      start: false,
      focus: false,
      evolution: true
    },
    {
      feature: "Piano nutrizionale",
      start: false,
      focus: "Base",
      evolution: "Avanzato"
    },
    {
      feature: "Coaching psicologico",
      start: false,
      focus: false,
      evolution: true
    },
    {
      feature: "Monitoraggio progressi",
      start: "Mensile",
      focus: "Mensile",
      evolution: "Settimanale"
    }
  ];
  
  const faqs: FAQItem[] = [
    {
      question: "Quali sono i metodi di pagamento accettati?",
      answer: "Accettiamo pagamenti con carta di credito, bonifico bancario, RID (addebito automatico mensile) e contanti. Per abbonamenti semestrali o annuali offriamo sconti fino al 15%."
    },
    {
      question: "Posso cambiare pacchetto durante il percorso?",
      answer: "Assolutamente sì. Puoi effettuare upgrade o downgrade in qualsiasi momento. Il cambio sarà effettivo dal mese successivo e verranno ricalcolati eventuali conguagli."
    },
    {
      question: "C'è un periodo minimo di permanenza?",
      answer: "No, non applichiamo vincoli contrattuali. Puoi interrompere il servizio in qualsiasi momento con preavviso di 30 giorni. Crediamo nella qualità del servizio, non nelle clausole vincolanti."
    },
    {
      question: "Cosa include la prova gratuita?",
      answer: "La prova gratuita include: valutazione completa iniziale (composizione corporea, postura, mobilità), presentazione del programma personalizzato, una sessione trial della tecnologia scelta (EMS o Reformer) e consulenza nutrizionale base. Durata totale: 90 minuti circa."
    },
    {
      question: "Offrite pacchetti famiglia o aziendali?",
      answer: "Sì, disponiamo di soluzioni dedicate per nuclei familiari (2+ persone) con sconti fino al 20% e pacchetti corporate wellness per aziende (da 5+ dipendenti). Contattaci per un preventivo personalizzato."
    },
    {
      question: "Le sessioni hanno scadenza?",
      answer: "Le sessioni mensili devono essere utilizzate entro il mese di riferimento. Tuttavia, per esigenze comprovate (malattia, viaggio), offriamo recuperi posticipati fino a 15 giorni. Siamo flessibili perché capiamo gli imprevisti."
    }
  ];
  
  return (
    <>
      <Helmet>
        <title>Prezzi e Pacchetti MUV Fitness | Legnago (VR)</title>
        <meta 
          name="description" 
          content="Scopri i nostri pacchetti Start, Focus ed Evolution. Prezzi trasparenti, nessun vincolo, massima flessibilità. Prova gratuita disponibile." 
        />
        <link rel="canonical" href="https://www.muvfitness.it/prezzi/" />
      </Helmet>
      
      <HeroComponent
        title="Prezzi Trasparenti, Risultati Garantiti"
        description="Scegli il pacchetto più adatto ai tuoi obiettivi. Nessun vincolo contrattuale, massima flessibilità, prova gratuita inclusa."
        variant="solid"
        align="center"
      />
      
      <PricingTable 
        title="I Nostri Pacchetti"
        description="Ogni pacchetto è progettato per obiettivi specifici. Scegli in base alla tua disponibilità di tempo e all'intensità desiderata."
        tiers={tiers}
      />
      
      {/* Tabella Confronto Dettagliata */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-heading-lg text-center mb-4">
              Confronto Dettagliato
            </h2>
            <p className="text-body-lg text-center text-muted-foreground mb-12">
              Cosa include ogni pacchetto nel dettaglio
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th className="text-left p-4 font-semibold">Caratteristica</th>
                    <th className="text-center p-4 font-semibold">Start</th>
                    <th className="text-center p-4 font-semibold bg-primary/10">Focus</th>
                    <th className="text-center p-4 font-semibold">Evolution</th>
                  </tr>
                </thead>
                <tbody>
                  {confronto.map((row, index) => (
                    <tr key={index} className="border-b border-border">
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="text-center p-4">
                        {typeof row.start === 'boolean' ? (
                          row.start ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        ) : (
                          <span className="text-body-sm">{row.start}</span>
                        )}
                      </td>
                      <td className="text-center p-4 bg-primary/5">
                        {typeof row.focus === 'boolean' ? (
                          row.focus ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        ) : (
                          <span className="text-body-sm font-medium">{row.focus}</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {typeof row.evolution === 'boolean' ? (
                          row.evolution ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        ) : (
                          <span className="text-body-sm">{row.evolution}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      
      {/* Garanzia */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-heading-md mb-6">
              Garanzia Risultati MUV
            </h2>
            <p className="text-body-lg text-muted-foreground mb-6">
              Se dopo 8 settimane di percorso Focus o Evolution, seguendo il protocollo al 100%, non ottieni risultati misurabili (composizione corporea, circonferenze o performance), ti rimborsiamo 2 mesi di abbonamento.
            </p>
            <p className="text-body-sm text-muted-foreground italic">
              *Condizioni: Frequenza minima 90%, rispetto piano nutrizionale, valutazioni mensili completate.
            </p>
          </div>
        </div>
      </section>
      
      <FAQAccordion 
        title="Domande Frequenti sui Prezzi"
        faqs={faqs}
      />
    </>
  );
};

export default Prezzi;
