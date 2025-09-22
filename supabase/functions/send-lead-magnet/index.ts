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
        campaign_name: 'Accelera i Tuoi Risultati in Palestra',
        status: 'new'
      });

    if (leadError) {
      console.error('Error saving lead:', leadError);
    }

    // Read the actual PDF file and convert to base64
    const pdfContent = await loadPDFGuide();

    // Send email with PDF - try Resend first, then Formspree as fallback
    let emailResponse;
    let emailSent = false;
    
    // Try Resend first
    try {
      emailResponse = await resend.emails.send({
        from: "MUV Fitness <info@muvfitness.it>",
        to: [email],
        subject: "🚀 Il tuo EBOOK GRATUITO: Accelera i Tuoi Risultati in Palestra!",
        html: getEmailTemplate(name),
        attachments: [
          {
            filename: "accelera-i-tuoi-risultati-in-palestra-muv-fitness.pdf",
            content: pdfContent,
            type: "application/pdf"
          }
        ]
      });
      emailSent = true;
      console.log("Email sent via Resend (verified domain)");
    } catch (fromError) {
      console.log("Trying Resend fallback sender due to:", fromError.message);
      try {
        emailResponse = await resend.emails.send({
          from: "MUV Fitness <onboarding@resend.dev>",
          to: [email],
          subject: "🚀 Il tuo EBOOK GRATUITO: Accelera i Tuoi Risultati in Palestra!",
          html: getEmailTemplate(name),
          attachments: [
            {
              filename: "accelera-i-tuoi-risultati-in-palestra-muv-fitness.pdf",
              content: pdfContent,
              type: "application/pdf"
            }
          ]
        });
        emailSent = true;
        console.log("Email sent via Resend (fallback domain)");
      } catch (resendError) {
        console.error("Resend completely failed:", resendError.message);
      }
    }

    // If Resend failed, try Formspree fallback
    if (!emailSent) {
      console.log("Attempting Formspree fallback...");
      try {
        const formspreeEndpoint = "https://formspree.io/f/mblklzbq";
        const formspreeResponse = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone || "",
            subject: "🚀 Richiesta ebook GRATUITO: Accelera i Tuoi Risultati in Palestra!",
            message: `Ciao ${name}, grazie per aver richiesto il nostro ebook "Accelera i Tuoi Risultati in Palestra". 
            
A causa di un problema tecnico temporaneo, ti invieremo l'ebook PDF tramite email manualmente entro 24 ore.

Nel frattempo, puoi scaricarli direttamente da: https://muvfitnesslegnago.it/guide/accelera-i-tuoi-risultati-in-palestra.pdf

Se hai domande, contattaci su WhatsApp al 045 123 456.

Grazie per la pazienza!
Il Team MUV Fitness`,
            source: "lead_magnet_fallback"
          })
        });

        if (formspreeResponse.ok) {
          emailSent = true;
          emailResponse = { id: 'formspree-fallback' };
          console.log("Notification sent via Formspree fallback");
        } else {
          console.error("Formspree failed:", formspreeResponse.status, formspreeResponse.statusText);
        }
      } catch (formspreeError) {
        console.error("Formspree error:", formspreeError);
      }
    }

    // Schedule follow-up emails
    const followUpEmails = [
      {
        sequence_type: 'welcome_series',
        email_subject: '🔥 Hai già iniziato con l\'ebook?',
        email_content: getFollowUpEmail1(name),
        scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        lead_id: null // We'll update this with the actual lead ID
      },
      {
        sequence_type: 'welcome_series',
        email_subject: '💪 La trasformazione di Marco: +15kg di massa magra',
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
                <h1>🚀 Ecco il tuo ebook GRATUITO!</h1>
                <p>Ciao ${name}, il tuo ebook "Accelera i Tuoi Risultati in Palestra" è pronto!</p>
            </div>
            
            <div class="content">
                <p>Congratulazioni! Hai appena fatto il primo passo verso una trasformazione fisica straordinaria.</p>
                
                <div class="benefits">
                    <h3>📎 Nel tuo ebook troverai:</h3>
                    <ul>
                        <li>✅ Strategie avanzate per accelerare i risultati in palestra</li>
                        <li>✅ Tecniche di allenamento ad alta intensità</li>
                        <li>✅ Come l'EMS può potenziare ogni tuo workout</li>
                        <li>✅ Piani nutrizionali per massimizzare i guadagni</li>
                        <li>✅ Segreti dei professionisti del fitness</li>
                    </ul>
                </div>
                
                <p><strong>💡 Consiglio speciale:</strong> Leggi l'ebook oggi stesso e inizia ad applicare la prima strategia!</p>
                
                <h3>🚀 Vuoi risultati ancora più esplosivi?</h3>
                <p>Prenota la tua <strong>PROVA GRATUITA di EMS</strong> e scopri come accelerare i tuoi risultati del 300%!</p>
                
                <center>
                    <a href="https://muvfitnesslegnago.it/prova-gratuita-ems" class="cta-button">
                        🔥 PRENOTA LA TUA PROVA GRATUITA
                    </a>
                </center>
                
                <p>Nei prossimi giorni riceverai altre email con consigli esclusivi e storie di successo dei nostri atleti.</p>
                
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
    <p>Ieri ti ho inviato l'ebook "Accelera i Tuoi Risultati in Palestra" e spero tu l'abbia già letto!</p>
    <p>Oggi voglio condividere con te una storia incredibile...</p>
    <p><strong>📖 La storia di Marco:</strong> In 12 settimane ha guadagnato 8kg di massa magra grazie all'EMS + le strategie dell'ebook.</p>
    <p>Il suo segreto? Ha prenotato subito la prova gratuita!</p>
    <a href="https://muvfitnesslegnago.it/prova-gratuita-ems">🚀 Prenota anche tu la tua prova gratuita</a>
  `;
}

function getFollowUpEmail2(name: string): string {
  return `
    <h2>💪 ${name}, ti presento Andrea!</h2>
    <p>Andrea aveva 35 anni, lavorava in ufficio e non riusciva a vedere risultati in palestra. Oggi ha il fisico che ha sempre sognato!</p>
    <p><strong>Come ha fatto?</strong></p>
    <ul>
      <li>✅ Ha applicato le strategie dell'ebook</li>
      <li>✅ 2 sedute EMS a settimana</li>
      <li>✅ Ha seguito il nostro programma di forza</li>
    </ul>
    <p>Risultato: +10kg di massa magra in 6 mesi!</p>
    <p>Anche tu puoi farcela. Inizia con la tua prova gratuita!</p>
    <a href="https://muvfitnesslegnago.it/prova-gratuita-ems">💯 Prenota ora la tua trasformazione</a>
  `;
}

serve(handler);