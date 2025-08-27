import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Trophy, Users, Clock, Star } from 'lucide-react';
import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';

const PalestraLegnago = () => {
  const servizi = [
    {
      nome: "Personal Training",
      descrizione: "Allenamento personalizzato con trainer qualificati",
      durata: "60 minuti",
      benefici: ["Risultati garantiti", "Programma su misura", "Monitoraggio costante"]
    },
    {
      nome: "EMS Training",
      descrizione: "Elettrostimolazione muscolare per risultati in 20 minuti",
      durata: "20 minuti",
      benefici: ["Tonificazione rapida", "Brucia grassi efficace", "Recupero muscolare"]
    },
    {
      nome: "Pilates",
      descrizione: "Miglioramento postura e flessibilità",
      durata: "50 minuti", 
      benefici: ["Postura corretta", "Core stability", "Flessibilità"]
    },
    {
      nome: "Pancafit",
      descrizione: "Riequilibrio posturale globale",
      durata: "45 minuti",
      benefici: ["Mal di schiena", "Rigidità muscolare", "Postura"]
    }
  ];

  const orari = [
    { giorno: "Lunedì - Venerdì", orario: "8:00 - 21:00" },
    { giorno: "Sabato", orario: "8:00 - 12:00" },
    { giorno: "Domenica", orario: "Chiuso" }
  ];

  const testimonianze = [
    {
      nome: "Marco R.",
      età: "34 anni",
      risultato: "Persi 12 kg in 3 mesi",
      testo: "La miglior palestra di Legnago! Staff professionale e risultati garantiti."
    },
    {
      nome: "Elena S.", 
      età: "28 anni",
      risultato: "Risolti problemi posturali",
      testo: "Grazie al Pancafit ho risolto il mal di schiena cronico che avevo da anni."
    },
    {
      nome: "Alessandro M.",
      età: "42 anni", 
      risultato: "Tonificazione completa",
      testo: "Con l'EMS ho ottenuto risultati incredibili in pochissimo tempo."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Miglior Palestra Legnago | MUV Fitness - Personal Trainer & EMS</title>
        <meta name="description" content="🏆 Miglior palestra a Legnago con personal trainer qualificati, EMS, Pilates e Pancafit. Risultati garantiti in 30 giorni. Prenota consulenza gratuita!" />
        <meta name="keywords" content="palestra legnago, miglior palestra legnago, personal trainer legnago, fitness legnago, centro fitness legnago, palestra verona, dimagrire legnago, tonificazione legnago, ems legnago, pilates legnago, pancafit legnago" />
        <link rel="canonical" href="https://www.muvfitness.it/palestra-legnago" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Miglior Palestra Legnago | MUV Fitness - Personal Trainer & EMS" />
        <meta property="og:description" content="🏆 Miglior palestra a Legnago con personal trainer qualificati, EMS, Pilates e Pancafit. Risultati garantiti in 30 giorni." />
        <meta property="og:url" content="https://www.muvfitness.it/palestra-legnago" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" />
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Gym",
            "name": "MUV Fitness - Miglior Palestra Legnago",
            "description": "La miglior palestra di Legnago specializzata in personal training, EMS, Pilates e Pancafit per dimagrimento e tonificazione rapida",
            "url": "https://www.muvfitness.it/palestra-legnago",
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
            "openingHours": [
              "Mo-Fr 08:00-21:00",
              "Sa 08:00-12:00"
            ],
            "priceRange": "€€",
            "amenityFeature": [
              {"@type": "LocationFeatureSpecification", "name": "Personal Training"},
              {"@type": "LocationFeatureSpecification", "name": "EMS Training"},
              {"@type": "LocationFeatureSpecification", "name": "Pilates"},
              {"@type": "LocationFeatureSpecification", "name": "Pancafit"},
              {"@type": "LocationFeatureSpecification", "name": "Consulenza gratuita"}
            ],
            "areaServed": ["Legnago", "Verona", "Bassa Veronese", "Veneto"],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127"
            }
          })}
        </script>
      </Helmet>
      
      <LocalBusinessSchema />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              🏆 Miglior Palestra di Legnago
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Palestra Legnago: Trasforma il Tuo Corpo
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              La <strong>miglior palestra di Legnago</strong> con <strong>personal trainer qualificati</strong>, 
              tecnologie EMS avanzate e metodi scientifici per <strong>dimagrire velocemente</strong> e 
              <strong>tonificare il corpo</strong> in soli 30 giorni.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                to="/contatti"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
              >
                Prenota Consulenza Gratuita
              </Link>
              <a 
                href="https://wa.me/393291070374?text=Ciao! Voglio informazioni sulla miglior palestra di Legnago" 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: +39 329 107 0374
              </a>
            </div>

            <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Via Venti Settembre 5/7, Legnago (VR)</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" />
                <span>Risultati Garantiti in 30 Giorni</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>Personal Trainer Certificati</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servizi Principali */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Servizi della Miglior Palestra di Legnago
            </h2>
            <p className="text-lg text-muted-foreground">
              Tecnologie avanzate e metodi scientifici per risultati rapidi e duraturi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {servizi.map((servizio, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary">{servizio.nome}</h3>
                  <p className="text-muted-foreground mb-4">{servizio.descrizione}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Durata:</span>
                      <span>{servizio.durata}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-sm font-medium">Benefici:</span>
                    {servizio.benefici.map((beneficio, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>{beneficio}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Orari e Contatti */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Orari di Apertura</h2>
              <div className="space-y-4">
                {orari.map((slot, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="font-medium">{slot.giorno}</span>
                    </div>
                    <span className="text-primary font-semibold">{slot.orario}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Dove Siamo</h2>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-medium">Indirizzo</span>
                  </div>
                  <p className="text-muted-foreground">Via Venti Settembre, 5/7<br />37045 Legnago (VR)</p>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-medium">Prenota Subito</span>
                  </div>
                  <p className="text-muted-foreground mb-3">Consulenza gratuita di 45 minuti</p>
                  <Link 
                    to="/contatti"
                    className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Prenota Ora
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonianze */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Cosa Dicono i Nostri Clienti
            </h2>
            <p className="text-lg text-muted-foreground">
              Risultati reali della miglior palestra di Legnago
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonianze.map((testimonianza, index) => (
              <Card key={index} className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonianza.testo}"</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold">{testimonianza.nome}</div>
                    <div className="text-sm text-muted-foreground">{testimonianza.età}</div>
                    <div className="text-sm text-primary font-medium mt-1">{testimonianza.risultato}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Inizia la Tua Trasformazione Oggi
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Unisciti ai nostri clienti soddisfatti e scopri perché siamo la <strong>miglior palestra di Legnago</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contatti"
              className="bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
            >
              Consulenza Gratuita
            </Link>
            <a 
              href="https://wa.me/393291070374?text=Voglio iniziare il mio percorso nella miglior palestra di Legnago!" 
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contattaci su WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PalestraLegnago;