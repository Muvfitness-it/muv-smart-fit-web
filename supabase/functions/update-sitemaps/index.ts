import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Generate main sitemap
    const mainSitemap = generateMainSitemap();
    
    // Generate blog sitemap
    const blogSitemap = await generateBlogSitemap(supabaseClient);
    
    // Generate news sitemap (for recent blog posts)
    const newsSitemap = await generateNewsSitemap(supabaseClient);

    console.log('Sitemaps generated successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Sitemaps updated successfully',
        sitemaps: {
          main: mainSitemap.length,
          blog: blogSitemap.length,
          news: newsSitemap.length
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error updating sitemaps:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

function generateMainSitemap(): string {
  const baseUrl = 'https://www.muvfitness.it';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/servizi', priority: '0.9', changefreq: 'weekly' },
    { path: '/contatti', priority: '0.8', changefreq: 'monthly' },
    { path: '/chi-siamo', priority: '0.8', changefreq: 'monthly' },
    { path: '/blog', priority: '0.9', changefreq: 'daily' },
    { path: '/muv-planner', priority: '0.8', changefreq: 'weekly' },
    { path: '/servizi/personal-training', priority: '0.8', changefreq: 'weekly' },
    { path: '/servizi/ems', priority: '0.8', changefreq: 'weekly' },
    { path: '/servizi/pilates', priority: '0.8', changefreq: 'weekly' },
    { path: '/servizi/hiit', priority: '0.8', changefreq: 'weekly' },
    { path: '/servizi/nutrizione', priority: '0.8', changefreq: 'weekly' },
    { path: '/servizi/massoterapia', priority: '0.8', changefreq: 'weekly' },
    { path: '/servizi/pancafit', priority: '0.8', changefreq: 'weekly' },
    { path: '/servizi/psicologo', priority: '0.8', changefreq: 'weekly' },
    { path: '/servizi/small-group', priority: '0.8', changefreq: 'weekly' },
    { path: '/risultati', priority: '0.7', changefreq: 'monthly' },
    { path: '/team', priority: '0.7', changefreq: 'monthly' },
    { path: '/trasformazione-30-giorni', priority: '0.9', changefreq: 'weekly' },
    { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { path: '/cookie-policy', priority: '0.3', changefreq: 'yearly' }
  ];

  const urls = staticPages.map(page => 
    `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

async function generateBlogSitemap(supabaseClient: any): Promise<string> {
  const { data: posts, error } = await supabaseClient
    .from('blog_posts')
    .select('slug, published_at, updated_at, title')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts for blog sitemap:', error);
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
  }

  if (!posts || posts.length === 0) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
  }

  const baseUrl = 'https://www.muvfitness.it';
  const urls = posts.map((post: any) => {
    const lastmod = new Date(post.updated_at || post.published_at).toISOString().split('T')[0];
    
    return `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

async function generateNewsSitemap(supabaseClient: any): Promise<string> {
  // Get posts from last 7 days for Google News
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: posts, error } = await supabaseClient
    .from('blog_posts')
    .select('slug, published_at, title')
    .eq('status', 'published')
    .gte('published_at', sevenDaysAgo.toISOString())
    .order('published_at', { ascending: false });

  if (error || !posts || posts.length === 0) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
</urlset>`;
  }

  const baseUrl = 'https://www.muvfitness.it';
  const urls = posts.map((post: any) => {
    const cleanTitle = post.title
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    const pubDate = new Date(post.published_at);
    
    return `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>MUV Fitness Blog</news:name>
        <news:language>it</news:language>
      </news:publication>
      <news:publication_date>${pubDate.toISOString()}</news:publication_date>
      <news:title>${cleanTitle}</news:title>
      <news:keywords>fitness, allenamento, benessere, salute, nutrizione</news:keywords>
    </news:news>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;
}