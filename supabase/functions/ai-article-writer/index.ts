import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, action } = await req.json();
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // PROMPT INTERNO IA (STICKY PER SCRITTURA/RISCRITTURA)
    const systemPrompt = `AGISCI COME: Editor Senior SEO/SEM/Copy per MUV Fitness (Legnago, VR).
OBIETTIVO: Produrre articoli NATURALI, UMANI, AUTOREVOLI, in HTML semantico perfetto e SEO-first. Zero errori, zero fluff.

STILE & TONO
- Professionale-empatico, chiaro, concreto; orientato ai benefici.
- Frasi ≤ 20 parole; paragrafi ≤ 4 righe; vocabolario vario.
- Storytelling leggero, esempi pratici, analogie brevi; evita gergo inutile.

STRUTTURA OBBLIGATORIA (HTML SOLO)
- <h1> unico con keyword principale all'inizio.
- Intro 80–120 parole: promessa di valore + perché leggere.
- Corpo con <h2>/<h3> gerarchici, liste dove utili, <strong>/<em> per evidenze (senza abuso).
- Conclusione con sintesi + CTA: "Vuoi risultati concreti e duraturi? Prenota oggi la tua prova gratuita al Centro Fitness MUV a Legnago."
- 2–4 link interni pertinenti (anchor descrittive).
- Immagini: <img loading="lazy" alt="descrizione naturale con keyword">
- NIENTE markdown, NIENTE stili inline superflui; HTML pulito.

SEO OBBLIGATORIO
- Slug breve e univoco; meta title ≤60; meta description ≤155.
- Keyword principale: in H1, primo paragrafo, ≥1 H2, conclusione.
- 3–6 keyword correlate distribuite naturalmente.
- Local SEO con "Legnago" solo dove sensato.

PROCEDURA IA (DA TITOLO)
1) Estrai keyword principale + 3–6 correlate.
2) Genera outline (H2/H3) coerente e completo.
3) Scrivi l'articolo in HTML rispettando tutte le regole.
4) Proponi 2–3 varianti di meta title/description.
5) Suggerisci 3–5 link interni.

FORMATO RISPOSTA JSON:
{
  "content": "HTML dell'articolo completo",
  "title": "Titolo H1",
  "slug": "slug-seo-friendly", 
  "meta_title": "Meta title ≤60",
  "meta_description": "Meta description ≤155",
  "excerpt": "Estratto 160-220 caratteri",
  "reading_time": 5,
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "internal_links": [
    {"anchor": "anchor text", "url": "/servizi/personal-training"},
    {"anchor": "anchor text 2", "url": "/servizi/ems"}
  ]
}`;

    const userPrompt = action === 'write_from_title' 
      ? `Scrivi un articolo completo partendo dal titolo: "${title}". Segui tutte le regole SEO e di struttura.`
      : `Riscrivi completamente ex-novo un articolo sul tema: "${title}". Ignora qualsiasi contenuto esistente e crea tutto da zero.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4000
      }),
    });

    const aiData = await response.json();
    
    // Estrarre JSON in modo robusto dall'output del modello
    const rawContent: string = aiData?.choices?.[0]?.message?.content ?? '';
    if (!rawContent) {
      throw new Error('Invalid AI response');
    }

    function extractJsonString(text: string): string | null {
      // 1) Blocco ```json
      const block = text.match(/```json\s*([\s\S]*?)```/i) || text.match(/```\s*([\s\S]*?)```/i);
      if (block?.[1]) return block[1].trim();
      // 2) Prima graffa aperta -> ultima chiusa
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');
      if (start !== -1 && end !== -1 && end > start) {
        return text.slice(start, end + 1).trim();
      }
      return null;
    }

    const jsonString = extractJsonString(rawContent);

    let articleData: any;
    try {
      articleData = JSON.parse(jsonString ?? rawContent.trim());
    } catch (e) {
      console.error('AI raw content (truncated):', rawContent.slice(0, 400));
      throw new Error('AI response is not valid JSON');
    }

    // Genera slug univoco
    const baseSlug = articleData.slug || title.toLowerCase()
      .replace(/[àáâäã]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôöõ]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[ñ]/g, 'n')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    let finalSlug = baseSlug;
    let counter = 1;
    
    while (true) {
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', finalSlug)
        .single();
      
      if (!existingPost) break;
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    // SELF-QA automatico
    const qaChecks = {
      hasSingleH1: (articleData.content.match(/<h1[^>]*>.*?<\/h1>/gi) || []).length === 1,
      hasH2: /<h2[^>]*>.*?<\/h2>/i.test(articleData.content),
      h3HierarchyValid: !/<h3[^>]*>/i.test(articleData.content) || /<h2[^>]*>/i.test(articleData.content),
      hasCTA: /prenota.*prova.*gratuita|prova.*gratuita.*prenota/i.test(articleData.content),
      hasIntro: articleData.content.replace(/<[^>]*>/g, '').length > 200,
      validSlug: finalSlug.length > 0 && finalSlug.length < 100,
      validMetaTitle: articleData.meta_title && articleData.meta_title.length <= 60,
      validMetaDescription: articleData.meta_description && articleData.meta_description.length <= 155,
      hasInternalLinks: Array.isArray(articleData.internal_links) && articleData.internal_links.length >= 2 && articleData.internal_links.length <= 5,
      imagesAltLazy: !/<img[^>]*>/i.test(articleData.content) || (/<img[^>]*alt="[^"]+"/i.test(articleData.content) && /<img[^>]*loading="lazy"[^>]*>/i.test(articleData.content)),
      hasJsonLd: /<script[^>]+type="application\/ld\+json"[^>]*>/i.test(articleData.content),
      keywordDistribution: Array.isArray(articleData.keywords) && articleData.keywords.length > 0
        ? (new RegExp(articleData.keywords[0], 'i').test(articleData.title) && new RegExp(articleData.keywords[0], 'i').test(articleData.content))
        : true
    };

    const allChecksPassed = Object.values(qaChecks).every(check => check);

    if (!allChecksPassed) {
      return new Response(JSON.stringify({
        success: false,
        error: 'QA checks failed',
        qaChecks,
        message: 'L\'articolo non ha superato i controlli di qualità'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Salva come DRAFT
    const { data: savedPost, error: saveError } = await supabase
      .from('blog_posts')
      .insert({
        title: articleData.title,
        slug: finalSlug,
        content: articleData.content,
        excerpt: articleData.excerpt,
        meta_title: articleData.meta_title,
        meta_description: articleData.meta_description,
        reading_time: articleData.reading_time || 5,
        status: 'draft',
        tags: articleData.keywords || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (saveError) {
      throw new Error(`Database error: ${saveError.message}`);
    }

    return new Response(JSON.stringify({
      success: true,
      post: savedPost,
      qaChecks,
      internal_links: articleData.internal_links,
      message: 'Articolo creato con successo come DRAFT'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-article-writer:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});