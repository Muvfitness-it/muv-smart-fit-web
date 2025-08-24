import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Globe, Zap, Search, ExternalLink } from 'lucide-react';

export const SEOManager = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const generateSitemaps = async () => {
    setIsGenerating(true);
    try {
      // Generate all sitemaps
      const sitemapTypes = ['main', 'pages', 'services', 'blog', 'rss', 'atom'];
      const results = [];
      
      for (const type of sitemapTypes) {
        const { data, error } = await supabase.functions.invoke('advanced-sitemap', {
          body: { type }
        });
        
        if (error) throw error;
        results.push({ type, success: true });
      }

      toast({
        title: 'Sitemaps generati con successo!',
        description: `${results.length} file generati: XML sitemaps, RSS e Atom feed`,
      });
    } catch (error: any) {
      console.error('Error generating sitemaps:', error);
      toast({
        title: 'Errore nella generazione',
        description: error.message || 'Si è verificato un errore imprevisto.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const pingSearchEngines = async () => {
    setIsPinging(true);
    try {
      const { data, error } = await supabase.functions.invoke('seo-ping', {
        body: { 
          urls: [
            '/',
            '/blog/',
            '/servizi/',
            '/contatti/',
            '/team/',
            '/risultati/'
          ]
        }
      });
      
      if (error) throw error;
      setResults(data);
      
      toast({
        title: 'Notifiche inviate con successo!',
        description: `Google Sitemap Ping e Bing IndexNow completati`,
      });
    } catch (error: any) {
      console.error('Ping error:', error);
      toast({
        title: 'Errore nelle notifiche',
        description: error.message || 'Si è verificato un errore imprevisto.',
        variant: 'destructive',
      });
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          SEO Manager
        </CardTitle>
        <CardDescription>
          Gestione sitemap XML, feed RSS/Atom e notifiche ai motori di ricerca per massimizzare l'indicizzazione.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Sitemap Generation */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Generazione Sitemap & Feed</h4>
          <div className="bg-muted p-4 rounded-lg">
            <h5 className="font-medium mb-2">File generati:</h5>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• /sitemap.xml (Index principale)</li>
              <li>• /sitemap_pages.xml (Pagine statiche)</li>
              <li>• /sitemap_services.xml (Pagine servizi)</li>
              <li>• /sitemap_blog.xml (Blog posts e categorie)</li>
              <li>• /blog/rss.xml (RSS Feed)</li>
              <li>• /blog/atom.xml (Atom Feed)</li>
            </ul>
          </div>

          <Button 
            onClick={generateSitemaps} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generazione in corso...
              </>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4" />
                Genera Sitemap & Feed
              </>
            )}
          </Button>
        </div>

        {/* Search Engine Ping */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Notifiche Motori di Ricerca</h4>
          <div className="bg-muted p-4 rounded-lg">
            <h5 className="font-medium mb-2">Servizi notificati:</h5>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Google Sitemap Ping</li>
              <li>• Bing IndexNow API</li>
              <li>• Yandex IndexNow (automatico)</li>
              <li>• Notifica pagine prioritarie</li>
            </ul>
          </div>

          <Button 
            onClick={pingSearchEngines} 
            disabled={isPinging}
            className="w-full"
          >
            {isPinging ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Notificando...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Ping Motori di Ricerca
              </>
            )}
          </Button>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Risultati Notifiche:</h4>
            <div className="text-sm space-y-2 text-green-700">
              {results.results?.map((result: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{result.service}</span>
                  <span className={result.success ? 'text-green-600' : 'text-red-600'}>
                    {result.success ? '✓ Successo' : '✗ Errore'}
                  </span>
                </div>
              ))}
              {results.indexNowKey && (
                <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                  <strong>Azione Richiesta:</strong> Crea file <code>/public/{results.indexNowKey}.txt</code> con contenuto: <code>{results.indexNowKey}</code>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-semibold">Link Rapidi</h4>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="h-3 w-3" />
              Sitemap Index
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="h-3 w-3" />
              Robots.txt
            </a>
            <a
              href="/blog/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="h-3 w-3" />
              RSS Feed
            </a>
            <a
              href="/seo-report"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="h-3 w-3" />
              SEO Report
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};