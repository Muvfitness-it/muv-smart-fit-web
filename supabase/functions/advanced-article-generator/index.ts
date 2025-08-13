import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ArticleRequest {
  topic: string;
  wordCount: number;
  tone: string;
  additionalContext?: string;
}

interface ArticleResponse {
  title: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, wordCount, tone, additionalContext } = await req.json() as ArticleRequest;
    
    if (!topic || !topic.trim()) {
      throw new Error('Argomento dell\'articolo è obbligatorio');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY non configurata');
    }

    // Prompt avanzato per generare un articolo strutturato
    const systemPrompt = `Sei un esperto copywriter specializzato in articoli per centri fitness e benessere in Italia.
Il tuo compito è scrivere articoli professionali, coinvolgenti e ottimizzati SEO per MUV Fitness di Legnago.

IMPORTANTE: Devi restituire SOLO un oggetto JSON valido con questa struttura:
{
  "title": "Titolo accattivante e ottimizzato SEO (max 60 caratteri)",
  "content": "Contenuto HTML completo con tag semantici",
  "excerpt": "Riassunto di 2-3 frasi (max 160 caratteri)",
  "metaTitle": "Meta title per SEO (max 60 caratteri)",
  "metaDescription": "Meta description per SEO (max 160 caratteri)",
  "keywords": ["parola1", "parola2", "parola3"]
}

REGOLE PER IL CONTENUTO:
- Usa solo tag HTML semantici: h2, h3, p, ul, li, strong, em, blockquote
- NON usare h1 (viene gestito separatamente)
- Scrivi in italiano naturale e coinvolgente
- Tono: ${tone}
- Lunghezza: circa ${wordCount} parole
- Includi esempi pratici e consigli utili
- Struttura chiara con H2 e H3
- Paragrafi brevi e leggibili
- Call-to-action finale che invita a contattare MUV Fitness
- Evita affermazioni mediche assolute, usa disclaimer quando necessario`;

    const userPrompt = `Scrivi un articolo professionale su: "${topic}"
    
${additionalContext ? `Contesto aggiuntivo: ${additionalContext}` : ''}

Ricorda di concentrarti su:
- Benefici pratici per i lettori
- Consigli applicabili
- Come MUV Fitness può aiutare con questo argomento
- SEO ottimizzato per il mercato italiano del fitness

IMPORTANTE: Rispondi SOLO con il JSON richiesto, senza altri testi o spiegazioni.`;

    console.log('Calling OpenAI API for article generation...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`Errore API OpenAI: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI API response received');

    const content = data.choices[0].message.content;
    
    if (!content) {
      throw new Error('Nessun contenuto generato da OpenAI');
    }

    try {
      const articleData = JSON.parse(content) as ArticleResponse;
      
      // Validazione dei dati generati
      if (!articleData.title || !articleData.content || !articleData.excerpt) {
        throw new Error('Dati dell\'articolo incompleti');
      }

      // Pulisci e valida il contenuto HTML
      const cleanContent = articleData.content
        .replace(/```html|```/g, '')
        .replace(/^\s*<h1[^>]*>.*?<\/h1>\s*/i, '') // Rimuovi eventuali H1
        .trim();

      const result: ArticleResponse = {
        title: articleData.title.substring(0, 100), // Limita lunghezza
        content: cleanContent,
        excerpt: articleData.excerpt.substring(0, 200),
        metaTitle: (articleData.metaTitle || articleData.title).substring(0, 60),
        metaDescription: (articleData.metaDescription || articleData.excerpt).substring(0, 160),
        keywords: articleData.keywords || []
      };

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      throw new Error('Formato di risposta non valido dal generatore AI');
    }

  } catch (error) {
    console.error('Error in advanced-article-generator function:', error);
    
    let errorMessage = 'Errore nella generazione dell\'articolo';
    
    if (error.message?.includes('API key')) {
      errorMessage = 'Chiave API OpenAI non configurata correttamente';
    } else if (error.message?.includes('quota') || error.message?.includes('insufficient_quota')) {
      errorMessage = 'Quota API OpenAI esaurita';
    } else if (error.message?.includes('rate limit')) {
      errorMessage = 'Troppe richieste. Riprova tra qualche minuto';
    } else if (error.message?.includes('content_policy')) {
      errorMessage = 'Contenuto non conforme alle policy di OpenAI';
    } else {
      errorMessage = error.message || 'Errore sconosciuto nella generazione';
    }
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});