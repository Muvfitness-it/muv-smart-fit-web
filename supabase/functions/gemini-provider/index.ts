import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Gemini Provider function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { payload } = await req.json();
    console.log('Received payload type:', typeof payload);
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    
    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY not found');
      throw new Error('GEMINI_API_KEY non configurata');
    }

    let requestBody;
    
    // Se il payload è una stringa, è un prompt semplice per il blog
    if (typeof payload === 'string') {
      console.log('Simple prompt for blog article generation');
      requestBody = {
        contents: [{
          parts: [{
            text: payload
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192
        }
      };
    } else {
      // Altrimenti è un payload strutturato (per meal planner, shopping list, etc.)
      console.log('Structured payload for specific generation');
      requestBody = payload;
    }

    console.log('Calling Gemini API...');
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Errore API Gemini: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response received');

    // Per prompt semplici (blog), restituisci direttamente il testo
    if (typeof payload === 'string') {
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!content) {
        throw new Error('Nessun contenuto generato da Gemini');
      }
      return new Response(JSON.stringify({ content }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Per payload strutturati, restituisci la risposta completa
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in gemini-provider function:', error);
    
    let errorMessage = 'Errore nella comunicazione con Gemini';
    if (error.message?.includes('API key')) {
      errorMessage = 'Chiave API di Gemini non configurata correttamente';
    } else if (error.message?.includes('quota') || error.message?.includes('limit')) {
      errorMessage = 'Quota API di Gemini esaurita o limite raggiunto';
    } else if (error.message?.includes('blocked')) {
      errorMessage = 'Contenuto bloccato dai filtri di sicurezza di Gemini';
    }
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});