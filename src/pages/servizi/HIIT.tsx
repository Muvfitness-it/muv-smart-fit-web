import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, CheckCircle, Clock, TrendingUp, Target, Heart, Flame } from "lucide-react";
import SimpleSEO from "@/components/SEO/SimpleSEO";
import EnhancedFAQSchema from "@/components/SEO/EnhancedFAQSchema";

const HIIT = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Allenamento HIIT Legnago",
    "description": "Allenamento HIIT ad alta intensità a Legnago. Brucia grassi, migliora resistenza e accelera il metabolismo in sessioni da 30-45 minuti.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "MUV Fitness",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Viale dei Tigli 14",
        "addressLocality": "Legnago", 
        "addressRegion": "VR",
        "postalCode": "37045",
        "addressCountry": "IT"
      },
      "telephone": "+39 347 1234567"
    },
    "areaServed": ["Legnago", "Verona", "Cerea", "Bovolone", "San Bonifacio"],
    "serviceType": "Allenamento HIIT"
  };

  const faqs = [
    {
      question: "Cos'è l'allenamento HIIT e perché è così efficace?",
      answer: "HIIT (High Intensity Interval Training) alterna brevi periodi di esercizio intenso a fasi di recupero. È efficace perché brucia grassi anche 24 ore dopo l'allenamento e migliora rapidamente la resistenza cardiovascolare."
    },
    {
      question: "Quanto dura una sessione HIIT a Legnago?",
      answer: "Le nostre sessioni HIIT durano 30-45 minuti, includendo riscaldamento e defaticamento. Questo tempo è sufficiente per ottenere risultati superiori a un'ora di cardio tradizionale."
    },
    {
      question: "L'allenamento HIIT è adatto a principianti?",
      answer: "Sì, l'HIIT è adattabile a tutti i livelli. I nostri trainer personalizzano intensità e esercizi in base alla tua forma fisica, garantendo progressi sicuri e costanti."
    },
    {
      question: "Quante calorie si bruciano con l'HIIT?",
      answer: "Durante una sessione HIIT si bruciano 400-600 calorie, ma l'effetto continua per 24-48 ore grazie all'EPOC (consumo eccessivo di ossigeno post-esercizio)."
    },
    {
      question: "Quante volte a settimana posso fare HIIT?",
      answer: "Per risultati ottimali raccomandiamo 3-4 sessioni settimanali, con almeno un giorno di riposo tra le sessioni per permettere il recupero completo."
    }
  ];

  return (
    <>
      <SimpleSEO
        title="Allenamento HIIT Legnago | Training Alta Intensità MUV Fitness"
        description="Allenamento HIIT a Legnago: brucia grassi, aumenta resistenza e accelera metabolismo. Training ad alta intensità per risultati rapidi. Prova gratuita!"
        keywords="allenamento HIIT Legnago, training alta intensità, brucia grassi, fitness Legnago, cardio intenso, metabolismo"
        canonical="https://www.muvfitness.it/servizi/hiit"
        structuredData={structuredData}
      />
      <EnhancedFAQSchema faqs={faqs} pageTitle="Allenamento HIIT Legnago - Domande Frequenti" />
      
      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-destructive/20 via-background to-primary/20">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex justify-center mb-6">
              <Flame className="w-16 h-16 text-destructive" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Allenamento <span className="text-destructive">HIIT Legnago</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Training ad alta intensità per bruciare grassi e migliorare le performance
            </p>
            <Link to="/contatti">
              <Button size="lg" className="text-lg px-8 py-4">
                Prenota HIIT Gratuito
              </Button>
            </Link>
          </div>
        </section>

        {/* Cosa è HIIT */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Cos'è l'<span className="text-destructive">Allenamento HIIT</span>?
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  HIIT (High Intensity Interval Training) è il metodo di allenamento più efficace per chi vuole 
                  risultati massimi in tempi ridotti. Alternando fasi di massima intensità a brevi recuperi, 
                  trasforma il tuo corpo in una macchina brucia-grassi 24 ore su 24.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary mr-3 mt-0.5" />
                    <span>Brucia grassi fino a 48 ore dopo l'allenamento</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary mr-3 mt-0.5" />
                    <span>Migliora la resistenza cardiovascolare del 20%</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary mr-3 mt-0.5" />
                    <span>Aumenta il metabolismo basale permanentemente</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary mr-3 mt-0.5" />
                    <span>Risultati superiori al cardio tradizionale</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card p-8 rounded-lg border">
                <h3 className="text-2xl font-bold text-center mb-6">Perché HIIT Funziona</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-destructive mx-auto mb-2" />
                    <p className="font-semibold">Tempo Efficiente</p>
                    <p className="text-sm text-muted-foreground">30-45 minuti</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold">Afterburn</p>
                    <p className="text-sm text-muted-foreground">24-48h brucia grassi</p>
                  </div>
                  <div className="text-center">
                    <Heart className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <p className="font-semibold">Cardio Potente</p>
                    <p className="text-sm text-muted-foreground">+20% resistenza</p>
                  </div>
                  <div className="text-center">
                    <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold">Performance</p>
                    <p className="text-sm text-muted-foreground">Atletiche</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefici HIIT */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Benefici dell'<span className="text-destructive">Allenamento HIIT</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-destructive">Dimagrimento Esplosivo</h3>
                  <p className="text-muted-foreground">Bruci più calorie in meno tempo e continui a bruciare anche ore dopo l'allenamento grazie all'effetto EPOC.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-primary">Resistenza Cardiovascolare</h3>
                  <p className="text-muted-foreground">Migliora drasticamente la capacità del cuore e dei polmoni, aumentando la resistenza nella vita quotidiana.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-secondary">Performance Atletiche</h3>
                  <p className="text-muted-foreground">Aumenta velocità, potenza esplosiva e resistenza per ogni disciplina sportiva.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-primary">Metabolismo Accelerato</h3>
                  <p className="text-muted-foreground">Incrementa il metabolismo basale, permettendo di bruciare più calorie anche a riposo.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-destructive">Efficienza Temporale</h3>
                  <p className="text-muted-foreground">Ottieni risultati superiori a un'ora di cardio tradizionale in soli 30-45 minuti.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-secondary">Versatilità Completa</h3>
                  <p className="text-muted-foreground">Adattabile a tutti i livelli di fitness con progressioni personalizzate.</p>
                </CardContent>
              </Card>
            </div>

            {/* Metodologia HIIT */}
            <div className="bg-card p-8 rounded-lg border mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Il Nostro Metodo HIIT</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Riscaldamento</h4>
                  <p className="text-sm text-muted-foreground">Preparazione muscolare e cardiovascolare graduale</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Intensità Massima</h4>
                  <p className="text-sm text-muted-foreground">20-40 secondi di esercizio ad alta intensità</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Recupero Attivo</h4>
                  <p className="text-sm text-muted-foreground">10-20 secondi di recupero controllato</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Defaticamento</h4>
                  <p className="text-sm text-muted-foreground">Ritorno graduale alla normalità</p>
                </div>
              </div>
            </div>

            {/* Perfetto Per */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-2xl font-bold text-destructive mb-4">HIIT è Perfetto Per Te Se...</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" />
                    <span>Vuoi dimagrire velocemente</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" />
                    <span>Hai poco tempo per allenarti</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" />
                    <span>Vuoi migliorare le performance sportive</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" />
                    <span>Cerchi un allenamento stimolante</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-2xl font-bold text-primary mb-4">Risultati Tipici HIIT</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Perdita peso accelerata (1-2 kg/settimana)</li>
                  <li>• Miglioramento resistenza (15-20%)</li>
                  <li>• Riduzione grasso corporeo visibile</li>
                  <li>• Aumento energia quotidiana</li>
                  <li>• Miglioramento umore e stress</li>
                  <li>• Performance atletiche superiori</li>
                </ul>
              </div>
            </div>

            {/* FAQ Section */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Domande Frequenti sul <span className="text-destructive">HIIT a Legnago</span>
            </h2>
            
            <div className="grid md:grid-cols-1 gap-6 mb-16">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold mb-3 text-destructive">{faq.question}</h4>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Finale */}
            <div className="text-center bg-destructive/10 p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <Zap className="w-12 h-12 text-destructive" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Sfida Te Stesso con l'HIIT</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Prova una sessione HIIT gratuita da MUV Fitness Legnago e scopri il tuo vero potenziale
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contatti">
                  <Button size="lg" className="text-lg px-8 py-4">
                    Prenota HIIT Gratuito
                  </Button>
                </Link>
                <Link to="/contatti">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                    Chiama: 347 1234567
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                📍 Viale dei Tigli 14, Legnago (VR) | Servizio per Legnago, Cerea, Bovolone, San Bonifacio
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HIIT;