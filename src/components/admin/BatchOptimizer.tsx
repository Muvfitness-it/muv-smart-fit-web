import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Play, Square, RotateCcw } from 'lucide-react';

const BatchOptimizer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [processedPosts, setProcessedPosts] = useState(0);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [completed, setCompleted] = useState(false);

  const fetchStats = async () => {
    try {
      const { data } = await supabase
        .from('blog_posts')
        .select('id', { count: 'exact' })
        .in('status', ['published', 'draft']);
      
      if (data) setTotalPosts(data.length);

      // Check if any optimization has run
      const { data: logs } = await supabase
        .from('auto_optimizer_logs')
        .select('content_id', { count: 'exact' })
        .not('content_id', 'is', null);
      
      if (logs) setProcessedPosts(logs.length);
    } catch (e) {
      console.warn('Error fetching stats:', e);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const runBatch = async (batchSize = 25): Promise<boolean> => {
    try {
      const { data, error } = await supabase.functions.invoke('auto-optimizer', {
        body: { source: 'batch_site_wide', limit: batchSize }
      });

      if (error) {
        throw error;
      }

      if (data?.processed > 0) {
        setProcessedPosts(prev => prev + data.processed);
        setCurrentBatch(prev => prev + 1);
        return true; // Continue processing
      }
      
      return false; // No more posts to process
    } catch (e) {
      console.error('Batch error:', e);
      toast({
        title: "Errore batch",
        description: `Errore durante l'elaborazione: ${e.message}`,
        variant: "destructive"
      });
      return false;
    }
  };

  const runFullOptimization = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setProgress(0);
    setCurrentBatch(0);
    setCompleted(false);
    
    toast({
      title: "Avvio retro-ottimizzazione",
      description: "Elaborazione di tutti i contenuti in corso...",
    });

    let hasMoreContent = true;
    const batchSize = 25;

    try {
      while (hasMoreContent && isRunning) {
        hasMoreContent = await runBatch(batchSize);
        
        // Update progress
        const currentProgress = Math.min(100, (processedPosts / totalPosts) * 100);
        setProgress(currentProgress);

        // Small delay between batches
        if (hasMoreContent) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      if (isRunning) {
        // Final sitemap update
        try {
          await supabase.functions.invoke('update-sitemaps', {
            body: { action: 'update_all_sitemaps', trigger: 'batch_complete' }
          });
        } catch (e) {
          console.warn('Sitemap update failed:', e);
        }

        setCompleted(true);
        setProgress(100);
        
        toast({
          title: "Retro-ottimizzazione completata!",
          description: `${processedPosts} contenuti processati in ${currentBatch} batch`,
        });

        await fetchStats();
      }
    } finally {
      setIsRunning(false);
    }
  };

  const stopOptimization = () => {
    setIsRunning(false);
    toast({
      title: "Ottimizzazione fermata",
      description: "Il processo è stato interrotto dall'utente",
    });
  };

  const resetProgress = () => {
    setProgress(0);
    setProcessedPosts(0);
    setCurrentBatch(0);
    setCompleted(false);
    fetchStats();
  };

  return (
    <div className="border border-border rounded-lg p-4 bg-card text-card-foreground">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Retro-ottimizzazione Site-wide</h3>
        <div className="text-sm text-muted-foreground">
          {processedPosts}/{totalPosts} contenuti elaborati
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Totale:</span>
            <div className="font-medium">{totalPosts}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Elaborati:</span>
            <div className="font-medium">{processedPosts}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Batch:</span>
            <div className="font-medium">{currentBatch}</div>
          </div>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-3" />
          <div className="text-sm text-muted-foreground text-center">
            {progress.toFixed(1)}% completato
            {isRunning && " - Elaborazione in corso..."}
            {completed && " - ✅ Completato!"}
          </div>
        </div>

        <div className="flex gap-2">
          {!isRunning ? (
            <>
              <Button 
                onClick={runFullOptimization} 
                className="flex items-center gap-2 flex-1"
                disabled={completed && processedPosts >= totalPosts}
              >
                <Play className="w-4 h-4" />
                {processedPosts === 0 ? 'Avvia Retro-ottimizzazione' : 'Continua Elaborazione'}
              </Button>
              <Button onClick={resetProgress} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button onClick={stopOptimization} variant="destructive" className="flex items-center gap-2 flex-1">
              <Square className="w-4 h-4" />
              Ferma Elaborazione
            </Button>
          )}
        </div>

        {completed && (
          <div className="text-center text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
            🎉 Retro-ottimizzazione completata con successo!
            <br />
            Tutti i contenuti sono stati elaborati e la sitemap è stata aggiornata.
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchOptimizer;