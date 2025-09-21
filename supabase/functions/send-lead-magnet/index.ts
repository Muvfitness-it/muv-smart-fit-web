import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { encodeBase64 } from "https://deno.land/std@0.190.0/encoding/base64.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadMagnetRequest {
  name: string;
  email: string;
  phone?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone }: LeadMagnetRequest = await req.json();

    // Validate input
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Nome e email sono richiesti" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save lead to database
    const { error: leadError } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        phone: phone ?? '',
        source: 'lead_magnet',
        campaign_name: '7 Segreti per Dimagrire',
        status: 'new'
      });

    if (leadError) {
      console.error('Error saving lead:', leadError);
    }

    // Read the actual PDF file and convert to base64
    const pdfContent = await loadPDFGuide();

    // Send email with PDF - try verified domain first, fallback to resend default
    let emailResponse;
    try {
      emailResponse = await resend.emails.send({
        from: "MUV Fitness <info@muvfitness.it>",
        to: [email],
        subject: "🎯 La tua guida GRATUITA: 7 Segreti per Dimagrire!",
        html: getEmailTemplate(name),
        attachments: [
          {
            filename: "7-segreti-per-dimagrire-muv-fitness.pdf",
            content: pdfContent,
            type: "application/pdf"
          }
        ]
      });
    } catch (fromError) {
      console.log("Trying fallback sender due to:", fromError.message);
      emailResponse = await resend.emails.send({
        from: "MUV Fitness <onboarding@resend.dev>",
        to: [email],
        subject: "🎯 La tua guida GRATUITA: 7 Segreti per Dimagrire!",
        html: getEmailTemplate(name),
        attachments: [
          {
            filename: "7-segreti-per-dimagrire-muv-fitness.pdf",
            content: pdfContent,
            type: "application/pdf"
          }
        ]
      });
    }

    // Schedule follow-up emails
    const followUpEmails = [
      {
        sequence_type: 'welcome_series',
        email_subject: '🔥 Hai già iniziato con i 7 Segreti?',
        email_content: getFollowUpEmail1(name),
        scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        lead_id: null // We'll update this with the actual lead ID
      },
      {
        sequence_type: 'welcome_series',
        email_subject: '💪 La trasformazione di Sara: da 78kg a 65kg',
        email_content: getFollowUpEmail2(name),
        scheduled_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        lead_id: null
      }
    ];

    // Save email sequences
    for (const emailSeq of followUpEmails) {
      await supabase
        .from('email_sequences')
        .insert(emailSeq);
    }

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Guida inviata con successo! Controlla la tua email."
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error: any) {
    console.error("Error in send-lead-magnet function:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    return new Response(
      JSON.stringify({ 
        error: "Errore nell'invio della guida",
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

async function loadPDFGuide(): Promise<string> {
  try {
    console.log("Loading PDF guide from function directory...");
    
    // Get the directory of the current module
    const currentDir = new URL('.', import.meta.url).pathname;
    const pdfPath = currentDir + 'lead-magnet.pdf';
    
    console.log("Attempting to read PDF from:", pdfPath);
    const pdfBytes = await Deno.readFile(pdfPath);
    
    console.log(`PDF loaded successfully, size: ${pdfBytes.length} bytes`);
    
    // Convert to base64 using Deno's proper encoding
    const base64PDF = encodeBase64(pdfBytes);
    
    return base64PDF;
  } catch (error) {
    console.error("Error loading PDF file:", error);
    throw new Error(`Failed to load PDF: ${error.message}`);
  }
}

function getEmailTemplate(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
            .cta-button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .benefits { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎯 Ecco la tua guida GRATUITA!</h1>
                <p>Ciao ${name}, i tuoi 7 Segreti per Dimagrire sono pronti!</p>
            </div>
            
            <div class="content">
                <p>Congratulazioni! Hai appena fatto il primo passo verso la tua trasformazione.</p>
                
                <div class="benefits">
                    <h3>📎 Nella guida allegata troverai:</h3>
                    <ul>
                        <li>✅ I 7 segreti utilizzati dai nostri clienti di successo</li>
                        <li>✅ Piano d'azione da 7 giorni step-by-step</li>
                        <li>✅ Ricette brucia grassi esclusive</li>
                        <li>✅ Come l'EMS può accelerare i tuoi risultati</li>
                        <li>✅ Strategie di mindset vincente</li>
                    </ul>
                </div>
                
                <p><strong>💡 Consiglio speciale:</strong> Leggi la guida oggi stesso e inizia ad applicare il primo segreto!</p>
                
                <h3>🚀 Vuoi risultati ancora più veloci?</h3>
                <p>Prenota la tua <strong>PROVA GRATUITA di EMS</strong> e scopri come accelerare il tuo dimagrimento del 300%!</p>
                
                <center>
                    <a href="https://muvfitnesslegnago.it/prova-gratuita-ems" class="cta-button">
                        🔥 PRENOTA LA TUA PROVA GRATUITA
                    </a>
                </center>
                
                <p>Nei prossimi giorni riceverai altre email con consigli esclusivi e storie di successo dei nostri clienti.</p>
                
                <p>A presto,<br>
                <strong>Il Team MUV Fitness</strong></p>
            </div>
            
            <div class="footer">
                <p>MUV Fitness - Centro Legnago<br>
                📍 Via Roma 123, Legnago (VR)<br>
                📞 045 123 456 | 📧 info@muvfitnesslegnago.it</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

function getFollowUpEmail1(name: string): string {
  return `
    <h2>🔥 Ciao ${name}, hai già iniziato?</h2>
    <p>Ieri ti ho inviato la guida "7 Segreti per Dimagrire" e spero tu l'abbia già letta!</p>
    <p>Oggi voglio condividere con te una storia incredibile...</p>
    <p><strong>📖 La storia di Marco:</strong> In 8 settimane ha perso 12kg grazie all'EMS + i 7 segreti.</p>
    <p>Il suo segreto? Ha prenotato subito la prova gratuita!</p>
    <a href="https://muvfitnesslegnago.it/prova-gratuita-ems">🚀 Prenota anche tu la tua prova gratuita</a>
  `;
}

function getFollowUpEmail2(name: string): string {
  return `
    <h2>💪 ${name}, ti presento Sara!</h2>
    <p>Sara aveva 38 anni, 2 figli e pesava 78kg. Oggi pesa 65kg ed è più in forma che mai!</p>
    <p><strong>Come ha fatto?</strong></p>
    <ul>
      <li>✅ Ha applicato i 7 segreti della guida</li>
      <li>✅ 2 sedute EMS a settimana</li>
      <li>✅ Ha seguito il nostro programma nutrizionale</li>
    </ul>
    <p>Risultato: -13kg in 4 mesi!</p>
    <p>Anche tu puoi farcela. Inizia con la tua prova gratuita!</p>
    <a href="https://muvfitnesslegnago.it/prova-gratuita-ems">💯 Prenota ora la tua trasformazione</a>
  `;
}

serve(handler);