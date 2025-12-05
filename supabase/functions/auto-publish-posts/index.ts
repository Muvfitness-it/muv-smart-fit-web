import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import { Resend } from "npm:resend@2.0.0";

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const resendApiKey = Deno.env.get('RESEND_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SharePreferences {
  facebook?: boolean;
  twitter?: boolean;
  linkedin?: boolean;
  whatsapp?: boolean;
}

function generateShareUrls(articleUrl: string, articleTitle: string) {
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(articleTitle);
  
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };
}

function generateEmailHtml(
  articleTitle: string, 
  articleUrl: string, 
  sharePreferences: SharePreferences
) {
  const shareUrls = generateShareUrls(articleUrl, articleTitle);
  
  const activePlatforms: { key: keyof SharePreferences; label: string; emoji: string; color: string }[] = [
    { key: 'facebook', label: 'Facebook', emoji: '📘', color: '#1877F2' },
    { key: 'twitter', label: 'Twitter/X', emoji: '🐦', color: '#1DA1F2' },
    { key: 'linkedin', label: 'LinkedIn', emoji: '💼', color: '#0A66C2' },
    { key: 'whatsapp', label: 'WhatsApp', emoji: '💬', color: '#25D366' },
  ];

  const selectedPlatforms = activePlatforms.filter(p => sharePreferences[p.key]);
  
  const socialLinks = selectedPlatforms.map(p => 
    `<tr>
      <td style="padding: 8px 0;">
        <a href="${shareUrls[p.key]}" 
           style="display: inline-block; padding: 12px 24px; background-color: ${p.color}; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
          ${p.emoji} Condividi su ${p.label}
        </a>
      </td>
    </tr>`
  ).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Articolo Pubblicato - MUV Fitness</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  <div style="background-color: white; border-radius: 16px; padding: 32px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 24px;">
      <h1 style="color: #333; margin: 0; font-size: 24px;">🎉 Articolo Pubblicato!</h1>
    </div>
    
    <div style="background-color: #f8f9fa; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <h2 style="color: #333; margin: 0 0 8px 0; font-size: 18px;">${articleTitle}</h2>
      <a href="${articleUrl}" style="color: #C13697; text-decoration: none; font-size: 14px;">${articleUrl}</a>
    </div>
    
    <div style="margin-bottom: 24px;">
      <p style="color: #666; margin: 0 0 16px 0;">Il tuo articolo programmato è stato pubblicato automaticamente.</p>
      
      ${selectedPlatforms.length > 0 ? `
      <h3 style="color: #333; margin: 0 0 16px 0;">📤 Condividi sui social:</h3>
      <table cellpadding="0" cellspacing="0" border="0" style="margin: 0;">
        ${socialLinks}
      </table>
      ` : ''}
    </div>
    
    <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
      <a href="${articleUrl}" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #C13697, #0055A4); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
        📖 Visualizza l'articolo
      </a>
    </div>
    
    <div style="margin-top: 24px; text-align: center; color: #999; font-size: 12px;">
      <p>MUV Fitness Legnago - Il Fitness Intelligente</p>
    </div>
  </div>
</body>
</html>
`;
}

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
      .select('id, title, slug, featured_image, share_preferences, scheduled_publish_at')
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

    // Initialize Resend if API key is available
    const resend = resendApiKey ? new Resend(resendApiKey) : null;

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
          .select('id, title, slug, published_at')
          .single();

        if (updateError) {
          console.error(`Error publishing post ${post.id}:`, updateError);
          publishResults.push({
            id: post.id,
            title: post.title,
            success: false,
            error: updateError.message
          });
          continue;
        }
        
        console.log(`Successfully published post: ${post.title} (ID: ${post.id})`);
        
        const articleUrl = `https://www.muvfitness.it/${post.slug}`;
        const sharePreferences = (post.share_preferences as SharePreferences) || {};
        const hasSelectedSocial = Object.values(sharePreferences).some(v => v);
        
        // Send email notification if Resend is configured and social sharing is enabled
        if (resend && hasSelectedSocial) {
          try {
            const emailHtml = generateEmailHtml(post.title, articleUrl, sharePreferences);
            
            await resend.emails.send({
              from: 'MUV Fitness <noreply@muvfitness.it>',
              to: ['info@muvfitness.it'], // Admin email
              subject: `🎉 Articolo pubblicato: ${post.title}`,
              html: emailHtml,
            });
            
            console.log(`Email notification sent for post: ${post.title}`);
          } catch (emailError) {
            console.error(`Error sending email notification for post ${post.id}:`, emailError);
            // Don't fail the whole operation if email fails
          }
        }
        
        // Submit to IndexNow
        try {
          await fetch(`${supabaseUrl}/functions/v1/indexnow-submitter`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseServiceKey}`,
            },
            body: JSON.stringify({ urls: [articleUrl] }),
          });
          console.log(`IndexNow submission triggered for: ${articleUrl}`);
        } catch (indexError) {
          console.error(`IndexNow submission error for ${post.id}:`, indexError);
        }
        
        publishResults.push({
          id: post.id,
          title: post.title,
          success: true,
          published_at: updatedPost.published_at,
          emailSent: resend && hasSelectedSocial
        });
        
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
