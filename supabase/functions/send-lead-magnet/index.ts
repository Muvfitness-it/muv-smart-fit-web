import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
        phone,
        source: 'lead_magnet',
        campaign_name: '7 Segreti per Dimagrire',
        status: 'new'
      });

    if (leadError) {
      console.error('Error saving lead:', leadError);
    }

    // Create PDF content
    const pdfContent = generatePDFGuide(name);

    // Send email with PDF
    const emailResponse = await resend.emails.send({
      from: "MUV Fitness <info@muvfitnesslegnago.it>",
      to: [email],
      subject: "🎯 La tua guida GRATUITA: 7 Segreti per Dimagrire",
      html: getEmailTemplate(name),
      attachments: [
        {
          filename: "7-segreti-per-dimagrire-muv-fitness.pdf",
          content: pdfContent,
          contentType: "application/pdf"
        }
      ]
    });

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
    return new Response(
      JSON.stringify({ error: "Errore nell'invio della guida" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

function generatePDFGuide(name: string): string {
  // This is a simplified PDF content - in a real implementation, 
  // you'd use a proper PDF library like PDFKit or similar
  const content = `
    GUIDA GRATUITA: 7 SEGRETI PER DIMAGRIRE
    
    Ciao ${name}!
    
    Benvenuto/a nella famiglia MUV Fitness! 
    
    Questa guida ti svelerà i 7 segreti che hanno aiutato centinaia di nostri clienti a raggiungere il loro peso forma.
    
    SEGRETO #1: L'ALIMENTAZIONE È L'80% DEL SUCCESSO
    Non esistono diete miracolose, ma esistono abitudini alimentari che accelerano il metabolismo.
    
    SEGRETO #2: L'EMS RIVOLUZIONA IL DIMAGRIMENTO
    20 minuti di EMS equivalgono a 4 ore di palestra tradizionale.
    
    SEGRETO #3: IL TIMING DEI PASTI
    Quando mangi è importante quanto cosa mangi.
    
    SEGRETO #4: L'IDRATAZIONE STRATEGICA
    2 litri d'acqua al giorno accelerano il metabolismo del 30%.
    
    SEGRETO #5: IL SONNO BRUCIA GRASSI
    7-8 ore di sonno ottimizzano gli ormoni del dimagrimento.
    
    SEGRETO #6: IL MOVIMENTO QUOTIDIANO
    10.000 passi al giorno + 2 allenamenti EMS settimanali = risultati garantiti.
    
    SEGRETO #7: LA MENTALITÀ VINCENTE
    Il mindset giusto è la chiave per mantenere i risultati nel tempo.
    
    PIANO D'AZIONE DA 7 GIORNI:
    
    Giorno 1-2: Implementa i segreti 1 e 4
    Giorno 3-4: Aggiungi i segreti 2 e 5  
    Giorno 5-6: Integra i segreti 3 e 6
    Giorno 7: Lavora sul segreto 7
    
    BONUS: RICETTE BRUCIA GRASSI
    
    Colazione Energetica MUV:
    - 1 yogurt greco
    - 1 cucchiaio di avena
    - Frutti di bosco
    - 1 cucchiaino di miele
    
    Pranzo Proteico:
    - Petto di pollo grigliato
    - Verdure saltate
    - Quinoa
    - Olio EVO
    
    Cena Leggera:
    - Salmone al vapore
    - Insalata mista
    - Avocado
    
    PROSSIMI PASSI:
    
    Vuoi accelerare i tuoi risultati?
    Prenota la tua PROVA GRATUITA di EMS:
    
    📞 Tel: 045 123 456
    📧 Email: info@muvfitnesslegnago.it
    🌐 Web: www.muvfitnesslegnago.it
    
    Ti aspettiamo in centro a Legnago!
    
    Il Team MUV Fitness
  `;
  
  // Convert to base64 (simplified - in reality you'd generate a proper PDF)
  return btoa(content);
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