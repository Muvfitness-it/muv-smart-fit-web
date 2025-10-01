import React from 'react';
import { Helmet } from 'react-helmet';
import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { FlexibleHero } from '@/features/hero';
import { ServiceCTASection } from '@/components/layouts/ServiceCTASection';
import { ServiceFAQSection } from '@/components/layouts/ServiceFAQSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, Target, Shield, Users, Award } from 'lucide-react';

const EMSPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Allenamento EMS",
    "description": "Elettrostimolazione muscolare per dimagrimento e tonificazione a Legnago",
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
    "serviceType": "Fitness Training"
  };

  const benefits = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Risultati Rapidi",
      description: "Fino a 90% del tempo di allenamento in meno per gli stessi risultati"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "45 Minuti",
      description: "Sessioni brevi ma estremamente efficaci"
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Stimolazione Profonda",
      description: "Attiva fino al 98% delle fibre muscolari contemporaneamente"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Sicuro",
      description: "Basso impatto articolare, adatto a tutte le età"
    }
  ];

  const faqs = [
    {
      question: "Quanto dura una sessione di EMS?",
      answer: "Una sessione di allenamento EMS dura 45 minuti di stimolazione attiva, per un totale di 30-35 minuti includendo preparazione e defaticamento."
    },
    {
      question: "È sicuro l'allenamento EMS?",
      answer: "Sì, l'EMS è completamente sicuro quando eseguito da personale qualificato con macchinari certificati. Utilizziamo protocolli professionali e la supervisione è costante."
    },
    {
      question: "Chi può fare EMS?",
      answer: "L'EMS è adatto a persone dai 18 anni in su, sia principianti che atleti. Ci sono alcune controindicazioni che valutiamo durante la consulenza iniziale."
    },
    {
      question: "Quando vedrò i primi risultati?",
      answer: "I primi cambiamenti sono visibili già dopo 2-3 settimane, con miglioramenti significativi in termini di forza e tonicità muscolare."
    }
  ];

  return (
    <ServicePageLayout
      title="Allenamento EMS Legnago - Elettrostimolazione Muscolare | MUV Fitness"
      description="Scopri l'allenamento EMS a Legnago. Elettrostimolazione muscolare per dimagrimento rapido e tonificazione. Prenota la tua prova gratuita da MUV Fitness."
      keywords="EMS Legnago, elettrostimolazione muscolare, allenamento EMS, dimagrimento rapido Legnago, tonificazione EMS"
      canonical="https://www.muvfitness.it/servizi/ems"
      structuredData={structuredData}
    >
      <FlexibleHero
        variant="service"
        title="Allenamento EMS a Legnago"
        subtitle="Elettrostimolazione Muscolare per Risultati Straordinari"
        description="Dimagrisci e tonifica il tuo corpo in tempi record con la tecnologia EMS più avanzata. 45 minuti di allenamento equivalgono a 4 ore di palestra tradizionale."
        primaryCTA={{
          text: "Prenota Prova Gratuita EMS",
          href: "#prenota"
        }}
        breadcrumbs={[
          { text: "Home", href: "/" },
          { text: "Servizi", href: "/servizi" },
          { text: "EMS" }
        ]}
        backgroundImage="/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
      />

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Users className="h-4 w-4 mr-2" />
              Oltre 500 clienti soddisfatti
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Perché Scegliere l'EMS?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              L'elettrostimolazione muscolare rappresenta il futuro del fitness: massimi risultati nel minimo tempo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6">
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
              <h3 className="text-2xl font-bold mb-6">Come Funziona l'EMS?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">Consulenza Iniziale</h4>
                    <p className="text-muted-foreground">Valutiamo i tuoi obiettivi e il tuo stato di forma attuale</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">Tuta EMS Personalizzata</h4>
                    <p className="text-muted-foreground">Indossi una tuta speciale con elettrodi posizionati sui gruppi muscolari</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Allenamento Guidato</h4>
                    <p className="text-muted-foreground">Esercizi semplici amplificati dalla stimolazione elettrica</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-semibold mb-1">Risultati Misurabili</h4>
                    <p className="text-muted-foreground">Monitoriamo i progressi e adattiamo l'intensità</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8">
              <div className="text-center">
                <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-4">Risultati Garantiti</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Aumento Forza:</span>
                    <span className="font-bold">+30% in 4 settimane</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Riduzione Grasso:</span>
                    <span className="font-bold">-5% in 6 settimane</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tempo Allenamento:</span>
                    <span className="font-bold">Solo 45 minuti</span>
                  </div>
                </div>
                <Button className="mt-6 w-full" size="lg">
                  Prenota Valutazione Gratuita
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceFAQSection
        title="Domande Frequenti sull'EMS"
        faqs={faqs}
      />

      <ServiceCTASection
        title="Pronto a Trasformare il Tuo Corpo?"
        description="Prenota la tua prova gratuita di allenamento EMS e scopri cosa significa allenarsi con la tecnologia più avanzata."
        primaryButton={{
          text: "Prenota Prova Gratuita",
          href: "#prenota"
        }}
        secondaryButton={{
          text: "Chiama Ora",
          href: "tel:+393491234567"
        }}
      />
    </ServicePageLayout>
  );
};

export default EMSPage;