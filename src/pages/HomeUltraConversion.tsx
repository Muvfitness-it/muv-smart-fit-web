import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Target, Shield, ArrowRight, Phone, MessageSquare, Clock, Star, MapPin, Users, CheckCircle, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';
import SafeResourceOptimizer from '@/components/optimization/SafeResourceOptimizer';
import { getLocalBusinessSchema, getOrganizationSchema, getWebSiteSchema, getFAQSchema } from '@/utils/seoSchemas';
import LeadMagnet from '@/components/leadmagnet/LeadMagnet';
import EnhancedContactForm from '@/components/forms/EnhancedContactForm';

const HomeUltraConversion = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      import('@/hooks/useLeadTracking').then(({ default: useLeadTracking }) => {
        useLeadTracking();
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // FAQ data for structured data
  const faqs = [
    {
      question: "Quanto dura una sessione di allenamento?",
      answer: "Le sessioni EMS durano 20 minuti, Pilates Reformer 50 minuti, Vacuum+Pressoterapia 30 minuti. Ogni programma è studiato per massimizzare i risultati nel minor tempo possibile."
    },
    {
      question: "Quando vedrò i primi risultati?",
      answer: "Con il Metodo MUV i primi risultati sono visibili già dopo 2 settimane. Il programma completo garantisce una trasformazione significativa in 30 giorni."
    },
    {
      question: "È adatto ai principianti?",
      answer: "Assolutamente sì. Ogni programma è personalizzato in base al tuo livello di partenza. Il personal trainer ti seguirà in ogni movimento per garantire sicurezza ed efficacia."
    },
    {
      question: "Che abbigliamento serve?",
      answer: "Per EMS forniamo noi la tuta speciale. Per Pilates Reformer abbigliamento comodo e sportivo. Per Vacuum+Pressoterapia intimo e accappatoio fornito dal centro."
    },
    {
      question: "Ci sono controindicazioni?",
      answer: "EMS non è adatto a chi ha pacemaker o è in gravidanza. Pilates e Vacuum non hanno particolari controindicazioni. Durante la consulenza gratuita valutiamo insieme la soluzione migliore per te."
    },
    {
      question: "Quanto costano i programmi?",
      answer: "I costi variano in base al programma scelto e agli obiettivi. Durante la consulenza gratuita ti presentiamo le opzioni più adatte al tuo budget. Offriamo anche piani di pagamento personalizzati."
    }
  ];

  const structuredData = [
    getLocalBusinessSchema(),
    getOrganizationSchema(), 
    getWebSiteSchema(),
    getFAQSchema(faqs)
  ];

  const whatsappNumber = "393291070374";
  const whatsappMessage = "Ciao! Vorrei prenotare la PROVA GRATUITA e sapere di più sui vostri servizi 💪";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <SafeResourceOptimizer />
      
      <UnifiedSEOHead
        title="Dimagrisci con la tecnologia più avanzata a Legnago | MUV Fitness"
        description="Allenamenti personalizzati, ambiente riservato e risultati rapidi con Metodo MUV: Vacuum, EMS, Pilates Reformer. PROVA GRATUITA - Prenota oggi!"
        keywords="dimagrire legnago, pilates reformer legnago, ems legnago, vacuum pressoterapia legnago, personal trainer legnago, mal di schiena legnago"
        canonicalUrl="https://www.muvfitness.it/"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-background text-foreground">
        {/* 1. HERO SECTION - SECONDO SPECIFICA */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
          {/* Background image layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 animate-slow-zoom"
            style={{ backgroundImage: "url('/images/fitness-professional-bg.jpg')", filter: 'brightness(0.9)' }}
            aria-hidden="true"
          />
          {/* Optional video layer (loads if available) */}
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/videos/fitness-hero-bg.mp4" type="video/mp4" />
            <source src="/videos/fitness-hero-bg.webm" type="video/webm" />
          </video>
          {/* Milky white overlay with 3D border gradient */}
          <div className="absolute inset-0 bg-white/70" aria-hidden="true"></div>
          {/* 3D gradient border effects */}
          <div className="absolute inset-0" aria-hidden="true">
            {/* Top gradient border */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-purple-500/30 via-pink-400/20 to-transparent"></div>
            {/* Bottom gradient border */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-purple-500/30 via-pink-400/20 to-transparent"></div>
            {/* Left gradient border */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-purple-500/30 via-pink-400/20 to-transparent"></div>
            {/* Right gradient border */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-purple-500/30 via-pink-400/20 to-transparent"></div>
            {/* Corner highlights for 3D effect */}
            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/40 to-transparent rounded-br-full"></div>
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/40 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/40 to-transparent rounded-tr-full"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/40 to-transparent rounded-tl-full"></div>
            {/* Inner shadow for depth */}
            <div className="absolute inset-4 shadow-inner shadow-purple-500/20 pointer-events-none"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            {/* Trust Indicators */}
            <div className="mb-6 flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2">
                <Star className="w-4 h-4 text-primary fill-current" />
                <span className="text-foreground font-medium">★★★★★ La miglior Palestra di Legnago</span>
              </span>
            </div>

            {/* Headline Principale */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight text-foreground">
              Dimagrisci con la tecnologia<br />
              <span className="text-primary">più avanzata a Legnago</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              Allenamenti personalizzati, ambiente riservato e risultati rapidi con <strong className="text-primary">Metodo MUV: Vacuum, EMS, Pilates Reformer.</strong>
            </p>

            {/* CTA Primaria */}
            <div className="mb-8">
              <a 
                href={`#prenota`}
                className="inline-block no-underline"
              >
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 md:px-12 py-4 md:py-6 text-xl md:text-2xl font-black rounded-full shadow-lg hover:scale-105 transition-all duration-300 mb-4"
                >
                  Prenota la tua Prova Gratuita
                </Button>
              </a>
              <p className="text-sm text-muted-foreground">
                Zero obblighi. Ti richiamiamo noi in giornata.
              </p>
            </div>

            {/* Elementi Fiducia */}
            <div className="bg-card border border-border rounded-xl p-4 max-w-md mx-auto">
              <p className="text-primary font-bold">⏰ Posti limitati per la Prova Gratuita</p>
              <p className="text-sm text-muted-foreground">Prenota oggi</p>
            </div>
          </div>
        </section>

        {/* 2. BENEFICI CHIAVE - SECONDO SPECIFICA */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Fino a -5 kg in 30 giorni</h3>
                <p className="text-muted-foreground text-sm">Con protocolli mirati e personalizzati</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Postura e mal di schiena</h3>
                <p className="text-muted-foreground text-sm">Ritrova mobilità e benessere</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Personal trainer dedicato</h3>
                <p className="text-muted-foreground text-sm">Zero affollamento, massima attenzione</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Tecnologie avanzate</h3>
                <p className="text-muted-foreground text-sm">Vacuum + EMS + Pilates Reformer</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SERVIZI - CARD CLICCABILI */}
        <section id="servizi" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-foreground">
                I Nostri Servizi
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Ogni servizio è progettato per risolvere problemi specifici e garantire risultati concreti
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Vacuum */}
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 text-center">Vacuum</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Elimina cellulite e ritenzione</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Rimodella la silhouette</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Migliora la circolazione</span>
                    </li>
                  </ul>
                  <Link to="/servizi#vacuum">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Scopri <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* EMS */}
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 text-center">EMS</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Dimagrimento accelerato</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Tonificazione muscolare</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Solo 20 minuti a sessione</span>
                    </li>
                  </ul>
                  <Link to="/servizi#ems">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Scopri <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Pilates Reformer */}
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 text-center">Pilates Reformer</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Risolve il mal di schiena</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Migliora la postura</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Rinforza core e stabilità</span>
                    </li>
                  </ul>
                  <Link to="/servizi#pilates">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Scopri <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Ginnastica Posturale */}
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 text-center">Ginnastica Posturale</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Previene dolori articolari</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Migliora l'equilibrio</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Aumenta la mobilità</span>
                    </li>
                  </ul>
                  <Link to="/servizi#ginnastica-posturale">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Scopri <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Percorsi Over 60 */}
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 text-center">Percorsi Over 60</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Mantiene l'autonomia</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Previene cadute</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Migliora la qualità di vita</span>
                    </li>
                  </ul>
                  <Link to="/servizi#over-60">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Scopri <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Sauna Infrarossi */}
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 text-center">Sauna Infrarossi</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Detox profondo</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Rilassa i muscoli</span>
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Migliora il sonno</span>
                    </li>
                  </ul>
                  <Link to="/servizi#sauna-infrarossi">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Scopri <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 4. SOCIAL PROOF - TESTIMONIANZE */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-foreground">
                Cosa Dicono i Nostri Clienti
              </h2>
              <p className="text-xl text-muted-foreground">Risultati reali di persone reali</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-4">
                      MC
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Maria C.</h4>
                      <p className="text-sm text-muted-foreground">45 anni</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground italic">
                    "In 3 mesi ho perso 12 kg e risolto completamente il mal di schiena. Il personal trainer mi ha seguito passo dopo passo."
                  </p>
                  <p className="text-sm text-primary font-semibold mt-4">-12 kg in 3 mesi</p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold mr-4">
                      LR
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Luca R.</h4>
                      <p className="text-sm text-muted-foreground">38 anni</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground italic">
                    "L'EMS ha rivoluzionato i miei allenamenti. In 20 minuti ottengo risultati che prima richiedevano ore in palestra."
                  </p>
                  <p className="text-sm text-secondary font-semibold mt-4">+8 kg massa muscolare</p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold mr-4">
                      SF
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">Sara F.</h4>
                      <p className="text-sm text-muted-foreground">52 anni</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground italic">
                    "Vacuum e Pressoterapia hanno eliminato la cellulite che avevo da anni. Finalmente mi sento a mio agio in costume."
                  </p>
                  <p className="text-sm text-accent font-semibold mt-4">Cellulite ridotta 80%</p>
                </CardContent>
              </Card>
            </div>

            {/* Statistiche */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Clienti Trasformati</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-secondary mb-2">30</div>
                <p className="text-muted-foreground">Giorni per Risultati</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-accent mb-2">98%</div>
                <p className="text-muted-foreground">Clienti Soddisfatti</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">8</div>
                <p className="text-muted-foreground">Anni di Esperienza</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. OFFERTA/SCARCITY */}
        <section className="py-16 bg-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Posti limitati per la Prova Gratuita
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Solo i primi 10 che prenoteranno questo mese riceveranno la <strong>consulenza personalizzata gratuita</strong> del valore di 150€.
            </p>
            <div className="bg-white/10 rounded-xl p-6 max-w-md mx-auto mb-8">
              <p className="text-2xl font-black">⏰ PRENOTA OGGI</p>
              <p className="text-lg">Non rimandare la tua trasformazione</p>
            </div>
            <a 
              href={`#prenota`}
              className="inline-block no-underline"
            >
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 px-12 py-6 text-xl font-black rounded-full shadow-lg"
              >
                Prenota la tua Prova Gratuita
              </Button>
            </a>
          </div>
        </section>

        {/* 6. FAQ SECTION */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-foreground">
                Domande Frequenti
              </h2>
              <p className="text-xl text-muted-foreground">Tutto quello che devi sapere prima di iniziare</p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="p-0">
                    <h3 className="text-lg font-bold text-foreground mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* LEAD MAGNET SECTION */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Bonus Esclusivo per Te</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Scarica gratuitamente la nostra guida con i segreti del dimagrimento efficace
              </p>
            </div>
            
            <div className="max-w-lg mx-auto">
              <LeadMagnet 
                title="Guida Gratuita: 7 Segreti per Dimagrire"
                description="Scopri come perdere peso velocemente con EMS, Vacuum e alimentazione corretta. Strategie testate su oltre 500 clienti."
                buttonText="Scarica Gratis la Guida"
              />
            </div>
          </div>
        </section>

        {/* 7. CONTATTI/MAP SECTION */}
        <section id="prenota" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Form */}
              <div>
                <h2 className="text-3xl font-black mb-6 text-foreground">
                  Prenota la tua Prova Gratuita
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Compila il form e ti richiameremo entro 24 ore per fissare il tuo appuntamento. Zero impegno garantito.
                </p>
                
                <Card className="p-8">
                  <CardContent className="p-0">
                    <EnhancedContactForm 
                      campaignName="Homepage Contact Form"
                      source="homepage"
                      title="Prenota la Tua Prova Gratuita"
                      subtitle="Zero impegno. Ti richiamiamo entro 24 ore."
                      showProgress={true}
                      className="max-w-md mx-auto"
                    />
                  </CardContent>
                </Card>
              </div>
              
              {/* Contact Info */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Informazioni Contatto</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Indirizzo</h4>
                      <p className="text-muted-foreground">Via Venti Settembre, 5/7<br />37045 Legnago (VR)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Telefono</h4>
                      <a href="tel:+393291070374" className="text-muted-foreground hover:text-primary transition-colors">
                        329 107 0374
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MessageSquare className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">WhatsApp</h4>
                      <a 
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        Scrivici su WhatsApp
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Orari</h4>
                      <div className="text-muted-foreground space-y-1">
                        <p>Lun-Ven: 8:00 - 21:00</p>
                        <p>Sabato: 8:00 - 12:00</p>
                        <p>Domenica: Chiuso</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* WhatsApp CTA */}
                <Card className="p-6 bg-green-50 border border-green-200">
                  <CardContent className="p-0 text-center">
                    <h4 className="text-lg font-bold text-foreground mb-4">Preferisci WhatsApp?</h4>
                    <p className="text-muted-foreground mb-6">Scrivici direttamente e ti rispondiamo subito!</p>
                    <a 
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block no-underline"
                    >
                      <Button className="bg-green-600 hover:bg-green-700 text-white font-bold">
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Scrivici su WhatsApp
                      </Button>
                    </a>
                  </CardContent>
                </Card>
                
                {/* Map */}
                <div className="mt-8">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2805.8937556871953!2d11.289892776114847!3d45.19124367107647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f5f8e8e8e8e8f%3A0x8e8e8e8e8e8e8e8e!2sVia%20Venti%20Settembre%2C%205%2C%2037045%20Legnago%20VR!5e0!3m2!1sit!2sit!4v1234567890123"
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mappa MUV Fitness Legnago"
                    className="shadow-lg"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeUltraConversion;