import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SitemapRoute: React.FC = () => {
  const [sitemapXml, setSitemapXml] = useState<string>('');

  useEffect(() => {
    const generateSitemap = async () => {
      try {
        // Fetch published blog posts
        const { data: posts, error } = await supabase
          .from('blog_posts')
          .select('slug, updated_at')
          .eq('status', 'published')
          .order('updated_at', { ascending: false });

        const blogEntries = posts?.map(post => ({
          loc: `https://www.muvfitness.it/${post.slug}`,
          lastmod: new Date(post.updated_at).toISOString().split('T')[0],
          changefreq: 'weekly',
          priority: 0.8
        })) || [];

        // Static pages
        const staticPages = [
          { loc: 'https://www.muvfitness.it/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 1.0 },
          { loc: 'https://www.muvfitness.it/chi-siamo', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.8 },
          { loc: 'https://www.muvfitness.it/servizi', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.9 },
          { loc: 'https://www.muvfitness.it/servizi/personal-training', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
          { loc: 'https://www.muvfitness.it/servizi/small-group', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
          { loc: 'https://www.muvfitness.it/servizi/ems', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
          { loc: 'https://www.muvfitness.it/servizi/hiit', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
          { loc: 'https://www.muvfitness.it/servizi/pilates', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
          { loc: 'https://www.muvfitness.it/servizi/pancafit', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
          { loc: 'https://www.muvfitness.it/servizi/nutrizione', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
          { loc: 'https://www.muvfitness.it/servizi/massoterapia', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
          { loc: 'https://www.muvfitness.it/servizi/psicologo', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
          { loc: 'https://www.muvfitness.it/team', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.7 },
          { loc: 'https://www.muvfitness.it/risultati', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.7 },
          { loc: 'https://www.muvfitness.it/blog', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.9 },
          { loc: 'https://www.muvfitness.it/contatti', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.7 },
          
          { loc: 'https://www.muvfitness.it/trasformazione-30-giorni', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.9 }
        ];

        const allEntries = [...staticPages, ...blogEntries];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

        setSitemapXml(sitemap);

      } catch (error) {
        console.error('Error generating sitemap:', error);
      }
    };

    generateSitemap();
  }, []);

  // Set proper headers for XML response
  useEffect(() => {
    if (sitemapXml && typeof window !== 'undefined') {
      const metaContentType = document.querySelector('meta[http-equiv="Content-Type"]');
      if (!metaContentType) {
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

export default SitemapRoute;