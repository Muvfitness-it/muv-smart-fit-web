import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting for security
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per minute per IP

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const clientData = rateLimitMap.get(ip) || { count: 0, lastReset: now };
  
  if (now - clientData.lastReset > RATE_LIMIT_WINDOW) {
    clientData.count = 0;
    clientData.lastReset = now;
  }
  
  clientData.count++;
  rateLimitMap.set(ip, clientData);
  
  return clientData.count <= RATE_LIMIT_MAX_REQUESTS;
};

interface ArticleRequest {
  topic: string;
  wordCount: number;
  tone: string;
  additionalContext?: string;
  createImage?: boolean;
}

interface ArticleResponse {
  title: string;
  slug: string;
  hook: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  headings: {
    h1: string;
    h2: string[];
    h3: string[];
  };
  internal_links: string[];
  image_prompt?: string;
  tone_used: string;
  word_count_target: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';
  const authHeader = req.headers.get('authorization');

  try {
    // Rate limiting check
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Troppe richieste. Riprova tra qualche minuto.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // JWT validation
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn('Missing or invalid authorization header', { ip: clientIP });
      return new Response(
        JSON.stringify({ error: 'Token di autorizzazione richiesto' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { topic, wordCount, tone, additionalContext, createImage = false } = await req.json() as ArticleRequest;
    
    if (!topic || !topic.trim()) {
      throw new Error('Argomento dell\'articolo è obbligatorio');
    }

    // Get Lovable AI API Key
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      throw new Error('Lovable AI non configurato. Contatta il supporto.');
    }

    console.log(`Generating article with Lovable AI Gateway - Topic: "${topic}", Words: ${wordCount}, Tone: ${tone}`);

    const systemPrompt = `Sei un esperto copywriter per MUV Fitness, centro fitness premium di Legnago (VR).
Scrivi articoli SEO-ottimizzati in italiano con tono ${tone}.
Target: persone 25-60 anni che cercano dimagrimento, tonificazione, benessere.

RISPONDI SOLO con JSON valido con questa struttura ESATTA:
{
  "title": "Titolo accattivante diverso dall'argomento (max 60 caratteri)",
  "slug": "slug-url-friendly",
  "hook": "Frase di apertura forte e coinvolgente",
  "content": "Contenuto HTML con <h2>, <h3>, <p>, <strong>, <ul>, <li>",
  "excerpt": "Riassunto 2-3 frasi (max 160 caratteri)",
  "metaTitle": "Meta title SEO ottimizzato (max 60 caratteri)",
  "metaDescription": "Meta description SEO (max 160 caratteri)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "headings": {
    "h1": "Titolo H1 principale",
    "h2": ["Sottotitolo 1", "Sottotitolo 2", "Sottotitolo 3"],
    "h3": ["Punto 1", "Punto 2", "Punto 3"]
  },
  "internal_links": ["servizio-correlato-1", "pagina-correlata-2"],
  "image_prompt": "${createImage ? 'Descrivi immagine fitness correlata' : ''}",
  "tone_used": "${tone}",
  "word_count_target": ${wordCount}
}

REGOLE CONTENUTO:
- Usa HTML semantico: h2, h3, p, strong, ul, li
- Grassetti mirati su parole chiave fitness
- Liste bullet ben strutturate
- Cita servizi MUV: EMS, Pilates Reformer, Vacuum, Personal Training
- Includi call-to-action verso consulenza gratuita
- NON usare emoji o CAPS LOCK aggressivi
- Tono premium, elegante, rassicurante`;

    const userPrompt = `Scrivi un articolo su: "${topic}"
${additionalContext ? `Contesto aggiuntivo: ${additionalContext}` : ''}
Lunghezza target: ${wordCount} parole
Tono: ${tone}

Crea contenuto HTML ben formattato con focus SEO per "fitness Legnago".`;

    // Call Lovable AI Gateway
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Limite richieste AI superato. Riprova tra qualche minuto.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Crediti AI esauriti. Contatta il supporto.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`Errore AI Gateway: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      console.error('No content in AI response:', data);
      throw new Error('Nessun contenuto generato');
    }

    console.log('AI Response received, parsing JSON...');

    // Parse JSON from response (handle markdown code blocks)
    let jsonContent = content;
    if (content.includes('```json')) {
      jsonContent = content.replace(/```json\s*/, '').replace(/```\s*$/, '');
    } else if (content.includes('```')) {
      jsonContent = content.replace(/```\s*/, '').replace(/```\s*$/, '');
    }

    let articleData: ArticleResponse;
    try {
      articleData = JSON.parse(jsonContent.trim());
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Content:', jsonContent.substring(0, 500));
      throw new Error('Errore nel parsing della risposta AI');
    }

    // Validazione e pulizia dei dati
    if (!articleData.title || !articleData.content || !articleData.excerpt) {
      throw new Error('Dati dell\'articolo incompleti');
    }

    // Genera slug se mancante
    if (!articleData.slug) {
      articleData.slug = articleData.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .substring(0, 60);
    }

    // Add timestamp to make slug unique
    const timestamp = Date.now().toString().slice(-6);
    articleData.slug = `${articleData.slug}-${timestamp}`;

    // Pulisci contenuto HTML
    let cleanContent = articleData.content
      .replace(/```html|```/g, '')
      .replace(/^\s*<h1[^>]*>.*?<\/h1>\s*/i, '')
      .replace(/style="[^"]*"/g, '')
      .trim();

    const result: ArticleResponse = {
      title: articleData.title.substring(0, 100),
      slug: articleData.slug,
      hook: articleData.hook || `Scopri tutto su ${topic} con MUV Fitness.`,
      content: cleanContent,
      excerpt: articleData.excerpt.substring(0, 200),
      metaTitle: (articleData.metaTitle || articleData.title).substring(0, 60),
      metaDescription: (articleData.metaDescription || articleData.excerpt).substring(0, 160),
      keywords: articleData.keywords || [],
      headings: articleData.headings || {
        h1: articleData.title,
        h2: [],
        h3: []
      },
      internal_links: articleData.internal_links || [],
      image_prompt: createImage ? (articleData.image_prompt || `Immagine fitness per: ${topic}`) : undefined,
      tone_used: tone,
      word_count_target: wordCount
    };

    console.log(`Article generated successfully with Lovable AI`);

    return new Response(JSON.stringify({ ...result, provider_used: 'lovable-ai' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in advanced-article-generator:', error);
    
    const errorMsg = error instanceof Error ? error.message : String(error);
    
    return new Response(JSON.stringify({ error: errorMsg || 'Errore nella generazione' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
