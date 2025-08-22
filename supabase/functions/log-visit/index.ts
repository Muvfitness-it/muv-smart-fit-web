import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://www.muvfitness.it',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// Rate limiting storage
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);
  
  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(identifier, { count: 1, windowStart: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  record.count++;
  return true;
}

// HMAC validation
async function validateHmac(body: string, signature: string): Promise<boolean> {
  try {
    const key = Deno.env.get('AI_ACCESS_KEY');
    if (!key || !signature) return false;
    
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const bodyData = encoder.encode(body);
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const expectedSignature = await crypto.subtle.sign('HMAC', cryptoKey, bodyData);
    const expectedHex = Array.from(new Uint8Array(expectedSignature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    const providedHex = signature.replace('sha256=', '');
    return expectedHex === providedHex;
  } catch (error) {
    console.error('HMAC validation error:', error);
    return false;
  }
}

function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
         req.headers.get('x-real-ip') ||
         req.headers.get('cf-connecting-ip') ||
         'unknown';
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const clientIP = getClientIP(req);
    
    // Rate limiting
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const body = await req.text();
    const signature = req.headers.get('x-signature');
    
    // Validate HMAC if signature is provided
    if (signature && !(await validateHmac(body, signature))) {
      console.warn(`Invalid HMAC signature from IP: ${clientIP}`);
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const data = JSON.parse(body);
    const { pagePath, actionType, calories, planType } = data;

    if (!pagePath) {
      return new Response(JSON.stringify({ error: 'Missing pagePath' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Initialize Supabase client with service role
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Log site visit
    if (pagePath) {
      const { error: visitError } = await supabase.from('site_visits').insert({
        page_path: pagePath,
        user_agent: req.headers.get('user-agent'),
        ip_address: clientIP,
        referrer: req.headers.get('referer') || null
      });

      if (visitError) {
        console.error('Error inserting site visit:', visitError);
      }
    }

    // Log planner usage if provided  
    if (actionType) {
      const { error: usageError } = await supabase.from('planner_usage').insert({
        action_type: actionType,
        calories: calories || null,
        plan_type: planType || null,
        ip_address: clientIP,
        user_agent: req.headers.get('user-agent')
      });

      if (usageError) {
        console.error('Error inserting planner usage:', usageError);
      }
    }

    // Update analytics summary
    const { error: updateError } = await supabase.rpc('update_analytics_summary');
    if (updateError) {
      console.error('Error updating analytics summary:', updateError);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in log-visit function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});