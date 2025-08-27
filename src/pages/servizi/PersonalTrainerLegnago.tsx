import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Users, Clock, Target, Award, ChevronRight, User } from "lucide-react";
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

const PersonalTrainerLegnago = () => {
  const pageTitle = "Personal Trainer a Legnago – 1:1 & Small Group | MUV";
  const pageDescription = "Percorsi individuali o in piccoli gruppi (max 5–6). Obiettivi chiari, coaching costante, risultati concreti.";
  const canonicalUrl = "https://www.muvfitness.it/servizi/personal-trainer-legnago/";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Personal Trainer Legnago",
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
    "serviceType": "Personal Training",
    "offers": {
      "@type": "Offer",
      "name": "Consulenza Personal Trainer Gratuita",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Prima consulenza gratuita con Personal Trainer qualificato"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Cosa include il servizio Personal Trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Include valutazione iniziale, programma personalizzato, coaching costante durante gli allenamenti, monitoraggio progressi e adattamento del programma. Disponibile sia 1:1 che in Small Group."
        }
      },
      {
        "@type": "Question",
        "name": "Qual è la differenza tra 1:1 e Small Group?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Il Personal Training 1:1 offre attenzione esclusiva e programmi completamente personalizzati. Lo Small Group (max 5-6 persone) combina motivazione di gruppo con supervisione personalizzata, a costi più contenuti."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto costa un Personal Trainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I prezzi variano in base alla tipologia (1:1 o Small Group) e al numero di sedute. Offriamo pacchetti flessibili e la prima consulenza è sempre gratuita per valutare il percorso più adatto."
        }
      },
      {
        "@type": "Question",
        "name": "È adatto ai principianti?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Assolutamente sì. Il Personal Training è ideale per i principianti perché insegna la tecnica corretta fin dall'inizio, evita infortuni e crea le basi per un approccio al fitness sicuro ed efficace."
        }
      },
      {
        "@type": "Question",
        "name": "In quanto tempo vedo i risultati?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I primi miglioramenti si vedono in 2-3 settimane (forza e resistenza). Cambiamenti fisici visibili in 4-6 settimane con allenamento costante di 2-3 volte a settimana."
        }
      }
    ]
  };

  const whatsappMessage = encodeURIComponent("Ciao! Sono interessato/a al Personal Training. Vorrei prenotare la consulenza gratuita per conoscere i vostri programmi.");

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="Personal Trainer Legnago, allenamento personalizzato, small group, fitness coaching, obiettivi" />
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
        <section className="relative bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900 min-h-[60vh] flex items-center">
          <div className="absolute inset-0 bg-black/40" />
          <LazyImage
            src="/images/fitness-professional-bg.jpg"
            alt="Personal Trainer Legnago"
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
                  <span className="text-white">Personal Trainer</span>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                Personal Training su misura, senza caos
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                <strong className="text-white">Percorsi individuali o in piccoli gruppi (max 5–6).</strong><br />
                Obiettivi chiari, coaching costante, risultati concreti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  <a href={`https://wa.me/393291070374?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                    <User className="mr-2 h-5 w-5" />
                    Consulenza Gratuita
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-gray-900">
                  <Link to="/contatti">
                    Prenota Subito
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Service Options */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Scegli il tuo percorso</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Due modalità per adattarsi alle tue esigenze e ai tuoi obiettivi
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="text-center p-8 border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <User className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl mb-2">Personal Training 1:1</CardTitle>
                  <p className="text-gray-600">Attenzione esclusiva per risultati massimi</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-left mb-6">
                    <li className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-orange-600" />
                      <span>Programma completamente personalizzato</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span>Orari flessibili secondo le tue esigenze</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-orange-600" />
                      <span>Correzione tecnica costante</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-orange-600" />
                      <span>Progressi più rapidi</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-500 mb-4">Ideale per: principianti, obiettivi specifici, riabilitazione</p>
                  <Button asChild className="w-full">
                    <Link to="/contatti">Scopri di più</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center p-8 border-2 hover:border-orange-200 transition-all">
                <CardHeader>
                  <Users className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl mb-2">Small Group Training</CardTitle>
                  <p className="text-gray-600">Motivazione di gruppo, attenzione individuale</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-left mb-6">
                    <li className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-600" />
                      <span>Gruppi di massimo 5-6 persone</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span>Orari fissi per maggiore costanza</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-orange-600" />
                      <span>Supervisione personalizzata</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-orange-600" />
                      <span>Costi più contenuti</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-500 mb-4">Ideale per: motivazione extra, socializzazione, costanza</p>
                  <Button asChild className="w-full">
                    <Link to="/contatti">Scopri di più</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Method */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Il nostro metodo</h2>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <LazyImage
                    src="/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
                    alt="Personal Trainer MUV Fitness Legnago"
                    className="rounded-lg shadow-lg"
                    width={600}
                    height={400}
                  />
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Analisi Iniziale Completa</h3>
                      <p className="text-gray-600">Valutazione fisica, obiettivi, stile di vita e limitazioni per creare il programma perfetto</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Programma Personalizzato</h3>
                      <p className="text-gray-600">Piano di allenamento specifico per i tuoi obiettivi: dimagrimento, tonificazione, forza</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Coaching Costante</h3>
                      <p className="text-gray-600">Supervisione tecnica, motivazione e adattamento del programma durante tutto il percorso</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Risultati Misurabili</h3>
                      <p className="text-gray-600">Controlli periodici per verificare i progressi e celebrare i traguardi raggiunti</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Perché scegliere il Personal Training?</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-orange-600">Risultati Garantiti</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Progressi più rapidi e duraturi</li>
                      <li>• Tecnica corretta fin dall'inizio</li>
                      <li>• Prevenzione infortuni</li>
                      <li>• Motivazione costante</li>
                      <li>• Superamento dei plateau</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-orange-600">Efficienza Massima</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Programmi ottimizzati per i tuoi tempi</li>
                      <li>• Nessun tempo perso</li>
                      <li>• Esercizi specifici per i tuoi obiettivi</li>
                      <li>• Flessibilità negli orari</li>
                      <li>• Ambiente riservato e concentrato</li>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Domande Frequenti sul Personal Training</h2>
              
              <div className="space-y-6">
                {faqSchema.mainEntity.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-orange-600" />
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
        <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Inizia il Tuo Personal Training
              </h2>
              <p className="text-xl text-orange-100 mb-8">
                Prima consulenza gratuita per conoscere il programma più adatto ai tuoi obiettivi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <a href={`https://wa.me/393291070374?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                    <User className="mr-2 h-5 w-5" />
                    WhatsApp: Prenota Subito
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-orange-600">
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
              <h2 className="text-3xl font-bold mb-4">Approfondimenti Fitness</h2>
              <p className="text-gray-600">Scopri di più sul Personal Training e l'allenamento personalizzato</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Link to="/blog" className="hover:text-orange-600 transition-colors">
                      Come Scegliere il Personal Trainer
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Guida completa per scegliere il Personal Trainer più adatto alle tue esigenze.
                  </p>
                  <Link to="/blog" className="text-orange-600 hover:underline flex items-center gap-1">
                    Leggi l'articolo <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <Link to="/blog" className="hover:text-orange-600 transition-colors">
                      Allenamento vs Palestra
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Differenze tra Personal Training e allenamento autonomo in palestra.
                  </p>
                  <Link to="/blog" className="text-orange-600 hover:underline flex items-center gap-1">
                    Leggi l'articolo <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <Link to="/risultati" className="hover:text-orange-600 transition-colors">
                      Storie di Successo
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Trasformazioni reali dei nostri clienti con Personal Training a Legnago.
                  </p>
                  <Link to="/risultati" className="text-orange-600 hover:underline flex items-center gap-1">
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

export default PersonalTrainerLegnago;