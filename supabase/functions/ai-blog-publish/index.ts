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
      console.log('Token verification failed:', tokenError);
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

    const requestData = await req.json();
    const { 
      title, 
      content, 
      excerpt, 
      meta_title, 
      meta_description, 
      meta_keywords,
      featured_image,
      status = 'published',
      format = 'markdown' // markdown, html, or json
    } = requestData;

    // Validate required fields
    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'Title and content are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate slug from title
    const slug = title
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

    // Check if slug already exists
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingPost) {
      return new Response(JSON.stringify({ error: `Article with slug "${slug}" already exists` }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = content.split(' ').length;
    const reading_time = Math.max(1, Math.ceil(wordCount / 200));

    // Prepare article data
    const articleData = {
      title,
      slug,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      meta_title: meta_title || title,
      meta_description: meta_description || excerpt || content.substring(0, 150),
      meta_keywords: meta_keywords || '',
      featured_image: featured_image || null,
      author_name: 'AI Assistant',
      author_email: 'ai@muvfitness.com',
      status,
      reading_time,
      published_at: status === 'published' ? new Date().toISOString() : null
    };

    // Insert the article
    const { data: newArticle, error: insertError } = await supabase
      .from('blog_posts')
      .insert(articleData)
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting article:', insertError);
      return new Response(JSON.stringify({ error: 'Failed to create article', details: insertError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Article "${title}" created successfully by AI`);

    return new Response(JSON.stringify({
      success: true,
      article: {
        id: newArticle.id,
        title: newArticle.title,
        slug: newArticle.slug,
        status: newArticle.status,
        published_at: newArticle.published_at,
        url: `https://muvfitness.com/blog/${newArticle.slug}`
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-blog-publish function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});