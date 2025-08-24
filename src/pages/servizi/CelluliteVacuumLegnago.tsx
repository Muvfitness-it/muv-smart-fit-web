import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Droplets, Clock, Target, Award, ChevronRight, Sparkles } from "lucide-react";
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

const CelluliteVacuumLegnago = () => {
  const pageTitle = "Cellulite e Ritenzione a Legnago – Vacuum & Pressoterapia";
  const pageDescription = "Tecnologie mirate per microcircolo e drenaggio. Programmi in 6–8 settimane, risultati misurabili.";
  const canonicalUrl = "https://www.muvfitness.it/servizi/cellulite-vacuum-pressoterapia-legnago/";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Trattamento Cellulite Vacuum Pressoterapia Legnago",
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
    "serviceType": "Trattamento cellulite e ritenzione idrica",
    "offers": {
      "@type": "Offer",
      "name": "Valutazione Gratuita Cellulite",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Prima valutazione gratuita per trattamento cellulite con vacuum"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Come funziona il trattamento Vacuum?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Il Vacuum utilizza un sistema di aspirazione controllata che stimola il microcircolo, favorisce il drenaggio linfatico e migliora l'ossigenazione dei tessuti, riducendo visibilmente cellulite e ritenzione idrica."
        }
      },
      {
        "@type": "Question",
        "name": "Cos'è la Pressoterapia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La Pressoterapia è un trattamento che utilizza pressioni pneumatiche sequenziali per stimolare il sistema linfatico e venoso, facilitando l'eliminazione di liquidi e tossine dalle gambe."
        }
      },
      {
        "@type": "Question",
        "name": "In quanto tempo vedo i risultati?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I primi risultati si notano dopo 3-4 sedute con gambe più leggere e meno gonfiore. Risultati significativi sulla cellulite si ottengono in 6-8 settimane di trattamento costante."
        }
      },
      {
        "@type": "Question",
        "name": "Quante sedute servono?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Consigliamo cicli di 10-12 sedute, 2 volte a settimana per le prime 4 settimane, poi 1 volta a settimana per il mantenimento. Il protocollo viene personalizzato in base al caso specifico."
        }
      },
      {
        "@type": "Question",
        "name": "È doloroso il trattamento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, sia Vacuum che Pressoterapia sono trattamenti completamente indolori e rilassanti. Molte clienti si addormentano durante la seduta. L'intensità è sempre regolabile per il massimo comfort."
        }
      }
    ]
  };

  const whatsappMessage = encodeURIComponent("Ciao! Ho cellulite e ritenzione idrica. Vorrei informazioni sui trattamenti Vacuum e Pressoterapia.");

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="cellulite Legnago, ritenzione idrica, vacuum therapy, pressoterapia, drenaggio linfatico, gambe gonfie" />
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
        <section className="relative bg-gradient-to-br from-gray-900 via-pink-900 to-gray-900 min-h-[60vh] flex items-center">
          <div className="absolute inset-0 bg-black/40" />
          <LazyImage
            src="/images/fitness-professional-bg.jpg"
            alt="Trattamento Cellulite Vacuum Legnago"
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
                  <span className="text-white">Cellulite & Vacuum</span>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                Protocolli mirati per cellulite e gambe leggere
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                <strong className="text-white">Cellulite e ritenzione? Protocollo Vacuum + Pressoterapia in 6–8 settimane.</strong><br />
                Tecnologie mirate per microcircolo e drenaggio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700">
                  <a href={`https://wa.me/393513380770?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                    <Droplets className="mr-2 h-5 w-5" />
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Perché scegliere i nostri trattamenti?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tecnologie avanzate e protocolli personalizzati per risultati visibili
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <Droplets className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                  <CardTitle>Drenaggio Efficace</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Vacuum e Pressoterapia stimolano il sistema linfatico, eliminando 
                    liquidi in eccesso e riducendo gonfiore e pesantezza delle gambe.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Target className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                  <CardTitle>Risultati Misurabili</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Protocolli di 6-8 settimane con misurazione dei progressi. 
                    Riduciamo visibilmente cellulite e circonferenze in modo documentato.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Sparkles className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                  <CardTitle>Tecnologie Avanzate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Utilizziamo solo tecnologie certificate e sicure. Trattamenti 
                    indolori e rilassanti con risultati clinicamente testati.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Le nostre tecnologie</h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                {/* Vacuum Therapy */}
                <Card className="overflow-hidden">
                  <LazyImage
                    src="/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
                    alt="Vacuum Therapy Legnago"
                    className="w-full h-48 object-cover"
                    width={600}
                    height={300}
                  />
                  <CardHeader>
                    <CardTitle className="text-2xl text-pink-600 flex items-center gap-2">
                      <Droplets className="w-6 h-6" />
                      Vacuum Therapy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Il Vacuum utilizza un sistema di aspirazione controllata che crea un effetto 
                      "massaggio" profondo sui tessuti, stimolando la circolazione e favorendo 
                      lo smaltimento delle tossine.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Migliora il microcircolo</li>
                      <li>• Riduce la cellulite visibile</li>
                      <li>• Tonifica i tessuti</li>
                      <li>• Indolore e rilassante</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Pressoterapia */}
                <Card className="overflow-hidden">
                  <LazyImage
                    src="/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
                    alt="Pressoterapia Legnago"
                    className="w-full h-48 object-cover"
                    width={600}
                    height={300}
                  />
                  <CardHeader>
                    <CardTitle className="text-2xl text-pink-600 flex items-center gap-2">
                      <Sparkles className="w-6 h-6" />
                      Pressoterapia
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      La Pressoterapia utilizza pressioni pneumatiche sequenziali che 
                      simulano un massaggio linfodrenante, favorendo l'eliminazione 
                      di liquidi e tossine.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Drenaggio linfatico efficace</li>
                      <li>• Riduce ritenzione idrica</li>
                      <li>• Gambe più leggere</li>
                      <li>• Effetto immediato</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Treatment Process */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Come funziona il trattamento?</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Valutazione Gratuita</h3>
                    <p className="text-gray-600">Analisi della cellulite, misurazione circonferenze e definizione del protocollo personalizzato</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Trattamento Combinato</h3>
                    <p className="text-gray-600">Seduta di Vacuum (30 min) + Pressoterapia (30 min) per massimizzare i risultati</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Protocollo Personalizzato</h3>
                    <p className="text-gray-600">Frequenza di 2-3 sedute settimanali per le prime 4 settimane, poi mantenimento</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Monitoraggio Risultati</h3>
                    <p className="text-gray-600">Controlli settimanali con misurazione progressi e adattamento del trattamento</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Domande Frequenti sui Trattamenti</h2>
              
              <div className="space-y-6">
                {faqSchema.mainEntity.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ChevronRight className="w-5 h-5 text-pink-600" />
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

        {/* Results Timeline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Timeline dei Risultati</h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <Clock className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                    <CardTitle className="text-lg">1-2 Settimane</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Gambe più leggere, riduzione del gonfiore, miglioramento della circolazione
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Target className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                    <CardTitle className="text-lg">3-4 Settimane</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Prima riduzione delle circonferenze, pelle più tonica al tatto
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Sparkles className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                    <CardTitle className="text-lg">6-8 Settimane</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Riduzione visibile della cellulite, miglioramento significativo dell'aspetto
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Award className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                    <CardTitle className="text-lg">Mantenimento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      1 seduta settimanale per mantenere i risultati ottenuti nel tempo
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-pink-600 to-rose-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Inizia il Tuo Percorso Oggi
              </h2>
              <p className="text-xl text-pink-100 mb-8">
                Prima valutazione gratuita per analizzare la tua situazione e creare il protocollo più adatto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <a href={`https://wa.me/393513380770?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                    <Droplets className="mr-2 h-5 w-5" />
                    WhatsApp: Prenota Subito
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-pink-600">
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
              <h2 className="text-3xl font-bold mb-4">Approfondimenti Cellulite</h2>
              <p className="text-gray-600">Scopri di più sulla cellulite e come combatterla efficacemente</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Link to="/blog" className="hover:text-pink-600 transition-colors">
                      Cause della Cellulite
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Comprendi le vere cause della cellulite e come prevenirne la formazione.
                  </p>
                  <Link to="/blog" className="text-pink-600 hover:underline flex items-center gap-1">
                    Leggi l'articolo <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <Link to="/blog" className="hover:text-pink-600 transition-colors">
                      Alimentazione Anti-Cellulite
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Consigli nutrizionali per ridurre la ritenzione idrica e migliorare la circolazione.
                  </p>
                  <Link to="/blog" className="text-pink-600 hover:underline flex items-center gap-1">
                    Leggi l'articolo <ChevronRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <Link to="/risultati" className="hover:text-pink-600 transition-colors">
                      Prima e Dopo Vacuum
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Risultati reali ottenuti con i nostri trattamenti anticellulite a Legnago.
                  </p>
                  <Link to="/risultati" className="text-pink-600 hover:underline flex items-center gap-1">
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

export default CelluliteVacuumLegnago;