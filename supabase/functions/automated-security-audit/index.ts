import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SecurityCheck {
  check_name: string;
  status: 'PASS' | 'WARN' | 'FAIL';
  details: string;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  remediation?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const checks: SecurityCheck[] = [];

    // 1. Check for suspicious login patterns
    const { data: recentLogins } = await supabase
      .from('security_audit_log')
      .select('ip_address, created_at, event_data')
      .eq('event_type', 'login_failed')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (recentLogins) {
      const ipCounts = recentLogins.reduce((acc: Record<string, number>, log) => {
        if (log.ip_address) {
          acc[log.ip_address] = (acc[log.ip_address] || 0) + 1;
        }
        return acc;
      }, {});

      const suspiciousIPs = Object.entries(ipCounts).filter(([_, count]) => count > 10);
      
      checks.push({
        check_name: 'Suspicious Login Activity',
        status: suspiciousIPs.length > 0 ? 'WARN' : 'PASS',
        details: suspiciousIPs.length > 0 
          ? `Found ${suspiciousIPs.length} IPs with >10 failed login attempts in 24h`
          : 'No suspicious login patterns detected',
        risk_level: suspiciousIPs.length > 0 ? 'MEDIUM' : 'LOW',
        remediation: suspiciousIPs.length > 0 
          ? 'Consider implementing IP-based rate limiting or CAPTCHA'
          : undefined
      });
    }

    // 2. Check rate limiting effectiveness
    const { data: rateLimitData } = await supabase
      .from('enhanced_rate_limits')
      .select('identifier, requests_count, created_at')
      .gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString());

    if (rateLimitData) {
      const blockedRequests = rateLimitData.filter(r => r.requests_count >= 3).length;
      const totalRequests = rateLimitData.length;
      const blockRate = totalRequests > 0 ? (blockedRequests / totalRequests) * 100 : 0;

      checks.push({
        check_name: 'Rate Limiting Effectiveness',
        status: blockRate > 20 ? 'WARN' : 'PASS',
        details: `${blockRate.toFixed(1)}% of requests exceeded rate limits`,
        risk_level: blockRate > 20 ? 'MEDIUM' : 'LOW',
        remediation: blockRate > 20 
          ? 'Consider reducing rate limit thresholds or implementing progressive delays'
          : undefined
      });
    }

    // 3. Check for data exposure risks
    const { data: analyticsData } = await supabase
      .from('blog_analytics')
      .select('ip_address, user_agent')
      .not('ip_address', 'is', null)
      .limit(100);

    if (analyticsData) {
      const uniqueIPs = new Set(analyticsData.map(d => d.ip_address)).size;
      const hasFullIPs = analyticsData.some(d => d.ip_address && !d.ip_address.includes('xxx'));

      checks.push({
        check_name: 'Analytics Data Privacy',
        status: hasFullIPs ? 'WARN' : 'PASS',
        details: hasFullIPs 
          ? `Full IP addresses detected in analytics data (${uniqueIPs} unique IPs)`
          : 'IP addresses properly anonymized in analytics',
        risk_level: hasFullIPs ? 'MEDIUM' : 'LOW',
        remediation: hasFullIPs 
          ? 'Implement IP address anonymization in analytics collection'
          : undefined
      });
    }

    // 4. Check admin action frequency
    const { data: adminActions } = await supabase
      .from('security_audit_log')
      .select('user_id, event_type, created_at')
      .eq('event_type', 'admin_action')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    if (adminActions) {
      const adminActionCount = adminActions.length;
      const isHighActivity = adminActionCount > 50; // More than 50 admin actions per week

      checks.push({
        check_name: 'Admin Activity Monitoring',
        status: isHighActivity ? 'WARN' : 'PASS',
        details: `${adminActionCount} admin actions in the last 7 days`,
        risk_level: isHighActivity ? 'MEDIUM' : 'LOW',
        remediation: isHighActivity 
          ? 'Review admin actions for unusual patterns or potential privilege abuse'
          : undefined
      });
    }

    // 5. Check for old sensitive data
    const { data: oldProfiles } = await supabase
      .from('profiles_sensitive')
      .select('created_at, last_accessed')
      .lt('last_accessed', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString());

    if (oldProfiles) {
      const staleDataCount = oldProfiles.length;

      checks.push({
        check_name: 'Stale Sensitive Data',
        status: staleDataCount > 0 ? 'WARN' : 'PASS',
        details: `${staleDataCount} sensitive profiles not accessed in 90+ days`,
        risk_level: staleDataCount > 10 ? 'MEDIUM' : 'LOW',
        remediation: staleDataCount > 0 
          ? 'Consider data retention policies for inactive user data'
          : undefined
      });
    }

    // Calculate overall security score
    const totalChecks = checks.length;
    const passedChecks = checks.filter(c => c.status === 'PASS').length;
    const securityScore = Math.round((passedChecks / totalChecks) * 100);

    // Log audit completion
    await supabase
      .from('security_audit_log')
      .insert({
        event_type: 'automated_security_audit_completed',
        event_data: {
          total_checks: totalChecks,
          passed_checks: passedChecks,
          security_score: securityScore,
          timestamp: new Date().toISOString()
        }
      });

    return new Response(JSON.stringify({
      success: true,
      audit_timestamp: new Date().toISOString(),
      security_score: securityScore,
      total_checks: totalChecks,
      passed_checks: passedChecks,
      checks: checks.sort((a, b) => {
        const riskOrder = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
        return riskOrder[b.risk_level] - riskOrder[a.risk_level];
      })
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Automated security audit error:', error);
    return new Response(JSON.stringify({
      error: 'Security audit failed',
      details: String(error?.message || error)
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});