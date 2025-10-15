import { Helmet } from "react-helmet";
import { MapPin, Car, Clock, Navigation, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BUSINESS_DATA, getGeoFAQSchema } from "@/config/businessData";

const ComeArrivare = () => {
  const pageTitle = "Come Arrivare a MUV Fitness Legnago | Mappa, Parcheggi e Indicazioni";
  const pageDescription = "Trova MUV Fitness a Legnago: indicazioni precise, parcheggi consigliati, mezzi pubblici e punti di riferimento. Piazzetta Don Walter Soave 2, a 5 minuti dalla stazione.";

  // Schema Place per la pagina
  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": BUSINESS_DATA.name,
    "description": "Sede di MUV Fitness nel centro storico di Legnago",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS_DATA.address.street,
      "addressLocality": BUSINESS_DATA.address.city,
      "addressRegion": BUSINESS_DATA.address.region,
      "postalCode": BUSINESS_DATA.address.postalCode,
      "addressCountry": BUSINESS_DATA.address.countryCode
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": BUSINESS_DATA.geo.latitude,
      "longitude": BUSINESS_DATA.geo.longitude
    },
    "hasMap": BUSINESS_DATA.geo.googleMapsUrl,
    "isAccessibleForFree": false,
    "publicAccess": false,
    "smokingAllowed": false
  };

  const faqSchema = getGeoFAQSchema();

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="muv fitness legnago dove si trova, indirizzo muv fitness, come arrivare muv fitness, parcheggio muv fitness legnago, palestra centro legnago" />
        <link rel="canonical" href={`${BUSINESS_DATA.web.domain}/come-arrivare/`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="place" />
        <meta property="og:url" content={`${BUSINESS_DATA.web.domain}/come-arrivare/`} />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify(placeSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary via-secondary to-accent">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Come Raggiungerci
            </h1>
            <p className="text-xl text-white/95 mb-4">
              {BUSINESS_DATA.address.fullAddress}
            </p>
            <p className="text-lg text-white/90 mb-8">
              Nel cuore del centro storico di Legnago, a 5 minuti dalla stazione ferroviaria
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={BUSINESS_DATA.geo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Navigation className="w-5 h-5" />
                Apri in Google Maps
              </a>
              <a 
                href={BUSINESS_DATA.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Chiedi Indicazioni su WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              
              {/* Indirizzo e Contatti */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <MapPin className="w-6 h-6 text-primary" />
                    Indirizzo e Contatti
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold text-lg mb-1">{BUSINESS_DATA.name}</p>
                    <p className="text-muted-foreground">{BUSINESS_DATA.address.street}</p>
                    <p className="text-muted-foreground">
                      {BUSINESS_DATA.address.postalCode} {BUSINESS_DATA.address.city} ({BUSINESS_DATA.address.provinceCode})
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Telefono</p>
                        <a href={`tel:${BUSINESS_DATA.contact.phoneInternational}`} className="font-semibold hover:text-primary">
                          {BUSINESS_DATA.contact.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a href={`mailto:${BUSINESS_DATA.contact.email}`} className="font-semibold hover:text-primary">
                          {BUSINESS_DATA.contact.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Seguici sui Social</p>
                    <div className="flex gap-4">
                      <a 
                        href={BUSINESS_DATA.social.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                        aria-label="Facebook MUV Fitness"
                      >
                        <Facebook className="w-6 h-6" />
                        <span className="text-sm font-medium">Facebook</span>
                      </a>
                      <a 
                        href={BUSINESS_DATA.social.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors"
                        aria-label="Instagram MUV Fitness"
                      >
                        <Instagram className="w-6 h-6" />
                        <span className="text-sm font-medium">Instagram</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Orari di Apertura */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Clock className="w-6 h-6 text-secondary" />
                    Orari di Apertura
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {BUSINESS_DATA.openingHours.structured.map((hours, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <span className="font-medium">{hours.displayDays}</span>
                        <span className={hours.opens ? "text-primary font-semibold" : "text-muted-foreground"}>
                          {hours.displayHours}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                    <p className="text-sm font-medium text-accent">💡 Su appuntamento</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Prenota il tuo slot tramite WhatsApp o chiamata per essere sicuro di trovare posto
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mappa Google */}
            <div className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <MapPin className="w-6 h-6 text-primary" />
                    Mappa Interattiva
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <iframe
                    src={BUSINESS_DATA.geo.googleMapsEmbed}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mappa MUV Fitness Legnago"
                    className="rounded-b-lg"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Parcheggi e Mezzi */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Car className="w-6 h-6 text-accent" />
                    Parcheggi Consigliati
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="font-semibold text-green-900 dark:text-green-100 mb-2">✓ Parcheggio Gratuito</p>
                      <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                        <li>• Via Matteotti (100m dal centro)</li>
                        <li>• Via Frattini (150m dal centro)</li>
                        <li>• Parcheggio Stazione FS (400m)</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">ℹ️ Parcheggio a Pagamento</p>
                      <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                        <li>• Strisce blu nel centro storico</li>
                        <li>• Parcheggio Piazza Libertà (300m)</li>
                        <li>• Tariffa: €1/ora circa</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
                      <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">🚲 In Bicicletta</p>
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        Rastrelliere disponibili in Piazzetta Don Walter Soave e nelle vie limitrofe
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Navigation className="w-6 h-6 text-secondary" />
                    Punti di Riferimento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {BUSINESS_DATA.landmarks.map((landmark, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                        <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">{landmark.name}</p>
                          <p className="text-sm text-muted-foreground">{landmark.distance}</p>
                          <p className="text-xs text-muted-foreground mt-1">{landmark.direction}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Indicazioni da Zone Servite */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl">Come Arrivare dalle Zone Servite</CardTitle>
                <p className="text-muted-foreground">I nostri clienti arrivano da tutta la Bassa Veronese</p>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {BUSINESS_DATA.areasServed
                    .filter(area => !area.isPrimary)
                    .map((area, index) => (
                      <div key={index} className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border">
                        <p className="font-semibold text-lg mb-1">{area.name}</p>
                        <p className="text-sm text-muted-foreground">Distanza: {area.distance}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Via SP {area.type === "City" ? "provinciale" : "locale"}
                        </p>
                      </div>
                    ))}
                </div>
                
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="font-semibold mb-2">🚗 Tempi di Percorrenza Medi</p>
                  <ul className="text-sm space-y-1">
                    <li>• Da Cerea: 15-20 minuti</li>
                    <li>• Da Bovolone: 20-25 minuti</li>
                    <li>• Da San Bonifacio: 25-30 minuti</li>
                    <li>• Da Verona città: 35-40 minuti</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Localizzate */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Domande Frequenti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {BUSINESS_DATA.geoFAQs.map((faq, index) => (
                    <div key={index} className="pb-6 border-b last:border-b-0">
                      <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="py-12 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Hai Bisogno di Ulteriori Indicazioni?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contattaci su WhatsApp o chiamaci direttamente
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={BUSINESS_DATA.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Scrivi su WhatsApp
              </a>
              <a 
                href={`tel:${BUSINESS_DATA.contact.phoneInternational}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Chiama Ora
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ComeArrivare;
