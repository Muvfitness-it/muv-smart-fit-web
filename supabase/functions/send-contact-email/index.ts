import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Updated CORS headers to include your domain
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
  telefono?: string;
  city: string;
  goal: string;
}

// Simple in-memory rate limiting (reset on function restart)
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 requests per minute per IP

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const clientData = rateLimitMap.get(ip) || { count: 0, lastReset: now };
  
  // Reset counter if window has passed
  if (now - clientData.lastReset > RATE_LIMIT_WINDOW) {
    clientData.count = 0;
    clientData.lastReset = now;
  }
  
  clientData.count++;
  rateLimitMap.set(ip, clientData);
  
  return clientData.count <= RATE_LIMIT_MAX_REQUESTS;
};

const validateInput = (data: any): string | null => {
  // Basic input validation and sanitization
  if (typeof data.name !== 'string' || data.name.trim().length < 2 || data.name.length > 100) {
    return 'Nome non valido';
  }
  if (typeof data.message !== 'string' || data.message.trim().length < 10 || data.message.length > 2000) {
    return 'Messaggio non valido (min 10, max 2000 caratteri)';
  }
  if (typeof data.city !== 'string' || data.city.trim().length < 2 || data.city.length > 100) {
    return 'Città non valida';
  }
  if (typeof data.goal !== 'string' || data.goal.trim().length < 2 || data.goal.length > 200) {
    return 'Obiettivo non valido';
  }
  
  // Check for potential spam patterns
  const spamPatterns = [
    /https?:\/\//gi,  // URLs
    /\b(bitcoin|crypto|forex|casino|viagra|cialis)\b/gi,  // Common spam words
    /(.)\1{10,}/gi,   // Repeated characters
  ];
  
  const fullText = `${data.name} ${data.message} ${data.city} ${data.goal}`.toLowerCase();
  for (const pattern of spamPatterns) {
    if (pattern.test(fullText)) {
      return 'Contenuto non consentito rilevato';
    }
  }
  
  return null;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    // Rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown';
    console.log(`Contact form request from IP: ${clientIP}`);
    
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Troppe richieste. Riprova tra qualche minuto." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const requestData: ContactEmailRequest = await req.json();

    // Validate and sanitize input
    const validationError = validateInput(requestData);
    if (validationError) {
      console.warn(`Validation failed: ${validationError}`, { ip: clientIP });
      return new Response(
        JSON.stringify({ error: validationError }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, message, telefono, city, goal } = requestData;

    // Validate required fields
    if (!name || !email || !message || !city || !goal) {
      return new Response(
        JSON.stringify({ error: "Campi obbligatori mancanti" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Formato email non valido" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize data
    const sanitizedData = {
      name: name.trim().substring(0, 100),
      email: email.trim().toLowerCase(),
      message: message.trim().substring(0, 2000),
      telefono: telefono?.trim().substring(0, 20),
      city: city.trim().substring(0, 100),
      goal: goal.trim().substring(0, 200)
    };

    console.log("Processing contact form submission:", { 
      name: sanitizedData.name, 
      email: sanitizedData.email, 
      city: sanitizedData.city, 
      goal: sanitizedData.goal,
      ip: clientIP
    });

    // Send email to business - Updated to use verified domain
    const businessEmailResponse = await resend.emails.send({
      from: "Centro MUV <noreply@muvfitness.it>",
      to: ["info@muvfitness.it"],
      subject: `Nuova richiesta di contatto da ${sanitizedData.name}`,
      html: `
        <h2>Nuova richiesta di contatto</h2>
        <p><strong>Nome:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Città:</strong> ${sanitizedData.city}</p>
        <p><strong>Obiettivo:</strong> ${sanitizedData.goal}</p>
        ${sanitizedData.telefono ? `<p><strong>Telefono:</strong> ${sanitizedData.telefono}</p>` : ''}
        <p><strong>Messaggio:</strong></p>
        <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Questo messaggio è stato inviato dal modulo contatti del sito web.</em></p>
        <p><small>IP del cliente: ${clientIP}</small></p>
      `,
    });

    console.log("Business email sent successfully:", businessEmailResponse.data?.id);

    // Send confirmation email to user - Updated to use verified domain
    const userEmailResponse = await resend.emails.send({
      from: "Centro MUV <noreply@muvfitness.it>",
      to: [sanitizedData.email],
      subject: "Conferma ricezione - Centro MUV",
      html: `
        <h2>Ciao ${sanitizedData.name}!</h2>
        <p>Grazie per averci contattato. Abbiamo ricevuto la tua richiesta per il check-up gratuito.</p>
        <p><strong>Il tuo messaggio:</strong></p>
        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${sanitizedData.message.replace(/\n/g, '<br>')}</p>
        <p>Ti contatteremo presto per fissare il tuo appuntamento per il check-up completo del valore di €80, completamente gratuito per te.</p>
        <p>A presto!</p>
        <p><strong>Il Team di Centro MUV</strong></p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          Centro MUV - Legnago<br>
          Tel: 3513380770<br>
          Email: info@muvfitness.it
        </p>
      `,
    });

    console.log("User confirmation email sent successfully:", userEmailResponse.data?.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email inviato con successo",
        businessEmailId: businessEmailResponse.data?.id,
        userEmailId: userEmailResponse.data?.id
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Errore nell'invio dell'email",
        details: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);