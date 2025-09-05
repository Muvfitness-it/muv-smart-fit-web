
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import CrawlerOptimizer from '@/components/SEO/CrawlerOptimizer';
import StructuredData from '@/components/SEO/StructuredData';
import AccessibilityEnhancer from '@/components/SEO/AccessibilityEnhancer';
// SEOAudit disabilitato in produzione


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
          canonical: `${baseUrl}/`,
          ogType: 'website',
          pageType: 'home' as const,
          content: 'MUV Fitness è un centro fitness esclusivo a Legnago che offre personal training, tecnologie avanzate come EMS, Pilates, HIIT, consulenza nutrizionale e supporto completo per il benessere. Il nostro approccio personalizzato ti aiuta a raggiungere i tuoi obiettivi di fitness in modo efficace e sicuro.',
          services: ['Personal Training', 'EMS Training', 'Pilates', 'HIIT', 'Consulenza Nutrizionale', 'Pancafit', 'Massoterapia']
        };
      
      case '/chi-siamo':
        return {
          title: 'Chi Siamo - MUV Smart Fit | La tua palestra a Legnago',
          description: 'Scopri MUV Smart Fit: il centro fitness innovativo a Legnago nato dalla passione per il benessere. Conosci la nostra filosofia e i nostri valori.',
          keywords: 'chi siamo muv legnago, centro fitness legnago storia, palestra legnago, filosofia fitness',
          canonical: `${baseUrl}/chi-siamo`,
          ogType: 'website',
          pageType: 'chi-siamo' as const,
          content: 'MUV Fitness è un centro fitness esclusivo a Legnago con un team di professionisti qualificati. La nostra missione è aiutare le persone a raggiungere i loro obiettivi di fitness attraverso un approccio personalizzato e olistico al benessere.',
          services: []
        };
      
      case '/servizi':
        return {
          title: 'Servizi Fitness | Personal Training, Nutrizione, Pilates - MUV Smart Fit Legnago',
          description: 'Scopri tutti i servizi del centro fitness MUV a Legnago: personal training, nutrizione personalizzata, pilates, pancafit, massoterapia e small group training.',
          keywords: 'servizi fitness legnago, personal training, nutrizione sportiva, pilates, pancafit, massoterapia, small group training, HIIT, EMS',
          canonical: `${baseUrl}/servizi`,
          ogType: 'website',
          pageType: 'servizi' as const,
          content: 'I nostri servizi specializzati includono personal training one-to-one, allenamento EMS, Pilates, HIIT, small group training, consulenza nutrizionale, Pancafit, massoterapia e supporto psicologico. Ogni servizio è personalizzato per i tuoi obiettivi specifici.',
          services: ['Personal Training', 'EMS Training', 'Pilates', 'HIIT', 'Small Group', 'Consulenza Nutrizionale', 'Pancafit', 'Massoterapia', 'Supporto Psicologico']
        };

      case '/servizi/personal-training':
        return {
          title: 'Personal Training Legnago | Allenamento Personalizzato - MUV Smart Fit',
          description: 'Personal training personalizzato a Legnago con MUV Smart Fit. Allenamenti su misura per raggiungere i tuoi obiettivi di fitness e benessere.',
          keywords: 'personal training legnago, allenamento personalizzato, personal trainer legnago, fitness individuale',
          canonical: `${baseUrl}/servizi/personal-training`,
          ogType: 'website',
          pageType: 'servizi' as const,
          content: 'Personal training personalizzato con i migliori trainer di Legnago.',
          services: ['Personal Training']
        };

      case '/servizi/nutrizione':
        return {
          title: 'Consulenza Nutrizionale Legnago | Dieta Personalizzata - MUV Smart Fit',
          description: 'Consulenza nutrizionale professionale a Legnago. Piani alimentari personalizzati per sportivi e benessere generale con MUV Smart Fit.',
          keywords: 'nutrizionista legnago, consulenza nutrizionale, dieta personalizzata, alimentazione sportiva',
          canonical: `${baseUrl}/servizi/nutrizione`,
          ogType: 'website',
          pageType: 'servizi' as const,
          content: 'Consulenza nutrizionale professionale con piani alimentari su misura.',
          services: ['Consulenza Nutrizionale']
        };

      case '/servizi/pilates':
        return {
          title: 'Pilates Legnago | Lezioni Individuali e Gruppo - MUV Smart Fit',
          description: 'Lezioni di Pilates a Legnago con istruttori qualificati. Migliora postura, flessibilità e forza con MUV Smart Fit.',
          keywords: 'pilates legnago, lezioni pilates, postura, flessibilità, core training',
          canonical: `${baseUrl}/servizi/pilates`,
          ogType: 'website',
          pageType: 'servizi' as const,
          content: 'Lezioni di Pilates con istruttori qualificati per migliorare postura e flessibilità.',
          services: ['Pilates']
        };

      case '/servizi/pancafit':
        return {
          title: 'Pancafit Legnago | Postura e Benessere - MUV Smart Fit',
          description: 'Trattamenti Pancafit a Legnago per migliorare la postura e ridurre dolori muscolari. Prenota la tua seduta con MUV Smart Fit.',
          keywords: 'pancafit legnago, postura, dolori muscolari, riequilibrio posturale',
          canonical: `${baseUrl}/servizi/pancafit`,
          ogType: 'website',
          pageType: 'servizi' as const,
          content: 'Trattamenti Pancafit per il riequilibrio posturale e il benessere.',
          services: ['Pancafit']
        };

      case '/servizi/massoterapia':
        return {
          title: 'Massoterapia Legnago | Massaggi Terapeutici - MUV Smart Fit',
          description: 'Massoterapia professionale a Legnago. Massaggi terapeutici e rilassanti per il recupero muscolare con MUV Smart Fit.',
          keywords: 'massoterapia legnago, massaggi terapeutici, recupero muscolare, rilassamento',
          canonical: `${baseUrl}/servizi/massoterapia`,
          ogType: 'website',
          pageType: 'servizi' as const,
          content: 'Massoterapia professionale per il recupero muscolare e il benessere.',
          services: ['Massoterapia']
        };

      case '/servizi/small-group':
        return {
          title: 'Small Group Training Legnago | Allenamento di Gruppo - MUV Smart Fit',
          description: 'Small Group Training a Legnago: allenamenti in piccoli gruppi per massima attenzione e risultati. Prenota con MUV Smart Fit.',
          keywords: 'small group training legnago, allenamento gruppo, fitness gruppo, training personalizzato',
          canonical: `${baseUrl}/servizi/small-group`,
          ogType: 'website',
          pageType: 'servizi' as const,
          content: 'Allenamenti in piccoli gruppi per massima attenzione e risultati.',
          services: ['Small Group Training']
        };

      case '/servizi/hiit':
        return {
          title: 'HIIT Training Legnago | Allenamento Intensivo - MUV Smart Fit',
          description: 'HIIT Training a Legnago: allenamenti ad alta intensità per bruciare grassi e migliorare la forma fisica con MUV Smart Fit.',
          keywords: 'hiit legnago, allenamento alta intensità, bruciare grassi, cardio fitness',
          canonical: `${baseUrl}/servizi/hiit`,
          ogType: 'website',
          pageType: 'servizi' as const,
          content: 'Allenamenti HIIT ad alta intensità per bruciare grassi e migliorare le performance.',
          services: ['HIIT']
        };

      case '/servizi/ems':
        return {
          title: 'EMS Training Legnago | Elettrostimolazione - MUV Smart Fit',
          description: 'EMS Training a Legnago: allenamento con elettrostimolazione per risultati rapidi ed efficaci. Scopri il futuro del fitness con MUV Smart Fit.',
          keywords: 'ems legnago, elettrostimolazione, allenamento elettrico, fitness innovativo',
          canonical: `${baseUrl}/servizi/ems`,
          ogType: 'website',
          pageType: 'servizi' as const,
          content: 'EMS Training con elettrostimolazione per risultati rapidi ed efficaci.',
          services: ['EMS Training']
        };

      case '/servizi/psicologo':
        return {
          title: 'Supporto Psicologico Sportivo Legnago - MUV Smart Fit',
          description: 'Supporto psicologico per sportivi a Legnago. Migliora le performance mentali e raggiungi i tuoi obiettivi con MUV Smart Fit.',
          keywords: 'psicologo sportivo legnago, supporto psicologico, performance mentale, motivazione sportiva',
          canonical: `${baseUrl}/servizi/psicologo`,
          ogType: 'website',
          pageType: 'servizi' as const,
          content: 'Supporto psicologico specializzato per migliorare le performance mentali.',
          services: ['Supporto Psicologico']
        };
      
      case '/contatti':
        return {
          title: 'Contatti - MUV Smart Fit Legnago | Prenota la tua consulenza gratuita',
          description: 'Contatta MUV Smart Fit a Legnago per una consulenza gratuita. Via Frattini 25, 37045 Legnago (VR). Tel: 0442 1790080. Siamo qui per aiutarti!',
          keywords: 'contatti muv legnago, centro fitness legnago telefono, consulenza gratuita fitness, via frattini legnago',
          canonical: `${baseUrl}/contatti`,
          ogType: 'website',
          pageType: 'contatti' as const,
          content: 'Prenota la tua consulenza gratuita presso MUV Fitness Legnago. Siamo aperti dal lunedì al venerdì dalle 08:00 alle 21:00 e il sabato dalle 08:00 alle 12:00. Contattaci per scoprire come possiamo aiutarti a raggiungere i tuoi obiettivi di fitness.',
          services: []
        };

      case '/team':
        return {
          title: 'Team MUV Smart Fit | Professionisti del Fitness a Legnago',
          description: 'Conosci il team di professionisti MUV Smart Fit a Legnago: personal trainer, nutrizionisti e specialisti del benessere qualificati.',
          keywords: 'team muv legnago, personal trainer legnago, nutrizionisti legnago, staff qualificato fitness',
          canonical: `${baseUrl}/team`,
          ogType: 'website',
          pageType: 'home' as const,
          content: 'Il team MUV Fitness è composto da personal trainer certificati e specialisti in diverse discipline: Christian Gioso (Pancafit), Serena Portici (EMS), Mauro Petterle, Thomas Gabrieli (massoterapia) e Susanna Isante (benessere olistico).',
          services: []
        };

      case '/risultati':
        return {
          title: 'Risultati Clienti | Trasformazioni MUV Smart Fit Legnago',
          description: 'Scopri le trasformazioni dei nostri clienti a Legnago. Testimonianze reali di successo con MUV Smart Fit: prima e dopo incredibili!',
          keywords: 'risultati fitness legnago, trasformazioni corpo, testimonianze clienti, prima dopo fitness',
          canonical: `${baseUrl}/risultati`,
          ogType: 'website',
          pageType: 'home' as const,
          content: 'I nostri clienti hanno ottenuto risultati straordinari: dimagrimento, tonificazione, risoluzione di problemi posturali e mal di schiena. Testimonianze reali di trasformazioni documentate presso MUV Fitness Legnago.',
          services: []
        };

      case '/blog':
        return {
          title: 'Blog Fitness | Consigli e Guide - MUV Smart Fit Legnago',
          description: 'Blog MUV Smart Fit: consigli fitness, guide nutrizionali e articoli sul benessere. Resta aggiornato sulle ultime novità del fitness a Legnago.',
          keywords: 'blog fitness legnago, consigli fitness, guide nutrizionali, articoli benessere',
          canonical: `${baseUrl}/blog`,
          ogType: 'website',
          pageType: 'blog' as const,
          content: 'Il nostro blog offre articoli professionali su fitness, nutrizione, benessere e salute. I nostri esperti condividono consigli pratici per migliorare il tuo stile di vita e raggiungere i tuoi obiettivi di benessere.',
          services: []
        };

      
      default:
        return {
          title: 'MUV Smart Fit - Centro Fitness a Legnago',
          description: 'MUV Smart Fit: centro fitness innovativo a Legnago con personal training, nutrizione e servizi specializzati.',
          keywords: 'centro fitness legnago, personal training, nutrizione, pilates',
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
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* Enhanced Meta Tags */}
        <meta name="author" content="MUV Fitness" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="it" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Open Graph Enhanced */}
        <meta property="og:site_name" content="MUV Fitness" />
        <meta property="og:type" content={seoData.ogType} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content={seoData.canonical} />
        <meta property="og:image" content="https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={seoData.title} />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:locale:alternate" content="en_US" />

        {/* Twitter Cards Enhanced */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@muvfitness" />
        <meta name="twitter:creator" content="@muvfitness" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content="https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" />
        <meta name="twitter:image:alt" content={seoData.title} />

        {/* Additional Social Media Meta */}
        <meta property="fb:app_id" content="MUVFitness" />
        <meta name="pinterest-rich-pin" content="true" />

        {/* Geo and Local SEO */}
        <meta name="geo.region" content="IT-VR" />
        <meta name="geo.placename" content="Legnago" />
        <meta name="geo.position" content="45.1914;11.3065" />
        <meta name="ICBM" content="45.1914, 11.3065" />

        {/* Enhanced meta tags for better crawling */}
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />

        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Favicon and app icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png" />
        
        {/* Hreflang for internationalization */}
        <link rel="alternate" hrefLang="it" href={seoData.canonical} />
        <link rel="alternate" hrefLang="x-default" href={seoData.canonical} />
      </Helmet>
      
      {/* Accessibility Enhancement */}
      <AccessibilityEnhancer pageTitle={seoData.title} />
      
      {/* Enhanced SEO Components */}
      <StructuredData 
        type="SportsActivityLocation"
        data={{
          name: "MUV Fitness",
          address: {
            streetAddress: "Via Venti Settembre, 5/7",
            addressLocality: "Legnago", 
            addressRegion: "Veneto",
            postalCode: "37045",
            addressCountry: "IT"
          }
        }}
      />
      
      {!currentPath.startsWith('/blog') && (
        <CrawlerOptimizer
          title={seoData.title}
          description={seoData.description}
          content={seoData.content}
          services={seoData.services}
          location="Legnago"
        />
      )}
      
      {/* Include existing structured data components */}
    </>
  );
};

export default SEOHandler;
