import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactRequest {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('Enhanced contact function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { name, email, message, phone, subject }: ContactRequest = await req.json();

    console.log('Processing contact submission for:', email);

    // Use the secure contact submission function
    const { data, error } = await supabase.rpc('secure_contact_submission', {
      p_name: name,
      p_email: email,
      p_message: message,
      p_phone: phone || null,
      p_subject: subject || null
    });

    if (error) {
      console.error('Supabase RPC error:', error);
      throw error;
    }

    console.log('Contact submission result:', data);

    // Check if rate limited or other errors
    if (!data.success) {
      return new Response(JSON.stringify(data), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    // If successful, you could send email here using Resend
    // For now, just return success
    return new Response(JSON.stringify({
      success: true,
      message: 'Contact form submitted successfully'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error('Error in enhanced-contact function:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
};

serve(handler);