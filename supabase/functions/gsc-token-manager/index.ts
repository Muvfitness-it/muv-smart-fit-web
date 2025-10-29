import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory cache for access token (valid for 55 minutes)
let tokenCache: { token: string; expiresAt: number } | null = null;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check cache first
    if (tokenCache && tokenCache.expiresAt > Date.now()) {
      console.log('✅ Returning cached access token');
      return new Response(
        JSON.stringify({ 
          success: true, 
          accessToken: tokenCache.token,
          fromCache: true 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Retrieve refresh token from database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data, error } = await supabase
      .from('gsc_oauth_tokens')
      .select('refresh_token')
      .eq('id', 1)
      .single();

    if (error || !data?.refresh_token) {
      throw new Error('No refresh token found. Please authorize Google Search Console first.');
    }

    const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
    const clientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');

    console.log('🔄 Refreshing access token...');

    // Request new access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId!,
        client_secret: clientSecret!,
        refresh_token: data.refresh_token,
        grant_type: 'refresh_token',
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token refresh failed:', errorText);
      throw new Error(`Token refresh failed: ${errorText}`);
    }

    const tokens = await tokenResponse.json();
    console.log('✅ New access token obtained, expires in:', tokens.expires_in);

    // Cache token for 55 minutes (tokens are valid for 60 minutes)
    tokenCache = {
      token: tokens.access_token,
      expiresAt: Date.now() + (55 * 60 * 1000),
    };

    return new Response(
      JSON.stringify({ 
        success: true, 
        accessToken: tokens.access_token,
        fromCache: false,
        expiresIn: tokens.expires_in 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Token manager error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        needsAuth: error.message.includes('No refresh token') 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.message.includes('No refresh token') ? 401 : 500 
      }
    );
  }
});
