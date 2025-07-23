import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Dumbbell, Heart, Zap, Users, Target, Star, ArrowRight, Brain, HandHeart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Servizi = () => {
  // Meta tag SEO ottimizzati per la pagina servizi
  useEffect(() => {
    // Title
    document.title = "Servizi Fitness a Legnago | Personal Trainer, Pilates, EMS – MUV Smart Fit";

    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Scopri i servizi fitness di MUV Smart Fit a Legnago: personal training, EMS, Pilates Reformer, Pancafit e consulenza nutrizionale. Prova gratuita disponibile.');
    }

    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'servizi fitness legnago, personal trainer legnago, allenamento EMS, pilates Legnago, pancafit mal di schiena, consulenza nutrizionale Legnago');

    // Meta robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'index, follow');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.muvfitness.it/servizi');

    // Open Graph tags
    const ogTags = [{
      property: 'og:title',
      content: 'Servizi Fitness a Legnago | MUV Smart Fit'
    }, {
      property: 'og:description',
      content: 'Personal trainer, EMS, Pilates Reformer, Pancafit e consulenza nutrizionale e Coaching psicologico a Legnago. Prenota una prova gratuita!'
    }, {
      property: 'og:type',
      content: 'website'
    }, {
      property: 'og:url',
      content: 'https://www.muvfitness.it/servizi'
    }, {
      property: 'og:image',
      content: 'https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png'
    }, {
      property: 'og:image:width',
      content: '1200'
    }, {
      property: 'og:image:height',
      content: '630'
    }, {
      property: 'og:locale',
      content: 'it_IT'
    }];
    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });

    // Twitter Card tags
    const twitterTags = [{
      name: 'twitter:card',
      content: 'summary_large_image'
    }, {
      name: 'twitter:title',
      content: 'Servizi Fitness a Legnago | MUV Fitness'
    }, {
      name: 'twitter:description',
      content: 'Scopri tutti i servizi fitness di MUV a Legnago e prenota la tua prova gratuita!'
    }, {
      name: 'twitter:image',
      content: 'https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png'
    }];
    twitterTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', tag.name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
  }, []);
  const servizi = [{
    icon: <Dumbbell className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-pink-600 mb-3 sm:mb-4" aria-label="Icona personal trainer Legnago" />,
    title: "Personal Training Esclusivo",
    subtitle: "Servizio sempre disponibile - Risultati garantiti",
    description: "Allenamenti 1-to-1 completamente personalizzati. Ambiente riservato, zero code, massima attenzione. I nostri clienti perdono mediamente 3-5kg al mese.",
    benefits: "✓ Programma su misura ✓ Ambiente esclusivo ✓ Risultati misurabili",
    link: "/servizi/personal-training"
  }, {
    icon: <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-500 mb-3 sm:mb-4" aria-label="Icona tecnologie EMS Legnago" />,
    title: "EMS + Tecnologie Recupero",
    subtitle: "EMS, Vacuum, Roll Shape, Pressoterapia",
    description: "Elettrostimolazione che attiva oltre 300 muscoli + tecnologie avanzate per il recupero. Allenamento e recupero ottimale in un'unica soluzione.",
    benefits: "✓ 20 min = 3h palestra ✓ Recupero accelerato ✓ Tecnologie innovative",
    link: "/servizi/ems"
  }, {
    icon: <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-500 mb-3 sm:mb-4" aria-label="Icona Pancafit mal di schiena Legnago" />,
    title: "Pancafit per il Mal di Schiena",
    subtitle: "95% di successo nell'eliminare i dolori",
    description: "Metodo specifico per riallineamento posturale e risoluzione definitiva del mal di schiena cronico. Tecnica esclusiva a Legnago.",
    benefits: "✓ Addio al dolore ✓ Postura corretta ✓ Benessere duraturo",
    link: "/servizi/pancafit"
  }, {
    icon: <Star className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-500 mb-3 sm:mb-4" aria-label="Icona Pilates Reformer Legnago" />,
    title: "Pilates con Reformer",
    subtitle: "Metodo originale su macchinari professionali",
    description: "Lezioni individuali e small group su Reformer professionale. Tonificazione profonda, flessibilità, core stability e riabilitazione posturale.",
    benefits: "✓ Tonificazione profonda ✓ Flessibilità aumentata ✓ Postura perfetta",
    link: "/servizi/pilates"
  }, {
    icon: <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-orange-500 mb-3 sm:mb-4" aria-label="Icona HIIT Legnago" />,
    title: "Allenamento HIIT",
    subtitle: "Cardio e performance ad alta intensità",
    description: "Allenamento ad intervalli ad alta intensità per massimizzare il consumo calorico e migliorare le performance. Risultati rapidi e duraturi.",
    benefits: "✓ Brucia grassi 24h ✓ Resistenza aumentata ✓ Performance atletiche",
    link: "/servizi/hiit"
  }, {
    icon: <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-orange-600 mb-3 sm:mb-4" aria-label="Icona HIIT small group Legnago" />,
    title: "HIIT Small Group",
    subtitle: "Alta intensità in piccoli gruppi - Max 3 persone",
    description: "L'energia del HIIT con la motivazione del gruppo. Perfetto per chi ama le sfide e vuole divertirsi allenandosi con altri.",
    benefits: "✓ Motivazione di gruppo ✓ HIIT personalizzato ✓ Divertimento garantito",
    link: "/servizi/small-group"
  }, {
    icon: <Target className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-500 mb-3 sm:mb-4" aria-label="Icona consulenza nutrizionale Legnago" />,
    title: "Nutrizionista",
    subtitle: "Piani alimentari che funzionano davvero",
    description: "Strategie nutrizionali semplici e sostenibili. Non diete estreme, ma abitudini che mantieni per sempre. Focus su risultati a lungo termine.",
    benefits: "✓ Approccio sostenibile ✓ Educazione alimentare ✓ Supporto continuo",
    link: "/servizi/nutrizione"
  }, {
    icon: <Brain className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-600 mb-3 sm:mb-4" aria-label="Icona psicologo Legnago" />,
    title: "Coaching Psicologico",
    subtitle: "Supporto mentale per i tuoi obiettivi",
    description: "Psicologo specializzato in sport e benessere. Supera blocchi mentali, costruisci abitudini durature e mantieni la motivazione alta.",
    benefits: "✓ Superamento blocchi ✓ Motivazione costante ✓ Abitudini solide",
    link: "/servizi/psicologo"
  }, {
    icon: <HandHeart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-500 mb-3 sm:mb-4" aria-label="Icona massoterapia Legnago" />,
    title: "Massoterapia",
    subtitle: "Recupero e benessere totale",
    description: "Massaggi terapeutici, decontratturanti e rilassanti. Accelera il recupero, riduci le tensioni e regala benessere al tuo corpo.",
    benefits: "✓ Recupero accelerato ✓ Riduzione tensioni ✓ Benessere completo",
    link: "/servizi/massoterapia"
  }];
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              CENTRO FITNESS COMPLETO A{" "}
              <span className="text-pink-600 block sm:inline">LEGNAGO</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              <strong>9 servizi specializzati per ogni tuo obiettivo:</strong> dimagrimento, postura, performance, 
              recupero e benessere totale. <span className="text-pink-400">Personal Training sempre disponibile</span> 
              come servizio core del centro.
            </p>
          </header>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mt-8 sm:mt-12 mb-3 sm:mb-4 px-2">
            Tutti i servizi per trasformare il tuo corpo e la tua mente
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {servizi.map((servizio, index) => (
              <Link to={servizio.link} key={index} className="group">
                <Card className="bg-gray-800 border-gray-700 hover:border-pink-600 transition-all duration-300 transform hover:scale-105 h-full">
                  <CardContent className="p-4 sm:p-6 text-center h-full flex flex-col">
                    <div className="flex justify-center">{servizio.icon}</div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">{servizio.title}</h3>
                    <p className="text-pink-400 font-semibold mb-3 sm:mb-4 text-xs sm:text-sm">{servizio.subtitle}</p>
                    <p className="text-gray-300 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base flex-grow">{servizio.description}</p>
                    <div className="text-xs sm:text-sm text-green-400 font-medium mb-4">
                      {servizio.benefits}
                    </div>
                    <div className="flex items-center justify-center text-pink-400 group-hover:text-white transition-colors">
                      <span className="mr-2 font-semibold">Scopri di più</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Service Categories */}
          <section className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-8 sm:mb-12 px-2">
              Servizi Organizzati per <span className="text-purple-400">Categoria</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-gradient-to-br from-pink-600/20 to-purple-500/20 p-6 rounded-lg border border-pink-600/30">
                <h3 className="text-xl font-bold text-pink-400 mb-4">Allenamento</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Personal Training</li>
                  <li>• HIIT Individual</li>
                  <li>• HIIT Small Group</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-500/20 p-6 rounded-lg border border-purple-600/30">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Tecnologie</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• EMS</li>
                  <li>• Vacuum Therapy</li>
                  <li>• Roll Shape</li>
                  <li>• Pressoterapia</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-600/20 to-green-500/20 p-6 rounded-lg border border-blue-600/30">
                <h3 className="text-xl font-bold text-blue-400 mb-4">Postura & Movimento</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Pancafit</li>
                  <li>• Pilates Reformer</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-600/20 to-teal-500/20 p-6 rounded-lg border border-green-600/30">
                <h3 className="text-xl font-bold text-green-400 mb-4">Benessere</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Nutrizionista</li>
                  <li>• Coaching Psicologico</li>
                  <li>• Massoterapia</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-pink-600/20 via-purple-500/20 to-blue-500/20 p-6 sm:p-8 rounded-lg border border-pink-600/30">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 px-2">
              Non Sai Quale Servizio Scegliere?
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 px-2 leading-relaxed">
              <strong>Prenota una consulenza gratuita</strong> e scopriremo insieme il percorso perfetto per i tuoi obiettivi. 
              Con 9 servizi specializzati, abbiamo la soluzione per ogni esigenza.
            </p>
            <div className="flex justify-center">
              <Link to="/contatti">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base rounded-full transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center whitespace-nowrap" aria-label="Prenota consulenza gratuita servizi fitness Legnago">
                  Prenota una Consulenza Gratuita
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servizi;
