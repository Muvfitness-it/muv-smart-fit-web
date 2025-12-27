import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "È adatto a me se non ho mai fatto palestra?",
    answer: "Assolutamente sì! Il nostro approccio è completamente personalizzato. Partiamo dal tuo livello attuale e costruiamo insieme un percorso graduale. La maggior parte dei nostri clienti non aveva mai fatto palestra prima di venire da noi."
  },
  {
    question: "Quanto tempo ci vuole per vedere risultati?",
    answer: "I primi miglioramenti (più energia, postura migliore) si notano già dopo 2-3 settimane. Per risultati estetici visibili come dimagrimento e tonificazione, generalmente servono 4-8 settimane di percorso costante."
  },
  {
    question: "Posso provare senza impegno?",
    answer: "Certamente! Offriamo una consulenza conoscitiva gratuita dove analizziamo i tuoi obiettivi e ti mostriamo il centro. Potrai provare le nostre tecnologie senza alcun impegno e decidere con calma."
  }
];

const HomepageFAQ = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-4">
              <HelpCircle className="w-4 h-4" />
              Domande Frequenti
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Hai qualche dubbio?
            </h2>
            <p className="text-muted-foreground">
              Ecco le risposte alle domande più comuni dei nostri clienti
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background border border-border rounded-xl px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5 [&[data-state=open]>svg]:rotate-180">
                  <span className="pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA sotto FAQ */}
          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm mb-3">
              Hai altre domande? Siamo qui per te!
            </p>
            <a 
              href="https://wa.me/393291070374?text=Ciao,%20ho%20una%20domanda%20sui%20vostri%20servizi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Scrivici su WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomepageFAQ;
