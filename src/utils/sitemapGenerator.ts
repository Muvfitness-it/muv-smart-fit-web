import { supabase } from '@/integrations/supabase/client';

export const generateStaticBlogSitemap = async () => {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, published_at, updated_at, title')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts for sitemap:', error);
      return '';
    }

    if (!posts || posts.length === 0) {
      return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
    }

    const baseUrl = 'https://www.muvfitness.it';
    const sitemapEntries = posts.map((post) => {
      const lastmod = new Date(post.updated_at || post.published_at).toISOString().split('T')[0];
      const pubDate = new Date(post.published_at);
      const isRecent = (Date.now() - pubDate.getTime()) < (7 * 24 * 60 * 60 * 1000); // 7 days
      
      let urlEntry = `  <url>
    <loc>${baseUrl}/${post.slug}</loc>
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

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${sitemapEntries}
</urlset>`;
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
  }
};

export const updateBlogSitemap = async () => {
  const sitemapContent = await generateStaticBlogSitemap();
  console.log('Generated blog sitemap:', sitemapContent);
  
  // Store in localStorage for debugging
  localStorage.setItem('blog_sitemap_content', sitemapContent);
  
  return sitemapContent;
};