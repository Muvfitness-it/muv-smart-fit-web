import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Provider = 'openai' | 'gemini';

interface PostRow {
  id: string;
  slug: string;
  title: string;
  content: string;
  status: string;
  meta_title: string | null;
  meta_description: string | null;
  excerpt: string | null;
}

interface RewriteResult {
  id: string;
  slug: string;
  ok: boolean;
  error?: string;
  qaChecks?: Record<string, boolean>;
}

function extractJsonString(text: string): string | null {
  const block = text.match(/```json\s*([\s\S]*?)```/i) || text.match(/```\s*([\s\S]*?)```/i);
  if (block?.[1]) return block[1].trim();
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    return text.slice(start, end + 1).trim();
  }
  return null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!SUPABASE_URL || !SERVICE_ROLE) {
    return new Response(JSON.stringify({ error: 'Missing Supabase env vars' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

  try {
    const body = await req.json().catch(() => ({}));
    const provider: Provider = (body.provider === 'gemini') ? 'gemini' : 'openai';
    const batchSize: number = Math.min(Math.max(Number(body.batchSize) || 10, 1), 25);
    const offset: number = Math.max(Number(body.offset) || 0, 0);
    const statuses: string[] = Array.isArray(body.statuses) ? body.statuses : ['published', 'draft'];
    const dryRun: boolean = !!body.dryRun;

    // Fetch posts page
    const { data: posts, error: listErr } = await supabase
      .from('blog_posts')
      .select('id, slug, title, content, status, meta_title, meta_description, excerpt')
      .in('status', statuses)
      .order('updated_at', { ascending: true })
      .range(offset, offset + batchSize - 1);

    if (listErr) throw new Error('DB list error: ' + listErr.message);

    // Count total
    const { count } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .in('status', statuses);

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (provider === 'openai' && !openAIApiKey) throw new Error('OpenAI API key not configured');
    if (provider === 'gemini' && !geminiKey) throw new Error('Gemini API key not configured');

    const results: RewriteResult[] = [];

    const systemPrompt = `AGISCI COME: Editor Senior SEO per MUV Fitness.
OBIETTIVO: RISCRIVI TOTALMENTE l'articolo in HTML SEMANTICO PULITO, rimuovendo elementi superflui, frasi ridondanti, link non pertinenti o doppi e qualsiasi markdown.

STILE
- Professionale, chiaro, scorrevole; frasi <= 20 parole; paragrafi brevi.
- Tono empatico, orientato ai benefici.

STRUTTURA OBBLIGATORIA
- <h1> unico con keyword principale in testa.
- Intro 80–120 parole con promessa di valore.
- Corpo con <h2>/<h3>, liste dove utili, <strong>/<em> moderati.
- Conclusione con CTA: "Vuoi risultati concreti e duraturi? Prenota oggi la tua prova gratuita al Centro Fitness MUV a Legnago."
- 2–4 link interni pertinenti (solo URL del sito, no esterni), anchor descrittive.
- Immagini (se presenti): <img loading="lazy" alt="descrizione naturale con keyword">.
- In coda INSERISCI <script type="application/ld+json"> con JSON-LD Article coerente con title, meta, slug fornito, "author": "MUV Fitness".
- NIENTE markdown, NIENTE stile inline superfluo.

OUTPUT JSON RICHIESTO:
{
  "content": "HTML completo",
  "title": "Titolo H1",
  "meta_title": "<=60",
  "meta_description": "<=155",
  "excerpt": "160-220 caratteri",
  "reading_time": 5,
  "keywords": ["k1","k2"],
  "internal_links": [{"anchor":"","url":"/servizi/..."}]
}`;

    for (const p of (posts || []) as PostRow[]) {
      try {
        const userPrompt = `RISCRIVI DA ZERO QUESTO ARTICOLO.
Titolo corrente: "${p.title}"
Slug: ${p.slug}
Contenuto originale (SOLO CONTESTO, NON COPIARE):\n${p.content?.slice(0, 8000) || ''}\n\nSegui rigorosamente le regole e restituisci SOLO il JSON nel formato richiesto.`;

        let raw = '';
        if (provider === 'openai') {
          const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${openAIApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              response_format: { type: 'json_object' },
              temperature: 0.6,
              max_tokens: 3500,
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
              ]
            })
          });
          const data = await res.json();
          raw = data?.choices?.[0]?.message?.content ?? '';
        } else {
          const gRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=' + geminiKey, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]}],
              generationConfig: {
                temperature: 0.6,
                maxOutputTokens: 3500,
                responseMimeType: 'application/json'
              }
            })
          });
          const gData = await gRes.json();
          raw = gData?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
        }

        if (!raw) throw new Error('Empty AI response');

        const jsonStr = extractJsonString(raw) ?? raw.trim();
        const obj = JSON.parse(jsonStr);

        // QA checks
        const qaChecks = {
          hasSingleH1: (obj.content?.match(/<h1[^>]*>.*?<\/h1>/gi) || []).length === 1,
          hasH2: /<h2[^>]*>.*?<\/h2>/i.test(obj.content || ''),
          h3HierarchyValid: !/<h3[^>]*>/i.test(obj.content || '') || /<h2[^>]*>/i.test(obj.content || ''),
          hasCTA: /prenota.*prova.*gratuita|prova.*gratuita.*prenota/i.test(obj.content || ''),
          hasIntro: (obj.content || '').replace(/<[^>]*>/g, '').length > 200,
          validMetaTitle: !!obj.meta_title && obj.meta_title.length <= 60,
          validMetaDescription: !!obj.meta_description && obj.meta_description.length <= 155,
          hasInternalLinks: Array.isArray(obj.internal_links) && obj.internal_links.length >= 2 && obj.internal_links.length <= 5,
          imagesAltLazy: !/<img[^>]*>/i.test(obj.content || '') || (/<img[^>]*alt="[^"]+"/i.test(obj.content || '') && /<img[^>]*loading="lazy"[^>]*>/i.test(obj.content || '')),
          hasJsonLd: /<script[^>]+type="application\/ld\+json"[^>]*>/i.test(obj.content || ''),
        };
        const ok = Object.values(qaChecks).every(Boolean);

        if (!ok) {
          results.push({ id: p.id, slug: p.slug, ok: false, qaChecks });
          continue;
        }

        if (!dryRun) {
          // Backup originale
          await supabase.from('blog_posts_backup').insert({ id: p.id, content_backup: p.content });

          // Aggiorna post (mantieni slug e status)
          const { error: upErr } = await supabase
            .from('blog_posts')
            .update({
              title: obj.title || p.title,
              content: obj.content,
              excerpt: obj.excerpt || p.excerpt,
              meta_title: obj.meta_title || p.meta_title,
              meta_description: obj.meta_description || p.meta_description,
              reading_time: obj.reading_time || 5,
              updated_at: new Date().toISOString(),
            })
            .eq('id', p.id);

          if (upErr) throw new Error('DB update error: ' + upErr.message);
        }

        results.push({ id: p.id, slug: p.slug, ok: true });
      } catch (e) {
        console.error('Rewrite error for', p.slug, e);
        results.push({ id: p.id, slug: p.slug, ok: false, error: String(e) });
      }
    }

    const processed = (posts || []).length;
    const nextOffset = offset + processed;
    const done = nextOffset >= (count || 0);

    // Best-effort sitemap update if done and not dryRun
    if (done && !dryRun) {
      try { await supabase.functions.invoke('sitemap', { body: { trigger: 'batch_rewrite' } }); } catch (_) {}
      try { await supabase.functions.invoke('news-sitemap', { body: {} }); } catch (_) {}
      try { await supabase.functions.invoke('blog-sitemap', { body: {} }); } catch (_) {}
    }

    return new Response(JSON.stringify({
      ok: true,
      provider,
      total: count || 0,
      processed,
      offset,
      nextOffset,
      done,
      results
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('blog-batch-rewrite error', e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
