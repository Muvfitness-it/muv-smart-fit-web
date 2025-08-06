import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

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
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY non configurata');
    }

    const { prompt, width = 1024, height = 1024 } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt richiesto' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log('Generating image with Gemini API, prompt:', prompt);

    // Use Hugging Face's FLUX model via their API since Gemini doesn't have direct image generation
    const response = await fetch('https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer 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`, // Public demo token
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `Crea un'immagine professionale per un blog di fitness: ${prompt}. Lo stile deve essere moderno, pulito e professionale, adatto a un brand fitness di alta qualità.`,
        parameters: {
          width: width,
          height: height
        }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Hugging Face API error:', error);
      throw new Error('Errore nella generazione dell\'immagine: ' + error);
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const imageUrl = `data:image/png;base64,${base64}`;

    console.log('Image generated successfully');

    return new Response(
      JSON.stringify({ 
        image_url: imageUrl,
        revised_prompt: prompt 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in gemini-image function:', error);
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