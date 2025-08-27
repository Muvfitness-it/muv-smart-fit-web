import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://muv-fitness.lovable.app',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// Rate limiting
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 requests per 10 minutes

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const clientData = rateLimitMap.get(ip) || { count: 0, lastReset: now };
  
  if (now - clientData.lastReset > RATE_LIMIT_WINDOW) {
    clientData.count = 0;
    clientData.lastReset = now;
  }
  
  clientData.count++;
  rateLimitMap.set(ip, clientData);
  
  return clientData.count <= RATE_LIMIT_MAX_REQUESTS;
};

// HMAC signature validation
const validateHmacSignature = async (body: string, signature: string): Promise<boolean> => {
  try {
    const secret = Deno.env.get('AI_ACCESS_KEY');
    if (!secret) return false;

    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(body);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Remove 'sha256=' prefix if present
    const providedSignature = signature.replace(/^sha256=/, '');
    
    return expectedSignature === providedSignature;
  } catch (error) {
    console.error('HMAC validation error:', error);
    return false;
  }
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  const clientIP = req.headers.get('x-forwarded-for') || 
                  req.headers.get('cf-connecting-ip') || 
                  req.headers.get('x-real-ip') || 'unknown';

  console.log('Secure contact form request from IP:', clientIP);

  try {
    // Rate limiting
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Troppi tentativi. Riprova tra 10 minuti.' }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const bodyText = await req.text();
    let body;
    
    try {
      body = JSON.parse(bodyText);
    } catch (parseError) {
      console.error('Invalid JSON in request body:', parseError);
      return new Response(
        JSON.stringify({ error: 'Formato dati non valido' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // HMAC signature validation for additional security
    const signature = req.headers.get('x-signature');
    if (signature) {
      const isValidSignature = await validateHmacSignature(bodyText, signature);
      if (!isValidSignature) {
        console.warn('Invalid HMAC signature', { ip: clientIP });
        return new Response(
          JSON.stringify({ error: 'Firma di sicurezza non valida' }),
          { 
            status: 401, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    const { name, email, message, telefono, city, goal, csrfToken, timestamp } = body;

    // Enhanced validation
    if (!name || !email || !message || !city || !goal) {
      return new Response(
        JSON.stringify({ error: 'Tutti i campi obbligatori devono essere compilati' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Formato email non valido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate message length and content
    if (message.length < 10 || message.length > 2000) {
      return new Response(
        JSON.stringify({ error: 'Il messaggio deve essere tra 10 e 2000 caratteri' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check for suspicious content (basic spam detection)
    const suspiciousPatterns = [
      /https?:\/\/[^\s]+/gi, // URLs
      /\b(viagra|casino|loan|lottery|prize|winner)\b/gi, // Common spam keywords
      /(.)\1{4,}/gi, // Repeated characters
    ];

    const isSuspicious = suspiciousPatterns.some(pattern => 
      pattern.test(name) || pattern.test(message)
    );

    if (isSuspicious) {
      console.warn('Suspicious content detected', { ip: clientIP, name, message: message.substring(0, 100) });
      // Still process but flag for review
    }

    console.log('Processing secure contact form submission:', { 
      name, 
      email, 
      city, 
      goal, 
      ip: clientIP,
      suspicious: isSuspicious
    });

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Store lead tracking data with enhanced security fields
    const { error: leadError } = await supabase
      .from('lead_tracking')
      .insert({
        session_id: csrfToken || crypto.randomUUID(),
        ip_address: clientIP,
        user_agent: req.headers.get('user-agent'),
        landing_page: '/contatti',
        form_submissions: 1,
        conversion_value: isSuspicious ? -1 : 50, // Negative value flags suspicious
        referrer: req.headers.get('referer')
      });

    if (leadError) {
      console.warn('Lead tracking insert failed:', leadError);
    }

    // Send business notification email
    const businessEmailResponse = await resend.emails.send({
      from: "MUV Fitness <contatti@muvfitness.it>",
      to: ["info@muvfitness.it"],
      subject: `${isSuspicious ? '[SOSPETTO] ' : ''}Nuovo contatto dal sito web - ${name}`,
      html: `
        <h2>Nuovo contatto dal sito web</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefono:</strong> ${telefono || 'Non fornito'}</p>
        <p><strong>Città:</strong> ${city}</p>
        <p><strong>Obiettivo:</strong> ${goal}</p>
        <p><strong>Messaggio:</strong></p>
        <blockquote style="border-left: 3px solid #ccc; padding-left: 10px; margin: 10px 0;">
          ${message.replace(/\n/g, '<br>')}
        </blockquote>
        <hr>
        <p><small>
          <strong>Dettagli tecnici:</strong><br>
          IP: ${clientIP}<br>
          User Agent: ${req.headers.get('user-agent')}<br>
          Timestamp: ${new Date().toISOString()}<br>
          ${isSuspicious ? '<strong>⚠️ CONTENUTO SOSPETTO RILEVATO</strong><br>' : ''}
        </small></p>
      `,
    });

    console.log('Business email sent successfully:', businessEmailResponse.data?.id);

    // Send user confirmation email
    const userEmailResponse = await resend.emails.send({
      from: "MUV Fitness <contatti@muvfitness.it>",
      to: [email],
      subject: "Grazie per averci contattato - MUV Fitness",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Ciao ${name}!</h2>
          <p>Grazie per averci contattato. Abbiamo ricevuto il tuo messaggio e ti risponderemo il prima possibile.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">I tuoi dati:</h3>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Città:</strong> ${city}</p>
            <p><strong>Obiettivo:</strong> ${goal}</p>
          </div>
          
          <p>Nel frattempo, puoi visitare il nostro sito per scoprire di più sui nostri servizi:</p>
          <ul>
            <li><a href="https://www.muvfitness.it/servizi">I nostri servizi</a></li>
            <li><a href="https://www.muvfitness.it/team">Il nostro team</a></li>
            <li><a href="https://www.muvfitness.it/blog">Blog e consigli</a></li>
          </ul>
          
          <hr style="margin: 30px 0;">
          <p style="font-size: 12px; color: #666;">
            MUV Fitness - Centro Benessere<br>
            Via Roma, 123 - Legnago (VR)<br>
            Tel: 045 123456<br>
            Email: info@muvfitness.it
          </p>
        </div>
      `,
    });

    console.log('User confirmation email sent successfully:', userEmailResponse.data?.id);

    // Log security audit event
    const { error: auditError } = await supabase.rpc('audit_security_event', {
      event_type_param: 'contact_form_submission',
      event_data_param: {
        contact_name: name,
        contact_email: email,
        contact_city: city,
        suspicious_content: isSuspicious,
        ip_address: clientIP,
        form_goal: goal
      }
    });

    if (auditError) {
      console.warn('Security audit logging failed:', auditError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Messaggio inviato con successo',
        businessEmailId: businessEmailResponse.data?.id,
        userEmailId: userEmailResponse.data?.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in secure-contact function:', {
      error: error.message,
      ip: clientIP,
      timestamp: new Date().toISOString()
    });
    
    return new Response(
      JSON.stringify({ 
        error: 'Errore del server. Riprova più tardi.',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});