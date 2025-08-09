import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Helpers
const trimTo = (s: string, n: number) => {
  if (!s) return s;
  if (s.length <= n) return s;
  const cut = s.slice(0, n - 1);
  const i = cut.lastIndexOf(' ');
  return (i > 30 ? cut.slice(0, i) : cut) + '…';
};

const stripHtml = (html: string) => html?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || '';

const slugify = (t: string) => t
  .toLowerCase()
  .replace(/[àáäâ]/g, 'a')
  .replace(/[èéëê]/g, 'e')
  .replace(/[ìíïî]/g, 'i')
  .replace(/[òóöô]/g, 'o')
  .replace(/[ùúüû]/g, 'u')
  .replace(/[ñ]/g, 'n')
  .replace(/[ç]/g, 'c')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

const addInternalLinks = (html: string) => {
  if (!html || html.includes('<!-- auto-internal-links -->')) return html;
  const block = `\n<!-- auto-internal-links -->\n<section aria-labelledby="next-steps" class="mt-8">\n  <h2 id="next-steps">Prossimi passi consigliati</h2>\n  <ul>\n    <li><a href="/servizi/hiit" rel="noopener">Dimagrimento rapido con HIIT</a></li>\n    <li><a href="/servizi/pancafit" rel="noopener">Postura e mal di schiena: Pancafit</a></li>\n    <li><a href="/servizi/ems" rel="noopener">Tecnologia EMS: risultati in meno tempo</a></li>\n    <li><a href="/servizi/pilates" rel="noopener">Pilates: stabilità e forza del core</a></li>\n  </ul>\n</section>`;
  return (html || '') + block;
};

const optimizeImages = (html: string) => {
  if (!html) return html;
  return html
    // ensure loading/decoding
    .replace(/<img\b([^>]*?)>/gi, (match, attrs) => {
      let a = attrs;
      if (!/\bloading=/.test(a)) a += ' loading="lazy"';
      if (!/\bdecoding=/.test(a)) a += ' decoding="async"';
      if (!/\balt=/.test(a)) a += ' alt="immagine articolo"';
      return `<img${a}>`;
    });
};

const isLegalPage = (title: string) => /privacy|cookie|termini|condizioni|legal|policy/i.test(title || '');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const { limit = 50 } = (await req.json().catch(() => ({}))) as { limit?: number };
    const runId = crypto.randomUUID();

    // Fetch up to `limit` posts (published + drafts), newest first
    const { data: posts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id,title,slug,content,excerpt,meta_title,meta_description,meta_keywords,status,published_at,updated_at,reading_time')
      .in('status', ['published', 'draft'])
      .order('updated_at', { ascending: false })
      .limit(Math.min(200, Math.max(1, limit)));

    if (fetchError) {
      console.error('Fetch posts error', fetchError);
      return new Response(JSON.stringify({ error: 'fetch_failed', details: fetchError.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const results: any[] = [];
    let processed = 0;
    let errors = 0;

    for (const post of posts || []) {
      try {
        if (isLegalPage(post.title)) {
          results.push({ id: post.id, skipped: true, reason: 'legal_page' });
          continue;
        }

        const before = {
          title: post.title,
          slug: post.slug,
          meta_title: post.meta_title,
          meta_description: post.meta_description,
          meta_keywords: post.meta_keywords,
          excerpt: post.excerpt,
        };
        const actions: string[] = [];

        // Backup content
        await supabase.from('blog_posts_backup').insert({ id: post.id, content_backup: post.content }).select().maybeSingle();

        // Generate meta
        let metaTitle = post.meta_title || post.title || '';
        metaTitle = trimTo(metaTitle, 60);
        if (!/muv|legnago/i.test(metaTitle) && metaTitle.length < 52) {
          const suffix = ' - MUV Fitness Legnago';
          metaTitle = trimTo(metaTitle + suffix, 60);
        }
        if (metaTitle !== post.meta_title) actions.push('meta_title_updated');

        const baseText = stripHtml(post.excerpt || post.content || '');
        let metaDescription = trimTo(baseText, 155);
        if (!/legnago/i.test(metaDescription) && baseText.length > 40) {
          const add = ' A Legnago (VR).';
          metaDescription = trimTo(metaDescription + add, 155);
        }
        if (metaDescription !== post.meta_description) actions.push('meta_description_updated');

        // Keywords simple extractor
        const words = (baseText.toLowerCase().match(/[a-zà-ú]{4,}/gi) || [])
          .filter(w => !['questo','quello','dalla','delle','dello','della','come','solo','anche','alla','sono','alla','dopo','prima','mentre','queste','questi','quali','puoi','può','fare','faremo','cosa','dove','quando','legnago','smart','muv'].includes(w));
        const unique = Array.from(new Set(words)).slice(0, 6);
        const kw = unique.concat(['allenamento','benessere','fitness']).slice(0, 6).join(', ');
        const metaKeywords = kw || post.meta_keywords;
        if (metaKeywords !== post.meta_keywords) actions.push('meta_keywords_updated');

        // Slug normalization
        let newSlug = slugify(post.slug || post.title || 'articolo');
        if (newSlug !== post.slug) {
          actions.push('slug_updated');
          // create redirect
          await supabase.from('url_redirects').upsert({
            from_path: `/blog/${post.slug}`,
            to_path: `/blog/${newSlug}`,
            status_code: 301,
            source_type: 'auto-optimizer'
          }, { onConflict: 'from_path' });
        }

        // Content improvements
        let newContent = optimizeImages(addInternalLinks(post.content || ''));

        // Reading time
        const wc = stripHtml(newContent).split(/\s+/).filter(Boolean).length;
        const reading_time = Math.max(1, Math.ceil(wc / 200));

        // Update post
        const { error: updateError } = await supabase.from('blog_posts').update({
          meta_title: metaTitle,
          meta_description: metaDescription,
          meta_keywords: metaKeywords,
          slug: newSlug,
          content: newContent,
          reading_time,
          updated_at: new Date().toISOString()
        }).eq('id', post.id);

        if (updateError) throw updateError;

        const after = {
          slug: newSlug,
          meta_title: metaTitle,
          meta_description: metaDescription,
          meta_keywords: metaKeywords,
        };

        // Log
        await supabase.from('auto_optimizer_logs').insert({
          run_id: runId,
          content_type: 'blog_post',
          content_id: post.id,
          path: `/blog/${newSlug}`,
          actions,
          before,
          after,
          errors: [],
          impact_score: Math.min(100, actions.length * 15)
        });

        results.push({ id: post.id, slug: newSlug, actions });
        processed++;
      } catch (e) {
        console.error('Process error', e);
        errors++;
        await supabase.from('auto_optimizer_logs').insert({
          run_id: runId,
          content_type: 'blog_post',
          content_id: post.id,
          path: `/blog/${post.slug}`,
          actions: [],
          before: {},
          after: {},
          errors: [String(e?.message || e)],
          impact_score: 0
        });
      }
    }

    // Trigger sitemap refresh (best-effort)
    try {
      await supabase.functions.invoke('update-sitemaps', {
        body: { action: 'update_all_sitemaps', trigger: 'auto_optimizer' }
      });
    } catch (_) { /* ignore */ }

    return new Response(JSON.stringify({
      run_id: runId,
      processed,
      errors,
      results
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('Auto Optimizer fatal error', err);
    return new Response(JSON.stringify({ error: 'fatal', details: String(err?.message || err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
