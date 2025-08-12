import { useEffect } from 'react';
import { updateBlogSitemap } from '@/utils/sitemapGenerator';

export const AutoSitemapUpdater = () => {
  useEffect(() => {
    const updateSitemaps = async () => {
      try {
        // Generate updated sitemap content
        const blogSitmapContent = await updateBlogSitemap();
        
        // Log the generated content for manual update if needed
        console.log('=== SITEMAP UPDATE ===');
        console.log('Blog sitemap content generated. To manually update:');
        console.log('1. Copy content from localStorage.getItem("blog_sitemap_content")');
        console.log('2. Update public/sitemap-blog.xml');
        console.log('=====================');
        
        // Alternatively, call the Edge Function to get fresh data
        try {
          const response = await fetch('https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/update-sitemaps', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'update_all_sitemaps' })
          });
          
          if (response.ok) {
            console.log('Blog sitemap updated via API');
          }
        } catch (e) {
          console.log('Edge Function not available, using localStorage approach');
        }
        
      } catch (error) {
        console.error('Error updating sitemaps:', error);
      }
    };

    // Update immediately and then every 30 minutes
    updateSitemaps();
    const interval = setInterval(updateSitemaps, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default AutoSitemapUpdater;