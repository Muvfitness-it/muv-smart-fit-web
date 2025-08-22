import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Palette, CheckSquare } from 'lucide-react';

export const BlogThemeNormalizer = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const normalizeBlogTheme = async () => {
    try {
      setIsProcessing(true);
      setResults(null);

      const { data, error } = await supabase.functions.invoke('blog-theme-normalizer', {
        body: {}
      });

      if (error) {
        throw error;
      }

      setResults(data);
      
      toast({
        title: "Normalizzazione completata",
        description: `${data.updated} articoli aggiornati su ${data.total}`,
        variant: "default"
      });

    } catch (error) {
      console.error('Error normalizing blog theme:', error);
      toast({
        title: "Errore nella normalizzazione",
        description: "Si è verificato un errore durante l'aggiornamento del tema blog",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Normalizzazione Tema Blog
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Applica il nuovo tema bianco accessibile con accenti dinamici a tutti gli articoli del blog.
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4 text-green-600" />
            <span>Sfondo bianco (#FFF) e testo nero (#111)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4 text-green-600" />
            <span>Rimozione colori inline e sostituzione con &lt;strong&gt;</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4 text-green-600" />
            <span>Accenti dinamici basati sul contenuto</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4 text-green-600" />
            <span>Hero standard e struttura accessibile</span>
          </div>
        </div>

        <Button 
          onClick={normalizeBlogTheme}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Normalizzazione in corso...
            </>
          ) : (
            'Avvia Normalizzazione'
          )}
        </Button>

        {results && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Risultati:</h4>
            <ul className="text-sm space-y-1">
              <li>✅ Articoli aggiornati: {results.updated}</li>
              <li>📊 Totale articoli: {results.total}</li>
              {results.errors?.length > 0 && (
                <li>⚠️ Errori: {results.errors.length}</li>
              )}
            </ul>
            
            {results.errors?.length > 0 && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm font-medium">
                  Mostra errori
                </summary>
                <ul className="mt-2 text-xs space-y-1">
                  {results.errors.map((err: any, idx: number) => (
                    <li key={idx} className="text-red-600">
                      {err.slug}: {err.error}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};