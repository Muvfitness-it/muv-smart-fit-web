import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteConfig } from '@/utils/seoRoutes';

interface StaticSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  imageUrl?: string;
  structuredData?: Record<string, any>;
  noindex?: boolean;
}

const StaticSEO: React.FC<StaticSEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  imageUrl,
  structuredData,
  noindex = false
}) => {
  const location = useLocation();
  
  useEffect(() => {
    // Get route config or use provided props
    const routeConfig = getRouteConfig(location.pathname);
    const finalTitle = title || routeConfig?.title || 'MUV Fitness Legnago';
    const finalDescription = description || routeConfig?.description || 'Centro fitness esclusivo a Legnago';
    const finalKeywords = keywords || routeConfig?.keywords;
    const finalCanonical = canonical || `https://www.muvfitness.it${location.pathname}`;
    const finalImage = imageUrl || 'https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png';
    
    // Update document title
    document.title = finalTitle;
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', finalDescription);
    
    // Update keywords if provided
    if (finalKeywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', finalKeywords);
    }
    
    // Update robots meta
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    metaRobots.setAttribute('content', robotsContent);
    
    // Update canonical
    let canonical_link = document.querySelector('link[rel="canonical"]');
    if (!canonical_link) {
      canonical_link = document.createElement('link');
      canonical_link.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical_link);
    }
    canonical_link.setAttribute('href', finalCanonical);
    
    // Update Open Graph tags
    const ogTags = [
      { property: 'og:title', content: finalTitle },
      { property: 'og:description', content: finalDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: finalCanonical },
      { property: 'og:image', content: finalImage },
      { property: 'og:locale', content: 'it_IT' },
      { property: 'og:site_name', content: 'MUV Fitness' }
    ];
    
    ogTags.forEach(tag => {
      let ogMeta = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogMeta) {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', tag.property);
        document.head.appendChild(ogMeta);
      }
      ogMeta.setAttribute('content', tag.content);
    });
    
    // Update Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: finalTitle },
      { name: 'twitter:description', content: finalDescription },
      { name: 'twitter:image', content: finalImage }
    ];
    
    twitterTags.forEach(tag => {
      let twitterMeta = document.querySelector(`meta[name="${tag.name}"]`);
      if (!twitterMeta) {
        twitterMeta = document.createElement('meta');
        twitterMeta.setAttribute('name', tag.name);
        document.head.appendChild(twitterMeta);
      }
      twitterMeta.setAttribute('content', tag.content);
    });
    
    // Add structured data if provided
    if (structuredData) {
      // Remove existing structured data for this page
      const existingScript = document.querySelector('script[data-page-structured-data]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-structured-data', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
    
  }, [location.pathname, title, description, keywords, canonical, imageUrl, structuredData, noindex]);
  
  return null;
};

export default StaticSEO;