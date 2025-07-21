
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface BookingEmailRequest {
  type: 'confirmation' | 'status_change';
  booking: {
    id: string;
    service_type: string;
    preferred_date: string;
    preferred_time: string;
    client_name: string;
    client_email: string;
    client_phone?: string;
    message?: string;
    status: string;
    duration_minutes: number;
  };
  previous_status?: string;
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

const generateGoogleCalendarLink = (booking: any) => {
  const serviceLabel = serviceLabels[booking.service_type as keyof typeof serviceLabels] || booking.service_type;
  const startDate = new Date(`${booking.preferred_date}T${booking.preferred_time}`);
  const endDate = new Date(startDate.getTime() + (booking.duration_minutes || 60) * 60000);
  
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${serviceLabel} - MUV Wellness`,
    dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
    details: `Appuntamento presso MUV Wellness Studio\nServizio: ${serviceLabel}\nNote: ${booking.message || 'Nessuna nota'}`,
    location: 'MUV Wellness Studio, Legnago'
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const getConfirmationEmailTemplate = (booking: any) => {
  const serviceLabel = serviceLabels[booking.service_type as keyof typeof serviceLabels] || booking.service_type;
  const formattedDate = new Date(booking.preferred_date).toLocaleDateString('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">✅ Prenotazione Ricevuta!</h1>
        <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Grazie per aver scelto MUV Wellness</p>
      </div>
      
      <div style="padding: 30px;">
        <p style="font-size: 18px; color: #333; margin-bottom: 25px;">
          Ciao <strong>${booking.client_name}</strong>! 👋
        </p>
        
        <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
          Abbiamo ricevuto la tua richiesta di prenotazione. Il nostro team la esaminerà e ti confermerà l'appuntamento entro <strong style="color: #667eea;">2 ore</strong>.
        </p>
        
        <div style="background: #f8fafc; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
          <h3 style="color: #667eea; margin: 0 0 15px 0; font-size: 18px;">📋 Dettagli della tua prenotazione:</h3>
          <p style="margin: 8px 0; color: #333;"><strong>Servizio:</strong> ${serviceLabel}</p>
          <p style="margin: 8px 0; color: #333;"><strong>Data:</strong> ${formattedDate}</p>
          <p style="margin: 8px 0; color: #333;"><strong>Orario:</strong> ${booking.preferred_time}</p>
          <p style="margin: 8px 0; color: #333;"><strong>Durata:</strong> ${booking.duration_minutes} minuti</p>
          ${booking.message ? `<p style="margin: 8px 0; color: #333;"><strong>Note:</strong> ${booking.message}</p>` : ''}
        </div>
        
        <div style="background: #ecfdf5; border: 1px solid #d1fae5; padding: 20px; margin: 25px 0; border-radius: 8px;">
          <h3 style="color: #065f46; margin: 0 0 15px 0; font-size: 16px;">🏃‍♂️ Cosa succede ora?</h3>
          <ul style="color: #065f46; margin: 0; padding-left: 20px; line-height: 1.6;">
            <li>Esamineremo la tua richiesta</li>
            <li>Ti confermeremo l'appuntamento via email</li>
            <li>Riceverai tutte le informazioni necessarie</li>
          </ul>
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
          Questo messaggio è stato inviato automaticamente. Non rispondere a questa email.
        </p>
      </div>
    </div>
  `;
};

const getStatusChangeEmailTemplate = (booking: any, previousStatus: string) => {
  const serviceLabel = serviceLabels[booking.service_type as keyof typeof serviceLabels] || booking.service_type;
  const formattedDate = new Date(booking.preferred_date).toLocaleDateString('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const statusMessages = {
    confirmed: {
      title: '🎉 Prenotazione Confermata!',
      message: 'La tua prenotazione è stata confermata con successo!',
      color: '#10b981',
      bgColor: '#ecfdf5',
      borderColor: '#d1fae5'
    },
    cancelled: {
      title: '❌ Prenotazione Annullata',
      message: 'La tua prenotazione è stata annullata.',
      color: '#ef4444',
      bgColor: '#fef2f2',
      borderColor: '#fecaca'
    },
    completed: {
      title: '✅ Sessione Completata',
      message: 'La tua sessione è stata completata con successo!',
      color: '#3b82f6',
      bgColor: '#eff6ff',
      borderColor: '#bfdbfe'
    }
  };
  
  const statusInfo = statusMessages[booking.status as keyof typeof statusMessages];
  const calendarLink = booking.status === 'confirmed' ? generateGoogleCalendarLink(booking) : null;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">${statusInfo.title}</h1>
      </div>
      
      <div style="padding: 30px;">
        <p style="font-size: 18px; color: #333; margin-bottom: 25px;">
          Ciao <strong>${booking.client_name}</strong>! 👋
        </p>
        
        <div style="background: ${statusInfo.bgColor}; border: 1px solid ${statusInfo.borderColor}; padding: 20px; margin: 25px 0; border-radius: 8px;">
          <p style="color: ${statusInfo.color}; font-size: 16px; margin: 0; font-weight: 600;">
            ${statusInfo.message}
          </p>
        </div>
        
        <div style="background: #f8fafc; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
          <h3 style="color: #667eea; margin: 0 0 15px 0; font-size: 18px;">📋 Dettagli appuntamento:</h3>
          <p style="margin: 8px 0; color: #333;"><strong>Servizio:</strong> ${serviceLabel}</p>
          <p style="margin: 8px 0; color: #333;"><strong>Data:</strong> ${formattedDate}</p>
          <p style="margin: 8px 0; color: #333;"><strong>Orario:</strong> ${booking.preferred_time}</p>
          <p style="margin: 8px 0; color: #333;"><strong>Durata:</strong> ${booking.duration_minutes} minuti</p>
        </div>
        
        ${calendarLink ? `
          <div style="text-align: center; margin: 30px 0;">
            <a href="${calendarLink}" 
               style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
              📅 Aggiungi a Google Calendar
            </a>
          </div>
        ` : ''}
        
        ${booking.status === 'confirmed' ? `
          <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 20px; margin: 25px 0; border-radius: 8px;">
            <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 16px;">💡 Informazioni utili:</h3>
            <ul style="color: #0369a1; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Arriva 10 minuti prima dell'appuntamento</li>
              <li>Porta abbigliamento comodo e scarpe da ginnastica</li>
              <li>Porta una bottiglia d'acqua</li>
              <li>Se hai problemi fisici, informaci prima della sessione</li>
            </ul>
          </div>
        ` : ''}
        
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
          Questo messaggio è stato inviato automaticamente. Non rispondere a questa email.
        </p>
      </div>
    </div>
  `;
};

const getAdminNotificationTemplate = (booking: any, type: 'new' | 'status_change') => {
  const serviceLabel = serviceLabels[booking.service_type as keyof typeof serviceLabels] || booking.service_type;
  const formattedDate = new Date(booking.preferred_date).toLocaleDateString('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  if (type === 'new') {
    return `
      <h2>🆕 Nuova Prenotazione Ricevuta</h2>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Dettagli Cliente:</h3>
        <p><strong>Nome:</strong> ${booking.client_name}</p>
        <p><strong>Email:</strong> ${booking.client_email}</p>
        <p><strong>Telefono:</strong> ${booking.client_phone || 'Non fornito'}</p>
        
        <h3>Dettagli Prenotazione:</h3>
        <p><strong>Servizio:</strong> ${serviceLabel}</p>
        <p><strong>Data:</strong> ${formattedDate}</p>
        <p><strong>Orario:</strong> ${booking.preferred_time}</p>
        <p><strong>Durata:</strong> ${booking.duration_minutes} minuti</p>
        <p><strong>ID Prenotazione:</strong> #${booking.id.slice(0, 8)}</p>
        
        ${booking.message ? `
          <h3>Note del Cliente:</h3>
          <p style="background: #fff; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">${booking.message}</p>
        ` : ''}
      </div>
      
      <p><strong>Azione richiesta:</strong> Accedi al pannello di gestione per confermare o gestire questa prenotazione.</p>
      
      <hr>
      <p style="color: #666; font-size: 12px;">
        Ricevuto dal sistema di prenotazioni MUV Wellness Studio
      </p>
    `;
  }
  
  return `
    <h2>📝 Aggiornamento Stato Prenotazione</h2>
    <p>Lo stato della prenotazione #${booking.id.slice(0, 8)} è stato aggiornato a: <strong>${booking.status}</strong></p>
    
    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p><strong>Cliente:</strong> ${booking.client_name} (${booking.client_email})</p>
      <p><strong>Servizio:</strong> ${serviceLabel}</p>
      <p><strong>Data:</strong> ${formattedDate} alle ${booking.preferred_time}</p>
    </div>
    
    <hr>
    <p style="color: #666; font-size: 12px;">
      Notifica automatica dal sistema di gestione prenotazioni
    </p>
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
    const { type, booking, previous_status }: BookingEmailRequest = await req.json();

    console.log("Processing booking email:", { type, bookingId: booking.id, status: booking.status });

    // Email al cliente
    let customerEmailHtml = '';
    let customerSubject = '';
    
    if (type === 'confirmation') {
      customerEmailHtml = getConfirmationEmailTemplate(booking);
      customerSubject = '✅ Prenotazione ricevuta - MUV Wellness';
    } else {
      customerEmailHtml = getStatusChangeEmailTemplate(booking, previous_status || '');
      const statusLabels = {
        confirmed: 'confermata',
        cancelled: 'annullata',
        completed: 'completata'
      };
      customerSubject = `🔄 Prenotazione ${statusLabels[booking.status as keyof typeof statusLabels] || booking.status} - MUV Wellness`;
    }

    // Invio email al cliente
    const customerEmailResponse = await resend.emails.send({
      from: "MUV Wellness <noreply@muvfitness.it>",
      to: [booking.client_email],
      subject: customerSubject,
      html: customerEmailHtml,
    });

    console.log("Customer email sent:", customerEmailResponse);

    // Email all'admin (solo per nuove prenotazioni)
    if (type === 'confirmation') {
      const adminEmailResponse = await resend.emails.send({
        from: "MUV Wellness <noreply@muvfitness.it>",
        to: ["info@muvfitness.it"],
        subject: `🆕 Nuova prenotazione da ${booking.client_name}`,
        html: getAdminNotificationTemplate(booking, 'new'),
      });

      console.log("Admin notification sent:", adminEmailResponse);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email inviate con successo",
        customerEmailId: customerEmailResponse.data?.id
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
    console.error("Error in send-booking-email function:", error);
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
