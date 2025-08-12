import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface RestoreResult {
  id: string;
  slug: string;
  title: string;
  status: string;
  words: number;
  action: 'restored' | 'no-backup-found';
}

interface RestoreResponse {
  success: boolean;
  summary: {
    total_posts: number;
    restored: number;
    no_backup: number;
    under_min_count: number;
    min_words: number;
  };
  results: RestoreResult[];
  under_min: Array<{ id: string; slug: string; title: string; words: number }>;
  errors: Array<{ id: string; slug: string; title: string; error: string }>;
}

const ContentRestore: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState<RestoreResponse | null>(null);
  const [batchSize, setBatchSize] = useState<number>(10);

  const runRestore = async () => {
    try {
      setIsRunning(true);
      setProgress(10);
      setReport(null);

      const { data, error } = await supabase.functions.invoke('restore-backups', {
        body: { minWords: 2000, limit: batchSize }
      });

      if (error) {
        // Prova a mostrare l'errore restituito dalla funzione, se presente
        const serverMsg = (data as any)?.error || (error as any)?.message || 'Errore sconosciuto';
        throw new Error(serverMsg);
      }
      const res = data as RestoreResponse;
      setReport(res);
      setProgress(100);

      toast({
        title: res.success ? 'Ripristino completato' : 'Ripristino terminato con errori',
        description: `Ripristinati ${res.summary.restored}/${res.summary.total_posts}. Articoli < ${res.summary.min_words} parole: ${res.summary.under_min_count}.`,
      });
    } catch (e: any) {
      toast({ title: 'Errore ripristino', description: e?.message || String(e), variant: 'destructive' });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ripristino Articoli da Backup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Esegue uno snapshot, ripristina ogni articolo dalla versione migliore salvata, ripara l'HTML e rimuove duplicazioni di link/CTA. Verifica il minimo di 2000 parole e produce un report.
        </p>
        <div className="flex items-center gap-3">
          <label className="text-sm">Batch (articoli per esecuzione)</label>
          <Input
            type="number"
            min={1}
            max={50}
            value={batchSize}
            onChange={(e) => setBatchSize(Number((e.target as HTMLInputElement).value) || 1)}
            className="w-24"
            aria-label="Limite articoli per ripristino"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={runRestore} disabled={isRunning} className="flex-1">
            {isRunning ? 'Ripristino in corso…' : 'Avvia Ripristino' }
          </Button>
        </div>

            {report.under_min?.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Articoli sotto le 2000 parole</h4>
                <ul className="list-disc ml-5 text-sm space-y-1 max-h-60 overflow-auto">
                  {report.under_min.map(item => (
                    <li key={item.id}>{item.title} — {item.words} parole (/{item.slug})</li>
                  ))}
                </ul>
              </div>
            )}

            {report.errors?.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Errori</h4>
                <ul className="list-disc ml-5 text-sm space-y-1 max-h-60 overflow-auto">
                  {report.errors.map(err => (
                    <li key={err.id}>{err.title}: {err.error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentRestore;
