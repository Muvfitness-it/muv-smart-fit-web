import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const DynamicSitemap: React.FC = () => {
  const [sitemapXml, setSitemapXml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
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
        loc: `https://www.muvfitness.it/blog/${post.slug}`,
        lastmod: new Date(post.updated_at).toISOString().split('T')[0],
        changefreq: 'weekly' as const,
        priority: 0.8
      }));
    } catch (error) {
      console.error('Error generating blog sitemap:', error);
      return [];
    }
  };

  const generateFullSitemap = async (): Promise<string> => {
    const staticPages: SitemapEntry[] = [
      { loc: 'https://www.muvfitness.it/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 1.0 },
      { loc: 'https://www.muvfitness.it/chi-siamo', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.8 },
      { loc: 'https://www.muvfitness.it/servizi', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.9 },
      { loc: 'https://www.muvfitness.it/servizi/personal-training', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
      { loc: 'https://www.muvfitness.it/servizi/small-group', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
      { loc: 'https://www.muvfitness.it/servizi/ems', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
      { loc: 'https://www.muvfitness.it/servizi/hiit', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
      { loc: 'https://www.muvfitness.it/servizi/pilates', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
      { loc: 'https://www.muvfitness.it/servizi/pancafit', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
      { loc: 'https://www.muvfitness.it/servizi/nutrizione', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
      { loc: 'https://www.muvfitness.it/servizi/massoterapia', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
      { loc: 'https://www.muvfitness.it/servizi/psicologo', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
      { loc: 'https://www.muvfitness.it/team', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.7 },
      { loc: 'https://www.muvfitness.it/risultati', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.7 },
      { loc: 'https://www.muvfitness.it/blog', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.9 },
      { loc: 'https://www.muvfitness.it/contatti', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.7 },
      { loc: 'https://www.muvfitness.it/muv-planner', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
      { loc: 'https://www.muvfitness.it/trasformazione-30-giorni', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.9 }
    ];

    const blogEntries = await generateBlogSitemap();
    const allEntries = [...staticPages, ...blogEntries];

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return xmlContent;
  };

  // Generate sitemap on component mount
  useEffect(() => {
    const initializeSitemap = async () => {
      setIsLoading(true);
      try {
        const xml = await generateFullSitemap();
        setSitemapXml(xml);
      } catch (error) {
        console.error('Error generating sitemap:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSitemap();
  }, []);

  // For direct XML access when navigating to /sitemap.xml
  useEffect(() => {
    if (sitemapXml && window.location.pathname === '/sitemap.xml') {
      // Set proper content type
      const head = document.head;
      const existingMeta = head.querySelector('meta[http-equiv="Content-Type"]');
      if (existingMeta) {
        existingMeta.setAttribute('content', 'application/xml; charset=utf-8');
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('http-equiv', 'Content-Type');
        meta.setAttribute('content', 'application/xml; charset=utf-8');
        head.appendChild(meta);
      }
    }
  }, [sitemapXml]);

  const downloadSitemap = () => {
    if (!sitemapXml) return;
    
    const blob = new Blob([sitemapXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // If accessed directly via /sitemap.xml, serve XML content
  if (window.location.pathname === '/sitemap.xml') {
    if (isLoading) {
      return <div>Generazione sitemap...</div>;
    }
    
    return (
      <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', fontSize: '14px' }}>
        {sitemapXml}
      </div>
    );
  }

  // Regular admin interface
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Gestione Sitemap Dinamica</h1>
        
        {isLoading ? (
          <div className="text-xl">Generazione sitemap in corso...</div>
        ) : (
          <>
            <div className="flex gap-4 mb-8">
              <button
                onClick={downloadSitemap}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Scarica Sitemap
              </button>
              
              <a
                href="/sitemap.xml"
                target="_blank"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
              >
                Visualizza Sitemap
              </a>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg mb-8">
              <h3 className="text-lg font-semibold mb-4">Anteprima Sitemap:</h3>
              <pre className="text-sm text-gray-300 overflow-auto max-h-96 whitespace-pre-wrap">
                {sitemapXml}
              </pre>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Istruzioni Google Search Console:</h3>
              <ol className="text-gray-300 space-y-2 list-decimal list-inside">
                <li>Accedi a <a href="https://search.google.com/search-console" className="text-blue-400 hover:underline">Google Search Console</a></li>
                <li>Seleziona la proprietà muvfitness.it</li>
                <li>Vai su "Sitemap" nel menu laterale</li>
                <li>Inserisci "sitemap.xml" nel campo URL</li>
                <li>Clicca "Invia"</li>
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DynamicSitemap;