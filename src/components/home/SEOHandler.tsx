import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';
import DynamicSitemap from '@/components/SEO/DynamicSitemap';

const SEOHandler: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // SEO data based on current route
  const getSEOData = () => {
    const baseUrl = 'https://www.muvfitness.it';
    
    switch (currentPath) {
      case '/':
        return {
          title: 'MUV Fitness Rimini - Centro Fitness & Personal Training | Trasformazione in 30 Giorni',
          description: 'Centro fitness a Rimini specializzato in personal training, EMS, Pilates, HIIT e nutrizione. Trasforma il tuo corpo in 30 giorni con i nostri programmi personalizzati.',
          keywords: 'fitness rimini, personal training rimini, EMS allenamento, pilates rimini, palestra rimini, dimagrimento, tonificazione muscolare',
          canonical: baseUrl,
          ogType: 'website'
        };
      case '/servizi':
        return {
          title: 'Servizi Fitness MUV Rimini - Personal Training, EMS, Pilates, Nutrizione',
          description: 'Scopri tutti i servizi MUV Fitness: Personal Training, EMS, Pilates, HIIT, Consulenza Nutrizionale e molto altro. Programmi personalizzati per ogni obiettivo.',
          keywords: 'servizi fitness, personal training, EMS, pilates, HIIT, nutrizione sportiva, massoterapia, pancafit',
          canonical: `${baseUrl}/servizi`,
          ogType: 'website'
        };
      case '/contatti':
        return {
          title: 'Contatti MUV Fitness Rimini - Prenota la Tua Consulenza Gratuita',
          description: 'Contatta MUV Fitness Rimini per prenotare la tua consulenza gratuita. Siamo in Via del Fitness 123, Rimini. Tel: 0541-123456',
          keywords: 'contatti muv fitness, palestra rimini contatti, prenota consulenza fitness',
          canonical: `${baseUrl}/contatti`,
          ogType: 'website'
        };
      case '/blog':
        return {
          title: 'Blog Fitness MUV - Consigli su Allenamento, Nutrizione e Benessere',
          description: 'Leggi il blog MUV Fitness con articoli professionali su allenamento, nutrizione e benessere. Consigli pratici dai nostri esperti.',
          keywords: 'blog fitness, consigli allenamento, nutrizione sportiva, benessere, articoli fitness',
          canonical: `${baseUrl}/blog`,
          ogType: 'website'
        };
      case '/chi-siamo':
        return {
          title: 'Chi Siamo - MUV Fitness Rimini | Il Nostro Team e la Nostra Missione',
          description: 'Scopri chi siamo: il team MUV Fitness, la nostra storia e la missione di trasformare la vita delle persone attraverso il fitness.',
          keywords: 'chi siamo muv fitness, team fitness rimini, storia palestra rimini',
          canonical: `${baseUrl}/chi-siamo`,
          ogType: 'website'
        };
      case '/muv-planner':
        return {
          title: 'MUV Planner - Pianificatore Pasti Personalizzato con IA',
          description: 'Crea piani alimentari personalizzati con il nostro MUV Planner. Intelligenza artificiale per una nutrizione ottimale.',
          keywords: 'pianificatore pasti, dieta personalizzata, nutrizione IA, piano alimentare',
          canonical: `${baseUrl}/muv-planner`,
          ogType: 'website'
        };
      default:
        return {
          title: 'MUV Fitness Rimini - Centro Fitness Professionale',
          description: 'Centro fitness professionale a Rimini con servizi personalizzati per il tuo benessere.',
          keywords: 'fitness rimini, palestra rimini, benessere',
          canonical: `${baseUrl}${currentPath}`,
          ogType: 'website'
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
        <meta name="geo.region" content="IT-45" />
        <meta name="geo.placename" content="Rimini" />
        <meta name="geo.position" content="44.0678;12.5695" />
        <meta name="ICBM" content="44.0678, 12.5695" />

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
      </Helmet>
      
      {/* Include structured data components */}
      <LocalBusinessSchema />
      <DynamicSitemap />
    </>
  );
};

export default SEOHandler;