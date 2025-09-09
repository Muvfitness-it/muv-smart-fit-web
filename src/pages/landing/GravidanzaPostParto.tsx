import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Heart, Baby, Shield, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import MUVContactForm from '@/components/contact/MUVContactForm';

const GravidanzaPostParto = () => {
  const benefici = [
    {
      icon: Heart,
      title: "Preparazione al parto sicura",
      description: "Esercizi specifici per rafforzare il pavimento pelvico e preparare il corpo al travaglio"
    },
    {
      icon: Baby,
      title: "Recupero post-parto veloce",
      description: "Programmi personalizzati per ritrovare la forma fisica pre-gravidanza in sicurezza"
    },
    {
      icon: Shield,
      title: "Sicurezza garantita",
      description: "Personale specializzato in ginnastica pre e post natale con protocolli medici certificati"
    },
    {
      icon: Clock,
      title: "Flessibilità orari",
      description: "Orari adattabili alle esigenze di mamme e future mamme, anche con sessioni brevi"
    }
  ];

  const testimonianze = [
    {
      nome: "Giulia M.",
      età: "32 anni",
      storia: "Ho seguito il programma Pilates pre-natale dal 5° mese. Il parto è stato più facile del previsto e ho recuperato la forma in soli 4 mesi post-parto!",
      risultato: "Parto naturale senza complicazioni"
    },
    {
      nome: "Sara T.",
      età: "29 anni", 
      storia: "Dopo la seconda gravidanza pensavo di non poter più tornare in forma. Con il programma post-parto MUV ho perso 8 kg in 3 mesi.",
      risultato: "-8 kg in 3 mesi"
    },
    {
      nome: "Martina L.",
      età: "35 anni",
      storia: "Il mal di schiena in gravidanza era insopportabile. Con Pancafit e ginnastica dolce ho trovato sollievo immediato.",
      risultato: "Eliminato mal di schiena"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Fitness per Gravidanza e Post-Parto | MUV Fitness Legnago</title>
        <meta name="description" content="Programmi fitness specializzati per gravidanza e post-parto a Legnago. Pilates pre-natale, recupero post-parto, ginnastica dolce. Prima consulenza GRATUITA!" />
        <meta name="keywords" content="fitness gravidanza legnago, pilates pre natale, post parto fitness, ginnastica dolce gravidanza" />
        <link rel="canonical" href="https://www.muvfitness.it/gravidanza-post-parto" />
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-primary/10 via-background to-brand-secondary/10 pt-[var(--header-height)] pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <span className="bg-brand-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
                  👶 SPECIALISTI GRAVIDANZA & POST-PARTO
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-heading font-black mb-6">
                <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
                  Fitness Sicuro
                </span>
                <br />
                per Mamme e Future Mamme
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Preparati al parto con serenità e recupera la tua forma fisica dopo la gravidanza. 
                <strong className="text-brand-primary"> Programmi certificati</strong> seguiti da personale specializzato.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link to="/form-contatti">
                  <Button size="lg" className="bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 text-lg">
                    🎁 Consulenza Gratuita
                  </Button>
                </Link>
                <a href="https://wa.me/393887078662?text=Ciao! Vorrei informazioni sui programmi per gravidanza e post-parto" target="_blank">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                    💬 WhatsApp
                  </Button>
                </a>
              </div>

              <div className="glass-card p-6 rounded-2xl border-brand-primary/30">
                <p className="text-lg font-semibold text-brand-primary mb-2">
                  ✨ OFFERTA SPECIALE MAMME ✨
                </p>
                <p className="text-foreground">
                  <strong>Prima consulenza + valutazione posturale GRATUITA</strong><br />
                  + Piano personalizzato per gravidanza o post-parto
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problemi che risolviamo */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                Capiamo le tue <span className="text-brand-primary">preoccupazioni</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Ogni mamma ha bisogni specifici. Ecco come ti aiutiamo:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="border-l-4 border-l-brand-primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-brand-primary mb-3">
                    😰 "Ho paura di fare movimenti sbagliati"
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Durante la gravidanza ogni movimento deve essere sicuro e controllato.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <p className="text-sm">
                      <strong>La nostra soluzione:</strong> Personale certificato in fitness pre e post natale con protocolli medici approvati
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-brand-secondary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-brand-secondary mb-3">
                    😔 "Non riesco a tornare in forma dopo il parto"
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Il corpo post-parto ha bisogno di un approccio graduale e specifico.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <p className="text-sm">
                      <strong>La nostra soluzione:</strong> Programmi progressivi che rispettano i tempi di recupero del tuo corpo
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-brand-accent">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-brand-accent mb-3">
                    😣 "Soffro di mal di schiena e problemi posturali"
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Gravidanza e allattamento cambiano drasticamente la postura.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <p className="text-sm">
                      <strong>La nostra soluzione:</strong> Pancafit® e Pilates specifici per correggere la postura e eliminare i dolori
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-brand-primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-brand-primary mb-3">
                    ⏰ "Non ho tempo, sono sempre impegnata"
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Con i bambini trovare tempo per sé è una sfida quotidiana.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <p className="text-sm">
                      <strong>La nostra soluzione:</strong> Sessioni da 20-30 minuti con orari flessibili, anche durante l'ora della nanna
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefici */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                  I nostri <span className="text-brand-primary">servizi specializzati</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Ogni programma è studiato per le esigenze specifiche di mamme e future mamme
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
            </div>
          </div>
        </section>

        {/* Testimonianze */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                  Storie di <span className="text-brand-primary">successo</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Scopri come abbiamo aiutato altre mamme come te
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

        {/* Form Contatti */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                Inizia il tuo <span className="text-brand-primary">percorso</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Compila il form per la tua consulenza gratuita personalizzata
              </p>
              
              <div className="glass-card p-6 rounded-2xl border-brand-primary/30 mb-8">
                <p className="text-lg font-semibold text-brand-primary mb-2">
                  ✨ INCLUSO NELLA CONSULENZA GRATUITA ✨
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">📋 Valutazione</p>
                    <p>Posturale completa</p>
                  </div>
                  <div>
                    <p className="font-semibold">🎯 Piano</p>
                    <p>Personalizzato</p>
                  </div>
                  <div>
                    <p className="font-semibold">💬 Consulenza</p>
                    <p>Nutrizionale</p>
                  </div>
                </div>
              </div>
            </div>

            <MUVContactForm 
              campaignName="Gravidanza e Post-Parto MUV"
              defaultObjective="Fitness per gravidanza/post-parto"
            />

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                ⏰ <strong className="text-brand-primary">POSTI LIMITATI</strong> - 
                Solo <strong className="text-brand-accent">5 CONSULENZE GRATUITE</strong> questo mese per mamme
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default GravidanzaPostParto;