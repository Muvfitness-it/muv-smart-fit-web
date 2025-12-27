import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const ALLOWED_ORIGINS = [
  "https://muvfitnesslegnago.it",
  "https://www.muvfitness.it", 
  "https://preview---muv-fitness.lovable.app",
  "https://muv-fitness.lovable.app"
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

// Professional HTML email template
const createEmailTemplate = (name: string, guideUrl: string) => `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>La tua guida è pronta!</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #FF6B35 0%, #F7C948 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                🎉 La tua guida è pronta!
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
                7 Segreti per Dimagrire in 30 Giorni
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 18px; margin: 0 0 20px 0;">
                Ciao <strong>${name}</strong>! 👋
              </p>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                Grazie per aver scaricato la nostra guida! Ecco il link per il download:
              </p>
              
              <!-- Download Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${guideUrl}" 
                       style="display: inline-block; background: linear-gradient(135deg, #FF6B35 0%, #F7C948 100%); color: #ffffff; text-decoration: none; padding: 18px 40px; border-radius: 50px; font-weight: bold; font-size: 18px; box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);">
                      📥 Scarica la Guida PDF
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- What's inside -->
              <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin: 25px 0;">
                <h3 style="color: #333333; margin: 0 0 15px 0; font-size: 18px;">
                  📚 Cosa troverai nella guida:
                </h3>
                <ul style="color: #555555; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>I 7 segreti che i nostri clienti usano per perdere peso</li>
                  <li>Un piano alimentare esempio per 7 giorni</li>
                  <li>3 esercizi efficaci da fare anche a casa</li>
                  <li>Bonus: Lista alimenti brucia-grassi</li>
                </ul>
              </div>
              
              <!-- CTA Consulenza -->
              <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 30px; text-align: center; margin-top: 30px;">
                <h3 style="color: #ffffff; margin: 0 0 10px 0; font-size: 20px;">
                  🚀 Vuoi risultati ancora più veloci?
                </h3>
                <p style="color: rgba(255,255,255,0.8); margin: 0 0 20px 0; font-size: 15px;">
                  Prenota la tua consulenza gratuita + prova EMS
                </p>
                <a href="https://www.muvfitness.it/#contatti" 
                   style="display: inline-block; background-color: #ffffff; color: #FF6B35; text-decoration: none; padding: 14px 30px; border-radius: 50px; font-weight: bold; font-size: 16px;">
                  Prenota Consulenza Gratuita
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1a2e; padding: 30px; text-align: center;">
              <p style="color: #ffffff; margin: 0 0 5px 0; font-weight: bold; font-size: 16px;">
                MUV Fitness Legnago
              </p>
              <p style="color: rgba(255,255,255,0.7); margin: 0 0 15px 0; font-size: 14px;">
                📍 Piazzetta Don Walter Soave, 2 - Legnago (VR)
              </p>
              <p style="margin: 0;">
                <a href="https://wa.me/393291070374" style="color: #F7C948; text-decoration: none; font-size: 14px;">
                  📱 WhatsApp: 329 107 0374
                </a>
              </p>
              <p style="color: rgba(255,255,255,0.5); margin: 20px 0 0 0; font-size: 12px;">
                Ricevi questa email perché hai richiesto la guida gratuita.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

serve(async (req) => {
  const origin = req.headers.get("origin");
  console.log("send-lead-magnet request from origin:", origin);
  
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    const body = await req.json().catch(() => null);
    const { name, email, source, phone } = body ?? {};

    console.log("Processing lead magnet request:", { name, email, source });

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Email non valida" }), {
        status: 422,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    // Validate name
    if (!name || name.trim().length < 2) {
      return new Response(JSON.stringify({ error: "Nome non valido" }), {
        status: 422,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    // Guide URL - public PDF
    const guideUrl = "https://www.muvfitness.it/guide/7-segreti-per-dimagrire.pdf";

    // 1. Save lead to database
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone || null,
        source: source ?? "lead-magnet-exit-intent",
        message: "Richiesta guida: 7 Segreti per Dimagrire",
        created_at: new Date().toISOString()
      })
    });

    if (!insertRes.ok) {
      const errorText = await insertRes.text();
      console.error("Failed to save lead:", errorText);
      // Continue anyway - email is more important
    } else {
      console.log("Lead saved successfully");
    }

    // 2. Send email with Resend
    const emailHtml = createEmailTemplate(name.trim(), guideUrl);
    
    const emailResponse = await resend.emails.send({
      from: "MUV Fitness <noreply@muvfitness.it>",
      to: [email.toLowerCase().trim()],
      subject: "🎁 La tua guida '7 Segreti per Dimagrire' è pronta!",
      html: emailHtml
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      ok: true, 
      message: "Guida inviata con successo!",
      guideUrl: guideUrl 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
    
  } catch (err) {
    console.error("send-lead-magnet error:", err);
    return new Response(JSON.stringify({ error: "Errore interno. Riprova." }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }
});
