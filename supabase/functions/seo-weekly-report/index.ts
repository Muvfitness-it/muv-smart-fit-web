import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('📧 Generating SEO weekly report...');

    // 1. Fetch summary metrics
    const { data: summaryData } = await supabase
      .from('seo_monitoring_summary')
      .select('metric_name, metric_value');

    const totalArticles = summaryData?.find(s => s.metric_name === 'total_articles')?.metric_value || 0;
    const indexed = summaryData?.find(s => s.metric_name === 'indexed_articles')?.metric_value || 0;
    const crawledNotIndexed = summaryData?.find(s => s.metric_name === 'crawled_not_indexed')?.metric_value || 0;
    const critical = summaryData?.find(s => s.metric_name === 'critical_articles')?.metric_value || 0;

    const indexedPercentage = totalArticles > 0 ? Math.round((indexed / totalArticles) * 100) : 0;

    // 2. Fetch critical articles
    const { data: criticalArticles } = await supabase
      .from('seo_monitoring_log')
      .select(`
        post_id,
        url,
        title,
        indexing_status,
        days_in_current_status,
        issues_detected,
        suggestions,
        blog_posts!inner(slug)
      `)
      .in('indexing_status', ['crawled_not_indexed', 'pending_first_check'])
      .gte('days_in_current_status', 14)
      .order('days_in_current_status', { ascending: false })
      .limit(10);

    console.log(`Found ${criticalArticles?.length || 0} critical articles`);

    // 3. Generate HTML report
    const criticalHTML = criticalArticles && criticalArticles.length > 0
      ? criticalArticles.map(a => `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px; font-size: 14px;">${a.title || 'Senza titolo'}</td>
          <td style="padding: 12px; font-size: 12px;">
            <a href="${a.url}" style="color: #667eea; text-decoration: none;">${a.url}</a>
          </td>
          <td style="padding: 12px; color: #dc2626; font-weight: 600; text-align: center;">${a.days_in_current_status} giorni</td>
          <td style="padding: 12px; font-size: 12px; color: #6b7280;">
            ${Array.isArray(a.suggestions) && a.suggestions.length > 0 
              ? a.suggestions.slice(0, 2).join(' • ') 
              : 'Nessun suggerimento'}
          </td>
        </tr>
      `).join('')
      : '<tr><td colspan="4" style="padding: 20px; text-align: center; color: #10b981; font-weight: 600;">🎉 Nessun articolo critico!</td></tr>';

    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Report SEO Settimanale - MUV Fitness</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      
      <!-- Header with gradient -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h1 style="margin: 0; font-size: 32px; font-weight: 700;">📊 Report SEO Settimanale</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.95; font-size: 16px;">
          MUV Fitness Blog • ${new Date().toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <!-- Summary Cards -->
      <div style="background: white; border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="margin-top: 0; margin-bottom: 25px; color: #1f2937; font-size: 24px; font-weight: 700;">📈 Stato Generale</h2>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
          
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 25px; border-radius: 10px; border-left: 4px solid #10b981;">
            <div style="font-size: 13px; color: #065f46; margin-bottom: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Totale Articoli</div>
            <div style="font-size: 42px; font-weight: 800; color: #047857; line-height: 1;">${totalArticles}</div>
          </div>

          <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 25px; border-radius: 10px; border-left: 4px solid #3b82f6;">
            <div style="font-size: 13px; color: #1e40af; margin-bottom: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">✅ Indicizzati</div>
            <div style="font-size: 42px; font-weight: 800; color: #1d4ed8; line-height: 1;">${indexed}</div>
            <div style="font-size: 14px; color: #3b82f6; margin-top: 8px; font-weight: 600;">${indexedPercentage}% del totale</div>
          </div>

          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 10px; border-left: 4px solid #f59e0b;">
            <div style="font-size: 13px; color: #92400e; margin-bottom: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">⏳ Non Indicizzati</div>
            <div style="font-size: 42px; font-weight: 800; color: #d97706; line-height: 1;">${crawledNotIndexed}</div>
          </div>

          <div style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); padding: 25px; border-radius: 10px; border-left: 4px solid #dc2626;">
            <div style="font-size: 13px; color: #991b1b; margin-bottom: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">⚠️ Critici (>14gg)</div>
            <div style="font-size: 42px; font-weight: 800; color: #dc2626; line-height: 1;">${critical}</div>
          </div>

        </div>
      </div>

      ${critical > 0 ? `
      <!-- Critical Articles Alert -->
      <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px solid #fca5a5; border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="margin-top: 0; margin-bottom: 15px; color: #991b1b; font-size: 24px; font-weight: 700;">
          ⚠️ Articoli Critici - Azione Richiesta
        </h2>
        <p style="color: #7f1d1d; margin-bottom: 25px; font-size: 15px; line-height: 1.6;">
          I seguenti articoli sono scansionati ma <strong>non indicizzati da oltre 14 giorni</strong>. È necessario intervenire:
        </p>
        <div style="background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #dc2626; color: white;">
                <th style="padding: 14px; text-align: left; font-weight: 600; font-size: 13px;">Titolo Articolo</th>
                <th style="padding: 14px; text-align: left; font-weight: 600; font-size: 13px;">URL</th>
                <th style="padding: 14px; text-align: center; font-weight: 600; font-size: 13px;">Giorni</th>
                <th style="padding: 14px; text-align: left; font-weight: 600; font-size: 13px;">Suggerimenti</th>
              </tr>
            </thead>
            <tbody>
              ${criticalHTML}
            </tbody>
          </table>
        </div>
      </div>
      ` : ''}

      <!-- Recommended Actions -->
      <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 12px; padding: 30px; margin-bottom: 30px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="margin-top: 0; margin-bottom: 20px; color: #065f46; font-size: 24px; font-weight: 700;">✅ Azioni Consigliate</h2>
        <ul style="color: #047857; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.8;">
          <li style="margin-bottom: 10px;"><strong>Verifica articoli critici</strong> e aggiorna contenuti con keyword mirate</li>
          <li style="margin-bottom: 10px;"><strong>Richiedi indicizzazione manuale</strong> su Google Search Console per articoli >14 giorni</li>
          <li style="margin-bottom: 10px;"><strong>Aggiungi link interni</strong> tra articoli correlati per migliorare crawlability</li>
          <li style="margin-bottom: 10px;"><strong>Verifica sitemap.xml</strong> su <a href="https://www.muvfitness.it/sitemap.xml" style="color: #059669; text-decoration: none; font-weight: 600;">muvfitness.it/sitemap.xml</a></li>
          <li><strong>Monitora metriche</strong> nella dashboard admin MUV</li>
        </ul>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 25px 20px; color: #6b7280; border-top: 2px solid #e5e7eb; margin-top: 40px; background: white; border-radius: 12px;">
        <p style="margin: 0 0 15px 0; font-size: 14px;">
          📅 Questo report è generato <strong>automaticamente ogni lunedì</strong> alle 8:00.
        </p>
        <p style="margin: 0; font-size: 14px;">
          <a href="https://www.muvfitness.it/admin/seo-monitor" style="color: #667eea; text-decoration: none; font-weight: 600; margin: 0 10px;">🔗 Dashboard SEO Admin</a>
          <span style="color: #d1d5db;">|</span>
          <a href="https://search.google.com/search-console" style="color: #667eea; text-decoration: none; font-weight: 600; margin: 0 10px;">🔍 Google Search Console</a>
        </p>
        <p style="margin: 20px 0 0 0; font-size: 12px; color: #9ca3af;">
          MUV Fitness - Sistema di Monitoraggio SEO Automatico
        </p>
      </div>

    </body>
    </html>
    `;

    // 4. Send email via Resend
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return new Response(JSON.stringify({ 
        error: 'Email service not configured',
        reportGenerated: true,
        critical,
        indexed,
        total: totalArticles
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const emailSubject = critical > 0 
      ? `⚠️ Report SEO MUV - ${critical} articoli critici da verificare` 
      : `✅ Report SEO MUV - ${indexed}/${totalArticles} indicizzati (${indexedPercentage}%)`;

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'SEO Monitor MUV <seo@muvfitness.it>',
        to: ['info@muvfitness.it'],
        subject: emailSubject,
        html: emailHTML
      })
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('Resend API error:', errorText);
      throw new Error(`Resend API error: ${errorText}`);
    }

    const emailResult = await emailResponse.json();
    console.log('✅ Email sent successfully:', emailResult);

    return new Response(JSON.stringify({
      success: true,
      emailSent: true,
      emailId: emailResult.id,
      critical,
      indexed,
      total: totalArticles,
      subject: emailSubject
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('SEO Weekly Report error:', error);
    return new Response(JSON.stringify({ 
      error: 'Report generation failed',
      details: String(error)
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});