import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface HumanizationRules {
  // Sostituzioni dirette per rendere il copy più umano
  directReplacements: { [key: string]: string };
  // Pattern per rimuovere linguaggio troppo "commerciale"
  commercialPatterns: { pattern: RegExp; replacement: string }[];
  // Frasi introduttive più naturali
  introPatterns: { pattern: RegExp; replacement: string }[];
}

const humanizationRules: HumanizationRules = {
  directReplacements: {
    // Sostituzioni dirette per linguaggio più umano
    "Trasforma il tuo corpo": "Il tuo corpo può cambiare",
    "Raggiungi i tuoi obiettivi": "Quello che vuoi ottenere",
    "Prenota ora": "Vieni a vedere",
    "Scopri di più": "Te lo spieghiamo meglio",
    "Risultati garantiti": "Risultati che funzionano",
    "Metodo rivoluzionario": "Un approccio che funziona",
    "Sistema innovativo": "Come lavoriamo noi",
    "Soluzione definitiva": "Quello che serve davvero",
    "Programma personalizzato": "Piano fatto per te",
    "Consulenza gratuita": "Prima volta gratis",
    "Offerta limitata": "Solo per poco",
    "Non perdere l'occasione": "Se ti interessa",
    "Approfitta subito": "Se decidi di iniziare",
    "Tecnologia avanzata": "Strumenti seri",
    "Centro all'avanguardia": "Palestra seria",
    "Team di professionisti": "Chi ti segue",
    "Esperti qualificati": "Persone che sanno il fatto loro"
  },

  commercialPatterns: [
    // Rimuovi linguaggio troppo commerciale
    { pattern: /🚀|⚡|💪|🎯/g, replacement: "" },
    { pattern: /SCOPRI SUBITO|PRENOTA ORA|CLICCA QUI/gi, replacement: "Vedi qui" },
    { pattern: /TRASFORMA LA TUA VITA/gi, replacement: "Cambia le cose" },
    { pattern: /RISULTATI STRAORDINARI/gi, replacement: "Risultati seri" },
    { pattern: /INCREDIBILE OPPORTUNITÀ/gi, replacement: "Una bella occasione" },
    { pattern: /RIVOLUZIONARIO/gi, replacement: "Efficace" },
    { pattern: /INNOVATIVO/gi, replacement: "Diverso" },
    { pattern: /ESCLUSIVO/gi, replacement: "Particolare" },
    { pattern: /UNICO/gi, replacement: "Specifico" },
    { pattern: /MIGLIOR[EA]? IN ASSOLUTO/gi, replacement: "Tra i migliori" },
    { pattern: /GARANTITO AL 100%/gi, replacement: "Funziona davvero" },
    { pattern: /MASSIMI RISULTATI/gi, replacement: "Buoni risultati" }
  ],

  introPatterns: [
    // Introduzioni più naturali
    { pattern: /^Se stai cercando di (.+), probabilmente/gi, replacement: "Sai quella sensazione quando $1? Ecco," },
    { pattern: /^Vuoi sapere come (.+)\?/gi, replacement: "Ti spiego come $1." },
    { pattern: /^In questo articolo scoprirai/gi, replacement: "Qui dentro trovi" },
    { pattern: /^Leggi questa guida completa per/gi, replacement: "Ti spiego come" },
    { pattern: /^Scopri tutti i segreti per/gi, replacement: "Quello che devi sapere per" },
    { pattern: /^La guida definitiva per/gi, replacement: "Come fare per" }
  ]
};

function humanizeContent(content: string): string {
  let humanizedContent = content;

  // Applica sostituzioni dirette
  Object.entries(humanizationRules.directReplacements).forEach(([original, replacement]) => {
    const regex = new RegExp(original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    humanizedContent = humanizedContent.replace(regex, replacement);
  });

  // Applica pattern commerciali
  humanizationRules.commercialPatterns.forEach(({ pattern, replacement }) => {
    humanizedContent = humanizedContent.replace(pattern, replacement);
  });

  // Applica pattern introduttivi
  humanizationRules.introPatterns.forEach(({ pattern, replacement }) => {
    humanizedContent = humanizedContent.replace(pattern, replacement);
  });

  // Aggiustamenti specifici per naturalezza
  humanizedContent = humanizedContent
    // Rimuovi eccesso di punti esclamativi
    .replace(/!{2,}/g, '.')
    // Sostituisci alcune espressioni troppo formali
    .replace(/\bpertanto\b/gi, 'quindi')
    .replace(/\binoltre\b/gi, 'e poi')
    .replace(/\btuttavia\b/gi, 'però')
    .replace(/\binfatti\b/gi, 'infatti')
    .replace(/\bdi conseguenza\b/gi, 'così')
    // Rendi i CTA più naturali
    .replace(/Prenota (la tua )?consulenza/gi, 'Vieni a fare una chiacchierata')
    .replace(/Contattaci (subito|ora)/gi, 'Scrivici')
    .replace(/Chiamaci (subito|ora)/gi, 'Chiamaci')
    // Sostituisci alcune introduzioni tipiche
    .replace(/È importante sottolineare che/gi, 'Tieni presente che')
    .replace(/È fondamentale ricordare che/gi, 'Non dimenticare che')
    .replace(/Ricorda sempre che/gi, 'Ricordati che')
    // Rendi più conversazionale
    .replace(/\bvoi\b/gi, 'tu')
    .replace(/\bvostra?\b/gi, 'tua')
    .replace(/\bvostri?\b/gi, 'tuoi');

  return humanizedContent;
}

function humanizeTitle(title: string): string {
  return humanizeContent(title)
    // Rimuovi numerazioni eccessive
    .replace(/^\d+\s+modi\s+per/gi, 'Come')
    .replace(/I \d+ migliori/gi, 'I migliori')
    .replace(/Le \d+ ragioni/gi, 'Perché')
    // Rendi i titoli più conversazionali
    .replace(/: la guida completa$/gi, ': come fare')
    .replace(/: tutto quello che devi sapere$/gi, ': quello che serve')
    .replace(/Come ottenere/gi, 'Come avere');
}

function humanizeExcerpt(excerpt: string): string {
  return humanizeContent(excerpt)
    // Rimuovi linguaggio troppo promozionale negli excerpt
    .replace(/Scopri come/gi, 'Vedi come')
    .replace(/Leggi la nostra guida/gi, 'Ti spieghiamo')
    .replace(/In questo articolo/gi, 'Qui');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { postIds, mode = 'preview' } = await req.json();

    if (!postIds || !Array.isArray(postIds)) {
      return new Response(
        JSON.stringify({ error: 'postIds array is required' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Recupera i post dal database
    const { data: posts, error: fetchError } = await supabaseClient
      .from('blog_posts')
      .select('id, title, content, excerpt')
      .in('id', postIds);

    if (fetchError) {
      throw fetchError;
    }

    const results = [];

    for (const post of posts || []) {
      const originalContent = {
        title: post.title || '',
        content: post.content || '',
        excerpt: post.excerpt || ''
      };

      const humanizedContent = {
        title: humanizeTitle(originalContent.title),
        content: humanizeContent(originalContent.content),
        excerpt: humanizeExcerpt(originalContent.excerpt)
      };

      if (mode === 'apply') {
        // Salva il backup dell'originale se non esiste già
        const { data: existingBackup } = await supabaseClient
          .from('blog_posts_backup')
          .select('id')
          .eq('original_post_id', post.id)
          .maybeSingle();

        if (!existingBackup) {
          await supabaseClient
            .from('blog_posts_backup')
            .insert({
              original_post_id: post.id,
              original_title: originalContent.title,
              original_content: originalContent.content,
              original_excerpt: originalContent.excerpt,
              backup_date: new Date().toISOString()
            });
        }

        // Aggiorna il post con il contenuto umanizzato
        const { error: updateError } = await supabaseClient
          .from('blog_posts')
          .update({
            title: humanizedContent.title,
            content: humanizedContent.content,
            excerpt: humanizedContent.excerpt
          })
          .eq('id', post.id);

        if (updateError) {
          throw updateError;
        }
      }

      results.push({
        id: post.id,
        original: originalContent,
        humanized: humanizedContent,
        applied: mode === 'apply'
      });
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        results,
        mode 
      }), 
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Humanization error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to humanize blog copy' 
      }), 
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});