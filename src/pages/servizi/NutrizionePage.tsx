import React from 'react';
import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { FlexibleHero } from '@/features/hero';
import { ServiceCTASection } from '@/components/layouts/ServiceCTASection';
import { ServiceFAQSection } from '@/components/layouts/ServiceFAQSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Apple, Target, TrendingUp, Users, CheckCircle, Award, Heart } from 'lucide-react';

const NutrizionePage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Consulenza Nutrizionale",
    "description": "Consulenza nutrizionale personalizzata a Legnago per dimagrimento e benessere",
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
    "serviceType": "Nutrition Counseling"
  };

  const benefits = [
    {
      icon: <Apple className="h-8 w-8 text-primary" />,
      title: "Piani Personalizzati",
      description: "Alimentazione su misura per i tuoi obiettivi specifici"
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Obiettivi Concreti",
      description: "Focus su risultati misurabili e sostenibili nel tempo"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Monitoraggio",
      description: "Controlli periodici per ottimizzare i progressi"
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Benessere Globale",
      description: "Non solo peso, ma salute e energia generale"
    }
  ];

  const services = [
    {
      title: "Dimagrimento Sostenibile",
      description: "Piani alimentari equilibrati per perdere peso in modo sano e duraturo",
      benefits: ["Perdita di peso graduale", "Mantenimento massa muscolare", "Rieducazione alimentare"]
    },
    {
      title: "Nutrizione Sportiva",
      description: "Alimentazione ottimizzata per performance e recupero negli allenamenti",
      benefits: ["Maggiore energia", "Recupero accelerato", "Performance migliorate"]
    },
    {
      title: "Educazione Alimentare",
      description: "Impara a gestire autonomamente la tua alimentazione quotidiana",
      benefits: ["Consapevolezza alimentare", "Gestione delle porzioni", "Scelte salutari"]
    }
  ];

  const faqs = [
    {
      question: "Come si svolge la prima consulenza?",
      answer: "La prima visita dura circa 60 minuti. Analizziamo le tue abitudini alimentari, obiettivi, stile di vita e eventuali problematiche. Effettuiamo misurazioni antropometriche e definiamo insieme il piano personalizzato."
    },
    {
      question: "Quanto tempo serve per vedere risultati?",
      answer: "I primi cambiamenti sono visibili già nelle prime 2-3 settimane. Per risultati stabili e duraturi, consideriamo un percorso di almeno 3 mesi con controlli mensili."
    },
    {
      question: "Il piano alimentare è restrittivo?",
      answer: "Assolutamente no! Creiamo piani equilibrati e sostenibili che tengono conto dei tuoi gusti e del tuo stile di vita. L'obiettivo è creare abitudini durature, non privazioni."
    },
    {
      question: "Come si integra con l'allenamento?",
      answer: "La nutrizione è perfettamente integrata con i tuoi allenamenti da MUV. Coordiniamo alimentazione e training per massimizzare i risultati di entrambi."
    }
  ];

  return (
    <ServicePageLayout
      title="Nutrizionista Legnago - Consulenza Alimentare Personalizzata | MUV"
      description="Consulenza nutrizionale a Legnago. Piani alimentari personalizzati per dimagrimento e benessere. Nutrizionista qualificato presso MUV Fitness."
      keywords="nutrizionista Legnago, consulenza nutrizionale, dieta personalizzata, dimagrimento sano Legnago"
      canonical="https://www.muvfitness.it/servizi/nutrizione"
      structuredData={structuredData}
    >
      <FlexibleHero
        variant="service"
        title="Consulenza Nutrizionale a Legnago"
        subtitle="Il Tuo Percorso Verso un'Alimentazione Consapevole"
        description="Raggiungi i tuoi obiettivi con piani alimentari personalizzati. La nostra nutrizionista ti guida verso un rapporto sano e duraturo con il cibo."
        primaryCTA={{
          text: "Prenota Consulenza",
          href: "#prenota"
        }}
        breadcrumbs={[
          { text: "Home", href: "/" },
          { text: "Servizi", href: "/servizi" },
          { text: "Nutrizione" }
        ]}
        backgroundImage="/lovable-uploads/29b9c5b1-c958-454c-9d7f-5d1c1b4f38ff.png"
      />

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Award className="h-4 w-4 mr-2" />
              Nutrizionista Qualificata
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Approccio Personalizzato alla Nutrizione</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Non crediamo nelle diete standard. Ogni persona è unica e merita un piano alimentare studiato appositamente per lei.
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

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Il Tuo Percorso Nutrizionale</h2>
            <p className="text-lg text-muted-foreground">Come lavoriamo insieme per raggiungere i tuoi obiettivi</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">1</div>
              <h3 className="font-semibold mb-2">Anamnesi Completa</h3>
              <p className="text-sm text-muted-foreground">Analizziamo storia clinica, abitudini e obiettivi</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">2</div>
              <h3 className="font-semibold mb-2">Piano Personalizzato</h3>
              <p className="text-sm text-muted-foreground">Creiamo il tuo piano alimentare su misura</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">3</div>
              <h3 className="font-semibold mb-2">Monitoraggio</h3>
              <p className="text-sm text-muted-foreground">Controlli regolari per ottimizzare i risultati</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">4</div>
              <h3 className="font-semibold mb-2">Autonomia</h3>
              <p className="text-sm text-muted-foreground">Ti insegniamo a gestire l'alimentazione da solo</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Integrazione con l'Allenamento</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Da MUV Fitness, nutrizione e allenamento lavorano in sinergia per massimizzare i tuoi risultati.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Alimentazione pre e post allenamento ottimizzata</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Integrazione perfetta con EMS, Vacuum e Pilates</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Supporto nutrizionale per il recupero</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Comunicazione continua tra trainer e nutrizionista</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-6 text-center">Pacchetti Disponibili</h3>
              <div className="space-y-4">
                <Card className="p-4">
                  <div className="text-center">
                    <h4 className="font-semibold">Consulenza Singola</h4>
                    <p className="text-sm text-muted-foreground mb-2">Prima visita + piano personalizzato</p>
                    <Badge variant="outline">Ideale per iniziare</Badge>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <h4 className="font-semibold">Percorso 3 Mesi</h4>
                    <p className="text-sm text-muted-foreground mb-2">3 controlli + supporto continuo</p>
                    <Badge variant="secondary">Più richiesto</Badge>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <h4 className="font-semibold">Combo Fitness+Nutrizione</h4>
                    <p className="text-sm text-muted-foreground mb-2">Allenamento + alimentazione integrati</p>
                    <Badge className="bg-green-600 text-white">Massimi risultati</Badge>
                  </div>
                </Card>
              </div>
              <Button className="mt-6 w-full" size="lg">
                Scopri il Pacchetto Ideale
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceFAQSection
        title="Domande Frequenti sulla Consulenza Nutrizionale"
        faqs={faqs}
      />

      <ServiceCTASection
        title="Inizia il Tuo Percorso Nutrizionale"
        description="Prenota una consulenza e scopri come un'alimentazione personalizzata può trasformare il tuo benessere e i tuoi risultati."
        primaryButton={{
          text: "Prenota Consulenza",
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

export default NutrizionePage;