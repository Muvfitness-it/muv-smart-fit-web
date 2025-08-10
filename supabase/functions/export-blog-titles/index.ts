import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing Supabase env vars');
      return new Response(
        JSON.stringify({ error: 'Missing Supabase configuration' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch current posts (both published and drafts) to preserve titles/URLs
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('title, slug, published_at, created_at')
      .order('published_at', { ascending: false, nullsFirst: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const baseUrl = 'https://www.muvfitness.it/blog';

    const escapeCsv = (value: string | null | undefined) => {
      const v = (value ?? '').toString();
      // Escape double quotes by doubling them and wrap field in quotes if contains comma/quote/newline
      const needsQuotes = /[",\n]/.test(v);
      const escaped = v.replace(/"/g, '""');
      return needsQuotes ? `"${escaped}"` : escaped;
    };

    const rows = posts || [];
    const header = 'title,url,date';
    const lines = rows.map((p) => {
      const url = `${baseUrl}/${(p as any).slug}`;
      const date = ((p as any).published_at || (p as any).created_at || '').toString();
      return [escapeCsv((p as any).title), escapeCsv(url), escapeCsv(date)].join(',');
    });

    const csv = [header, ...lines].join('\n');

    return new Response(csv, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="muv-blog-titoli.csv"',
      },
      status: 200,
    });
  } catch (err: any) {
    console.error('Unexpected error exporting blog titles:', err);
    return new Response(
      JSON.stringify({ error: 'Unexpected error', details: err?.message || String(err) }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
