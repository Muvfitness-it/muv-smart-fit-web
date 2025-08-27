import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Activity, Clock, Target, Award, ChevronRight, Dumbbell } from "lucide-react";
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
import ContactForm from "@/components/contact/ContactForm";

const PilatesReformerLegnago = () => {
  const pageTitle = "Pilates Reformer a Legnago – Core, Mobilità e Postura";
  const pageDescription = "Allenamento su Reformer per rinforzo profondo, stabilità e controllo. Ideale per schiena e forma fisica elegante.";
  const canonicalUrl = "https://www.muvfitness.it/servizi/pilates-reformer-legnago/";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Pilates Reformer Legnago",
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
    "serviceType": "Pilates Reformer",
    "offers": {
      "@type": "Offer",
      "name": "Lezione di Prova Pilates Reformer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Prima lezione di prova Pilates Reformer gratuita"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Cos'è il Pilates Reformer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Il Reformer è l'attrezzo principale del Pilates, inventato da Joseph Pilates. Utilizza molle, carrelli e corde per creare resistenza e assistere i movimenti, permettendo un allenamento completo e sicuro."
        }
      },
      {
        "@type": "Question",
        "name": "È adatto ai principianti?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sì, il Reformer è perfetto per i principianti perché supporta il corpo durante i movimenti e permette di apprendere la tecnica corretta in sicurezza. Gli esercizi vengono sempre adattati al livello individuale."
        }
      },
      {
        "@type": "Question",
        "name": "Quali benefici ha il Pilates Reformer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Migliora forza del core, flessibilità, postura, coordinazione e equilibrio. È ideale per il mal di schiena, la riabilitazione e per ottenere un corpo tonico ed elegante."
        }
      },
      {
        "@type": "Question",
        "name": "Quante lezioni a settimana sono consigliate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Per risultati ottimali consigliamo 2-3 lezioni a settimana. Anche una singola lezione settimanale può portare benefici significativi se praticata con costanza."
        }
      },
      {
        "@type": "Question",
        "name": "Pilates Reformer vs Mat work: differenze?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Il Reformer aggiunge resistenza e supporto agli esercizi, permettendo maggiore varietà e precisione. È più completo del Mat work e ideale per chi cerca risultati specifici su postura e tonificazione."
        }
      }
    ]
  };

  const whatsappMessage = encodeURIComponent("Ciao! Sono interessato/a al Pilates Reformer. Vorrei prenotare la lezione di prova gratuita.");

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="Pilates Reformer Legnago, core stability, postura, flessibilità, mal di schiena, tonificazione" />
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
        <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 min-h-[60vh] flex items-center">
          <div className="absolute inset-0 bg-black/40" />
          <LazyImage
            src="/images/fitness-professional-bg.jpg"
            alt="Pilates Reformer Legnago"
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
                  <span className="text-white">Pilates Reformer</span>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Pilates Reformer guidato da specialisti
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Allenamento su Reformer per <strong className="text-white">rinforzo profondo, stabilità e controllo.</strong><br />
                Ideale per schiena e forma fisica elegante.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  <a href={`https://wa.me/393291070374?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                    <Activity className="mr-2 h-5 w-5" />
                    Prova Gratuita Reformer
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Perché scegliere il Pilates Reformer?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                L'attrezzo originale di Joseph Pilates per un allenamento completo e sicuro
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <Dumbbell className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Core Stability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Rinforza il centro del corpo (core) con precisione. Migliora stabilità, 
                    equilibrio e controllo in tutti i movimenti quotidiani.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Postura Elegante</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Allunga e tonifica creando una silhouette elegante. Ideale per chi 
                    cerca una forma fisica armoniosa e una postura impeccabile.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Sicuro ed Efficace</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Il Reformer supporta il corpo durante l'esercizio, riducendo il rischio 
                    di infortuni. Adatto a tutti i livelli e età.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What is Reformer */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Cos'è il Pilates Reformer?</h2>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <LazyImage
                    src="/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
                    alt="Pilates Reformer MUV Fitness Legnago"
                    className="rounded-lg shadow-lg"
                    width={600}
                    height={400}
                  />
                </div>
                
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Il <strong>Reformer</strong> è l'attrezzo principale del Pilates, inventato da Joseph Pilates negli anni '20. 
                    È composto da un carrello mobile che scorre su guide, collegato a molle di varia resistenza.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Activity className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Resistenza Variabile</h3>
                        <p className="text-gray-600">Le molle offrono resistenza progressiva, facilitando o aumentando la difficoltà</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Target className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Supporto e Assistenza</h3>
                        <p className="text-gray-600">Il carrello mobile supporta il corpo, permettendo movimenti fluidi e sicuri</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Award className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Versatilità Completa</h3>
                        <p className="text-gray-600">Centinaia di esercizi per tutto il corpo, da sdraiati, seduti o in piedi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Detailed */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Benefici del Pilates Reformer</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600">Benefici Fisici</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Rinforzo del core e stabilità</li>
                      <li>• Miglioramento della postura</li>
                      <li>• Aumento della flessibilità</li>
                      <li>• Tonificazione muscolare</li>
                      <li>• Riduzione del mal di schiena</li>
                      <li>• Coordinazione e equilibrio</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600">Benefici Mentali</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Concentrazione e focus</li>
                      <li>• Riduzione dello stress</li>
                      <li>• Connessione mente-corpo</li>
                      <li>• Controllo del movimento</li>
                      <li>• Rilassamento profondo</li>
                      <li>• Maggiore consapevolezza corporea</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Domande Frequenti sul Pilates Reformer</h2>
              
              <div className="space-y-6">
                {faqSchema.mainEntity.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-blue-600" />
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
        <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Prova il Pilates Reformer Gratuitamente
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Prima lezione gratuita per scoprire i benefici del Reformer. Inizia il tuo percorso verso una postura perfetta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <a href={`https://wa.me/393291070374?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                    <Activity className="mr-2 h-5 w-5" />
                    WhatsApp: Prenota Subito
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-600">
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
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Approfondimenti Pilates</h2>
              <p className="text-gray-600">Scopri di più sul metodo Pilates e i suoi benefici</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Link to="/blog" className="hover:text-blue-600 transition-colors">
                      Pilates per il Mal di Schiena
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Come il Pilates Reformer può aiutare a prevenire e alleviare il mal di schiena cronico.
                  </p>
                  <Link to="/blog" className="text-blue-600 hover:underline flex items-center gap-1">
                    Leggi l'articolo <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <Link to="/blog" className="hover:text-blue-600 transition-colors">
                      Reformer vs Mat Work
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Differenze e vantaggi del Pilates su Reformer rispetto agli esercizi a corpo libero.
                  </p>
                  <Link to="/blog" className="text-blue-600 hover:underline flex items-center gap-1">
                    Leggi l'articolo <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <Link to="/risultati" className="hover:text-blue-600 transition-colors">
                      Trasformazioni Pilates
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Storie di trasformazione fisica e posturale con il Pilates Reformer a Legnago.
                  </p>
                  <Link to="/risultati" className="text-blue-600 hover:underline flex items-center gap-1">
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

export default PilatesReformerLegnago;