import { useEffect } from 'react';
import { Star, Award, TrendingUp, Users, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Card, CardContent } from '@/components/ui/card';

const Recensioni = () => {
  const { trackSiteVisit } = useAnalytics();

  useEffect(() => {
    trackSiteVisit('/recensioni');
  }, [trackSiteVisit]);

  const handleReputationClick = (source: string) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'reputation',
        event_label: source,
        value: 1,
      });
    }
    
    // WhatsApp URL con messaggio predefinito
    const whatsappMessage = encodeURIComponent(
      "Ciao! Ho visto le recensioni di MUV Fitness e vorrei maggiori informazioni sui vostri servizi."
    );
    const whatsappURL = `https://wa.me/393451370149?text=${whatsappMessage}`;
    window.open(whatsappURL, '_blank');
  };

  const stats = [
    { number: '150+', label: 'Clienti Soddisfatti' },
    { number: '4.9/5', label: 'Rating Medio' },
    { number: '98%', label: 'Tasso di Successo' },
    { number: '5 Anni', label: 'Di Esperienza' }
  ];

  const testimonials = [
    {
      name: "Sara M.",
      rating: 5,
      text: "Esperienza incredibile! Ho perso 15kg in 6 mesi con il loro supporto. Il team è professionale e sempre disponibile.",
      service: "Dimagrimento e Ricomposizione Corporea"
    },
    {
      name: "Marco R.",
      rating: 5,
      text: "Il Personal Training con EMS ha rivoluzionato il mio allenamento. Risultati visibili già dalla terza settimana!",
      service: "Personal Training EMS"
    },
    {
      name: "Giulia L.",
      rating: 5,
      text: "Pilates Reformer fantastico! Addio mal di schiena e postura migliorata notevolmente. Consigliatissimo!",
      service: "Pilates Reformer"
    },
    {
      name: "Andrea S.",
      rating: 5,
      text: "Small Group perfetto per chi come me preferisce allenarsi in compagnia. Ambiente motivante e risultati garantiti.",
      service: "Small Group Training"
    },
    {
      name: "Elena C.",
      rating: 5,
      text: "La consulenza nutrizionale ha cambiato il mio rapporto con il cibo. Finalmente ho trovato l'equilibrio giusto!",
      service: "Consulenza Nutrizionale"
    },
    {
      name: "Francesco T.",
      rating: 5,
      text: "HIIT training intenso ma efficace. Ho migliorato resistenza e forza in tempi record. Staff competentissimo!",
      service: "HIIT Training"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "Centro Fitness dell'Anno",
      description: "Riconoscimento per l'eccellenza nei servizi 2023"
    },
    {
      icon: Users,
      title: "150+ Trasformazioni",
      description: "Clienti che hanno raggiunto i loro obiettivi"
    },
    {
      icon: TrendingUp,
      title: "98% Tasso di Successo",
      description: "Nei percorsi di dimagrimento e ricomposizione"
    }
  ];

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-primary py-16 sm:py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4">
            <div className="text-center text-white max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Recensioni e <span className="text-brand-primary">Testimonianze</span>
              </h1>
              <p className="text-xl sm:text-2xl mb-8 opacity-90">
                Scopri cosa dicono i nostri clienti delle loro trasformazioni
              </p>
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-brand-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm sm:text-base opacity-90">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">I Nostri Riconoscimenti</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <achievement.icon className="w-12 h-12 text-brand-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{achievement.title}</h3>
                    <p className="text-muted-foreground">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Cosa Dicono i Nostri Clienti</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-0">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 font-semibold">{testimonial.rating}/5</span>
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-brand-primary">{testimonial.service}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Perché Scegliere MUV Fitness</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Esperienza Certificata</h3>
                <p className="text-muted-foreground">Trainer certificati con anni di esperienza nel settore fitness</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Risultati Garantiti</h3>
                <p className="text-muted-foreground">Metodologie scientifiche per risultati concreti e duraturi</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Supporto Continuo</h3>
                <p className="text-muted-foreground">Assistenza personalizzata in ogni fase del tuo percorso</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Pronto a Iniziare la Tua Trasformazione?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Unisciti ai nostri clienti soddisfatti e inizia il tuo percorso verso il benessere
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="min-h-[44px] px-8 bg-green-600 hover:bg-green-700 text-white font-semibold"
                onClick={() => handleReputationClick('whatsapp-cta')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Scrivici su WhatsApp
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="min-h-[44px] px-8 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                asChild
              >
                <a href="/contatti/">
                  <Phone className="w-5 h-5 mr-2" />
                  Prenota Consulenza
                </a>
              </Button>
                </div>
              </div>
            </section>
      </main>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 z-40 sm:hidden">
        <div className="flex gap-2">
          <Button 
            size="sm"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold min-h-[44px]"
            onClick={() => handleReputationClick('whatsapp-mobile')}
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            WhatsApp
          </Button>
          <Button 
            size="sm"
            variant="outline"
            className="flex-1 min-h-[44px] border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
            asChild
          >
            <a href="/contatti/">
              <Phone className="w-4 h-4 mr-1" />
              Consulenza
            </a>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Recensioni;