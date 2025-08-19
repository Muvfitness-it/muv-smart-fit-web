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
      throw new Error('OPENAI_API_KEY non configurata');
    }

    const { prompt, style = 'natural', size = '1024x1024', quality = 'hd' } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt richiesto' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log('Generating image with prompt:', prompt);

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
        output_format: 'png'
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Errore nella generazione dell\'immagine');
    }

    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      throw new Error('Nessuna immagine generata');
    }

    console.log('Image generated successfully');

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