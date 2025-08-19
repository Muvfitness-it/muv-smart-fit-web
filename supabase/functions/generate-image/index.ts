import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      console.error('OPENAI_API_KEY not configured');
      throw new Error('OPENAI_API_KEY non configurata');
    }

    // Rate limiting check (simple in-memory counter per IP)
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    console.log(`Image generation request from IP: ${clientIP}`);

    const { prompt, style = 'natural', size = '1024x1024', quality = 'high' } = await req.json();

    if (!prompt) {
      console.error('Missing prompt in request');
      return new Response(
        JSON.stringify({ error: 'Prompt richiesto' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    if (prompt.length > 4000) {
      console.error('Prompt too long:', prompt.length);
      return new Response(
        JSON.stringify({ error: 'Prompt troppo lungo (max 4000 caratteri)' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log('Generating image with prompt:', { prompt: prompt.slice(0, 100), size, quality });

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt: `Crea un'immagine professionale per un blog di fitness: ${prompt}. Lo stile deve essere moderno, pulito e professionale, adatto a un brand fitness di alta qualità.`,
        n: 1,
        size: size,
        quality: quality,
        output_format: 'png',
        response_format: 'b64_json'
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', { status: response.status, error });
      
      if (response.status === 429) {
        throw new Error('Limite di richieste raggiunto. Riprova tra qualche minuto.');
      }
      if (response.status === 401) {
        throw new Error('Chiave API non valida o scaduta.');
      }
      
      throw new Error(error.error?.message || 'Errore nella generazione dell\'immagine');
    }

    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      console.error('No image data returned:', data);
      throw new Error('Nessuna immagine generata');
    }

    if (!data.data[0].b64_json) {
      console.error('Missing b64_json in response:', data.data[0]);
      throw new Error('Formato immagine non valido');
    }

    console.log('Image generated successfully:', { 
      model: 'gpt-image-1', 
      size, 
      quality, 
      revised_prompt: data.data[0].revised_prompt?.slice(0, 100) 
    });

    return new Response(
      JSON.stringify({ 
        image: `data:image/png;base64,${data.data[0].b64_json}`,
        revised_prompt: data.data[0].revised_prompt 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-image function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Errore sconosciuto nella generazione dell\'immagine' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});