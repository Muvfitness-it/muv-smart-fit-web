import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOEnhancerProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  lang?: string;
}

const SEOEnhancer = ({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  lang = 'it'
}: SEOEnhancerProps) => {
  const location = useLocation();

  useEffect(() => {
    // Update page title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Update canonical URL
    const currentCanonical = canonicalUrl || `https://www.muvfitness.it${location.pathname}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentCanonical);

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    };

    if (title) updateOGTag('og:title', title);
    if (description) updateOGTag('og:description', description);
    if (ogImage) updateOGTag('og:image', ogImage);
    updateOGTag('og:url', currentCanonical);

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', content);
    };

    if (title) updateTwitterTag('twitter:title', title);
    if (description) updateTwitterTag('twitter:description', description);
    if (ogImage) updateTwitterTag('twitter:image', ogImage);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Add hreflang if needed
    let hreflangLink = document.querySelector('link[rel="alternate"][hreflang="it"]');
    if (!hreflangLink) {
      hreflangLink = document.createElement('link');
      hreflangLink.setAttribute('rel', 'alternate');
      hreflangLink.setAttribute('hreflang', 'it');
      document.head.appendChild(hreflangLink);
    }
    hreflangLink.setAttribute('href', currentCanonical);

    // Ensure only one H1 per page
    const h1Elements = document.querySelectorAll('h1');
    if (h1Elements.length > 1) {
      // Hide duplicate H1s (keep the first one)
      h1Elements.forEach((h1, index) => {
        if (index > 0) {
          (h1 as HTMLElement).style.display = 'none';
        }
      });
    }

    // Add structured data breadcrumbs for non-home pages
    if (location.pathname !== '/') {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.muvfitness.it/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": title || document.title,
            "item": currentCanonical
          }
        ]
      };

      let breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-breadcrumb]');
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.setAttribute('type', 'application/ld+json');
        breadcrumbScript.setAttribute('data-breadcrumb', 'true');
        document.head.appendChild(breadcrumbScript);
      }
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    }
  }, [title, description, keywords, ogImage, canonicalUrl, lang, location.pathname]);

  return null;
};

export default SEOEnhancer;
