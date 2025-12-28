import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

serve(async (req) => {
  console.log("send-scheduled-emails: Starting scheduled email processing");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // 1. Fetch pending emails that are due
    const now = new Date().toISOString();
    const fetchRes = await fetch(
      `${SUPABASE_URL}/rest/v1/email_sequences?status=eq.pending&scheduled_at=lte.${now}&select=*,leads(name,email)`,
      {
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!fetchRes.ok) {
      throw new Error(`Failed to fetch scheduled emails: ${await fetchRes.text()}`);
    }

    const pendingEmails = await fetchRes.json();
    console.log(`Found ${pendingEmails.length} pending emails to send`);

    const results = {
      sent: 0,
      failed: 0,
      errors: [] as string[]
    };

    // Base URL for tracking
    const TRACKING_BASE_URL = `${SUPABASE_URL}/functions/v1/email-tracking`;

    // 2. Process each pending email
    for (const emailRecord of pendingEmails) {
      try {
        const lead = emailRecord.leads;
        
        if (!lead?.email) {
          console.log(`Skipping email ${emailRecord.id}: No lead email found`);
          continue;
        }

        console.log(`Sending ${emailRecord.sequence_type} to ${lead.email}`);

        // Get tracking ID from email record
        const trackingId = emailRecord.tracking_id || emailRecord.id;
        
        // Add tracking pixel to email content
        const trackingPixel = `<img src="${TRACKING_BASE_URL}?tid=${trackingId}&type=open" width="1" height="1" style="display:none" alt="" />`;
        
        // Inject tracking pixel and wrap links for click tracking
        let emailContent = emailRecord.email_content;
        
        // Add tracking pixel before closing body tag
        emailContent = emailContent.replace('</body>', `${trackingPixel}</body>`);
        
        // Wrap CTA links with click tracking
        emailContent = emailContent.replace(
          /href="(https:\/\/www\.muvfitness\.it[^"]+)"/g,
          (match, url) => `href="${TRACKING_BASE_URL}?tid=${trackingId}&type=click&url=${encodeURIComponent(url)}"`
        );
        emailContent = emailContent.replace(
          /href="(https:\/\/wa\.me[^"]+)"/g,
          (match, url) => `href="${TRACKING_BASE_URL}?tid=${trackingId}&type=click&url=${encodeURIComponent(url)}"`
        );

        // Send email via Resend
        const emailResponse = await resend.emails.send({
          from: "MUV Fitness <noreply@muvfitness.it>",
          to: [lead.email],
          subject: emailRecord.email_subject,
          html: emailContent
        });

        if (emailResponse.error) {
          throw new Error(emailResponse.error.message);
        }

        // 3. Update status to 'sent'
        await fetch(`${SUPABASE_URL}/rest/v1/email_sequences?id=eq.${emailRecord.id}`, {
          method: "PATCH",
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status: "sent",
            sent_at: new Date().toISOString()
          })
        });

        results.sent++;
        console.log(`✅ Email sent successfully to ${lead.email}`);

      } catch (emailError: any) {
        results.failed++;
        results.errors.push(`${emailRecord.id}: ${emailError.message}`);
        console.error(`❌ Failed to send email ${emailRecord.id}:`, emailError);

        // Mark as failed
        await fetch(`${SUPABASE_URL}/rest/v1/email_sequences?id=eq.${emailRecord.id}`, {
          method: "PATCH",
          headers: {
            apikey: SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status: "failed"
          })
        });
      }
    }

    console.log(`📊 Results: ${results.sent} sent, ${results.failed} failed`);

    return new Response(JSON.stringify({
      ok: true,
      processed: pendingEmails.length,
      sent: results.sent,
      failed: results.failed,
      errors: results.errors
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });

  } catch (err) {
    console.error("send-scheduled-emails error:", err);
    return new Response(JSON.stringify({ error: "Errore interno" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
});