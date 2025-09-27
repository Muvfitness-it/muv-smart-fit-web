

const ALLOWED_ORIGINS = [
  "https://muvfitnesslegnago.it",
  "https://www.muvfitness.it", 
  "https://preview---muv-fitness.lovable.app",
  "https://muv-fitness.lovable.app"
];

function corsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  console.log("send-lead-magnet request from origin:", origin);
  
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(origin) });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) }
      });
    }

    const body = await req.json().catch(() => null);
    const { name, email, source } = body ?? {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Email non valida" }), {
        status: 422,
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) }
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const table = Deno.env.get("LEADS_TABLE") ?? "leads";

    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        name: name ?? null,
        email,
        source: source ?? "lead-magnet",
        created_at: new Date().toISOString()
      })
    });

    if (!insertRes.ok) {
      const t = await insertRes.text();
      throw new Error(`Insert failed: ${insertRes.status} - ${t}`);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders(origin) }
    });
    
  } catch (err) {
    console.error("send-lead-magnet error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders(origin) }
    });
  }
});