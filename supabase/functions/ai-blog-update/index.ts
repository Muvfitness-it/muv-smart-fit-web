import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Verify AI token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Missing or invalid Authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const aiToken = authHeader.replace('Bearer ', '');
    
    // Verify the AI token
    const { data: tokenData, error: tokenError } = await supabase
      .from('ai_tokens')
      .select('user_id, expires_at, created_for')
      .eq('token', aiToken)
      .single();

    if (tokenError || !tokenData) {
      return new Response(JSON.stringify({ error: 'Invalid AI token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if token is expired
    if (new Date(tokenData.expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: 'AI token expired' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if token is for blog access
    if (tokenData.created_for !== 'blog_management') {
      return new Response(JSON.stringify({ error: 'Token not authorized for blog operations' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(req.url);
    const articleId = url.pathname.split('/').pop();

    if (!articleId) {
      return new Response(JSON.stringify({ error: 'Article ID is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const requestData = await req.json();
    const updateData: any = {};

    // Only update provided fields
    if (requestData.title) {
      updateData.title = requestData.title;
      
      // Generate new slug if title changed
      updateData.slug = requestData.title
        .toLowerCase()
        .replace(/[àáäâ]/g, 'a')
        .replace(/[èéëê]/g, 'e')
        .replace(/[ìíïî]/g, 'i')
        .replace(/[òóöô]/g, 'o')
        .replace(/[ùúüû]/g, 'u')
        .replace(/[ñ]/g, 'n')
        .replace(/[ç]/g, 'c')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }

    if (requestData.content) {
      updateData.content = requestData.content;
      
      // Recalculate reading time
      const wordCount = requestData.content.split(' ').length;
      updateData.reading_time = Math.max(1, Math.ceil(wordCount / 200));
    }

    if (requestData.excerpt !== undefined) updateData.excerpt = requestData.excerpt;
    if (requestData.meta_title !== undefined) updateData.meta_title = requestData.meta_title;
    if (requestData.meta_description !== undefined) updateData.meta_description = requestData.meta_description;
    if (requestData.meta_keywords !== undefined) updateData.meta_keywords = requestData.meta_keywords;
    if (requestData.featured_image !== undefined) updateData.featured_image = requestData.featured_image;
    if (requestData.status !== undefined) {
      updateData.status = requestData.status;
      
      // Set published_at when publishing
      if (requestData.status === 'published') {
        updateData.published_at = new Date().toISOString();
      } else {
        updateData.published_at = null;
      }
    }

    // Check if slug conflicts with existing articles (if slug was changed)
    if (updateData.slug) {
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', updateData.slug)
        .neq('id', articleId)
        .single();

      if (existingPost) {
        return new Response(JSON.stringify({ error: `Slug "${updateData.slug}" is already in use` }), {
          status: 409,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Update the article
    const { data: updatedArticle, error: updateError } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', articleId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating article:', updateError);
      return new Response(JSON.stringify({ error: 'Failed to update article', details: updateError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!updatedArticle) {
      return new Response(JSON.stringify({ error: 'Article not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Article "${updatedArticle.title}" updated successfully by AI`);

    return new Response(JSON.stringify({
      success: true,
      article: {
        id: updatedArticle.id,
        title: updatedArticle.title,
        slug: updatedArticle.slug,
        status: updatedArticle.status,
        published_at: updatedArticle.published_at,
        url: `https://muvfitness.com/blog/${updatedArticle.slug}`
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-blog-update function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});