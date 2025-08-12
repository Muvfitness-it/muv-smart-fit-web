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
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Read posts once; consumers might not need the body but we build sitemaps here for completeness
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, title, published_at, updated_at, meta_keywords')
      .eq('status', 'published')
      .order('updated_at', { ascending: false });

    if (error) throw error;

    const baseUrl = 'https://www.muvfitness.it';

    // Build main sitemap entries (subset without static pages; main function already includes statics)
    const mainSitemapEntries = (posts || []).map((p: any) => {
      const lastmod = new Date(p.updated_at || p.published_at).toISOString().split('T')[0];
      return `  <url>\n    <loc>${baseUrl}/blog/${p.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
    }).join('\n');

    const mainSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${mainSitemapEntries}\n</urlset>`;

    const now = Date.now();
    const NEWS_WINDOW_MS = 48 * 60 * 60 * 1000;

    const recent = (posts || []).filter((p: any) => now - new Date(p.published_at || p.updated_at).getTime() <= NEWS_WINDOW_MS);
    const newsEntries = recent.map((p: any) => {
      const pubDate = new Date(p.published_at || p.updated_at);
      const lastmod = new Date(p.updated_at || p.published_at).toISOString().split('T')[0];
      const cleanTitle = String(p.title || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
      const keywords = (p.meta_keywords || 'fitness, allenamento, benessere, salute').toString();
      return `  <url>\n    <loc>${baseUrl}/blog/${p.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <news:news>\n      <news:publication>\n        <news:name>MUV Fitness Blog</news:name>\n        <news:language>it</news:language>\n      </news:publication>\n      <news:publication_date>${pubDate.toISOString()}</news:publication_date>\n      <news:title>${cleanTitle}</news:title>\n      <news:keywords>${keywords}</news:keywords>\n    </news:news>\n  </url>`;
    }).join('\n');

    const newsSitemap = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\n        xmlns:news=\"http://www.google.com/schemas/sitemap-news/0.9\">\n${newsEntries}\n</urlset>`;

    // Action can be used later to push somewhere; for now we just succeed
    if (req.method === 'POST') {
      const body = await req.json().catch(() => ({}));
      console.log('update-sitemaps action:', body?.action ?? 'none');
    }

    return new Response(JSON.stringify({ ok: true, mainSitemap, newsSitemap }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Error in update-sitemaps:', err);
    return new Response(JSON.stringify({ error: err?.message || 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
