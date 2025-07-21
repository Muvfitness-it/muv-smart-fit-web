import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import { Resend } from "npm:resend@2.0.0";

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface BookingReminderRequest {
  type: '24h' | '2h' | 'follow_up';
  hours_before?: number;
}

const serviceLabels = {
  'personal-training': 'Personal Training',
  'ems': 'Allenamento EMS',
  'pancafit': 'Pancafit',
  'pilates': 'Pilates Reformer',
  'hiit': 'HIIT Training',
  'small-group': 'Small Group',
  'consulenza': 'Consulenza Nutrizionale',
  'massoterapia': 'Massoterapia'
};

const generateCancelToken = async (bookingId: string): Promise<string> => {
  const token = crypto.randomUUID();
  const tokenHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
  const hashString = Array.from(new Uint8Array(tokenHash))
    .map(b => b.toString(16).padStart(2, '0')).join('');
  
  // Salva il token nel database
  await supabase.from('booking_tokens').insert({
    booking_id: bookingId,
    token_type: 'cancel',
    token_hash: hashString,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 giorni
  });
  
  return token;
};

const generateModifyToken = async (bookingId: string): Promise<string> => {
  const token = crypto.randomUUID();
  const tokenHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
  const hashString = Array.from(new Uint8Array(tokenHash))
    .map(b => b.toString(16).padStart(2, '0')).join('');
  
  await supabase.from('booking_tokens').insert({
    booking_id: bookingId,
    token_type: 'modify',
    token_hash: hashString,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  });
  
  return token;
};

const getReminder24hTemplate = async (booking: any) => {
  const serviceLabel = serviceLabels[booking.service_type as keyof typeof serviceLabels] || booking.service_type;
  const formattedDate = new Date(booking.preferred_date).toLocaleDateString('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const cancelToken = await generateCancelToken(booking.id);
  const modifyToken = await generateModifyToken(booking.id);
  const baseUrl = 'https://muvfitness.it';
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">⏰ Promemoria Appuntamento</h1>
        <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Il tuo appuntamento è domani!</p>
      </div>
      
      <div style="padding: 30px;">
        <p style="font-size: 18px; color: #333; margin-bottom: 25px;">
          Ciao <strong>${booking.client_name}</strong>! 👋
        </p>
        
        <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 20px; margin: 25px 0; border-radius: 8px;">
          <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 18px;">📅 Il tuo appuntamento è tra 24 ore!</h3>
          <p style="margin: 8px 0; color: #333;"><strong>Servizio:</strong> ${serviceLabel}</p>
          <p style="margin: 8px 0; color: #333;"><strong>Data:</strong> ${formattedDate}</p>
          <p style="margin: 8px 0; color: #333;"><strong>Orario:</strong> ${booking.preferred_time}</p>
          <p style="margin: 8px 0; color: #333;"><strong>Durata:</strong> ${booking.duration_minutes} minuti</p>
        </div>
        
        <div style="background: #ecfdf5; border: 1px solid #d1fae5; padding: 20px; margin: 25px 0; border-radius: 8px;">
          <h3 style="color: #065f46; margin: 0 0 15px 0; font-size: 16px;">💡 Preparati per la sessione:</h3>
          <ul style="color: #065f46; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>Indossa abbigliamento comodo e scarpe da ginnastica</li>
            <li>Porta una bottiglia d'acqua</li>
            <li>Arriva 10 minuti prima dell'orario</li>
            <li>Se hai problemi fisici, informaci prima della sessione</li>
          </ul>
        </div>
        
        <div style="background: #fff7ed; border: 1px solid #fed7aa; padding: 20px; margin: 25px 0; border-radius: 8px;">
          <h3 style="color: #c2410c; margin: 0 0 15px 0; font-size: 16px;">🔄 Hai bisogno di modificare l'appuntamento?</h3>
          <p style="color: #c2410c; margin-bottom: 15px;">Clicca sui pulsanti qui sotto:</p>
          <div style="text-align: center; gap: 10px;">
            <a href="${baseUrl}/booking-modify?token=${modifyToken}" 
               style="display: inline-block; background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: 600;">
              📝 Modifica Appuntamento
            </a>
            <a href="${baseUrl}/booking-cancel?token=${cancelToken}" 
               style="display: inline-block; background: #ef4444; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: 600;">
              ❌ Annulla Appuntamento
            </a>
          </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #666; margin-bottom: 15px;">Hai domande? Contattaci!</p>
          <div style="display: inline-block; text-align: left;">
            <p style="margin: 5px 0; color: #333;">📞 <strong>Telefono:</strong> 3513380770</p>
            <p style="margin: 5px 0; color: #333;">📧 <strong>Email:</strong> info@muvfitness.it</p>
            <p style="margin: 5px 0; color: #333;">📍 <strong>Indirizzo:</strong> Legnago</p>
          </div>
        </div>
      </div>
      
      <div style="background: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; margin: 0; font-size: 14px;">
          <strong>MUV Wellness Studio</strong> - La tua trasformazione inizia qui
        </p>
        <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 12px;">
          Questo messaggio è stato inviato automaticamente.
        </p>
      </div>
    </div>
  `;
};

const getReminder2hTemplate = async (booking: any) => {
  const serviceLabel = serviceLabels[booking.service_type as keyof typeof serviceLabels] || booking.service_type;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🚨 Appuntamento tra 2 ore!</h1>
        <p style="color: #fef3c7; margin: 10px 0 0 0; font-size: 16px;">È quasi ora della tua sessione</p>
      </div>
      
      <div style="padding: 30px;">
        <p style="font-size: 18px; color: #333; margin-bottom: 25px;">
          Ciao <strong>${booking.client_name}</strong>! 🏃‍♂️
        </p>
        
        <div style="background: #fef3c7; border: 1px solid #fbbf24; padding: 20px; margin: 25px 0; border-radius: 8px;">
          <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px;">⚡ Il tuo appuntamento è tra 2 ore!</h3>
          <p style="margin: 8px 0; color: #333;"><strong>Servizio:</strong> ${serviceLabel}</p>
          <p style="margin: 8px 0; color: #333;"><strong>Orario:</strong> ${booking.preferred_time}</p>
          <p style="margin: 8px 0; color: #333;"><strong>Durata:</strong> ${booking.duration_minutes} minuti</p>
        </div>
        
        <div style="background: #dbeafe; border: 1px solid #93c5fd; padding: 20px; margin: 25px 0; border-radius: 8px;">
          <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 16px;">📍 Come raggiungerci:</h3>
          <p style="color: #1e40af; margin: 0; line-height: 1.6;">
            <strong>MUV Wellness Studio</strong><br>
            Legnago<br><br>
            💡 <em>Ricorda di arrivare 10 minuti prima per il check-in!</em>
          </p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #666; margin-bottom: 15px;">Hai domande dell'ultimo minuto?</p>
          <div style="display: inline-block; text-align: left;">
            <p style="margin: 5px 0; color: #333;">📞 <strong>Telefono:</strong> 3513380770</p>
            <p style="margin: 5px 0; color: #333;">📧 <strong>Email:</strong> info@muvfitness.it</p>
          </div>
        </div>
      </div>
      
      <div style="background: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; margin: 0; font-size: 14px;">
          <strong>MUV Wellness Studio</strong> - Ci vediamo tra poco!
        </p>
      </div>
    </div>
  `;
};

const getFollowUpTemplate = (booking: any) => {
  const serviceLabel = serviceLabels[booking.service_type as keyof typeof serviceLabels] || booking.service_type;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">💪 Complimenti per la sessione!</h1>
        <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">Come è andata la tua esperienza?</p>
      </div>
      
      <div style="padding: 30px;">
        <p style="font-size: 18px; color: #333; margin-bottom: 25px;">
          Ciao <strong>${booking.client_name}</strong>! 🎉
        </p>
        
        <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
          Speriamo che la tua sessione di <strong>${serviceLabel}</strong> sia stata fantastica! Il tuo benessere è la nostra priorità.
        </p>
        
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; margin: 25px 0; border-radius: 8px;">
          <h3 style="color: #16a34a; margin: 0 0 15px 0; font-size: 16px;">🌟 Aiutaci a migliorare!</h3>
          <p style="color: #16a34a; margin-bottom: 15px;">La tua opinione è preziosa per noi. Hai 2 minuti per condividere la tua esperienza?</p>
          <div style="text-align: center;">
            <a href="https://muvfitness.it/feedback" 
               style="display: inline-block; background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
              ⭐ Lascia una Recensione
            </a>
          </div>
        </div>
        
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 20px; margin: 25px 0; border-radius: 8px;">
          <h3 style="color: #2563eb; margin: 0 0 15px 0; font-size: 16px;">🎯 Continua il tuo percorso!</h3>
          <p style="color: #2563eb; margin-bottom: 15px;">Vuoi prenotare la prossima sessione? Mantieni il momentum!</p>
          <div style="text-align: center;">
            <a href="https://muvfitness.it/prenotazioni" 
               style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
              📅 Prenota Prossima Sessione
            </a>
          </div>
        </div>
        
        <div style="background: #fef7ff; border: 1px solid #f3e8ff; padding: 20px; margin: 25px 0; border-radius: 8px;">
          <h3 style="color: #7c3aed; margin: 0 0 15px 0; font-size: 16px;">💬 Seguici sui social!</h3>
          <p style="color: #7c3aed; margin-bottom: 15px;">Condividi la tua esperienza e ispira altri nel loro percorso di benessere!</p>
          <div style="text-align: center;">
            <p style="color: #7c3aed; margin: 0;">
              📱 <strong>@muvwellness</strong> su Instagram e Facebook
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #666; margin-bottom: 15px;">Hai domande o feedback?</p>
          <div style="display: inline-block; text-align: left;">
            <p style="margin: 5px 0; color: #333;">📞 <strong>Telefono:</strong> 3513380770</p>
            <p style="margin: 5px 0; color: #333;">📧 <strong>Email:</strong> info@muvfitness.it</p>
          </div>
        </div>
      </div>
      
      <div style="background: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; margin: 0; font-size: 14px;">
          <strong>MUV Wellness Studio</strong> - Grazie per aver scelto noi per il tuo benessere
        </p>
        <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 12px;">
          Non vuoi più ricevere questi messaggi? <a href="#" style="color: #94a3b8;">Disiscriviti qui</a>
        </p>
      </div>
    </div>
  `;
};

const handler = async (req: Request): Promise<Response> => {
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
    const { type, hours_before }: BookingReminderRequest = await req.json();

    console.log("Processing booking reminders:", { type, hours_before });

    let query;
    let emailSubject = '';
    let emailTemplate: (booking: any) => Promise<string> | string;

    if (type === '24h') {
      // Trova prenotazioni confermate per domani
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      
      query = supabase
        .from('bookings')
        .select('*')
        .eq('status', 'confirmed')
        .eq('preferred_date', tomorrowStr);
        
      emailSubject = '⏰ Promemoria: Appuntamento domani - MUV Wellness';
      emailTemplate = getReminder24hTemplate;
      
    } else if (type === '2h') {
      // Trova prenotazioni confermate per oggi che iniziano tra 2 ore
      const now = new Date();
      const in2Hours = new Date(now.getTime() + 2 * 60 * 60 * 1000);
      const todayStr = now.toISOString().split('T')[0];
      
      const timeStart = in2Hours.toTimeString().split(' ')[0].substring(0, 5);
      const timeEnd = new Date(in2Hours.getTime() + 30 * 60 * 1000).toTimeString().split(' ')[0].substring(0, 5);
      
      query = supabase
        .from('bookings')
        .select('*')
        .eq('status', 'confirmed')
        .eq('preferred_date', todayStr)
        .gte('preferred_time', timeStart)
        .lte('preferred_time', timeEnd);
        
      emailSubject = '🚨 Promemoria: Appuntamento tra 2 ore - MUV Wellness';
      emailTemplate = getReminder2hTemplate;
      
    } else if (type === 'follow_up') {
      // Trova prenotazioni completate oggi
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      
      query = supabase
        .from('bookings')
        .select('*')
        .eq('status', 'completed')
        .eq('preferred_date', todayStr);
        
      emailSubject = '💪 Grazie per la sessione! - MUV Wellness';
      emailTemplate = getFollowUpTemplate;
    }

    if (!query) {
      throw new Error('Tipo di promemoria non valido');
    }

    const { data: bookings, error } = await query;
    if (error) throw error;

    console.log(`Found ${bookings?.length || 0} bookings for ${type} reminders`);

    const emailPromises = bookings?.map(async (booking) => {
      try {
        const htmlContent = await emailTemplate(booking);
        
        const emailResponse = await resend.emails.send({
          from: "MUV Wellness <noreply@muvfitness.it>",
          to: [booking.client_email],
          subject: emailSubject,
          html: htmlContent,
        });

        console.log(`Email sent to ${booking.client_email}:`, emailResponse);
        return { success: true, bookingId: booking.id, emailId: emailResponse.data?.id };
      } catch (error) {
        console.error(`Failed to send email to ${booking.client_email}:`, error);
        return { success: false, bookingId: booking.id, error: error.message };
      }
    }) || [];

    const results = await Promise.all(emailPromises);
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Inviate ${successful} email di promemoria (${failed} fallite)`,
        results: {
          total: bookings?.length || 0,
          successful,
          failed,
          details: results
        }
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
    console.error("Error in booking-reminders function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Errore nell'invio dei promemoria",
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