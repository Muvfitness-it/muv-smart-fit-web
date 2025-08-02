import React from 'react';
import { generateSitemap } from '@/components/SEO/DynamicSitemap';

const Sitemap: React.FC = () => {
  const [sitemapContent, setSitemapContent] = React.useState<string>('');

  React.useEffect(() => {
    const loadSitemap = async () => {
      try {
        const sitemap = await generateSitemap();
        setSitemapContent(sitemap);
        
        // Content type will be set via meta tag in useEffect
      } catch (error) {
        console.error('Error generating sitemap:', error);
      }
    };

    loadSitemap();
  }, []);

  // Set proper headers for XML response
  React.useEffect(() => {
    if (sitemapContent) {
      // Create a meta tag for content-type
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Type';
      meta.content = 'application/xml; charset=utf-8';
      document.head.appendChild(meta);
      
      return () => {
        document.head.removeChild(meta);
      };
    }
  }, [sitemapContent]);

  if (!sitemapContent) {
    return <div>Generating sitemap...</div>;
  }

  return (
    <div style={{ 
      fontFamily: 'monospace', 
      whiteSpace: 'pre-wrap',
      fontSize: '12px',
      padding: '10px'
    }}>
      {sitemapContent}
    </div>
  );
};

export default Sitemap;