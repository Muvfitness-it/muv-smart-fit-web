import { useEffect } from 'react';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const MuvBlogSitemap = () => {
  const { posts } = useBlogPosts();

  useEffect(() => {
    const generateSitemap = () => {
      if (!posts || posts.length === 0) {
        return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
      }

      const baseUrl = 'https://www.muvfitness.it';
      const sitemapEntries = posts.map((post) => {
        const lastmod = post.published_at ? new Date(post.published_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
        const pubDate = post.published_at ? new Date(post.published_at) : new Date();
        const isRecent = (Date.now() - pubDate.getTime()) < (7 * 24 * 60 * 60 * 1000);
        
        let urlEntry = `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;

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

      // Set response headers for XML
      document.head.innerHTML = '';
      document.body.innerHTML = sitemap;
      document.body.style.whiteSpace = 'pre';
      document.body.style.fontFamily = 'monospace';
    };

    generateSitemap();
  }, [posts]);

  return null;
};

export default MuvBlogSitemap;