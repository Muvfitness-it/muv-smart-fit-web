import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  published_at: string;
}

interface GMBPostRequest {
  postId: string;
  action: 'publish' | 'update' | 'delete';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { postId, action }: GMBPostRequest = await req.json();

    console.log(`GMB Post Publisher: ${action} for post ${postId}`);

    // Recupera il post dal database
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, featured_image, published_at')
      .eq('id', postId)
      .eq('status', 'published')
      .single();

    if (postError || !post) {
      throw new Error(`Post non trovato: ${postError?.message}`);
    }

    const blogPost = post as BlogPost;

    // Crea GMB Post payload
    const gmbPost = {
      languageCode: 'it',
      summary: blogPost.excerpt || blogPost.title.substring(0, 150),
      callToAction: {
        actionType: 'LEARN_MORE',
        url: `https://www.muvfitness.it/blog/${blogPost.slug}`
      },
      media: blogPost.featured_image ? [{
        mediaFormat: 'PHOTO',
        sourceUrl: blogPost.featured_image.startsWith('http') 
          ? blogPost.featured_image 
          : `https://www.muvfitness.it${blogPost.featured_image}`
      }] : [],
      topicType: 'STANDARD',
      alertType: 'UPDATE'
    };

    // Log per future integration con GMB API
    console.log('GMB Post Payload:', JSON.stringify(gmbPost, null, 2));

    // Salva nel database per tracking
    await supabase
      .from('gmb_posts_queue')
      .insert({
        blog_post_id: postId,
        gmb_payload: gmbPost,
        action: action,
        status: 'pending',
        created_at: new Date().toISOString()
      });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `GMB post ${action} schedulato con successo`,
        payload: gmbPost
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Errore GMB Post Publisher:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
