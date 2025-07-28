
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';
import DynamicSitemap from '@/components/SEO/DynamicSitemap';
import CrawlerOptimizer from '@/components/SEO/CrawlerOptimizer';
import StaticContentGenerator from '@/components/SEO/StaticContentGenerator';

const SEOHandler: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // SEO data based on current route
  const getSEOData = () => {
    const baseUrl = 'https://www.muvfitness.it';
    
    switch (currentPath) {
      case '/':
        return {
          title: 'MUV Fitness Legnago - Centro Fitness & Personal Training | Trasformazione in 30 Giorni',
          description: 'Centro fitness a Legnago specializzato in personal training, EMS, Pilates, HIIT e nutrizione. Trasforma il tuo corpo in 30 giorni con i nostri programmi personalizzati.',
          keywords: 'fitness legnago, personal training legnago, EMS allenamento, pilates legnago, palestra legnago, dimagrimento, tonificazione muscolare',
          canonical: baseUrl,
          ogType: 'website',
          pageType: 'home' as const,
          content: 'MUV Fitness è un centro fitness esclusivo a Legnago che offre personal training, tecnologie avanzate come EMS, Pilates, HIIT, consulenza nutrizionale e supporto completo per il benessere. Il nostro approccio personalizzato ti aiuta a raggiungere i tuoi obiettivi di fitness in modo efficace e sicuro.',
          services: ['Personal Training', 'EMS Training', 'Pilates', 'HIIT', 'Consulenza Nutrizionale', 'Pancafit', 'Massoterapia']
        };
      case '/servizi':
        return {
          title: 'Servizi Fitness MUV Legnago - Personal Training, EMS, Pilates, Nutrizione',
          description: 'Scopri tutti i servizi MUV Fitness: Personal Training, EMS, Pilates, HIIT, Consulenza Nutrizionale e molto altro. Programmi personalizzati per ogni obiettivo.',
          keywords: 'servizi fitness, personal training, EMS, pilates, HIIT, nutrizione sportiva, massoterapia, pancafit',
          canonical: `${baseUrl}/servizi`,
          ogType: 'website',
          pageType: 'servizi' as const,
          content: 'I nostri servizi specializzati includono personal training one-to-one, allenamento EMS, Pilates, HIIT, small group training, consulenza nutrizionale, Pancafit, massoterapia e supporto psicologico. Ogni servizio è personalizzato per i tuoi obiettivi specifici.',
          services: ['Personal Training', 'EMS Training', 'Pilates', 'HIIT', 'Small Group', 'Consulenza Nutrizionale', 'Pancafit', 'Massoterapia', 'Supporto Psicologico']
        };
      case '/contatti':
        return {
          title: 'Contatti MUV Fitness Legnago - Prenota la Tua Consulenza Gratuita',
          description: 'Contatta MUV Fitness Legnago per prenotare la tua consulenza gratuita. Siamo in Via Venti Settembre 5/7, Legnago. Tel: 3291070374',
          keywords: 'contatti muv fitness, palestra legnago contatti, prenota consulenza fitness',
          canonical: `${baseUrl}/contatti`,
          ogType: 'website',
          pageType: 'contatti' as const,
          content: 'Prenota la tua consulenza gratuita presso MUV Fitness Legnago. Siamo aperti dal lunedì al venerdì dalle 08:00 alle 21:00 e il sabato dalle 08:00 alle 12:00. Contattaci per scoprire come possiamo aiutarti a raggiungere i tuoi obiettivi di fitness.',
          services: []
        };
      case '/blog':
        return {
          title: 'Blog Fitness MUV - Consigli su Allenamento, Nutrizione e Benessere',
          description: 'Leggi il blog MUV Fitness con articoli professionali su allenamento, nutrizione e benessere. Consigli pratici dai nostri esperti.',
          keywords: 'blog fitness, consigli allenamento, nutrizione sportiva, benessere, articoli fitness',
          canonical: `${baseUrl}/blog`,
          ogType: 'website',
          pageType: 'blog' as const,
          content: 'Il nostro blog offre articoli professionali su fitness, nutrizione, benessere e salute. I nostri esperti condividono consigli pratici per migliorare il tuo stile di vita e raggiungere i tuoi obiettivi di benessere.',
          services: []
        };
      case '/chi-siamo':
        return {
          title: 'Chi Siamo - MUV Fitness Legnago | Il Nostro Team e la Nostra Missione',
          description: 'Scopri chi siamo: il team MUV Fitness, la nostra storia e la missione di trasformare la vita delle persone attraverso il fitness.',
          keywords: 'chi siamo muv fitness, team fitness legnago, storia palestra legnago',
          canonical: `${baseUrl}/chi-siamo`,
          ogType: 'website',
          pageType: 'chi-siamo' as const,
          content: 'MUV Fitness è un centro fitness esclusivo a Legnago con un team di professionisti qualificati. La nostra missione è aiutare le persone a raggiungere i loro obiettivi di fitness attraverso un approccio personalizzato e olistico al benessere.',
          services: []
        };
      case '/risultati':
        return {
          title: 'Risultati Clienti MUV Fitness Legnago - Testimonianze e Trasformazioni Reali',
          description: 'Scopri i risultati reali dei nostri clienti: dimagrimento, tonificazione, risoluzione mal di schiena. Testimonianze verificate e trasformazioni documentate.',
          keywords: 'risultati fitness legnago, testimonianze palestra, trasformazioni clienti muv, prima dopo fitness',
          canonical: `${baseUrl}/risultati`,
          ogType: 'website',
          pageType: 'home' as const,
          content: 'I nostri clienti hanno ottenuto risultati straordinari: dimagrimento, tonificazione, risoluzione di problemi posturali e mal di schiena. Testimonianze reali di trasformazioni documentate presso MUV Fitness Legnago.',
          services: []
        };
      case '/team':
        return {
          title: 'Team MUV Fitness Legnago - Personal Trainer Certificati e Specialisti',
          description: 'Conosci il nostro team di personal trainer certificati, specialisti in EMS, Pancafit, Pilates e nutrizione. I migliori professionisti di Legnago.',
          keywords: 'personal trainer legnago, team muv fitness, trainer certificati, specialisti fitness legnago',
          canonical: `${baseUrl}/team`,
          ogType: 'website',
          pageType: 'home' as const,
          content: 'Il team MUV Fitness è composto da personal trainer certificati e specialisti in diverse discipline: Christian Gioso (Pancafit), Serena Portici (EMS), Mauro Petterle, Thomas Gabrieli (massoterapia) e Susanna Isante (benessere olistico).',
          services: []
        };
      case '/muv-planner':
        return {
          title: 'MUV Planner - Pianificatore Pasti Personalizzato con IA',
          description: 'Crea piani alimentari personalizzati con il nostro MUV Planner. Intelligenza artificiale per una nutrizione ottimale.',
          keywords: 'pianificatore pasti, dieta personalizzata, nutrizione IA, piano alimentare',
          canonical: `${baseUrl}/muv-planner`,
          ogType: 'website',
          pageType: 'home' as const,
          content: 'MUV Planner è il nostro strumento avanzato per la creazione di piani alimentari personalizzati. Utilizzando l\'intelligenza artificiale, creiamo piani nutrizionali ottimali per i tuoi obiettivi di fitness e benessere.',
          services: []
        };
      default:
        return {
          title: 'MUV Fitness Legnago - Centro Fitness Professionale',
          description: 'Centro fitness professionale a Legnago con servizi personalizzati per il tuo benessere.',
          keywords: 'fitness legnago, palestra legnago, benessere',
          canonical: `${baseUrl}${currentPath}`,
          ogType: 'website',
          pageType: 'home' as const,
          content: 'MUV Fitness è un centro fitness professionale a Legnago che offre servizi personalizzati per il tuo benessere e la tua forma fisica.',
          services: []
        };
    }
  };

  const seoData = getSEOData();

  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href={seoData.canonical} />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Open Graph */}
        <meta property="og:site_name" content="MUV Fitness" />
        <meta property="og:type" content={seoData.ogType} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:image" content="https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="it_IT" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@muvfitness" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content="https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" />

        {/* Additional meta tags */}
        <meta name="author" content="MUV Fitness" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="it" />
        <meta name="geo.region" content="IT-34" />
        <meta name="geo.placename" content="Legnago" />
        <meta name="geo.position" content="45.1906;11.2994" />
        <meta name="ICBM" content="45.1906, 11.2994" />

        {/* Enhanced meta tags for better crawling */}
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Favicon and app icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" />
        
        {/* Hreflang for future internationalization */}
        <link rel="alternate" hrefLang="it" href={seoData.canonical} />
        <link rel="alternate" hrefLang="x-default" href={seoData.canonical} />
        
        {/* Additional structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "MUV Fitness",
            "url": "https://www.muvfitness.it",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.muvfitness.it/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      
      {/* Include new SEO components */}
      <CrawlerOptimizer
        title={seoData.title}
        description={seoData.description}
        content={seoData.content}
        services={seoData.services}
        location="Legnago"
      />
      
      <StaticContentGenerator
        pageType={seoData.pageType}
        additionalContent={seoData.content}
      />
      
      {/* Include existing structured data components */}
      <LocalBusinessSchema />
      <DynamicSitemap />
    </>
  );
};

export default SEOHandler;
