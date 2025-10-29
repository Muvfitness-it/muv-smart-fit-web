import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      return new Response(
        `<html><body><h1>Autorizzazione Fallita</h1><p>Errore: ${error}</p></body></html>`,
        { headers: { 'Content-Type': 'text/html' }, status: 400 }
      );
    }

    if (!code) {
      throw new Error('No authorization code received');
    }

    const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
    const clientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');
    const redirectUri = `${Deno.env.get('SUPABASE_URL')}/functions/v1/gsc-oauth-callback`;

    console.log('Exchanging code for tokens...');

    // Exchange authorization code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId!,
        client_secret: clientSecret!,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token exchange failed:', errorText);
      throw new Error(`Token exchange failed: ${errorText}`);
    }

    const tokens = await tokenResponse.json();
    console.log('Tokens received:', { 
      has_refresh_token: !!tokens.refresh_token,
      expires_in: tokens.expires_in 
    });

    if (!tokens.refresh_token) {
      throw new Error('No refresh token received. User may need to revoke access and try again.');
    }

    // Save refresh token to Supabase vault
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Store in a dedicated table for persistence
    const { error: insertError } = await supabase
      .from('gsc_oauth_tokens')
      .upsert({
        id: 1, // Single row for the whole system
        refresh_token: tokens.refresh_token,
        updated_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error('Failed to save refresh token:', insertError);
      throw new Error(`Failed to save token: ${insertError.message}`);
    }

    console.log('✅ Refresh token saved successfully');

    // Success page with auto-close
    return new Response(
      `<html>
        <head>
          <style>
            body { 
              font-family: system-ui; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              min-height: 100vh; 
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .container {
              text-align: center;
              background: rgba(255,255,255,0.1);
              padding: 3rem;
              border-radius: 20px;
              backdrop-filter: blur(10px);
              box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            }
            h1 { font-size: 2.5rem; margin-bottom: 1rem; }
            .icon { font-size: 4rem; margin-bottom: 1rem; }
            p { font-size: 1.2rem; opacity: 0.9; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">✅</div>
            <h1>Autorizzazione Completata!</h1>
            <p>Google Search Console è stato collegato con successo.</p>
            <p style="margin-top: 2rem; font-size: 0.9rem;">Questa finestra si chiuderà automaticamente...</p>
          </div>
          <script>
            setTimeout(() => {
              window.close();
              if (!window.closed) {
                window.location.href = 'https://www.muvfitness.it/admin/seo-monitor';
              }
            }, 3000);
          </script>
        </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html' }, status: 200 }
    );

  } catch (error) {
    console.error('OAuth callback error:', error);
    return new Response(
      `<html><body style="font-family: system-ui; padding: 2rem;">
        <h1>❌ Errore Autorizzazione</h1>
        <p>${error.message}</p>
        <a href="https://www.muvfitness.it/admin/seo-monitor">Torna al Dashboard</a>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' }, status: 500 }
    );
  }
});
