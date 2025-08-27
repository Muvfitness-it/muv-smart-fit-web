import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Zap, Clock, Target, Award, ChevronRight } from "lucide-react";
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

const EMSLegnago = () => {
  const pageTitle = "EMS a Legnago – Dimagrire e Tonificare in 20' | MUV Fitness";
  const pageDescription = "EMS a Legnago con Personal Trainer. Sessioni da 20 minuti, piani su misura per dimagrimento, forza e ricomposizione. Prova ora.";
  const canonicalUrl = "https://www.muvfitness.it/servizi/ems-legnago/";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Allenamento EMS Legnago",
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
    "serviceType": "Elettrostimolazione muscolare",
    "offers": {
      "@type": "Offer",
      "name": "Prova EMS Gratuita",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Prima sessione EMS di prova gratuita con valutazione"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Cos'è l'allenamento EMS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'EMS (Elettrostimolazione Muscolare) utilizza impulsi elettrici per attivare i muscoli durante l'esercizio, amplificando l'efficacia dell'allenamento. In 20 minuti raggiungi risultati equivalenti a 90 minuti di palestra tradizionale."
        }
      },
      {
        "@type": "Question", 
        "name": "Quanto dura una sessione EMS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ogni sessione EMS dura 20 minuti effettivi di allenamento, più 5-10 minuti per indossare la tuta tecnologica. L'allenamento completo si conclude in circa 30 minuti."
        }
      },
      {
        "@type": "Question",
        "name": "È sicuro l'allenamento EMS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sì, l'EMS è completamente sicuro quando eseguito da Personal Trainer qualificati. La tecnologia è certificata e utilizzata in medicina riabilitativa da decenni. Ogni sessione è personalizzata e monitorata."
        }
      },
      {
        "@type": "Question",
        "name": "Quante volte a settimana si può fare EMS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Consigliamo 2 sessioni a settimana, con almeno 48 ore di riposo tra una sessione e l'altra. Questo permette il recupero muscolare ottimale e massimizza i risultati."
        }
      },
      {
        "@type": "Question",
        "name": "In quanto tempo vedo i risultati con EMS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I primi risultati sono visibili dopo 2-3 settimane: aumento della forza e riduzione del grasso corporeo. Risultati significativi in termini di ricomposizione corporea si ottengono in 6-8 settimane di allenamento costante."
        }
      }
    ]
  };

  const whatsappMessage = encodeURIComponent("Ciao! Sono interessato/a all'allenamento EMS. Vorrei prenotare la prova gratuita.");

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="EMS Legnago, elettrostimolazione, personal trainer, dimagrimento, tonificazione, allenamento, fitness" />
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
        <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-[60vh] flex items-center">
          <div className="absolute inset-0 bg-black/40" />
          <LazyImage
            src="/images/fitness-professional-bg.jpg"
            alt="Allenamento EMS Legnago"
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
                  <span className="text-white">EMS Legnago</span>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Allenamento EMS: risultati in meno tempo
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Hai poco tempo? <strong className="text-white">EMS allena in 20 minuti reali.</strong><br />
                Elettrostimolazione muscolare con Personal Trainer a Legnago.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <a href={`https://wa.me/393291070374?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                    <Zap className="mr-2 h-5 w-5" />
                    Prova Gratuita EMS
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Perché scegliere l'EMS a Legnago?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tecnologia certificata, risultati misurabili, Personal Trainer qualificati
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle>20 Minuti Efficaci</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Un allenamento EMS di 20 minuti equivale a 90 minuti di palestra tradizionale. 
                    Perfetto per chi ha poco tempo ma vuole risultati concreti.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle>Risultati Misurabili</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Dimagrimento, tonificazione e aumento della forza in tempi ridotti. 
                    Ogni sessione è personalizzata sui tuoi obiettivi specifici.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle>Personal Trainer Qualificato</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ogni sessione è guidata da un Personal Trainer certificato EMS. 
                    Sicurezza, tecnica corretta e motivazione costante.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Come funziona l'EMS?</h2>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <LazyImage
                    src="/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
                    alt="Tecnologia EMS MUV Fitness Legnago"
                    className="rounded-lg shadow-lg"
                    width={600}
                    height={400}
                  />
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Valutazione Iniziale</h3>
                      <p className="text-gray-600">Analisi corporea e definizione obiettivi personalizzati</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Tuta EMS</h3>
                      <p className="text-gray-600">Indossi la tuta tecnologica con elettrodi certificati</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Allenamento Guidato</h3>
                      <p className="text-gray-600">20 minuti di esercizi con elettrostimolazione personalizzata</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Monitoraggio Progressi</h3>
                      <p className="text-gray-600">Verifica costante dei risultati e adattamento del programma</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Domande Frequenti sull'EMS</h2>
              
              <div className="space-y-6">
                {faqSchema.mainEntity.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-purple-600" />
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
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Prova l'EMS Gratuitamente
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Prima sessione EMS gratuita con valutazione corporea. Scopri come allenarti in soli 20 minuti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <a href={`https://wa.me/393291070374?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                    <Zap className="mr-2 h-5 w-5" />
                    WhatsApp: Prenota Subito
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-purple-600">
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
              <h2 className="text-3xl font-bold mb-4">Approfondimenti EMS</h2>
              <p className="text-gray-600">Scopri di più sull'elettrostimolazione e i benefici per il tuo corpo</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Link to="/blog" className="hover:text-purple-600 transition-colors">
                      EMS vs Palestra Tradizionale
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Confronto dettagliato tra l'allenamento EMS e quello tradizionale in palestra.
                  </p>
                  <Link to="/blog" className="text-purple-600 hover:underline flex items-center gap-1">
                    Leggi l'articolo <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <Link to="/blog" className="hover:text-purple-600 transition-colors">
                      Risultati EMS in 30 Giorni
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Cosa aspettarti nei primi 30 giorni di allenamento con elettrostimolazione.
                  </p>
                  <Link to="/blog" className="text-purple-600 hover:underline flex items-center gap-1">
                    Leggi l'articolo <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <Link to="/risultati" className="hover:text-purple-600 transition-colors">
                      Testimonianze EMS
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Storie reali di trasformazione con l'allenamento EMS a Legnago.
                  </p>
                  <Link to="/risultati" className="text-purple-600 hover:underline flex items-center gap-1">
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

export default EMSLegnago;