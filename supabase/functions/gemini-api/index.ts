
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Security-Policy': "default-src 'self'; script-src 'none'; object-src 'none';",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;

function getRateLimitKey(req: Request): string {
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const authorization = req.headers.get('authorization') || 'anonymous';
  return `${userAgent}-${authorization}`.substring(0, 50);
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const rateLimitData = rateLimitMap.get(key);
  
  if (!rateLimitData || now > rateLimitData.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  
  if (rateLimitData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  
  rateLimitData.count++;
  return false;
}

function sanitizeText(text: string): string {
  if (!text || typeof text !== 'string') return '';
  
  // Remove any potentially dangerous content
  return text
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .substring(0, 10000); // Limit response length
}

function validatePayload(payload: any): boolean {
  if (!payload || typeof payload !== 'object') return false;
  if (!payload.contents || !Array.isArray(payload.contents)) return false;
  
  // Check for reasonable payload size
  const payloadString = JSON.stringify(payload);
  if (payloadString.length > 50000) return false; // 50KB limit
  
  return true;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(req);
    if (isRateLimited(rateLimitKey)) {
      console.warn(`Rate limit exceeded for key: ${rateLimitKey}`);
      return new Response(JSON.stringify({ error: 'Rate limit exceeded. Try again later.' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const requestBody = await req.json();
    const { payload } = requestBody;
    
    // Validate payload
    if (!validatePayload(payload)) {
      console.error('Invalid payload structure');
      return new Response(JSON.stringify({ error: 'Payload non valido' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured');
      throw new Error('Chiave API Gemini non configurata');
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    console.log('Calling Gemini API with validated payload');
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Gemini API Error Response:", errorBody);
      throw new Error(`Errore API Gemini: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    // Sanitize the response content
    if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
      result.candidates[0].content.parts[0].text = sanitizeText(result.candidates[0].content.parts[0].text);
    }
    
    console.log('Gemini API response received and sanitized successfully');
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in gemini-api function:', error);
    return new Response(JSON.stringify({ error: error.message || 'Errore interno del server' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
