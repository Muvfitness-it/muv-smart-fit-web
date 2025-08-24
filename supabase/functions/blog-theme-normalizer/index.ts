import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// Accent mapping based on slug
const getPostAccentHue = (slug: string): number => {
  const lowerSlug = slug.toLowerCase();

  // Dimagrimento/EMS - Magenta brand
  if (lowerSlug.includes('dimagrire') || 
      lowerSlug.includes('ems') || 
      lowerSlug.includes('checklist-pre-post-allenamento') || 
      lowerSlug.includes('2-volte-a-settimana')) {
    return 312;
  }

  // Postura/Pancafit/Reformer - Viola
  if (lowerSlug.includes('mal-di-schiena') || 
      lowerSlug.includes('pancafit') || 
      lowerSlug.includes('pilates-reformer') || 
      lowerSlug.includes('ergonomia')) {
    return 265;
  }

  // Cellulite/Pressoterapia/Drenaggio - Blu
  if (lowerSlug.includes('cellulite') || 
      lowerSlug.includes('ritenzione') || 
      lowerSlug.includes('pressoterapia')) {
    return 215;
  }

  // Guide generali/Nutrizione/Misure - Blu tenue
  if (lowerSlug.includes('nutrizione') || 
      lowerSlug.includes('misure') || 
      lowerSlug.includes('quanto-si-dimagrisce')) {
    return 205;
  }

  // Default: magenta brand
  return 312;
};

// Clean content by removing inline colors and replacing with semantic markup
const cleanBlogContent = (content: string): string => {
  let cleaned = content;

  // Elimina colori inline e sostituisci con <strong>
  cleaned = cleaned.replace(
    /(<span[^>]*style="[^"]*color:[^"]*"[^>]*>)(.*?)(<\/span>)/gi,
    '<strong>$2</strong>'
  );

  // Rimuovi classi colore (text-*) lasciando la classe restante
  cleaned = cleaned.replace(
    /class="([^"]*?)text-[^"\s]+([^"]*?)"/g,
    (match, before, after) => {
      const newClass = (before + after).trim();
      return newClass ? `class="${newClass}"` : '';
    }
  );

  // Sostituisci <b>→<strong>, <i>→<em>
  cleaned = cleaned.replace(/<b\b[^>]*>/gi, '<strong>');
  cleaned = cleaned.replace(/<\/b>/gi, '</strong>');
  cleaned = cleaned.replace(/<i\b[^>]*>/gi, '<em>');
  cleaned = cleaned.replace(/<\/i>/gi, '</em>');

  // Doppie spaziature → singola
  cleaned = cleaned.replace(/\s{2,}/g, ' ');

  return cleaned;
};

// Enhanced TOC detection and content processing
const processContentBlocks = (content: string): string => {
  let processed = content;

  // Convert highlighted text to .key blocks
  processed = processed.replace(
    /<p[^>]*class="[^"]*highlight[^"]*"[^>]*>(.*?)<\/p>/gi,
    '<p class="key">$1</p>'
  );

  // Identify and wrap key phrases
  processed = processed.replace(
    /<p[^>]*>(.*?)(<strong>.*?<\/strong>.*?)(.*?)<\/p>/gi,
    (match, before, strong, after) => {
      if (before.trim().length < 10 && after.trim().length < 10) {
        return `<p class="key">${before} ${strong} ${after}</p>`;
      }
      return match;
    }
  );

  // Enhanced TOC detection - multiple patterns
  // Pattern 1: Explicit "indice" headers with lists
  processed = processed.replace(
    /(<h[2-6][^>]*>.*?indice.*?<\/h[2-6]>.*?<ol>.*?<\/ol>)/gi,
    '<nav class="toc">$1</nav>'
  );

  processed = processed.replace(
    /(<h[2-6][^>]*>.*?indice.*?<\/h[2-6]>.*?<ul>.*?<\/ul>)/gi,
    '<nav class="toc">$1</nav>'
  );

  // Pattern 2: Lists with multiple numbered items (likely TOC)
  processed = processed.replace(
    /<ol[^>]*>((?:\s*<li[^>]*>.*?<\/li>\s*){3,})<\/ol>/gi,
    (match, listContent) => {
      // Check if list items contain navigation-like text
      const hasNavText = /(?:come|cosa|quando|dove|perché|guida|passaggi|step)/i.test(listContent);
      const itemCount = (listContent.match(/<li/gi) || []).length;
      
      if (hasNavText && itemCount >= 3) {
        return `<nav class="toc"><ol>${listContent}</ol></nav>`;
      }
      return match;
    }
  );

  // Pattern 3: Auto-generate TOC from content structure
  const headings = [...processed.matchAll(/<h([2-6])[^>]*>(.*?)<\/h[2-6]>/gi)];
  if (headings.length >= 3 && !processed.includes('class="toc"')) {
    const tocItems = headings
      .filter(([, level]) => parseInt(level) <= 4) // Only H2-H4
      .map(([, , title]) => {
        const cleanTitle = title.replace(/<[^>]*>/g, '').trim();
        const slug = cleanTitle.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        return `<li><a href="#${slug}">${cleanTitle}</a></li>`;
      })
      .join('');
    
    if (tocItems) {
      const autoToc = `<nav class="toc">
        <h3>Indice dei contenuti</h3>
        <ol>${tocItems}</ol>
      </nav>`;
      
      // Insert after first paragraph or at beginning
      const firstParagraph = processed.match(/<\/header>[\s\S]*?<p[^>]*>.*?<\/p>/);
      if (firstParagraph) {
        processed = processed.replace(firstParagraph[0], firstParagraph[0] + '\n\n' + autoToc);
      } else {
        processed = autoToc + '\n\n' + processed;
      }
    }
  }

  // Convert special boxes to callouts
  processed = processed.replace(
    /<div[^>]*class="[^"]*box[^"]*"[^>]*>(.*?)<\/div>/gi,
    '<aside class="callout">$1</aside>'
  );

  // Add IDs to headings for navigation
  processed = processed.replace(
    /<h([2-6])[^>]*>(.*?)<\/h[2-6]>/gi,
    (match, level, title) => {
      const cleanTitle = title.replace(/<[^>]*>/g, '').trim();
      const id = cleanTitle.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      return `<h${level} id="${id}">${title}</h${level}>`;
    }
  );

  return processed;
};

// Generate standard hero
const generateHero = (title: string, publishedAt: string | null, readingTime?: number): string => {
  const date = publishedAt ? new Date(publishedAt).toLocaleDateString('it-IT') : new Date().toLocaleDateString('it-IT');
  const minutes = readingTime || 5;

  return `<header class="post-hero">
    <span class="post-hero-label">Guida • Metodo MUV</span>
    <h1>${title}</h1>
    <p class="meta">Team MUV • Aggiornato il ${date} • Lettura ${minutes} minuti</p>
  </header>`;
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    // Initialize Supabase client with service role
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get all published blog posts
    const { data: posts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id, title, slug, content, published_at, reading_time')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching posts:', fetchError);
      return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    let updatedCount = 0;
    let errors = [];

    console.log(`Processing ${posts?.length || 0} blog posts...`);

    for (const post of posts || []) {
      try {
        console.log(`Processing: ${post.title} (${post.slug})`);
        
        // Clean and process content
        const cleanedContent = cleanBlogContent(post.content || '');
        const processedContent = processContentBlocks(cleanedContent);
        
        // Generate hero section if not present and doesn't already have multiple titles
        let finalContent = processedContent;
        const hasExistingHero = finalContent.includes('post-hero');
        const titleCount = (finalContent.match(/<h1[^>]*>/gi) || []).length;
        
        if (!hasExistingHero && titleCount === 0) {
          const hero = generateHero(post.title, post.published_at, post.reading_time);
          finalContent = hero + '\n\n' + finalContent;
        }

        // Update the post
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update({ 
            content: finalContent,
            updated_at: new Date().toISOString()
          })
          .eq('id', post.id);

        if (updateError) {
          console.error(`Error updating post ${post.slug}:`, updateError);
          errors.push({ slug: post.slug, error: updateError.message });
        } else {
          updatedCount++;
          console.log(`✅ Updated: ${post.title}`);
        }
      } catch (error) {
        console.error(`Error processing post ${post.slug}:`, error);
        errors.push({ slug: post.slug, error: error.message });
      }
    }

    console.log(`Blog normalization complete. Updated: ${updatedCount}, Errors: ${errors.length}`);

    return new Response(JSON.stringify({ 
      success: true,
      message: `Blog theme normalization complete`,
      updated: updatedCount,
      total: posts?.length || 0,
      errors: errors
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in blog-theme-normalizer:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});