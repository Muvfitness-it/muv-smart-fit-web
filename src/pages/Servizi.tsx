import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Dumbbell, Heart, Zap, Users, Target, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

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

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://muvsmartfit.it/servizi');

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Servizi Fitness a Legnago | MUV Smart Fit' },
      { property: 'og:description', content: 'Personal trainer, EMS, Pilates Reformer, Pancafit e consulenza nutrizionale a Legnago. Prenota una prova gratuita!' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://muvsmartfit.it/servizi' },
      { property: 'og:image', content: 'https://muvsmartfit.it/og-image-servizi.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'it_IT' }
    ];

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
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Servizi Fitness a Legnago | MUV Smart Fit' },
      { name: 'twitter:description', content: 'Scopri tutti i servizi fitness di MUV Smart Fit a Legnago e prenota la tua prova gratuita!' },
      { name: 'twitter:image', content: 'https://muvsmartfit.it/og-image-servizi.jpg' }
    ];

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

  const servizi = [
    {
      icon: <Dumbbell className="w-12 h-12 text-pink-600 mb-4" aria-label="Icona allenamento personal trainer Legnago" />,
      title: "Personal Training Esclusivo",
      subtitle: "Risultati garantiti in 30 giorni",
      description: "Allenamenti 1-to-1 completamente personalizzati. Ambiente riservato, zero code, massima attenzione. I nostri clienti perdono mediamente 3-5kg al mese.",
      benefits: "✓ Programma su misura ✓ Ambiente esclusivo ✓ Risultati misurabili"
    },
    {
      icon: <Zap className="w-12 h-12 text-purple-500 mb-4" aria-label="Icona tecnologia EMS Legnago" />,
      title: "Tecnologia EMS Avanzata",
      subtitle: "20 minuti = 3 ore di palestra tradizionale",
      description: "Elettrostimolazione muscolare che attiva oltre 300 muscoli contemporaneamente. Bruci il 30% di calorie in più rispetto all'allenamento tradizionale. L'allenamento EMS a Legnago ideale per chi ha poco tempo e vuole risultati rapidi.",
      benefits: "✓ Tempi ridotti ✓ Risultati amplificati ✓ Tonificazione rapida"
    },
    {
      icon: <Heart className="w-12 h-12 text-blue-500 mb-4" aria-label="Icona Pancafit mal di schiena Legnago" />,
      title: "Pancafit per Mal di Schiena",
      subtitle: "95% di successo nel eliminare i dolori",
      description: "Metodo specifico per riallineamento posturale e risoluzione definitiva del mal di schiena cronico. Tecnica esclusiva a Legnago.",
      benefits: "✓ Addio al dolore ✓ Postura corretta ✓ Benessere duraturo"
    },
    {
      icon: <Star className="w-12 h-12 text-purple-500 mb-4" aria-label="Icona Pilates Reformer Legnago" />,
      title: "Pilates con Reformer",
      subtitle: "Metodo originale Pilates su macchinari professionali",
      description: "Lezioni individuali e small group su Reformer professionale. Tonificazione profonda, flessibilità, core stability e riabilitazione posturale. Ideale per donne che vogliono un corpo snello e tonico.",
      benefits: "✓ Tonificazione profonda ✓ Flessibilità aumentata ✓ Postura perfetta"
    },
    {
      icon: <Users className="w-12 h-12 text-pink-600 mb-4" aria-label="Icona small group training Legnago" />,
      title: "Small Group Training",
      subtitle: "Massimo 3 persone per sessione",
      description: "L'energia del gruppo con l'attenzione del personal trainer. Perfetto per chi vuole socializzare mantenendo la qualità dell'allenamento.",
      benefits: "✓ Motivazione di gruppo ✓ Costi ridotti ✓ Attenzione personalizzata"
    },
    {
      icon: <Target className="w-12 h-12 text-purple-500 mb-4" aria-label="Icona consulenza nutrizionale Legnago" />,
      title: "Consulenza Nutrizionale",
      subtitle: "Piani alimentari che funzionano davvero",
      description: "Strategie nutrizionali semplici e sostenibili. Non diete estreme, ma abitudini che mantieni per sempre. Focus su risultati a lungo termine.",
      benefits: "✓ Approccio sostenibile ✓ Educazione alimentare ✓ Supporto continuo"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              SERVIZI FITNESS INNOVATIVI A{" "}
              <span className="text-pink-600">LEGNAGO</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              <strong>Ogni servizio è progettato per un obiettivo specifico:</strong> dimagrimento rapido, 
              eliminazione del mal di schiena, tonificazione muscolare con Pilates reformer. 
              <span className="text-pink-400">Scegli quello che fa per te.</span>
            </p>
          </header>
          
          <h2 className="text-3xl font-semibold text-white mt-12 mb-4">
            Allenamenti personalizzati per dimagrimento, postura e benessere a Legnago
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {servizi.map((servizio, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-pink-600 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center">{servizio.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{servizio.title}</h3>
                  <p className="text-pink-400 font-semibold mb-4 text-sm">{servizio.subtitle}</p>
                  <p className="text-gray-300 leading-relaxed mb-4">{servizio.description}</p>
                  <div className="text-sm text-green-400 font-medium">
                    {servizio.benefits}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pilates Section */}
          <section className="mb-20 bg-gradient-to-r from-purple-600/10 via-pink-500/10 to-blue-500/10 p-8 rounded-lg border border-purple-600/20">
            <h2 className="text-4xl font-bold text-center text-white mb-8">
              Pilates con Reformer a <span className="text-purple-400">Legnago</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Il Metodo Pilates Originale su Macchinari Professionali</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  <strong>Scopri il vero Pilates</strong> con lezioni individuali e small group su Reformer professionale. 
                  Il nostro studio è l'unico a Legnago con macchinari certificati per un allenamento sicuro ed efficace.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-green-400">
                    <span className="mr-2">✓</span>
                    <span><strong>Tonificazione profonda:</strong> Addominali, glutei e braccia scolpiti</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <span className="mr-2">✓</span>
                    <span><strong>Flessibilità aumentata:</strong> Muscoli più lunghi e snelli</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <span className="mr-2">✓</span>
                    <span><strong>Postura perfetta:</strong> Addio a mal di schiena e tensioni</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <span className="mr-2">✓</span>
                    <span><strong>Core stability:</strong> Addome forte e stabile</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gray-800 p-6 rounded-lg border border-purple-500/30">
                  <h4 className="text-xl font-bold text-white mb-4">Perfetto per:</h4>
                  <ul className="text-gray-300 space-y-2 text-left">
                    <li>• Donne che vogliono tonificare senza "ingrossare"</li>
                    <li>• Chi soffre di mal di schiena cronico</li>
                    <li>• Atleti che vogliono migliorare performance</li>
                    <li>• Over 50 che cercano un movimento sicuro</li>
                    <li>• Riabilitazione post-infortunio</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-pink-600/20 via-purple-500/20 to-blue-500/20 p-8 rounded-lg border border-pink-600/30">
            <h2 className="text-3xl font-bold text-white mb-4">
              Non Sai Quale Servizio Scegliere?
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              <strong>Prenota una consulenza gratuita</strong> e scopriremo insieme il percorso perfetto per i tuoi obiettivi. 
              Zero impegno, massima chiarezza.
            </p>
            <Link to="/contatti">
              <Button 
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                aria-label="Prenota consulenza gratuita servizi fitness Legnago"
              >
                Prenota la tua consulenza gratuita nel centro MUV a Legnago
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servizi;
