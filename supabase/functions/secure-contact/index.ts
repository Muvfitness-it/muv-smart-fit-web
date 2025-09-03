import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// Enhanced rate limiting with database persistence
async function checkRateLimit(ip: string, supabase: any): Promise<boolean> {
  const endpoint = 'secure-contact';
  const now = new Date();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 2; // Reduced from 3 to 2 for better security

  try {
    // Try to get existing rate limit record
    const { data: existing, error } = await supabase
      .from('secure_rate_limits')
      .select('*')
      .eq('identifier', ip)
      .eq('endpoint', endpoint)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Rate limit check error:', error);
      return false; // Fail secure
    }

    if (!existing) {
      // Create new rate limit record
      const { error: insertError } = await supabase
        .from('secure_rate_limits')
        .insert({
          identifier: ip,
          endpoint: endpoint,
          requests_count: 1,
          window_start: now
        });
      
      if (insertError) {
        console.error('Rate limit insert error:', insertError);
        return false; // Fail secure
      }
      return true;
    }

    const windowStart = new Date(existing.window_start);
    const timeDiff = now.getTime() - windowStart.getTime();

    if (timeDiff > windowMs) {
      // Reset window
      const { error: updateError } = await supabase
        .from('secure_rate_limits')
        .update({
          requests_count: 1,
          window_start: now
        })
        .eq('id', existing.id);
      
      if (updateError) {
        console.error('Rate limit reset error:', updateError);
        return false; // Fail secure
      }
      return true;
    }

    if (existing.requests_count >= maxRequests) {
      return false;
    }

    // Increment counter
    const { error: updateError } = await supabase
      .from('secure_rate_limits')
      .update({ requests_count: existing.requests_count + 1 })
      .eq('id', existing.id);
    
    if (updateError) {
      console.error('Rate limit increment error:', updateError);
      return false; // Fail secure
    }

    return true;
  } catch (error) {
    console.error('Rate limit check exception:', error);
    return false; // Fail secure
  }
}

// Remove token validation function - no longer needed

// Input sanitization and validation
function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // Remove potential XSS vectors
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .substring(0, 1000); // Limit length
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const resend = new Resend(Deno.env.get("re_4pBR8zBL_6dRXe2FPXKeGWKn3B6BsqpQ8"));

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

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
    // Enhanced rate limiting check with database
    const rateLimitPassed = await checkRateLimit(clientIP, supabase);
    if (!rateLimitPassed) {
      // Log security event
      await supabase.rpc('log_security_event_safe', {
        event_type_param: 'rate_limit_exceeded',
        event_data_param: { endpoint: 'secure-contact', ip: clientIP },
        ip_param: clientIP
      });

      return new Response(JSON.stringify({
        success: false,
        error: 'Troppe richieste. Riprova tra 15 minuti.'
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const bodyText = await req.text();
    let parsedBody;
    
    try {
      parsedBody = JSON.parse(bodyText);
    } catch (parseError) {
      console.error('Invalid JSON in request body:', parseError);
      return new Response(JSON.stringify({
        success: false,
        error: 'Formato dati non valido'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log('Request body parsed successfully:', Object.keys(parsedBody));

    // Remove token validation - now uses enhanced rate limiting and input validation

    // Enhanced validation with sanitization
    const name = sanitizeInput(parsedBody.name?.trim() || '');
    const email = sanitizeInput(parsedBody.email?.trim() || '');
    const message = sanitizeInput(parsedBody.message?.trim() || '');
    const city = sanitizeInput(parsedBody.city?.trim() || '');
    const goal = sanitizeInput(parsedBody.goal?.trim() || '');
    const telefono = sanitizeInput(parsedBody.telefono?.trim() || parsedBody.phone?.trim() || '');
    console.log('Validation data:', { 
      hasName: !!name, 
      hasEmail: !!email, 
      hasMessage: !!message,
      hasCity: !!city,
      hasGoal: !!goal
    });

    // Enhanced validation (telefono optional, city/goal optional)
    if (!name || !email || !message) {
      console.log('Missing required fields (name/email/message)');
      return new Response(JSON.stringify({
        success: false,
        error: 'Nome, email e messaggio sono obbligatori'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return new Response(JSON.stringify({
        success: false,
        error: 'Formato email non valido'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate message length
    if (message.length < 10 || message.length > 2000) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Il messaggio deve essere tra 10 e 2000 caratteri'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Enhanced spam detection
    const spamIndicators = [
      /https?:\/\//i,
      /www\./i,
      /\.(com|org|net|edu|info|biz)/i,
      /viagra|casino|lottery|prize|winner|loan|bitcoin|crypto/i,
      /click here|visit now|act now|limited time|urgent/i,
      /free money|guaranteed|100%|earn \$|make money/i,
      /investment|trading|forex|binary options/i
    ];

    const suspiciousPatterns = [
      /(.)\1{4,}/, // Repeated characters
      /[A-Z]{5,}/, // Excessive caps
      /\d{10,}/, // Long numbers (potential phone spam)
    ];

    const isSpam = spamIndicators.some(pattern => 
      pattern.test(message) || pattern.test(name)
    );

    const isSuspicious = suspiciousPatterns.some(pattern =>
      pattern.test(message) || pattern.test(name)
    );

    if (isSpam || isSuspicious) {
      // Log security event
      await supabase.rpc('log_security_event_safe', {
        event_type_param: 'spam_detected',
        event_data_param: { 
          endpoint: 'secure-contact',
          name_length: name.length,
          message_length: message.length,
          has_urls: /https?:\/\//.test(message)
        },
        ip_param: clientIP
      });

      return new Response(JSON.stringify({
        success: false,
        error: 'Contenuto non consentito rilevato'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log('Processing secure contact form submission:', { 
      name, 
      email, 
      city, 
      goal, 
      ip: clientIP
    });

    // Store lead tracking data with enhanced security fields
    const { error: leadError } = await supabase
      .from('lead_tracking')
      .insert({
        session_id: parsedBody.csrfToken || crypto.randomUUID(),
        ip_address: clientIP,
        user_agent: req.headers.get('user-agent'),
        landing_page: '/contatti',
        form_submissions: 1,
        conversion_value: 50,
        referrer: req.headers.get('referer')
      });

    if (leadError) {
      console.warn('Lead tracking insert failed:', leadError);
    }

    // Send business notification email with enhanced error handling
    let businessEmailResult;
    try {
      console.log('Attempting to send business notification email...');
      businessEmailResult = await resend.emails.send({
        from: 'MUV Fitness <info@muvfitness.it>',
        to: ['info@muvfitness.it'],
        subject: `Nuovo contatto dal sito: ${escapeHtml(name)}`,
        html: `
          <h2>Nuovo messaggio di contatto</h2>
          <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Telefono:</strong> ${escapeHtml(telefono || 'Non fornito')}</p>
          <p><strong>Città:</strong> ${escapeHtml(city)}</p>
          <p><strong>Obiettivo:</strong> ${escapeHtml(goal)}</p>
          <p><strong>Messaggio:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>IP: ${escapeHtml(clientIP)} | Data: ${new Date().toLocaleString('it-IT')}</small></p>
        `,
      });
      console.log('Business email sent successfully:', businessEmailResult.data?.id);
    } catch (emailError) {
      console.error('Failed to send business email:', emailError);
      // Continue processing even if business email fails
    }

    // Send user confirmation email with enhanced error handling
    let userEmailResult;
    try {
      console.log('Attempting to send user confirmation email...');
      userEmailResult = await resend.emails.send({
        from: 'MUV Fitness <info@muvfitness.it>',
        to: [email],
        subject: 'Grazie per averci contattato - MUV Fitness',
        html: `
          <h2>Ciao ${escapeHtml(name)}!</h2>
          <p>Grazie per averci contattato. Abbiamo ricevuto il tuo messaggio e ti risponderemo al più presto.</p>
          
          <h3>Riepilogo del tuo messaggio:</h3>
          <p><strong>Città:</strong> ${escapeHtml(city)}</p>
          <p><strong>Obiettivo:</strong> ${escapeHtml(goal)}</p>
          <p><strong>Messaggio:</strong> ${escapeHtml(message)}</p>
          
          <p>Il nostro team ti contatterà entro 24 ore per fornirti tutte le informazioni di cui hai bisogno.</p>
          
          <p>A presto,<br>Il team MUV Fitness</p>
          
          <hr>
          <p><small>Questo è un messaggio automatico, non rispondere a questa email.</small></p>
        `,
      });
      console.log('User confirmation email sent successfully:', userEmailResult.data?.id);
    } catch (emailError) {
      console.error('Failed to send user confirmation email:', emailError);
      // Continue processing even if user email fails
    }

    // Log security audit event (without PII) - using new safe function
    try {
      await supabase.rpc('log_security_event_safe', {
        event_type_param: 'contact_form_submission',
        event_data_param: {
          message_length: message.length,
          city_provided: !!city,
          goal_provided: !!goal,
          business_email_sent: !!businessEmailResult?.data,
          user_email_sent: !!userEmailResult?.data,
          timestamp: new Date().toISOString()
        },
        ip_param: clientIP
      });
    } catch (logError) {
      console.error('Failed to log security audit event:', logError);
    }

    // Always return success to user even if emails partially failed
    const emailStatus = businessEmailResult?.data ? 'sent' : 'failed';
    console.log('Form submission completed. Email status:', emailStatus);

    return new Response(JSON.stringify({
      success: true,
      message: emailStatus === 'sent' 
        ? 'Messaggio inviato con successo. Riceverai una conferma via email.'
        : 'Messaggio ricevuto con successo. Ti contatteremo al più presto.'
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Error in secure-contact function:', {
      error: error.message,
      ip: clientIP,
      timestamp: new Date().toISOString()
    });
    
    // Log security event for errors
    try {
      await supabase.rpc('log_security_event_safe', {
        event_type_param: 'contact_form_error',
        event_data_param: { 
          error_message: error.message,
          endpoint: 'secure-contact'
        },
        ip_param: clientIP
      });
    } catch (logError) {
      console.error('Failed to log security event:', logError);
    }
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Errore del server. Riprova più tardi.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});