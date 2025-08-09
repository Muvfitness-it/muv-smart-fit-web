import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

function stripHtml(text: string): string {
  return (text || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function countWords(text: string): number {
  const clean = stripHtml(text);
  if (!clean) return 0;
  return clean.split(/\s+/).length;
}

function dedupeAnchors(html: string): string {
  if (!html) return html;
  let result = html;
  const re = new RegExp('(<a[\\s\\S]*?>[\\s\\S]*?<\\/a>)(\\s*)\\1', 'gi');
  let prev: string;
  do {
    prev = result;
    result = result.replace(re, '$1');
  } while (result !== prev);
  return result;
}

function dedupeCTA(html: string): string {
  if (!html) return html;
  let result = html;
  // Collapse duplicate CTA blocks with class cta-section
  const reBlock = new RegExp('(<div[^>]*class=\"[^\"]*cta-section[^\"]*\"[\s\S]*?<\\/div>)(?:\s*\1)+', 'gi');
  result = result.replace(reBlock, '$1');
  return result;
}

async function repairHtml(supabase: any, html: string): Promise<string> {
  try {
    const { data, error } = await supabase.rpc('repair_html_content', { input_content: html });
    if (error) throw error;
    return data || html;
  } catch (_e) {
    // Fallback minimal cleanup
    return html.replace(/>\s+</g, '><');
  }
}

function pickBestBackup(backups: Array<{ content_backup: string; backed_up_at: string }>): { content: string; words: number } | null {
  if (!backups || backups.length === 0) return null;
  let best = backups[0];
  let bestWords = countWords(best.content_backup || '');
  for (let i = 1; i < backups.length; i++) {
    const w = countWords(backups[i].content_backup || '');
    if (w > bestWords || (w === bestWords && backups[i].backed_up_at > best.backed_up_at)) {
      best = backups[i];
      bestWords = w;
    }
  }
  return { content: best.content_backup || '', words: bestWords };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const body = await req.json().catch(() => ({}));
    const excludeSlugs: string[] = body.excludeSlugs || ['privacy', 'cookie-policy', 'termini-condizioni'];
    const minWords: number = body.minWords || 2000;

    // 1) Fetch posts to process
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('id, slug, title, status, content')
      .in('status', ['published', 'draft'])
      .not('slug', 'in', `(${excludeSlugs.join(',')})`);

    if (postsError) throw postsError;

    // 2) Snapshot current contents
    const snapshotRows = (posts || [])
      .filter((p) => p.content && p.content.length > 0)
      .map((p) => ({ id: p.id, content_backup: p.content, backed_up_at: new Date().toISOString() }));

    if (snapshotRows.length > 0) {
      await supabase.from('blog_posts_backup').insert(snapshotRows, { returning: 'minimal' });
    }

    const results: any[] = [];
    const underMin: any[] = [];
    const errors: any[] = [];

    // 3) Process each post
    for (const post of posts || []) {
      try {
        // Fetch backups for this post
        const { data: backups, error: bErr } = await supabase
          .from('blog_posts_backup')
          .select('content_backup, backed_up_at')
          .eq('id', post.id)
          .order('backed_up_at', { ascending: false });
        if (bErr) throw bErr;

        const best = pickBestBackup(backups || []);
        if (!best || !best.content) {
          // No backup found; skip but record
          results.push({ id: post.id, slug: post.slug, title: post.title, action: 'no-backup-found' });
          continue;
        }

        // Repair + dedupe
        let content = await repairHtml(supabase, best.content);
        content = dedupeAnchors(content);
        content = dedupeCTA(content);

        const words = countWords(content);

        // Update post content
        const { error: upErr } = await supabase
          .from('blog_posts')
          .update({ content, updated_at: new Date().toISOString() })
          .eq('id', post.id);
        if (upErr) throw upErr;

        const entry: any = {
          id: post.id,
          slug: post.slug,
          title: post.title,
          status: post.status,
          words,
          action: 'restored',
        };
        results.push(entry);
        if (words < minWords) underMin.push({ id: post.id, slug: post.slug, title: post.title, words });
      } catch (e: any) {
        errors.push({ id: post.id, slug: post.slug, title: post.title, error: e?.message || String(e) });
      }
    }

    const summary = {
      total_posts: posts?.length || 0,
      restored: results.filter(r => r.action === 'restored').length,
      no_backup: results.filter(r => r.action === 'no-backup-found').length,
      under_min_count: underMin.length,
      min_words: minWords,
    };

    return new Response(
      JSON.stringify({ success: true, summary, results, under_min: underMin, errors }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('restore-backups error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error?.message || String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});