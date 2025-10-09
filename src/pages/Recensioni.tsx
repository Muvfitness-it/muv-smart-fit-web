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
      name: "Elena V.",
      rating: 5,
      text: "Centro all'avanguardia con personale qualificato. Il Pilates Reformer ha migliorato la mia postura e il mio benessere generale.",
      service: "Pilates Reformer"
    },
    {
      name: "Luca B.",
      rating: 5,
      text: "Approccio scientifico e personalizzato. Sono riuscito ad aumentare la massa muscolare mantenendo un fisico asciutto.",
      service: "Personal Training e Nutrizione"
    },
    {
      name: "Giulia S.",
      rating: 5,
      text: "Finalmente ho risolto i miei problemi di mal di schiena grazie al Pancafit. Consigliatissimo!",
      service: "Pancafit e Posturale"
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
      description: "Risultati concreti e misurabili"
    }
  ];

  return (
    <>
      <main className="min-h-screen bg-gray-900">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900 py-16 sm:py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4">
            <div className="text-center text-white max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Recensioni e <span className="text-orange-500">Testimonianze</span>
              </h1>
              <p className="text-xl sm:text-2xl mb-8 opacity-90">
                Scopri cosa dicono i nostri clienti delle loro trasformazioni
              </p>
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-orange-500 mb-2">
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
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
              I Nostri <span className="text-orange-500">Riconoscimenti</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <Card key={index} className="bg-gray-700 border-gray-600 text-center">
                  <CardContent className="p-6">
                    <achievement.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                    <p className="text-gray-300">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
              Cosa Dicono i Nostri <span className="text-orange-500">Clienti</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-400">{testimonial.rating}/5</span>
                    </div>
                    <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                    <div className="border-t border-gray-700 pt-4">
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-orange-500">{testimonial.service}</p>
                    </div>
                  </CardContent>
                </Card>  
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Vuoi Essere il Prossimo Caso di Successo?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Unisciti ai nostri clienti soddisfatti e inizia la tua trasformazione oggi stesso
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button 
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold min-h-[44px]"
                onClick={() => handleReputationClick('whatsapp-cta')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contattaci su WhatsApp
              </Button>
            </div>
          </div>
        </section>

        {/* How to Leave Review Section */}
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Come Lasciare una <span className="text-orange-500">Recensione</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Cerca MUV Fitness</h3>
                <p className="text-gray-300">Su Google Maps o Facebook</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Clicca su Recensioni</h3>
                <p className="text-gray-300">E seleziona il numero di stelle</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Scrivi la Tua Esperienza</h3>
                <p className="text-gray-300">Condividi i tuoi risultati</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 p-4 z-40 sm:hidden">
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
              className="flex-1 min-h-[44px] border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
              asChild
            >
              <a href="/contatti/">
                <Phone className="w-4 h-4 mr-1" />
                Consulenza
              </a>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Recensioni;