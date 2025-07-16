import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-manus-api-key',
}

interface BlogPostPayload {
  title: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  author_name?: string;
  author_email?: string;
  category_id?: string;
  status?: 'draft' | 'published';
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  tags?: string[];
}

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate Manus API key
    const manusApiKey = req.headers.get('x-manus-api-key');
    const expectedApiKey = Deno.env.get('MANUS_API_KEY');
    
    if (!expectedApiKey) {
      console.error('MANUS_API_KEY not configured');
      return new Response(JSON.stringify({
        success: false,
        error: 'API key not configured on server'
      } as ApiResponse), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (!manusApiKey || manusApiKey !== expectedApiKey) {
      console.error('Invalid or missing Manus API key');
      return new Response(JSON.stringify({
        success: false,
        error: 'Unauthorized: Invalid API key'
      } as ApiResponse), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { method, url } = req;
    const urlObj = new URL(url);
    const endpoint = urlObj.pathname.split('/').pop();

    switch (method) {
      case 'POST':
        if (endpoint === 'create') {
          return await createBlogPost(req, supabase);
        }
        break;
      
      case 'GET':
        if (endpoint === 'categories') {
          return await getCategories(supabase);
        } else if (endpoint === 'check-slug') {
          const slug = urlObj.searchParams.get('slug');
          return await checkSlugAvailability(slug, supabase);
        } else if (endpoint === 'stats') {
          return await getBlogStats(supabase);
        }
        break;
    }

    return new Response(JSON.stringify({
      success: false,
      error: 'Endpoint not found'
    } as ApiResponse), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in blog-auto-post function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    } as ApiResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

async function createBlogPost(req: Request, supabase: any): Promise<Response> {
  try {
    const payload: BlogPostPayload = await req.json();
    
    // Validate required fields
    if (!payload.title || !payload.content) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: title and content are required'
      } as ApiResponse), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Generate slug from title
    const slug = generateSlug(payload.title);
    
    // Check if slug already exists
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingPost) {
      return new Response(JSON.stringify({
        success: false,
        error: `Slug '${slug}' already exists. Please use a different title.`
      } as ApiResponse), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Calculate reading time (approx 200 words per minute)
    const wordCount = payload.content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // Generate excerpt if not provided
    const excerpt = payload.excerpt || generateExcerpt(payload.content);

    // Generate SEO meta if not provided
    const metaTitle = payload.meta_title || payload.title;
    const metaDescription = payload.meta_description || excerpt;
    const metaKeywords = payload.meta_keywords || extractKeywords(payload.content);

    // Prepare blog post data
    const blogPostData = {
      title: payload.title,
      slug: slug,
      content: payload.content,
      excerpt: excerpt,
      featured_image: payload.featured_image,
      author_name: payload.author_name || 'MUV Team',
      author_email: payload.author_email,
      category_id: payload.category_id,
      status: payload.status || 'draft',
      meta_title: metaTitle,
      meta_description: metaDescription,
      meta_keywords: metaKeywords,
      reading_time: readingTime,
      views_count: 0,
      likes_count: 0
    };

    // Insert blog post
    const { data: newPost, error: insertError } = await supabase
      .from('blog_posts')
      .insert([blogPostData])
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting blog post:', insertError);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to create blog post: ' + insertError.message
      } as ApiResponse), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Handle tags if provided
    if (payload.tags && payload.tags.length > 0) {
      await handleTags(payload.tags, newPost.id, supabase);
    }

    console.log('Blog post created successfully:', newPost.id);

    return new Response(JSON.stringify({
      success: true,
      data: {
        id: newPost.id,
        slug: newPost.slug,
        title: newPost.title,
        status: newPost.status,
        reading_time: newPost.reading_time,
        created_at: newPost.created_at
      },
      message: 'Blog post created successfully'
    } as ApiResponse), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in createBlogPost:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to process blog post creation: ' + error.message
    } as ApiResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function getCategories(supabase: any): Promise<Response> {
  try {
    const { data: categories, error } = await supabase
      .from('blog_categories')
      .select('id, name, slug, description, color')
      .order('name');

    if (error) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch categories: ' + error.message
      } as ApiResponse), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      data: categories
    } as ApiResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in getCategories:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch categories: ' + error.message
    } as ApiResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function checkSlugAvailability(slug: string | null, supabase: any): Promise<Response> {
  try {
    if (!slug) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Slug parameter is required'
      } as ApiResponse), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single();

    return new Response(JSON.stringify({
      success: true,
      data: {
        slug: slug,
        available: !existingPost
      }
    } as ApiResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in checkSlugAvailability:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to check slug availability: ' + error.message
    } as ApiResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function getBlogStats(supabase: any): Promise<Response> {
  try {
    const { data: stats, error } = await supabase
      .from('blog_posts')
      .select('status')
      .then(({ data, error }) => {
        if (error) throw error;
        
        const totalPosts = data.length;
        const publishedPosts = data.filter(post => post.status === 'published').length;
        const draftPosts = data.filter(post => post.status === 'draft').length;
        
        return {
          data: {
            total_posts: totalPosts,
            published_posts: publishedPosts,
            draft_posts: draftPosts
          },
          error: null
        };
      });

    if (error) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch blog stats: ' + error.message
      } as ApiResponse), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      data: stats.data
    } as ApiResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in getBlogStats:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch blog stats: ' + error.message
    } as ApiResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Helper functions
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function generateExcerpt(content: string): string {
  // Remove HTML tags and get first 150 characters
  const plainText = content.replace(/<[^>]*>/g, '');
  return plainText.length > 150 
    ? plainText.substring(0, 150).trim() + '...'
    : plainText;
}

function extractKeywords(content: string): string {
  // Simple keyword extraction from content
  const plainText = content.replace(/<[^>]*>/g, '').toLowerCase();
  const words = plainText.split(/\s+/);
  const stopWords = ['il', 'la', 'di', 'che', 'e', 'a', 'un', 'per', 'con', 'non', 'una', 'su', 'del', 'al', 'da', 'nel', 'alla', 'le', 'dei', 'delle', 'gli', 'lo', 'degli', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  
  const meaningfulWords = words
    .filter(word => word.length > 3 && !stopWords.includes(word))
    .slice(0, 10);
    
  return meaningfulWords.join(', ');
}

async function handleTags(tags: string[], postId: string, supabase: any): Promise<void> {
  try {
    for (const tagName of tags) {
      const tagSlug = generateSlug(tagName);
      
      // Get or create tag
      let { data: tag } = await supabase
        .from('blog_tags')
        .select('id')
        .eq('slug', tagSlug)
        .single();

      if (!tag) {
        const { data: newTag, error: tagError } = await supabase
          .from('blog_tags')
          .insert([{ name: tagName, slug: tagSlug }])
          .select()
          .single();

        if (tagError) {
          console.error('Error creating tag:', tagError);
          continue;
        }
        tag = newTag;
      }

      // Create post-tag relationship
      await supabase
        .from('blog_post_tags')
        .insert([{ post_id: postId, tag_id: tag.id }]);
    }
  } catch (error) {
    console.error('Error handling tags:', error);
  }
}