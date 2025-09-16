import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Target, Users, Zap, Heart, Brain, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

// SEO
import UnifiedSEOHead from '@/components/SEO/UnifiedSEOHead';

const ServiziUnified = () => {
  const whatsappNumber = "3913737140";
  const whatsappMessage = "Ciao! Ho visto i vostri servizi e vorrei prenotare la CONSULENZA GRATUITA 💪";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // 3 SERVIZI CORE - LASER FOCUSED PER CONVERSIONI MASSIME
  const services = [
    {
      id: 'dimagrimento',
      title: 'Dimagrimento Personalizzato',
      subtitle: 'Perdi peso definitivamente in 30 giorni',
      icon: <Target className="w-8 h-8" />,
      color: 'from-red-500 to-orange-500',
      duration: '20-45 min',
      frequency: '2-3 volte/settimana',
      headline: '🔥 EMS + Personal Training = Risultati GARANTITI',
      problems: ['Obesità e sovrappeso', 'Metabolismo lento', 'Poco tempo per allenarsi', 'Diete fallimentari'],
      benefits: ['Bruci grasso 4x più veloce', 'Tonifichi tutto il corpo', 'Solo 20 min a sessione', 'Risultati visibili in 2 settimane'],
      description: 'La combinazione rivoluzionaria di EMS Training + Personal Training 1:1. In 20 minuti ottieni quello che faresti in 2 ore di palestra tradizionale. Il tuo personal trainer ti seguirà in ogni movimento mentre la tecnologia EMS stimola tutti i muscoli contemporaneamente.',
      process: [
        'Analisi composizione corporea completa',
        'Programma EMS personalizzato sui tuoi obiettivi',
        'Sessioni guidate dal personal trainer dedicato',
        'Monitoraggio progressi settimanale'
      ],
      idealFor: 'Perfetto se vuoi dimagrire velocemente, hai poco tempo, metabolismo lento o hai già provato diete senza successo.',
      guarantee: 'Perdi almeno 3-5 kg in 30 giorni o ti rimborsiamo tutto'
    },
    {
      id: 'pilates',
      title: 'Pilates Reformer',
      subtitle: 'Addio mal di schiena per sempre',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-green-500 to-teal-500',
      duration: '50 min',
      frequency: '2 volte/settimana',
      headline: '🎯 Risolvi postura e dolori in modo definitivo',
      problems: ['Mal di schiena cronico', 'Postura da ufficio', 'Rigidità muscolare', 'Dolori cervicali'],
      benefits: ['Schiena dritta e forte', 'Zero dolori quotidiani', 'Maggiore flessibilità', 'Energia e benessere'],
      description: 'Il Pilates Reformer è il macchinario più avanzato per correggere postura e eliminare dolori. Ogni esercizio è progettato per riallineare la colonna vertebrale e rafforzare i muscoli profondi che sostengono il corpo.',
      process: [
        'Valutazione posturale con tecnologia avanzata',
        'Riallineamento guidato step-by-step',
        'Rinforzo muscolare profondo mirato',
        'Piano mantenimento per casa'
      ],
      idealFor: 'Ideale se soffri di mal di schiena, lavori al computer, hai problemi posturali o vuoi prevenire dolori futuri.',
      guarantee: 'Riduci dolori del 80% in 4 settimane o prolunghiamo il programma gratis'
    },
    {
      id: 'vacuum',
      title: 'Vacuum + Pressoterapia',
      subtitle: 'Elimina cellulite e ritenzione definitivamente',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      duration: '30 min',
      frequency: '2 volte/settimana',
      headline: '✨ Pelle liscia e gambe leggere in 30 giorni',
      problems: ['Cellulite evidente', 'Ritenzione idrica', 'Gonfiore alle gambe', 'Circolazione lenta'],
      benefits: ['Cellulite ridotta del 70%', 'Gambe sgonfie e leggere', 'Pelle visibilmente più liscia', 'Circolazione migliorata'],
      description: 'Tecnologia medica avanzata che combina Vacuum Therapy e Pressoterapia per eliminare definitivamente cellulite e ritenzione idrica. I risultati sono visibili già dalla prima seduta.',
      process: [
        'Mappatura delle zone critiche',
        'Trattamento Vacuum mirato e personalizzato',
        'Pressoterapia per drenaggio completo',
        'Piano mantenimento risultati'
      ],
      idealFor: 'Perfetto per donne con cellulite, ritenzione idrica, gambe pesanti o che vogliono migliorare la texture della pelle.',
      guarantee: 'Riduci cellulite del 50% in 8 settimane o continuiamo gratis fino al risultato'
    }
  ];

  return (
    <>
      <UnifiedSEOHead
        title="3 Servizi MUV Fitness Legnago | Dimagrimento, Pilates, Vacuum"
        description="Scegli il tuo obiettivo: Dimagrimento con EMS+Personal Training, Pilates Reformer per mal di schiena, Vacuum+Pressoterapia per cellulite. Prima sessione GRATUITA!"
        keywords="dimagrimento legnago, pilates reformer legnago, vacuum pressoterapia legnago, ems personal training, mal di schiena legnago"
        canonicalUrl="https://www.muvfitness.it/servizi"
      />

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Hero Section ULTRA-CONVERSIVO */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* TRUST BADGE */}
              <div className="inline-flex items-center gap-2 bg-brand-accent/20 border border-brand-accent/30 rounded-full px-6 py-2 mb-6">
                <span className="text-brand-accent font-bold text-sm">
                  ⭐ 500+ Clienti Trasformati • Risultati Garantiti
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="text-brand-accent">3 Servizi</span> per<br />
                <span className="text-white">3 Obiettivi Precisi</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Ogni servizio risolve UN problema specifico in modo definitivo.<br />
                <strong className="text-brand-accent">Scegli il tuo obiettivo e trasformati in 30 giorni.</strong>
              </p>

              {/* URGENZA */}
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 max-w-md mx-auto mb-8">
                <p className="text-red-400 font-bold">🔥 PROMO LIMITATA</p>
                <p className="text-sm text-white">Prima sessione GRATUITA • Solo per i primi 10 questo mese</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVIZI GRID - FOCUS TOTALE SUI RISULTATI */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {services.map((service, index) => (
                <div 
                  key={service.id}
                  id={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    {/* Service Badge */}
                    <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${service.color} text-white px-6 py-3 rounded-2xl mb-4`}>
                      {service.icon}
                      <span className="font-bold">{service.title}</span>
                    </div>
                    
                    {/* Headline Killer */}
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                      {service.subtitle}
                    </h2>
                    
                    <p className="text-xl text-brand-accent font-bold mb-6">
                      {service.headline}
                    </p>
                    
                    <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                      {service.description}
                    </p>

                    {/* Garanzia */}
                    <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-8">
                      <p className="text-green-400 font-bold mb-1">💯 GARANZIA RISULTATI</p>
                      <p className="text-sm text-white">{service.guarantee}</p>
                    </div>

                    {/* CTA POTENTE */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a 
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline"
                      >
                        <Button 
                          size="lg" 
                          className="bg-gradient-to-r from-brand-primary to-brand-accent text-white px-8 py-4 text-xl font-black rounded-full hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                        >
                          🚀 INIZIA SUBITO - WHATSAPP
                        </Button>
                      </a>
                      <Link to="/contatti">
                        <Button 
                          size="lg" 
                          variant="outline"
                          className="border-2 border-white text-white px-8 py-4 text-xl font-bold rounded-full hover:bg-white hover:text-gray-900 w-full sm:w-auto"
                        >
                          📞 PRENOTA CONSULENZA
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Info Card RISULTATI-ORIENTED */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
                      {/* Quick Info */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                          <Clock className="w-6 h-6 text-brand-accent mx-auto mb-2" />
                          <p className="text-brand-accent font-bold text-sm">Durata</p>
                          <p className="text-white text-lg font-bold">{service.duration}</p>
                        </div>
                        <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                          <Users className="w-6 h-6 text-brand-accent mx-auto mb-2" />
                          <p className="text-brand-accent font-bold text-sm">Frequenza</p>
                          <p className="text-white text-lg font-bold">{service.frequency}</p>
                        </div>
                      </div>
                      
                      {/* Problemi che risolvi */}
                      <div className="mb-8">
                        <h3 className="font-bold text-red-400 text-lg mb-4">❌ Problemi che RISOLVI:</h3>
                        <div className="space-y-3">
                          {service.problems.map((problem, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                              <span className="text-gray-300">{problem}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Risultati che ottieni */}
                      <div className="mb-8">
                        <h3 className="font-bold text-green-400 text-lg mb-4">✅ Risultati che OTTIENI:</h3>
                        <div className="space-y-3">
                          {service.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                              <span className="text-gray-300 font-semibold">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Ideale per */}
                      <div className="bg-brand-primary/20 border border-brand-primary/30 rounded-xl p-4 mb-6">
                        <h4 className="font-bold text-brand-accent mb-2">🎯 PERFETTO SE:</h4>
                        <p className="text-gray-200 text-sm leading-relaxed">
                          {service.idealFor}
                        </p>
                      </div>

                      {/* Come funziona */}
                      <div>
                        <h4 className="font-bold text-white text-lg mb-4">🔄 COME FUNZIONA:</h4>
                        <div className="space-y-3">
                          {service.process.map((step, i) => (
                            <div key={i} className="flex gap-3">
                              <span className="w-7 h-7 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                {i + 1}
                              </span>
                              <span className="text-gray-300 text-sm leading-relaxed">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINALE ESPLOSIVA */}
        <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-accent relative overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Quale Servizio Scegliere?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              <strong>Consulenza GRATUITA di 30 minuti:</strong><br />
              Analizziamo la tua situazione e ti diciamo esattamente quale percorso seguire per i tuoi obiettivi.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Target className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Analisi Completa</h3>
                <p className="text-white/80 text-sm">Valutiamo obiettivi, condizione fisica e preferenze</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Brain className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Piano Personalizzato</h3>
                <p className="text-white/80 text-sm">Ti creiamo il percorso perfetto per te</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Heart className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2">Prova Gratuita</h3>
                <p className="text-white/80 text-sm">Testi il servizio senza impegno</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button 
                  size="lg" 
                  className="bg-white text-brand-primary px-12 py-6 text-xl font-black rounded-full hover:scale-105 transition-all duration-300 shadow-2xl min-w-[300px]"
                >
                  💬 WHATSAPP: PRENOTA ORA
                </Button>
              </a>
              <span className="text-white/80 font-bold text-lg">oppure</span>
              <Link to="/contatti">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white px-12 py-6 text-xl font-black rounded-full hover:bg-white hover:text-brand-primary min-w-[300px]"
                >
                  📞 COMPILA IL FORM
                </Button>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-white font-bold">⚡ Risposta Immediata</p>
                  <p className="text-white/70 text-sm">Entro 15 minuti</p>
                </div>
                <div>
                  <p className="text-white font-bold">🎯 Consulenza Gratuita</p>
                  <p className="text-white/70 text-sm">30 min inclusi</p>
                </div>
                <div>
                  <p className="text-white font-bold">💯 Zero Impegno</p>
                  <p className="text-white/70 text-sm">Decidi dopo</p>
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