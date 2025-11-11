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

    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .not('published_at', 'is', null)
      .order('updated_at', { ascending: false })
      .limit(10000);

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    if (!posts || posts.length === 0) {
      const emptySitemap = `${xmlHeader()}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
      return xmlResponse(emptySitemap);
    }

    const items = posts.map((post: any) => {
      const lastmod = rfc3339(post.updated_at ?? post.published_at);
      return `  <url>
    <loc>${SITE}/${escapeXml(post.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }).join("\n");

    const sitemap = `${xmlHeader()}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;

    return xmlResponse(sitemap);

  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    
    const errorSitemap = `${xmlHeader()}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
