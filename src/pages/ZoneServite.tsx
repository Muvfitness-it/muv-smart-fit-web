import { Helmet } from "react-helmet";
import { MapPin, Navigation, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BUSINESS_DATA, getGeoFAQSchema } from "@/config/businessData";
import { GeoOptimizer } from "@/components/SEO/GeoOptimizer";

const ZoneServite = () => {
  const pageTitle = "Zone Servite da MUV Fitness | Legnago, Cerea, Bovolone, Bassa Veronese";
  const pageDescription = "MUV Fitness serve Legnago e tutta la Bassa Veronese: Cerea, Bovolone, San Bonifacio, Minerbe, Castagnaro. Scopri se siamo nella tua zona!";

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": BUSINESS_DATA.name,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS_DATA.address.street,
      "addressLocality": BUSINESS_DATA.address.city,
      "addressRegion": BUSINESS_DATA.address.region,
      "postalCode": BUSINESS_DATA.address.postalCode,
      "addressCountry": BUSINESS_DATA.address.countryCode
    },
    "areaServed": BUSINESS_DATA.areasServed.map(area => ({
      "@type": area.type,
      "name": area.name
    }))
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="muv fitness zone servite, palestra legnago zona, personal trainer cerea, ems bovolone, fitness bassa veronese" />
        <link rel="canonical" href={`${BUSINESS_DATA.web.domain}/zone-servite/`} />
        
        <script type="application/ld+json">
          {JSON.stringify(placeSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(getGeoFAQSchema())}
        </script>
      </Helmet>

      <GeoOptimizer
        canonicalUrl={`${BUSINESS_DATA.web.domain}/zone-servite/`}
        additionalKeywords={['zone servite muv fitness', 'fitness bassa veronese', 'palestra provincia verona']}
      />

      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-primary via-secondary to-accent">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Zone Servite da MUV Fitness
            </h1>
            <p className="text-xl text-white/95 mb-4 max-w-3xl mx-auto">
              Serviamo {BUSINESS_DATA.address.city} e tutta la Bassa Veronese con le nostre tecnologie esclusive
            </p>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              I nostri clienti arrivano da un raggio di 20km per accedere a EMS Training, Pilates Reformer e servizi premium
            </p>
          </div>
        </section>

        {/* Città Principale */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="border-4 border-primary">
                <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
                  <CardTitle className="text-3xl flex items-center gap-3">
                    <MapPin className="w-8 h-8" />
                    {BUSINESS_DATA.address.city} - Sede Principale
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <p className="text-lg">
                      <strong>{BUSINESS_DATA.name}</strong> ha sede nel cuore di Legnago, 
                      facilmente raggiungibile da tutta la provincia di Verona.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Centro Storico</p>
                          <p className="text-sm text-muted-foreground">Facilmente accessibile a piedi</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Vicino alla Stazione</p>
                          <p className="text-sm text-muted-foreground">5 minuti a piedi dalla FS</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Parcheggi Disponibili</p>
                          <p className="text-sm text-muted-foreground">Gratuiti nelle vie limitrofe</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Ben Collegato</p>
                          <p className="text-sm text-muted-foreground">Accessibile da tutta la provincia</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Altre Zone */}
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">
                Comuni e Zone Limitrofe
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                I nostri clienti arrivano da tutta la Bassa Veronese per accedere alle nostre tecnologie esclusive
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {BUSINESS_DATA.areasServed
                  .filter(area => !area.isPrimary)
                  .map((area, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          {area.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Navigation className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Distanza: <strong>{area.distance}</strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Tempo: <strong>~{parseInt(area.distance) * 1.5 || 15}-{parseInt(area.distance) * 2 || 20} min</strong>
                            </span>
                          </div>
                          <a 
                            href={`${BUSINESS_DATA.geo.googleMapsUrl}&saddr=${area.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                          >
                            <Navigation className="w-3 h-3" />
                            Calcola percorso
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mappa Zone */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Area di Servizio
              </h2>
              <Card>
                <CardContent className="p-0">
                  <iframe
                    src={BUSINESS_DATA.geo.googleMapsEmbed}
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mappa Zone Servite MUV Fitness"
                    className="rounded-lg"
                  />
                </CardContent>
              </Card>
              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  Raggio di servizio principale: <strong>20 km</strong> da Legnago
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Perché vale la pena venire */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Perché I Clienti Scelgono di Venire da Noi
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-primary" />
                      Tecnologie Esclusive
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Siamo l'unico centro nella Bassa Veronese con EMS professionale certificato, 
                      Pilates Reformer top di gamma e Vacuum Therapy medica.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-secondary" />
                      Risultati Garantiti
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Protocolli evidence-based con risultati misurabili in 4-8 settimane. 
                      I clienti vengono anche da Verona città per i nostri metodi.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-accent" />
                      Personalizzazione Totale
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Ogni protocollo è costruito su misura con valutazioni mensili e 
                      monitoraggio costante. Non troverai questo livello di attenzione altrove.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-primary" />
                      Team Certificato
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Trainer certificati EMS, istruttori Pilates Reformer avanzato, 
                      nutrizionisti e fisioterapisti. Competenza e professionalità uniche.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Domande Frequenti sulle Zone Servite
              </h2>
              
              <Card>
                <CardContent className="pt-6">
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
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Vieni a Trovarci, Ovunque Tu Sia
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Anche se non sei di Legnago, vale la pena venire da noi per le tecnologie esclusive e i risultati garantiti
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contatti"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Prenota la Prova Gratuita
              </a>
              <a 
                href="/come-arrivare"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                <Navigation className="w-5 h-5" />
                Come Arrivare
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ZoneServite;
