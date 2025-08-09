import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Square, RefreshCw, CheckCircle } from 'lucide-react';

interface BatchResult {
  run_id: string;
  processed: number;
  errors: number;
  results: any[];
}

const AutoOptimizerControl: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [processedPosts, setProcessedPosts] = useState(0);
  const [results, setResults] = useState<BatchResult[]>([]);
  const [lastRun, setLastRun] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id', { count: 'exact' })
        .in('status', ['published', 'draft']);
      
      if (!error && data) {
        setTotalPosts(data.length);
      }

      // Get last run info
      const { data: logs } = await supabase
        .from('auto_optimizer_logs')
        .select('run_id, created_at')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (logs?.[0]) {
        setLastRun(new Date(logs[0].created_at).toLocaleString('it-IT'));
      }
    } catch (e) {
      console.warn('Error fetching stats:', e);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const runBatch = async (batchSize = 25): Promise<BatchResult | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('auto-optimizer', {
        body: { source: 'manual_batch', limit: batchSize }
      });

      if (error) throw error;
      return data as BatchResult;
    } catch (e) {
      console.error('Batch run error:', e);
      toast.error(`Errore batch: ${e.message}`);
      return null;
    }
  };

  const runFullOptimization = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setProgress(0);
    setProcessedPosts(0);
    setResults([]);
    
    toast.info('Avvio retro-ottimizzazione completa...', { duration: 3000 });

    let totalProcessed = 0;
    const batchSize = 25;
    const batchResults: BatchResult[] = [];

    try {
      // Run batches until all content is processed
      while (totalProcessed < totalPosts) {
        const result = await runBatch(batchSize);
        if (!result) break;

        batchResults.push(result);
        totalProcessed += result.processed;
        setProcessedPosts(totalProcessed);
        setProgress(Math.min(100, (totalProcessed / totalPosts) * 100));
        setResults([...batchResults]);

        // If no more posts processed, we're done
        if (result.processed === 0) break;

        // Small delay between batches to avoid overwhelming
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Trigger sitemap update
      try {
        await supabase.functions.invoke('update-sitemaps', {
          body: { action: 'update_all_sitemaps', trigger: 'batch_complete' }
        });
        toast.success('Sitemap aggiornata');
      } catch (e) {
        console.warn('Sitemap update failed:', e);
      }

      const totalErrors = batchResults.reduce((sum, r) => sum + r.errors, 0);
      
      toast.success(
        `Retro-ottimizzazione completata! ${totalProcessed} contenuti processati${totalErrors > 0 ? `, ${totalErrors} errori` : ''}`,
        { duration: 5000 }
      );

      await fetchStats();
    } catch (e) {
      toast.error(`Errore durante l'ottimizzazione: ${e.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const stopOptimization = () => {
    setIsRunning(false);
    toast.info('Ottimizzazione fermata');
  };

  return (
    <div className="border border-border rounded-lg p-4 bg-card text-card-foreground">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Auto-Optimizer Control</h3>
        <div className="text-sm text-muted-foreground">
          {lastRun ? `Ultima run: ${lastRun}` : 'Nessuna run registrata'}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Contenuti totali:</span>
            <div className="font-medium">{totalPosts}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Processati:</span>
            <div className="font-medium">{processedPosts}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Batch eseguiti:</span>
            <div className="font-medium">{results.length}</div>
          </div>
        </div>

        {isRunning && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="text-sm text-muted-foreground text-center">
              {progress.toFixed(1)}% completato
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {!isRunning ? (
            <Button onClick={runFullOptimization} className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Avvia Retro-ottimizzazione
            </Button>
          ) : (
            <Button onClick={stopOptimization} variant="destructive" className="flex items-center gap-2">
              <Square className="w-4 h-4" />
              Ferma
            </Button>
          )}
          
          <Button onClick={fetchStats} variant="outline" size="sm" className="flex items-center gap-1">
            <RefreshCw className="w-3 h-3" />
            Aggiorna
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Risultati batch:</h4>
            <div className="max-h-32 overflow-y-auto space-y-1 text-xs">
              {results.map((result, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span>Batch {idx + 1}</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>{result.processed} processati</span>
                    {result.errors > 0 && (
                      <span className="text-red-500">({result.errors} errori)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoOptimizerControl;