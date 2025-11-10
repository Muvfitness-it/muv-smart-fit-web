import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function getYesterday(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

async function queryGSCAnalytics(
  accessToken: string,
  startDate: string,
  endDate: string,
  dimensions: string[] = []
) {
  const siteUrl = 'https://www.googleapis.com/webmasters/v3/sites/https%3A%2F%2Fwww.muvfitness.it%2F/searchAnalytics/query';
  
  const response = await fetch(siteUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startDate,
      endDate,
      dimensions,
      rowLimit: 20,
      aggregationType: 'auto',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GSC API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('📊 Starting GSC Metrics Tracker...');

    // 1. Get GSC access token
    const tokenResponse = await fetch(`${supabaseUrl}/functions/v1/gsc-token-manager`, {
      headers: { 'Authorization': `Bearer ${supabaseServiceKey}` },
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get GSC access token. Authorize GSC first.');
    }

    const { accessToken } = await tokenResponse.json();
    const yesterday = getYesterday();

    console.log(`📅 Fetching metrics for: ${yesterday}`);

    // 2. Fetch site-wide metrics
    const siteMetrics = await queryGSCAnalytics(accessToken, yesterday, yesterday, []);
    
    const siteWideData = {
      impressions: siteMetrics.rows?.[0]?.impressions || 0,
      clicks: siteMetrics.rows?.[0]?.clicks || 0,
      ctr: siteMetrics.rows?.[0]?.ctr ? (siteMetrics.rows[0].ctr * 100) : 0,
      position: siteMetrics.rows?.[0]?.position || 0,
    };

    console.log('✅ Site-wide metrics:', siteWideData);

    // 3. Save site-wide metrics
    await supabase.from('gsc_metrics_history').insert({
      check_date: new Date(yesterday).toISOString(),
      metric_type: 'site',
      url: null,
      impressions: siteWideData.impressions,
      clicks: siteWideData.clicks,
      ctr: siteWideData.ctr,
      position: siteWideData.position,
      period_days: 1,
    });

    // 4. Fetch top pages metrics
    const pagesMetrics = await queryGSCAnalytics(accessToken, yesterday, yesterday, ['page']);
    
    const topPages = (pagesMetrics.rows || []).slice(0, 20).map((row: any) => ({
      check_date: new Date(yesterday).toISOString(),
      metric_type: 'page',
      url: row.keys[0],
      impressions: row.impressions || 0,
      clicks: row.clicks || 0,
      ctr: row.ctr ? (row.ctr * 100) : 0,
      position: row.position || 0,
      period_days: 1,
    }));

    console.log(`✅ Saving ${topPages.length} top pages`);

    // 5. Save top pages metrics
    if (topPages.length > 0) {
      await supabase.from('gsc_metrics_history').insert(topPages);
    }

    // 6. Return summary
    return new Response(
      JSON.stringify({
        success: true,
        date: yesterday,
        siteMetrics: siteWideData,
        topPagesCount: topPages.length,
        message: `✅ Tracked ${topPages.length} pages for ${yesterday}`,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('❌ GSC Metrics Tracker error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
