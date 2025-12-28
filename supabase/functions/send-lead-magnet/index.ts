import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

// Professional HTML email template for guide delivery
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

// A/B test subject line variants
const subjectVariants = {
  day1: {
    A: "📖 Hai iniziato a leggere la guida? Ecco un consiglio extra",
    B: "💡 Il segreto che non trovi nella guida (solo per te)"
  },
  day3: {
    A: (name: string) => `🎯 ${name}, ecco cosa stanno facendo i nostri clienti questa settimana`,
    B: (name: string) => `📊 ${name}, questi risultati ti sorprenderanno`
  },
  day7: {
    A: (name: string) => `⏰ ${name}, ultima possibilità: offerta speciale per te`,
    B: (name: string) => `🎁 ${name}, ho riservato questo solo per te (-33%)`
  }
};

// Get random A/B variant
const getRandomVariant = (): 'A' | 'B' => Math.random() < 0.5 ? 'A' : 'B';

// Follow-up email sequence templates
const followUpTemplates = {
  day1: (name: string, variant: 'A' | 'B' = 'A') => ({
    subject: subjectVariants.day1[variant],
    html: `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #FF6B35 0%, #F7C948 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">💡 Un consiglio extra per te</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 18px; margin: 0 0 20px 0;">Ciao <strong>${name}</strong>! 👋</p>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Spero che tu abbia iniziato a leggere la guida "7 Segreti per Dimagrire". 
                Ecco un consiglio che non troverai nella guida:
              </p>
              
              <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-left: 4px solid #FF6B35; border-radius: 8px; padding: 20px; margin: 25px 0;">
                <h3 style="color: #333333; margin: 0 0 10px 0; font-size: 18px;">🔥 Il Segreto Bonus:</h3>
                <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0;">
                  <strong>L'allenamento EMS brucia fino a 500 calorie in soli 20 minuti</strong> - l'equivalente di 2 ore in palestra tradizionale. 
                  È il modo più efficiente per accelerare i risultati che stai per ottenere con la guida.
                </p>
              </div>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                <strong>Curiosità:</strong> I nostri clienti che combinano i consigli della guida con l'EMS 
                ottengono risultati visibili in media dopo sole 4 settimane.
              </p>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://www.muvfitness.it/#contatti" 
                       style="display: inline-block; background: linear-gradient(135deg, #FF6B35 0%, #F7C948 100%); color: #ffffff; text-decoration: none; padding: 16px 35px; border-radius: 50px; font-weight: bold; font-size: 16px;">
                      🎁 Prova EMS Gratuita
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #888888; font-size: 14px; margin: 20px 0 0 0;">
                P.S. Non hai ancora scaricato la guida? <a href="https://www.muvfitness.it/guide/7-segreti-per-dimagrire.pdf" style="color: #FF6B35;">Clicca qui</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #1a1a2e; padding: 25px; text-align: center;">
              <p style="color: #ffffff; margin: 0 0 5px 0; font-weight: bold;">MUV Fitness Legnago</p>
              <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 13px;">📍 Piazzetta Don Walter Soave, 2 - Legnago (VR) | 📱 329 107 0374</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  }),
  
  day3: (name: string, variant: 'A' | 'B' = 'A') => ({
    subject: typeof subjectVariants.day3[variant] === 'function' 
      ? subjectVariants.day3[variant](name) 
      : subjectVariants.day3[variant],
    html: `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #FF6B35 0%, #F7C948 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">📊 Risultati reali questa settimana</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 18px; margin: 0 0 20px 0;">Ciao <strong>${name}</strong>!</p>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                Volevo condividere con te alcuni risultati che i nostri clienti stanno ottenendo questa settimana:
              </p>
              
              <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin: 20px 0;">
                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e9ecef;">
                  <span style="font-size: 24px; margin-right: 10px;">👩</span>
                  <strong style="color: #333;">Maria, 42 anni</strong>
                  <p style="color: #555; margin: 5px 0 0 20px; font-size: 14px;">-4 kg in 3 settimane con EMS + dieta equilibrata</p>
                </div>
                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e9ecef;">
                  <span style="font-size: 24px; margin-right: 10px;">👨</span>
                  <strong style="color: #333;">Marco, 35 anni</strong>
                  <p style="color: #555; margin: 5px 0 0 20px; font-size: 14px;">Finalmente addominali visibili dopo 6 settimane</p>
                </div>
                <div>
                  <span style="font-size: 24px; margin-right: 10px;">👩</span>
                  <strong style="color: #333;">Laura, 52 anni</strong>
                  <p style="color: #555; margin: 5px 0 0 20px; font-size: 14px;">Mal di schiena sparito + 2 taglie in meno</p>
                </div>
              </div>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 25px 0;">
                <strong>Il loro segreto?</strong> Hanno iniziato con una semplice consulenza gratuita per capire 
                qual era il percorso giusto per loro.
              </p>
              
              <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 25px; text-align: center; margin: 25px 0;">
                <p style="color: #ffffff; margin: 0 0 15px 0; font-size: 16px;">
                  🗓️ <strong>Solo 3 posti disponibili</strong> questa settimana per consulenze gratuite
                </p>
                <a href="https://www.muvfitness.it/#contatti" 
                   style="display: inline-block; background: linear-gradient(135deg, #FF6B35 0%, #F7C948 100%); color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 50px; font-weight: bold; font-size: 15px;">
                  Prenota il Tuo Posto
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #1a1a2e; padding: 25px; text-align: center;">
              <p style="color: #ffffff; margin: 0 0 5px 0; font-weight: bold;">MUV Fitness Legnago</p>
              <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 13px;">📍 Piazzetta Don Walter Soave, 2 - Legnago (VR) | 📱 329 107 0374</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  }),
  
  day7: (name: string, variant: 'A' | 'B' = 'A') => ({
    subject: typeof subjectVariants.day7[variant] === 'function' 
      ? subjectVariants.day7[variant](name) 
      : subjectVariants.day7[variant],
    html: `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">⏰ Offerta Esclusiva - Solo per Te</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Valida solo per 48 ore</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 18px; margin: 0 0 20px 0;">Ciao <strong>${name}</strong>,</p>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                È passata una settimana da quando hai scaricato la nostra guida. 
                Spero che i consigli ti stiano aiutando! 💪
              </p>
              
              <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                Ho un'<strong>offerta speciale</strong> riservata solo a chi ha scaricato la guida:
              </p>
              
              <div style="background: linear-gradient(135deg, #FF6B35 0%, #F7C948 100%); border-radius: 12px; padding: 30px; text-align: center; margin: 25px 0;">
                <h2 style="color: #ffffff; margin: 0 0 15px 0; font-size: 28px;">🎁 PACCHETTO STARTER</h2>
                <p style="color: rgba(255,255,255,0.9); margin: 0 0 10px 0; font-size: 18px;">
                  <span style="text-decoration: line-through;">€149</span> → <strong style="font-size: 32px;">€99</strong>
                </p>
                <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px;">
                  Consulenza + 3 Sessioni EMS + Piano Personalizzato
                </p>
              </div>
              
              <div style="background-color: #f8f9fa; border-radius: 12px; padding: 20px; margin: 25px 0;">
                <h3 style="color: #333; margin: 0 0 15px 0; font-size: 16px;">✅ Cosa include:</h3>
                <ul style="color: #555; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>Consulenza iniziale approfondita (valore €50)</li>
                  <li>3 sessioni EMS da 20 minuti (valore €75)</li>
                  <li>Piano alimentare personalizzato (valore €30)</li>
                  <li>Accesso alla nostra app di monitoraggio</li>
                </ul>
              </div>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://wa.me/393291070374?text=Ciao!%20Vorrei%20approfittare%20dell'offerta%20Pacchetto%20Starter%20a%20€99" 
                       style="display: inline-block; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); color: #ffffff; text-decoration: none; padding: 18px 40px; border-radius: 50px; font-weight: bold; font-size: 18px; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);">
                      📱 Prenota su WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #888888; font-size: 14px; text-align: center; margin: 20px 0 0 0;">
                ⏰ L'offerta scade tra 48 ore. Non aspettare!
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #1a1a2e; padding: 25px; text-align: center;">
              <p style="color: #ffffff; margin: 0 0 5px 0; font-weight: bold;">MUV Fitness Legnago</p>
              <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 13px;">📍 Piazzetta Don Walter Soave, 2 - Legnago (VR) | 📱 329 107 0374</p>
              <p style="color: rgba(255,255,255,0.5); margin: 15px 0 0 0; font-size: 11px;">
                Non vuoi più ricevere queste email? <a href="https://www.muvfitness.it/unsubscribe" style="color: #888;">Cancellati</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  })
};

serve(async (req) => {
  console.log("send-lead-magnet request received");
  
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
    
    // Guide URL
    const guideUrl = "https://www.muvfitness.it/guide/7-segreti-per-dimagrire.pdf";
    const cleanName = name.trim();
    const cleanEmail = email.toLowerCase().trim();

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
        name: cleanName,
        email: cleanEmail,
        phone: phone || null,
        source: source ?? "lead-magnet-exit-intent",
        message: "Richiesta guida: 7 Segreti per Dimagrire",
        created_at: new Date().toISOString()
      })
    });

    let leadId: string | null = null;
    if (insertRes.ok) {
      const leadData = await insertRes.json();
      leadId = leadData[0]?.id;
      console.log("Lead saved successfully:", leadId);
    } else {
      console.error("Failed to save lead:", await insertRes.text());
    }

    // 2. Send immediate welcome email with guide
    const emailHtml = createEmailTemplate(cleanName, guideUrl);
    
    const emailResponse = await resend.emails.send({
      from: "MUV Fitness <noreply@muvfitness.it>",
      to: [cleanEmail],
      subject: "🎁 La tua guida '7 Segreti per Dimagrire' è pronta!",
      html: emailHtml
    });

    console.log("Welcome email sent:", emailResponse);

    // 3. Schedule follow-up email sequence
    if (leadId) {
      const now = new Date();
      const day1 = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000); // +1 day
      const day3 = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // +3 days
      const day7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 days

      // Assign random A/B variant for this lead (consistent across all emails)
      const variant = getRandomVariant();
      console.log(`A/B Test: Lead ${leadId} assigned to variant ${variant}`);

      const sequences = [
        {
          lead_id: leadId,
          sequence_type: "lead_magnet_followup_day1",
          email_subject: followUpTemplates.day1(cleanName, variant).subject,
          email_content: followUpTemplates.day1(cleanName, variant).html,
          scheduled_at: day1.toISOString(),
          status: "pending",
          subject_variant: variant
        },
        {
          lead_id: leadId,
          sequence_type: "lead_magnet_followup_day3",
          email_subject: followUpTemplates.day3(cleanName, variant).subject,
          email_content: followUpTemplates.day3(cleanName, variant).html,
          scheduled_at: day3.toISOString(),
          status: "pending",
          subject_variant: variant
        },
        {
          lead_id: leadId,
          sequence_type: "lead_magnet_followup_day7",
          email_subject: followUpTemplates.day7(cleanName, variant).subject,
          email_content: followUpTemplates.day7(cleanName, variant).html,
          scheduled_at: day7.toISOString(),
          status: "pending",
          subject_variant: variant
        }
      ];

      // Insert all scheduled emails
      const sequenceRes = await fetch(`${SUPABASE_URL}/rest/v1/email_sequences`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sequences)
      });

      if (sequenceRes.ok) {
        console.log("Email sequence scheduled successfully: Day 1, 3, 7");
      } else {
        console.error("Failed to schedule email sequence:", await sequenceRes.text());
      }
    }

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