import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

// Google News sitemap: include only articles from the last 48 hours
const NEWS_WINDOW_MS = 48 * 60 * 60 * 1000;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const now = Date.now();

    // Fetch recent published posts
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, title, published_at, updated_at, meta_keywords')
      .eq('status', 'published')
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false });

    if (error) throw error;

    const baseUrl = 'https://www.muvfitness.it';

    const recentPosts = (posts || []).filter((p: any) => {
      const pub = new Date(p.published_at || p.updated_at).getTime();
      return now - pub <= NEWS_WINDOW_MS;
    });

    // If no recent posts, still return a valid empty urlset
    if (recentPosts.length === 0) {
      const empty = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n</urlset>`;
      return new Response(empty, { headers: { ...corsHeaders, 'Content-Type': 'application/xml' } });
    }

    const entries = recentPosts.map((post: any) => {
      const pubDate = new Date(post.published_at || post.updated_at);
      const lastmod = new Date(post.updated_at || post.published_at).toISOString().split('T')[0];
      const cleanTitle = String(post.title || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
      const keywords = (post.meta_keywords || 'fitness, allenamento, benessere, salute').toString();

      return `  <url>\n    <loc>${baseUrl}/${post.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <news:news>\n      <news:publication>\n        <news:name>MUV Fitness Blog</news:name>\n        <news:language>it</news:language>\n      </news:publication>\n      <news:publication_date>${pubDate.toISOString()}</news:publication_date>\n      <news:title>${cleanTitle}</news:title>\n      <news:keywords>${keywords}</news:keywords>\n    </news:news>\n  </url>`;
    }).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${entries}\n</urlset>`;

    return new Response(xml, {
      headers: { ...corsHeaders, 'Content-Type': 'application/xml' },
    });
  } catch (err: any) {
    console.error('Error generating news sitemap:', err);
    return new Response(JSON.stringify({ error: err?.message || 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
