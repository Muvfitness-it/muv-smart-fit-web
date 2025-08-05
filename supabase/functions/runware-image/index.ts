import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const runwareApiKey = Deno.env.get('RUNWARE_API_KEY');

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
    if (!runwareApiKey) {
      throw new Error('RUNWARE_API_KEY non configurata');
    }

    const { prompt, width = 1024, height = 1024 } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt richiesto' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log('Generating image with Runware API, prompt:', prompt);

    const response = await fetch('https://api.runware.ai/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          taskType: "authentication",
          apiKey: runwareApiKey
        },
        {
          taskType: "imageInference",
          taskUUID: crypto.randomUUID(),
          positivePrompt: `Crea un'immagine professionale per un blog di fitness: ${prompt}. Lo stile deve essere moderno, pulito e professionale, adatto a un brand fitness di alta qualità.`,
          width: width,
          height: height,
          model: "runware:100@1",
          numberResults: 1,
          outputFormat: "WEBP",
          CFGScale: 1,
          scheduler: "FlowMatchEulerDiscreteScheduler",
          strength: 0.8
        }
      ]),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Runware API error:', error);
      throw new Error(error.error?.message || 'Errore nella generazione dell\'immagine');
    }

    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      throw new Error('Nessuna immagine generata');
    }

    // Find the image inference result
    const imageResult = data.data.find((item: any) => item.taskType === 'imageInference');
    
    if (!imageResult || !imageResult.imageURL) {
      throw new Error('Risultato immagine non valido');
    }

    console.log('Image generated successfully with Runware');

    return new Response(
      JSON.stringify({ 
        image_url: imageResult.imageURL,
        revised_prompt: imageResult.positivePrompt 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in runware-image function:', error);
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