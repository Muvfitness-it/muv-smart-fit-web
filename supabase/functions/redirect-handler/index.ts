import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const url = new URL(req.url);
    const path = url.pathname;

    // Check for redirects in database
    const { data: redirect } = await supabase
      .from('url_redirects')
      .select('to_path, status_code')
      .eq('from_path', path)
      .maybeSingle();

    if (redirect?.to_path) {
      return new Response(null, {
        status: redirect.status_code || 301,
        headers: {
          ...corsHeaders,
          'Location': redirect.to_path,
          'Cache-Control': 'public, max-age=86400'
        }
      });
    }

    // If no redirect found, return 404
    return new Response(JSON.stringify({ 
      error: 'Not found',
      message: `No redirect found for ${path}` 
    }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Redirect handler error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal error',
      details: String(error?.message || error)
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});