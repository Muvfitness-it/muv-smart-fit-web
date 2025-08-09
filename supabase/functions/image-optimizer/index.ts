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

    // Get posts that need image optimization
    const { data: posts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id, title, content, featured_image')
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
        let updatedContent = post.content;
        let hasChanges = false;

        // Simple image optimization - add lazy loading and dimensions
        const imgRegex = /<img\s+([^>]*?)>/g;
        
        updatedContent = updatedContent.replace(imgRegex, (match) => {
          let optimizedImg = match;
          
          // Add loading="lazy" if not present
          if (!optimizedImg.includes('loading=')) {
            optimizedImg = optimizedImg.replace('>', ' loading="lazy">');
            hasChanges = true;
          }
          
          // Add decoding="async" if not present
          if (!optimizedImg.includes('decoding=')) {
            optimizedImg = optimizedImg.replace('>', ' decoding="async">');
            hasChanges = true;
          }
          
          return optimizedImg;
        });

        // Update post if changes were made
        if (hasChanges) {
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
            status: 'images_optimized',
            changes: 'Aggiunto lazy loading e attributi async'
          });
          processed++;
        } else {
          results.push({
            id: post.id,
            title: post.title,
            status: 'no_changes_needed',
            changes: 'Nessuna modifica necessaria'
          });
        }

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
    console.error('Image optimization error:', error);
    return new Response(JSON.stringify({
      error: 'Image optimization failed',
      details: String(error?.message || error)
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});