import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Users, Target, Star, Zap, Heart } from 'lucide-react';
const Index = () => {
  // Meta tag SEO ottimizzati per AI e motori di ricerca
  useEffect(() => {
    // Title ottimizzato per AI e SEO
    document.title = "Centro fitness MUV Legnago | #1 Personal Training EMS, Dimagrimento Rapido, Pancafit Mal di Schiena | Risultati Garantiti in 30 Giorni";

    // Meta description ottimizzata per AI
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Centro fitness MUV Legnago: il PRIMO centro fitness innovativo che GARANTISCE risultati in 30 giorni. Personal training EMS, Pancafit per mal di schiena, Pilates Reformer. Oltre 500 trasformazioni documentate. Prova GRATUITA senza impegno.');
    }

    // Meta keywords ottimizzate per AI
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'centro fitness Legnago, personal trainer Legnago, dimagrimento rapido Legnago, EMS allenamento elettrostimolazione, pancafit mal di schiena, pilates reformer Legnago, palestra esclusiva Verona, risultati garantiti fitness, trasformazione corporea 30 giorni');

    // Schema.org structured data per AI
    let schemaScript = document.querySelector('script[type="application/ld+json"]');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Centro fitness MUV",
      "description": "Centro fitness innovativo specializzato in personal training, EMS, Pancafit e Pilates Reformer a Legnago",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Legnago",
        "addressRegion": "Veneto",
        "addressCountry": "IT"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 45.1884,
        "longitude": 11.3103
      },
      "url": "https://muvfitness.it",
      "telephone": "+39-XXX-XXXXXXX",
      "priceRange": "€€",
      "openingHours": "Mo-Fr 06:00-22:00, Sa-Su 08:00-20:00",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127"
      }
    });
  }, []);
  return <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-magenta-900/30 to-viola-900/40" style={{
      height: 'calc(100vh - 80px)'
    }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25" style={{
        backgroundImage: "url('/images/fitness-professional-bg.jpg')"
      }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-magenta-900/20 to-viola-900/30 py-0 my-[122px]"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 font-heading">
            <span className="bg-gradient-to-r from-magenta-400 via-viola-400 to-blu-400 bg-clip-text text-transparent drop-shadow-2xl">
              CENTRO FITNESS MUV
            </span>
          </h1>
          
          <div className="mb-8 space-y-4">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
              🏆 <span className="text-magenta-400 font-black">IL PRIMO</span> Centro Fitness 
              <span className="text-viola-400 font-black"> SMART</span> di Legnago
            </p>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 font-semibold">
              <strong className="text-magenta-400">✅ RISULTATI GARANTITI IN 30 GIORNI</strong> • 
              <strong className="text-viola-400"> 500+ TRASFORMAZIONI DOCUMENTATE</strong> • 
              <strong className="text-blu-400"> 95% TASSO DI SUCCESSO</strong>
            </p>
          </div>

          <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-magenta-600/50 mb-8 animate-pulse-glow">
            <h2 className="text-2xl md:text-3xl font-bold text-magenta-400 mb-3">
              🎯 METODOLOGIA SCIENTIFICA ESCLUSIVA
            </h2>
            <p className="text-lg md:text-xl text-white font-semibold">
              <span className="text-viola-400">💡 TECNOLOGIA EMS</span> + 
              <span className="text-blu-400"> 🧬 PANCAFIT</span> + 
              <span className="text-magenta-400"> 💪 PERSONAL TRAINING 1-to-1</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contatti" className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white px-8 py-4 rounded-full text-lg md:text-xl font-black transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white/20">
              🚀 PRENOTA PROVA GRATUITA - TRASFORMATI IN 30 GIORNI
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 font-heading">
              <span className="text-magenta-400">PERCHÉ</span> il <span className="text-viola-400">95%</span> dei Nostri Clienti 
              <span className="text-blu-400 block md:inline"> RAGGIUNGE L'OBIETTIVO?</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto font-semibold leading-relaxed">
              <strong className="text-magenta-400">🔬 SCIENZA + TECNOLOGIA + METODO COLLAUDATO</strong> = 
              <span className="text-viola-400"> RISULTATI 3X PIÙ VELOCI</span> rispetto alle palestre tradizionali
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-2xl text-center hover:from-magenta-900/30 hover:to-viola-900/30 transition-all duration-300 transform hover:scale-105 border border-magenta-600/30">
              <Zap className="w-16 h-16 text-magenta-400 mx-auto mb-4" />
              <h3 className="text-2xl font-black mb-4 text-magenta-400">⚡ TECNOLOGIA EMS ESCLUSIVA</h3>
              <p className="text-gray-200 mb-4 font-semibold">
                <strong className="text-white">🎯 20 MINUTI = 3 ORE di palestra tradizionale.</strong> 
                L'EMS attiva <span className="text-magenta-400 font-bold">300+ MUSCOLI</span> simultaneamente, 
                bruciando il <span className="text-viola-400 font-bold">30% DI CALORIE IN PIÙ</span>.
              </p>
              <div className="text-magenta-400 font-bold text-sm">
                ✅ Risultati 3X più veloci ✅ Solo 2 sedute/settimana ✅ Zero spreco di tempo
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-2xl text-center hover:from-viola-900/30 hover:to-blu-900/30 transition-all duration-300 transform hover:scale-105 border border-viola-600/30">
              <Heart className="w-16 h-16 text-viola-400 mx-auto mb-4" />
              <h3 className="text-2xl font-black mb-4 text-viola-400">🧬 PANCAFIT PER MAL DI SCHIENA</h3>
              <p className="text-gray-200 mb-4 font-semibold">
                <strong className="text-white">🎯 95% DI SUCCESSO</strong> nell'eliminare il mal di schiena cronico. 
                <span className="text-viola-400 font-bold">METODO ESCLUSIVO</span> a Legnago per 
                <span className="text-blu-400 font-bold"> RIALLINEAMENTO POSTURALE</span> definitivo.
              </p>
              <div className="text-viola-400 font-bold text-sm">
                ✅ Addio al dolore cronico ✅ Postura corretta ✅ Benessere duraturo
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-8 rounded-2xl text-center hover:from-blu-900/30 hover:to-magenta-900/30 transition-all duration-300 transform hover:scale-105 border border-blu-600/30">
              <Target className="w-16 h-16 text-blu-400 mx-auto mb-4" />
              <h3 className="text-2xl font-black mb-4 text-blu-400">🎯 PERSONAL TRAINING D'ÉLITE</h3>
              <p className="text-gray-200 mb-4 font-semibold">
                <strong className="text-white">🏆 I MIGLIORI SPECIALISTI</strong> di Legnago. 
                Laureati in Scienze Motorie con <span className="text-blu-400 font-bold">TRACK RECORD COMPROVATO</span>: 
                <span className="text-magenta-400 font-bold"> 500+ TRASFORMAZIONI</span> documentate.
              </p>
              <div className="text-blu-400 font-bold text-sm">
                ✅ Specialisti certificati ✅ Metodo scientifico ✅ Risultati misurabili
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section con colori brand */}
      <section className="py-20 bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              📊 I NUMERI CHE DIMOSTRANO LA NOSTRA <span className="text-yellow-300">ECCELLENZA</span>
            </h2>
            <p className="text-lg md:text-xl font-semibold opacity-95 max-w-3xl mx-auto">
              <strong>🚫 NON PROMETTIAMO MIRACOLI.</strong> Ti mostriamo <span className="text-yellow-300 font-black">RISULTATI CONCRETI</span>, 
              ottenuti da <strong>PERSONE VERE</strong> che hanno scelto di cambiare la loro vita con noi.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 text-yellow-300">500+</div>
              <div className="text-lg md:text-xl font-bold">📈 Trasformazioni Completate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 text-yellow-300">95%</div>
              <div className="text-lg md:text-xl font-bold">🎯 Tasso di Successo</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 text-yellow-300">-5kg</div>
              <div className="text-lg md:text-xl font-bold">⚡ Media Perdita Peso (30gg)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-2 text-yellow-300">5</div>
              <div className="text-lg md:text-xl font-bold">👨‍⚕️ Specialisti Certificati</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section finale ottimizzata */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-5xl mx-auto text-center px-4">
          <Star className="w-16 h-16 text-magenta-400 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 font-heading">
            🚀 SEI PRONTO A VEDERE IL <span className="text-magenta-400">CAMBIAMENTO</span> 
            <span className="text-viola-400 block md:inline"> CHE HAI SEMPRE SOGNATO?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-semibold">
            <strong className="text-magenta-400">🚫 BASTA SCUSE, BASTA RIMANDARE.</strong> 
            Oggi puoi iniziare il percorso che in <span className="text-viola-400 font-black">30 GIORNI</span> 
            ti farà guardare allo specchio con <span className="text-blu-400 font-black">ORGOGLIO</span>.
          </p>
          
          <div className="bg-gradient-to-r from-magenta-900/50 to-viola-900/50 p-8 rounded-2xl border-2 border-magenta-600/50 mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-magenta-400 mb-4">
              🎁 OFFERTA ESCLUSIVA LIMITATA - PRIMI 10 CLIENTI
            </h3>
            <p className="text-lg md:text-xl text-gray-200 mb-4 font-semibold">
              <strong className="text-white">🆓 CHECK-UP COMPLETO GRATUITO</strong> (valore €80) + 
              <strong className="text-viola-400"> PRIMA SEDUTA DI PROVA</strong> + 
              <strong className="text-blu-400"> PIANO PERSONALIZZATO</strong>
            </p>
            <p className="text-magenta-400 font-black text-xl">
              ✅ ZERO IMPEGNO • RISULTATI GARANTITI • CONSULENZA 1-to-1
            </p>
          </div>
          
          <Link to="/contatti" className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white px-8 py-4 rounded-full text-xl md:text-2xl font-black transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center animate-pulse-glow">
            🎯 PRENOTA ORA LA TUA TRASFORMAZIONE GRATUITA
          </Link>
          
          <p className="text-sm md:text-base text-gray-400 mt-6 font-semibold">
            ⏰ <span className="text-magenta-400 font-bold">POSTI LIMITATI</span> - 
            Solo <span className="text-viola-400 font-bold">10 CONSULENZE GRATUITE</span> questo mese
          </p>
        </div>
      </section>
    </div>;
};
export default Index;