import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseKey) {
    return new Response(JSON.stringify({ ok: false, error: "Missing Supabase env" }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // 1) Cleanup & backup
    const { data: cleanupData, error: cleanupErr } = await supabase.functions.invoke("blog-cleanup", { body: { limit: 500 } });
    if (cleanupErr) throw new Error(`blog-cleanup: ${cleanupErr.message}`);

    // 2) Internal linking + JSON-LD (in parallelo)
    const [linkerRes, jsonldRes] = await Promise.all([
      supabase.functions.invoke("internal-linker", { body: { batchSize: 50 } }),
      supabase.functions.invoke("jsonld-optimizer", { body: {} }),
    ]);
    if (linkerRes.error) throw new Error(`internal-linker: ${linkerRes.error.message}`);
    if (jsonldRes.error) throw new Error(`jsonld-optimizer: ${jsonldRes.error.message}`);

    // 3) Media optimization + Sitemaps (in parallelo)
    const [imgOptRes, smRes, blogSmRes, newsSmRes] = await Promise.all([
      supabase.functions.invoke("image-optimizer", { body: { mode: "webp+og", limit: 100 } }),
      supabase.functions.invoke("sitemap", { body: {} }),
      supabase.functions.invoke("blog-sitemap", { body: {} }),
      supabase.functions.invoke("news-sitemap", { body: {} }),
    ]);
    if (imgOptRes.error) throw new Error(`image-optimizer: ${imgOptRes.error.message}`);
    if (smRes.error) throw new Error(`sitemap: ${smRes.error.message}`);
    if (blogSmRes.error) throw new Error(`blog-sitemap: ${blogSmRes.error.message}`);
    if (newsSmRes.error) throw new Error(`news-sitemap: ${newsSmRes.error.message}`);

    const report = {
      ok: true,
      cleanup: cleanupData?.data || cleanupData || null,
      linker: linkerRes?.data || null,
      jsonld: jsonldRes?.data || null,
      images: imgOptRes?.data || null,
      sitemaps: { sitemap: smRes?.data || null, blog: blogSmRes?.data || null, news: newsSmRes?.data || null },
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(report), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 });
  }
});
