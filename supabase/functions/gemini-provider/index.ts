import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting and security
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute per IP

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

const validatePayload = (payload: any): string | null => {
  if (typeof payload === 'string') {
    if (payload.length > 50000) {
      return 'Prompt troppo lungo (max 50000 caratteri)';
    }
    if (payload.trim().length === 0) {
      return 'Prompt vuoto non consentito';
    }
  } else if (typeof payload === 'object') {
    const payloadStr = JSON.stringify(payload);
    if (payloadStr.length > 100000) {
      return 'Payload troppo grande (max 100KB)';
    }
  } else {
    return 'Formato payload non valido';
  }
  return null;
};

serve(async (req) => {
  console.log('Gemini Provider function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';

  try {
    // Rate limiting
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Troppe richieste. Riprova tra qualche minuto.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { payload, model, ai_token } = await req.json();
    
    // AI TOKEN AUTHENTICATION - CRITICAL SECURITY
    if (!ai_token) {
      console.warn('Unauthorized access attempt - missing AI token', { ip: clientIP });
      return new Response(
        JSON.stringify({ error: 'Accesso non autorizzato - token AI richiesto' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Verify AI token using database function
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    const { data: tokenValidation, error: tokenError } = await supabase
      .rpc('verify_ai_token_access', { token_input: ai_token });
    
    if (tokenError || !tokenValidation?.[0]?.valid || !tokenValidation?.[0]?.can_use_ai) {
      console.warn('Invalid AI token provided', { ip: clientIP, tokenError });
      return new Response(
        JSON.stringify({ error: 'Token AI non valido o scaduto' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    console.log('AI token validated successfully', { 
      userId: tokenValidation[0].user_id, 
      isAdmin: tokenValidation[0].is_admin 
    });
    
    // Validate payload
    const validationError = validatePayload(payload);
    if (validationError) {
      console.warn(`Payload validation failed: ${validationError}`, { ip: clientIP });
      return new Response(
        JSON.stringify({ error: validationError }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Processing request:', { 
      payloadType: typeof payload, 
      model: model || 'default',
      ip: clientIP,
      timestamp: new Date().toISOString()
    });
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    
    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY not found');
      return new Response(
        JSON.stringify({ error: 'Configurazione API non valida' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Model selection with security validation
    let selectedModel = model || 'gemini-2.5-pro';
    
    const allowedModels = [
      'gemini-2.5-pro',
      'gemini-2.0-pro', 
      'gemini-1.5-pro',
      'gemini-1.5-flash'
    ];
    
    if (!allowedModels.includes(selectedModel)) {
      console.warn(`Invalid model requested: ${selectedModel}`, { ip: clientIP });
      selectedModel = 'gemini-2.5-pro';
    }

    let requestBody;
    
    // Process payload based on type
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
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };
    } else {
      console.log('Structured payload for specific generation');
      requestBody = payload;
      
      // Add safety settings to structured payloads too
      if (!requestBody.safetySettings) {
        requestBody.safetySettings = [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ];
      }
    }

    console.log(`Calling Gemini API with model: ${selectedModel}...`);
    
    // Enhanced API call with timeout and retry logic
    const callGeminiWithTimeout = async (modelName: string, timeoutMs: number = 30000) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
            signal: controller.signal
          }
        );
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    };

    let response;
    let lastError;
    
    // Try with selected model and fallbacks
    const modelFallbacks = allowedModels;
    
    for (const modelToTry of modelFallbacks) {
      if (modelToTry === selectedModel || (lastError && modelFallbacks.indexOf(modelToTry) > modelFallbacks.indexOf(selectedModel))) {
        try {
          console.log(`Trying model: ${modelToTry}`);
          response = await callGeminiWithTimeout(modelToTry);
          
          if (response.ok) {
            console.log(`Success with model: ${modelToTry}`);
            selectedModel = modelToTry;
            break;
          } else {
            const errorText = await response.text();
            console.warn(`Model ${modelToTry} failed:`, response.status, errorText.substring(0, 200));
            lastError = new Error(`${modelToTry}: ${response.status} - ${errorText.substring(0, 100)}`);
          }
        } catch (error) {
          console.warn(`Model ${modelToTry} error:`, error.message);
          lastError = error;
        }
      }
    }

    if (!response || !response.ok) {
      console.error('All Gemini models failed:', lastError?.message);
      throw lastError || new Error('Tutti i modelli Gemini non disponibili');
    }

    const data = await response.json();
    console.log('Gemini API response received successfully');

    // Check for safety blocks
    if (data.candidates?.[0]?.finishReason === 'SAFETY') {
      console.warn('Content blocked by safety filters', { ip: clientIP });
      return new Response(
        JSON.stringify({ error: 'Contenuto bloccato dai filtri di sicurezza' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // For simple prompts (blog), return content directly
    if (typeof payload === 'string') {
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!content) {
        throw new Error('Nessun contenuto generato da Gemini');
      }
      return new Response(JSON.stringify({ content }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // For structured payloads, return full response
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in gemini-provider function:', { 
      error: error.message, 
      ip: clientIP,
      timestamp: new Date().toISOString()
    });
    
    let errorMessage = 'Errore nella comunicazione con Gemini';
    if (error.message?.includes('API key') || error.message?.includes('401')) {
      errorMessage = 'Chiave API di Gemini non configurata correttamente';
    } else if (error.message?.includes('quota') || error.message?.includes('limit') || error.message?.includes('429')) {
      errorMessage = 'Quota API di Gemini esaurita o limite raggiunto';
    } else if (error.message?.includes('blocked') || error.message?.includes('SAFETY')) {
      errorMessage = 'Contenuto bloccato dai filtri di sicurezza di Gemini';
    } else if (error.name === 'AbortError') {
      errorMessage = 'Timeout nella richiesta a Gemini';
    }
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});