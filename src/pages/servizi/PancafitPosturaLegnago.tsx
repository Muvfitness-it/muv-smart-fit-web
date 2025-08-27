import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Users, Clock, Target, Award, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import LazyImage from "@/components/ui/LazyImage";
import ExternalForm from "@/components/contact/ExternalForm";

const PancafitPosturaLegnago = () => {
  const pageTitle = "Pancafit & Postura a Legnago – Stop al Mal di Schiena";
  const pageDescription = "Valutazione posturale, decompensazione e protocolli personalizzati. Riduci dolore e rigidità, migliora mobilità e respiro.";
  const canonicalUrl = "https://www.muvfitness.it/servizi/pancafit-postura-legnago/";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Pancafit e Postura Legnago",
    "description": pageDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": "MUV Fitness Legnago",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "{{INDIRIZZO_ATTUALE_COMPLETO}}",
        "addressLocality": "Legnago",
        "addressRegion": "Veneto",
        "postalCode": "37045",
        "addressCountry": "IT"
      },
      "telephone": "{{TELEFONO}}",
      "email": "{{EMAIL}}"
    },
    "areaServed": "Legnago",
    "serviceType": "Riabilitazione posturale",
    "offers": {
      "@type": "Offer",
      "name": "Valutazione Posturale Gratuita",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Prima valutazione posturale gratuita con Pancafit"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Cos'è il metodo Pancafit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pancafit® è un attrezzo posturale che permette l'allungamento muscolare globale decompensato. Agisce sulla causa del dolore e non solo sui sintomi, riequilibrando l'intera postura corporea."
        }
      },
      {
        "@type": "Question",
        "name": "Pancafit aiuta il mal di schiena?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sì, Pancafit è molto efficace per il mal di schiena. Agisce sulle tensioni muscolari e le retrazioni che causano il dolore, ripristinando l'equilibrio posturale e la mobilità articolare."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto durano le sedute di Pancafit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ogni seduta dura circa 50 minuti e comprende valutazione posturale, esercizi specifici su Pancafit e consigli per il mantenimento a casa."
        }
      },
      {
        "@type": "Question",
        "name": "È adatto a tutte le età?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sì, il metodo Pancafit è adatto a tutte le età, dai bambini agli anziani. Gli esercizi vengono sempre personalizzati in base alle capacità e necessità individuali."
        }
      },
      {
        "@type": "Question",
        "name": "Quante sedute servono per vedere risultati?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I primi miglioramenti si avvertono già dalle prime sedute. Un ciclo completo di 8-10 sedute permette di ottenere risultati duraturi nella postura e riduzione del dolore."
        }
      }
    ]
  };

  const whatsappMessage = encodeURIComponent("Ciao! Ho mal di schiena e sono interessato/a al metodo Pancafit. Vorrei prenotare la valutazione posturale gratuita.");

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="Pancafit Legnago, postura, mal di schiena, riabilitazione, cervicale, lombalgia, allungamento muscolare" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 min-h-[60vh] flex items-center">
          <div className="absolute inset-0 bg-black/40" />
          <LazyImage
            src="/images/fitness-professional-bg.jpg"
            alt="Pancafit Postura Legnago"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            width={1920}
            height={1080}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-white/80 hover:text-white">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/60" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/servizi" className="text-white/80 hover:text-white">Servizi</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white/60" />
                <BreadcrumbItem>
                  <span className="text-white">Pancafit & Postura</span>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                Metodo Posturale con Pancafit®
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                <strong className="text-white">Mal di schiena? Valutazione posturale gratuita con Pancafit®.</strong><br />
                Riduci dolore e rigidità, migliora mobilità e respiro.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <a href={`https://wa.me/393291070374?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                    <Heart className="mr-2 h-5 w-5" />
                    Valutazione Gratuita
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-gray-900">
                  <Link to="/contatti">
                    Prenota Consulenza
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Perché scegliere Pancafit a Legnago?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Metodo globale per il riequilibrio posturale e la riduzione del dolore
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <CardTitle>Riduce il Dolore</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Agisce sulle cause del mal di schiena, cervicale e dolori articolari. 
                    Risultati duraturi attraverso il riequilibrio posturale globale.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <CardTitle>Migliora la Mobilità</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Allungamento muscolare decompensato che restituisce flessibilità e 
                    libertà di movimento a tutto il corpo.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <CardTitle>Metodo Certificato</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Pancafit® è un marchio registrato con operatori certificati. 
                    Sicurezza ed efficacia garantite dal protocollo originale.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Conditions Treated */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Per quali problemi è indicato?</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600">Dolori Muscoloscheletrici</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Mal di schiena e lombalgia</li>
                      <li>• Cervicale e torcicollo</li>
                      <li>• Sciatalgia e cruralgia</li>
                      <li>• Dolori articolari</li>
                      <li>• Tensioni muscolari croniche</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600">Disturbi Posturali</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Scoliosi e cifosi</li>
                      <li>• Spalle anteposte</li>
                      <li>• Bacino ruotato</li>
                      <li>• Ginocchia valghe/vare</li>
                      <li>• Problemi ai piedi</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600">Disturbi Respiratori</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Respirazione superficiale</li>
                      <li>• Ansia e stress</li>
                      <li>• Affaticamento cronico</li>
                      <li>• Disturbi del sonno</li>
                      <li>• Tensioni diaframmatiche</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600">Prevenzione</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Mantenimento posturale</li>
                      <li>• Prevenzione infortuni</li>
                      <li>• Miglioramento performance</li>
                      <li>• Benessere generale</li>
                      <li>• Qualità della vita</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Come funziona una seduta?</h2>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <LazyImage
                    src="/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
                    alt="Seduta Pancafit MUV Fitness Legnago"
                    className="rounded-lg shadow-lg"
                    width={600}
                    height={400}
                  />
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Valutazione Posturale</h3>
                      <p className="text-gray-600">Analisi completa della postura e delle tensioni muscolari</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Allungamento Globale</h3>
                      <p className="text-gray-600">Esercizi specifici su Pancafit per l'allungamento muscolare</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Respirazione</h3>
                      <p className="text-gray-600">Tecniche di respirazione per potenziare l'efficacia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Consigli Pratici</h3>
                      <p className="text-gray-600">Esercizi e posture da mantenere nella vita quotidiana</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Domande Frequenti su Pancafit</h2>
              
              <div className="space-y-6">
                {faqSchema.mainEntity.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-green-600" />
                        {faq.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{faq.acceptedAnswer.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Valutazione Posturale Gratuita
              </h2>
              <p className="text-xl text-green-100 mb-8">
                Prima valutazione completa con Pancafit inclusa. Scopri le cause del tuo mal di schiena.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <a href={`https://wa.me/393291070374?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                    <Heart className="mr-2 h-5 w-5" />
                    WhatsApp: Prenota Subito
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-green-600">
                  <Link to="/contatti">
                    Oppure Chiamaci
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Richiedi Informazioni</h2>
                <p className="text-gray-600">Ti richiamiamo entro 10 minuti negli orari di apertura</p>
              </div>
              <ExternalForm />
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Approfondimenti Posturali</h2>
              <p className="text-gray-600">Scopri di più sul benessere della schiena e la postura corretta</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Link to="/blog" className="hover:text-green-600 transition-colors">
                      Mal di Schiena da Lavoro
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Come prevenire e combattere il mal di schiena causato da posture scorrette al lavoro.
                  </p>
                  <Link to="/blog" className="text-green-600 hover:underline flex items-center gap-1">
                    Leggi l'articolo <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <Link to="/blog" className="hover:text-green-600 transition-colors">
                      Esercizi Posturali Quotidiani
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Semplici esercizi da fare a casa per mantenere una postura corretta ogni giorno.
                  </p>
                  <Link to="/blog" className="text-green-600 hover:underline flex items-center gap-1">
                    Leggi l'articolo <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <Link to="/risultati" className="hover:text-green-600 transition-colors">
                      Testimonianze Pancafit
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Storie di chi ha risolto il mal di schiena con il metodo Pancafit a Legnago.
                  </p>
                  <Link to="/risultati" className="text-green-600 hover:underline flex items-center gap-1">
                    Vedi i risultati <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PancafitPosturaLegnago;