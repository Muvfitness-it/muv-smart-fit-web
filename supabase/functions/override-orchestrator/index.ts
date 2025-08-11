import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QAItem {
  id: string;
  label: string;
  pass: boolean;
  details?: string;
}

interface AIWriterResponse {
  success: boolean;
  post?: { id: string; slug: string; title: string };
  qaChecks?: QAItem[];
  error?: string;
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
    // Costruisci i task da body/CSV o usa fallback
    let input: any = {};
    try { input = await req.json(); } catch (_) {}

    async function titlesFromCsvUrl(url: string): Promise<string[]> {
      try {
        const res = await fetch(url);
        const text = await res.text();
        // Estrai prima colonna "title"
        return text.split('\n').slice(1).map(l => l.split(',')[0].trim()).filter(Boolean);
      } catch (_) { return []; }
    }
    function titlesFromCsvString(csv: string): string[] {
      return csv.split('\n').slice(1).map(l => l.split(',')[0].trim()).filter(Boolean);
    }

    let titles: string[] = [];
    if (Array.isArray(input.titles)) {
      titles = input.titles.filter((t: any) => typeof t === 'string');
    } else if (typeof input.csvString === 'string') {
      titles = titlesFromCsvString(input.csvString);
    } else if (typeof input.csvUrl === 'string') {
      titles = await titlesFromCsvUrl(input.csvUrl);
    }

    if (titles.length === 0) {
      titles = [
        'Dimagrire con Vacuum a Legnago: guida completa',
        'Postura perfetta sotto il sole: Pancafit e Pilates'
      ];
    }

    const tasks: { title: string; action: 'write_from_title' | 'rewrite_from_title' }[] = titles
      .slice(0, input.limit || 5)
      .map((t: string, i: number) => ({
        title: t,
        action: (input?.action === 'rewrite_from_title' || (Array.isArray(input?.actions) && input.actions[i] === 'rewrite_from_title'))
          ? 'rewrite_from_title'
          : 'write_from_title'
      }));

    const results: any[] = [];

    for (const t of tasks) {
      // 1) Generate draft via AI writer
      const aiRes = await supabase.functions.invoke<AIWriterResponse>('ai-article-writer', {
        body: { title: t.title, action: t.action },
      });

      if (aiRes.error) {
        results.push({ title: t.title, action: t.action, ok: false, step: 'ai', error: aiRes.error.message });
        continue;
      }

      const data = aiRes.data as AIWriterResponse | null;
      if (!data || !data.success || !data.post) {
        results.push({ title: t.title, action: t.action, ok: false, step: 'ai', error: data?.error || 'Unknown AI response' });
        continue;
      }

      const allQAPassed = (data.qaChecks || []).every(q => q.pass);
      if (!allQAPassed) {
        results.push({ title: t.title, action: t.action, ok: false, step: 'qa', post: data.post, qaChecks: data.qaChecks });
        continue; // Do not publish if QA not 100%
      }

      // 2) Publish the post
      const { error: upErr } = await supabase
        .from('blog_posts')
        .update({ status: 'published', published_at: new Date().toISOString() })
        .eq('id', data.post.id);

      if (upErr) {
        results.push({ title: t.title, action: t.action, ok: false, step: 'publish', post: data.post, error: upErr.message });
        continue;
      }

      // 3) Update sitemaps (best-effort)
      try {
        await supabase.functions.invoke('sitemap', { body: { trigger: 'override_publish' } });
      } catch (_) {}
      try {
        await supabase.functions.invoke('news-sitemap', { body: {} });
      } catch (_) {}
      try {
        await supabase.functions.invoke('blog-sitemap', { body: {} });
      } catch (_) {}

      results.push({ title: t.title, action: t.action, ok: true, post: data.post, published: true });
    }

    return new Response(JSON.stringify({ ok: true, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('override-orchestrator error', e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
