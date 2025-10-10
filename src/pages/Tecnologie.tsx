import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Activity, Waves, Target, Heart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';
import { MinimalHero } from '@/features/hero';

const Tecnologie = () => {
  const tecnologie = [
    {
      id: 'ems',
      icon: <Zap className="w-16 h-16" />,
      name: 'EMS Training',
      subtitle: 'Elettrostimolazione Muscolare',
      description: 'Tecnologia che stimola i muscoli con impulsi elettrici, amplificando l\'efficacia dell\'allenamento fino a 18 volte rispetto al training tradizionale.',
      benefits: [
        'Brucia fino a 600 calorie in 20 minuti',
        'Tonifica tutto il corpo simultaneamente',
        'Riduce i tempi di allenamento del 70%',
        'Ideale per dimagrimento rapido'
      ],
      link: '/servizi/ems-legnago',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'vacuum',
      icon: <Waves className="w-16 h-16" />,
      name: 'Vacuum Therapy',
      subtitle: 'Tecnologia Medica Anti-Cellulite',
      description: 'Sistema a pressione negativa che stimola il microcircolo, elimina tossine e rimodella i tessuti adiposi con risultati clinicamente testati.',
      benefits: [
        'Riduce cellulite fino al 70%',
        'Elimina ritenzione idrica',
        'Rimodella gambe e glutei',
        'Pelle più liscia e compatta'
      ],
      link: '/servizi/vacuum-pressoterapia-legnago',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'pressoterapia',
      icon: <Heart className="w-16 h-16" />,
      name: 'Pressoterapia',
      subtitle: 'Drenaggio Linfatico Avanzato',
      description: 'Massaggio meccanico sequenziale che favorisce il drenaggio linfatico, riduce gonfiore e migliora la circolazione venosa.',
      benefits: [
        'Sgonfia gambe pesanti immediatamente',
        'Migliora circolazione sanguigna',
        'Accelera recupero muscolare',
        'Effetto detox profondo'
      ],
      link: '/servizi/vacuum-pressoterapia-legnago',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'sauna-infrarossi',
      icon: <TrendingUp className="w-16 h-16" />,
      name: 'Sauna a Infrarossi',
      subtitle: 'Termoterapia di Ultima Generazione',
      description: 'Raggi infrarossi penetranti che riscaldano il corpo dall\'interno, favorendo detox profondo e recupero muscolare ottimale.',
      benefits: [
        'Elimina tossine in profondità',
        'Brucia calorie senza sforzo',
        'Migliora qualità della pelle',
        'Riduce stress e tensioni'
      ],
      link: '/servizi/sauna-infrarossi-legnago',
      color: 'from-red-500 to-orange-500'
    }
  ];

  return (
    <>
      <UnifiedSEOHead
        title="Tecnologie MUV Fitness Legnago | EMS, Vacuum Therapy, Pressoterapia, Sauna"
        description="Scopri le 4 tecnologie avanzate di MUV Fitness Legnago: EMS Training, Vacuum Therapy, Pressoterapia e Sauna a Infrarossi per risultati garantiti."
        keywords="ems training legnago, vacuum therapy, pressoterapia legnago, sauna infrarossi, tecnologie fitness avanzate"
        canonicalUrl="https://www.muvfitness.it/tecnologie"
      />

      <MinimalHero
        title="Le Nostre Tecnologie"
        description="4 tecnologie avanzate per risultati misurabili e garantiti. Ogni strumento è scelto per massimizzare efficacia e sicurezza."
        gradient="accent"
        primaryCTA={{
          text: "Prenota una Prova Gratuita",
          href: "/form-contatti"
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Grid Tecnologie */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tecnologie.map((tech) => (
                <Card key={tech.id} className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30">
                  <CardContent className="p-0">
                    {/* Header */}
                    <div className={`bg-gradient-to-br ${tech.color} p-8 text-white text-center`}>
                      <div className="mb-4 flex justify-center">{tech.icon}</div>
                      <h2 className="text-2xl font-bold mb-2">{tech.name}</h2>
                      <p className="text-lg opacity-90">{tech.subtitle}</p>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {tech.description}
                      </p>

                      {/* Benefici */}
                      <div className="mb-6">
                        <h3 className="font-semibold mb-3 text-foreground">Benefici principali:</h3>
                        <ul className="space-y-2">
                          {tech.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1">✓</span>
                              <span className="text-sm text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <Link to={tech.link} className="block w-full">
                        <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white">
                          Scopri di più
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Vuoi Provare le Nostre Tecnologie?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Prenota una <strong>prova gratuita</strong> e scopri quale tecnologia è più adatta ai tuoi obiettivi.
            </p>
            <Link to="/form-contatti">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
              >
                Prenota Ora la Tua Prova Gratuita
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Tecnologie;
