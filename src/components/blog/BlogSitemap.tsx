import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  slug: string;
  published_at: string;
  title: string;
}

const BlogSitemap: React.FC = () => {
  useEffect(() => {
    const generateBlogSitemap = async () => {
      try {
        const { data: posts, error } = await supabase
          .from('blog_posts')
          .select('slug, published_at, title')
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (error) {
          console.error('Error fetching posts for sitemap:', error);
          return;
        }

        if (!posts || posts.length === 0) return;

        const baseUrl = 'https://www.muvfitness.it';
        const sitemapEntries = posts.map((post: BlogPost) => {
          const lastmod = new Date(post.published_at).toISOString().split('T')[0];
          return `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <news:news>
      <news:publication>
        <news:name>MUV Fitness Blog</news:name>
        <news:language>it</news:language>
      </news:publication>
      <news:publication_date>${new Date(post.published_at).toISOString()}</news:publication_date>
      <news:title>${post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
      <news:keywords>fitness, allenamento, benessere, salute</news:keywords>
    </news:news>
  </url>`;
        }).join('\n');

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapEntries}
</urlset>`;

        // Store in localStorage per uso futuro o invio a Google
        localStorage.setItem('blog_sitemap', sitemap);
        
        // Log per debug
        console.log('Blog sitemap generated:', sitemap);

        // Notifica Google della nuova sitemap (opzionale)
        if (navigator.sendBeacon) {
          const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(baseUrl + '/sitemap-blog.xml')}`;
          navigator.sendBeacon(pingUrl);
        }

      } catch (error) {
        console.error('Error generating blog sitemap:', error);
      }
    };

    generateBlogSitemap();
  }, []);

  return null; // Componente invisibile
};

export default BlogSitemap;