
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import StaticSEO from "@/components/SEO/StaticSEO";

const Risultati = () => {
  const testimonianze = [
    {
      name: "Maria B.",
      age: "42 anni",
      obiettivo: "Dimagrimento",
      risultato: "-15kg in 6 mesi",
      quote: "Dopo 3 gravidanze pensavo fosse impossibile tornare in forma. Con il metodo EMS di Centro fitness MUV ho perso 15kg in 6 mesi, allenandomi solo 2 volte a settimana. Ora mi sento più bella che a 20 anni!",
      avatar: "MB",
      tempo: "6 mesi fa"
    },
    {
      name: "Giuseppe R.",
      age: "55 anni", 
      obiettivo: "Mal di schiena cronico",
      risultato: "Dolore eliminato al 100%",
      quote: "15 anni di mal di schiena, visite specialistiche inutili. Christian con il Pancafit ha risolto tutto in 8 settimane. Non prendo più antidolorifici e ho ripreso a giocare a tennis.",
      avatar: "GR",
      tempo: "3 mesi fa"
    },
    {
      name: "Anna V.",
      age: "38 anni",
      obiettivo: "Tonificazione post-parto", 
      risultato: "-12kg e +30% forza",
      quote: "Dopo il parto mi sentivo a pezzi. Serena mi ha seguita con pazienza e professionalità. In 4 mesi ho ritrovato la mia forma fisica e conquistato una forza che non avevo mai avuto.",
      avatar: "AV",
      tempo: "4 mesi fa"
    },
    {
      name: "Luca N.",
      age: "29 anni",
      obiettivo: "Massa muscolare",
      risultato: "+8kg massa magra",
      quote: "Mauro ha trasformato il mio fisico in 12 settimane. Da magro a muscoloso, con un programma su misura che non mi ha mai annoiato. Risultati che in palestra non avevo mai ottenuto.",
      avatar: "LN",
      tempo: "5 mesi fa"
    },
    {
      name: "Francesca G.",
      age: "47 anni",
      obiettivo: "Riabilitazione ginocchio",
      risultato: "Mobilità completa recuperata",
      quote: "Dopo l'operazione al ginocchio i medici mi avevano dato poche speranze. Il team Centro fitness MUV mi ha fatto tornare a correre in 6 mesi. Ora faccio sport come una ragazzina.",
      avatar: "FG",
      tempo: "8 mesi fa"
    },
    {
      name: "Marco B.",
      age: "34 anni",
      obiettivo: "Preparazione atletica",
      risultato: "Record personale maratona",
      quote: "Grazie all'allenamento scientifico di Centro fitness MUV ho migliorato il mio tempo in maratona di 12 minuti. Approccio completamente diverso dalle solite palestre. Qui si studia ogni dettaglio.",
      avatar: "MB",
      tempo: "2 mesi fa"
    }
  ];

  return (
    <>
      <StaticSEO
        title="Risultati Clienti MUV Fitness Legnago - Testimonianze e Trasformazioni Reali"
        description="Scopri i risultati reali dei nostri clienti: dimagrimento, tonificazione, risoluzione mal di schiena. Testimonianze verificate e trasformazioni documentate."
        keywords="risultati fitness legnago, testimonianze palestra, trasformazioni clienti muv, prima dopo fitness"
      />
      <div className="min-h-screen bg-background text-foreground">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Risultati reali di clienti{" "}
            <span className="text-brand-primary">veri</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <strong>Non promesse vuote, ma trasformazioni documentate.</strong> Queste sono le storie di persone come te 
            che hanno scelto MUV Fitness per cambiare la loro vita. 
            <span className="text-brand-primary">Il prossimo potresti essere tu.</span>
          </p>
          </header>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonianze.map((testimonianza, index) => (
              <Card key={index} className="bg-card border-border hover:border-brand-primary transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent rounded-full flex items-center justify-center text-primary-foreground font-bold mr-4">
                      {testimonianza.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{testimonianza.name}</h3>
                      <p className="text-muted-foreground text-sm">{testimonianza.age}</p>
                      <p className="text-brand-primary text-sm font-semibold">{testimonianza.obiettivo}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex mb-2" aria-label="Valutazione 5 stelle">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-green-600 font-bold text-sm mb-3">
                      ✅ RISULTATO: {testimonianza.risultato}
                    </p>
                  </div>
                  
                  <blockquote className="text-foreground italic leading-relaxed mb-3">
                    "{testimonianza.quote}"
                  </blockquote>
                  
                  <p className="text-xs text-muted-foreground">
                    Testimonianza raccolta {testimonianza.tempo}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-r from-brand-primary/20 via-brand-accent/20 to-brand-info/20 p-8 rounded-lg border border-brand-primary/30">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Vuoi essere il prossimo caso di successo?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              <strong>Queste persone hanno iniziato esattamente come te:</strong> piene di dubbi, con obiettivi che sembravano impossibili. 
              <span className="text-brand-primary block mt-2">
                Oggi sono la prova vivente che il metodo MUV Fitness funziona davvero.
              </span>
            </p>
            <div className="flex justify-center">
              <Link to="/contatti">
                <Button 
                  className="bg-brand-primary hover:bg-brand-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center min-h-[44px]"
                  aria-label="Inizia la tua trasformazione con MUV Fitness Legnago"
                >
                  Inizia la tua trasformazione
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Link */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <Card className="bg-card/50 border-border backdrop-blur-sm max-w-md mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Vuoi lasciare anche tu una recensione?</h3>
              <p className="text-muted-foreground mb-6">La tua esperienza può aiutare altre persone a scoprire MUV Fitness</p>
              <Button 
                asChild 
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-primary-foreground font-semibold min-h-[44px]"
              >
                <Link to="/recensioni">Come lasciare una recensione</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
    </>
  );
};

export default Risultati;
