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
    { url: '/muv-planner', priority: '0.8', changefreq: 'weekly' },
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
        url: `/blog/${post.slug}`,
        priority: '0.7',
        changefreq: 'weekly',
        lastmod: post.updated_at || post.published_at
      }));
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  const allPages = [...staticPages, ...dynamicPages];
  const currentDate = new Date().toISOString().split('T')[0];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod ? new Date(page.lastmod).toISOString().split('T')[0] : currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
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