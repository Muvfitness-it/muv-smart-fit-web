import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ChiSiamo = () => {
  // Meta tag SEO ottimizzati per la pagina chi siamo
  useEffect(() => {
    // Title
    document.title = "Chi Siamo – MUV Smart Fit | Centro Fitness Legnago";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Scopri il team di MUV Smart Fit a Legnago: personal trainer certificati, esperienza, passione e metodo scientifico. Vieni a conoscerci!');
    }

    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'chi siamo MUV Smart Fit, team personal trainer Legnago, centro fitness Legnago, metodo scientifico, allenamento personalizzato, personal trainer Verona');

    // Meta author
    let metaAuthor = document.querySelector('meta[name="author"]');
    if (!metaAuthor) {
      metaAuthor = document.createElement('meta');
      metaAuthor.setAttribute('name', 'author');
      document.head.appendChild(metaAuthor);
    }
    metaAuthor.setAttribute('content', 'MUV Smart Fit');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://muvsmartfit.it/chi-siamo');

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Chi Siamo – MUV Smart Fit Legnago' },
      { property: 'og:description', content: 'Conosci il nostro team di personal trainer certificati e la nostra filosofia. Metodo scientifico, passione e professionalità al centro MUV Smart Fit.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://muvsmartfit.it/chi-siamo' },
      { property: 'og:image', content: 'https://muvsmartfit.it/og-image-chi-siamo.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'it_IT' },
      { property: 'og:site_name', content: 'MUV Smart Fit' }
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
      { name: 'twitter:title', content: 'Chi Siamo – MUV Smart Fit Legnago' },
      { name: 'twitter:description', content: 'Scopri i professionisti di MUV Smart Fit: metodo scientifico, personal training e passione a Legnago. Vieni a conoscerci!' },
      { name: 'twitter:image', content: 'https://muvsmartfit.it/og-image-chi-siamo.jpg' }
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              IL PRIMO CENTRO FITNESS{" "}
              <span className="text-pink-600">SMART</span>{" "}
              DI LEGNAGO
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              <strong>Non una palestra qualsiasi</strong>, ma l'evoluzione del fitness. 
              Dove scienza, tecnologia e passione si uniscono per trasformare il tuo corpo 
              <span className="text-pink-400"> in tempi da record</span>.
            </p>
          </header>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center"
                alt="Centro fitness MUV Smart Fit Legnago con tecnologie avanzate e ambiente esclusivo"
                className="rounded-lg shadow-xl w-full h-80 object-cover"
                loading="lazy"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-4">
                Perché Abbiamo Creato MUV Smart Fit
              </h2>
              
              <p className="text-xl leading-relaxed">
                <strong className="text-pink-400">Eravamo stanchi</strong> di vedere persone demotivate dalle palestre tradizionali. 
                Code infinite, ambienti rumorosi, risultati che non arrivano mai. 
                <span className="text-white font-semibold"> Così abbiamo creato qualcosa di completamente diverso.</span>
              </p>
              
              <p className="text-lg leading-relaxed text-gray-300">
                <strong>MUV Smart Fit è il primo centro a Legnago</strong> che unisce tecnologie innovative 
                (EMS, Pancafit, analisi corporea avanzata) con l'attenzione esclusiva del personal training 1-to-1. 
                <span className="text-pink-400">Zero distrazioni, massimi risultati.</span>
              </p>
              
              <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-pink-600">
                <h3 className="text-xl font-bold text-white mb-3">La Nostra Promessa</h3>
                <p className="text-lg leading-relaxed text-gray-300">
                  <strong>Se in 30 giorni non vedi risultati concreti</strong> - perdita di peso, 
                  miglioramento posturale, aumento della forza - 
                  <span className="text-pink-400"> ti rimborsiamo completamente</span>. 
                  Questa è la fiducia che abbiamo nel nostro metodo.
                </p>
              </div>
              
              <Link to="/team">
                <Button 
                  className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                  aria-label="Scopri il team di personal trainer specializzati MUV Smart Fit"
                >
                  Conosci i Nostri Specialisti
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChiSiamo;
