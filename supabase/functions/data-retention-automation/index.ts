import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RetentionResult {
  table_name: string;
  records_anonymized: number;
  records_deleted: number;
  status: 'SUCCESS' | 'ERROR';
  error?: string;
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

    const results: RetentionResult[] = [];

    // 1. Anonymize old security audit logs (>90 days)
    const anonymizeDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const deleteDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

    try {
      // Anonymize IP addresses and user agents in old logs
      const { data: anonymizedLogs, error: anonymizeError } = await supabase
        .from('security_audit_log')
        .update({
          ip_address: 'xxx.xxx.xxx.xxx',
          user_agent: 'anonymized',
          event_data: { anonymized: true }
        })
        .lt('created_at', anonymizeDate.toISOString())
        .neq('ip_address', 'xxx.xxx.xxx.xxx')
        .select();

      if (anonymizeError) throw anonymizeError;

      // Delete very old logs (>1 year)
      const { data: deletedLogs, error: deleteError } = await supabase
        .from('security_audit_log')
        .delete()
        .lt('created_at', deleteDate.toISOString())
        .select();

      if (deleteError) throw deleteError;

      results.push({
        table_name: 'security_audit_log',
        records_anonymized: anonymizedLogs?.length || 0,
        records_deleted: deletedLogs?.length || 0,
        status: 'SUCCESS'
      });
    } catch (error) {
      results.push({
        table_name: 'security_audit_log',
        records_anonymized: 0,
        records_deleted: 0,
        status: 'ERROR',
        error: String(error)
      });
    }

    // 2. Clean old blog analytics (anonymize >90 days, delete >1 year)
    try {
      const { data: anonymizedAnalytics, error: anonymizeError } = await supabase
        .from('blog_analytics')
        .update({
          ip_address: 'xxx.xxx.xxx.xxx',
          user_agent: 'anonymized',
          visitor_id: 'anonymized'
        })
        .lt('created_at', anonymizeDate.toISOString())
        .neq('ip_address', 'xxx.xxx.xxx.xxx')
        .select();

      if (anonymizeError) throw anonymizeError;

      const { data: deletedAnalytics, error: deleteError } = await supabase
        .from('blog_analytics')
        .delete()
        .lt('created_at', deleteDate.toISOString())
        .select();

      if (deleteError) throw deleteError;

      results.push({
        table_name: 'blog_analytics',
        records_anonymized: anonymizedAnalytics?.length || 0,
        records_deleted: deletedAnalytics?.length || 0,
        status: 'SUCCESS'
      });
    } catch (error) {
      results.push({
        table_name: 'blog_analytics',
        records_anonymized: 0,
        records_deleted: 0,
        status: 'ERROR',
        error: String(error)
      });
    }

    // 3. Clean visitor analytics
    try {
      const { data: anonymizedVisitors, error: anonymizeError } = await supabase
        .from('visitor_analytics')
        .update({
          ip_address: null,
          visitor_id: 'anonymized'
        })
        .lt('created_at', anonymizeDate.toISOString())
        .not('ip_address', 'is', null)
        .select();

      if (anonymizeError) throw anonymizeError;

      const { data: deletedVisitors, error: deleteError } = await supabase
        .from('visitor_analytics')
        .delete()
        .lt('created_at', deleteDate.toISOString())
        .select();

      if (deleteError) throw deleteError;

      results.push({
        table_name: 'visitor_analytics',
        records_anonymized: anonymizedVisitors?.length || 0,
        records_deleted: deletedVisitors?.length || 0,
        status: 'SUCCESS'
      });
    } catch (error) {
      results.push({
        table_name: 'visitor_analytics',
        records_anonymized: 0,
        records_deleted: 0,
        status: 'ERROR',
        error: String(error)
      });
    }

    // 4. Clean rate limit entries (delete >7 days)
    try {
      const rateLimitDeleteDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const { data: deletedRateLimits, error } = await supabase
        .from('enhanced_rate_limits')
        .delete()
        .lt('created_at', rateLimitDeleteDate.toISOString())
        .select();

      if (error) throw error;

      results.push({
        table_name: 'enhanced_rate_limits',
        records_anonymized: 0,
        records_deleted: deletedRateLimits?.length || 0,
        status: 'SUCCESS'
      });
    } catch (error) {
      results.push({
        table_name: 'enhanced_rate_limits',
        records_anonymized: 0,
        records_deleted: 0,
        status: 'ERROR',
        error: String(error)
      });
    }

    // Log retention execution
    await supabase
      .from('security_audit_log')
      .insert({
        event_type: 'data_retention_executed',
        event_data: {
          timestamp: new Date().toISOString(),
          results,
          total_anonymized: results.reduce((sum, r) => sum + r.records_anonymized, 0),
          total_deleted: results.reduce((sum, r) => sum + r.records_deleted, 0)
        }
      });

    return new Response(JSON.stringify({
      success: true,
      execution_timestamp: new Date().toISOString(),
      results,
      summary: {
        total_tables_processed: results.length,
        total_records_anonymized: results.reduce((sum, r) => sum + r.records_anonymized, 0),
        total_records_deleted: results.reduce((sum, r) => sum + r.records_deleted, 0),
        errors: results.filter(r => r.status === 'ERROR').length
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Data retention automation error:', error);
    return new Response(JSON.stringify({
      error: 'Data retention failed',
      details: String(error?.message || error)
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
