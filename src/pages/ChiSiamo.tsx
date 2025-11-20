import React from 'react';
import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { MinimalHero } from '@/features/hero';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Heart, Target, Users, Star } from 'lucide-react';
import { BUSINESS_DATA } from '@/config/businessData';

const ChiSiamoNew = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Chi Siamo - MUV Fitness Legnago",
    "description": "Scopri il team di MUV Fitness Legnago: professionisti qualificati specializzati in EMS, Vacuum, Pilates Reformer e nutrizione per il tuo benessere.",
    "mainEntity": {
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
      "telephone": BUSINESS_DATA.contact.phone
    }
  };


  const values = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Cura Personale",
      description: "Ogni cliente è unico e riceve un approccio completamente personalizzato"
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Risultati Concreti",
      description: "Ci impegniamo per raggiungere obiettivi misurabili e duraturi"
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Eccellenza",
      description: "Standard elevati in ogni servizio, dalla consulenza all'attrezzatura"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Ambiente Accogliente",
      description: "Spazio riservato e confortevole, lontano dal caos delle palestre tradizionali"
    }
  ];

  return (
    <ServicePageLayout
      title="Chi Siamo - MUV Fitness Legnago | Team e Metodo"
      description="Scopri il team qualificato di MUV Fitness Legnago: personal trainer, nutrizionista e massoterapista specializzati in EMS, Vacuum e Pilates Reformer."
      keywords="team MUV Fitness Legnago, personal trainer Legnago, nutrizionista Legnago, chi siamo palestra Legnago"
      canonical="https://www.muvfitness.it/chi-siamo"
      structuredData={structuredData}
    >
      <MinimalHero
        title="Chi Siamo"
        subtitle="Il Team MUV Fitness Legnago"
        description="Professionisti qualificati uniti dalla passione per il benessere. Scopri chi c'è dietro il Metodo MUV e la nostra filosofia centrata su tecnologia, personalizzazione e risultati."
        gradient="dual"
        primaryCTA={{
          text: "Scopri i Servizi",
          href: "/servizi"
        }}
        secondaryCTA={{
          text: "Prenota Consulenza",
          href: "#prenota"
        }}
        breadcrumbs={[
          { text: "Home", href: "/" },
          { text: "Chi Siamo" }
        ]}
      />

      {/* La Nostra Storia */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Star className="h-4 w-4 mr-2" />
              La Nostra Storia
            </Badge>
            <h2 className="text-3xl font-bold mb-6">Come è Nato MUV Fitness</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              MUV Fitness nasce nel 2019 dall'idea di rivoluzionare il concetto di palestra a Legnago. 
              Stanchi dell'approccio "taglia unica" del fitness tradizionale, abbiamo creato uno spazio 
              dove tecnologia avanzata e attenzione personale si incontrano per offrire risultati concreti 
              in tempi ridotti.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Oggi siamo il punto di riferimento per chi cerca un approccio scientifico al fitness, 
              con tecnologie come EMS, Vacuum Pressoterapia e Pilates Reformer, sempre supportate 
              da consulenza nutrizionale professionale.
            </p>
          </div>
        </div>
      </section>

      {/* I Nostri Valori */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">I Nostri Valori</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quattro pilastri che guidano ogni nostro servizio e interazione con i clienti
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Perché Scegliere MUV */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Perché Scegliere MUV Fitness</h2>
              <p className="text-lg text-muted-foreground">
                Non siamo una palestra tradizionale. Siamo il tuo partner per raggiungere obiettivi concreti.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold mb-2">Tecnologie All'Avanguardia</h3>
                    <p className="text-muted-foreground">EMS, Vacuum Pressoterapia e Pilates Reformer per risultati in tempi record</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold mb-2">Approccio Personalizzato</h3>
                    <p className="text-muted-foreground">Ogni programma è studiato su misura per te e i tuoi obiettivi specifici</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold mb-2">Team Qualificato</h3>
                    <p className="text-muted-foreground">Professionisti certificati con formazione continua e specializzazioni</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold mb-2">Ambiente Riservato</h3>
                    <p className="text-muted-foreground">Spazi dedicati, niente affollamento, massima privacy e comfort</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                  <div>
                    <h3 className="font-semibold mb-2">Risultati Misurabili</h3>
                    <p className="text-muted-foreground">Monitoraggio costante dei progressi con dati concreti e obiettivi</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">6</div>
                  <div>
                    <h3 className="font-semibold mb-2">Supporto Completo</h3>
                    <p className="text-muted-foreground">Non solo allenamento: nutrizione, benessere e motivazione costante</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default ChiSiamoNew;