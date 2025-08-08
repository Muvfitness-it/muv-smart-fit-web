import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const NewsSitemap: React.FC = () => {
  const [sitemapXml, setSitemapXml] = useState<string>('');

  useEffect(() => {
    const generateSitemap = async () => {
      try {
        // Fetch recent published blog posts (last 7 days for Google News)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const { data: posts, error } = await supabase
          .from('blog_posts')
          .select('slug, published_at, title')
          .eq('status', 'published')
          .gte('published_at', sevenDaysAgo.toISOString())
          .order('published_at', { ascending: false });

        if (error) throw error;

        const baseUrl = 'https://www.muvfitness.it';
        const newsEntries = posts?.map(post => {
          const cleanTitle = post.title
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

          const pubDate = new Date(post.published_at);
          
          return `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>MUV Fitness Blog</news:name>
        <news:language>it</news:language>
      </news:publication>
      <news:publication_date>${pubDate.toISOString()}</news:publication_date>
      <news:title>${cleanTitle}</news:title>
      <news:keywords>fitness, allenamento, benessere, salute, nutrizione</news:keywords>
    </news:news>
  </url>`;
        }).join('\n') || '';

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsEntries}
</urlset>`;

        setSitemapXml(sitemap);
      } catch (error) {
        console.error('Error generating news sitemap:', error);
      }
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

export default NewsSitemap;