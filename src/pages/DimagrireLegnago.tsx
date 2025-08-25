import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Zap, TrendingDown, Heart, Scale, Clock } from 'lucide-react';
import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';

const DimagrireLegnago = () => {
  const programmi = [
    {
      nome: "Dimagrimento EMS",
      durata: "4 settimane",
      perdita: "5-8 kg",
      descrizione: "Programma intensivo con elettrostimolazione per bruciare grassi velocemente",
      benefici: ["Accelera metabolismo", "Tonifica muscoli", "Riduce cellulite"]
    },
    {
      nome: "Personal Training Dimagrante", 
      durata: "8 settimane",
      perdita: "8-12 kg",
      descrizione: "Allenamento personalizzato con coach esperto in dimagrimento",
      benefici: ["Piano su misura", "Controllo nutrizionale", "Motivazione costante"]
    },
    {
      nome: "Pacchetto Completo",
      durata: "12 settimane", 
      perdita: "12-18 kg",
      descrizione: "EMS + Personal Training + Consulenza nutrizionale completa",
      benefici: ["Risultati garantiti", "Supporto 360°", "Mantenimento peso"]
    }
  ];

  const metodiDimagrimento = [
    {
      metodo: "EMS Training",
      tempo: "20 minuti",
      calorie: "600 kcal",
      descrizione: "Elettrostimolazione muscolare per massimizzare il consumo calorico"
    },
    {
      metodo: "HIIT Personalizzato",
      tempo: "30 minuti", 
      calorie: "450 kcal",
      descrizione: "Allenamento ad alta intensità studiato per il tuo metabolismo"
    },
    {
      metodo: "Circuit Training",
      tempo: "45 minuti",
      calorie: "500 kcal", 
      descrizione: "Combinazione cardio-muscolare per massimo dimagrimento"
    }
  ];

  const storieDiSuccesso = [
    {
      nome: "Giulia M.",
      età: "32 anni",
      prima: "78 kg",
      dopo: "65 kg", 
      tempo: "3 mesi",
      testimonianza: "Non credevo fosse possibile! Ho perso 13 kg e mi sento rinata. Lo staff di MUV è incredibile!"
    },
    {
      nome: "Roberto P.",
      età: "45 anni", 
      prima: "95 kg",
      dopo: "80 kg",
      tempo: "4 mesi",
      testimonianza: "Dopo anni di tentativi falliti, finalmente ho trovato il metodo giusto. Grazie MUV!"
    },
    {
      nome: "Sara L.",
      età: "28 anni",
      prima: "72 kg", 
      dopo: "58 kg",
      tempo: "2 mesi",
      testimonianza: "Risultati rapidissimi con l'EMS! Non tornerò mai più alle palestre tradizionali."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dimagrire a Legnago Velocemente | Programmi Personalizzati MUV</title>
        <meta name="description" content="🔥 Dimagrire a Legnago con metodi scientifici! EMS, Personal Training e programmi su misura. Perdi 5-12 kg in 30 giorni. Consulenza gratuita!" />
        <meta name="keywords" content="dimagrire legnago, dimagrimento veloce legnago, perdere peso legnago, bruciare grassi legnago, dieta legnago, personal trainer dimagrimento legnago, ems dimagrire, dimagrimento localizzato legnago" />
        <link rel="canonical" href="https://www.muvfitness.it/dimagrire-legnago" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Dimagrire a Legnago Velocemente | Programmi Personalizzati MUV" />
        <meta property="og:description" content="🔥 Dimagrire a Legnago con metodi scientifici! EMS, Personal Training e programmi su misura. Perdi 5-12 kg in 30 giorni." />
        <meta property="og:url" content="https://www.muvfitness.it/dimagrire-legnago" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Programmi Dimagrimento Legnago",
            "description": "Programmi personalizzati per dimagrire velocemente a Legnago con EMS, Personal Training e consulenza nutrizionale",
            "provider": {
              "@type": "LocalBusiness",
              "name": "MUV Fitness Legnago",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Via Venti Settembre, 5/7",
                "addressLocality": "Legnago",
                "addressRegion": "Veneto",
                "postalCode": "37045",
                "addressCountry": "IT"
              },
              "telephone": "+39 351 338 0770"
            },
            "areaServed": ["Legnago", "Verona", "Bassa Veronese"],
            "offers": [{
              "@type": "Offer",
              "name": "Consulenza Dimagrimento Gratuita",
              "description": "Valutazione corporea e piano dimagrimento personalizzato gratuito",
              "price": "0",
              "priceCurrency": "EUR"
            }]
          })}
        </script>
      </Helmet>
      
      <LocalBusinessSchema />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-100 text-red-700 border-red-200">
              🔥 Dimagrimento Garantito
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Dimagrire a Legnago in 30 Giorni
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
              <strong>Dimagrimento scientifico e personalizzato</strong> con tecnologie EMS avanzate, 
              personal training specializzato e supporto nutrizionale completo. 
              <strong>Perdi 5-12 kg in modo sano e duraturo</strong> con il metodo MUV.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                to="/contatti"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg shadow-lg"
              >
                Consulenza Dimagrimento Gratuita
              </Link>
              <a 
                href="https://wa.me/393513380770?text=Ciao! Voglio dimagrire velocemente a Legnago. Quando posso iniziare?" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: Inizia Subito
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <Target className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="font-bold text-2xl text-red-600">5-12 kg</div>
                <div className="text-sm text-gray-600">Perdita peso garantita</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="font-bold text-2xl text-orange-600">30 giorni</div>
                <div className="text-sm text-gray-600">Primi risultati visibili</div>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <div className="font-bold text-2xl text-pink-600">100%</div>
                <div className="text-sm text-gray-600">Metodo scientifico</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programmi Dimagrimiento */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Programmi Dimagrimento Personalizzati
            </h2>
            <p className="text-lg text-muted-foreground">
              Scegli il percorso più adatto ai tuoi obiettivi e al tuo stile di vita
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programmi.map((programma, index) => (
              <Card key={index} className={`relative ${index === 1 ? 'border-primary scale-105 shadow-xl' : 'border-muted'}`}>
                {index === 1 && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Più Scelto
                  </Badge>
                )}
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{programma.nome}</h3>
                    <div className="text-muted-foreground">{programma.durata}</div>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-red-600 mb-1">-{programma.perdita}</div>
                    <div className="text-sm text-muted-foreground">Perdita peso media</div>
                  </div>

                  <p className="text-muted-foreground mb-6 text-center">{programma.descrizione}</p>

                  <div className="space-y-3 mb-6">
                    {programma.benefici.map((beneficio, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{beneficio}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    to="/contatti"
                    className={`w-full inline-block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                      index === 1 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    Inizia Ora
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Metodi di Dimagrimento */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              I Nostri Metodi per Dimagrire Velocemente
            </h2>
            <p className="text-lg text-muted-foreground">
              Tecnologie avanzate e allenamenti scientifici per massimizzare la perdita di peso
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {metodiDimagrimento.map((metodo, index) => (
              <Card key={index} className="border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{metodo.metodo}</h3>
                  <div className="flex justify-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="font-bold text-primary">{metodo.tempo}</div>
                      <div className="text-xs text-muted-foreground">Durata</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-red-600">{metodo.calorie}</div>
                      <div className="text-xs text-muted-foreground">Calorie bruciate</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{metodo.descrizione}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Storie di Successo */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Storie di Successo Reali
            </h2>
            <p className="text-lg text-muted-foreground">
              I risultati dei nostri clienti che hanno scelto di dimagrire con MUV
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {storieDiSuccesso.map((storia, index) => (
              <Card key={index} className="border-primary/20">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex justify-center items-center gap-4 mb-4">
                      <div className="text-center">
                        <Scale className="w-6 h-6 text-red-600 mx-auto mb-1" />
                        <div className="font-bold text-red-600">{storia.prima}</div>
                        <div className="text-xs text-muted-foreground">Prima</div>
                      </div>
                      <TrendingDown className="w-8 h-8 text-green-600" />
                      <div className="text-center">
                        <Scale className="w-6 h-6 text-green-600 mx-auto mb-1" />
                        <div className="font-bold text-green-600">{storia.dopo}</div>
                        <div className="text-xs text-muted-foreground">Dopo</div>
                      </div>
                    </div>
                    
                    <div className="text-2xl font-bold text-primary mb-1">
                      -{parseInt(storia.prima) - parseInt(storia.dopo)} kg
                    </div>
                    <div className="text-sm text-muted-foreground">in {storia.tempo}</div>
                  </div>

                  <p className="text-muted-foreground mb-4 italic text-center">
                    "{storia.testimonianza}"
                  </p>

                  <div className="text-center border-t pt-4">
                    <div className="font-semibold">{storia.nome}</div>
                    <div className="text-sm text-muted-foreground">{storia.età}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Inizia il Tuo Percorso di Dimagrimento Oggi
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Non aspettare! Ogni giorno che passa è un'opportunità persa per <strong>trasformare il tuo corpo</strong> 
            e <strong>ritrovare la fiducia in te stesso</strong>. Il nostro team di esperti ti aspetta.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              to="/contatti"
              className="bg-white hover:bg-gray-100 text-red-600 px-8 py-4 rounded-lg font-semibold transition-colors text-lg shadow-lg"
            >
              Consulenza Gratuita di 45 Minuti
            </Link>
            <a 
              href="https://wa.me/393513380770?text=Voglio dimagrire velocemente! Quando posso iniziare il mio percorso?" 
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Scrivici su WhatsApp
            </a>
          </div>

          <div className="text-white/80 text-sm">
            📍 Via Venti Settembre 5/7, Legnago (VR) | 📞 +39 351 338 0770
          </div>
        </div>
      </section>
    </div>
  );
};

export default DimagrireLegnago;