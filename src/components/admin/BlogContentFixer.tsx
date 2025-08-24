import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';

export const BlogContentFixer = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const fixBlogContent = async () => {
    setIsProcessing(true);
    setResults(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('blog-content-fixer');
      
      if (error) {
        throw error;
      }

      setResults(data);
      toast({
        title: 'Contenuti blog corretti con successo!',
        description: `${data.updated} articoli aggiornati su ${data.total} totali.`,
      });
    } catch (error: any) {
      console.error('Error fixing blog content:', error);
      toast({
        title: 'Errore durante la correzione',
        description: error.message || 'Si è verificato un errore imprevisto.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          Correttore Contenuti Blog
        </CardTitle>
        <CardDescription>
          Pulisce automaticamente tutti i contenuti del blog rimuovendo colori inline, 
          convertendo tag obsoleti e applicando il template uniforme con TOC automatici.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Operazioni eseguite:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Rimozione colori inline (span style="color:...")</li>
            <li>• Conversione <code>&lt;b&gt;</code>→<code>&lt;strong&gt;</code>, <code>&lt;i&gt;</code>→<code>&lt;em&gt;</code></li>
            <li>• Aggiunta hero section standard</li>
            <li>• Generazione TOC automatica per articoli &gt;1000 parole</li>
            <li>• Aggiunta ID ai titoli per navigazione</li>
            <li>• Normalizzazione spazi e formattazione</li>
          </ul>
        </div>

        <Button 
          onClick={fixBlogContent} 
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Correzione in corso...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Correggi Contenuti Blog
            </>
          )}
        </Button>

        {results && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Risultati correzione:</h4>
            <div className="text-sm space-y-2 text-green-700">
              <p><strong>Articoli aggiornati:</strong> {results.updated}/{results.total}</p>
              {results.fixes_applied && (
                <div>
                  <p className="font-medium">Correzioni applicate:</p>
                  <ul className="ml-4 space-y-1">
                    {results.fixes_applied.map((fix: string, index: number) => (
                      <li key={index}>• {fix}</li>
                    ))}
                  </ul>
                </div>
              )}
              {results.errors && results.errors.length > 0 && (
                <div>
                  <p className="font-medium text-red-600">Errori:</p>
                  <ul className="ml-4 space-y-1 text-red-600">
                    {results.errors.map((error: any, index: number) => (
                      <li key={index}>• {error.slug}: {error.error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};