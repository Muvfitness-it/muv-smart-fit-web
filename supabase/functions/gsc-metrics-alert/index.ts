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

function getSevenDaysAgo(): string {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 8);
  return sevenDaysAgo.toISOString().split('T')[0];
}

function calculateChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

function getSeverity(change: number, metricType: string): string | null {
  const thresholds: Record<string, { warning: number; critical: number }> = {
    impressions: { warning: -30, critical: -50 },
    clicks: { warning: -30, critical: -50 },
    ctr: { warning: -20, critical: -40 },
    indexed: { warning: -10, critical: -25 },
  };

  const threshold = thresholds[metricType];
  if (!threshold) return null;

  if (change <= threshold.critical) return 'critical';
  if (change <= threshold.warning) return 'warning';
  return null;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('🚨 Starting GSC Alert Checker...');

    const yesterday = getYesterday();
    const sevenDaysAgo = getSevenDaysAgo();

    // 1. Fetch metrics yesterday
    const { data: metricsYesterday } = await supabase
      .from('gsc_metrics_history')
      .select('*')
      .eq('metric_type', 'site')
      .gte('check_date', `${yesterday}T00:00:00`)
      .lte('check_date', `${yesterday}T23:59:59`)
      .single();

    // 2. Fetch metrics 7 days ago
    const { data: metrics7DaysAgo } = await supabase
      .from('gsc_metrics_history')
      .select('*')
      .eq('metric_type', 'site')
      .gte('check_date', `${sevenDaysAgo}T00:00:00`)
      .lte('check_date', `${sevenDaysAgo}T23:59:59`)
      .single();

    if (!metricsYesterday || !metrics7DaysAgo) {
      console.log('⚠️ Insufficient data for comparison');
      return new Response(
        JSON.stringify({ 
          success: true, 
          alertsTriggered: 0,
          message: '⚠️ Insufficient data for comparison (need at least 8 days of data)'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // 3. Calculate changes
    const alerts: any[] = [];
    const checks = [
      { name: 'impressions', current: metricsYesterday.impressions, previous: metrics7DaysAgo.impressions, label: 'Impression' },
      { name: 'clicks', current: metricsYesterday.clicks, previous: metrics7DaysAgo.clicks, label: 'Click' },
      { name: 'ctr', current: metricsYesterday.ctr, previous: metrics7DaysAgo.ctr, label: 'CTR' },
    ];

    for (const check of checks) {
      const change = calculateChange(check.current, check.previous);
      const severity = getSeverity(change, check.name);

      if (severity) {
        const alert = {
          alert_date: new Date().toISOString(),
          alert_type: `${check.name}_drop`,
          severity,
          metric_name: check.label,
          current_value: check.current,
          previous_value: check.previous,
          change_percentage: change,
          alert_message: `${check.label} ${severity === 'critical' ? '🔴 CRITICO' : '🟡 ATTENZIONE'}: calo del ${Math.abs(change).toFixed(1)}% rispetto a 7 giorni fa (${check.previous.toFixed(2)} → ${check.current.toFixed(2)})`,
        };
        alerts.push(alert);
        console.log('🚨 Alert:', alert.alert_message);
      }
    }

    // 4. Check indexed pages drop
    const { data: summaryToday } = await supabase
      .from('seo_monitoring_summary')
      .select('metric_value')
      .eq('metric_name', 'indexed_articles')
      .order('last_check', { ascending: false })
      .limit(1)
      .single();

    const { data: summary7DaysAgo } = await supabase
      .from('seo_monitoring_summary')
      .select('metric_value')
      .eq('metric_name', 'indexed_articles')
      .lte('last_check', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order('last_check', { ascending: false })
      .limit(1)
      .single();

    if (summaryToday && summary7DaysAgo) {
      const indexedChange = calculateChange(
        parseFloat(summaryToday.metric_value), 
        parseFloat(summary7DaysAgo.metric_value)
      );
      const indexedSeverity = getSeverity(indexedChange, 'indexed');

      if (indexedSeverity) {
        alerts.push({
          alert_date: new Date().toISOString(),
          alert_type: 'indexed_drop',
          severity: indexedSeverity,
          metric_name: 'Pagine Indicizzate',
          current_value: parseFloat(summaryToday.metric_value),
          previous_value: parseFloat(summary7DaysAgo.metric_value),
          change_percentage: indexedChange,
          alert_message: `Pagine Indicizzate ${indexedSeverity === 'critical' ? '🔴 CRITICO' : '🟡 ATTENZIONE'}: calo del ${Math.abs(indexedChange).toFixed(1)}%`,
        });
      }
    }

    // 5. Save alerts
    if (alerts.length > 0) {
      const { data: savedAlerts } = await supabase.from('gsc_alert_history').insert(alerts).select();
      console.log(`✅ Saved ${alerts.length} alerts`);

      // 6. Send email notification
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (resendApiKey) {
        const htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #dc2626;">🚨 Alert SEO - MUV Fitness</h1>
            <p>Rilevati <strong>${alerts.length} problemi</strong> nelle metriche Google Search Console.</p>
            
            ${alerts.map(alert => `
              <div style="border-left: 4px solid ${alert.severity === 'critical' ? '#dc2626' : '#f59e0b'}; padding: 15px; margin: 15px 0; background: #f9fafb;">
                <h3 style="margin: 0 0 10px 0; color: ${alert.severity === 'critical' ? '#dc2626' : '#f59e0b'};">${alert.alert_message}</h3>
                <p style="margin: 5px 0;"><strong>Valore attuale:</strong> ${alert.current_value.toFixed(2)}</p>
                <p style="margin: 5px 0;"><strong>7 giorni fa:</strong> ${alert.previous_value.toFixed(2)}</p>
                <p style="margin: 5px 0;"><strong>Variazione:</strong> ${alert.change_percentage.toFixed(1)}%</p>
              </div>
            `).join('')}
            
            <p style="margin-top: 30px;">
              <a href="https://www.muvfitness.it/admin/seo-monitor" 
                 style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Vai alla Dashboard SEO
              </a>
            </p>
            
            <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
              Questo è un alert automatico generato dal sistema di monitoraggio SEO di MUV Fitness.
            </p>
          </div>
        `;

        try {
          const emailResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'MUV SEO Monitor <seo@muvfitness.it>',
              to: ['info@muvfitness.it'],
              subject: `🚨 Alert SEO: ${alerts.length} problema${alerts.length > 1 ? 'i' : ''} rilevat${alerts.length > 1 ? 'i' : 'o'}`,
              html: htmlContent,
            }),
          });

          if (emailResponse.ok) {
            console.log('✅ Email sent successfully');
            // Mark alerts as sent
            if (savedAlerts) {
              await supabase
                .from('gsc_alert_history')
                .update({ email_sent: true, email_sent_at: new Date().toISOString() })
                .in('id', savedAlerts.map(a => a.id));
            }
          } else {
            console.log('⚠️ Failed to send email:', await emailResponse.text());
          }
        } catch (emailError) {
          console.error('⚠️ Email error:', emailError);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        alertsTriggered: alerts.length,
        alerts,
        message: alerts.length > 0 
          ? `🚨 ${alerts.length} alert inviati via email`
          : '✅ Nessun problema rilevato',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error: any) {
    console.error('❌ Alert error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
