import React from 'react';
import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { MinimalHero } from '@/features/hero';
import { ServiceCTASection } from '@/components/layouts/ServiceCTASection';
import { ServiceFAQSection } from '@/components/layouts/ServiceFAQSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Target, Shield, Users, CheckCircle, Star, Award } from 'lucide-react';

const PilatesReformerPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Pilates Reformer",
    "description": "Corsi di Pilates Reformer a Legnago per postura, flessibilità e forza core",
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
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Correzione Posturale",
      description: "Riequilibra la colonna vertebrale e migliora l'allineamento"
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Forza Core",
      description: "Sviluppa la stabilità del centro del corpo"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Sicuro",
      description: "Controllo preciso del movimento, zero traumi"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Personalizzato",
      description: "Adattabile a ogni livello e necessità specifica"
    }
  ];

  const features = [
    "Migliora la postura e riduce il mal di schiena",
    "Aumenta flessibilità e mobilità articolare",
    "Rinforza il core e la stabilità",
    "Allunga e tonifica la muscolatura",
    "Migliora coordinazione e controllo motorio",
    "Riduce stress e tensioni muscolari"
  ];

  const faqs = [
    {
      question: "Cos'è il Pilates Reformer?",
      answer: "Il Reformer è un attrezzo specifico del Pilates che utilizza un sistema di molle e carrelli per fornire resistenza variabile, permettendo movimenti fluidi e controllati."
    },
    {
      question: "È adatto ai principianti?",
      answer: "Assolutamente sì! Il Reformer è perfetto per i principianti perché permette di graduare l'intensità e fornisce supporto durante gli esercizi."
    },
    {
      question: "Quanto dura una lezione?",
      answer: "Le nostre lezioni durano 50 minuti e sono sempre seguite da un istruttore qualificato in piccoli gruppi o individuali."
    },
    {
      question: "Aiuta davvero con il mal di schiena?",
      answer: "Sì, il Pilates Reformer è particolarmente efficace per chi soffre di mal di schiena, in quanto rafforza i muscoli stabilizzatori e migliora la postura."
    }
  ];

  return (
    <ServicePageLayout
      title="Pilates Reformer Legnago - Postura e Flessibilità | MUV Fitness"
      description="Corsi Pilates Reformer a Legnago per migliorare postura, flessibilità e forza core. Lezioni individuali e piccoli gruppi. Prova gratuita."
      keywords="Pilates Reformer Legnago, postura Legnago, mal di schiena, Pilates macchinari, core stability"
      canonical="https://www.muvfitness.it/servizi/pilates-reformer"
      structuredData={structuredData}
    >
      <MinimalHero
        title="Pilates Reformer a Legnago"
        subtitle="Rivoluziona la Tua Postura e il Tuo Benessere"
        description="Scopri il potere trasformativo del Pilates Reformer: postura perfetta, core forte e movimenti fluidi. Il metodo più efficace per il benessere della tua schiena."
        gradient="primary"
        primaryCTA={{
          text: "Prenota Lezione di Prova",
          href: "#prenota"
        }}
        breadcrumbs={[
          { text: "Home", href: "/" },
          { text: "Servizi", href: "/servizi" },
          { text: "Pilates Reformer" }
        ]}
      />

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Award className="h-4 w-4 mr-2" />
              Istruttori Certificati
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Perché Scegliere il Pilates Reformer?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Il Reformer rappresenta l'evoluzione del Pilates: precisione, controllo e risultati visibili fin dalle prime lezioni
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
              <h3 className="text-2xl font-bold mb-6">Come Ti Aiutiamo</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-primary/10 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Metodologia Unica
                </h4>
                <p className="text-sm text-muted-foreground">
                  Il nostro approccio combina la tradizione del Pilates classico con le più moderne conoscenze 
                  biomeccaniche per offrirti un'esperienza completa e personalizzata.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8">
              <h4 className="text-xl font-bold mb-6 text-center">Tipologie di Lezioni</h4>
              <div className="space-y-4">
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-semibold">Lezioni Individuali</h5>
                      <p className="text-sm text-muted-foreground">Massima personalizzazione</p>
                    </div>
                    <Badge variant="outline">1:1</Badge>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-semibold">Duetto</h5>
                      <p className="text-sm text-muted-foreground">Con un amico o partner</p>
                    </div>
                    <Badge variant="outline">1:2</Badge>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-semibold">Piccoli Gruppi</h5>
                      <p className="text-sm text-muted-foreground">Atmosfera motivante</p>
                    </div>
                    <Badge variant="outline">1:4</Badge>
                  </div>
                </Card>
              </div>
              <Button className="mt-6 w-full" size="lg">
                Scegli la Tua Lezione
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Il Tuo Percorso di Trasformazione</h2>
            <p className="text-lg text-muted-foreground">Come procediamo per garantirti i migliori risultati</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">1</div>
              <h3 className="font-semibold mb-2">Valutazione Posturale</h3>
              <p className="text-muted-foreground">Analizziamo la tua postura e identificiamo le aree di miglioramento</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">2</div>
              <h3 className="font-semibold mb-2">Programma Personalizzato</h3>
              <p className="text-muted-foreground">Creiamo un piano specifico per le tue esigenze e obiettivi</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">3</div>
              <h3 className="font-semibold mb-2">Monitoraggio Continuo</h3>
              <p className="text-muted-foreground">Seguiamo i tuoi progressi e adattiamo gli esercizi</p>
            </Card>
          </div>
        </div>
      </section>

      <ServiceFAQSection
        title="Domande Frequenti sul Pilates Reformer"
        faqs={faqs}
      />

      <ServiceCTASection
        title="Inizia il Tuo Percorso di Benessere"
        description="Prenota una lezione di prova e scopri come il Pilates Reformer può trasformare la tua postura e il tuo benessere generale."
        primaryButton={{
          text: "Prenota Lezione di Prova",
          href: "#prenota"
        }}
        secondaryButton={{
          text: "Scopri di Più",
          href: "tel:+393491234567"
        }}
      />
    </ServicePageLayout>
  );
};

export default PilatesReformerPage;