import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting for security
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute  
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 auth attempts per minute per IP
const BRUTE_FORCE_WINDOW = 15 * 60 * 1000; // 15 minutes
const BRUTE_FORCE_MAX_ATTEMPTS = 10; // 10 failed attempts triggers longer lockout
const bruteForceMap = new Map<string, { failedAttempts: number, lockedUntil: number }>();

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

const checkBruteForce = (ip: string): boolean => {
  const now = Date.now();
  const bruteForceData = bruteForceMap.get(ip) || { failedAttempts: 0, lockedUntil: 0 };
  
  if (bruteForceData.lockedUntil > now) {
    return false; // Still locked
  }
  
  return true;
};

const recordFailedAttempt = (ip: string): void => {
  const now = Date.now();
  const bruteForceData = bruteForceMap.get(ip) || { failedAttempts: 0, lockedUntil: 0 };
  
  bruteForceData.failedAttempts++;
  
  if (bruteForceData.failedAttempts >= BRUTE_FORCE_MAX_ATTEMPTS) {
    bruteForceData.lockedUntil = now + BRUTE_FORCE_WINDOW;
    bruteForceData.failedAttempts = 0; // Reset counter
  }
  
  bruteForceMap.set(ip, bruteForceData);
};

const clearFailedAttempts = (ip: string): void => {
  bruteForceMap.delete(ip);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';
  
  try {
    // Rate limiting check
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

    // Brute force protection
    if (!checkBruteForce(clientIP)) {
      console.warn(`Brute force protection triggered for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Account temporaneamente bloccato per sicurezza.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const { email, password, ai_key } = await req.json()
    
    // Enhanced validation
    if (!email || !password || !ai_key) {
      recordFailedAttempt(clientIP);
      return new Response(
        JSON.stringify({ error: 'Credenziali incomplete' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      recordFailedAttempt(clientIP);
      return new Response(
        JSON.stringify({ error: 'Formato email non valido' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Validate AI key format and length
    if (ai_key.length < 16 || !/^[a-zA-Z0-9_\-\.]+$/.test(ai_key)) {
      recordFailedAttempt(clientIP);
      return new Response(
        JSON.stringify({ error: 'Chiave AI non valida' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('AI Auth attempt:', { 
      email: email.replace(/(.{2})(.*)(@.*)/, '$1***$3'), 
      ip: clientIP,
      timestamp: new Date().toISOString()
    });

    // Verify AI key with timing-safe comparison
    const validAiKey = Deno.env.get('AI_ACCESS_KEY');
    if (!validAiKey) {
      console.error('AI_ACCESS_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Configurazione del server non valida' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Timing-safe comparison to prevent timing attacks
    const keyMatch = ai_key.length === validAiKey.length && 
      crypto.subtle.timingSafeEqual(
        new TextEncoder().encode(ai_key),
        new TextEncoder().encode(validAiKey)
      );

    if (!keyMatch) {
      recordFailedAttempt(clientIP);
      console.warn('Invalid AI key provided', { ip: clientIP });
      return new Response(
        JSON.stringify({ error: 'Accesso AI non autorizzato' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Authenticate user
    const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password
    })

    if (authError || !authData.user) {
      recordFailedAttempt(clientIP);
      console.warn('Authentication failed:', { 
        error: authError?.message, 
        email: email.replace(/(.{2})(.*)(@.*)/, '$1***$3'), 
        ip: clientIP 
      });
      return new Response(
        JSON.stringify({ error: 'Credenziali non valide' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check user roles
    const { data: userRoles, error: rolesError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', authData.user.id)

    if (rolesError) {
      console.error('Error checking user roles:', { error: rolesError.message, userId: authData.user.id });
      return new Response(
        JSON.stringify({ error: 'Errore nella verifica dei permessi' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const roles = userRoles?.map(r => r.role) || []
    const isAdmin = roles.includes('admin')
    const isEditor = roles.includes('editor')
    const canManageBlog = isAdmin || isEditor

    if (!canManageBlog) {
      recordFailedAttempt(clientIP);
      console.warn('User lacks blog management permissions', { 
        userId: authData.user.id, 
        email: authData.user.email,
        roles,
        ip: clientIP
      });
      return new Response(
        JSON.stringify({ error: 'Permessi insufficienti per la gestione del blog' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate secure AI token
    const aiToken = crypto.randomUUID() + '-' + Date.now().toString(36);
    const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 hours (reduced from 24)

    // Store token securely
    const { error: tokenError } = await supabaseAdmin
      .from('ai_tokens')
      .insert({
        token: aiToken,
        user_id: authData.user.id,
        expires_at: expiresAt.toISOString(),
        created_for: 'blog_management'
      })

    if (tokenError) {
      console.error('Error creating AI token:', { error: tokenError.message, userId: authData.user.id });
      return new Response(
        JSON.stringify({ error: 'Errore nella creazione del token di accesso' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clear failed attempts on successful auth
    clearFailedAttempts(clientIP);

    console.log('AI authentication successful', { 
      userId: authData.user.id,
      email: authData.user.email,
      roles,
      ip: clientIP
    });

    // SECURITY FIX: Don't return access_token in response
    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: authData.user.id,
          email: authData.user.email,
          roles: roles,
          isAdmin,
          isEditor,
          canManageBlog
        },
        ai_token: aiToken,
        expires_at: expiresAt.toISOString()
        // REMOVED: access_token (security risk)
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    recordFailedAttempt(clientIP);
    console.error('AI Auth error:', { error: error.message, ip: clientIP });
    return new Response(
      JSON.stringify({ error: 'Errore interno del server' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
})