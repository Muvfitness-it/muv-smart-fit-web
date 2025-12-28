import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS"
};

// 1x1 transparent GIF pixel
const TRACKING_PIXEL = new Uint8Array([
  0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
  0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x21,
  0xf9, 0x04, 0x01, 0x00, 0x00, 0x00, 0x00, 0x2c, 0x00, 0x00,
  0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44,
  0x01, 0x00, 0x3b
]);

serve(async (req) => {
  const url = new URL(req.url);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const trackingId = url.searchParams.get("tid");
    const eventType = url.searchParams.get("type") || "open";
    const redirectUrl = url.searchParams.get("url");
    
    if (!trackingId) {
      return new Response("Missing tracking ID", { status: 400 });
    }

    const clientIp = req.headers.get("x-forwarded-for") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Find email sequence by tracking_id
    const findRes = await fetch(
      `${SUPABASE_URL}/rest/v1/email_sequences?tracking_id=eq.${trackingId}&select=id`,
      {
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        }
      }
    );

    const sequences = await findRes.json();
    
    if (sequences.length === 0) {
      console.log(`No email found for tracking_id: ${trackingId}`);
      // Still return valid response to not break email display
      if (eventType === "open") {
        return new Response(TRACKING_PIXEL, {
          headers: { "Content-Type": "image/gif", "Cache-Control": "no-cache, no-store" }
        });
      }
      return Response.redirect(redirectUrl || "https://www.muvfitness.it", 302);
    }

    const emailSequenceId = sequences[0].id;

    // Log the tracking event
    await fetch(`${SUPABASE_URL}/rest/v1/email_tracking_events`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify({
        email_sequence_id: emailSequenceId,
        event_type: eventType,
        link_url: redirectUrl || null,
        ip_address: clientIp?.split(",")[0]?.trim() || "unknown",
        user_agent: userAgent
      })
    });

    // Update email_sequences counters
    const updateField = eventType === "open" 
      ? { opened_at: new Date().toISOString(), open_count: "open_count + 1" }
      : { clicked_at: new Date().toISOString(), click_count: "click_count + 1" };

    // Use RPC for counter increment
    if (eventType === "open") {
      await fetch(`${SUPABASE_URL}/rest/v1/email_sequences?id=eq.${emailSequenceId}`, {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          opened_at: new Date().toISOString()
        })
      });
      
      // Separate call to increment counter
      await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_email_open_count`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email_id: emailSequenceId })
      }).catch(() => {
        // Fallback if RPC doesn't exist - just log
        console.log("RPC increment not available, using direct update");
      });
    } else {
      await fetch(`${SUPABASE_URL}/rest/v1/email_sequences?id=eq.${emailSequenceId}`, {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          clicked_at: new Date().toISOString()
        })
      });
    }

    console.log(`✅ Tracked ${eventType} for email ${emailSequenceId}`);

    // Return appropriate response
    if (eventType === "open") {
      return new Response(TRACKING_PIXEL, {
        headers: { 
          "Content-Type": "image/gif", 
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
          "Expires": "0"
        }
      });
    } else if (eventType === "click" && redirectUrl) {
      return Response.redirect(redirectUrl, 302);
    }

    return new Response("OK", { status: 200 });

  } catch (err) {
    console.error("Email tracking error:", err);
    
    // Always return valid response to not break email
    if (url.searchParams.get("type") === "click") {
      const redirectUrl = url.searchParams.get("url");
      if (redirectUrl) {
        return Response.redirect(redirectUrl, 302);
      }
    }
    
    return new Response(TRACKING_PIXEL, {
      headers: { "Content-Type": "image/gif" }
    });
  }
});
