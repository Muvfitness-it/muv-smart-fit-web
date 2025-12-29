import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Scoring configuration
const SCORE_CONFIG = {
  page_visit: {
    '/servizi': 10,
    '/prezzi': 20,
    '/contatti': 15,
    '/perche-muv': 15,
    '/metodo': 10,
    '/prenota': 25,
    '/form-contatti': 20,
    '/funnel': 15,
    default: 5
  },
  time_on_site: {
    180: 10,   // 3 minutes
    300: 20,   // 5 minutes
    600: 30    // 10 minutes
  },
  actions: {
    lead_magnet_download: 25,
    form_submission: 30,
    email_open: 10,
    email_click: 20,
    chat_started: 15,
    chat_lead_captured: 40,
    booking_completed: 50
  }
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, leadId, sessionId, data } = await req.json();

    console.log(`[Lead Scoring] Action: ${action}, LeadId: ${leadId}, SessionId: ${sessionId}`);

    let scoreChange = 0;
    let activityType = action;

    switch (action) {
      case 'page_visit': {
        const pagePath = data?.pagePath || '/';
        scoreChange = SCORE_CONFIG.page_visit[pagePath as keyof typeof SCORE_CONFIG.page_visit] 
                     || SCORE_CONFIG.page_visit.default;
        activityType = `page_${pagePath.replace(/\//g, '_').slice(1) || 'home'}`;
        break;
      }

      case 'time_on_site': {
        const seconds = data?.seconds || 0;
        if (seconds >= 600) scoreChange = SCORE_CONFIG.time_on_site[600];
        else if (seconds >= 300) scoreChange = SCORE_CONFIG.time_on_site[300];
        else if (seconds >= 180) scoreChange = SCORE_CONFIG.time_on_site[180];
        activityType = 'time_on_site';
        break;
      }

      case 'lead_magnet_download':
        scoreChange = SCORE_CONFIG.actions.lead_magnet_download;
        break;

      case 'form_submission':
        scoreChange = SCORE_CONFIG.actions.form_submission;
        break;

      case 'email_open':
        scoreChange = SCORE_CONFIG.actions.email_open;
        break;

      case 'email_click':
        scoreChange = SCORE_CONFIG.actions.email_click;
        break;

      case 'chat_started':
        scoreChange = SCORE_CONFIG.actions.chat_started;
        break;

      case 'chat_lead_captured':
        scoreChange = SCORE_CONFIG.actions.chat_lead_captured;
        break;

      case 'booking_completed':
        scoreChange = SCORE_CONFIG.actions.booking_completed;
        break;

      case 'get_score': {
        if (!leadId) {
          return new Response(JSON.stringify({ error: 'Lead ID required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const { data: scoreData, error } = await supabase
          .from('lead_scores')
          .select('*')
          .eq('lead_id', leadId)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        return new Response(JSON.stringify({ 
          score: scoreData?.score || 0,
          level: scoreData?.score_level || 'cold',
          breakdown: scoreData?.score_breakdown || {}
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'get_all_scores': {
        const { data: scores, error } = await supabase
          .from('lead_scores')
          .select(`
            *,
            leads (
              id,
              name,
              email,
              phone,
              source,
              status,
              created_at
            )
          `)
          .order('score', { ascending: false });

        if (error) throw error;

        return new Response(JSON.stringify({ scores }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      default:
        return new Response(JSON.stringify({ error: 'Unknown action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    // If we have a score change to apply
    if (scoreChange > 0 && leadId) {
      // Call the database function to update score
      const { error: updateError } = await supabase.rpc('update_lead_score', {
        p_lead_id: leadId,
        p_score_change: scoreChange,
        p_activity_type: activityType
      });

      if (updateError) {
        console.error('[Lead Scoring] Error updating score:', updateError);
        throw updateError;
      }

      // Get updated score
      const { data: updatedScore } = await supabase
        .from('lead_scores')
        .select('score, score_level')
        .eq('lead_id', leadId)
        .single();

      // Check if lead is now "hot" or "qualified" - send notification
      if (updatedScore && (updatedScore.score_level === 'hot' || updatedScore.score_level === 'qualified')) {
        // Get lead details
        const { data: leadData } = await supabase
          .from('leads')
          .select('name, email, phone')
          .eq('id', leadId)
          .single();

        console.log(`[Lead Scoring] 🔥 Hot lead alert! ${leadData?.name} (${leadData?.email}) - Score: ${updatedScore.score}`);
        
        // TODO: Send WhatsApp/Email notification to sales team
      }

      console.log(`[Lead Scoring] Updated lead ${leadId}: +${scoreChange} points for ${activityType}`);

      return new Response(JSON.stringify({ 
        success: true, 
        scoreChange,
        newScore: updatedScore?.score,
        newLevel: updatedScore?.score_level
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('[Lead Scoring] Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
