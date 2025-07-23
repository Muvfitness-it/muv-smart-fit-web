
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

    const { email, password, ai_key } = await req.json()

    console.log('AI Auth attempt:', { email, ai_key: ai_key ? 'present' : 'missing' })

    // Verifica che la richiesta provenga da un'IA autorizzata
    const validAiKey = Deno.env.get('AI_ACCESS_KEY')
    if (!ai_key || ai_key !== validAiKey) {
      console.log('Invalid AI key provided')
      return new Response(
        JSON.stringify({ error: 'Unauthorized AI access' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Autentica l'utente usando le credenziali admin
    const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    })

    if (authError || !authData.user) {
      console.log('Authentication failed:', authError?.message)
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verifica i ruoli dell'utente
    const { data: userRoles, error: rolesError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', authData.user.id)

    if (rolesError) {
      console.log('Error checking user roles:', rolesError.message)
      return new Response(
        JSON.stringify({ error: 'Error checking user roles' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const roles = userRoles?.map(r => r.role) || []
    const isAdmin = roles.includes('admin')
    const isEditor = roles.includes('editor')
    const canManageBlog = isAdmin || isEditor

    if (!canManageBlog) {
      console.log('User does not have blog management permissions')
      return new Response(
        JSON.stringify({ error: 'Insufficient permissions' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Genera un token di accesso temporaneo per l'IA
    const aiToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 ore

    // Salva il token nella tabella ai_tokens con created_for: 'blog_management'
    const { error: tokenError } = await supabaseAdmin
      .from('ai_tokens')
      .insert({
        token: aiToken,
        user_id: authData.user.id,
        expires_at: expiresAt.toISOString(),
        created_for: 'blog_management'
      })

    if (tokenError) {
      console.log('Error creating AI token:', tokenError.message)
      return new Response(
        JSON.stringify({ error: 'Error creating access token' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('AI authentication successful for user:', authData.user.email)

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: authData.user.id,
          email: authData.user.email,
          roles: roles,
          isAdmin,
          isEditor,
          canManageBlog
        },
        ai_token: aiToken,
        expires_at: expiresAt.toISOString(),
        access_token: authData.session.access_token
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('AI Auth error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
