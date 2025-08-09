import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Advanced text formatting utilities
const formatSentences = (text: string): string => {
  // Split sentences and limit to 20 words
  const sentences = text.split(/(?<=[.!?])\s+/);
  return sentences.map(sentence => {
    const words = sentence.trim().split(/\s+/);
    if (words.length > 20) {
      // Split long sentences intelligently at conjunctions or commas
      const midPoint = Math.floor(words.length / 2);
      let splitPoint = midPoint;
      
      // Look for natural break points near the middle
      for (let i = Math.max(5, midPoint - 5); i < Math.min(words.length - 5, midPoint + 5); i++) {
        if (['e', 'ma', 'però', 'quindi', 'infatti', 'inoltre', 'tuttavia'].includes(words[i]?.toLowerCase())) {
          splitPoint = i;
          break;
        }
      }
      
      const firstPart = words.slice(0, splitPoint).join(' ');
      const secondPart = words.slice(splitPoint).join(' ');
      
      // Ensure proper capitalization
      const capitalizedSecond = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
      
      return `${firstPart}. ${capitalizedSecond}`;
    }
    return sentence;
  }).join(' ');
};

const formatParagraphs = (content: string): string => {
  // Extract paragraphs and reformat
  const paragraphs = content.split(/<\/?p>\s*<p[^>]*>/);
  
  return paragraphs.map(paragraph => {
    // Remove existing p tags
    let cleanParagraph = paragraph.replace(/<\/?p[^>]*>/g, '');
    
    // Split into sentences
    const sentences = cleanParagraph.split(/(?<=[.!?])\s+/).filter(s => s.trim());
    
    // Group sentences into paragraphs of 2-4 sentences, max 4 lines
    const newParagraphs = [];
    for (let i = 0; i < sentences.length; i += 3) {
      const paragraphSentences = sentences.slice(i, i + 3);
      const formattedSentences = paragraphSentences.map(formatSentences);
      newParagraphs.push(`<p>${formattedSentences.join(' ')}</p>`);
    }
    
    return newParagraphs.join('\n');
  }).join('\n');
};

const fixHeadingStructure = (content: string): string => {
  let result = content;
  
  // Ensure single H1 (convert multiple H1s to H2)
  const h1Matches = result.match(/<h1[^>]*>.*?<\/h1>/gi);
  if (h1Matches && h1Matches.length > 1) {
    // Keep first H1, convert others to H2
    for (let i = 1; i < h1Matches.length; i++) {
      result = result.replace(h1Matches[i], h1Matches[i].replace(/h1/g, 'h2'));
    }
  }
  
  // Fix heading hierarchy (no skipping from H2 to H4)
  result = result.replace(/<h4([^>]*)>/g, '<h3$1>').replace(/<\/h4>/g, '</h3>');
  result = result.replace(/<h5([^>]*)>/g, '<h3$1>').replace(/<\/h5>/g, '</h3>');
  result = result.replace(/<h6([^>]*)>/g, '<h3$1>').replace(/<\/h6>/g, '</h3>');
  
  return result;
};

const convertToLists = (content: string): string => {
  // Convert patterns like "1. item" or "• item" to proper lists
  const listPatterns = [
    /(?:^|\n)(?:\d+\.\s+.+(?:\n|$))+/gm,
    /(?:^|\n)(?:[•▪▫-]\s+.+(?:\n|$))+/gm
  ];
  
  let result = content;
  
  listPatterns.forEach(pattern => {
    result = result.replace(pattern, (match) => {
      const items = match.trim().split('\n').map(line => {
        const cleaned = line.replace(/^\d+\.\s*|^[•▪▫-]\s*/, '').trim();
        return cleaned ? `<li>${cleaned}</li>` : '';
      }).filter(Boolean);
      
      return items.length > 1 ? `<ul>\n${items.join('\n')}\n</ul>` : match;
    });
  });
  
  return result;
};

const fixPunctuation = (content: string): string => {
  return content
    // Fix spaced punctuation
    .replace(/\s+([.!?:;,])/g, '$1')
    .replace(/([.!?:;,])\s*([.!?:;,])/g, '$1 ')
    // Fix double spaces
    .replace(/\s+/g, ' ')
    // Fix capitalization after periods
    .replace(/\.\s+([a-z])/g, (match, letter) => `. ${letter.toUpperCase()}`)
    // Fix common Italian punctuation issues
    .replace(/\s*\?\s*/g, '? ')
    .replace(/\s*!\s*/g, '! ')
    .replace(/\s*:\s*/g, ': ');
};

const addCTA = (content: string, title: string): string => {
  // Don't add if already has CTA or contact links
  if (content.includes('prenota') || content.includes('contatta') || content.includes('/contatti')) {
    return content;
  }
  
  // Determine appropriate CTA based on content
  let ctaText = "Prenota la tua consulenza gratuita";
  let ctaLink = "/contatti";
  
  if (title.toLowerCase().includes('pilates')) {
    ctaText = "Prova una lezione di Pilates";
    ctaLink = "/servizi/pilates";
  } else if (title.toLowerCase().includes('hiit') || title.toLowerCase().includes('dimagrimento')) {
    ctaText = "Inizia il tuo percorso HIIT";
    ctaLink = "/servizi/hiit";
  } else if (title.toLowerCase().includes('ems')) {
    ctaText = "Scopri la tecnologia EMS";
    ctaLink = "/servizi/ems";
  }
  
  const cta = `
<div class="cta-section mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
  <h3 class="text-lg font-semibold mb-3">Pronto per iniziare?</h3>
  <p class="mb-4">Il team MUV Fitness è qui per aiutarti a raggiungere i tuoi obiettivi.</p>
  <a href="${ctaLink}" class="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
    ${ctaText}
  </a>
</div>`;
  
  return content + cta;
};

const createBackup = async (supabase: any, postId: string, originalContent: string) => {
  await supabase
    .from('blog_posts_backup')
    .insert({
      id: postId,
      content_backup: originalContent,
      backed_up_at: new Date().toISOString()
    });
};

const formatPost = async (supabase: any, post: any): Promise<any> => {
  const originalContent = post.content;
  const originalStats = {
    characters: originalContent.length,
    sentences: (originalContent.match(/[.!?]/g) || []).length,
    paragraphs: (originalContent.match(/<p[^>]*>/g) || []).length
  };
  
  // Create backup
  await createBackup(supabase, post.id, originalContent);
  
  let formattedContent = originalContent;
  const modifiedFields = [];
  
  // 1. Fix heading structure
  const beforeHeadings = formattedContent;
  formattedContent = fixHeadingStructure(formattedContent);
  if (beforeHeadings !== formattedContent) modifiedFields.push('headings');
  
  // 2. Format paragraphs and sentences
  const beforeParagraphs = formattedContent;
  formattedContent = formatParagraphs(formattedContent);
  if (beforeParagraphs !== formattedContent) modifiedFields.push('paragraphs');
  
  // 3. Convert to lists where appropriate
  const beforeLists = formattedContent;
  formattedContent = convertToLists(formattedContent);
  if (beforeLists !== formattedContent) modifiedFields.push('lists');
  
  // 4. Fix punctuation
  const beforePunctuation = formattedContent;
  formattedContent = fixPunctuation(formattedContent);
  if (beforePunctuation !== formattedContent) modifiedFields.push('punctuation');
  
  // 5. Add CTA
  const beforeCTA = formattedContent;
  formattedContent = addCTA(formattedContent, post.title);
  if (beforeCTA !== formattedContent) modifiedFields.push('cta');
  
  // 6. Generate meta data if missing
  const updates: any = { content: formattedContent };
  
  if (!post.meta_title || post.meta_title.length > 60) {
    updates.meta_title = post.title.length > 60 ? post.title.substring(0, 57) + "..." : post.title;
    modifiedFields.push('meta_title');
  }
  
  if (!post.meta_description || post.meta_description.length < 120) {
    const cleanText = formattedContent.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    updates.meta_description = cleanText.length > 160 ? cleanText.substring(0, 157) + "..." : cleanText;
    modifiedFields.push('meta_description');
  }
  
  // Update post
  const { error } = await supabase
    .from('blog_posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', post.id);
  
  if (error) throw error;
  
  const newStats = {
    characters: formattedContent.length,
    sentences: (formattedContent.match(/[.!?]/g) || []).length,
    paragraphs: (formattedContent.match(/<p[^>]*>/g) || []).length
  };
  
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    status: post.status,
    url: `https://www.muvfitness.it/blog/${post.slug}`,
    modified_fields: modifiedFields,
    stats_before: originalStats,
    stats_after: newStats,
    improvement: {
      characters_change: newStats.characters - originalStats.characters,
      sentences_added: newStats.sentences - originalStats.sentences,
      paragraphs_restructured: newStats.paragraphs - originalStats.paragraphs
    }
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const { batchSize = 25 } = (await req.json().catch(() => ({}))) as { batchSize?: number };

    // Get posts to format (exclude privacy/legal pages)
    const { data: posts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('*')
      .in('status', ['published', 'draft'])
      .not('slug', 'in', '(privacy,cookie-policy,termini-condizioni)')
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
        const result = await formatPost(supabase, post);
        results.push(result);
        processed++;
      } catch (e) {
        errors.push({
          id: post.id,
          title: post.title,
          error: e.message
        });
      }
    }

    // Get total count for progress tracking
    const { count } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .in('status', ['published', 'draft'])
      .not('slug', 'in', '(privacy,cookie-policy,termini-condizioni)');

    const remaining = (count || 0) - processed;

    return new Response(JSON.stringify({
      success: true,
      processed_this_run: processed,
      total_posts: count || 0,
      remaining,
      results,
      errors,
      next_batch_ready: remaining > 0,
      summary: {
        formatting_applied: [
          'Frasi ≤ 20 parole',
          'Paragrafi ≤ 4 righe (2-4 frasi)',
          'H1 unico, H2/H3 ordinati',
          'Liste convert ite automaticamente',
          'Punteggiatura corretta',
          'CTA finale aggiunta',
          'Meta title/description ottimizzati'
        ],
        backup_created: true,
        posts_updated: processed
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Blog formatting error:', error);
    return new Response(JSON.stringify({
      error: 'Blog formatting failed',
      details: String(error?.message || error)
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
