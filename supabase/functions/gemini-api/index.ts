
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
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not found');
      throw new Error('API key di OpenAI non configurata');
    }

    console.log('Calling OpenAI API with payload:', typeof payload === 'string' ? payload.substring(0, 200) + '...' : payload);

    // Converti il payload in formato OpenAI
    let messages;
    if (typeof payload === 'string') {
      messages = [
        { role: 'system', content: 'Sei un esperto scrittore di contenuti per blog di fitness. Rispondi sempre in italiano con contenuti professionali e ottimizzati SEO.' },
        { role: 'user', content: payload }
      ];
    } else {
      // Se il payload ha già il formato OpenAI, usalo direttamente
      messages = payload.messages || [
        { role: 'system', content: 'Sei un esperto scrittore di contenuti per blog di fitness. Rispondi sempre in italiano con contenuti professionali e ottimizzati SEO.' },
        { role: 'user', content: payload.prompt || JSON.stringify(payload) }
      ];
    }

    const requestBody = {
      model: 'gpt-4o-mini',
      messages: messages,
      max_tokens: 4000,
      temperature: 0.7
    };

    console.log('OpenAI API request:', JSON.stringify({ model: requestBody.model, messages_count: requestBody.messages.length }));

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`Errore API OpenAI: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI API response received, tokens used:', data.usage);

    // Estrai il testo dalla risposta di OpenAI
    const generatedText = data?.choices?.[0]?.message?.content;
    if (!generatedText) {
      throw new Error('Nessun contenuto generato dall\'API di OpenAI');
    }

    return new Response(JSON.stringify({ content: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in openai-api function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Errore nella chiamata all\'API di OpenAI. Verifica la configurazione dell\'API key.'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
