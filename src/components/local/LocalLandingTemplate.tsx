import { Link } from "react-router-dom";
import { MapPin, Clock, Phone, Mail, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { BUSINESS_DATA } from "@/config/businessData";

interface LocalLandingTemplateProps {
  cityName: string;
  citySlug: string;
  distance: string;
  travelTime: string;
  mainKeyword: string;
  heroImage?: string;
  localTestimonials?: Array<{
    name: string;
    city: string;
    rating: number;
    text: string;
    service: string;
  }>;
  localFAQs?: Array<{
    question: string;
    answer: string;
  }>;
}

const LocalLandingTemplate = ({
  cityName,
  citySlug,
  distance,
  travelTime,
  mainKeyword,
  heroImage = "/lovable-uploads/francesco-muv.jpg",
  localTestimonials = [],
  localFAQs = []
}: LocalLandingTemplateProps) => {
  
  const pageTitle = `${mainKeyword} a ${cityName} | MUV Fitness Legnago`;
  const metaDescription = `Cerchi ${mainKeyword} a ${cityName}? MUV Fitness a Legnago è a soli ${travelTime} da te. Personal training, EMS, Pilates Reformer e molto altro. Prenota la tua prova gratuita!`;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src={heroImage}
            alt={`${mainKeyword} ${cityName}`}
            width={1920}
            height={800}
            priority
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {mainKeyword} a {cityName}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Il tuo centro fitness di riferimento a Legnago, <strong>a soli {travelTime} da {cityName}</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-accent">
              <Link to="/contatti">Prenota Prova Gratuita</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary">
              <Link to="/servizi">Scopri i Servizi</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Distanza e Come Raggiungerci */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Facile da Raggiungere da {cityName}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Distanza</h3>
                  <p className="text-muted-foreground">{distance} da {cityName}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Tempo di Viaggio</h3>
                  <p className="text-muted-foreground">{travelTime} in auto</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Parcheggio</h3>
                  <p className="text-muted-foreground">Gratuito e disponibile</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/come-arrivare">
                  Vedi Indicazioni Stradali <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Perché Scegliere MUV */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Perché i Clienti da {cityName} Scelgono MUV
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Tecnologie Avanzate",
                description: "EMS Training, Pilates Reformer, Pancafit e Sauna Infrarossi per risultati rapidi e duraturi",
                icon: "⚡"
              },
              {
                title: "Team Qualificato",
                description: "Personal trainer certificati, nutrizionisti e professionisti del benessere sempre al tuo fianco",
                icon: "👥"
              },
              {
                title: "Ambiente Esclusivo",
                description: "Piccoli gruppi e sessioni personalizzate in un ambiente riservato e motivante",
                icon: "🏆"
              },
              {
                title: "Risultati Misurabili",
                description: "Metodo testato su centinaia di clienti con progressi tracciabili nel tempo",
                icon: "📈"
              },
              {
                title: "Flessibilità Oraria",
                description: "Aperto 6 giorni su 7 con orari flessibili per adattarsi ai tuoi impegni",
                icon: "🕐"
              },
              {
                title: "Vicino a Te",
                description: `A soli ${travelTime} da ${cityName}, con parcheggio gratuito disponibile`,
                icon: "🚗"
              }
            ].map((item, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonianze Locali */}
      {localTestimonials.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Cosa Dicono i Clienti da {cityName}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {localTestimonials.map((testimonial, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.city} • {testimonial.service}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Servizi Principali */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            I Nostri Servizi per {cityName}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {BUSINESS_DATA.services.map((service, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="pt-6 text-center">
                  <h3 className="text-lg font-semibold mb-3">{service.shortName}</h3>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/servizi">Scopri di più</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Locali */}
      {localFAQs.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Domande Frequenti da {cityName}
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {localFAQs.map((faq, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Finale */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pronto a Iniziare il Tuo Percorso?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Prenota la tua prova gratuita e scopri come MUV Fitness può trasformare il tuo corpo e la tua vita
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
              <Link to="/contatti">Prenota Ora</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <a href={`tel:${BUSINESS_DATA.contact.phone}`}>
                <Phone className="mr-2 w-4 h-4" />
                Chiamaci
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{BUSINESS_DATA.address.fullAddress}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{BUSINESS_DATA.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{BUSINESS_DATA.contact.email}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocalLandingTemplate;
