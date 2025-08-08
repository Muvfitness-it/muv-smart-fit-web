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

    const { applyToExisting = true } = (await req.json().catch(() => ({ }))) as { applyToExisting?: boolean };

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
      content: `${d.excerpt}\n\nIn questo articolo troverai una guida completa con esempi pratici, errori comuni da evitare e un percorso chiaro per ottenere risultati misurabili.`,
    }));

    // 1) Crea bozze se mancanti
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
            reading_time: 5,
          })
          .select('slug')
          .single();
        if (!error) {
          created++; createdSlugs.push(data.slug);
        }
      }
    }

    // 2) Se richiesto, aggiorna le bozze esistenti: contenuto >= 2000 parole + 2 immagini realistiche
    let upgraded = 0;
    let imagesGenerated = 0;

    if (applyToExisting) {
      const { data: posts, error: fetchErr } = await supabase
        .from('blog_posts')
        .select('id, title, slug, content, featured_image, status')
        .eq('status', 'draft');
      if (fetchErr) throw fetchErr;

      // Helper: chiama funzione AI testo
      async function generateLongForm(title: string): Promise<string> {
        const prompt = `Scrivi un articolo di blog in italiano estremamente approfondito e professionale su: "${title}".\nRequisiti:\n- Minimo 2000 parole (preferibilmente 2200-2600).\n- Struttura con H2 e H3, elenchi puntati, esempi pratici e consigli attuabili.\n- Tono autorevole ma comprensibile, stile MUV Fitness.\n- SEO: includi parole chiave correlate in modo naturale.\n- Niente fluff, niente ripetizioni inutili.\n- Non inserire immagini, ma solo contenuto testuale ben formattato.`;
        const { data, error } = await supabase.functions.invoke('gemini-api', { body: { payload: prompt } });
        if (error) throw error;
        return (data as any).content as string;
      }

      // Helper: genera immagine realistica tramite funzione esistente
      async function generateImage(prompt: string, width: number, height: number): Promise<Uint8Array> {
        const { data, error } = await supabase.functions.invoke('gemini-image', { body: { prompt, width, height } });
        if (error) throw error;
        const url = (data as any).image_url as string;
        const imgResp = await fetch(url);
        const arrBuf = await imgResp.arrayBuffer();
        return new Uint8Array(arrBuf);
      }

      // Helper: upload su storage e restituisci URL pubblico
      async function uploadAndGetUrl(path: string, bytes: Uint8Array, contentType: string) {
        const { error: upErr } = await supabase.storage.from('immagini').upload(path, bytes, { upsert: true, contentType });
        if (upErr) throw upErr;
        const { data: pub } = await supabase.storage.from('immagini').getPublicUrl(path);
        return pub.publicUrl as string;
      }

      for (const post of posts || []) {
        try {
          const currentWordCount = (post.content || '').split(/\s+/).filter(Boolean).length;
          let newContent = post.content || '';

          if (currentWordCount < 2000) {
            newContent = await generateLongForm(post.title);
            upgraded++;
          }

          // Genera immagine HERO realistica
          const heroBytes = await generateImage(`Foto realistica orizzontale, moderna e professionale per un articolo di fitness: ${post.title}. Illuminazione naturale, composizione pulita, stile fotografico editoriale.`, 1200, 630);
          const heroPath = `blog/featured/${post.slug}.jpg`;
          const heroUrl = await uploadAndGetUrl(heroPath, heroBytes, 'image/jpeg');

          // Genera immagine MID-ARTICLE realistica
          const midBytes = await generateImage(`Foto realistica per illustrare il tema: ${post.title}. Inquadratura orizzontale, dettagli chiari, stile coerente con immagine di copertina.`, 1024, 768);
          const midPath = `blog/inline/${post.slug}-mid.jpg`;
          const midUrl = await uploadAndGetUrl(midPath, midBytes, 'image/jpeg');
          imagesGenerated += 2;

          // Inserisci l'immagine a metà articolo
          const paragraphs = newContent.split(/\n\n+/);
          const midIndex = Math.max(3, Math.floor(paragraphs.length / 2));
          const imgBlock = `\n\n<figure><img src="${midUrl}" alt="${post.title}" loading="lazy" decoding="async" /></figure>\n\n`;
          paragraphs.splice(midIndex, 0, imgBlock);
          const finalContent = paragraphs.join('\n\n');

          // Recalcola reading_time
          const wordCount = finalContent.split(/\s+/).filter(Boolean).length;
          const reading_time = Math.max(1, Math.ceil(wordCount / 200));

          // Aggiorna post
          await supabase
            .from('blog_posts')
            .update({ content: finalContent, featured_image: heroUrl, reading_time })
            .eq('id', post.id);
        } catch (e) {
          console.error('Upgrade draft failed for', post.slug, e);
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, created, slugs: createdSlugs, upgraded, imagesGenerated }),
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
