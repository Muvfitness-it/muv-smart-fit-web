
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const { ai_token } = await req.json()

    if (!ai_token) {
      return new Response(
        JSON.stringify({ error: 'AI token required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verifica il token AI
    const { data: tokenData, error: tokenError } = await supabaseAdmin
      .from('ai_tokens')
      .select(`
        *,
        user_roles!inner(role)
      `)
      .eq('token', ai_token)
      .gte('expires_at', new Date().toISOString())
      .single()

    if (tokenError || !tokenData) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired AI token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Ottieni i dati dell'utente
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(tokenData.user_id)

    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const roles = tokenData.user_roles?.map((r: any) => r.role) || []
    const isAdmin = roles.includes('admin')
    const isEditor = roles.includes('editor')
    const canManageBlog = isAdmin || isEditor

    return new Response(
      JSON.stringify({
        valid: true,
        user: {
          id: userData.user.id,
          email: userData.user.email,
          roles: roles,
          isAdmin,
          isEditor,
          canManageBlog
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('AI Token verification error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
