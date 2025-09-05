import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Apple, CheckCircle, Brain, Heart, TrendingUp, Users, Target } from "lucide-react";
import SimpleSEO from "@/components/SEO/SimpleSEO";
import EnhancedFAQSchema from "@/components/SEO/EnhancedFAQSchema";

const Nutrizione = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Nutrizionista Legnago",
    "description": "Consulenza nutrizionale personalizzata a Legnago. Piani alimentari su misura per dimagrimento, aumento massa muscolare e benessere generale.",
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
    "serviceType": "Consulenza Nutrizionale"
  };

  const faqs = [
    {
      question: "Come funziona la consulenza nutrizionale a Legnago?",
      answer: "La consulenza inizia con un'analisi completa delle tue abitudini alimentari, composizione corporea e obiettivi. Poi creiamo un piano nutrizionale personalizzato con monitoraggio costante."
    },
    {
      question: "Il nutrizionista può aiutarmi a dimagrire?",
      answer: "Sì, il nostro approccio si basa su piani alimentari sostenibili che favoriscono un dimagrimento graduale e duraturo, senza rinunce estreme o effetti yo-yo."
    },
    {
      question: "Quanto costa la consulenza nutrizionale?",
      answer: "Offriamo diverse opzioni: consulenza singola, pacchetti mensili e programmi integrati con l'allenamento. La prima consulenza è gratuita per valutare insieme il percorso migliore."
    },
    {
      question: "Il piano alimentare tiene conto di intolleranze e allergie?",
      answer: "Assolutamente sì. Personalizziamo ogni piano considerando intolleranze, allergie, preferenze alimentari e stile di vita per garantire un percorso sostenibile."
    },
    {
      question: "Quanto tempo serve per vedere i risultati?",
      answer: "I primi cambiamenti si notano già dopo 2-3 settimane. Risultati significativi e duraturi si ottengono in 2-3 mesi con un approccio costante e personalizzato."
    }
  ];

  return (
    <>
      <SimpleSEO
        title="Nutrizionista Legnago | Consulenza Alimentare MUV Fitness"
        description="Nutrizionista a Legnago: piani alimentari personalizzati per dimagrimento, massa muscolare e benessere. Consulenza gratuita. Approccio sostenibile."
        keywords="nutrizionista Legnago, consulenza nutrizionale, dieta personalizzata, dimagrimento, alimentazione sana, dietologo Verona"
        canonical="https://www.muvfitness.it/servizi/nutrizione"
        structuredData={structuredData}
      />
      <EnhancedFAQSchema faqs={faqs} pageTitle="Nutrizionista Legnago - Domande Frequenti" />
      
      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex justify-center mb-6">
              <Apple className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-primary">Nutrizionista</span> Legnago
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Alimentazione personalizzata per raggiungere i tuoi obiettivi di salute e forma fisica
            </p>
            <Link to="/contatti">
              <Button size="lg" className="text-lg px-8 py-4">
                Consulenza Gratuita
              </Button>
            </Link>
          </div>
        </section>

        {/* Approccio Nutrizionale */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Il Nostro <span className="text-primary">Approccio Nutrizionale</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Non crediamo nelle diete estreme o temporanee. Il nostro metodo si basa sull'educazione 
                  alimentare e sulla creazione di abitudini sostenibili che ti accompagneranno per tutta la vita. 
                  Ogni piano è studiato su misura per te, considerando i tuoi gusti, stile di vita e obiettivi.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary mr-3 mt-0.5" />
                    <span>Piani alimentari completamente personalizzati</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary mr-3 mt-0.5" />
                    <span>Educazione nutrizionale per l'autonomia</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary mr-3 mt-0.5" />
                    <span>Monitoraggio costante e adattamenti</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-primary mr-3 mt-0.5" />
                    <span>Integrazione con il programma di allenamento</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card p-8 rounded-lg border">
                <h3 className="text-2xl font-bold text-center mb-6">I Nostri Valori</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <Apple className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold">Sostenibilità</p>
                    <p className="text-sm text-muted-foreground">A lungo termine</p>
                  </div>
                  <div className="text-center">
                    <Brain className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <p className="font-semibold">Educazione</p>
                    <p className="text-sm text-muted-foreground">Alimentare</p>
                  </div>
                  <div className="text-center">
                    <Heart className="w-8 h-8 text-destructive mx-auto mb-2" />
                    <p className="font-semibold">Benessere</p>
                    <p className="text-sm text-muted-foreground">Completo</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold">Risultati</p>
                    <p className="text-sm text-muted-foreground">Misurabili</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Servizi Nutrizionali */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              I Nostri <span className="text-primary">Servizi Nutrizionali</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-primary">Dimagrimento Sostenibile</h3>
                  <p className="text-muted-foreground">Piani per perdere peso in modo graduale e duraturo, senza rinunce estreme o effetti yo-yo.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-secondary">Aumento Massa Muscolare</h3>
                  <p className="text-muted-foreground">Alimentazione specifica per supportare la crescita muscolare e ottimizzare i risultati dell'allenamento.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-primary">Ricomposizione Corporea</h3>
                  <p className="text-muted-foreground">Strategie nutrizionali per perdere grasso e aumentare la massa magra contemporaneamente.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-secondary">Alimentazione Sportiva</h3>
                  <p className="text-muted-foreground">Piani specifici per atleti e sportivi per ottimizzare performance e recupero.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-primary">Gestione Patologie</h3>
                  <p className="text-muted-foreground">Supporto nutrizionale per diabete, ipertensione, colesterolo alto e altre condizioni metaboliche.</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-secondary">Educazione Alimentare</h3>
                  <p className="text-muted-foreground">Workshop e consulenze per imparare a mangiare in modo consapevole e bilanciato.</p>
                </CardContent>
              </Card>
            </div>

            {/* Processo Consulenza */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Il Nostro <span className="text-primary">Percorso</span>
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Valutazione Iniziale</h4>
                <p className="text-sm text-muted-foreground">Analisi completa di abitudini, composizione corporea e obiettivi</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Piano Personalizzato</h4>
                <p className="text-sm text-muted-foreground">Creazione del piano alimentare su misura per te</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Monitoraggio</h4>
                <p className="text-sm text-muted-foreground">Controlli regolari e adattamenti del piano</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Autonomia</h4>
                <p className="text-sm text-muted-foreground">Educazione per mantenere i risultati nel tempo</p>
              </div>
            </div>

            {/* Cosa Include */}
            <div className="bg-card p-8 rounded-lg border mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Cosa Include la Consulenza</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" />
                    <span>Analisi della composizione corporea</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" />
                    <span>Piano alimentare personalizzato</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" />
                    <span>Lista della spesa settimanale</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" />
                    <span>Ricette e menu giornalieri</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" />
                    <span>Supporto via WhatsApp</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" />
                    <span>Adattamenti del piano</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" />
                    <span>Educazione nutrizionale</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5" />
                    <span>Integrazione con l'allenamento</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* FAQ Section */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Domande Frequenti sul <span className="text-primary">Nutrizionista a Legnago</span>
            </h2>
            
            <div className="grid md:grid-cols-1 gap-6 mb-16">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold mb-3 text-primary">{faq.question}</h4>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Finale */}
            <div className="text-center bg-primary/10 p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Inizia la Tua Trasformazione Alimentare</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Prenota una consulenza nutrizionale gratuita e scopri come raggiungere i tuoi obiettivi con un approccio sostenibile
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contatti">
                  <Button size="lg" className="text-lg px-8 py-4">
                    Consulenza Gratuita
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

export default Nutrizione;