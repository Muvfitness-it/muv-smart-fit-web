import { supabase } from '@/integrations/supabase/client';
import { staticRoutes } from './seoRoutes';

const baseUrl = 'https://www.muvfitness.it';

// Generate comprehensive main sitemap including all static routes and blog posts
export const generateMainSitemap = async (): Promise<string> => {
  try {
    // Get published blog posts
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, published_at, updated_at, title')
      .eq('status', 'published')
      .not('published_at', 'is', null)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts for main sitemap:', error);
    }

    const currentDate = new Date().toISOString().split('T')[0];
    
    // Static routes
    const staticEntries = staticRoutes.map(route => {
      const lastmod = route.lastmod || currentDate;
      return `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    }).join('\n');
    
    // Blog post entries
    let blogEntries = '';
    if (posts && posts.length > 0) {
      blogEntries = posts.map((post) => {
        const lastmod = new Date(post.updated_at || post.published_at).toISOString().split('T')[0];
        return `  <url>
    <loc>${baseUrl}/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }).join('\n');
    }

    const allEntries = [staticEntries, blogEntries].filter(Boolean).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries}
</urlset>`;
  } catch (error) {
    console.error('Error generating main sitemap:', error);
    return generateStaticSitemap();
  }
};

// Generate static sitemap with only static routes
export const generateStaticSitemap = (): string => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urlEntries = staticRoutes.map(route => {
    const lastmod = route.lastmod || currentDate;
    return `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

// Generate blog-specific sitemap with Google News support
export const generateBlogSitemap = async (): Promise<string> => {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, published_at, updated_at, title, meta_keywords')
      .eq('status', 'published')
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts for blog sitemap:', error);
      return emptyBlogSitemap();
    }

    if (!posts || posts.length === 0) {
      return emptyBlogSitemap();
    }

    const sitemapEntries = posts.map((post) => {
      const lastmod = new Date(post.updated_at || post.published_at).toISOString().split('T')[0];
      const pubDate = new Date(post.published_at);
      const isRecent = (Date.now() - pubDate.getTime()) < (48 * 60 * 60 * 1000); // 48 hours for Google News
      
      let urlEntry = `  <url>
    <loc>${baseUrl}/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;

      // Add Google News markup for recent posts
      if (isRecent && post.title) {
        const cleanTitle = post.title
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
          
        const keywords = post.meta_keywords || 'fitness, allenamento, benessere, salute, nutrizione, Legnago';
          
        urlEntry += `
    <news:news>
      <news:publication>
        <news:name>MUV Fitness Blog</news:name>
        <news:language>it</news:language>
      </news:publication>
      <news:publication_date>${pubDate.toISOString()}</news:publication_date>
      <news:title>${cleanTitle}</news:title>
      <news:keywords>${keywords}</news:keywords>
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
    return emptyBlogSitemap();
  }
};

// Generate sitemap index
export const generateSitemapIndex = (): string => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-main.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-blog.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;
};

// Helper function for empty blog sitemap
const emptyBlogSitemap = (): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
};

// Update all sitemaps
export const updateAllSitemaps = async () => {
  try {
    const mainSitemap = await generateMainSitemap();
    const blogSitemap = await generateBlogSitemap();
    const sitemapIndex = generateSitemapIndex();
    
    // Store in localStorage for debugging
    localStorage.setItem('main_sitemap_content', mainSitemap);
    localStorage.setItem('blog_sitemap_content', blogSitemap);
    localStorage.setItem('sitemap_index_content', sitemapIndex);
    
    console.log('All sitemaps updated successfully');
    
    return {
      mainSitemap,
      blogSitemap,
      sitemapIndex
    };
  } catch (error) {
    console.error('Error updating all sitemaps:', error);
    throw error;
  }
};

// Legacy function for backward compatibility
export const generateStaticBlogSitemap = generateBlogSitemap;
export const updateBlogSitemap = generateBlogSitemap;