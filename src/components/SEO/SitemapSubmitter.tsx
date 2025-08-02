import { useEffect } from 'react';

export const SitemapSubmitter = () => {
  useEffect(() => {
    const submitSitemapToGoogle = async () => {
      try {
        const sitemapUrl = 'https://www.muvfitness.it/sitemap.xml';
        
        // Ping Google about sitemap updates
        const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
        
        // Use fetch with no-cors mode to avoid CORS issues
        await fetch(pingUrl, { 
          mode: 'no-cors',
          method: 'GET'
        });
        
        console.log('Sitemap submitted to Google');
      } catch (error) {
        console.log('Sitemap ping attempt made (might be blocked by CORS)');
      }
    };

    // Submit on component mount and then periodically
    submitSitemapToGoogle();
    
    // Resubmit every 6 hours
    const interval = setInterval(submitSitemapToGoogle, 6 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default SitemapSubmitter;