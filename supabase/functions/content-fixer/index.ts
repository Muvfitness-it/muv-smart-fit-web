import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Fix content structure and SEO issues
const fixPostContent = (post: any): { content: string; hasChanges: boolean } => {
  let content = post.content;
  let hasChanges = false;

  // Remove existing malformed structure
  content = content.replace(/<p><h3>(.*?)<\/h3><\/p>/gs, '$1');
  content = content.replace(/^<h3>(.*?)<\/h3>$/gs, '$1');
  
  // Split content into sections and rebuild structure
  const lines = content.split(/\n+/).filter(line => line.trim());
  const structuredContent: string[] = [];
  
  let foundH1 = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    // Skip HTML comments and scripts
    if (line.includes('<!--') || line.includes('<script')) {
      structuredContent.push(line);
      continue;
    }
    
    // Remove any existing tags to clean the line
    const cleanLine = line.replace(/<[^>]*>/g, '').trim();
    
    if (!cleanLine) continue;
    
    // First significant line becomes H1 (title)
    if (!foundH1 && cleanLine.length > 10) {
      structuredContent.push(`<h1>${cleanLine}</h1>`);
      foundH1 = true;
      hasChanges = true;
      continue;
    }
    
    // Lines with emoji at start or questions become H2
    if (cleanLine.match(/^[💪🔥✅💥🎯🚀📍👉🔔]/) || cleanLine.endsWith('?')) {
      structuredContent.push(`<h2>${cleanLine}</h2>`);
      hasChanges = true;
      continue;
    }
    
    // Numbered lists or bullet points
    if (cleanLine.match(/^\d+\./) || cleanLine.match(/^[•-]/) || cleanLine.match(/^[▪▫]/) || cleanLine.match(/^[✓✅]/) || cleanLine.match(/^".*"$/)) {
      if (!structuredContent[structuredContent.length - 1]?.includes('<ul>')) {
        structuredContent.push('<ul>');
      }
      const listContent = cleanLine.replace(/^[\d.•\-▪▫✓✅]\s*/, '');
      structuredContent.push(`<li>${listContent}</li>`);
      hasChanges = true;
      continue;
    }
    
    // Close any open list
    if (structuredContent[structuredContent.length - 1]?.includes('<li>') && 
        !cleanLine.match(/^[\d.•\-▪▫✓✅]/)) {
      structuredContent.push('</ul>');
    }
    
    // Regular paragraphs
    if (cleanLine.length > 20) {
      // Add emphasis to key terms
      let formattedLine = cleanLine
        .replace(/\b(MUV Fitness|Reformer|Pilates|HIIT|EMS|Personal Training)\b/gi, '<strong>$1</strong>')
        .replace(/\b(dimagrimento|postura|tonificazione|forza|flessibilità|benessere)\b/gi, '<strong>$1</strong>');
      
      structuredContent.push(`<p>${formattedLine}</p>`);
      hasChanges = true;
    }
  }
  
  // Close any remaining open list
  if (structuredContent[structuredContent.length - 1]?.includes('<li>')) {
    structuredContent.push('</ul>');
  }
  
  // Add internal links section if not present
  if (!content.includes('<!-- auto-internal-links -->')) {
    structuredContent.push(`
<!-- auto-internal-links -->
<section aria-labelledby="prossimi-passi" class="mt-8 p-6 bg-gray-50 rounded-lg">
  <h2 id="prossimi-passi" class="text-xl font-semibold mb-4">Prossimi passi consigliati</h2>
  <ul class="space-y-2">
    <li><a href="/servizi/pilates" rel="noopener" class="text-primary hover:underline">Pilates e Reformer</a></li>
    <li><a href="/servizi/hiit" rel="noopener" class="text-primary hover:underline">Allenamento HIIT</a></li>
    <li><a href="/contatti" rel="noopener" class="text-primary hover:underline">Prenota la tua consulenza gratuita</a></li>
    <li><a href="/risultati" rel="noopener" class="text-primary hover:underline">Vedi i risultati dei nostri clienti</a></li>
  </ul>
</section>
<!-- /auto-internal-links -->`);
    hasChanges = true;
  }
  
  // Add JSON-LD if not present
  if (!content.includes('type="application/ld+json"')) {
    const publishedDate = post.published_at || post.created_at;
    const modifiedDate = post.updated_at || publishedDate;
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.meta_description || post.excerpt || post.title.substring(0, 160),
      "image": post.featured_image || "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png",
      "author": {
        "@type": "Person",
        "name": post.author_name || "MUV Fitness Team",
        "url": "https://www.muvfitness.it"
      },
      "publisher": {
        "@type": "Organization",
        "name": "MUV Fitness",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"
        }
      },
      "datePublished": new Date(publishedDate).toISOString(),
      "dateModified": new Date(modifiedDate).toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.muvfitness.it/blog/${post.slug}`
      }
    };
    
    structuredContent.push(`
<!-- SEO JSON-LD -->
<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>
<!-- /SEO JSON-LD -->`);
    hasChanges = true;
  }
  
  return {
    content: structuredContent.join('\n'),
    hasChanges
  };
};

// Generate proper meta data
const generateMeta = (post: any): { meta_title: string; meta_description: string; hasChanges: boolean } => {
  let hasChanges = false;
  let meta_title = post.meta_title;
  let meta_description = post.meta_description;
  
  // Generate meta_title if missing or too long
  if (!meta_title || meta_title.length > 60) {
    meta_title = post.title.length > 60 ? post.title.substring(0, 57) + "..." : post.title;
    hasChanges = true;
  }
  
  // Generate meta_description if missing
  if (!meta_description || meta_description.length < 120) {
    const cleanContent = post.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    meta_description = cleanContent.length > 160 ? 
      cleanContent.substring(0, 157) + "..." : 
      cleanContent;
    hasChanges = true;
  }
  
  return { meta_title, meta_description, hasChanges };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // Get all published posts that need fixing
    const { data: posts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .limit(50);

    if (fetchError) {
      throw new Error(`Fetch error: ${fetchError.message}`);
    }

    const results = [];
    let processed = 0;
    const errors = [];

    for (const post of posts || []) {
      try {
        // Fix content structure
        const { content: fixedContent, hasChanges: contentChanged } = fixPostContent(post);
        
        // Generate proper meta data
        const { meta_title, meta_description, hasChanges: metaChanged } = generateMeta(post);
        
        const hasChanges = contentChanged || metaChanged;
        
        if (hasChanges) {
          const { error: updateError } = await supabase
            .from('blog_posts')
            .update({ 
              content: fixedContent,
              meta_title,
              meta_description,
              updated_at: new Date().toISOString()
            })
            .eq('id', post.id);

          if (updateError) throw updateError;

          results.push({
            id: post.id,
            title: post.title,
            status: 'fixed',
            changes: {
              content_structure: contentChanged,
              meta_data: metaChanged,
              h1_added: contentChanged,
              json_ld_added: contentChanged,
              internal_links_added: contentChanged
            }
          });
          processed++;
        } else {
          results.push({
            id: post.id,
            title: post.title,
            status: 'no_changes_needed'
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
      fixes_applied: [
        'Struttura HTML corretta con H1, H2, paragrafi',
        'Meta title e description ottimizzati',
        'JSON-LD Article schema aggiunto',
        'Link interni strategici inseriti',
        'Formattazione SEO completa'
      ]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Content repair error:', error);
    return new Response(JSON.stringify({
      error: 'Content repair failed',
      details: String(error?.message || error)
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});