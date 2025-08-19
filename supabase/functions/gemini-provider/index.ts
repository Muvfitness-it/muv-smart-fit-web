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
    const { payload, model } = await req.json();
    console.log('Received payload type:', typeof payload);
    console.log('Requested model:', model);
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    
    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY not found');
      throw new Error('GEMINI_API_KEY non configurata');
    }

    // Determina il modello da usare con fallback intelligente
    let selectedModel = model || 'gemini-2.5-pro';
    
    // Fallback hierarchy: 2.5-pro -> 2.0-pro -> 1.5-pro -> 1.5-flash
    const modelFallbacks = [
      'gemini-2.5-pro',
      'gemini-2.0-pro', 
      'gemini-1.5-pro',
      'gemini-1.5-flash'
    ];
    
    if (!modelFallbacks.includes(selectedModel)) {
      selectedModel = 'gemini-2.5-pro';
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
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192
        }
      };
    } else {
      // Altrimenti è un payload strutturato (per meal planner, shopping list, articoli avanzati etc.)
      console.log('Structured payload for specific generation');
      requestBody = payload;
    }

    console.log(`Calling Gemini API with model: ${selectedModel}...`);
    
    // Funzione helper per tentare la chiamata con un modello specifico
    const tryGeminiCall = async (modelName: string) => {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );
      return response;
    };

    let response;
    let lastError;
    
    // Prova con il modello selezionato e i fallback se necessario
    for (const modelToTry of modelFallbacks) {
      if (modelToTry === selectedModel || (lastError && modelFallbacks.indexOf(modelToTry) > modelFallbacks.indexOf(selectedModel))) {
        try {
          console.log(`Trying model: ${modelToTry}`);
          response = await tryGeminiCall(modelToTry);
          
          if (response.ok) {
            console.log(`Success with model: ${modelToTry}`);
            selectedModel = modelToTry; // Aggiorna il modello utilizzato con successo
            break;
          } else {
            const errorText = await response.text();
            console.warn(`Model ${modelToTry} failed:`, response.status, errorText);
            lastError = new Error(`${modelToTry}: ${response.status} - ${errorText}`);
          }
        } catch (error) {
          console.warn(`Model ${modelToTry} error:`, error);
          lastError = error;
        }
      }
    }

    if (!response || !response.ok) {
      throw lastError || new Error('Tutti i modelli Gemini hanno fallito');
    }

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