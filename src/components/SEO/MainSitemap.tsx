import React, { useEffect, useState } from 'react';
import { prerenderRoutes } from '@/utils/prerenderConfig';
import { supabase } from '@/integrations/supabase/client';

const MainSitemap: React.FC = () => {
  const [sitemapXml, setSitemapXml] = useState<string>('');

  useEffect(() => {
    const generateSitemap = async () => {
      const baseUrl = 'https://www.muvfitness.it';
      const currentDate = new Date().toISOString().split('T')[0];

      // Static routes
      const staticEntries = prerenderRoutes.map(route => {
        const priority = route === '/' ? '1.0' : '0.8';
        const changefreq = route === '/' ? 'daily' : 'weekly';
        return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
      }).join('\n');

      // Blog index entry
      const blogIndexEntry = `  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

      // Fetch published blog posts
      let blogEntries = '';
      try {
        const { data: posts, error } = await supabase
          .from('blog_posts')
          .select('slug, updated_at, published_at, title, meta_description')
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (error) throw error;

        blogEntries = (posts || []).map(post => {
          const lastmod = (post.updated_at || post.published_at || new Date().toISOString()).split('T')[0];
          return `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
        }).join('\n');
      } catch (e) {
        console.error('Error fetching blog posts for sitemap:', e);
      }

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogIndexEntry}
${staticEntries}
${blogEntries}
</urlset>`;

      setSitemapXml(sitemap);
    };

    generateSitemap();
  }, []);

  // Set proper XML headers
  useEffect(() => {
    if (sitemapXml) {
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
