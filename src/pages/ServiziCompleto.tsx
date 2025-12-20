import React from "react";
import { Link } from "react-router-dom";
import { Zap, Activity, Heart, Waves, Flame, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UnifiedSEOHead from "@/components/SEO/UnifiedSEOHead";
import { MinimalHero } from "@/features/hero";

const ServiziCompleto = () => {
  const servizi = [
    {
      id: "ems",
      icon: <Zap className="w-12 h-12 text-white" />,
      title: "EMS Training",
      subtitle: "Allenamento Elettrostimolazione",
      description:
        "Tecnologia EMS che amplifica l'efficacia dell'allenamento. Bruci 600 calorie in 45 minuti equivalenti a 4 ore di palestra tradizionale.",
      benefits: [
        "Dimagrimento rapido e tonificazione",
        "90% muscoli attivati simultaneamente",
        "Solo 45 minuti a sessione",
        "Risultati visibili in 2 settimane",
      ],
      link: "/servizi/ems-legnago",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "pilates",
      icon: <Activity className="w-12 h-12 text-white" />,
      title: "Pilates Reformer",
      subtitle: "Postura e Flessibilità",
      description:
        "Il Pilates Reformer più avanzato d'Italia. Sistema di resistenza variabile per oltre 250 esercizi mirati su postura, core e mobilità.",
      benefits: [
        "Corregge problemi posturali",
        "Elimina mal di schiena cronico",
        "Aumenta flessibilità e mobilità",
        "Rinforza il core profondamente",
      ],
      link: "/servizi/pilates-reformer-legnago",
      color: "from-green-500 to-teal-500",
    },
    {
      id: "pancafit",
      icon: <Heart className="w-12 h-12 text-white" />,
      title: "Pancafit® & Postura",
      subtitle: "Rieducazione Posturale Globale",
      description:
        "Metodo brevettato per allungamento muscolare decompensato. Risolve dolori cronici, squilibri posturali e tensioni profonde.",
      benefits: [
        "Elimina dolori cronici definitivamente",
        "Riequilibra catene muscolari",
        "Migliora postura globalmente",
        "Previene infortuni futuri",
      ],
      link: "/servizi/pancafit-legnago",
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: "vacuum",
      icon: <Waves className="w-12 h-12 text-white" />,
      title: "Vacuum & Pressoterapia",
      subtitle: "Tecnologia Anti-Cellulite",
      description:
        "Sistema medico certificato a pressione negativa. Elimina cellulite, ritenzione idrica e rimodella gambe e glutei con risultati clinicamente testati.",
      benefits: [
        "Riduce cellulite fino al 70%",
        "Elimina ritenzione idrica",
        "Gambe sgonfie immediatamente",
        "Pelle più liscia e tonica",
      ],
      link: "/servizi/vacuum-pressoterapia-legnago",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "sauna",
      icon: <Flame className="w-12 h-12 text-white" />,
      title: "Sauna a Infrarossi",
      subtitle: "Detox e Recupero Profondo",
      description:
        "Tecnologia a raggi infrarossi penetranti. Detossifica il corpo in profondità, brucia calorie senza sforzo e accelera il recupero muscolare.",
      benefits: [
        "Elimina tossine profondamente",
        "Brucia fino a 600 calorie/sessione",
        "Migliora qualità della pelle",
        "Riduce stress e tensioni muscolari",
      ],
      link: "/servizi/sauna-infrarossi-legnago",
      color: "from-red-500 to-orange-500",
    },
    {
      id: "over60",
      icon: <Users className="w-12 h-12 text-white" />,
      title: "Programma Over 60",
      subtitle: "Fitness Sicuro ed Efficace",
      description:
        "Programma specializzato per Over 60. Allenamento sicuro, personalizzato e scientificamente validato per mantenere forza, equilibrio e autonomia.",
      benefits: [
        "Previene cadute e infortuni",
        "Mantiene massa muscolare",
        "Migliora equilibrio e coordinazione",
        "Aumenta energia e vitalità",
      ],
      link: "/servizi/over-60-legnago",
      color: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <>
      <UnifiedSEOHead
        title="Servizi MUV Fitness Legnago | EMS, Pilates, Vacuum, Sauna, Over 60"
        description="6 servizi specializzati per ogni obiettivo: EMS Training, Pilates Reformer, Pancafit, Vacuum Pressoterapia, Sauna Infrarossi e programma Over 60. Prova gratuita disponibile."
        keywords="servizi fitness legnago, ems legnago, pilates reformer, vacuum pressoterapia, sauna infrarossi, over 60 fitness"
        canonicalUrl="https://www.muvfitness.it/servizi"
      />

      <MinimalHero
        title="I Nostri Servizi"
        description="6 soluzioni specializzate per ogni obiettivo. Tecnologia avanzata, metodi scientifici e supporto personalizzato per risultati garantiti."
        gradient="dual"
        primaryCTA={{
          text: "Prenota una Prova Gratuita",
          href: "/form-contatti",
        }}
        breadcrumbs={[{ text: "Home", href: "/" }, { text: "Servizi" }]}
      />

      <div className="min-h-screen bg-background">
        {/* Grid Servizi */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {servizi.map((servizio) => (
                <Card
                  key={servizio.id}
                  className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30"
                >
                  <CardContent className="p-0">
                    {/* Header */}
                    <div className={`bg-gradient-to-br ${servizio.color} p-6 text-white text-center`}>
                      <div className="mb-4">{servizio.icon}</div>
                      <h2 className="text-2xl font-bold mb-2">{servizio.title}</h2>
                      <p className="text-lg opacity-90">{servizio.subtitle}</p>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-muted-foreground mb-6 leading-relaxed">{servizio.description}</p>

                      {/* Benefici */}
                      <div className="mb-6">
                        <h3 className="font-semibold mb-3 text-foreground">Benefici principali:</h3>
                        <ul className="space-y-2">
                          {servizio.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1">✓</span>
                              <span className="text-sm text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <Link to={servizio.link} className="block w-full">
                        <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white">
                          Scopri di più
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Proof */}
            <div className="text-center mb-16">
              <div className="bg-muted/30 rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">500+</div>
                    <p className="text-muted-foreground">Clienti Trasformati</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">95%</div>
                    <p className="text-muted-foreground">Soddisfazione</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">4.9/5</div>
                    <p className="text-muted-foreground">Recensioni Google</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Finale */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Non Sai Quale Servizio Scegliere?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Prenota una <strong>consulenza gratuita</strong>: analizziamo la tua situazione e ti consigliamo il
              percorso migliore.
            </p>
            <Link to="/form-contatti">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
              >
                Prenota Ora la Tua Consulenza Gratuita
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiziCompleto;
