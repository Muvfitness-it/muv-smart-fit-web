import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[àáäâ]/g, 'a')
    .replace(/[èéëê]/g, 'e')
    .replace(/[ìíïî]/g, 'i')
    .replace(/[òóöô]/g, 'o')
    .replace(/[ùúüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const drafts = [
      {
        title: 'Personal Trainer a Legnago: come scegliere e cosa aspettarsi',
        excerpt: 'Guida pratica alla scelta del personal trainer giusto a Legnago: metodo, risultati e costi trasparenti.',
      },
      {
        title: 'Allenamento EMS: benefici reali, limiti e protocolli sicuri',
        excerpt: 'Tutto quello che devi sapere sull’elettrostimolazione muscolare (EMS) per dimagrire e tonificare in poco tempo.',
      },
      {
        title: 'Pilates Reformer o Matwork? Differenze, benefici e percorso',
        excerpt: 'Capire quando scegliere Reformer o Matwork per postura, core e mobilità, con esempi di progressione.',
      },
      {
        title: 'Dimagrire dopo i 40: forza, metabolismo e abitudini sostenibili',
        excerpt: 'Strategie essenziali per dimagrire in modo sano dopo i 40: allenamento, nutrizione e recupero.',
      },
      {
        title: 'HIIT vs Allenamento di Forza: cosa funziona davvero',
        excerpt: 'Confronto tra HIIT e forza per dimagrimento, ricomposizione e salute metabolica.',
      },
      {
        title: 'Nutrizione semplice per allenarsi meglio: linee guida pratiche',
        excerpt: 'Indicazioni concrete per alimentazione pre e post-allenamento senza complicazioni.',
      },
      {
        title: 'Core Stability: schiena più forte e postura migliore',
        excerpt: 'Perché allenare il core migliora performance, stabilità e riduce i dolori lombari.',
      },
      {
        title: 'Programmare l’allenamento con poco tempo: 90 minuti a settimana',
        excerpt: 'Esempi di routine efficaci per chi ha un’agenda piena: qualità, progressione e recupero.',
      },
      {
        title: 'Recupero attivo, sonno e stress: i pilastri nascosti dei risultati',
        excerpt: 'Come recupero, sonno e gestione dello stress accelerano i progressi di allenamento.',
      },
      {
        title: 'Postura da ufficio: esercizi utili e abitudini anti-dolore',
        excerpt: 'Strategie pratiche per chi lavora molte ore al PC: mobilità, rinforzo e ergonomia.',
      },
      {
        title: 'Allenamento donna: forza, ciclo e ricomposizione corporea',
        excerpt: 'Linee guida specifiche per allenare la forza e migliorare composizione corporea al femminile.',
      },
      {
        title: 'Small Group Training: motivazione, qualità e convenienza',
        excerpt: 'I vantaggi dell’allenamento in piccoli gruppi seguiti da un trainer qualificato.',
      }
    ].map((d) => ({
      ...d,
      content: `${d.excerpt}\n\nIn questo articolo in bozza troverai una guida completa con esempi pratici, errori comuni da evitare e un percorso chiaro per ottenere risultati misurabili. Nella versione finale approfondiremo metodologia, progressioni, indicatori di miglioramento e consigli di aderenza.`,
    }));

    let created = 0;
    const createdSlugs: string[] = [];

    for (const draft of drafts) {
      const slug = slugify(draft.title);

      const { data: exists } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', slug)
        .maybeSingle();

      if (!exists) {
        const wordCount = draft.content.split(' ').length;
        const reading_time = Math.max(1, Math.ceil(wordCount / 200));

        const { data, error } = await supabase
          .from('blog_posts')
          .insert({
            title: draft.title,
            slug,
            excerpt: draft.excerpt,
            content: draft.content,
            meta_title: draft.title,
            meta_description: draft.excerpt,
            status: 'draft',
            author_name: 'MUV Team',
            reading_time,
          })
          .select('slug')
          .single();

        if (error) {
          console.error('Insert error for', slug, error.message);
          continue;
        }
        created++;
        createdSlugs.push(data.slug);
      }
    }

    return new Response(
      JSON.stringify({ success: true, created, slugs: createdSlugs }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('seed-blog-drafts error', err);
    return new Response(
      JSON.stringify({ success: false, error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
