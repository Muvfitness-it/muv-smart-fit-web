import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Quante volte a settimana?",
      answer: "Dipende dall'obiettivo: 1-2 volte per mantenimento, 2-3 volte per trasformazione rapida. I nostri programmi sono sempre personalizzati."
    },
    {
      question: "In quanto tempo vedo risultati?",
      answer: "I primi cambiamenti si vedono nelle prime 2-4 settimane su misure e sensazioni. I risultati visibili arrivano entro 6-8 settimane con costanza."
    },
    {
      question: "Ho poco tempo: ha senso iniziare?",
      answer: "Assolutamente sì! L'EMS richiede solo 20 minuti reali + routine smart a casa. Perfetto per chi ha agenda piena."
    },
    {
      question: "Mal di schiena: posso allenarmi?",
      answer: "Sì, anzi è consigliato! Valutiamo prima la situazione con Pancafit + Reformer per riallineamento posturale graduale."
    },
    {
      question: "Posso provare?",
      answer: "Certo! Offriamo una consulenza gratuita + prova guidata per farti toccare con mano il nostro metodo senza impegno."
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-6 font-heading text-white">
            Mini-FAQ
          </h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
              <button
                className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <h3 className="text-lg font-bold text-white">{faq.question}</h3>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-brand-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-brand-primary flex-shrink-0" />
                )}
              </button>
              
              {openFaq === index && (
                <div className="px-6 pb-6 border-t border-gray-700">
                  <p className="text-gray-300 pt-4 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;