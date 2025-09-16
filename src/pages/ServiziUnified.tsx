import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Target, Users, Zap, Heart, Brain, Dumbbell } from 'lucide-react';

// SEO
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';

const ServiziUnified = () => {
  const services = [
    {
      id: 'personal-training',
      title: 'Personal Training 1:1',
      subtitle: 'Il tuo trainer dedicato per risultati straordinari',
      icon: <Dumbbell className="w-8 h-8" />,
      color: 'from-brand-primary to-brand-secondary',
      duration: '45-60 min',
      frequency: '2-3 volte/settimana',
      problems: ['Mancanza di motivazione', 'Tecnica scorretta', 'Plateau nei risultati', 'Obiettivi specifici'],
      benefits: ['Programma 100% personalizzato', 'Motivazione costante', 'Tecnica perfetta', 'Risultati rapidi'],
      description: 'Il nostro Personal Training 1:1 è la soluzione per chi vuole risultati straordinari. Ogni sessione è completamente personalizzata sui tuoi obiettivi, livello fitness e preferenze.',
      process: [
        'Valutazione fisica completa e analisi obiettivi',
        'Creazione programma personalizzato',
        'Sessioni individuali con trainer dedicato',
        'Monitoraggio progressi e aggiustamenti'
      ],
      idealFor: 'Perfetto per chi vuole massimi risultati, ha obiettivi specifici, necessita motivazione costante o ha limitazioni fisiche particolari.'
    },
    {
      id: 'ems-training',
      title: 'EMS Training',
      subtitle: '20 minuti = 4 ore di palestra tradizionale',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-brand-secondary to-brand-accent',
      duration: '20 min',
      frequency: '1-2 volte/settimana',
      problems: ['Poco tempo disponibile', 'Risultati lenti', 'Difficoltà tonificazione', 'Riabilitazione'],
      benefits: ['Allenamento super efficace', 'Tonificazione profonda', 'Risparmio tempo', 'Dolce sulle articolazioni'],
      description: 'L\'EMS (Elettro-Mio-Stimolazione) è la tecnologia che rivoluziona il fitness. Impulsi elettronici sicuri stimolano simultaneamente tutti i gruppi muscolari.',
      process: [
        'Indossamento tuta speciale EMS',
        'Configurazione intensità personalizzata',
        'Esercizi guidati durante stimolazione',
        'Recupero e valutazione sessione'
      ],
      idealFor: 'Ideale per professionisti con poco tempo, chi vuole tonificare rapidamente, riabilitazione post-infortunio o mantenimento forma fisica.'
    },
    {
      id: 'pilates-pancafit',
      title: 'Pilates + Pancafit',
      subtitle: 'Risolvi mal di schiena e problemi posturali',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-brand-accent to-brand-primary',
      duration: '50 min',
      frequency: '2-3 volte/settimana',
      problems: ['Mal di schiena cronico', 'Postura scorretta', 'Stress e tensioni', 'Rigidità muscolare'],
      benefits: ['Postura corretta', 'Dolore ridotto', 'Flessibilità aumentata', 'Benessere generale'],
      description: 'Pilates Reformer combinato con Pancafit per riallineamento posturale completo. Risolviamo problemi di schiena, collo e postura con metodi dolci ma efficaci.',
      process: [
        'Analisi posturale dettagliata',
        'Riallineamento con Pancafit',
        'Rinforzo con Pilates Reformer',
        'Piano esercizi casa per mantenimento'
      ],
      idealFor: 'Perfetto per chi soffre di mal di schiena, lavora al computer, ha problemi posturali o cerca benessere completo corpo-mente.'
    },
    {
      id: 'vacuum-pressoterapia',
      title: 'Vacuum + Pressoterapia',
      subtitle: 'Elimina cellulite e ritenzione idrica',
      icon: <Target className="w-8 h-8" />,
      color: 'from-brand-primary to-brand-accent',
      duration: '30 min',
      frequency: '2 volte/settimana',
      problems: ['Cellulite evidente', 'Ritenzione idrica', 'Circolazione lenta', 'Gonfiore gambe'],
      benefits: ['Pelle più liscia', 'Circolazione migliorata', 'Gonfiore ridotto', 'Gambe leggere'],
      description: 'Trattamenti avanzati per rimodellare il corpo, migliorare la circolazione e combattere efficacemente cellulite e ritenzione idrica.',
      process: [
        'Valutazione zona da trattare',
        'Trattamento Vacuum mirato',
        'Pressoterapia per drenaggio',
        'Consigli mantenimento risultati'
      ],
      idealFor: 'Ideale per donne con cellulite, ritenzione idrica, problemi circolatori o chi vuole gambe più toniche e leggere.'
    }
  ];

  return (
    <>
      <UnifiedSEOHead
        title="Servizi MUV Fitness Legnago – Personal Training, EMS, Pilates, Vacuum"
        description="Scopri tutti i servizi MUV Fitness: Personal Training 1:1, EMS Training, Pilates Reformer, Pancafit, Vacuum e Pressoterapia. Prenota la tua consulenza gratuita."
        keywords="personal trainer legnago, ems training legnago, pilates reformer legnago, pancafit legnago, vacuum pressoterapia legnago"
        canonicalUrl="https://www.muvfitness.it/servizi"
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-brand-light via-muted/30 to-brand-light">
          <div className="container-width">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-responsive-2xl font-black text-brand-dark mb-6">
                I Nostri <span className="gradient-text">Servizi</span>
              </h1>
              <p className="text-responsive text-brand-dark/80 mb-8">
                Ogni servizio è progettato per risolvere problemi specifici e raggiungere obiettivi concreti. 
                Scopri quale percorso è perfetto per te.
              </p>
              <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full px-6 py-3">
                <span className="text-brand-primary font-bold text-sm">
                  ✅ Prima consulenza sempre GRATUITA
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding">
          <div className="container-width">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div 
                  key={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${service.color} text-white px-6 py-3 rounded-2xl mb-6`}>
                      {service.icon}
                      <span className="font-bold">{service.title}</span>
                    </div>
                    
                    <h2 className="text-responsive-lg font-black text-brand-dark mb-4">
                      {service.subtitle}
                    </h2>
                    
                    <p className="text-brand-dark/80 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/70 rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-brand-primary" />
                          <span className="font-semibold text-brand-dark text-sm">Durata</span>
                        </div>
                        <p className="text-brand-dark/70 text-sm">{service.duration}</p>
                      </div>
                      <div className="bg-white/70 rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-brand-primary" />
                          <span className="font-semibold text-brand-dark text-sm">Frequenza</span>
                        </div>
                        <p className="text-brand-dark/70 text-sm">{service.frequency}</p>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-6">
                      <h3 className="font-bold text-brand-dark mb-3">✅ Benefici Principali:</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {service.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-brand-primary rounded-full flex-shrink-0"></div>
                            <span className="text-brand-dark/80">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link 
                      to="/contatti" 
                      className={`btn-primary inline-flex items-center gap-2 text-lg px-8 py-4 rounded-2xl`}
                    >
                      🎯 Prenota Consulenza Gratuita
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>

                  {/* Info Card */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-soft">
                      <h3 className="font-bold text-brand-dark text-xl mb-6">Cosa Risolviamo</h3>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-brand-dark mb-3 text-red-600">❌ Problemi che hai:</h4>
                        <ul className="space-y-2">
                          {service.problems.map((problem, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <span className="text-red-500">•</span>
                              <span className="text-brand-dark/70">{problem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6 p-4 bg-brand-primary/5 rounded-xl border border-brand-primary/20">
                        <h4 className="font-semibold text-brand-primary mb-2">🎯 Ideale per:</h4>
                        <p className="text-brand-dark/80 text-sm leading-relaxed">
                          {service.idealFor}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-brand-dark mb-3">📋 Come Funziona:</h4>
                        <ol className="space-y-2">
                          {service.process.map((step, i) => (
                            <li key={i} className="flex gap-3 text-sm">
                              <span className="w-6 h-6 bg-brand-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {i + 1}
                              </span>
                              <span className="text-brand-dark/70">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container-width relative z-10 text-center">
            <h2 className="text-responsive-xl font-black text-white mb-6">
              Non Sai Quale Servizio Scegliere?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Prenota una consulenza gratuita: analizzeremo la tua situazione e ti consiglieremo il percorso perfetto per i tuoi obiettivi.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                to="/contatti" 
                className="bg-white text-brand-primary font-black text-xl px-10 py-5 rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl inline-flex items-center gap-3 min-h-[64px]"
              >
                📞 Prenota Consulenza GRATUITA
              </Link>
              <Link 
                to="/chi-siamo" 
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-2xl hover:bg-white hover:text-brand-primary transition-all duration-300 inline-flex items-center gap-2 min-h-[56px]"
              >
                🏢 Scopri MUV Fitness
              </Link>
            </div>
            <p className="text-white/70 text-sm mt-6">
              ✅ Valutazione completa inclusa • ✅ Nessun impegno • ✅ Consigli personalizzati
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiziUnified;