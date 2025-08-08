import React, { useEffect, useState } from 'react';
import { prerenderRoutes } from '@/utils/prerenderConfig';

const MainSitemap: React.FC = () => {
  const [sitemapXml, setSitemapXml] = useState<string>('');

  useEffect(() => {
    const generateSitemap = () => {
      const baseUrl = 'https://www.muvfitness.it';
      const currentDate = new Date().toISOString().split('T')[0];

      const sitemapEntries = prerenderRoutes.map(route => {
        const priority = route === '/' ? '1.0' : '0.8';
        const changefreq = route === '/' ? 'daily' : 'weekly';
        
        return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
      }).join('\n');

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;

      setSitemapXml(sitemap);
    };

    generateSitemap();
  }, []);

  // Set proper XML headers
  useEffect(() => {
    if (sitemapXml) {
      // Set content type via meta tag
      const existingMeta = document.querySelector('meta[http-equiv="Content-Type"]');
      if (!existingMeta) {
        const meta = document.createElement('meta');
        meta.setAttribute('http-equiv', 'Content-Type');
        meta.setAttribute('content', 'application/xml; charset=utf-8');
        document.head.appendChild(meta);
      }
    }
  }, [sitemapXml]);

  if (!sitemapXml) {
    return <div>Generating sitemap...</div>;
  }

  return (
    <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', fontSize: '14px' }}>
      {sitemapXml}
    </div>
  );
};

export default MainSitemap;