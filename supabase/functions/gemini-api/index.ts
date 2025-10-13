
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { payload } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found');
      throw new Error('API key di Gemini non configurata');
    }

    console.log('Calling Gemini API with payload type:', typeof payload);

    // Converti payload in formato Gemini
    let geminiPayload;
    
    if (typeof payload === 'string') {
      // Payload semplice stringa
      geminiPayload = {
        contents: [{
          role: 'user',
          parts: [{ text: payload }]
        }]
      };
    } else if (payload.contents) {
      // Payload già in formato Gemini
      geminiPayload = payload;
    } else if (payload.messages) {
      // Converti da formato OpenAI a Gemini
      geminiPayload = {
        contents: payload.messages
          .filter((msg: any) => msg.role !== 'system') // Gemini non supporta system messages separate
          .map((msg: any) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
          }))
      };
    } else {
      // Fallback
      geminiPayload = {
        contents: [{
          role: 'user',
          parts: [{ text: JSON.stringify(payload) }]
        }]
      };
    }

    console.log('Gemini API request prepared, contents count:', geminiPayload.contents.length);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiPayload)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      
      // Gestisci errori specifici
      if (response.status === 429) {
        throw new Error('Limite richieste Gemini raggiunto. Riprova tra qualche minuto.');
      } else if (response.status === 403) {
        throw new Error('Chiave API Gemini non valida o scaduta.');
      }
      
      throw new Error(`Errore API Gemini: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response received');

    // Estrai il testo dalla risposta di Gemini
    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      console.error('Gemini response structure:', JSON.stringify(data, null, 2));
      throw new Error('Nessun contenuto generato dall\'API di Gemini');
    }

    return new Response(
      JSON.stringify({ content: generatedText, candidates: data.candidates }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in gemini-api function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Errore nella chiamata all\'API di Gemini. Verifica la configurazione dell\'API key.'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
