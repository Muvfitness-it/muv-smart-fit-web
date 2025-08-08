import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const BlogSitemap: React.FC = () => {
  const [sitemapXml, setSitemapXml] = useState<string>('');

  useEffect(() => {
    const generateSitemap = async () => {
      try {
        // Fetch published blog posts
        const { data: posts, error } = await supabase
          .from('blog_posts')
          .select('slug, updated_at, published_at, title')
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (error) throw error;

        const baseUrl = 'https://www.muvfitness.it';
        const blogEntries = posts?.map(post => {
          const lastmod = post.updated_at ? new Date(post.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
          
          return `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
        }).join('\n') || '';

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
${blogEntries}
</urlset>`;

        setSitemapXml(sitemap);
      } catch (error) {
        console.error('Error generating blog sitemap:', error);
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

export default BlogSitemap;