import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  obiettivo?: string;
  message: string;
  subject?: string;
  campaign?: string;
  source?: string;
}

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

// Input validation
function validateInput(data: any): string | null {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    return "Nome non valido";
  }
  if (data.name.length > 100) {
    return "Nome troppo lungo";
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    return "Email non valida";
  }
  
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    return "Messaggio troppo corto (minimo 10 caratteri)";
  }
  if (data.message.length > 5000) {
    return "Messaggio troppo lungo";
  }
  
  // Check for spam patterns
  const spamPatterns = /(viagra|casino|lottery|prize|winner|click here|buy now)/i;
  if (spamPatterns.test(data.message) || spamPatterns.test(data.name)) {
    return "Contenuto sospetto rilevato";
  }
  
  return null;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    console.log('📧 Edge Function: Request received', {
      method: req.method,
      timestamp: new Date().toISOString()
    });

    // Rate limiting
    const clientIP = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Troppi tentativi. Riprova tra un minuto." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const data: ContactEmailRequest = await req.json();
    
    console.log('📦 Payload parsed:', {
      name: data.name,
      email: data.email,
      hasPhone: !!data.phone,
      hasMessage: !!data.message,
      campaign: data.campaign,
      source: data.source
    });
    
    console.log("Received contact form submission:", { 
      name: data.name, 
      email: data.email,
      hasPhone: !!data.phone,
      hasObiettivo: !!data.obiettivo
    });

    // Validate input
    const validationError = validateInput(data);
    if (validationError) {
      console.warn('❌ Validation failed:', validationError);
      return new Response(
        JSON.stringify({ error: validationError }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    console.log('✅ Validation passed');

    // Sanitize inputs
    const safeName = escapeHtml(data.name.trim());
    const safeEmail = data.email.trim().toLowerCase();
    const safePhone = data.phone ? escapeHtml(data.phone.trim()) : "";
    const safeObiettivo = data.obiettivo ? escapeHtml(data.obiettivo.trim()) : "";
    const safeMessage = escapeHtml(data.message.trim());
    const safeSubject = data.subject ? escapeHtml(data.subject.trim()) : `Nuovo contatto dal sito: ${safeName}`;
    const safeCampaign = data.campaign ? escapeHtml(data.campaign.trim()) : "";
    const safeSource = data.source ? escapeHtml(data.source.trim()) : "website";

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(safeEmail)) {
      return new Response(
        JSON.stringify({ error: "Formato email non valido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email to business
    console.log('📨 Sending business email to info@muvfitness.it...');
    const businessEmail = await resend.emails.send({
      from: "MUV Fitness <noreply@muvfitness.it>",
      to: ["info@muvfitness.it"],
      replyTo: safeEmail,
      subject: safeSubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; margin-bottom: 20px;">Nuovo Contatto dal Sito Web</h2>
            
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong>Nome:</strong> ${safeName}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color: #2563eb;">${safeEmail}</a></p>
              ${safePhone ? `<p style="margin: 5px 0;"><strong>Telefono:</strong> ${safePhone}</p>` : ''}
              ${safeObiettivo ? `<p style="margin: 5px 0;"><strong>Obiettivo:</strong> ${safeObiettivo}</p>` : ''}
            </div>
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
              <h3 style="margin-top: 0; color: #92400e;">Messaggio</h3>
              <p style="margin: 0; white-space: pre-wrap; color: #78350f;">${safeMessage}</p>
            </div>
            
            ${safeCampaign || safeSource ? `
              <div style="background-color: #e0e7ff; padding: 12px; border-radius: 6px; font-size: 12px;">
                ${safeCampaign ? `<p style="margin: 3px 0;"><strong>Campaign:</strong> ${safeCampaign}</p>` : ''}
                <p style="margin: 3px 0;"><strong>Source:</strong> ${safeSource}</p>
              </div>
            ` : ''}
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
              <p>Ricevuto il ${new Date().toLocaleString('it-IT')}</p>
            </div>
          </div>
        </div>
      `,
    });

    console.log('✅ Business email sent:', businessEmail);

    // Send confirmation email to user
    console.log('📨 Sending confirmation email to user...');
    const userEmail = await resend.emails.send({
      from: "MUV Fitness <noreply@muvfitness.it>",
      to: [safeEmail],
      subject: "Grazie per averci contattato - MUV Fitness",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; margin-bottom: 20px;">Grazie per averci contattato!</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              Ciao <strong>${safeName}</strong>,
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto, solitamente entro 24 ore.
            </p>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                <strong>Riepilogo della tua richiesta:</strong><br><br>
                ${safeMessage.substring(0, 200)}${safeMessage.length > 200 ? '...' : ''}
              </p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              Nel frattempo, puoi visitare il nostro sito per scoprire di più sui nostri servizi:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.muvfitness.it" style="display: inline-block; padding: 12px 30px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Visita il Sito
              </a>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              Per qualsiasi urgenza, puoi contattarci anche su WhatsApp al <strong>329 107 0374</strong>.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
              <p style="margin: 5px 0;"><strong>MUV Fitness Legnago</strong></p>
              <p style="margin: 5px 0;">Via Frattini 119, Legnago (VR)</p>
              <p style="margin: 5px 0;">WhatsApp: 329 107 0374 | Email: info@muvfitness.it</p>
              <p style="margin: 5px 0;">
                <a href="mailto:info@muvfitness.it" style="color: #2563eb; text-decoration: none;">info@muvfitness.it</a>
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log('✅ User confirmation sent:', userEmail);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email inviata con successo",
        businessEmailId: businessEmail.data?.id,
        userEmailId: userEmail.data?.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Si è verificato un errore durante l'invio dell'email",
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
