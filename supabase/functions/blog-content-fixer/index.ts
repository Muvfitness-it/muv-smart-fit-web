import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// Clean content by removing inline colors and replacing with semantic markup
const cleanBlogContent = (content: string): string => {
  let cleaned = content;

  // Remove inline color styles and replace with <strong>
  cleaned = cleaned.replace(
    /(<span[^>]*style="[^"]*color:[^"]*"[^>]*>)(.*?)(<\/span>)/gi,
    '<strong>$2</strong>'
  );

  // Remove color classes (text-*) keeping other classes
  cleaned = cleaned.replace(
    /class="([^"]*?)text-[^"\s]+([^"]*?)"/g,
    (match, before, after) => {
      const newClass = (before + after).trim();
      return newClass ? `class="${newClass}"` : '';
    }
  );

  // Replace <b>→<strong>, <i>→<em>
  cleaned = cleaned.replace(/<b\b[^>]*>/gi, '<strong>');
  cleaned = cleaned.replace(/<\/b>/gi, '</strong>');
  cleaned = cleaned.replace(/<i\b[^>]*>/gi, '<em>');
  cleaned = cleaned.replace(/<\/i>/gi, '</em>');

  // Normalize multiple spaces to single space
  cleaned = cleaned.replace(/\s{2,}/g, ' ');

  return cleaned;
};

// Get accent hue for blog post based on slug
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

// Generate TOC from content if word count > 1000
const generateTOC = (content: string): string => {
  const wordCount = content.split(/\s+/).length;
  
  if (wordCount < 1000) return content;

  const headings = [...content.matchAll(/<h([2-6])[^>]*>(.*?)<\/h[2-6]>/gi)];
  
  if (headings.length < 3) return content;

  const tocItems = headings
    .filter(([, level]) => parseInt(level) <= 4)
    .map(([, , title]) => {
      const cleanTitle = title.replace(/<[^>]*>/g, '').trim();
      const slug = cleanTitle.toLowerCase()
        .replace(/[^\\w\\s-]/g, '')
        .replace(/\s+/g, '-');
      return `<li><a href="#${slug}">${cleanTitle}</a></li>`;
    })
    .join('');

  if (!tocItems) return content;

  const autoToc = `<nav class="toc">
    <h3>Indice dei contenuti</h3>
    <ol>${tocItems}</ol>
  </nav>`;

  // Insert after first paragraph or at beginning
  const firstParagraph = content.match(/<\/header>[\s\S]*?<p[^>]*>.*?<\/p>/);
  if (firstParagraph) {
    return content.replace(firstParagraph[0], firstParagraph[0] + '\n\n' + autoToc);
  } else {
    return autoToc + '\n\n' + content;
  }
};

// Add IDs to headings for navigation
const addHeadingIDs = (content: string): string => {
  return content.replace(
    /<h([2-6])[^>]*>(.*?)<\/h[2-6]>/gi,
    (match, level, title) => {
      const cleanTitle = title.replace(/<[^>]*>/g, '').trim();
      const id = cleanTitle.toLowerCase()
        .replace(/[^\\w\\s-]/g, '')
        .replace(/\s+/g, '-');
      return `<h${level} id="${id}">${title}</h${level}>`;
    }
  );
};

// Generate hero section for blog posts
const generatePostHero = (title: string, publishedAt?: string, readingTime?: number): string => {
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
        
        // Step 1: Clean content (remove inline colors, fix tags)
        let processedContent = cleanBlogContent(post.content || '');
        
        // Step 2: Add hero section if not present
        if (!processedContent.includes('post-hero')) {
          const hero = generatePostHero(post.title, post.published_at, post.reading_time);
          processedContent = hero + '\n\n' + processedContent;
        }
        
        // Step 3: Generate TOC for long content (>1000 words)
        processedContent = generateTOC(processedContent);
        
        // Step 4: Add IDs to headings for navigation
        processedContent = addHeadingIDs(processedContent);

        // Update the post
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update({ 
            content: processedContent,
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

    console.log(`Blog content fixing complete. Updated: ${updatedCount}, Errors: ${errors.length}`);

    return new Response(JSON.stringify({ 
      success: true,
      message: `Blog content fixing complete`,
      updated: updatedCount,
      total: posts?.length || 0,
      errors: errors,
      fixes_applied: [
        'Rimossi colori inline e sostituiti con <strong>',
        'Convertiti <b>→<strong>, <i>→<em>',
        'Normalizzati spazi multipli',
        'Aggiunti hero sections per template consistente',
        'Generati TOC automatici per contenuti >1000 parole',
        'Aggiunti ID ai titoli per navigazione'
      ]
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in blog-content-fixer:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
