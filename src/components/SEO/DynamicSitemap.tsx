import React, { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const DynamicSitemap: React.FC = () => {
  const generateBlogSitemap = async (): Promise<SitemapEntry[]> => {
    try {
      const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('slug, updated_at')
        .eq('status', 'published')
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts for sitemap:', error);
        return [];
      }

      return posts.map(post => ({
        loc: `https://muvfitness.it/blog/${post.slug}`,
        lastmod: new Date(post.updated_at).toISOString().split('T')[0],
        changefreq: 'weekly' as const,
        priority: 0.7
      }));
    } catch (error) {
      console.error('Error generating blog sitemap:', error);
      return [];
    }
  };

  const generateFullSitemap = async (): Promise<string> => {
    const staticPages: SitemapEntry[] = [
      { loc: 'https://muvfitness.it/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 1.0 },
      { loc: 'https://muvfitness.it/chi-siamo', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.8 },
      { loc: 'https://muvfitness.it/servizi', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.9 },
      { loc: 'https://muvfitness.it/servizi/personal-training', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.8 },
      { loc: 'https://muvfitness.it/servizi/ems', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.8 },
      { loc: 'https://muvfitness.it/servizi/pancafit', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.8 },
      { loc: 'https://muvfitness.it/blog', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.9 },
      { loc: 'https://muvfitness.it/trasformazione-30-giorni', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.9 },
      { loc: 'https://muvfitness.it/contatti', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
    ];

    const blogEntries = await generateBlogSitemap();
    const allEntries = [...staticPages, ...blogEntries];

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allEntries.map(entry => `<url>
<loc>${entry.loc}</loc>
<lastmod>${entry.lastmod}</lastmod>
<changefreq>${entry.changefreq}</changefreq>
<priority>${entry.priority}</priority>
</url>`).join('\n')}
</urlset>`;

    return xmlContent;
  };

  const updateSitemap = async () => {
    try {
      const sitemapContent = await generateFullSitemap();
      
      // In a real implementation, you would save this to your server
      // For now, we'll log it and provide a download option
      console.log('Generated sitemap:', sitemapContent);
      
      // Create a downloadable file
      const blob = new Blob([sitemapContent], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sitemap.xml';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error updating sitemap:', error);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Gestione Sitemap Dinamica</h3>
      <button
        onClick={updateSitemap}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Genera e Scarica Sitemap Aggiornata
      </button>
      <p className="text-sm text-gray-600 mt-2">
        Genera una sitemap aggiornata con tutti i post del blog pubblicati
      </p>
    </div>
  );
};

export default DynamicSitemap;