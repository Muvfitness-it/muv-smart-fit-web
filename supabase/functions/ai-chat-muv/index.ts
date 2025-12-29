import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

const MUV_CONTEXT = `Sei MUV Assistant, l'assistente virtuale di MUV Fitness, un centro fitness premium a Legnago (Verona).

INFORMAZIONI SU MUV FITNESS:
- Indirizzo: Via San Pietro 50, Legnago (VR)
- Orari: Lun-Ven 7:00-21:00, Sab 8:00-13:00
- Telefono: +39 0442 23456
- WhatsApp: +39 333 1234567

SERVIZI PRINCIPALI:
1. EMS Training (Elettrostimolazione Muscolare) - 20 minuti = 2 ore di palestra tradizionale
2. Pilates Reformer - Per postura, flessibilità e tonificazione
3. Personal Training 1-to-1 - Allenamenti personalizzati con trainer dedicato
4. Vacuum/Pressoterapia - Per cellulite e ritenzione idrica
5. Sauna Infrarossi - Detox e relax
6. Small Group Training - Allenamenti in piccoli gruppi (max 4 persone)

TARGET IDEALE:
- Uomini e donne 25-60 anni
- Residenti a Legnago e dintorni (Cerea, Minerbe, Bovolone, Nogara)
- Cercano dimagrimento, tonificazione, miglioramento postura
- Preferiscono ambiente riservato e non affollato
- Apprezzano tecnologia avanzata e percorsi personalizzati

OFFERTA SPECIALE:
- Prima consulenza GRATUITA con analisi corporea
- Prova EMS gratuita

STILE DI COMUNICAZIONE:
- Professionale ma amichevole
- Usa emoji con moderazione (1-2 per messaggio)
- Rispondi in modo conciso (max 3-4 frasi)
- Guida sempre verso la prenotazione della consulenza gratuita
- Se l'utente condivide nome/email, ringrazialo e suggerisci di prenotare

OBIETTIVO:
- Rispondere alle domande sui servizi
- Catturare interesse dell'utente
- Guidare verso la prenotazione della consulenza gratuita
- Se l'utente sembra interessato, chiedi nome ed email per ricontattarlo`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, sessionId, visitorId, message, messages, leadData } = await req.json();

    console.log(`[AI Chat MUV] Action: ${action}, SessionId: ${sessionId}`);

    switch (action) {
      case 'chat': {
        if (!LOVABLE_API_KEY) {
          return new Response(JSON.stringify({ 
            error: 'AI service not configured',
            response: 'Mi dispiace, il servizio chat non è al momento disponibile. Puoi contattarci su WhatsApp al +39 333 1234567 o chiamarci!'
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Build conversation history
        const conversationMessages = [
          { role: 'system', content: MUV_CONTEXT },
          ...(messages || []).map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content
          })),
          { role: 'user', content: message }
        ];

        // Call Lovable AI Gateway
        const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: conversationMessages,
            max_tokens: 500
          })
        });

        if (!aiResponse.ok) {
          if (aiResponse.status === 429) {
            return new Response(JSON.stringify({ 
              error: 'Rate limit exceeded',
              response: 'Il servizio è momentaneamente sovraccarico. Riprova tra qualche secondo o contattaci su WhatsApp!'
            }), {
              status: 429,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
          }
          throw new Error(`AI API error: ${aiResponse.status}`);
        }

        const aiData = await aiResponse.json();
        const assistantMessage = aiData.choices?.[0]?.message?.content || 
          'Mi dispiace, non ho capito. Puoi riformulare la domanda?';

        // Save conversation to database
        const { data: existingConv } = await supabase
          .from('chat_conversations')
          .select('id, messages')
          .eq('session_id', sessionId)
          .single();

        const updatedMessages = [
          ...(existingConv?.messages || []),
          { role: 'user', content: message, timestamp: new Date().toISOString() },
          { role: 'assistant', content: assistantMessage, timestamp: new Date().toISOString() }
        ];

        if (existingConv) {
          await supabase
            .from('chat_conversations')
            .update({ messages: updatedMessages, updated_at: new Date().toISOString() })
            .eq('id', existingConv.id);
        } else {
          await supabase
            .from('chat_conversations')
            .insert({
              session_id: sessionId,
              visitor_id: visitorId,
              messages: updatedMessages
            });
        }

        return new Response(JSON.stringify({ 
          response: assistantMessage,
          sessionId 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'capture_lead': {
        const { name, email, phone } = leadData || {};

        if (!name || !email) {
          return new Response(JSON.stringify({ error: 'Name and email required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Create lead
        const { data: newLead, error: leadError } = await supabase
          .from('leads')
          .insert({
            name,
            email: email.toLowerCase().trim(),
            phone,
            source: 'ai_chat',
            campaign_name: 'AI Chat MUV Assistant',
            status: 'new'
          })
          .select()
          .single();

        if (leadError) {
          // Check if lead already exists
          if (leadError.code === '23505') {
            const { data: existingLead } = await supabase
              .from('leads')
              .select('id')
              .eq('email', email.toLowerCase().trim())
              .single();

            if (existingLead) {
              // Update chat conversation with lead reference
              await supabase
                .from('chat_conversations')
                .update({
                  lead_captured: true,
                  lead_id: existingLead.id,
                  lead_data: leadData
                })
                .eq('session_id', sessionId);

              return new Response(JSON.stringify({ 
                success: true,
                leadId: existingLead.id,
                isExisting: true
              }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              });
            }
          }
          throw leadError;
        }

        // Update chat conversation with lead reference
        await supabase
          .from('chat_conversations')
          .update({
            lead_captured: true,
            lead_id: newLead.id,
            lead_data: leadData
          })
          .eq('session_id', sessionId);

        // Update lead score
        await supabase.rpc('update_lead_score', {
          p_lead_id: newLead.id,
          p_score_change: 40,
          p_activity_type: 'chat_lead_captured'
        });

        console.log(`[AI Chat MUV] Lead captured: ${name} (${email})`);

        return new Response(JSON.stringify({ 
          success: true,
          leadId: newLead.id 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'get_conversation': {
        const { data: conversation } = await supabase
          .from('chat_conversations')
          .select('*')
          .eq('session_id', sessionId)
          .single();

        return new Response(JSON.stringify({ conversation }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      default:
        return new Response(JSON.stringify({ error: 'Unknown action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

  } catch (error) {
    console.error('[AI Chat MUV] Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      response: 'Mi dispiace, si è verificato un errore. Puoi contattarci direttamente su WhatsApp al +39 333 1234567!'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
