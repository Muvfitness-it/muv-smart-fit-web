import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Enhanced IP extraction function
function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfIP = request.headers.get('cf-connecting-ip');
  
  // Try various IP headers in order of preference
  return cfIP || realIP || forwarded?.split(',')[0]?.trim() || 'unknown';
}

// Database-backed rate limiting
async function checkRateLimit(identifier: string, supabase: any): Promise<boolean> {
  const windowStart = new Date();
  windowStart.setMinutes(windowStart.getMinutes() - 5); // 5 minute window
  
  try {
    // Check current rate limit
    const { data: rateLimitData, error: rateLimitError } = await supabase
      .from('secure_rate_limits')
      .select('requests_count, window_start')
      .eq('identifier', identifier)
      .eq('endpoint', 'log-visit-public')
      .gte('window_start', windowStart.toISOString())
      .single();

    if (rateLimitError && rateLimitError.code !== 'PGRST116') {
      console.error('Rate limit check error:', rateLimitError);
      return false;
    }

    if (rateLimitData) {
      if (rateLimitData.requests_count >= 60) { // 60 requests per 5 minutes
        console.warn(`Rate limit exceeded for ${identifier}`);
        return false;
      }
      
      // Update existing rate limit record
      await supabase
        .from('secure_rate_limits')
        .update({ 
          requests_count: rateLimitData.requests_count + 1,
          updated_at: new Date().toISOString()
        })
        .eq('identifier', identifier)
        .eq('endpoint', 'log-visit-public');
    } else {
      // Create new rate limit record
      await supabase
        .from('secure_rate_limits')
        .insert({
          identifier,
          endpoint: 'log-visit-public',
          requests_count: 1,
          window_start: new Date().toISOString()
        });
    }
    
    return true;
  } catch (error) {
    console.error('Rate limiting error:', error);
    return false;
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(req);
    
    // Initialize Supabase client with service role key
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check rate limit
    const rateLimitPassed = await checkRateLimit(clientIP, supabase);
    if (!rateLimitPassed) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse request body
    const body = await req.text();
    let parsedBody;
    
    try {
      parsedBody = JSON.parse(body);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { pagePath, actionType, calories, planType } = parsedBody;

    // Log site visit
    if (pagePath) {
      const { error: visitError } = await supabase
        .from('site_visits')
        .insert({
          page_path: pagePath,
          ip_address: clientIP,
          user_agent: req.headers.get('user-agent'),
          referrer: req.headers.get('referer')
        });

      if (visitError) {
        console.error('Site visit logging error:', visitError);
      }
    }

    // Log planner usage if actionType is provided
    if (actionType) {
      const { error: plannerError } = await supabase
        .from('planner_usage')
        .insert({
          action_type: actionType,
          calories: calories || null,
          plan_type: planType || null,
          ip_address: clientIP,
          user_agent: req.headers.get('user-agent')
        });

      if (plannerError) {
        console.error('Planner usage logging error:', plannerError);
      }
    }

    // Update analytics summary
    const { error: analyticsError } = await supabase.rpc('update_analytics_summary');
    if (analyticsError) {
      console.error('Analytics summary update error:', analyticsError);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});