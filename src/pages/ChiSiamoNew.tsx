import React from 'react';
import { ServicePageLayout } from '@/components/layouts/ServicePageLayout';
import { ServiceHeroSection } from '@/components/layouts/ServiceHeroSection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Heart, Target, Users, Star } from 'lucide-react';

const ChiSiamoNew = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Chi Siamo - MUV Fitness Legnago",
    "description": "Scopri il team di MUV Fitness Legnago: professionisti qualificati specializzati in EMS, Vacuum, Pilates Reformer e nutrizione per il tuo benessere.",
    "mainEntity": {
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
    }
  };

  const teamMembers = [
    {
      name: "Sara Bianchi",
      role: "Founder & Personal Trainer",
      specialization: "EMS, Pilates Reformer",
      certifications: ["Certificazione EMS MIHA", "Pilates Reformer Level 2", "Personal Trainer CONI"],
      description: "Con oltre 8 anni di esperienza nel fitness, Sara è la mente dietro il Metodo MUV. Specializzata in tecnologie innovative per il fitness.",
      image: "/lovable-uploads/47d51820-31e5-44e1-9369-96eb744f9ad7.png"
    },
    {
      name: "Dr.ssa Maria Rossi",
      role: "Nutrizionista",
      specialization: "Nutrizione Clinica, Piani Alimentari",
      certifications: ["Laurea in Scienze della Nutrizione", "Iscrizione Albo Biologi", "Master in Nutrizione Sportiva"],
      description: "Nutrizionista qualificata con approccio scientifico e personalizzato. Esperta in alimentazione per il fitness e il benessere.",
      image: "/lovable-uploads/6a6b9274-a4a0-48ab-a512-74641f84240f.png"
    },
    {
      name: "Marco Verdi",
      role: "Massoterapista",
      specialization: "Vacuum Pressoterapia, Massaggio Sportivo",
      certifications: ["Diploma in Massoterapia", "Certificazione Vacuum Therapy", "Drenaggio Linfatico"],
      description: "Specialista in tecniche manuali e trattamenti benessere. Esperto in vacuum pressoterapia e recupero muscolare.",
      image: "/lovable-uploads/80ae4a77-9aab-42ac-90cc-32152298a358.png"
    }
  ];

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
      <ServiceHeroSection
        title="Chi Siamo"
        subtitle="Il Team MUV Fitness Legnago"
        description="Professionisti qualificati uniti dalla passione per il benessere. Scopri chi c'è dietro il Metodo MUV e la nostra filosofia centrata su tecnologia, personalizzazione e risultati."
        primaryButton={{
          text: "Conosci il Team",
          href: "#team"
        }}
        secondaryButton={{
          text: "Prenota Consulenza",
          href: "#prenota"
        }}
        breadcrumbs={[
          { text: "Home", href: "/" },
          { text: "Chi Siamo" }
        ]}
        backgroundImage="/lovable-uploads/bfb1580b-26fc-405c-9bf1-79d3a21fc285.png"
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

      {/* Il Nostro Team */}
      <section id="team" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Il Nostro Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professionisti qualificati con certificazioni specifiche e anni di esperienza nel settore
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.role} at MUV Fitness Legnago`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.specialization}</p>
                  <p className="text-sm mb-4">{member.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Certificazioni:</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.certifications.map((cert, certIndex) => (
                        <Badge key={certIndex} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
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