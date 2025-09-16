import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// New MUV Components
import TransformHeroSection from '@/components/home/TransformHeroSection';
import AIAssistantSection from '@/components/home/AIAssistantSection';

// Essential SEO
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';
import { getLocalBusinessSchema, getOrganizationSchema, getWebSiteSchema } from '@/utils/seoSchemas';

// Performance optimization
import SafeResourceOptimizer from '@/components/optimization/SafeResourceOptimizer';

const IndexNew = () => {
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    // Delay showing additional content for better LCP
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
      <SafeResourceOptimizer />
      
      <UnifiedSEOHead
        title="MUV Fitness Legnago – Trasforma il Tuo Corpo in 30 Giorni"
        description="Centro fitness innovativo a Legnago. Personal Training, EMS, Pilates Reformer, Pancafit. Risultati garantiti, prima consulenza gratuita. Prenota ora!"
        keywords="trasformazione corpo legnago, personal trainer legnago, ems legnago, pilates legnago, dimagrire legnago, mal di schiena legnago"
        canonicalUrl="https://www.muvfitness.it/"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section - Above the fold */}
        <TransformHeroSection />

        {/* Quick Services Preview */}
        <section className="section-padding bg-gradient-to-r from-muted/30 to-background">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="text-responsive-xl font-black text-brand-dark mb-6">
                I Nostri <span className="gradient-text">Servizi Principali</span>
              </h2>
              <p className="text-responsive text-brand-dark/70 max-w-3xl mx-auto">
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
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-soft hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3 text-center">
                    {service.title}
                  </h3>
                  <p className="text-brand-dark/70 text-center mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="text-xs text-brand-dark/50 text-center border-t border-gray-200 pt-4">
                    <strong className="text-brand-primary">Risolve:</strong><br />
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
                  <h2 className="text-responsive-xl font-black text-brand-dark mb-12">
                    Perché Scegliere <span className="gradient-text">MUV Fitness</span>
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="text-center">
                      <div className="text-6xl font-black gradient-text mb-4">500+</div>
                      <h3 className="font-bold text-brand-dark mb-2">Clienti Trasformati</h3>
                      <p className="text-brand-dark/60 text-sm">In 10+ anni di attività</p>
                    </div>
                    <div className="text-center">
                      <div className="text-6xl font-black gradient-text mb-4">30</div>
                      <h3 className="font-bold text-brand-dark mb-2">Giorni per Vedere Risultati</h3>
                      <p className="text-brand-dark/60 text-sm">Metodo scientificamente testato</p>
                    </div>
                    <div className="text-center">
                      <div className="text-6xl font-black gradient-text mb-4">100%</div>
                      <h3 className="font-bold text-brand-dark mb-2">Personalizzazione</h3>
                      <p className="text-brand-dark/60 text-sm">Ogni percorso è unico</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Simple FAQ */}
            <section className="section-padding bg-background">
              <div className="container-width max-w-4xl">
                <h2 className="text-responsive-xl font-black text-brand-dark text-center mb-12">
                  Domande <span className="gradient-text">Frequenti</span>
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
                    <details key={index} className="bg-white/70 rounded-2xl p-6 border border-gray-200 group">
                      <summary className="font-bold text-brand-dark cursor-pointer text-lg mb-2 list-none flex items-center justify-between">
                        {faq.q}
                        <span className="text-brand-primary group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <p className="text-brand-dark/70 leading-relaxed mt-4 pl-4 border-l-4 border-brand-primary/20">
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
        <section className="section-padding bg-gradient-primary text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container-width relative z-10">
            <h2 className="text-responsive-xl font-black mb-6">
              Pronto per la tua <span className="text-yellow-300">Trasformazione</span>?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Prima consulenza gratuita + valutazione corpo completa. Scopri il tuo potenziale.
            </p>
            <Link 
              to="/contatti" 
              className="inline-flex items-center gap-3 bg-white text-brand-primary font-black text-xl px-12 py-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl min-h-[72px]"
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