import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const type = url.searchParams.get('type') || 'main';
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const siteUrl = 'https://www.muvfitness.it';
    
    if (type === 'main') {
      // Main sitemap index
      const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap_pages.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap_services.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap_blog.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;

      return new Response(sitemapIndex, {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }

    if (type === 'pages') {
      // Static pages sitemap
      const staticPages = [
        { url: '/', priority: '1.0', changefreq: 'weekly' },
        { url: '/chi-siamo/', priority: '0.8', changefreq: 'monthly' },
        { url: '/servizi/', priority: '0.8', changefreq: 'monthly' },
        { url: '/team/', priority: '0.8', changefreq: 'monthly' },
        { url: '/risultati/', priority: '0.8', changefreq: 'weekly' },
        { url: '/recensioni/', priority: '0.8', changefreq: 'weekly' },
        { url: '/contatti/', priority: '0.8', changefreq: 'monthly' },
        { url: '/prezzi/', priority: '0.8', changefreq: 'monthly' },
        { url: '/privacy/', priority: '0.3', changefreq: 'yearly' },
        { url: '/cookie-policy/', priority: '0.3', changefreq: 'yearly' }
      ];

      const pagesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

      return new Response(pagesSitemap, {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }

    if (type === 'services') {
      // Services pages sitemap
      const servicePages = [
        '/servizi/personal-training/',
        '/servizi/ems/', 
        '/servizi/pilates/',
        '/servizi/pancafit/',
        '/servizi/hiit/',
        '/servizi/small-group/',
        '/servizi/nutrizione/',
        '/servizi/massoterapia/',
        '/servizi/psicologo/',
        '/personal-trainer-legnago/',
        '/allenamento-ems-legnago/',
        '/pilates-legnago/',
        '/servizi/cellulite-vacuum-legnago/',
        '/servizi/pancafit-postura-legnago/',
        '/servizi/pilates-reformer-legnago/'
      ];

      const servicesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${servicePages.map(page => `  <url>
    <loc>${siteUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

      return new Response(servicesSitemap, {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }

    if (type === 'blog') {
      // Blog posts sitemap
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('slug, updated_at, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      const { data: categories } = await supabase
        .from('blog_categories')
        .select('slug, updated_at');

      const blogSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/blog/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
${posts?.map(post => `  <url>
    <loc>${siteUrl}/blog/${post.slug}/</loc>
    <lastmod>${new Date(post.updated_at || post.published_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n') || ''}
${categories?.map(category => `  <url>
    <loc>${siteUrl}/blog/c/${category.slug}/</loc>
    <lastmod>${new Date(category.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n') || ''}
</urlset>`;

      return new Response(blogSitemap, {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=1800'
        }
      });
    }

    if (type === 'rss') {
      // RSS Feed
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('title, slug, excerpt, content, published_at, featured_image')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(20);

      const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MUV Fitness Legnago - Blog</title>
    <description>Articoli su fitness, allenamento EMS, Pilates e benessere a Legnago</description>
    <link>${siteUrl}/blog/</link>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <language>it-IT</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>MUV Fitness Custom RSS Generator</generator>
${posts?.map(post => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt || post.content.substring(0, 200) + '...'}]]></description>
      <link>${siteUrl}/blog/${post.slug}/</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}/</guid>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      ${post.featured_image ? `<enclosure url="${post.featured_image}" type="image/jpeg" />` : ''}
    </item>`).join('\n') || ''}
  </channel>
</rss>`;

      return new Response(rssXml, {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/rss+xml',
          'Cache-Control': 'public, max-age=1800'
        }
      });
    }

    if (type === 'atom') {
      // Atom Feed
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('title, slug, excerpt, content, published_at, updated_at, featured_image')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(20);

      const atomXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>MUV Fitness Legnago - Blog</title>
  <subtitle>Articoli su fitness, allenamento EMS, Pilates e benessere a Legnago</subtitle>
  <link href="${siteUrl}/blog/" />
  <link rel="self" href="${siteUrl}/blog/atom.xml" />
  <id>${siteUrl}/blog/</id>
  <updated>${new Date().toISOString()}</updated>
  <generator>MUV Fitness Custom Atom Generator</generator>
${posts?.map(post => `  <entry>
    <title><![CDATA[${post.title}]]></title>
    <link href="${siteUrl}/blog/${post.slug}/" />
    <id>${siteUrl}/blog/${post.slug}/</id>
    <published>${new Date(post.published_at).toISOString()}</published>
    <updated>${new Date(post.updated_at || post.published_at).toISOString()}</updated>
    <summary><![CDATA[${post.excerpt || post.content.substring(0, 200) + '...'}]]></summary>
  </entry>`).join('\n') || ''}
</feed>`;

      return new Response(atomXml, {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/atom+xml',
          'Cache-Control': 'public, max-age=1800'
        }
      });
    }

    return new Response('Invalid sitemap type', { status: 400 });

  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response('Internal server error', { status: 500 });
  }
});