import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BlogAnalyticsEvent {
  post_id?: string;
  page_path: string;
  event_type: 'view' | 'exit' | 'search' | 'interaction';
  visitor_id: string;
  session_id?: string;
  search_query?: string;
  search_prompt?: string;
  time_on_page?: number;
  scroll_depth?: number;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  interactions?: any[];
}

function getClientIP(request: Request): string {
  return request.headers.get('x-forwarded-for') ||
         request.headers.get('x-real-ip') ||
         request.headers.get('cf-connecting-ip') ||
         '0.0.0.0';
}

function parseUserAgent(userAgent: string | null) {
  if (!userAgent) return { device_type: 'unknown', browser: 'unknown' };
  
  const mobile = /Mobile|Android|iPhone|iPad/i.test(userAgent);
  const tablet = /iPad|Android.*(?!Mobile)/i.test(userAgent);
  
  let device_type = 'desktop';
  if (tablet) device_type = 'tablet';
  else if (mobile) device_type = 'mobile';
  
  let browser = 'unknown';
  if (userAgent.includes('Chrome')) browser = 'chrome';
  else if (userAgent.includes('Firefox')) browser = 'firefox';
  else if (userAgent.includes('Safari')) browser = 'safari';
  else if (userAgent.includes('Edge')) browser = 'edge';
  
  return { device_type, browser };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const clientIP = getClientIP(req);
    const userAgent = req.headers.get('user-agent');
    const { device_type, browser } = parseUserAgent(userAgent);
    
    const body: BlogAnalyticsEvent = await req.json();
    
    // Validate required fields
    if (!body.visitor_id || !body.page_path || !body.event_type) {
      return new Response('Missing required fields', { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    // Handle different event types
    if (body.event_type === 'search') {
      // Track search queries
      const { error: searchError } = await supabase
        .from('blog_search_analytics')
        .insert({
          search_query: body.search_query,
          search_prompt: body.search_prompt,
          visitor_id: body.visitor_id,
          session_id: body.session_id,
          ip_address: clientIP,
          user_agent: userAgent
        });

      if (searchError) {
        console.error('Error tracking search:', searchError);
      }
    }

    // Track page analytics for all events
    const analyticsData = {
      post_id: body.post_id || null,
      visitor_id: body.visitor_id,
      session_id: body.session_id,
      page_path: body.page_path,
      referrer: body.referrer,
      search_query: body.search_query,
      search_prompt: body.search_prompt,
      ip_address: clientIP,
      user_agent: userAgent,
      time_on_page: body.time_on_page || 0,
      scroll_depth: body.scroll_depth || 0,
      interactions: body.interactions || [],
      utm_source: body.utm_source,
      utm_medium: body.utm_medium,
      utm_campaign: body.utm_campaign,
      device_type,
      browser,
      entry_time: body.event_type === 'view' ? new Date().toISOString() : undefined,
      exit_time: body.event_type === 'exit' ? new Date().toISOString() : undefined
    };

    // Handle view vs exit events
    if (body.event_type === 'view') {
      // Insert new view
      const { error } = await supabase
        .from('blog_analytics')
        .insert(analyticsData);

      if (error) {
        console.error('Error tracking view:', error);
        return new Response('Error tracking view', { 
          status: 500, 
          headers: corsHeaders 
        });
      }
    } else if (body.event_type === 'exit') {
      // Update existing record with exit data
      const { error } = await supabase
        .from('blog_analytics')
        .update({
          exit_time: new Date().toISOString(),
          time_on_page: body.time_on_page || 0,
          scroll_depth: body.scroll_depth || 0,
          interactions: body.interactions || []
        })
        .eq('visitor_id', body.visitor_id)
        .eq('session_id', body.session_id)
        .eq('page_path', body.page_path)
        .is('exit_time', null);

      if (error) {
        console.error('Error updating exit data:', error);
      }
    }

    // Update blog performance summary in background
    try {
      await supabase.rpc('update_blog_performance_summary');
      console.log('Blog performance summary updated');
    } catch (updateError) {
      console.error('Error updating blog performance summary:', updateError);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in blog analytics:', error);
    return new Response('Internal server error', { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});