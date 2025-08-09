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

    // Get posts that need JSON-LD optimization
    const { data: posts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*')
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

        // Remove existing JSON-LD scripts to avoid duplicates
        updatedContent = updatedContent.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>.*?<\/script>/gis, '');

        // Generate simple Article schema
        const articleSchema = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.meta_description || post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 160),
          image: post.featured_image || "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png",
          author: {
            "@type": "Person",
            name: post.author_name || "MUV Fitness Team",
            url: "https://www.muvfitness.it"
          },
          publisher: {
            "@type": "Organization",
            name: "MUV Fitness",
            logo: {
              "@type": "ImageObject",
              url: "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
            }
          },
          datePublished: new Date(post.published_at || post.created_at).toISOString(),
          dateModified: new Date(post.updated_at || post.created_at).toISOString(),
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.muvfitness.it/blog/${post.slug}`
          }
        };

        // Add JSON-LD script
        const jsonldScript = `<script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
</script>`;

        updatedContent += '\n\n<!-- SEO JSON-LD -->\n' + jsonldScript + '\n<!-- /SEO JSON-LD -->';
        hasChanges = true;

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
            status: 'jsonld_added',
            schemas: ['Article']
          });
          processed++;
        } else {
          results.push({
            id: post.id,
            title: post.title,
            status: 'no_changes_needed',
            schemas: []
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
    console.error('JSON-LD optimization error:', error);
    return new Response(JSON.stringify({
      error: 'JSON-LD optimization failed',
      details: String(error?.message || error)
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});