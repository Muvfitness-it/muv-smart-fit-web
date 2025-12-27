import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface PercorsiFAQProps {
  gender?: 'donna' | 'uomo' | null;
}

const commonFaqs = [
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
  }
];

const donnaFaqs = [
  {
    question: "L'EMS è efficace per combattere la cellulite?",
    answer: "Sì, l'EMS combinato con Vacuum e Pressoterapia è molto efficace. Stimola la circolazione, drena i liquidi e tonifica i tessuti, riducendo visibilmente la cellulite già dopo poche settimane."
  },
  {
    question: "Posso allenarmi durante il ciclo mestruale?",
    answer: "Assolutamente sì. L'allenamento EMS può anche aiutare a ridurre i crampi. Il trainer adatterà l'intensità alle tue esigenze del momento."
  },
  {
    question: "Il Pilates è adatto se ho problemi di postura da ufficio?",
    answer: "Il Pilates Reformer è perfetto per correggere la postura. Rafforza il core, allunga la muscolatura e allevia tensioni cervicali e lombari tipiche di chi lavora seduta."
  },
  {
    question: "Quanto tempo ci vuole per vedere risultati sul tono muscolare?",
    answer: "Con 2-3 sessioni a settimana, noterai miglioramenti nel tono già dopo 4-6 settimane. I risultati sulla cellulite e sul dimagrimento localizzato richiedono 8-12 settimane."
  },
  {
    question: "Cosa include la consulenza iniziale gratuita?",
    answer: "Include un'analisi dei tuoi obiettivi estetici, una valutazione posturale, la misurazione delle zone critiche e la proposta del percorso più adatto a te. Senza impegno."
  }
];

const uomoFaqs = [
  {
    question: "L'EMS può davvero sostituire l'allenamento in palestra?",
    answer: "20 minuti di EMS equivalgono a 2-3 ore di palestra tradizionale in termini di attivazione muscolare. È ideale per chi ha poco tempo ma vuole risultati concreti su massa e definizione."
  },
  {
    question: "Posso aumentare la massa muscolare con l'EMS?",
    answer: "Sì, l'EMS stimola fino al 90% delle fibre muscolari contemporaneamente, favorendo l'ipertrofia. Combinato con una corretta alimentazione, i risultati sulla massa sono significativi."
  },
  {
    question: "È adatto se ho mal di schiena cronico?",
    answer: "L'EMS è spesso consigliato per il mal di schiena perché rafforza i muscoli profondi del core senza caricare la colonna. Il trainer adatterà il programma alle tue esigenze."
  },
  {
    question: "Quanto tempo ci vuole per vedere risultati sulla definizione?",
    answer: "Con 2-3 sessioni a settimana e un'alimentazione adeguata, noterai miglioramenti sulla definizione già dopo 4-6 settimane. La riduzione del grasso addominale richiede 8-12 settimane."
  },
  {
    question: "Cosa include la consulenza iniziale gratuita?",
    answer: "Include un'analisi dei tuoi obiettivi di performance, una valutazione posturale, test della composizione corporea e la proposta del percorso più adatto. Senza impegno."
  }
];

const PercorsiFAQ: React.FC<PercorsiFAQProps> = ({ gender }) => {
  const genderSpecificFaqs = gender === 'donna' ? donnaFaqs : gender === 'uomo' ? uomoFaqs : [];
  const faqs = gender ? [...genderSpecificFaqs, ...commonFaqs.slice(0, 2)] : [...commonFaqs, ...donnaFaqs.slice(0, 1), ...uomoFaqs.slice(0, 1)];
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
