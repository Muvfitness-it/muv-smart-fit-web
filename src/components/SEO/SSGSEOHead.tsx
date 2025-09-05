import { useLocation } from 'react-router-dom';
import { getRouteConfig } from '@/utils/seoRoutes';

interface SSGSEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  imageUrl?: string;
  structuredData?: Record<string, any>;
  noindex?: boolean;
}

const SSGSEOHead: React.FC<SSGSEOHeadProps> = ({
  title,
  description,
  keywords,
  canonical,
  imageUrl,
  structuredData,
  noindex = false
}) => {
  const location = useLocation();
  
  // Get route config or use provided props
  const routeConfig = getRouteConfig(location.pathname);
  const finalTitle = title || routeConfig?.title || 'MUV Fitness Legnago';
  const finalDescription = description || routeConfig?.description || 'Centro fitness esclusivo a Legnago';
  const finalKeywords = keywords || routeConfig?.keywords;
  const finalCanonical = canonical || `https://www.muvfitness.it${location.pathname}`;
  const finalImage = imageUrl || 'https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png';
  
  const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  // This component renders meta tags that will be captured by SSG
  return (
    <>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={finalCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:site_name" content="MUV Fitness" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* Additional SEO tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Language" content="it" />
      <link rel="alternate" hrefLang="it" href={finalCanonical} />
    </>
  );
};

export default SSGSEOHead;