import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Target, Shield, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';
import SafeResourceOptimizer from '@/components/optimization/SafeResourceOptimizer';
import { getLocalBusinessSchema, getOrganizationSchema, getWebSiteSchema } from '@/utils/seoSchemas';

const HomeUltraConversion = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      import('@/hooks/useLeadTracking').then(({ default: useLeadTracking }) => {
        useLeadTracking();
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const structuredData = [
    getLocalBusinessSchema(),
    getOrganizationSchema(), 
    getWebSiteSchema()
  ];

  const whatsappNumber = "3913737140";
  const whatsappMessage = "Ciao! Vorrei prenotare la PROVA GRATUITA e sapere di più sui vostri servizi 💪";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <SafeResourceOptimizer />
      
      <UnifiedSEOHead
        title="Trasforma il Tuo Corpo in 30 Giorni | MUV Fitness Legnago"
        description="Centro fitness specializzato per donne e uomini 25-65 anni. Risolvi obesità, mal di schiena, allenamento in ambiente riservato con personal trainer. PROVA GRATUITA!"
        keywords="dimagrire legnago, personal trainer legnago, mal di schiena legnago, fitness riservato, ems legnago, pilates legnago"
        canonicalUrl="https://www.muvfitness.it/"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gray-900 text-white">
        {/* HERO SECTION ULTRA-CONVERSIVA */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20">
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            {/* TRUST INDICATORS */}
            <div className="mb-6 flex flex-wrap justify-center gap-4 text-sm text-brand-accent">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                500+ Clienti Trasformati
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                Risultati in 30 Giorni
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                100% Personalizzato
              </span>
            </div>

            {/* HEADLINE KILLER */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Trasforma il Tuo Corpo<br />
              <span className="text-brand-accent">in 30 Giorni</span><br />
              <span className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-normal">
                senza Rinunce, senza Confusione
              </span>
            </h1>

            {/* PROBLEM/SOLUTION */}
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-xl md:text-2xl text-gray-200 mb-6">
                <strong className="text-brand-accent">Sei stanco/a di:</strong> Diete fallimentari, palestre affollate, 
                mal di schiena che peggiora, allenamenti che non funzionano?
              </p>
              <p className="text-lg md:text-xl text-white font-semibold">
                🎯 <strong>In MUV risolviamo TUTTO in un ambiente riservato con il tuo personal trainer dedicato</strong>
              </p>
            </div>

            {/* CTA PRINCIPALE */}
            <div className="mb-8">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block no-underline"
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-brand-primary to-brand-accent text-white px-8 md:px-12 py-4 md:py-6 text-xl md:text-2xl font-black rounded-full shadow-2xl hover:scale-105 transition-all duration-300 mb-4"
                >
                  🔥 PROVA GRATUITA + CONSULENZA
                </Button>
              </a>
              <p className="text-sm text-gray-300">
                Prime 10 persone questo mese • Nessun impegno • Risultati garantiti
              </p>
            </div>

            {/* URGENZA CONTROLLATA */}
            <div className="bg-brand-primary/20 border border-brand-primary/30 rounded-xl p-4 max-w-md mx-auto">
              <p className="text-brand-accent font-bold">⏰ OFFERTA LIMITATA</p>
              <p className="text-sm">Solo per i primi 10 che prenoteranno questa settimana</p>
            </div>
          </div>
        </section>

        {/* SERVIZI CORE - 3 SEZIONI LASER-FOCUSED */}
        <section id="servizi" className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                I Nostri <span className="text-brand-accent">3 Pilastri</span> per la Trasformazione
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Ogni servizio è progettato specificamente per risolvere i tuoi problemi in modo definitivo
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* DIMAGRIMENTO PERSONALIZZATO */}
              <Card className="bg-gradient-to-br from-gray-700 to-gray-600 border-gray-500 p-8 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Dimagrimento Personalizzato</h3>
                <p className="text-gray-300 mb-6">
                  <strong>EMS + Personal Training 1:1</strong><br />
                  Bruci grasso e tonifichi in 20 minuti quello che faresti in 2 ore di palestra
                </p>
                <div className="text-left text-sm text-gray-400 mb-6">
                  <p>✓ Risolve: Obesità, metabolismo lento, mancanza di tempo</p>
                  <p>✓ Ideale per: Chi vuole risultati rapidi e duraturi</p>
                  <p>✓ Durata: 2-3 sessioni/settimana da 20 min</p>
                </div>
                <Link to="/servizi#dimagrimento">
                  <Button variant="outline" className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white">
                    Scopri di Più <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Card>

              {/* PILATES REFORMER */}
              <Card className="bg-gradient-to-br from-gray-700 to-gray-600 border-gray-500 p-8 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Pilates Reformer</h3>
                <p className="text-gray-300 mb-6">
                  <strong>Addio Mal di Schiena per Sempre</strong><br />
                  Rinforzi la postura e elimini dolori cronici con il macchinario più avanzato
                </p>
                <div className="text-left text-sm text-gray-400 mb-6">
                  <p>✓ Risolve: Mal di schiena, posture scorrette, dolori articolari</p>
                  <p>✓ Ideale per: Chi lavora in ufficio, over 40, problemi posturali</p>
                  <p>✓ Durata: 2 sessioni/settimana da 50 min</p>
                </div>
                <Link to="/servizi#pilates">
                  <Button variant="outline" className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white">
                    Scopri di Più <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Card>

              {/* VACUUM + PRESSOTERAPIA */}
              <Card className="bg-gradient-to-br from-gray-700 to-gray-600 border-gray-500 p-8 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Vacuum + Pressoterapia</h3>
                <p className="text-gray-300 mb-6">
                  <strong>Cellulite e Ritenzione Addio</strong><br />
                  Tecnologia avanzata per rimodellare il corpo e migliorare la circolazione
                </p>
                <div className="text-left text-sm text-gray-400 mb-6">
                  <p>✓ Risolve: Cellulite, ritenzione idrica, gonfiore gambe</p>
                  <p>✓ Ideale per: Donne con problemi circolatori, post-gravidanza</p>
                  <p>✓ Durata: 2 sessioni/settimana da 30 min</p>
                </div>
                <Link to="/servizi#vacuum">
                  <Button variant="outline" className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white">
                    Scopri di Più <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Card>
            </div>

            {/* CTA SERVIZI */}
            <div className="text-center mt-12">
              <Link to="/servizi">
                <Button size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 text-xl font-bold">
                  Vedi Tutti i Dettagli →
                </Button>  
              </Link>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF NUMERICA */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-12">
              I Numeri che <span className="text-brand-accent">Parlano Chiaro</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl md:text-5xl font-black text-brand-accent mb-2">500+</div>
                <p className="text-gray-300">Clienti Trasformati</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-brand-accent mb-2">30</div>
                <p className="text-gray-300">Giorni per Vedere Risultati</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-brand-accent mb-2">100%</div>
                <p className="text-gray-300">Personalizzazione</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-brand-accent mb-2">8</div>
                <p className="text-gray-300">Anni di Esperienza</p>
              </div>
            </div>
          </div>
        </section>

        {/* PERCHÉ SCEGLIERE MUV */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Perché <span className="text-brand-accent">MUV</span> è Diverso?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Ambiente Riservato e Silenzioso</h3>
                      <p className="text-gray-300">Niente confusione, niente giudizi. Solo tu e il tuo personal trainer in uno spazio dedicato.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Personal Trainer Sempre Presente</h3>
                      <p className="text-gray-300">Ogni movimento controllato, ogni esercizio perfetto. Mai da soli, sempre seguiti.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Metodo Scientifico Provato</h3>
                      <p className="text-gray-300">Non improvvisiamo. Ogni programma è basato su ricerca scientifica e risultati concreti.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 rounded-2xl p-8 border border-brand-primary/30">
                  <h3 className="text-2xl font-bold text-white mb-4">Garanzia Totale</h3>
                  <p className="text-gray-300 mb-6">
                    Se dopo 30 giorni non sei completamente soddisfatto dei risultati, 
                    ti rimborsiamo ogni euro speso.
                  </p>
                  <div className="text-brand-accent font-bold text-lg">
                    💯 SODDISFATTO O RIMBORSATO
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINALE POTENTISSIMA */}
        <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-accent">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Inizia la Tua Trasformazione <span className="text-black">OGGI</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              <strong>PROVA GRATUITA + Consulenza Personalizzata</strong><br />
              Scopri esattamente come raggiungere i tuoi obiettivi senza impegno
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button 
                  size="lg" 
                  className="bg-white text-brand-primary px-8 py-4 text-xl font-black rounded-full hover:bg-gray-100 shadow-xl min-w-[280px]"
                >
                  <MessageSquare className="w-6 h-6 mr-2" />
                  WHATSAPP: PRENOTA ORA
                </Button>
              </a>
              <span className="text-white/80 font-bold">oppure</span>
              <Link to="/contatti">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white px-8 py-4 text-xl font-black rounded-full hover:bg-white hover:text-brand-primary min-w-[280px]"
                >
                  <Phone className="w-6 h-6 mr-2" />
                  COMPILA IL FORM
                </Button>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-lg mx-auto">
              <p className="text-white font-bold mb-2">⚡ RISPOSTA IMMEDIATA</p>
              <p className="text-white/90 text-sm">
                Ti rispondiamo entro 15 minuti per fissare il tuo appuntamento
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeUltraConversion;