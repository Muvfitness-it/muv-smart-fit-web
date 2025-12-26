import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "Come faccio a scegliere il percorso giusto per me?",
    answer: "Prenota una consulenza gratuita e il nostro team valuterà insieme a te i tuoi obiettivi, la tua disponibilità di tempo e il tuo budget per consigliarti il percorso più adatto."
  },
  {
    question: "Posso cambiare percorso dopo aver iniziato?",
    answer: "Sì, è possibile passare a un percorso superiore in qualsiasi momento. Ti verrà riconosciuto quanto già versato. Il nostro obiettivo è che tu raggiunga i tuoi risultati."
  },
  {
    question: "Quanto durano le sessioni di allenamento?",
    answer: "Le sessioni EMS durano circa 20-25 minuti, equivalenti a 2-3 ore di allenamento tradizionale. Pilates e altre tecnologie hanno durate variabili (30-50 minuti) in base al tipo di sessione."
  },
  {
    question: "Devo avere esperienza precedente in palestra?",
    answer: "Assolutamente no. I nostri percorsi sono adatti a tutti i livelli, dal principiante all'atleta esperto. Il personal trainer adatta ogni sessione alle tue capacità."
  },
  {
    question: "Cosa include la consulenza iniziale gratuita?",
    answer: "Include un'analisi dei tuoi obiettivi, una valutazione posturale, una panoramica delle tecnologie disponibili e la proposta del percorso più adatto a te. Senza impegno."
  }
];

const PercorsiFAQ: React.FC = () => {
  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Schema */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
          
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Domande frequenti
            </h2>
            <p className="text-lg text-muted-foreground">
              Le risposte alle domande più comuni sui nostri percorsi
            </p>
          </div>
          
          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="border border-border rounded-lg px-6 bg-muted/20"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default PercorsiFAQ;
