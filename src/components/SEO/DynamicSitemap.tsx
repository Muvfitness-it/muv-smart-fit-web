import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const generateSitemap = async (): Promise<string> => {
  const baseUrl = 'https://www.muvfitness.it';
  
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/servizi', priority: '0.9', changefreq: 'weekly' },
    { url: '/chi-siamo', priority: '0.8', changefreq: 'monthly' },
    { url: '/contatti', priority: '0.9', changefreq: 'monthly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    
    { url: '/servizi/personal-training', priority: '0.8', changefreq: 'monthly' },
    { url: '/servizi/ems', priority: '0.8', changefreq: 'monthly' },
    { url: '/servizi/pilates', priority: '0.8', changefreq: 'monthly' },
    { url: '/servizi/hiit', priority: '0.8', changefreq: 'monthly' },
    { url: '/servizi/nutrizione', priority: '0.8', changefreq: 'monthly' },
    { url: '/servizi/massoterapia', priority: '0.7', changefreq: 'monthly' },
    { url: '/servizi/pancafit', priority: '0.7', changefreq: 'monthly' },
    { url: '/servizi/psicologo', priority: '0.7', changefreq: 'monthly' },
    { url: '/servizi/small-group', priority: '0.7', changefreq: 'monthly' },
    { url: '/risultati', priority: '0.8', changefreq: 'monthly' },
    { url: '/team', priority: '0.7', changefreq: 'monthly' },
    { url: '/trasformazione-30-giorni', priority: '0.9', changefreq: 'weekly' },
  ];

  let dynamicPages = [];
  
  try {
    // Fetch published blog posts
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (posts) {
      dynamicPages = posts.map(post => ({
        url: `/${post.slug}`,
        priority: '0.7',
        changefreq: 'weekly',
        lastmod: post.updated_at || post.published_at,
        isPost: true as const
      }));
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  const allPages = [...staticPages, ...dynamicPages];
  const currentDate = new Date().toISOString().split('T')[0];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map((page: any) => {
  const isBlogPost = !!page.isPost;
  
  let urlEntry = `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod ? new Date(page.lastmod).toISOString().split('T')[0] : currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;

  // Add Google News tags for blog posts
  if (isBlogPost && page.lastmod) {
    const pubDate = new Date(page.lastmod);
    const isRecent = (Date.now() - pubDate.getTime()) < (7 * 24 * 60 * 60 * 1000); // 7 days
    
    if (isRecent) {
      urlEntry += `
    <news:news>
      <news:publication>
        <news:name>MUV Fitness Blog</news:name>
        <news:language>it</news:language>
      </news:publication>
      <news:publication_date>${pubDate.toISOString()}</news:publication_date>
      <news:title>${page.url.split('/').pop()?.replace(/-/g, ' ')}</news:title>
      <news:keywords>fitness, allenamento, benessere, salute</news:keywords>
    </news:news>`;
    }
  }
  
  urlEntry += `
  </url>`;
  return urlEntry;
}).join('\n')}
</urlset>`;

  return sitemapXml;
};

const DynamicSitemap = () => {
  useEffect(() => {
    // Generate and update sitemap periodically
    const updateSitemap = async () => {
      try {
        const sitemapContent = await generateSitemap();
        // Store in localStorage or send to server
        localStorage.setItem('generated-sitemap', sitemapContent);
      } catch (error) {
        console.error('Error generating sitemap:', error);
      }
    };

    updateSitemap();
    
    // Update sitemap every hour
    const interval = setInterval(updateSitemap, 3600000);
    
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default DynamicSitemap;