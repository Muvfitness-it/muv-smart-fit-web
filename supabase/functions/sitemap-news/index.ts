import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { xmlHeader, xmlResponse, rfc3339, escapeXml, SITE } from "../_shared/helpers.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const now = Date.now();
    const NEWS_WINDOW_MS = 48 * 60 * 60 * 1000; // 48 hours

    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, title, published_at, updated_at, meta_keywords')
      .eq('status', 'published')
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false })
      .limit(1000);

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    const recentPosts = (posts || []).filter((p: any) => {
      const pubDate = new Date(p.published_at ?? p.updated_at);
      return now - pubDate.getTime() <= NEWS_WINDOW_MS;
    });

    if (recentPosts.length === 0) {
      const emptySitemap = `${xmlHeader()}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
</urlset>`;
      return xmlResponse(emptySitemap);
    }

    const newsEntries = recentPosts.map((p: any) => {
      const pubDate = new Date(p.published_at ?? p.updated_at);
      const lastmod = rfc3339(p.updated_at ?? p.published_at);
      const cleanTitle = escapeXml(String(p.title || ''));
      const keywords = escapeXml(p.meta_keywords || 'fitness, allenamento, benessere, salute');
      
      return `  <url>
    <loc>${SITE}/${escapeXml(p.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <news:news>
      <news:publication>
        <news:name>MUV Fitness Blog</news:name>
        <news:language>it</news:language>
      </news:publication>
      <news:publication_date>${pubDate.toISOString()}</news:publication_date>
      <news:title>${cleanTitle}</news:title>
      <news:keywords>${keywords}</news:keywords>
    </news:news>
  </url>`;
    }).join("\n");

    const newsSitemap = `${xmlHeader()}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${newsEntries}
</urlset>`;

    return xmlResponse(newsSitemap);

  } catch (error) {
    console.error('Error generating news sitemap:', error);
    
    const errorSitemap = `${xmlHeader()}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <!-- Error: ${error.message} -->
</urlset>`;
    
    return new Response(errorSitemap, {
      status: 500,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=900, s-maxage=900',
      },
    });
  }
});
