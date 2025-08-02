import React, { useEffect } from 'react';
import { updateBlogSitemap } from '@/utils/sitemapGenerator';

const BlogSitemap: React.FC = () => {
  useEffect(() => {
    const generateAndUpdateSitemap = async () => {
      try {
        const sitemapContent = await updateBlogSitemap();
        
        // Send sitemap content to a service worker or download as file
        // This is a client-side approach for demonstration
        console.log('Blog sitemap generated and ready for upload to server');
        
        // In a real scenario, you would send this to your backend to update the static file
        // For now, we'll store it in localStorage and log instructions
        console.log('To update the sitemap file:');
        console.log('1. Copy the content from localStorage.getItem("blog_sitemap_content")');
        console.log('2. Replace the content in public/sitemap-blog.xml');
        
        // Ping Google about sitemap updates
        const sitemapUrl = 'https://www.muvfitness.it/sitemap-blog.xml';
        const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
        
        try {
          await fetch(pingUrl, { mode: 'no-cors' });
        } catch (e) {
          console.log('Sitemap ping attempted');
        }
        
      } catch (error) {
        console.error('Error generating blog sitemap:', error);
      }
    };

    generateAndUpdateSitemap();
  }, []);

  return null; // Componente invisibile
};

export default BlogSitemap;