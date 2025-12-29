import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const FROM_EMAIL = 'newsletter@muvfitness.it';
const SITE_URL = 'https://www.muvfitness.it';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action } = await req.json();

    console.log(`[Weekly Newsletter] Action: ${action}`);

    switch (action) {
      case 'send_newsletter': {
        // Get active subscribers
        const { data: subscribers, error: subError } = await supabase
          .from('newsletter_subscribers')
          .select('id, email, name')
          .eq('status', 'active');

        if (subError) throw subError;

        if (!subscribers || subscribers.length === 0) {
          return new Response(JSON.stringify({ 
            success: true, 
            message: 'No active subscribers',
            sent: 0 
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Get latest blog post
        const { data: latestPost } = await supabase
          .from('blog_posts')
          .select('title, slug, excerpt, featured_image')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(1)
          .single();

        // Weekly fitness tips
        const weeklyTips = [
          "💪 Allenati almeno 3 volte a settimana per risultati ottimali",
          "🥗 Mantieni un'alimentazione bilanciata con proteine ad ogni pasto",
          "😴 Dormi 7-8 ore per favorire il recupero muscolare",
          "💧 Bevi almeno 2 litri d'acqua al giorno"
        ];

        // Build email content
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter MUV Fitness</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #1E3A8A 0%, #10B981 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">MUV FITNESS</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Newsletter Settimanale</p>
      </td>
    </tr>
    
    <!-- Greeting -->
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #1E3A8A; margin: 0 0 15px;">Ciao! 👋</h2>
        <p style="color: #555; line-height: 1.6; margin: 0;">
          Ecco la tua dose settimanale di motivazione e consigli fitness dal team MUV!
        </p>
      </td>
    </tr>
    
    ${latestPost ? `
    <!-- Latest Article -->
    <tr>
      <td style="padding: 0 30px 30px;">
        <div style="background: #f8f9fa; border-radius: 12px; overflow: hidden; border: 1px solid #e9ecef;">
          ${latestPost.featured_image ? `<img src="${latestPost.featured_image}" alt="${latestPost.title}" style="width: 100%; height: 200px; object-fit: cover;">` : ''}
          <div style="padding: 20px;">
            <h3 style="color: #1E3A8A; margin: 0 0 10px; font-size: 18px;">📖 Ultimo Articolo</h3>
            <h4 style="color: #333; margin: 0 0 10px;">${latestPost.title}</h4>
            <p style="color: #666; margin: 0 0 15px; line-height: 1.5;">${latestPost.excerpt || 'Leggi il nostro ultimo articolo sul blog!'}</p>
            <a href="${SITE_URL}/${latestPost.slug}" style="display: inline-block; background: #F97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
              Leggi Ora →
            </a>
          </div>
        </div>
      </td>
    </tr>
    ` : ''}
    
    <!-- Weekly Tips -->
    <tr>
      <td style="padding: 0 30px 30px;">
        <h3 style="color: #1E3A8A; margin: 0 0 15px;">💡 Consigli della Settimana</h3>
        <ul style="margin: 0; padding: 0; list-style: none;">
          ${weeklyTips.map(tip => `
            <li style="background: #f8f9fa; padding: 12px 15px; margin-bottom: 8px; border-radius: 8px; color: #333;">
              ${tip}
            </li>
          `).join('')}
        </ul>
      </td>
    </tr>
    
    <!-- CTA -->
    <tr>
      <td style="padding: 0 30px 30px; text-align: center;">
        <div style="background: linear-gradient(135deg, #10B981 0%, #1E3A8A 100%); padding: 25px; border-radius: 12px;">
          <h3 style="color: white; margin: 0 0 10px;">Pronto a trasformarti?</h3>
          <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px;">Prenota una consulenza gratuita con i nostri esperti</p>
          <a href="${SITE_URL}/prenota" style="display: inline-block; background: white; color: #1E3A8A; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 700;">
            PRENOTA ORA
          </a>
        </div>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="background: #1E3A8A; padding: 25px; text-align: center;">
        <p style="color: rgba(255,255,255,0.8); margin: 0 0 10px; font-size: 14px;">
          MUV Fitness - Via San Pietro 50, Legnago (VR)
        </p>
        <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 12px;">
          <a href="${SITE_URL}/newsletter/unsubscribe?email={{email}}" style="color: rgba(255,255,255,0.6);">
            Disiscriviti dalla newsletter
          </a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
        `;

        let sentCount = 0;
        const errors: string[] = [];

        // Send to each subscriber
        for (const subscriber of subscribers) {
          try {
            const personalizedHtml = emailHtml.replace('{{email}}', encodeURIComponent(subscriber.email));
            
            if (RESEND_API_KEY) {
              const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${RESEND_API_KEY}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  from: FROM_EMAIL,
                  to: subscriber.email,
                  subject: `💪 Newsletter MUV - La tua dose settimanale di fitness!`,
                  html: personalizedHtml
                })
              });

              if (response.ok) {
                sentCount++;
                console.log(`[Newsletter] Sent to ${subscriber.email}`);
              } else {
                const errorText = await response.text();
                errors.push(`${subscriber.email}: ${errorText}`);
              }
            } else {
              console.log(`[Newsletter] Would send to ${subscriber.email} (no RESEND_API_KEY)`);
              sentCount++;
            }
          } catch (err) {
            errors.push(`${subscriber.email}: ${err.message}`);
          }
        }

        return new Response(JSON.stringify({ 
          success: true,
          sent: sentCount,
          total: subscribers.length,
          errors: errors.length > 0 ? errors : undefined
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'subscribe': {
        const { email, name, source } = await req.json();

        if (!email) {
          return new Response(JSON.stringify({ error: 'Email required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const { error } = await supabase
          .from('newsletter_subscribers')
          .upsert({
            email: email.toLowerCase().trim(),
            name,
            source: source || 'website',
            status: 'active',
            subscribed_at: new Date().toISOString()
          }, { onConflict: 'email' });

        if (error) throw error;

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'unsubscribe': {
        const { email } = await req.json();

        if (!email) {
          return new Response(JSON.stringify({ error: 'Email required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const { error } = await supabase
          .from('newsletter_subscribers')
          .update({
            status: 'unsubscribed',
            unsubscribed_at: new Date().toISOString()
          })
          .eq('email', email.toLowerCase().trim());

        if (error) throw error;

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'get_stats': {
        const { data: stats } = await supabase
          .from('newsletter_subscribers')
          .select('status')
          .then(({ data }) => {
            const active = data?.filter(s => s.status === 'active').length || 0;
            const unsubscribed = data?.filter(s => s.status === 'unsubscribed').length || 0;
            return { data: { active, unsubscribed, total: data?.length || 0 } };
          });

        return new Response(JSON.stringify({ stats }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      default:
        return new Response(JSON.stringify({ error: 'Unknown action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

  } catch (error) {
    console.error('[Weekly Newsletter] Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
