import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Heart, Shield, Clock, Star, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import MUVContactForm from '@/components/contact/MUVContactForm';

const RiabilitazioneInfortuni = () => {
  const benefici = [
    {
      icon: Heart,
      title: "Recupero accelerato",
      description: "Tecniche avanzate EMS e terapie manuali per ridurre i tempi di guarigione del 40%"
    },
    {
      icon: Shield,
      title: "Prevenzione ricadute",
      description: "Rinforzo muscolare mirato per evitare nuovi infortuni nella stessa zona"
    },
    {
      icon: Activity,
      title: "Ritorno al movimento",
      description: "Programmi progressivi per tornare alle attività sportive e quotidiane in sicurezza"
    },
    {
      icon: Clock,
      title: "Monitoraggio costante",
      description: "Valutazioni settimanali per adattare il programma ai progressi e alle esigenze"
    }
  ];

  const infortuni = [
    {
      tipo: "Mal di Schiena",
      icona: "🦴",
      descrizione: "Lombalgia, ernie, discopatie",
      soluzioni: ["Pancafit®", "Rinforzo core", "Posturale", "Massoterapia"],
      tempi: "4-8 settimane"
    },
    {
      tipo: "Ginocchio",
      icona: "🦵",
      descrizione: "Post-operatorio, menisco, legamenti",
      soluzioni: ["EMS selettivo", "Propriocezione", "Rinforzo quadricipite", "Mobilizzazione"],
      tempi: "6-12 settimane"
    },
    {
      tipo: "Spalla",
      icona: "💪",
      descrizione: "Capsulite, cuffia dei rotatori, lussazioni",
      soluzioni: ["Terapia manuale", "Pilates mirato", "Rinforzo stabilizzatori", "Stretching"],
      tempi: "8-16 settimane"
    }
  ];

  const testimonianze = [
    {
      nome: "Marco T.",
      età: "35 anni",
      infortunio: "Rottura LCA",
      storia: "Dopo l'operazione al crociato pensavo di non poter più giocare a calcio. Con MUV ho recuperato forza e fiducia. Ora sono tornato in campo più forte di prima!",
      risultato: "Ritorno al calcio agonistico"
    },
    {
      nome: "Laura S.",
      età: "42 anni", 
      infortunio: "Ernia L5-S1",
      storia: "Il mal di schiena mi bloccava per giorni. Con Pancafit e il rinforzo del core non ho più avuto episodi acuti. Posso di nuovo correre!",
      risultato: "Zero episodi acuti in 6 mesi"
    },
    {
      nome: "Andrea R.",
      età: "28 anni",
      infortunio: "Capsulite spalla",
      storia: "Non riuscivo più ad alzare il braccio. Il programma di riabilitazione MUV mi ha restituito il 100% del movimento. Incredibile!",
      risultato: "Mobilità completa recuperata"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Riabilitazione Infortuni e Fisioterapia | MUV Fitness Legnago</title>
        <meta name="description" content="Centro riabilitazione infortuni a Legnago. EMS, Pancafit, fisioterapia per mal di schiena, ginocchio, spalla. Consulenza fisioterapica GRATUITA!" />
        <meta name="keywords" content="riabilitazione infortuni legnago, fisioterapia legnago, mal di schiena, recupero post operatorio" />
        <link rel="canonical" href="https://www.muvfitness.it/riabilitazione-infortuni" />
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-primary/10 via-background to-brand-secondary/10 pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <span className="bg-brand-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
                  🏥 CENTRO RIABILITAZIONE SPECIALIZZATO
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-heading font-black mb-6">
                <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
                  Recupera Più Veloce
                </span>
                <br />
                dal Tuo Infortunio
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                <strong className="text-brand-primary">Riabilitazione avanzata</strong> con tecnologie EMS, 
                Pancafit® e terapie manuali. Ritorna alle tue attività più forte di prima.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link to="/form-contatti">
                  <Button size="lg" className="bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 text-lg">
                    🎁 Consulenza Fisioterapica Gratuita
                  </Button>
                </Link>
                <a href="https://wa.me/393887078662?text=Ciao! Ho bisogno di riabilitazione per un infortunio" target="_blank">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                    💬 WhatsApp Urgente
                  </Button>
                </a>
              </div>

              <div className="glass-card p-6 rounded-2xl border-brand-primary/30">
                <p className="text-lg font-semibold text-brand-primary mb-2">
                  ✨ PACCHETTO RIABILITAZIONE COMPLETO ✨
                </p>
                <p className="text-foreground">
                  <strong>Valutazione fisioterapica + Piano riabilitativo + Prima settimana GRATUITA</strong><br />
                  Tempi di recupero ridotti del 40% rispetto alla riabilitazione tradizionale
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Infortuni che trattiamo */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                  Infortuni che <span className="text-brand-primary">riabilitiamo</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Protocolli specifici per ogni tipo di lesione
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {infortuni.map((infortunio, index) => (
                  <Card key={index} className="border-brand-primary/20 hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-5xl mb-4">{infortunio.icona}</div>
                        <h3 className="text-2xl font-bold text-brand-primary mb-2">{infortunio.tipo}</h3>
                        <p className="text-muted-foreground mb-4">{infortunio.descrizione}</p>
                        
                        <div className="text-left">
                          <p className="font-semibold mb-2">Trattamenti:</p>
                          <ul className="space-y-1 mb-4">
                            {infortunio.soluzioni.map((soluzione, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="text-green-600" size={16} />
                                <span>{soluzione}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="bg-brand-primary/10 p-3 rounded-lg">
                            <p className="text-sm font-semibold text-brand-primary">
                              ⏱️ Tempo medio recupero: {infortunio.tempi}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Perché scegliere MUV */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                  Perché scegliere <span className="text-brand-primary">MUV</span> per la riabilitazione?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Tecnologie avanzate e approccio personalizzato per risultati superiori
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {benefici.map((beneficio, index) => {
                  const Icon = beneficio.icon;
                  return (
                    <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-brand-primary/10 p-3 rounded-full group-hover:bg-brand-primary/20 transition-colors">
                            <Icon className="text-brand-primary" size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-2">{beneficio.title}</h3>
                            <p className="text-muted-foreground">{beneficio.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Tecnologie utilizzate */}
              <div className="mt-16 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-center mb-8">Le nostre tecnologie avanzate</h3>
                
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-3">⚡</div>
                    <h4 className="font-bold mb-2">EMS Miofasciale</h4>
                    <p className="text-sm text-muted-foreground">
                      Elettrostimolazione per rinforzo muscolare selettivo e riduzione dolore
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl mb-3">🦴</div>
                    <h4 className="font-bold mb-2">Pancafit® Method</h4>
                    <p className="text-sm text-muted-foreground">
                      Riequilibrio posturale globale per trattare la causa, non solo il sintomo
                    </p>
                  </div>
                  
                  
                  <div className="text-center">
                    <div className="text-3xl mb-3">🤲</div>
                    <h4 className="font-bold mb-2">Terapia Manuale</h4>
                    <p className="text-sm text-muted-foreground">
                      Manipolazioni e mobilizzazioni per recuperare il movimento articolare
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl mb-3">🎯</div>
                    <h4 className="font-bold mb-2">Pilates Clinico</h4>
                    <p className="text-sm text-muted-foreground">
                      Esercizi specifici per stabilità e controllo del movimento
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonianze */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                  Storie di <span className="text-brand-primary">guarigione</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Scopri come abbiamo aiutato altri a superare i loro infortuni
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonianze.map((testimonianza, index) => (
                  <Card key={index} className="bg-white border-brand-primary/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="text-yellow-400 fill-current" size={16} />
                        ))}
                      </div>
                      <div className="mb-3">
                        <span className="bg-brand-accent/10 text-brand-accent px-2 py-1 rounded text-xs font-semibold">
                          {testimonianza.infortunio}
                        </span>
                      </div>
                      <blockquote className="text-muted-foreground mb-4 italic">
                        "{testimonianza.storia}"
                      </blockquote>
                      <div className="border-t pt-4">
                        <p className="font-semibold text-brand-primary">{testimonianza.nome}</p>
                        <p className="text-sm text-muted-foreground">{testimonianza.età}</p>
                        <p className="text-sm font-semibold text-brand-accent mt-2">
                          ✅ {testimonianza.risultato}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Processo riabilitativo */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                  Il nostro <span className="text-brand-primary">processo</span> riabilitativo
                </h2>
                <p className="text-xl text-muted-foreground">
                  4 fasi per il tuo recupero completo
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-brand-primary/10 to-transparent rounded-xl">
                  <div className="bg-brand-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Valutazione Completa</h3>
                    <p className="text-muted-foreground">
                      Analisi posturale, test funzionali, storia clinica e definizione obiettivi personalizzati
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-brand-secondary/10 to-transparent rounded-xl">
                  <div className="bg-brand-secondary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Fase Acuta</h3>
                    <p className="text-muted-foreground">
                      Controllo del dolore, riduzione infiammazione e primi movimenti assistiti
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-brand-accent/10 to-transparent rounded-xl">
                  <div className="bg-brand-accent text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Recupero Funzionale</h3>
                    <p className="text-muted-foreground">
                      Rinforzo muscolare progressivo, recupero mobilità articolare e coordinazione
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-brand-primary/10 to-transparent rounded-xl">
                  <div className="bg-brand-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Ritorno all'Attività</h3>
                    <p className="text-muted-foreground">
                      Preparazione sport-specifica, prevenzione ricadute e mantenimento risultati
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-brand-accent/10 rounded-2xl text-center">
                <p className="text-lg font-semibold text-brand-accent mb-2">
                  🏆 GARANZIA RISULTATO
                </p>
                <p className="text-muted-foreground">
                  Se non raggiungi gli obiettivi concordati entro i tempi stabiliti, 
                  <strong> continuiamo il trattamento gratuitamente</strong> fino al recupero completo!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Contatti */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                Inizia il tuo <span className="text-brand-primary">recupero</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Compila il form per la tua consulenza fisioterapica gratuita
              </p>
              
              <div className="glass-card p-6 rounded-2xl border-brand-primary/30 mb-8">
                <p className="text-lg font-semibold text-brand-primary mb-2">
                  ✨ INCLUSO NELLA CONSULENZA GRATUITA ✨
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">🔬 Valutazione</p>
                    <p>Fisioterapica completa</p>
                  </div>
                  <div>
                    <p className="font-semibold">📋 Piano</p>
                    <p>Riabilitativo personalizzato</p>
                  </div>
                  <div>
                    <p className="font-semibold">🎯 Obiettivi</p>
                    <p>E tempi di recupero</p>
                  </div>
                </div>
              </div>
            </div>

            <MUVContactForm 
              campaignName="Riabilitazione Infortuni MUV"
              defaultObjective="Riabilitazione e recupero infortuni"
            />

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                🚨 <strong className="text-brand-primary">CASI URGENTI</strong> - 
                Chiamaci al <strong className="text-brand-accent">388 707 8662</strong> per consulenza immediata
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default RiabilitazioneInfortuni;