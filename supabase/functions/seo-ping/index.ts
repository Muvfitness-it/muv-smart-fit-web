import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { urls = [] } = await req.json();
    const siteUrl = 'https://www.muvfitness.it';
    const results: any[] = [];

    // Google Sitemap Ping
    try {
      const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(siteUrl + '/sitemap.xml')}`;
      const googleResponse = await fetch(googlePingUrl);
      results.push({
        service: 'Google Sitemap Ping',
        status: googleResponse.status,
        success: googleResponse.ok
      });
    } catch (error) {
      results.push({
        service: 'Google Sitemap Ping',
        status: 'error',
        error: error.message,
        success: false
      });
    }

    // IndexNow for Bing (generate key if needed)
    const indexNowKey = Deno.env.get('INDEXNOW_KEY') || generateIndexNowKey();
    
    if (urls.length > 0) {
      try {
        const indexNowPayload = {
          host: 'www.muvfitness.it',
          key: indexNowKey,
          urlList: urls.map((url: string) => 
            url.startsWith('http') ? url : `${siteUrl}${url}`
          )
        };

        const indexNowResponse = await fetch('https://api.indexnow.org/indexnow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(indexNowPayload)
        });

        results.push({
          service: 'IndexNow (Bing)',
          status: indexNowResponse.status,
          success: indexNowResponse.ok || indexNowResponse.status === 202,
          urls: urls.length
        });
      } catch (error) {
        results.push({
          service: 'IndexNow (Bing)',
          status: 'error',
          error: error.message,
          success: false
        });
      }
    } else {
      // Ping homepage
      try {
        const indexNowUrl = `https://api.indexnow.org/IndexNow?url=${encodeURIComponent(siteUrl)}&key=${indexNowKey}`;
        const indexNowResponse = await fetch(indexNowUrl);
        results.push({
          service: 'IndexNow (Bing) - Homepage',
          status: indexNowResponse.status,
          success: indexNowResponse.ok || indexNowResponse.status === 202
        });
      } catch (error) {
        results.push({
          service: 'IndexNow (Bing) - Homepage',
          status: 'error',
          error: error.message,
          success: false
        });
      }
    }

    // Generate IndexNow key file content
    const keyFileContent = indexNowKey;

    return new Response(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString(),
      results,
      indexNowKey,
      keyFileContent,
      instructions: [
        `Create file /public/${indexNowKey}.txt with content: ${indexNowKey}`,
        'This enables IndexNow verification for Bing/Yandex'
      ]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('SEO ping error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

function generateIndexNowKey(): string {
  // Generate a 32-character hexadecimal key
  const chars = '0123456789abcdef';
  let key = '';
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}