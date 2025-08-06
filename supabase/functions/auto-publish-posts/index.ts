import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Checking for posts to auto-publish...');

    // Trova tutti i post programmati che dovrebbero essere pubblicati ora
    const { data: postsToPublish, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id, title, scheduled_publish_at')
      .eq('status', 'scheduled')
      .lte('scheduled_publish_at', new Date().toISOString());

    if (fetchError) {
      console.error('Error fetching posts to publish:', fetchError);
      throw new Error(`Error fetching posts: ${fetchError.message}`);
    }

    console.log(`Found ${postsToPublish?.length || 0} posts to publish`);

    if (!postsToPublish || postsToPublish.length === 0) {
      return new Response(
        JSON.stringify({ 
          message: 'No posts to publish at this time',
          publishedCount: 0 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Pubblica tutti i post programmati
    const publishResults = [];
    
    for (const post of postsToPublish) {
      try {
        const { data: updatedPost, error: updateError } = await supabase
          .from('blog_posts')
          .update({
            status: 'published',
            published_at: new Date().toISOString(),
            scheduled_publish_at: null
          })
          .eq('id', post.id)
          .select('id, title, published_at')
          .single();

        if (updateError) {
          console.error(`Error publishing post ${post.id}:`, updateError);
          publishResults.push({
            id: post.id,
            title: post.title,
            success: false,
            error: updateError.message
          });
        } else {
          console.log(`Successfully published post: ${post.title} (ID: ${post.id})`);
          publishResults.push({
            id: post.id,
            title: post.title,
            success: true,
            published_at: updatedPost.published_at
          });
        }
      } catch (error) {
        console.error(`Unexpected error publishing post ${post.id}:`, error);
        publishResults.push({
          id: post.id,
          title: post.title,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    const successCount = publishResults.filter(r => r.success).length;
    const failureCount = publishResults.filter(r => !r.success).length;

    console.log(`Publishing complete: ${successCount} published, ${failureCount} failed`);

    return new Response(
      JSON.stringify({ 
        message: `Auto-publish completed: ${successCount} posts published, ${failureCount} failed`,
        publishedCount: successCount,
        failureCount: failureCount,
        results: publishResults
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in auto-publish-posts function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});