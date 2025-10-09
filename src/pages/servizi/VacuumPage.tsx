import React from 'react';
import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { MinimalHero } from '@/features/hero';
import { ServiceCTASection } from '@/components/layouts/ServiceCTASection';
import { ServiceFAQSection } from '@/components/layouts/ServiceFAQSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Droplets, Heart, Sparkles, Clock, Users, CheckCircle } from 'lucide-react';

const VacuumPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Vacuum Pressoterapia",
    "description": "Trattamenti di pressoterapia e drenaggio linfatico a Legnago per cellulite e ritenzione idrica",
    "provider": {
      "@type": "LocalBusiness",
      "name": "MUV Fitness",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Via Roma 123",
        "addressLocality": "Legnago",
        "addressRegion": "Veneto",
        "postalCode": "37045",
        "addressCountry": "IT"
      },
      "telephone": "+393491234567"
    },
    "areaServed": {
      "@type": "City",
      "name": "Legnago"
    },
    "serviceType": "Beauty Treatment"
  };

  const benefits = [
    {
      icon: <Droplets className="h-8 w-8 text-primary" />,
      title: "Drenaggio Linfatico",
      description: "Elimina liquidi in eccesso e tossine naturalmente"
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Circolazione",
      description: "Migliora il microcircolo e ossigena i tessuti"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Anti-Cellulite",
      description: "Riduce visibilmente la buccia d'arancia"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Rilassante",
      description: "Massaggio piacevole che riduce stress e tensioni"
    }
  ];

  const results = [
    "Riduzione del gonfiore alle gambe del 70%",
    "Miglioramento della cellulite visibile già dalla 3ª seduta",
    "Maggiore leggerezza e benessere immediato",
    "Pelle più tonica e levigata",
    "Riduzione della ritenzione idrica",
    "Miglioramento del microcircolo"
  ];

  const faqs = [
    {
      question: "Cos'è la vacuum pressoterapia?",
      answer: "È un trattamento che utilizza pressione negativa controllata per stimolare il drenaggio linfatico, migliorare la circolazione e ridurre cellulite e ritenzione idrica."
    },
    {
      question: "Quanto dura una seduta?",
      answer: "Una seduta di vacuum pressoterapia dura tipicamente 45-60 minuti. È un trattamento completamente rilassante e piacevole."
    },
    {
      question: "Quante sedute servono per vedere risultati?",
      answer: "I primi benefici sono percepibili già dalla prima seduta. Per risultati duraturi si consigliano cicli di 8-12 sedute, 2-3 volte a settimana."
    },
    {
      question: "Ci sono controindicazioni?",
      answer: "Il trattamento è sconsigliato in gravidanza, con problemi cardiaci gravi, trombosi o flebite. Durante la consulenza valutiamo la tua situazione specifica."
    }
  ];

  return (
    <ServicePageLayout
      title="Vacuum Pressoterapia Legnago - Drenaggio Linfatico | MUV Fitness"
      description="Vacuum pressoterapia a Legnago per cellulite, ritenzione idrica e circolazione. Trattamenti drenanti efficaci. Prenota consulenza gratuita."
      keywords="vacuum pressoterapia Legnago, drenaggio linfatico, anti-cellulite Legnago, ritenzione idrica, circolazione gambe"
      canonical="https://www.muvfitness.it/servizi/vacuum"
      structuredData={structuredData}
    >
      <MinimalHero
        title="Vacuum Pressoterapia a Legnago"
        subtitle="Drenaggio Linfatico e Benessere per le Tue Gambe"
        description="Ritrova gambe leggere e toniche con la vacuum pressoterapia. Elimina ritenzione idrica, cellulite e migliora la circolazione con trattamenti piacevoli e rilassanti."
        gradient="accent"
        primaryCTA={{
          text: "Prenota Consulenza Gratuita",
          href: "#prenota"
        }}
        breadcrumbs={[
          { text: "Home", href: "/" },
          { text: "Servizi", href: "/servizi" },
          { text: "Vacuum Pressoterapia" }
        ]}
      />

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Users className="h-4 w-4 mr-2" />
              Trattamento più richiesto
            </Badge>
            <h2 className="text-3xl font-bold mb-4">I Benefici della Vacuum Pressoterapia</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un trattamento innovativo che combina benessere e risultati concreti per la salute delle tue gambe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Come Funziona il Trattamento</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold mb-2">Valutazione Iniziale</h4>
                    <p className="text-muted-foreground">Analizziamo le tue esigenze specifiche e definiamo il protocollo personalizzato</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold mb-2">Posizionamento</h4>
                    <p className="text-muted-foreground">Ti rilassi comodamente mentre posizioniamo i manipoli sulle zone da trattare</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold mb-2">Trattamento</h4>
                    <p className="text-muted-foreground">La pressione negativa stimola dolcemente il drenaggio linfatico</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-semibold mb-2">Relax Totale</h4>
                    <p className="text-muted-foreground">45 minuti di puro relax mentre il trattamento fa il suo lavoro</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8">
              <h4 className="text-xl font-bold mb-6 text-center">Risultati Comprovati</h4>
              <div className="space-y-3">
                {results.map((result, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{result}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-6 w-full" size="lg">
                Prenota Prima Seduta
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Indicato Per</h2>
            <p className="text-lg text-muted-foreground">La vacuum pressoterapia è perfetta se soffri di:</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Gambe pesanti e gonfie",
              "Ritenzione idrica",
              "Cellulite e buccia d'arancia",
              "Problemi di circolazione",
              "Gonfiore post-chirurgico",
              "Stress e tensioni muscolari"
            ].map((indication, index) => (
              <Card key={index} className="p-4">
                <CardContent className="flex items-center gap-3 pt-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{indication}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ServiceFAQSection
        title="Domande Frequenti sulla Vacuum Pressoterapia"
        faqs={faqs}
      />

      <ServiceCTASection
        title="Ritrova il Benessere delle Tue Gambe"
        description="Prenota una consulenza gratuita e scopri come la vacuum pressoterapia può aiutarti a sentirti meglio fin dalla prima seduta."
        primaryButton={{
          text: "Prenota Consulenza Gratuita",
          href: "#prenota"
        }}
        secondaryButton={{
          text: "WhatsApp",
          href: "https://wa.me/393491234567?text=Ciao! Vorrei informazioni sulla vacuum pressoterapia"
        }}
      />
    </ServicePageLayout>
  );
};

export default VacuumPage;