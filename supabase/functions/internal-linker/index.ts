import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const { batchSize = 15 } = (await req.json().catch(() => ({}))) as { batchSize?: number };

    // Get posts that need internal linking
    const { data: posts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id, title, slug, content')
      .in('status', ['published', 'draft'])
      .not('content', 'is', null)
      .limit(batchSize);

    if (fetchError) {
      throw new Error(`Fetch error: ${fetchError.message}`);
    }

    const results = [];
    let processed = 0;
    const errors = [];

    for (const post of posts || []) {
      try {
        // Skip if already has auto-internal-links
        if (post.content.includes('<!-- auto-internal-links -->')) {
          results.push({
            id: post.id,
            title: post.title,
            status: 'already_has_links',
            linksAdded: []
          });
          continue;
        }

        let updatedContent = post.content;
        const linksAdded: string[] = [];

        // Add a simple related posts section at the end
        const relatedSection = `
<!-- auto-internal-links -->
<section aria-labelledby="prossimi-passi" class="mt-8 p-6 bg-gray-50 rounded-lg">
  <h2 id="prossimi-passi" class="text-xl font-semibold mb-4">Prossimi passi consigliati</h2>
  <ul class="space-y-2">
    <li><a href="/servizi/hiit" rel="noopener" class="text-primary hover:underline">Allenamento HIIT</a></li>
    <li><a href="/servizi/ems" rel="noopener" class="text-primary hover:underline">Tecnologia EMS</a></li>
    <li><a href="/contatti" rel="noopener" class="text-primary hover:underline">Prenota la tua consulenza gratuita</a></li>
    <li><a href="/risultati" rel="noopener" class="text-primary hover:underline">Guarda i risultati dei nostri clienti</a></li>
  </ul>
</section>
<!-- /auto-internal-links -->`;

        updatedContent += relatedSection;
        linksAdded.push('Sezione "Prossimi passi" aggiunta');

        // Update post
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update({ 
            content: updatedContent,
            updated_at: new Date().toISOString()
          })
          .eq('id', post.id);

        if (updateError) throw updateError;

        results.push({
          id: post.id,
          title: post.title,
          status: 'links_added',
          linksAdded
        });
        processed++;

      } catch (e) {
        errors.push(`Error processing ${post.id}: ${e.message}`);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      processed,
      total_checked: posts?.length || 0,
      results,
      errors
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Internal linking error:', error);
    return new Response(JSON.stringify({
      error: 'Internal linking failed',
      details: String(error?.message || error)
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});