import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  slug: string;
  published_at: string;
  updated_at: string;
  title: string;
  excerpt: string;
}

const BlogSitemap: React.FC = () => {
  const [sitemapContent, setSitemapContent] = useState<string>('');

  useEffect(() => {
    const generateBlogSitemap = async () => {
      try {
        const { data: posts, error } = await supabase
          .from('blog_posts')
          .select('slug, published_at, updated_at, title, excerpt')
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (error) {
          console.error('Error fetching posts for sitemap:', error);
          return;
        }

        if (!posts || posts.length === 0) {
          setSitemapContent(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`);
          return;
        }

        const baseUrl = 'https://www.muvfitness.it';
        const sitemapEntries = posts.map((post: BlogPost) => {
          const lastmod = new Date(post.updated_at || post.published_at).toISOString().split('T')[0];
          const pubDate = new Date(post.published_at);
          const isRecent = (Date.now() - pubDate.getTime()) < (7 * 24 * 60 * 60 * 1000); // 7 days
          
          let urlEntry = `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;

          // Add Google News markup for recent posts
          if (isRecent) {
            const cleanTitle = post.title
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
              
            urlEntry += `
    <news:news xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
      <news:publication>
        <news:name>MUV Fitness Blog</news:name>
        <news:language>it</news:language>
      </news:publication>
      <news:publication_date>${pubDate.toISOString()}</news:publication_date>
      <news:title>${cleanTitle}</news:title>
      <news:keywords>fitness, allenamento, benessere, salute, nutrizione</news:keywords>
    </news:news>`;
          }
          
          urlEntry += `
  </url>`;
          return urlEntry;
        }).join('\n');

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${sitemapEntries}
</urlset>`;

        setSitemapContent(sitemap);
      } catch (error) {
        console.error('Error generating blog sitemap:', error);
        setSitemapContent(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`);
      }
    };

    generateBlogSitemap();
  }, []);

  // Set XML content type
  useEffect(() => {
    if (sitemapContent) {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Type';
      meta.content = 'application/xml; charset=utf-8';
      document.head.appendChild(meta);
      
      return () => {
        const existingMeta = document.querySelector('meta[http-equiv="Content-Type"][content="application/xml; charset=utf-8"]');
        if (existingMeta && existingMeta.parentNode) {
          existingMeta.parentNode.removeChild(existingMeta);
        }
      };
    }
  }, [sitemapContent]);

  if (!sitemapContent) {
    return <div>Generating blog sitemap...</div>;
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

export default BlogSitemap;