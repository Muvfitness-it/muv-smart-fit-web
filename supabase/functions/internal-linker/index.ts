import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Link clusters and categories
const linkClusters = {
  dimagrimento: {
    pillar: '/servizi/hiit',
    services: ['/servizi/ems', '/servizi/nutrizione'],
    posts: ['dimagrimento', 'perdere-peso', 'bruciare-grassi', 'hiit', 'ems'],
    anchors: ['dimagrimento rapido', 'perdere peso', 'bruciare grassi', 'allenamento HIIT', 'tecnologia EMS']
  },
  postura: {
    pillar: '/servizi/pancafit',
    services: ['/servizi/pilates', '/servizi/massoterapia'],
    posts: ['postura', 'mal-di-schiena', 'dolori', 'pancafit', 'pilates'],
    anchors: ['migliorare la postura', 'mal di schiena', 'Pancafit', 'Pilates per la postura', 'correzione posturale']
  },
  tecnologia: {
    pillar: '/servizi/ems',
    services: ['/servizi/hiit', '/servizi/small-group'],
    posts: ['ems', 'tecnologia', 'vacuum', 'elettrostimolazione'],
    anchors: ['tecnologia EMS', 'elettrostimolazione', 'Vacuum Therapy', 'allenamento tecnologico', 'fitness innovativo']
  },
  benessere: {
    pillar: '/servizi/personal-training',
    services: ['/servizi/nutrizione', '/servizi/psicologo'],
    posts: ['benessere', 'salute', 'personal-trainer', 'wellness'],
    anchors: ['personal training', 'benessere completo', 'allenamento personalizzato', 'salute e fitness', 'wellness']
  }
};

// Determine cluster based on content
const determineCluster = (title: string, content: string, slug: string): string => {
  const text = (title + ' ' + content + ' ' + slug).toLowerCase();
  
  for (const [cluster, data] of Object.entries(linkClusters)) {
    const keywords = data.posts;
    const matches = keywords.filter(keyword => text.includes(keyword)).length;
    if (matches >= 1) return cluster;
  }
  
  return 'benessere'; // Default cluster
};

// Generate internal links for content
const generateInternalLinks = (content: string, cluster: string, existingSlug: string): { content: string; linksAdded: string[] } => {
  if (content.includes('<!-- auto-internal-links -->')) {
    return { content, linksAdded: [] };
  }

  const clusterData = linkClusters[cluster];
  const linksAdded: string[] = [];
  
  // Calculate word count for link density
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const targetLinks = Math.min(4, Math.max(2, Math.floor(wordCount / 120)));
  
  let updatedContent = content;
  let linksCount = 0;

  // Add pillar link if not already present
  if (!content.includes(clusterData.pillar) && linksCount < targetLinks) {
    const anchor = clusterData.anchors[0];
    const linkHtml = `<a href="${clusterData.pillar}" rel="noopener">${anchor}</a>`;
    
    // Insert link in first paragraph if possible
    const firstParagraph = updatedContent.match(/<p[^>]*>([^<]+)</p>/);
    if (firstParagraph && firstParagraph[0].length > 50) {
      updatedContent = updatedContent.replace(firstParagraph[0], 
        firstParagraph[0].replace('</p>', ` con ${linkHtml}.</p>`)
      );
      linksAdded.push(`${clusterData.pillar} (${anchor})`);
      linksCount++;
    }
  }

  // Add service links
  for (const service of clusterData.services.slice(0, 2)) {
    if (!content.includes(service) && linksCount < targetLinks) {
      const serviceAnchor = clusterData.anchors[linksCount] || `servizio ${service.split('/').pop()}`;
      const linkHtml = `<a href="${service}" rel="noopener">${serviceAnchor}</a>`;
      
      // Find a suitable paragraph to insert link
      const paragraphs = updatedContent.match(/<p[^>]*>[^<]*</p>/g) || [];
      const suitableParagraph = paragraphs.find(p => p.length > 80 && !p.includes('<a '));
      
      if (suitableParagraph) {
        updatedContent = updatedContent.replace(suitableParagraph,
          suitableParagraph.replace('</p>', ` Scopri di più sul ${linkHtml}.</p>`)
        );
        linksAdded.push(`${service} (${serviceAnchor})`);
        linksCount++;
      }
    }
  }

  // Add related posts section at the end
  const relatedSection = `
<!-- auto-internal-links -->
<section aria-labelledby="prossimi-passi" class="mt-8 p-6 bg-gray-50 rounded-lg">
  <h2 id="prossimi-passi" class="text-xl font-semibold mb-4">Prossimi passi consigliati</h2>
  <ul class="space-y-2">
    <li><a href="${clusterData.pillar}" rel="noopener" class="text-primary hover:underline">${clusterData.anchors[0]}</a></li>
    <li><a href="${clusterData.services[0]}" rel="noopener" class="text-primary hover:underline">${clusterData.anchors[1] || 'Scopri il nostro servizio'}</a></li>
    <li><a href="/contatti" rel="noopener" class="text-primary hover:underline">Prenota la tua consulenza gratuita</a></li>
    <li><a href="/risultati" rel="noopener" class="text-primary hover:underline">Guarda i risultati dei nostri clienti</a></li>
  </ul>
</section>
<!-- /auto-internal-links -->`;

  updatedContent += relatedSection;
  linksAdded.push('Sezione "Prossimi passi" aggiunta');

  return { content: updatedContent, linksAdded };
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
            cluster: 'n/a',
            linksAdded: []
          });
          continue;
        }

        // Determine the content cluster
        const cluster = determineCluster(post.title, post.content, post.slug);
        
        // Generate internal links
        const { content: updatedContent, linksAdded } = generateInternalLinks(
          post.content, 
          cluster, 
          post.slug
        );

        // Update post if links were added
        if (linksAdded.length > 0) {
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
            cluster,
            linksAdded
          });
          processed++;
        } else {
          results.push({
            id: post.id,
            title: post.title,
            status: 'no_links_added',
            cluster,
            linksAdded: []
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
      linking_strategy: {
        clusters: Object.keys(linkClusters),
        target_links_per_post: '2-4',
        link_density: '~1 link per 120 parole',
        anchor_strategy: 'Descrittive e variabili'
      }
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