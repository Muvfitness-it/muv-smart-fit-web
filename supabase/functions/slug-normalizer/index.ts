import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Slug normalization function
const slugify = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[àáäâ]/g, 'a')
    .replace(/[èéëê]/g, 'e')
    .replace(/[ìíïî]/g, 'i')
    .replace(/[òóöô]/g, 'o')
    .replace(/[ùúüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/💪|🏋️|🔥|⚡|✨|🎯|🌟/g, '') // Remove emojis
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 2 && !['per', 'con', 'del', 'dei', 'delle', 'alla', 'nel', 'sul', 'anche', 'come', 'una', 'uno', 'gli', 'che'].includes(word))
    .slice(0, 6) // Max 6 keywords
    .join('-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const { batchSize = 10 } = (await req.json().catch(() => ({}))) as { batchSize?: number };

    // Find posts with problematic slugs
    const { data: posts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id, title, slug, status')
      .in('status', ['published', 'draft'])
      .limit(batchSize);

    if (fetchError) {
      throw new Error(`Fetch error: ${fetchError.message}`);
    }

    const results = [];
    const redirects = [];
    let processed = 0;
    let errors = [];

    for (const post of posts || []) {
      try {
        const currentSlug = post.slug;
        const slugLength = currentSlug.length;
        const wordCount = currentSlug.split('-').length;

        // Check if slug needs optimization
        if (slugLength > 50 || wordCount > 8 || currentSlug.includes('rapiditelligente') || currentSlug.includes('--')) {
          const newSlug = slugify(post.title);
          
          if (newSlug && newSlug !== currentSlug && newSlug.length > 5) {
            // Check if new slug already exists
            const { data: existing } = await supabase
              .from('blog_posts')
              .select('id')
              .eq('slug', newSlug)
              .neq('id', post.id)
              .maybeSingle();

            if (existing) {
              // Add unique suffix if slug exists
              const uniqueSlug = `${newSlug}-${post.id.slice(-8)}`;
              
              // Update post with unique slug
              const { error: updateError } = await supabase
                .from('blog_posts')
                .update({ slug: uniqueSlug, updated_at: new Date().toISOString() })
                .eq('id', post.id);

              if (updateError) throw updateError;

              // Create redirect
              await supabase.from('url_redirects').upsert({
                from_path: `/blog/${currentSlug}`,
                to_path: `/blog/${uniqueSlug}`,
                status_code: 301,
                source_type: 'slug_normalization'
              }, { onConflict: 'from_path' });

              results.push({
                id: post.id,
                title: post.title,
                from_slug: currentSlug,
                to_slug: uniqueSlug,
                status: 'updated_with_suffix'
              });

              redirects.push(`/blog/${currentSlug} → /blog/${uniqueSlug}`);
            } else {
              // Update post with new slug
              const { error: updateError } = await supabase
                .from('blog_posts')
                .update({ slug: newSlug, updated_at: new Date().toISOString() })
                .eq('id', post.id);

              if (updateError) throw updateError;

              // Create redirect
              await supabase.from('url_redirects').upsert({
                from_path: `/blog/${currentSlug}`,
                to_path: `/blog/${newSlug}`,
                status_code: 301,
                source_type: 'slug_normalization'
              }, { onConflict: 'from_path' });

              results.push({
                id: post.id,
                title: post.title,
                from_slug: currentSlug,
                to_slug: newSlug,
                status: 'updated'
              });

              redirects.push(`/blog/${currentSlug} → /blog/${newSlug}`);
            }
            processed++;
          } else {
            results.push({
              id: post.id,
              title: post.title,
              from_slug: currentSlug,
              to_slug: currentSlug,
              status: 'no_change_needed'
            });
          }
        } else {
          results.push({
            id: post.id,
            title: post.title,
            from_slug: currentSlug,
            to_slug: currentSlug,
            status: 'already_optimized'
          });
        }
      } catch (e) {
        errors.push(`Error processing ${post.id}: ${e.message}`);
      }
    }

    // Trigger sitemap update if any changes were made
    if (processed > 0) {
      try {
        await supabase.functions.invoke('update-sitemaps', {
          body: { action: 'update_all_sitemaps', trigger: 'slug_normalization' }
        });
      } catch (e) {
        console.warn('Sitemap update failed:', e);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      processed,
      total_checked: posts?.length || 0,
      results,
      redirects_created: redirects,
      errors,
      message: `Processed ${processed} slug updates with ${redirects.length} redirects created`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Slug normalization error:', error);
    return new Response(JSON.stringify({
      error: 'Slug normalization failed',
      details: String(error?.message || error)
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});