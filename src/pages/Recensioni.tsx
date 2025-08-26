import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Download, MessageCircle, Phone } from "lucide-react";
import SEOOptimizer from "@/components/SEO/SEOOptimizer";

const Recensioni = () => {
  const handleReputationClick = (platform: string) => {
    // Track reputation clicks
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'reputation_click', {
        platform: platform,
        page: 'recensioni'
      });
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Perché è utile la tua recensione?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le recensioni aiutano altre persone a scoprire i nostri servizi e ci permettono di migliorare continuamente la qualità del nostro centro fitness."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto tempo richiede?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lasciare una recensione richiede circa 60 secondi: basta aprire Google, cercare MUV Fitness Legnago e cliccare sulle stelle."
        }
      },
      {
        "@type": "Question",
        "name": "Posso restare anonimo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le recensioni su Google e Facebook sono pubbliche e mostrano il tuo nome. Puoi usare iniziali o nickname se preferisci maggiore privacy."
        }
      },
      {
        "@type": "Question",
        "name": "Cosa è utile raccontare?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Racconta il tuo obiettivo iniziale, come ti sei trovato con staff e tecnologie, e i risultati ottenuti in termini di centimetri, settimane o sensazioni."
        }
      },
      {
        "@type": "Question",
        "name": "Se ho avuto un problema?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Se hai avuto problemi, contattaci prima direttamente su WhatsApp o telefono. Preferiamo risolvere insieme qualsiasi questione prima che diventi pubblica."
        }
      }
    ]
  };

  return (
    <>
      <SEOOptimizer
        title="Recensioni MUV Fitness Legnago – Come lasciarle in 60 secondi"
        description="Lascia una recensione per MUV Fitness Legnago: ci aiuta a migliorare e aiuta chi ci scopre. Guida rapida per Google, Facebook e altri canali."
        canonicalUrl="https://www.muvfitness.it/recensioni"
        structuredData={structuredData}
      />

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 pt-32 pb-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Lascia una recensione: ci aiuta a migliorare (e aiuta chi ci scopre)
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              La tua esperienza conta davvero. Una recensione onesta richiede solo 60 secondi 
              e aiuta altre persone a scoprire il nostro centro fitness. 
              <span className="text-brand-primary"> Inizia da Google – è il canale più utile.</span>
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Main Review Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Google Reviews - Primary */}
              <Card className="bg-gray-800/50 border-brand-primary/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-magenta-500">
                    <Star className="w-6 h-6 text-yellow-500" />
                    Lascia la tua recensione su Google (consigliato)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button 
                    size="lg"
                    className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-4 text-lg min-h-[44px]"
                    onClick={() => {
                      handleReputationClick('google');
                      window.open('https://g.page/r/CffA03OKdKiQEBM/review', '_blank');
                    }}
                    aria-label="Lascia una recensione su Google per MUV Fitness Legnago"
                  >
                    <Star className="w-5 h-5 mr-2" />
                    Apri Google e lascia recensione
                  </Button>
                  
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3 text-brand-primary">3 step veloci:</h3>
                    <ol className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="bg-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</span>
                        Clicca il pulsante sopra (si apre Google)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</span>
                        Seleziona da 1 a 5 stelle
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</span>
                        Scrivi la tua esperienza (opzionale ma molto utile)
                      </li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              {/* Other Channels */}
              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Altri canali utili</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="w-full justify-start text-left min-h-[44px] border-gray-600 hover:border-brand-primary hover:bg-brand-primary/10"
                      onClick={() => handleReputationClick('facebook')}
                    >
                      Facebook Reviews
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="w-full justify-start text-left min-h-[44px] border-gray-600 hover:border-brand-primary hover:bg-brand-primary/10"
                      onClick={() => handleReputationClick('wellhub')}
                    >
                      Wellhub Reviews
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="w-full justify-start text-left min-h-[44px] border-gray-600 hover:border-brand-primary hover:bg-brand-primary/10"
                      onClick={() => handleReputationClick('tripadvisor')}
                    >
                      Tripadvisor Reviews
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Examples */}
              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Esempi utili (cosa scrivere)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-brand-primary rounded-full mt-2.5 flex-shrink-0"></span>
                      <strong className="text-magenta-500">Il tuo obiettivo iniziale:</strong> "Volevo perdere peso" / "Cercavo di risolvere il mal di schiena" / "Mi serviva più energia"
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-brand-primary rounded-full mt-2.5 flex-shrink-0"></span>
                      <strong className="text-magenta-500">Come ti sei trovato:</strong> Staff attento, ambienti puliti, tecnologie innovative (EMS, Pilates Reformer, ecc.)
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-brand-primary rounded-full mt-2.5 flex-shrink-0"></span>
                      <strong className="text-magenta-500">I risultati:</strong> Centimetri persi, settimane necessarie, energia ritrovata, postura migliorata
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* QR Code */}
              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Scarica il QR da stampare</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <img 
                      src="/media/qr/QR_MUV_recensioni.png" 
                      alt="QR recensioni MUV Fitness Legnago" 
                      width="200" 
                      height="200" 
                      loading="lazy"
                      className="w-full max-w-[200px] h-auto"
                      onError={(e) => {
                        // Fallback to canvas-generated QR
                        e.currentTarget.style.display = 'none';
                        const canvas = document.createElement('canvas');
                        canvas.width = 200;
                        canvas.height = 200;
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                          ctx.fillStyle = '#f3f4f6';
                          ctx.fillRect(0, 0, 200, 200);
                          ctx.fillStyle = '#374151';
                          ctx.font = '14px sans-serif';
                          ctx.textAlign = 'center';
                          ctx.fillText('QR Code', 100, 95);
                          ctx.fillText('in arrivo', 100, 115);
                        }
                        e.currentTarget.parentNode?.appendChild(canvas);
                      }}
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full min-h-[44px] border-gray-600 hover:border-brand-primary hover:bg-brand-primary/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Scarica QR in PNG
                  </Button>
                </CardContent>
              </Card>

              {/* Privacy */}
              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Privacy e trasparenza</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Le recensioni su Google, Facebook e altre piattaforme sono pubbliche e visibili a tutti. 
                    Non offriamo incentivi economici per le recensioni – chiediamo solo onestà. 
                    La tua esperienza autentica è il miglior regalo per noi e per chi ci scoprirà.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold min-h-[44px] px-8"
                onClick={() => handleReputationClick('whatsapp')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Scrivici su WhatsApp
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="min-h-[44px] px-8 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                asChild
              >
                <a href="/contatti/">
                  <Phone className="w-5 h-5 mr-2" />
                  Prenota Consulenza
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 p-4 z-40 sm:hidden">
        <div className="flex gap-2">
          <Button 
            size="sm"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold min-h-[44px]"
            onClick={() => handleReputationClick('whatsapp-mobile')}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            WhatsApp
          </Button>
          <Button 
            size="sm"
            variant="outline"
            className="flex-1 min-h-[44px] border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
            asChild
          >
            <a href="/contatti/">
              <Phone className="w-4 h-4 mr-1" />
              Consulenza
            </a>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Recensioni;
