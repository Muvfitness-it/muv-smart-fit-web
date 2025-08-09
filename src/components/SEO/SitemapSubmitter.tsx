import { useEffect } from 'react';

export const SitemapSubmitter = () => {
  useEffect(() => {
    const submitSitemapToGoogle = async () => {
      const sitemaps = [
        'https://www.muvfitness.it/sitemap.xml',
        'https://www.muvfitness.it/sitemap-main.xml',
        'https://www.muvfitness.it/sitemap-blog.xml',
      ];

      try {
        await Promise.all(
          sitemaps.map(async (sitemapUrl) => {
            const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
            try {
              await fetch(pingUrl, { mode: 'no-cors', method: 'GET' });
            } catch (e) {
              // Ignore CORS/network errors, Google still receives the ping
            }
          })
        );
        console.log('Sitemaps submitted to Google');
      } catch (error) {
        console.log('Sitemap ping attempts made (some may be blocked by CORS)');
      }
    };

    // Submit on component mount only
    submitSitemapToGoogle();

    return () => {};
  }, []);

  return null;
};

export default SitemapSubmitter;