import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { urls } = await req.json();
    
    if (!urls || !Array.isArray(urls)) {
      return new Response(JSON.stringify({ error: 'URLs array required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const indexNowPayload = {
      host: 'www.muvfitness.it',
      key: 'muv-fitness-index-key-2024',
      keyLocation: 'https://www.muvfitness.it/indexnow-key.txt',
      urlList: urls
    };

    // Submit to IndexNow (Bing/Yandex)
    const indexNowResponse = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(indexNowPayload)
    });

    // Ping Google sitemap
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent('https://www.muvfitness.it/sitemap.xml')}`;
    fetch(googlePingUrl).catch(() => {}); // Fire and forget

    console.log(`Submitted ${urls.length} URLs to IndexNow`);

    return new Response(JSON.stringify({ 
      success: true, 
      submitted: urls.length,
      indexNowStatus: indexNowResponse.status 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('IndexNow submission error:', error);
    return new Response(JSON.stringify({ 
      error: 'Submission failed',
      details: String(error?.message || error)
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});