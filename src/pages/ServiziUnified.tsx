import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Target, Users, Zap, Heart, TrendingUp, CheckCircle, ArrowRight, Star, Timer, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// SEO
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';

const ServiziUnified = () => {
  const whatsappNumber = "3291070374";
  const whatsappMessage = "Ciao! Voglio prenotare la PROVA GRATUITA 💪";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // 3 SERVIZI PRINCIPALI - CHIARI E DIRETTI
  const services = [
    {
      id: 'dimagrimento',
      icon: <Target className="w-12 h-12 text-white" />,
      title: 'Dimagrimento Rapido',
      subtitle: 'Perdi peso e tonifica il corpo',
      description: 'Con EMS + Personal Training perdi grasso 4x più velocemente. Solo 20 minuti a sessione.',
      time: '20 min',
      frequency: '2-3 volte/sett',
      benefits: [
        'Bruci 600 calorie in 20 minuti',
        'Tonifichi tutto il corpo',
        'Risultati visibili in 2 settimane',
        'Personal trainer dedicato'
      ],
      color: 'from-red-500 to-orange-500',
      guarantee: 'Perdi 3-5 kg in 30 giorni o rimborso'
    },
    {
      id: 'postura',
      icon: <Heart className="w-12 h-12 text-white" />,
      title: 'Pilates Reformer',
      subtitle: 'Risolvi mal di schiena e postura',
      description: 'Correggi definitivamente postura e dolori con il Pilates Reformer più avanzato.',
      time: '50 min',
      frequency: '2 volte/sett',
      benefits: [
        'Elimina mal di schiena',
        'Corregge la postura',
        'Maggiore flessibilità',
        'Rinforzo muscolare profondo'
      ],
      color: 'from-green-500 to-teal-500',
      guarantee: 'Riduci dolori 80% in 4 settimane'
    },
    {
      id: 'estetico',
      icon: <TrendingUp className="w-12 h-12 text-white" />,
      title: 'Vacuum + Pressoterapia',
      subtitle: 'Elimina cellulite e ritenzione',
      description: 'Tecnologia medica avanzata per eliminare cellulite e rimodellare il corpo definitivamente.',
      time: '30 min',
      frequency: '2 volte/sett',
      benefits: [
        'Riduce cellulite del 70%',
        'Elimina ritenzione idrica',
        'Pelle più liscia e tonica',
        'Gambe sgonfie e leggere'
      ],
      color: 'from-purple-500 to-pink-500',
      guarantee: 'Cellulite -50% in 8 settimane'
    }
  ];

  return (
    <>
      <UnifiedSEOHead
        title="Servizi MUV Fitness Legnago | Dimagrimento, Pilates, Trattamenti Estetici"
        description="3 servizi per 3 obiettivi: Dimagrimento EMS+Personal Training, Pilates Reformer per postura, Vacuum+Pressoterapia per cellulite. Prima prova GRATUITA!"
        keywords="dimagrimento legnago, pilates reformer legnago, vacuum pressoterapia legnago, ems personal training, postura mal di schiena"
        canonicalUrl="https://www.muvfitness.it/servizi"
      />

      <div className="min-h-screen bg-background">
        {/* HERO SECTION - CHIARO E DIRETTO */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold text-sm">
                500+ Clienti Soddisfatti • Centro #1 a Legnago
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              3 Servizi per
              <span className="text-primary block">3 Obiettivi Precisi</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ogni servizio risolve un problema specifico.
              <br className="hidden sm:block" />
              <strong>Scegli il tuo obiettivo e inizia la trasformazione.</strong>
            </p>

            {/* URGENZA SOCIALE */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto mb-8">
              <div className="flex items-center gap-2 text-red-600 font-semibold mb-1">
                <Timer className="w-4 h-4" />
                OFFERTA LIMITATA
              </div>
              <p className="text-sm text-red-700">
                Prima prova GRATUITA • Solo per i primi 10 questo mese
              </p>
            </div>
          </div>
        </section>

        {/* SERVIZI - LAYOUT PULITO E COMPRENSIBILE */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {services.map((service, index) => (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="p-0">
                    {/* Header colorato */}
                    <div className={`bg-gradient-to-br ${service.color} p-6 text-white text-center`}>
                      <div className="mb-4">{service.icon}</div>
                      <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                      <p className="text-lg opacity-90">{service.subtitle}</p>
                    </div>

                    {/* Contenuto */}
                    <div className="p-6">
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Info rapide */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-muted/50 rounded-lg p-3 text-center">
                          <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                          <p className="text-sm text-muted-foreground">Durata</p>
                          <p className="font-bold text-foreground">{service.time}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3 text-center">
                          <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                          <p className="text-sm text-muted-foreground">Frequenza</p>
                          <p className="font-bold text-foreground">{service.frequency}</p>
                        </div>
                      </div>

                      {/* Benefici */}
                      <div className="mb-6">
                        <h3 className="font-semibold mb-3 text-foreground">Cosa ottieni:</h3>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Garanzia */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <Award className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-green-800">GARANZIA RISULTATI</span>
                        </div>
                        <p className="text-sm text-green-700">{service.guarantee}</p>
                      </div>

                      {/* CTA */}
                      <a 
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white">
                          Prova Gratis Questo Servizio
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* SOCIAL PROOF */}
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

        {/* CTA FINALE POTENTE */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Non Sai Quale Servizio Scegliere?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              <strong>Consulenza GRATUITA di 30 minuti:</strong><br />
              Analizziamo la tua situazione e ti consigliamo il percorso migliore.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full min-w-[250px]"
                >
                  💬 Prenota su WhatsApp
                </Button>
              </a>
              <span className="text-white/80 font-medium">oppure</span>
              <Link to="/contatti">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold rounded-full min-w-[250px]"
                >
                  📞 Compila il Form
                </Button>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-semibold mb-1">⚡ Risposta Rapida</p>
                  <p className="text-sm opacity-80">Entro 15 minuti</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">🎯 Consulenza Inclusa</p>
                  <p className="text-sm opacity-80">Completamente gratuita</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">💯 Zero Impegno</p>
                  <p className="text-sm opacity-80">Decidi dopo la prova</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiziUnified;