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

    if (!posts || posts.length === 0) {
      const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
      
      return new Response(emptySitemap, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/xml',
        },
      });
    }

    const baseUrl = 'https://www.muvfitness.it';
    const sitemapEntries = posts.map((post: any) => {
      const lastmod = new Date(post.updated_at).toISOString().split('T')[0];
      const pubDate = post.published_at ? new Date(post.published_at) : new Date(post.updated_at);
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

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
      },
    });

  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});