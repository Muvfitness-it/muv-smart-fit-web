import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SecurityAuditEvent {
  event_type: string;
  event_data?: Record<string, any>;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseServiceKey) {
      throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      supabaseServiceKey
    );

    const body: SecurityAuditEvent = await req.json();
    
    // Validate required fields
    if (!body.event_type) {
      return new Response(
        JSON.stringify({ error: 'event_type is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Sanitize event_type
    const sanitizedEventType = body.event_type.replace(/[^a-zA-Z0-9_\-]/g, '');
    if (sanitizedEventType !== body.event_type) {
      return new Response(
        JSON.stringify({ error: 'Invalid event type format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Validate event_type length
    if (body.event_type.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Event type too long' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Derive IP and User-Agent from request headers (ignore client-provided values)
    const forwardedFor = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
    const ip_address = forwardedFor.split(',')[0]?.trim() || undefined;
    const user_agent = req.headers.get('user-agent') || undefined;

    // Try to associate event to an authenticated user (if a Bearer token is present)
    const authHeader = req.headers.get('authorization') || req.headers.get('Authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : undefined;
    let user_id: string | undefined = undefined;
    if (token) {
      const { data: userResp } = await supabase.auth.getUser(token);
      if (userResp?.user?.id) {
        user_id = userResp.user.id;
      }
    }

    // Use the new PII-safe logging function
    const { error } = await supabase.rpc('log_security_event_pii_safe', {
      event_type_param: body.event_type,
      event_data_param: body.event_data || {},
      ip_param: ip_address,
      user_agent_param: user_agent
    });

    if (error) {
      console.error('Error logging security event:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to log security event' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Check for suspicious patterns and alert if needed
    if (body.event_type === 'login_failed' && ip_address) {
      // Check for multiple failed attempts from same IP
      const { data: recentFailures } = await supabase
        .from('security_audit_log')
        .select('id')
        .eq('event_type', 'login_failed')
        .eq('ip_address', ip_address)
        .gte('created_at', new Date(Date.now() - 15 * 60 * 1000).toISOString()); // Last 15 minutes

      if (recentFailures && recentFailures.length >= 5) {
        console.warn(`Multiple failed login attempts detected from IP: ${ip_address}`);
        // Optional: add throttling or notifications here
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Security audit error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});