import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting for security
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 requests per minute per IP

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
  qualityModel?: 'openai' | 'pro' | 'flash';
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
    const { topic, wordCount, tone, additionalContext, qualityModel = 'openai', createImage = false } = await req.json() as ArticleRequest;
    
    if (!topic || !topic.trim()) {
      throw new Error('Argomento dell\'articolo è obbligatorio');
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!geminiApiKey && !openAIApiKey) {
      throw new Error('Nessuna API key configurata (Gemini o OpenAI richiesta)');
    }

    // Funzione per generare con Gemini
    const tryGeminiGeneration = async (): Promise<ArticleResponse> => {
      const geminiModel = qualityModel === 'pro' ? 'gemini-2.5-pro' : 'gemini-2.0-flash';
      
      const prompt = `Sei un esperto copywriter specializzato in articoli per centri fitness e benessere.
Scrivi un articolo per MUV Fitness di Legnago sull'argomento: "${topic}"

PARAMETRI:
- Lunghezza: ${wordCount} parole
- Tono: ${tone}
- Contesto aggiuntivo: ${additionalContext || 'Nessuno'}
- Target: Centro fitness premium in Italia

IMPORTANTE: Rispondi SOLO con un JSON valido con questa struttura ESATTA:
{
  "title": "Titolo accattivante diverso dall'argomento (max 60 caratteri)",
  "slug": "slug-url-friendly",
  "hook": "Frase di apertura forte e coinvolgente",
  "content": "Contenuto HTML con <h2>, <h3>, <p>, <strong>, <ul>, <li>, tabelle colorate con classi Tailwind per contrasto",
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
  "image_prompt": "${createImage ? `Prompt per immagine fitness correlata a: ${topic}` : ''}",
  "tone_used": "${tone}",
  "word_count_target": ${wordCount}
}

REGOLE HTML:
- Usa classi Tailwind per contrasto: text-gray-900 dark:text-gray-100
- Tabelle con bg-slate-900 text-white o bg-emerald-50 text-emerald-900 border-emerald-200
- Grassetti mirati su parole chiave fitness
- Liste bullet ben strutturate
- MAI testo trasparente o poco visibile
- Titolo deve essere diverso e più accattivante dell'argomento`;

      const geminiPayload = {
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
          responseMimeType: "application/json"
        }
      };

      console.log(`Calling Gemini API with model: ${geminiModel}`);
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiPayload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!content) {
        throw new Error('No content generated by Gemini');
      }

      return JSON.parse(content);
    };

    // Funzione per generare con OpenAI (fallback)
    const tryOpenAIGeneration = async (): Promise<ArticleResponse> => {
      const systemPrompt = `Sei un esperto copywriter per MUV Fitness, centro fitness premium di Legnago.
Scrivi articoli ottimizzati SEO in italiano con tono ${tone}.

Rispondi SOLO con JSON valido:
{
  "title": "Titolo accattivante diverso dall'argomento",
  "slug": "slug-url",
  "hook": "Hook forte di apertura",
  "content": "HTML con h2, h3, p, strong, ul, li, tabelle Tailwind colorate",
  "excerpt": "Riassunto breve", 
  "metaTitle": "Meta title SEO",
  "metaDescription": "Meta description SEO",
  "keywords": ["array", "keywords"],
  "headings": {"h1": "titolo", "h2": ["array"], "h3": ["array"]},
  "internal_links": ["array-link"],
  "image_prompt": "${createImage ? `Descrivi immagine per: ${topic}` : ''}",
  "tone_used": "${tone}",
  "word_count_target": ${wordCount}
}`;

      const userPrompt = `Argomento: "${topic}"
${additionalContext ? `Contesto: ${additionalContext}` : ''}
Lunghezza: ${wordCount} parole
Tono: ${tone}

Crea contenuto con HTML formattato, tabelle colorate accessibili, grassetti su parole fitness chiave.`;

      console.log('Calling OpenAI API as fallback...');
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 4000,
          temperature: 0.8,
          response_format: { type: "json_object" }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      if (!content) {
        throw new Error('No content generated by OpenAI');
      }

      return JSON.parse(content);
    };

    // Orchestrazione basata sul modello selezionato
    let articleData: ArticleResponse;
    let usedProvider = qualityModel === 'openai' ? 'openai' : 'gemini';

    if (qualityModel === 'openai' && openAIApiKey) {
      // Se specificatamente richiesto OpenAI, usa quello come primo tentativo
      try {
        console.log('Attempting generation with OpenAI (user selected)...');
        articleData = await tryOpenAIGeneration();
        console.log('OpenAI generation successful');
      } catch (openaiError) {
        console.warn('OpenAI failed, trying Gemini fallback:', openaiError);
        
        if (!geminiApiKey) {
          throw new Error('Both OpenAI and Gemini failed. No backup API keys available.');
        }
        
        try {
          articleData = await tryGeminiGeneration();
          usedProvider = 'gemini';
          console.log('Gemini fallback successful');
        } catch (geminiError) {
          const geminiErrorMsg = geminiError instanceof Error ? geminiError.message : 'Unknown error';
          const openaiErrorMsg = openaiError instanceof Error ? openaiError.message : 'Unknown error';
          throw new Error(`Both providers failed. OpenAI: ${openaiErrorMsg}, Gemini: ${geminiErrorMsg}`);
        }
      }
    } else {
      // Default: prova prima Gemini, poi OpenAI come fallback
      try {
        if (geminiApiKey) {
          console.log('Attempting generation with Gemini...');
          articleData = await tryGeminiGeneration();
          console.log('Gemini generation successful');
        } else {
          throw new Error('Gemini API key not available');
        }
      } catch (geminiError) {
        console.warn('Gemini failed, trying OpenAI fallback:', geminiError);
        
        if (!openAIApiKey) {
          throw new Error('Both Gemini and OpenAI failed. No API keys available.');
        }
        
        try {
          articleData = await tryOpenAIGeneration();
          usedProvider = 'openai';
          console.log('OpenAI fallback successful');
        } catch (openaiError) {
          const geminiErrorMsg = geminiError instanceof Error ? geminiError.message : 'Unknown error';
          const openaiErrorMsg = openaiError instanceof Error ? openaiError.message : 'Unknown error';
          throw new Error(`Both providers failed. Gemini: ${geminiErrorMsg}, OpenAI: ${openaiErrorMsg}`);
        }
      }
    }

    // Validazione e pulizia dei dati
    if (!articleData.title || !articleData.content || !articleData.excerpt) {
      throw new Error('Dati dell\'articolo incompleti da entrambi i provider');
    }

    // Assicura che il titolo sia diverso dall'argomento
    if (articleData.title.toLowerCase().includes(topic.toLowerCase().substring(0, 20))) {
      articleData.title = `Scopri ${topic}: La Guida Completa di MUV Fitness`;
    }

    // Genera slug se mancante e gestisci duplicati
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

    // Add timestamp to make slug unique and prevent duplicates
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits
    articleData.slug = `${articleData.slug}-${timestamp}`;

    // Pulisci e normalizza il contenuto HTML
    let cleanContent = articleData.content
      .replace(/```html|```/g, '')
      .replace(/^\s*<h1[^>]*>.*?<\/h1>\s*/i, '') // Rimuovi eventuali H1
      .replace(/style="[^"]*"/g, '') // Rimuovi stili inline
      .replace(/class="text-white"/g, 'class="text-gray-900 dark:text-gray-100"') // Correggi contrasto
      .replace(/class="bg-transparent"/g, 'class="bg-slate-50 dark:bg-slate-800"') // Correggi sfondi trasparenti
      .trim();

    // Assicura contrasto nelle tabelle
    cleanContent = cleanContent.replace(
      /<table([^>]*)>/g, 
      '<table$1 class="w-full border-collapse border border-slate-300 dark:border-slate-600">'
    );
    cleanContent = cleanContent.replace(
      /<th([^>]*)>/g, 
      '<th$1 class="bg-slate-900 text-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 p-2 font-semibold">'
    );
    cleanContent = cleanContent.replace(
      /<td([^>]*)>/g, 
      '<td$1 class="border border-slate-300 dark:border-slate-600 p-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100">'
    );

    const result: ArticleResponse = {
      title: articleData.title.substring(0, 100),
      slug: articleData.slug,
      hook: articleData.hook || `Scopri tutto quello che devi sapere su ${topic} con MUV Fitness.`,
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
      image_prompt: createImage ? (articleData.image_prompt || `Immagine professionale per articolo su ${topic}`) : undefined,
      tone_used: tone,
      word_count_target: wordCount
    };

    console.log(`Article generated successfully using ${usedProvider}`);

    return new Response(JSON.stringify({ ...result, provider_used: usedProvider }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Error in advanced-article-generator function:', error);
    
    let errorMessage = 'Errore nella generazione dell\'articolo';
    
    const errorMsg = error?.message || String(error);
    if (errorMsg?.includes('API key')) {
      errorMessage = 'Chiave API OpenAI non configurata correttamente';
    } else if (errorMsg?.includes('quota') || errorMsg?.includes('insufficient_quota')) {
      errorMessage = 'Quota API OpenAI esaurita';
    } else if (errorMsg?.includes('rate limit')) {
      errorMessage = 'Troppe richieste. Riprova tra qualche minuto';
    } else if (errorMsg?.includes('content_policy')) {
      errorMessage = 'Contenuto non conforme alle policy di OpenAI';
    } else {
      errorMessage = errorMsg || 'Errore sconosciuto nella generazione';
    }
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});