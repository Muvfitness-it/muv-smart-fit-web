import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const IndexingBooster = () => {
  const location = useLocation();

  useEffect(() => {
    // Add canonical URL
    const canonicalUrl = `https://www.muvfitness.it${location.pathname}`;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Add language hints
    let hreflang = document.querySelector('link[rel="alternate"][hreflang="it"]') as HTMLLinkElement;
    if (!hreflang) {
      hreflang = document.createElement('link');
      hreflang.rel = 'alternate';
      hreflang.hreflang = 'it';
      document.head.appendChild(hreflang);
    }
    hreflang.href = canonicalUrl;

    // Add structured data for organization
    const existingStructuredData = document.querySelector('script[type="application/ld+json"]');
    if (!existingStructuredData) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "MUV Fitness",
        "url": "https://www.muvfitness.it",
        "logo": "https://www.muvfitness.it/assets/muv-logo-original-transparent.png",
        "description": "Centro fitness a Torino specializzato in personal training, EMS, pilates e nutrizione",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Torino",
          "addressCountry": "IT"
        },
        "sameAs": [
          "https://www.instagram.com/muvfitness",
          "https://www.facebook.com/muvfitness"
        ]
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Add Google-specific meta tags
    const googleBot = document.querySelector('meta[name="googlebot"]') as HTMLMetaElement;
    if (!googleBot) {
      const meta = document.createElement('meta');
      meta.name = 'googlebot';
      meta.content = 'index,follow,snippet,archive';
      document.head.appendChild(meta);
    }

    // Add referrer policy for better tracking
    const referrer = document.querySelector('meta[name="referrer"]') as HTMLMetaElement;
    if (!referrer) {
      const meta = document.createElement('meta');
      meta.name = 'referrer';
      meta.content = 'origin-when-cross-origin';
      document.head.appendChild(meta);
    }

  }, [location.pathname]);

  return null;
};

export default IndexingBooster;