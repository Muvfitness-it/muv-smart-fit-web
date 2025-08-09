import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface SlugResult {
  id: string;
  title: string;
  from_slug: string;
  to_slug: string;
  status: string;
}

const SlugNormalizer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<SlugResult[]>([]);
  const [redirects, setRedirects] = useState<string[]>([]);

  const runSlugNormalization = async () => {
    setIsRunning(true);
    setProgress(0);
    setResults([]);
    setRedirects([]);

    try {
      const { data, error } = await supabase.functions.invoke('slug-normalizer', {
        body: { batchSize: 20 }
      });

      if (error) throw error;

      setResults(data.results || []);
      setRedirects(data.redirects_created || []);
      setProgress(100);

      toast({
        title: "Normalizzazione completata",
        description: `${data.processed} slug aggiornati, ${data.redirects_created?.length || 0} redirect creati`,
      });

    } catch (e) {
      console.error('Slug normalization error:', e);
      toast({
        title: "Errore",
        description: `Errore durante la normalizzazione: ${e.message}`,
        variant: "destructive"
      });
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'updated':
      case 'updated_with_suffix':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'already_optimized':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'no_change_needed':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'updated': return 'Aggiornato';
      case 'updated_with_suffix': return 'Aggiornato (con suffisso)';
      case 'already_optimized': return 'Già ottimizzato';
      case 'no_change_needed': return 'Nessuna modifica necessaria';
      default: return status;
    }
  };

  return (
    <div className="border border-border rounded-lg p-4 bg-card text-card-foreground">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Normalizzazione Slug</h3>
        <Button 
          onClick={runSlugNormalization} 
          disabled={isRunning}
          className="flex items-center gap-2"
        >
          {isRunning ? 'Elaborazione...' : 'Normalizza Slug'}
        </Button>
      </div>

      {isRunning && (
        <div className="mb-4">
          <Progress value={progress} className="h-2" />
          <div className="text-sm text-muted-foreground text-center mt-1">
            Elaborazione in corso...
          </div>
        </div>
      )}

      {redirects.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Redirect 301 Creati:</h4>
          <div className="max-h-32 overflow-y-auto space-y-1 text-xs">
            {redirects.map((redirect, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                <ArrowRight className="w-3 h-3 text-blue-500" />
                <span className="font-mono">{redirect}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Risultati elaborazione:</h4>
          <div className="max-h-64 overflow-y-auto space-y-1 text-xs">
            {results.map((result, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getStatusIcon(result.status)}
                  <span className="font-medium truncate">{result.title}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">{getStatusText(result.status)}</span>
                  {result.from_slug !== result.to_slug && (
                    <ArrowRight className="w-3 h-3 text-blue-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SlugNormalizer;