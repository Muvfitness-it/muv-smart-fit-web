import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Heart, Shield, Clock, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import MUVContactForm from '@/components/contact/MUVContactForm';

const SeniorFitness = () => {
  const benefici = [
    {
      icon: Heart,
      title: "Salute cardiovascolare",
      description: "Esercizi dolci che migliorano circolazione e resistenza senza affaticare il cuore"
    },
    {
      icon: Shield,
      title: "Prevenzione cadute",
      description: "Rinforzo equilibrio e stabilità per mantenere autonomia e sicurezza quotidiana"
    },
    {
      icon: Users,
      title: "Socializzazione",
      description: "Ambiente accogliente dove condividere il percorso fitness con persone della tua età"
    },
    {
      icon: Clock,
      title: "Orari comodi",
      description: "Sessioni mattutine e pomeridiane pensate per le esigenze degli over 65"
    }
  ];

  const testimonianze = [
    {
      nome: "Giuseppe R.",
      età: "72 anni",
      storia: "Dopo l'infarto pensavo di non poter più fare attività fisica. Con la ginnastica dolce MUV ho ritrovato energia e fiducia. Ora cammino 5 km senza problemi!",
      risultato: "Ritorno all'attività quotidiana"
    },
    {
      nome: "Maria C.",
      età: "68 anni",
      storia: "Le cadute mi avevano fatto perdere fiducia. Con gli esercizi di equilibrio non ho più paura di uscire da sola. Mi sento rinata!",
      risultato: "Nessuna caduta in 8 mesi"
    },
    {
      nome: "Franco B.",
      età: "75 anni",
      storia: "L'artrite mi bloccava. La ginnastica dolce e il movimento in acqua hanno ridotto i dolori del 80%. Ora gioco di nuovo con i nipoti!",
      risultato: "Dolori ridotti dell'80%"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Fitness Over 65 e Ginnastica Dolce | MUV Fitness Legnago</title>
        <meta name="description" content="Programmi fitness specializzati per over 65 a Legnago. Ginnastica dolce, prevenzione cadute, riabilitazione. Consulenza medica GRATUITA!" />
        <meta name="keywords" content="fitness over 65 legnago, ginnastica dolce anziani, prevenzione cadute, attività fisica terza età" />
        <link rel="canonical" href="https://www.muvfitness.it/senior-fitness" />
      </Helmet>

      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-primary/10 via-background to-brand-secondary/10 pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <span className="bg-brand-accent text-white px-4 py-2 rounded-full text-sm font-semibold">
                  👴👵 FITNESS OVER 65 SPECIALIZZATO
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-heading font-black mb-6">
                <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
                  Mantieniti Attivo
                </span>
                <br />
                a Ogni Età
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Programmi di <strong className="text-brand-primary">ginnastica dolce</strong> e riabilitazione 
                pensati per chi ha superato i 65 anni. Sicurezza, benessere e socializzazione.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link to="/form-contatti">
                  <Button size="lg" className="bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 text-lg">
                    🎁 Valutazione Gratuita
                  </Button>
                </Link>
                <a href="https://wa.me/393887078662?text=Ciao! Vorrei informazioni sui programmi fitness per over 65" target="_blank">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                    💬 WhatsApp
                  </Button>
                </a>
              </div>

              <div className="glass-card p-6 rounded-2xl border-brand-primary/30">
                <p className="text-lg font-semibold text-brand-primary mb-2">
                  ✨ OFFERTA SPECIALE SENIOR ✨
                </p>
                <p className="text-foreground">
                  <strong>Valutazione medico-funzionale GRATUITA</strong><br />
                  + Prima settimana di prova + Piano personalizzato
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
                Le tue <span className="text-brand-primary">preoccupazioni</span> sono le nostre priorità
              </h2>
              <p className="text-xl text-muted-foreground">
                Capiamo che dopo i 65 anni l'attività fisica richiede attenzioni speciali
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="border-l-4 border-l-brand-primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-brand-primary mb-3">
                    😰 "Ho paura di farmi male o di cadere"
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Con l'età aumentano i rischi e diminuisce la fiducia nei propri movimenti.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <p className="text-sm">
                      <strong>La nostra soluzione:</strong> Esercizi di equilibrio e coordinazione in ambiente protetto con assistenza costante
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-brand-secondary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-brand-secondary mb-3">
                    😔 "I dolori articolari mi limitano"
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Artrite, artrosi e rigidità rendono difficili i movimenti quotidiani.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <p className="text-sm">
                      <strong>La nostra soluzione:</strong> Ginnastica dolce in acqua e movimenti specifici per ridurre infiammazione e dolore
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-brand-accent">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-brand-accent mb-3">
                    😞 "Non so se posso fare attività fisica"
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Problemi cardiaci, ipertensione o diabete creano incertezza sull'esercizio.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <p className="text-sm">
                      <strong>La nostra soluzione:</strong> Valutazione medica preliminare e programmi approvati da specialisti geriatrici
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-brand-primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-brand-primary mb-3">
                    😔 "Mi sento solo e isolato"
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    L'isolamento sociale peggiora il benessere fisico e mentale.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                    <p className="text-sm">
                      <strong>La nostra soluzione:</strong> Gruppi di ginnastica dolce per socializzare e motivarsi a vicenda
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Servizi Specifici */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                  I nostri <span className="text-brand-primary">servizi senior</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Ogni attività è progettata per le esigenze degli over 65
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

              {/* Programmi Specifici */}
              <div className="mt-16 grid md:grid-cols-3 gap-8">
                <Card className="border-brand-primary/30">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">🏊‍♂️</div>
                    <h3 className="text-xl font-bold mb-3">Idrokinesiterapia</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Esercizi in acqua calda per chi ha problemi articolari severi. Peso ridotto e movimenti fluidi.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-brand-secondary/30">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">🧘‍♀️</div>
                    <h3 className="text-xl font-bold mb-3">Ginnastica Dolce</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Movimenti lenti e controllati per mantenere mobilità e forza muscolare. Gruppi piccoli.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-brand-accent/30">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">⚖️</div>
                    <h3 className="text-xl font-bold mb-3">Equilibrio & Coordinazione</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Esercizi specifici per prevenire cadute e mantenere l'autonomia negli spostamenti.
                    </p>
                  </CardContent>
                </Card>
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
                  Storie di <span className="text-brand-primary">rinascita</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Scopri come abbiamo aiutato persone della tua età a tornare attive
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
                Inizia in <span className="text-brand-primary">sicurezza</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Compila il form per la tua valutazione gratuita personalizzata
              </p>
              
              <div className="glass-card p-6 rounded-2xl border-brand-primary/30 mb-8">
                <p className="text-lg font-semibold text-brand-primary mb-2">
                  ✨ INCLUSO NELLA VALUTAZIONE GRATUITA ✨
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">🏥 Check-up</p>
                    <p>Medico-funzionale</p>
                  </div>
                  <div>
                    <p className="font-semibold">🎯 Programma</p>
                    <p>Personalizzato</p>
                  </div>
                  <div>
                    <p className="font-semibold">👥 Settimana</p>
                    <p>Di prova gratuita</p>
                  </div>
                </div>
              </div>
            </div>

            <MUVContactForm 
              campaignName="Senior Fitness MUV"
              defaultObjective="Fitness over 65 e ginnastica dolce"
            />

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                ⏰ <strong className="text-brand-primary">POSTI LIMITATI</strong> - 
                Solo <strong className="text-brand-accent">8 VALUTAZIONI GRATUITE</strong> questo mese per over 65
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SeniorFitness;