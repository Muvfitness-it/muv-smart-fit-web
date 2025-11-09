import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch published blog posts
    const { data: posts, error } = await supabaseClient
      .from('blog_posts')
      .select('slug, published_at, updated_at, title')
      .eq('status', 'published')
      .order('updated_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Helper to get current date with validation (prevents future dates)
    const getCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      
      // If date is in future beyond Nov 2025, use Nov 2025 as fallback
      if (year > 2025 || (year === 2025 && month > 10)) {
        return '2025-11-09';
      }
      return now.toISOString().split('T')[0];
    };

    // Generate main sitemap
    const baseUrl = 'https://www.muvfitness.it';
    const currentDate = getCurrentDate();
    
    // Only canonical URLs (no redirects)
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/servizi', priority: '0.9', changefreq: 'weekly' },
      { url: '/servizi/ems-legnago', priority: '0.9', changefreq: 'monthly' },
      { url: '/servizi/pilates-reformer-legnago', priority: '0.9', changefreq: 'monthly' },
      { url: '/servizi/pancafit-legnago', priority: '0.8', changefreq: 'monthly' },
      { url: '/servizi/vacuum-pressoterapia-legnago', priority: '0.8', changefreq: 'monthly' },
      { url: '/servizi/sauna-infrarossi-legnago', priority: '0.8', changefreq: 'monthly' },
      { url: '/servizi/over-60-legnago', priority: '0.8', changefreq: 'monthly' },
      { url: '/servizi/nutrizione', priority: '0.8', changefreq: 'monthly' },
      { url: '/servizi/small-group', priority: '0.7', changefreq: 'monthly' },
      { url: '/chi-siamo', priority: '0.8', changefreq: 'monthly' },
      { url: '/contatti', priority: '0.9', changefreq: 'monthly' },
      { url: '/blog', priority: '0.9', changefreq: 'daily' },
      { url: '/risultati', priority: '0.8', changefreq: 'monthly' },
      { url: '/team', priority: '0.7', changefreq: 'monthly' },
      { url: '/metodo', priority: '0.8', changefreq: 'monthly' },
      { url: '/perche-muv', priority: '0.8', changefreq: 'monthly' },
      { url: '/tecnologie', priority: '0.7', changefreq: 'monthly' },
      { url: '/faq', priority: '0.7', changefreq: 'monthly' },
      { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
      { url: '/cookie-policy', priority: '0.3', changefreq: 'yearly' },
    ];

    let dynamicPages = [];
    
    if (posts && posts.length > 0) {
      dynamicPages = posts.map((post: any) => ({
        url: `/${post.slug}`,
        priority: '0.7',
        changefreq: 'weekly',
        lastmod: post.updated_at
      }));
    }

    const allPages = [...staticPages, ...dynamicPages];

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => {
  const isBlogPost = page.url !== '/blog' && page.url !== '' && !page.url.startsWith('/servizi');
  
  let urlEntry = `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod ? new Date(page.lastmod).toISOString().split('T')[0] : currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;

  // Add Google News tags for recent blog posts
  if (isBlogPost && page.lastmod) {
    const pubDate = new Date(page.lastmod);
    const isRecent = (Date.now() - pubDate.getTime()) < (30 * 24 * 60 * 60 * 1000); // 30 days
    
    if (isRecent) {
      const title = page.url.split('/').pop()?.replace(/-/g, ' ') || 'MUV Fitness Article';
      urlEntry += `
    <news:news>
      <news:publication>
        <news:name>MUV Fitness Blog</news:name>
        <news:language>it</news:language>
      </news:publication>
      <news:publication_date>${pubDate.toISOString()}</news:publication_date>
      <news:title>${title}</news:title>
      <news:keywords>fitness, allenamento, benessere, salute</news:keywords>
    </news:news>`;
    }
  }
  
  urlEntry += `
  </url>`;
  return urlEntry;
}).join('\n')}
</urlset>`;

    return new Response(sitemapXml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
      },
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return a basic XML error response instead of JSON
    const errorSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Error: ${error.message} -->
</urlset>`;
    
    return new Response(errorSitemap, {
      status: 500,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/xml',
      },
    });
  }
});