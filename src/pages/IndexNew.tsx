import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// New MUV Components
import { FlexibleHero } from '@/features/hero';
import AIAssistantSection from '@/components/home/AIAssistantSection';
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';
import { getLocalBusinessSchema, getOrganizationSchema, getWebSiteSchema } from '@/utils/seoSchemas';
import PerformanceOptimizer from '@/features/performance';

const IndexNew = () => {
  const [showFullContent, setShowFullContent] = useState(false);

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowFullContent(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const structuredData = [
    getLocalBusinessSchema(),
    getOrganizationSchema(),
    getWebSiteSchema()
  ];

  return (
    <>
      <PerformanceOptimizer />
      
      <UnifiedSEOHead
        title="MUV Fitness Legnago – Trasforma il Tuo Corpo in 30 Giorni"
        description="Centro fitness innovativo a Legnago. Personal Training, EMS, Pilates Reformer, Pancafit. Risultati garantiti, prima consulenza gratuita. Prenota ora!"
        keywords="trasformazione corpo legnago, personal trainer legnago, ems legnago, pilates legnago, dimagrire legnago, mal di schiena legnago"
        canonicalUrl="https://www.muvfitness.it/"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section - Above the fold */}
        <FlexibleHero
          variant="landing"
          title="TRASFORMA IL TUO CORPO IN 30 GIORNI"
          subtitle="🔥 PERDI FINO A 15KG CON IL METODO SCIENTIFICO MUV"
          primaryCTA={{
            text: "PRENOTA CONSULENZA GRATUITA",
            onClick: scrollToForm
          }}
          guarantee="✅ Garanzia Soddisfatti o Rimborsati al 100%"
          urgency="ULTIMI 3 POSTI DISPONIBILI A QUESTO PREZZO!"
        />

        {/* Quick Services Preview */}
        <section className="section-padding bg-gradient-to-r from-muted/30 to-background">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="text-responsive-xl font-bold text-foreground mb-6">
                I Nostri <span className="text-primary font-black">Servizi Principali</span>
              </h2>
              <p className="text-responsive text-muted-foreground max-w-3xl mx-auto">
                Ogni servizio è progettato per risolvere problemi specifici e raggiungere obiettivi concreti
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Personal Training 1:1",
                  description: "Allenamento personalizzato con trainer dedicato",
                  icon: "🏋️",
                  color: "from-brand-primary to-brand-secondary",
                  problems: "Mancanza motivazione • Risultati lenti • Tecnica sbagliata"
                },
                {
                  title: "EMS Training",
                  description: "20 minuti = 4 ore di palestra tradizionale",
                  icon: "⚡",
                  color: "from-brand-secondary to-brand-accent",
                  problems: "Poco tempo • Risultati rapidi • Tonificazione mirata"
                },
                {
                  title: "Pilates + Pancafit",
                  description: "Risolvi mal di schiena e problemi posturali",
                  icon: "🧘",
                  color: "from-brand-accent to-brand-primary",
                  problems: "Mal di schiena • Postura scorretta • Stress"
                },
                {
                  title: "Vacuum + Pressoterapia",
                  description: "Elimina cellulite e ritenzione idrica",
                  icon: "🌊",
                  color: "from-brand-primary to-brand-accent",
                  problems: "Cellulite • Ritenzione idrica • Circolazione"
                }
              ].map((service, index) => (
                <div 
                  key={index}
                  className="bg-white/95 rounded-2xl p-8 border border-border shadow-soft hover:shadow-lg transition-all duration-200 group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-3xl mb-6 mx-auto transition-transform`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 text-center">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-center mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="text-xs text-muted-foreground text-center border-t border-border pt-4">
                    <strong className="text-primary">Risolve:</strong><br />
                    {service.problems}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                to="/servizi" 
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center gap-2 rounded-2xl"
              >
                🔍 Scopri Tutti i Servizi
              </Link>
            </div>
          </div>
        </section>

        {/* Load additional content after initial paint */}
        {showFullContent && (
          <>
            {/* AI Assistant Section */}
            <AIAssistantSection />

            {/* Quick Social Proof */}
            <section className="section-padding bg-gradient-to-r from-brand-primary/5 to-brand-accent/5">
              <div className="container-width">
                <div className="text-center">
                  <h2 className="text-responsive-xl font-bold text-foreground mb-12">
                    Perché Scegliere <span className="text-primary font-black">MUV Fitness</span>
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="text-center">
                      <div className="text-6xl font-black text-primary mb-4">500+</div>
                      <h3 className="font-bold text-foreground mb-2">Clienti Trasformati</h3>
                      <p className="text-muted-foreground text-sm">In 10+ anni di attività</p>
                    </div>
                    <div className="text-center">
                      <div className="text-6xl font-black text-primary mb-4">30</div>
                      <h3 className="font-bold text-foreground mb-2">Giorni per Vedere Risultati</h3>
                      <p className="text-muted-foreground text-sm">Metodo scientificamente testato</p>
                    </div>
                    <div className="text-center">
                      <div className="text-6xl font-black text-primary mb-4">100%</div>
                      <h3 className="font-bold text-foreground mb-2">Personalizzazione</h3>
                      <p className="text-muted-foreground text-sm">Ogni percorso è unico</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Simple FAQ */}
            <section className="section-padding bg-background">
              <div className="container-width max-w-4xl">
                <h2 className="text-responsive-xl font-bold text-foreground text-center mb-12">
                  Domande <span className="text-primary font-black">Frequenti</span>
                </h2>
                
                <div className="space-y-6">
                  {[
                    {
                      q: "Quanto tempo ci vuole per vedere i primi risultati?",
                      a: "Con il nostro metodo MUV, i primi cambiamenti sono visibili già dopo 2-3 settimane. Risultati significativi in 30 giorni con costanza."
                    },
                    {
                      q: "Ho poco tempo, quale servizio mi consigliate?",
                      a: "L'EMS Training è perfetto: solo 20 minuti reali, equivalenti a 4 ore di palestra tradizionale. Ideale per chi ha agenda piena."
                    },
                    {
                      q: "Ho mal di schiena, posso allenarmi?",
                      a: "Assolutamente sì! Pancafit e Pilates Reformer sono specificamente progettati per risolvere problemi posturali e mal di schiena."
                    }
                  ].map((faq, index) => (
                    <details key={index} className="bg-white/90 rounded-xl p-6 border border-border group">
                      <summary className="font-bold text-foreground cursor-pointer text-lg mb-2 list-none flex items-center justify-between">
                        {faq.q}
                        <span className="text-primary group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <p className="text-muted-foreground leading-relaxed mt-4 pl-4 border-l-4 border-primary/20">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Final CTA */}
        <section className="section-padding bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container-width relative z-10">
            <h2 className="text-responsive-xl font-bold mb-6">
              Pronto per la tua <span className="text-yellow-300">Trasformazione</span>?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Prima consulenza gratuita + valutazione corpo completa. Scopri il tuo potenziale.
            </p>
            <Link 
              to="/contatti" 
              className="inline-flex items-center gap-3 bg-white text-primary font-bold text-xl px-12 py-5 rounded-xl hover:bg-gray-50 transition-colors duration-200 min-h-[64px]"
            >
              🚀 PRENOTA CONSULENZA GRATUITA
            </Link>
            <p className="text-sm opacity-70 mt-6">
              ⚡ Risposta entro 2 ore • 📞 Chiamata diretta disponibile • 🎯 Nessun impegno
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default IndexNew;