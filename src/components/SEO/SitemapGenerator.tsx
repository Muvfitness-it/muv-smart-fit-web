import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SitemapGenerator = () => {
  useEffect(() => {
    const generateSitemaps = async () => {
      try {
        // Genera sitemap principale
        await fetch('https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/sitemap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        // Genera news sitemap
        await fetch('https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/news-sitemap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        console.log('Sitemaps generated successfully');
      } catch (error) {
        console.error('Error generating sitemaps:', error);
      }
    };

    generateSitemaps();
  }, []);

  return null;
};

export default SitemapGenerator;