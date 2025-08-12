import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function stripTags(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function limit(str: string, max: number) {
  if (str.length <= max) return str;
  const cut = str.slice(0, max - 1);
  return cut.replace(/\s+\S*$/, "") + "…";
}

function cleanContent(original: string) {
  let html = original || "";
  const issues: string[] = [];

  // Remove inline styles and <font>
  const beforeStyles = html;
  html = html.replace(/\sstyle=\"[^\"]*\"/gi, "");
  html = html.replace(/<\/?font[^>]*>/gi, "");
  if (beforeStyles !== html) issues.push("inline-styles-font-removed");

  // Unwrap nested <strong><em>...</em></strong>
  const beforeNested = html;
  html = html.replace(/<(strong|b)>\s*<em>([\s\S]*?)<\/em>\s*<\/(strong|b)>/gi, "<strong>$2</strong>");
  if (beforeNested !== html) issues.push("nested-strong-em-unwrapped");

  // Unwrap very long bold blocks and limit bold spans to <= 6 words
  html = html.replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, (m, _tag, inner) => {
    const text = inner.replace(/<[^>]*>/g, "").trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    if (text.length >= 300 || wordCount > 6) {
      issues.push("excessive-bold-unwrapped");
      return inner; // unwrap
    }
    return m;
  });

  // Unwrap full-bold paragraphs
  html = html.replace(/<p>\s*<(strong|b)>([\s\S]{60,}?)<\/\1>\s*<\/p>/gi, (m, _t, inner) => {
    issues.push("full-bold-paragraph-unwrapped");
    return `<p>${inner}</p>`;
  });

  // Deduplicate "Prossimi passi" sections (keep first heading + list)
  let nextStepsCount = 0;
  html = html.replace(/<h[1-3][^>]*>[^<]*prossimi\s+passi[^<]*<\/h[1-3]>[\s\S]*?(?:<ul[\s\S]*?<\/ul>|<ol[\s\S]*?<\/ol>)/gi, (m) => {
    nextStepsCount += 1;
    if (nextStepsCount === 1) return m;
    issues.push("next-steps-duplicate-removed");
    return "";
  });

  // Ensure one H1 only, convert extras to H2 and trim long H1 text
  let seenH1 = false;
  html = html.replace(/<h1([^>]*)>([\s\S]*?)<\/h1>/gi, (m, attrs, text) => {
    if (!seenH1) {
      seenH1 = true;
      const plain = text.replace(/<[^>]*>/g, "").trim();
      if (plain.length > 70) {
        issues.push("h1-trimmed");
        const trimmed = limit(plain, 70);
        return `<h1${attrs}>${trimmed}</h1>`;
      }
      return m;
    } else {
      issues.push("extra-h1-converted");
      return `<h2${attrs}>${text}</h2>`;
    }
  });

  // Normalize images: https absolute, lazy, decoding, fallback alt
  html = html.replace(/<img([^>]*?)>/gi, (m, attrs) => {
    let a = attrs || "";
    const srcMatch = a.match(/\ssrc=[\"']([^\"']+)[\"']/i);
    if (srcMatch) {
      let src = srcMatch[1];
      if (src.startsWith("//")) src = "https:" + src;
      else if (src.startsWith("/")) src = "https://www.muvfitness.it" + src;
      else if (src.startsWith("http://")) src = "https://" + src.slice(7);
      a = a.replace(srcMatch[0], ` src="${src}"`);
    }
    if (!/\bloading=/.test(a)) a += ' loading="lazy"';
    if (!/\bdecoding=/.test(a)) a += ' decoding="async"';
    if (!/\balt=/.test(a)) a += ' alt="Immagine articolo MUV Fitness"';
    return `<img${a}>`;
  });

  // Clean links: force https, absolute for internal, remove empty, rel on external, improve anchor 'clicca qui'
  html = html.replace(/<a([^>]*?)>([\s\S]*?)<\/a>/gi, (m, attrs, inner) => {
    let a = attrs || "";
    const hrefMatch = a.match(/\shref=[\"']([^\"']*)[\"']/i);
    if (!hrefMatch) return m;
    let href = hrefMatch[1];
    if (!href || href === "#") {
      issues.push("empty-link-removed");
      return inner; // unwrap
    }
    if (href.startsWith("//")) href = "https:" + href;
    else if (href.startsWith("http://")) href = "https://" + href.slice(7);
    else if (href.startsWith("/")) href = "https://www.muvfitness.it" + href;
    const isExternal = !href.includes("muvfitness.it");
    if (isExternal && !/\brel=/.test(a)) a += ' rel="nofollow noopener"';
    a = a.replace(hrefMatch[0], ` href="${href}"`);
    const textPlain = inner.replace(/<[^>]*>/g, "").trim().toLowerCase();
    if (textPlain === "clicca qui") {
      issues.push("anchor-text-improved");
      return `<a${a}>scopri di più</a>`;
    }
    return `<a${a}>${inner}</a>`;
  });

  // Remove empty paragraphs and excessive &nbsp;
  html = html.replace(/<p>(?:\s|&nbsp;)*<\/p>/gi, "");
  html = html.replace(/(?:&nbsp;\s*){2,}/gi, " ");

  return { html, issues };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseKey) {
      return new Response(JSON.stringify({ ok: false, error: "Missing Supabase env" }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 });
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json().catch(() => ({}));
    const limit: number | undefined = body?.limit;

    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, content, meta_title, meta_description, status, published_at, featured_image")
      .in("status", ["published", "draft"])
      .order("updated_at", { ascending: false })
      .limit(typeof limit === "number" ? limit : 500);

    if (error) throw error;

    const report: any = {
      ok: true,
      scanned: posts?.length || 0,
      modified: 0,
      issuesByClass: {},
      items: [] as any[],
      timestamp: new Date().toISOString(),
    };

    if (!posts || posts.length === 0) {
      return new Response(JSON.stringify(report), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    for (const post of posts) {
      const before = String(post.content || "");
      const { html: cleaned, issues } = cleanContent(before);

      // Meta generation
      let newTitle = post.meta_title || "";
      let newDesc = post.meta_description || "";
      const plain = stripTags(cleaned);
      if (!newTitle || newTitle.length > 60) {
        const base = limit(String(post.title || ""), 55);
        newTitle = limit(`${base} | MUV Fitness`, 60);
        issues.push("meta-title-generated");
      }
      if (!newDesc || newDesc.length > 155) {
        newDesc = limit(plain, 155);
        issues.push("meta-description-generated");
      }

      // Skip update if nothing changed
      const normalizedBefore = before.trim();
      const normalizedAfter = cleaned.trim();
      const metaChanged = (post.meta_title || "") !== newTitle || (post.meta_description || "") !== newDesc;
      const contentChanged = normalizedBefore !== normalizedAfter;

      if (!contentChanged && !metaChanged) {
        report.items.push({ id: post.id, slug: post.slug, changed: false, issues: [] });
        continue;
      }

      // Backup original
      const { error: backupErr } = await supabase
        .from("blog_posts_backup")
        .insert({ id: post.id, content_backup: before });
      if (backupErr) {
        return new Response(
          JSON.stringify({ ok: false, error: "backup-failed", details: backupErr.message }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 },
        );
      }

      // Update post
      const { error: updErr } = await supabase
        .from("blog_posts")
        .update({ content: cleaned, meta_title: newTitle, meta_description: newDesc, updated_at: new Date().toISOString() })
        .eq("id", post.id);

      if (updErr) {
        report.items.push({ id: post.id, slug: post.slug, changed: false, error: updErr.message });
        continue;
      }

      report.modified += 1;
      // Aggregate issue classes
      issues.forEach((iss) => {
        report.issuesByClass[iss] = (report.issuesByClass[iss] || 0) + 1;
      });
      report.items.push({ id: post.id, slug: post.slug, changed: true, issues });
    }

    return new Response(JSON.stringify(report), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 });
  }
});
