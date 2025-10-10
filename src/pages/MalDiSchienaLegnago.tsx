import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Shield, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';

const MalDiSchienaLegnago = () => {
  const trattamenti = [
    {
      nome: "Pancafit Method",
      durata: "45 minuti",
      sedute: "8-12 sedute",
      descrizione: "Riequilibrio posturale globale per eliminare tensioni e dolori",
      benefici: ["Riduce dolore lombare", "Migliora postura", "Previene recidive"],
      efficacia: "95%"
    },
    {
      nome: "Pilates Terapeutico",
      durata: "50 minuti", 
      sedute: "10-15 sedute",
      descrizione: "Esercizi specifici per rafforzare il core e stabilizzare la colonna",
      benefici: ["Rinforza addominali", "Stabilizza colonna", "Aumenta flessibilità"],
      efficacia: "90%"
    },
    {
      nome: "Personal Training Posturale",
      durata: "60 minuti",
      sedute: "12-16 sedute", 
      descrizione: "Programma personalizzato con esercizi correttivi specifici",
      benefici: ["Piano su misura", "Controllo costante", "Educazione posturale"],
      efficacia: "98%"
    }
  ];

  const sintomi = [
    {
      sintomo: "Dolore lombare cronico",
      descrizione: "Dolore persistente nella parte bassa della schiena",
      soluzione: "Pancafit + Pilates"
    },
    {
      sintomo: "Rigidità mattutina",
      descrizione: "Difficoltà nei movimenti al risveglio",
      soluzione: "Mobilizzazione guidata"
    },
    {
      sintomo: "Dolore sciatico",
      descrizione: "Dolore che si irradia lungo la gamba",
      soluzione: "Personal Training specifico"
    },
    {
      sintomo: "Contratture muscolari",
      descrizione: "Tensioni muscolari localizzate",
      soluzione: "Allungamento miofasciale"
    },
    {
      sintomo: "Postura scorretta",
      descrizione: "Alterazioni della normale curvatura spinale",
      soluzione: "Riequilibrio posturale"
    },
    {
      sintomo: "Mal di testa da tensione",
      descrizione: "Cefalee causate da tensioni cervicali", 
      soluzione: "Pancafit cervicale"
    }
  ];

  const casiSuccesso = [
    {
      nome: "Anna M.",
      età: "45 anni",
      problema: "Ernia discale L4-L5",
      durata: "6 settimane",
      risultato: "Dolore eliminato completamente",
      testimonianza: "Dopo anni di dolore, finalmente posso tornare a vivere normalmente. Il metodo Pancafit ha fatto miracoli!"
    },
    {
      nome: "Marco T.", 
      età: "38 anni",
      problema: "Lombalgia cronica",
      durata: "8 settimane",
      risultato: "90% riduzione del dolore",
      testimonianza: "Lavorando in ufficio avevo sempre mal di schiena. Ora posso stare seduto ore senza problemi."
    },
    {
      nome: "Lucia R.",
      età: "52 anni",
      problema: "Rigidità e contratture",
      durata: "4 settimane", 
      risultato: "Mobilità completamente recuperata",
      testimonianza: "Non riuscivo più a chinarmi. Oggi faccio yoga senza problemi grazie al team MUV!"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Helmet>
        <title>Mal di Schiena Legnago | Pancafit & Pilates Terapeutico MUV</title>
        <meta name="description" content="🎯 Risolvi il mal di schiena a Legnago con Pancafit, Pilates terapeutico e personal training posturale. 95% successi garantiti. Consulenza gratuita!" />
        <meta name="keywords" content="mal di schiena legnago, pancafit legnago, pilates terapeutico legnago, dolore lombare legnago, ernia disco legnago, fisioterapia legnago, postura legnago, riabilitazione legnago" />
        <link rel="canonical" href="https://www.muvfitness.it/mal-di-schiena-legnago" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Mal di Schiena Legnago | Pancafit & Pilates Terapeutico MUV" />
        <meta property="og:description" content="🎯 Risolvi il mal di schiena a Legnago con Pancafit, Pilates terapeutico e personal training posturale. 95% successi garantiti." />
        <meta property="og:url" content="https://www.muvfitness.it/mal-di-schiena-legnago" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" />
        
        {/* Medical Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "MUV Fitness - Specialisti Mal di Schiena Legnago",
            "description": "Centro specializzato nel trattamento del mal di schiena a Legnago con Pancafit, Pilates terapeutico e personal training posturale",
            "url": "https://www.muvfitness.it/mal-di-schiena-legnago",
            "telephone": "+39 329 107 0374",
            "email": "info@muvfitness.it",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Piazzetta Don Walter Soave, 2",
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
            "medicalSpecialty": ["Pain Management", "Physical Therapy", "Postural Rehabilitation"],
            "availableService": [
              {
                "@type": "MedicalTherapy",
                "name": "Pancafit Method",
                "description": "Riequilibrio posturale globale per mal di schiena"
              },
              {
                "@type": "MedicalTherapy", 
                "name": "Pilates Terapeutico",
                "description": "Esercizi specifici per rafforzamento core e stabilizzazione spinale"
              }
            ],
            "areaServed": ["Legnago", "Verona", "Bassa Veronese"]
          })}
        </script>
      </Helmet>
      
      <LocalBusinessSchema />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
              🎯 Specialisti Mal di Schiena
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Mal di Schiena Legnago: Soluzione Definitiva
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
              <strong>Elimina il mal di schiena per sempre</strong> con i metodi più avanzati: 
              <strong>Pancafit, Pilates Terapeutico e Personal Training Posturale</strong>. 
              Oltre <strong>500 pazienti guariti</strong> con il nostro approccio scientifico personalizzato.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                to="/contatti"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg shadow-lg"
              >
                Valutazione Posturale Gratuita
              </Link>
              <a 
                href="https://wa.me/393291070374?text=Ciao! Soffro di mal di schiena e vorrei una consulenza specialistica" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: SOS Mal di Schiena
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-bold text-2xl text-blue-600">95%</div>
                <div className="text-sm text-gray-600">Tasso di successo</div>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <div className="font-bold text-2xl text-indigo-600">500+</div>
                <div className="text-sm text-gray-600">Pazienti guariti</div>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-bold text-2xl text-purple-600">4-8</div>
                <div className="text-sm text-gray-600">Settimane per guarire</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sintomi Trattati */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Sintomi che Trattiamo con Successo
            </h2>
            <p className="text-lg text-muted-foreground">
              Identifica il tuo problema e scopri la soluzione specifica
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sintomi.map((sintomo, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{sintomo.sintomo}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{sintomo.descrizione}</p>
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-700 font-medium text-sm">{sintomo.soluzione}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trattamenti Specialistici */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              I Nostri Trattamenti Specialistici
            </h2>
            <p className="text-lg text-muted-foreground">
              Approcci scientifici personalizzati per ogni tipo di problema
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {trattamenti.map((trattamento, index) => (
              <Card key={index} className={`relative ${index === 0 ? 'border-primary scale-105 shadow-xl' : 'border-muted'}`}>
                {index === 0 && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Più Efficace 
                  </Badge>
                )}
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{trattamento.nome}</h3>
                    <div className="text-muted-foreground">{trattamento.durata} - {trattamento.sedute}</div>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-green-600 mb-1">{trattamento.efficacia}</div>
                    <div className="text-sm text-muted-foreground">Tasso di successo</div>
                  </div>

                  <p className="text-muted-foreground mb-6 text-center">{trattamento.descrizione}</p>

                  <div className="space-y-3 mb-6">
                    {trattamento.benefici.map((beneficio, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{beneficio}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    to="/contatti"
                    className={`w-full inline-block text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                      index === 0 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    Prenota Ora
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Casi di Successo */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Casi di Successo Reali
            </h2>
            <p className="text-lg text-muted-foreground">
              Pazienti che hanno risolto definitivamente il mal di schiena
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {casiSuccesso.map((caso, index) => (
              <Card key={index} className="border-primary/20">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Activity className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">{caso.nome}</h3>
                    <div className="text-muted-foreground">{caso.età}</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="bg-red-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-red-700">Problema:</div>
                      <div className="text-red-600">{caso.problema}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-green-700">Risultato in {caso.durata}:</div>
                      <div className="text-green-600 font-semibold">{caso.risultato}</div>
                    </div>
                  </div>

                  <p className="text-muted-foreground italic text-center text-sm">
                    "{caso.testimonianza}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Processo di Trattamento */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Il Nostro Metodo in 4 Fasi
            </h2>
            <p className="text-lg text-muted-foreground">
              Un approccio scientifico per risultati duraturi
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Valutazione Posturale Completa</h3>
                <p className="text-muted-foreground">Analisi biomeccanica approfondita per identificare le cause del dolore</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Piano Terapeutico Personalizzato</h3>
                <p className="text-muted-foreground">Programma specifico basato sui tuoi sintomi e obiettivi</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Trattamenti Specialistici</h3>
                <p className="text-muted-foreground">Pancafit, Pilates terapeutico o Personal Training secondo necessità</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">4</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Mantenimento e Prevenzione</h3>
                <p className="text-muted-foreground">Esercizi per mantenere i risultati ed evitare recidive</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Non Soffrire Più: Risolvi il Mal di Schiena Oggi
          </h2>
          <p className="text-xl text-white/90 mb-8">
            <strong>Il dolore non è normale</strong> e non devi conviverci. I nostri specialisti 
            hanno aiutato oltre <strong>500 persone</strong> a liberarsi dal mal di schiena. 
            <strong>Puoi essere il prossimo!</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              to="/contatti"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors text-lg shadow-lg"
            >
              Valutazione Gratuita di 45 Minuti
            </Link>
            <a 
              href="https://wa.me/393291070374?text=Ho mal di schiena da tempo e vorrei fissare una consulenza specialistica" 
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chiamata d'Emergenza WhatsApp
            </a>
          </div>

          <div className="text-white/80 text-sm">
            📍 Piazzetta Don Walter Soave 2, Legnago (VR) | 📞 +39 329 107 0374<br />
            ⏰ Lun-Ven 8:00-21:00 | Sab 8:00-12:00
          </div>
        </div>
      </section>
    </div>
  );
};

export default MalDiSchienaLegnago;