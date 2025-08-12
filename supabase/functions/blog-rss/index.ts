import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseKey) {
      return new Response("Missing Supabase env vars", { status: 500, headers: corsHeaders });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("RSS query error:", error);
      return new Response("Query error", { status: 500, headers: corsHeaders });
    }

    const siteUrl = "https://www.muvfitness.it";
    const feedTitle = "MUV Fitness Blog";
    const feedDescription = "Ultimi articoli dal blog di MUV Fitness Legnago";
    const feedLink = `${siteUrl}/blog`;

    const items = (posts || []).map((p) => {
      const link = `${siteUrl}/blog/${p.slug}`;
      const pub = p.published_at ? new Date(p.published_at).toUTCString() : new Date().toUTCString();
      const desc = (p.excerpt || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const title = (p.title || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `\n    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pub}</pubDate>
      <description>${desc}</description>
    </item>`;
    }).join("");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${feedTitle}</title>
    <link>${feedLink}</link>
    <description>${feedDescription}</description>
    <language>it-IT</language>${items}
  </channel>
</rss>`;

    return new Response(rss, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=600, max-age=60",
      },
    });
  } catch (e) {
    console.error("RSS error:", e);
    return new Response("Internal error", { status: 500, headers: corsHeaders });
  }
});
