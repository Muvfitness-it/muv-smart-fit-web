import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Generate responsive image markup
const generateResponsiveImage = (src: string, alt: string): string => {
  const baseName = src.split('/').pop()?.split('.')[0] || 'image';
  const extension = src.split('.').pop() || 'jpg';
  const baseUrl = src.replace(/\.[^.]+$/, '');
  
  // Generate WebP version URL (assuming WebP conversion is available)
  const webpSrc = `${baseUrl}.webp`;
  
  // Generate srcset for different breakpoints
  const srcset = [
    `${baseUrl}-400w.${extension} 400w`,
    `${baseUrl}-600w.${extension} 600w`, 
    `${baseUrl}-800w.${extension} 800w`,
    `${baseUrl}-1200w.${extension} 1200w`,
    `${src} 1600w`
  ].join(', ');

  const webpSrcset = [
    `${baseUrl}-400w.webp 400w`,
    `${baseUrl}-600w.webp 600w`,
    `${baseUrl}-800w.webp 800w`, 
    `${baseUrl}-1200w.webp 1200w`,
    `${webpSrc} 1600w`
  ].join(', ');

  return `<picture>
  <source srcset="${webpSrcset}" type="image/webp" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px">
  <img src="${src}" srcset="${srcset}" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px" alt="${alt}" loading="lazy" decoding="async" width="800" height="450" class="w-full h-auto object-cover rounded-lg">
</picture>`;
};

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

        // Process images in content - replace simple img tags with responsive picture elements
        const imgRegex = /<img\s+([^>]*?)src=["']([^"']*?)["']([^>]*?)>/g;
        
        updatedContent = updatedContent.replace(imgRegex, (match, beforeSrc, src, afterSrc) => {
          // Skip if already has srcset or is in a picture element
          if (match.includes('srcset=') || match.includes('<picture>')) {
            return match;
          }

          // Extract alt text
          const altMatch = match.match(/alt=["']([^"']*?)["']/);
          const alt = altMatch?.[1] || 'Immagine articolo MUV Fitness';

          // Skip very small images or icons
          if (src.includes('icon') || src.includes('logo') || src.includes('avatar')) {
            // Just ensure these have proper attributes
            let optimizedImg = match;
            if (!optimizedImg.includes('loading=')) {
              optimizedImg = optimizedImg.replace('>', ' loading="lazy">');
            }
            if (!optimizedImg.includes('decoding=')) {
              optimizedImg = optimizedImg.replace('>', ' decoding="async">');
            }
            return optimizedImg;
          }

          hasChanges = true;
          return generateResponsiveImage(src, alt);
        });

        // Process featured image if it exists and needs optimization
        if (post.featured_image && !post.featured_image.includes('srcset')) {
          // Featured images are usually heroes, so we'll note them for future processing
          // For now, we'll leave them as-is but could enhance later
        }

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
            changes: 'Immagini convertite a responsive con srcset e WebP'
          });
          processed++;
        } else {
          results.push({
            id: post.id,
            title: post.title,
            status: 'no_images_to_optimize',
            changes: 'Nessuna immagine da ottimizzare trovata'
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
      errors,
      optimizations: [
        'Immagini convertite in elemento <picture> con WebP',
        'Aggiunto srcset responsivo (400w, 600w, 800w, 1200w, 1600w)',
        'Aggiunto sizes attribute ottimizzato per breakpoint',
        'Aggiunto loading="lazy" e decoding="async"',
        'Dimensioni esplicite width/height per CLS'
      ]
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