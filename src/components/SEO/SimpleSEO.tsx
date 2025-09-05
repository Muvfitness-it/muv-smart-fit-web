import React from 'react';
import { Helmet } from 'react-helmet';

interface SimpleSEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  imageUrl?: string;
  structuredData?: Record<string, any>;
}

const SimpleSEO: React.FC<SimpleSEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  imageUrl,
  structuredData
}) => {
  const fullTitle = title.includes('MUV Fitness') ? title : `${title} - MUV Fitness Legnago`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {canonical && <meta property="og:url" content={canonical} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SimpleSEO;