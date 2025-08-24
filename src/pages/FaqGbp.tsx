import React from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FaqGbp = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, title: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copiato!",
        description: `"${title}" copiato negli appunti`,
      });
    });
  };

  const faqData = [
    {
      question: "Come funziona la prima consulenza gratuita?",
      answer: "La consulenza gratuita dura 45 minuti e include 3 step: (1) Analisi obiettivi e storia fisica, (2) Valutazione posturale e composizione corporea, (3) Proposta di percorso personalizzato con tempistiche realistiche. Nessun impegno, solo informazioni chiare."
    },
    {
      question: "Avete EMS? In quanto dura una seduta?",
      answer: "Sì, usiamo la tecnologia EMS (elettrostimolazione muscolare). Ogni seduta dura 20 minuti reali di allenamento, equivalenti a 90 minuti di palestra tradizionale. Consigliamo 1-2 sedute a settimana. Include sempre una valutazione iniziale per personalizzare intensità e programma."
    },
    {
      question: "Trattate mal di schiena?",
      answer: "Sì, attraverso Pancafit (riequilibrio posturale) e Pilates Reformer. Seguiamo un percorso progressivo: prima eliminiamo tensioni e compensi, poi rinforziamo la muscolatura profonda. La sicurezza viene prima di tutto – valutiamo sempre caso per caso."
    },
    {
      question: "Fate protocolli per cellulite/ritenzione?",
      answer: "Sì, utilizziamo Vacuum terapia e Pressoterapia in protocolli mirati. I risultati si vedono mediamente in 6-8 settimane con 2 sedute settimanali. Combiniamo sempre il trattamento estetico con movimento e consigli nutrizionali per risultati duraturi."
    },
    {
      question: "Serve appuntamento?",
      answer: "Sì, lavoriamo sempre su appuntamento. I nostri ambienti sono riservati e ogni sessione è personalizzata. Puoi prenotare chiamando il +39 351 338 0770 o scrivendo su WhatsApp. Ti confermiamo sempre disponibilità entro poche ore."
    },
    {
      question: "Posso allenarmi se ho poco tempo?",
      answer: "Assolutamente sì. La nostra programmazione 'smart' è pensata per chi ha poco tempo: 2 sedute a settimana da 30-45 minuti sono sufficienti per risultati concreti. EMS e circuiti HIIT sono particolarmente efficaci per ottimizzare ogni minuto."
    },
    {
      question: "Che orari fate?",
      answer: "Siamo aperti lunedì-venerdì 08:00-21:00, sabato 08:00-12:00, domenica chiusi. Durante le festività gli orari possono variare – controlla sempre la nostra pagina Google o chiamaci per conferme."
    },
    {
      question: "Parcheggio vicino?",
      answer: "Siamo in Via Venti Settembre 5/7, zona centrale di Legnago. Parcheggio gratuito disponibile nelle vie limitrofe (Via Matteotti, Via Fatebenefratelli). A piedi dal centro storico in 3 minuti."
    },
    {
      question: "Quanto costano i percorsi?",
      answer: "I percorsi sono personalizzati in base a obiettivi, frequenza e servizi scelti. I costi si definiscono sempre dopo la consulenza gratuita, quando capiamo insieme le tue necessità. Nessuna sorpresa: tutto chiaro e trasparente fin dall'inizio."
    },
    {
      question: "È possibile provare?",
      answer: "Sì, offriamo sempre una prova guidata durante la consulenza gratuita. Puoi testare EMS, Pilates Reformer o altri servizi per capire se ti piacciono prima di decidere. Nessuna pressione, solo la possibilità di provare con le tue mani."
    },
    {
      question: "Come monitorate i risultati?",
      answer: "Prendiamo misure precise (vita, fianchi, coscia) e foto tecniche all'inizio e ogni 2-4 settimane. Usiamo anche la bioimpedenza per monitorare massa magra e grassa. I progressi si vedono sia nei numeri che nel benessere quotidiano."
    },
    {
      question: "Accettate Wellhub?",
      answer: "Sì, siamo partner Wellhub (ex Gympass). Gli abbonati possono accedere ai nostri servizi base con il loro piano. Per servizi premium o percorsi personalizzati è previsto un piccolo supplemento. Contattaci per verificare le condizioni del tuo piano."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Domande & Risposte ufficiali per Google</title>
        <meta name="description" content="Q&A ufficiali MUV Fitness per Google Business Profile. Copia e incolla per rispondere alle domande frequenti." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Domande & Risposte ufficiali (per Google Business Profile)
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Istruzioni per copiare e incollare su Google Business Profile. 
                Ogni risposta è ottimizzata per informare e convertire. 
                <span className="text-brand-primary"> Usa il pulsante copia per ogni Q&A.</span>
              </p>
            </div>

            {/* FAQ Cards */}
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-brand-primary flex items-start justify-between gap-4">
                      <span className="flex-1">{faq.question}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(`${faq.question}\n\n${faq.answer}`, faq.question)}
                        className="min-h-[44px] min-w-[44px] border-gray-600 hover:border-brand-primary hover:bg-brand-primary/10 flex-shrink-0"
                        aria-label={`Copia domanda e risposta: ${faq.question}`}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <details className="group">
                      <summary className="cursor-pointer text-gray-300 hover:text-white transition-colors list-none flex items-center gap-2">
                        <span className="w-0 h-0 border-l-[6px] border-l-brand-primary border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent group-open:rotate-90 transition-transform"></span>
                        Visualizza risposta completa
                      </summary>
                      <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
                        <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Instructions */}
            <Card className="mt-12 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border-brand-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Come utilizzare su Google Business Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="bg-brand-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">1</span>
                    <span>Accedi al tuo Google Business Profile</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-brand-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">2</span>
                    <span>Vai alla sezione "Domande e risposte"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-brand-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">3</span>
                    <span>Clicca "Copia" su ogni Q&A qui sopra e incollala come risposta ufficiale</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-brand-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">4</span>
                    <span>Pubblica come "Risposta del proprietario" per massima credibilità</span>
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* CTA Footer */}
            <div className="mt-16 text-center">
              <Button 
                size="lg"
                variant="outline"
                className="min-h-[44px] px-8 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                asChild
              >
                <a href="/recensioni/">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Apri la pagina Recensioni
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default FaqGbp;