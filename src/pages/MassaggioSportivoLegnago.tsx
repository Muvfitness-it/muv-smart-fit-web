import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Timer, Target, Trophy, Users, Calendar } from 'lucide-react';
import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';

const MassaggioSportivoLegnago = () => {
  const tipiMassaggio = [
    {
      nome: "Massaggio Pre-Gara",
      durata: "30 minuti",
      descrizione: "Preparazione muscolare ottimale prima dell'attività sportiva",
      benefici: ["Attivazione circolazione", "Riscaldamento muscoli", "Prevenzione infortuni"],
      quando: "1-2 ore prima dell'attività"
    },
    {
      nome: "Massaggio Post-Gara",
      durata: "45 minuti",
      descrizione: "Recupero rapido e smaltimento dell'acido lattico",
      benefici: ["Riduce affaticamento", "Elimina tossine", "Accelera recupero"],
      quando: "Entro 24 ore dall'attività"
    },
    {
      nome: "Massaggio Decontratturante",
      durata: "60 minuti", 
      descrizione: "Trattamento specifico per tensioni e contratture muscolari",
      benefici: ["Rilassa tensioni", "Migliora flessibilità", "Riduce dolore"],
      quando: "In caso di contratture"
    },
    {
      nome: "Massaggio Drenante",
      durata: "50 minuti",
      descrizione: "Stimolazione del sistema linfatico per eliminare liquidi",
      benefici: ["Riduce gonfiori", "Migliora drenaggio", "Tonifica tessuti"],
      quando: "Dopo intensi periodi di allenamento"
    }
  ];

  const beneficiSport = [
    {
      sport: "Calcio",
      muscoli: "Gambe, polpacci, quadricipiti",
      benefici: ["Prevenzione stiramenti", "Recupero veloce", "Miglior performance"]
    },
    {
      sport: "Running/Ciclismo", 
      muscoli: "Gambe, glutei, schiena",
      benefici: ["Riduce indolenzimenti", "Previene crampi", "Aumenta resistenza"]
    },
    {
      sport: "Tennis/Pallavolo",
      muscoli: "Spalle, braccia, schiena",
      benefici: ["Previene epicondilite", "Migliora mobilità", "Riduce tensioni"]
    },
    {
      sport: "Palestra/Fitness",
      muscoli: "Tutto il corpo",
      benefici: ["Ottimizza crescita muscolare", "Riduce DOMS", "Accelera recupero"]
    },
    {
      sport: "Nuoto",
      muscoli: "Spalle, schiena, core",
      benefici: ["Previene tendiniti", "Migliora flessibilità", "Riduce affaticamento"]
    },
    {
      sport: "Arti Marziali",
      muscoli: "Core, gambe, braccia",
      benefici: ["Aumenta mobilità", "Riduce contratture", "Migliora agilità"]
    }
  ];

  const atletiTesimonianze = [
    {
      nome: "Matteo P.",
      sport: "Calcio Serie D",
      esperienza: "Gioco nel campionato di Serie D e vengo da MUV per i massaggi pre e post partita. I risultati si sentono subito!",
      beneficio: "Zero infortuni muscolari in 2 stagioni"
    },
    {
      nome: "Elena R.",
      sport: "Maratoneta",
      esperienza: "Preparo le mie maratone con i massaggi sportivi di MUV. Il recupero è incredibilmente più rapido.",
      beneficio: "PB migliorato di 8 minuti"
    },
    {
      nome: "Alessandro M.",
      sport: "Bodybuilding",
      esperienza: "I massaggi decontratturanti mi aiutano a mantenere i muscoli elastici nonostante i carichi pesanti.",
      beneficio: "Maggior crescita muscolare"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Helmet>
        <title>Massaggio Sportivo Legnago | Recupero Muscolare Professionale MUV</title>
        <meta name="description" content="💪 Massaggio sportivo professionale a Legnago per atleti e sportivi. Pre-gara, post-gara, decontratturante. Migliora performance e recupero!" />
        <meta name="keywords" content="massaggio sportivo legnago, massaggio atleti legnago, recupero muscolare legnago, massaggio pre gara legnago, massaggio post gara legnago, fisioterapia sportiva legnago, massoterapia legnago" />
        <link rel="canonical" href="https://www.muvfitness.it/massaggio-sportivo-legnago" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Massaggio Sportivo Legnago | Recupero Muscolare Professionale MUV" />
        <meta property="og:description" content="💪 Massaggio sportivo professionale a Legnago per atleti e sportivi. Pre-gara, post-gara, decontratturante." />
        <meta property="og:url" content="https://www.muvfitness.it/massaggio-sportivo-legnago" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" />
        
        {/* Sports Medicine Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsActivityLocation",
            "name": "MUV Fitness - Massaggio Sportivo Legnago",
            "description": "Centro specializzato in massaggio sportivo professionale per atleti e sportivi a Legnago",
            "url": "https://www.muvfitness.it/massaggio-sportivo-legnago",
            "telephone": "+39 329 107 0374",
            "email": "info@muvfitness.it",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Via Venti Settembre, 5/7",
              "addressLocality": "Legnago",
              "addressRegion": "Veneto",
              "postalCode": "37045",
              "addressCountry": "IT"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 45.1919,
              "longitude": 11.3058
            },
            "sport": ["Football", "Running", "Cycling", "Tennis", "Swimming", "Fitness"],
            "amenityFeature": [
              {"@type": "LocationFeatureSpecification", "name": "Massaggio Pre-Gara"},
              {"@type": "LocationFeatureSpecification", "name": "Massaggio Post-Gara"},
              {"@type": "LocationFeatureSpecification", "name": "Massaggio Decontratturante"},
              {"@type": "LocationFeatureSpecification", "name": "Massaggio Drenante"}
            ],
            "areaServed": ["Legnago", "Verona", "Bassa Veronese"]
          })}
        </script>
      </Helmet>
      
      <LocalBusinessSchema />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200">
              💪 Massaggio Sportivo Professionale
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Massaggio Sportivo Legnago
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
              <strong>Massaggio sportivo professionale</strong> per atleti e sportivi a Legnago. 
              <strong>Migliora le performance</strong>, <strong>accelera il recupero</strong> e 
              <strong>previeni gli infortuni</strong> con le tecniche più avanzate di massoterapia sportiva.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                to="/contatti"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg shadow-lg"
              >
                Prenota Massaggio Sportivo
              </Link>
              <a 
                href="https://wa.me/393291070374?text=Ciao! Sono uno sportivo e vorrei prenotare un massaggio professionale" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: Prenota Subito
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="font-bold text-2xl text-orange-600">15+</div>
                <div className="text-sm text-gray-600">Anni di esperienza</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="font-bold text-2xl text-red-600">300+</div>
                <div className="text-sm text-gray-600">Atleti seguiti</div>
              </div>
              <div className="text-center">
                <Target className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <div className="font-bold text-2xl text-pink-600">98%</div>
                <div className="text-sm text-gray-600">Soddisfazione atleti</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipi di Massaggio */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Massaggi Sportivi Specializzati
            </h2>
            <p className="text-lg text-muted-foreground">
              Trattamenti specifici per ogni fase dell'attività sportiva
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tipiMassaggio.map((massaggio, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{massaggio.nome}</h3>
                    <div className="text-sm text-muted-foreground">{massaggio.durata}</div>
                  </div>

                  <p className="text-muted-foreground text-center mb-4">{massaggio.descrizione}</p>

                  <div className="space-y-2 mb-4">
                    {massaggio.benefici.map((beneficio, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Target className="w-3 h-3 text-green-500" />
                        <span className="text-sm">{beneficio}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <Timer className="w-4 h-4 text-orange-600 mx-auto mb-1" />
                    <div className="text-xs text-orange-700 font-medium">{massaggio.quando}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefici per Sport */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Benefici per Ogni Sport
            </h2>
            <p className="text-lg text-muted-foreground">
              Trattamenti specifici basati sul tuo sport e sulle tue esigenze
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficiSport.map((sport, index) => (
              <Card key={index} className="border-primary/20">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <Trophy className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="text-xl font-bold mb-2">{sport.sport}</h3>
                    <div className="text-sm text-muted-foreground mb-3">
                      Focus: <span className="font-medium">{sport.muscoli}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {sport.benefici.map((beneficio, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Target className="w-3 h-3 text-green-500" />
                        <span className="text-sm">{beneficio}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonianze Atleti */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Atleti che si Affidano a Noi
            </h2>
            <p className="text-lg text-muted-foreground">
              Testimonianze di sportivi professionisti e amatoriali
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {atletiTesimonianze.map((atleta, index) => (
              <Card key={index} className="border-primary/20">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">{atleta.nome}</h3>
                    <div className="text-primary font-medium">{atleta.sport}</div>
                  </div>

                  <p className="text-muted-foreground italic text-center mb-4 text-sm">
                    "{atleta.esperienza}"
                  </p>

                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-green-700 font-semibold text-sm">{atleta.beneficio}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quando Prenotare */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Quando Prenotare il Massaggio
            </h2>
            <p className="text-lg text-muted-foreground">
              Tempistiche ottimali per massimizzare i benefici
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-orange-700">Prima dell'Attività</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-orange-500" />
                    <span>1-2 ore prima della gara/allenamento intenso</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-orange-500" />
                    <span>Massaggio pre-gara per attivazione muscolare</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-orange-500" />
                    <span>Durata: 20-30 minuti</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-orange-500" />
                    <span>Focus: riscaldamento e prevenzione</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Timer className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-green-700">Dopo l'Attività</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-green-500" />
                    <span>Entro 24 ore dall'attività intensa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-green-500" />
                    <span>Massaggio post-gara per recupero</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-green-500" />
                    <span>Durata: 45-60 minuti</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-green-500" />
                    <span>Focus: recupero e smaltimento tossine</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Migliora le Tue Performance Sportive
          </h2>
          <p className="text-xl text-white/90 mb-8">
            <strong>Ogni atleta di successo</strong> sa che il recupero è importante quanto l'allenamento. 
            <strong>Investi nel tuo corpo</strong> e nelle tue performance con i nostri 
            <strong>massaggi sportivi professionali</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              to="/contatti"
              className="bg-white hover:bg-gray-100 text-orange-600 px-8 py-4 rounded-lg font-semibold transition-colors text-lg shadow-lg"
            >
              Prenota il Tuo Massaggio
            </Link>
            <a 
              href="https://wa.me/393291070374?text=Sono un atleta e vorrei prenotare un massaggio sportivo per migliorare le mie performance" 
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Veloce
            </a>
          </div>

          <div className="text-white/80 text-sm">
            📍 Via Venti Settembre 5/7, Legnago (VR) | 📞 +39 329 107 0374<br />
            ⏰ Lun-Ven 8:00-21:00 | Sab 8:00-12:00 | 🏆 Massaggi per tutti gli sport
          </div>
        </div>
      </section>
    </div>
  );
};

export default MassaggioSportivoLegnago;