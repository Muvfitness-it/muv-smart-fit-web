import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Extract FAQ data from content
const extractFAQs = (content: string): any[] => {
  const faqs = [];
  const faqPatterns = [
    /(?:^|\n)(?:#+\s*)?(.+\?)\s*\n+(.+?)(?=\n(?:#+|$))/gm,
    /<h[2-6][^>]*>([^<]*\?[^<]*)<\/h[2-6]>\s*<p>([^<]+)<\/p>/gm
  ];

  for (const pattern of faqPatterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const question = match[1].trim().replace(/^#+\s*/, '');
      const answer = match[2].trim().replace(/<[^>]*>/g, '');
      
      if (question.length > 10 && answer.length > 20) {
        faqs.push({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer
          }
        });
      }
    }
  }

  return faqs.slice(0, 10); // Max 10 FAQs
};

// Generate Article schema
const generateArticleSchema = (post: any): any => {
  const baseUrl = 'https://www.muvfitness.it';
  const publishedDate = post.published_at || post.created_at;
  const modifiedDate = post.updated_at || publishedDate;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description || post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 160),
    image: post.featured_image || `${baseUrl}/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png`,
    author: {
      "@type": "Person",
      name: post.author_name || "MUV Fitness Team",
      url: baseUrl
    },
    publisher: {
      "@type": "Organization",
      name: "MUV Fitness",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png`
      }
    },
    datePublished: new Date(publishedDate).toISOString(),
    dateModified: new Date(modifiedDate).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`
    },
    keywords: post.meta_keywords || "fitness, allenamento, benessere, salute, nutrizione, MUV Fitness, Legnago",
    wordCount: post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
    inLanguage: "it-IT",
    about: [
      { "@type": "Thing", name: "Fitness" },
      { "@type": "Thing", name: "Benessere" },
      { "@type": "Thing", name: "Allenamento" }
    ]
  };
};

// Generate FAQ schema
const generateFAQSchema = (faqs: any[]): any => {
  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
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

        // Generate Article schema
        const articleSchema = generateArticleSchema(post);
        
        // Extract and generate FAQ schema if content has Q&A
        const faqs = extractFAQs(post.content);
        const faqSchema = generateFAQSchema(faqs);

        // Prepare JSON-LD scripts
        const jsonldScripts = [];
        
        // Always add Article schema
        jsonldScripts.push(`<script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
</script>`);

        // Add FAQ schema if FAQs found
        if (faqSchema) {
          jsonldScripts.push(`<script type="application/ld+json">
${JSON.stringify(faqSchema, null, 2)}
</script>`);
        }

        // Insert JSON-LD at the end of content
        if (jsonldScripts.length > 0) {
          updatedContent += '\n\n<!-- SEO JSON-LD -->\n' + jsonldScripts.join('\n') + '\n<!-- /SEO JSON-LD -->';
          hasChanges = true;
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
            status: 'jsonld_added',
            schemas: ['Article', ...(faqSchema ? ['FAQ'] : [])],
            faq_count: faqs.length
          });
          processed++;
        } else {
          results.push({
            id: post.id,
            title: post.title,
            status: 'no_changes_needed',
            schemas: [],
            faq_count: 0
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
      schemas_added: {
        article: processed,
        faq: results.filter(r => r.faq_count > 0).length
      }
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