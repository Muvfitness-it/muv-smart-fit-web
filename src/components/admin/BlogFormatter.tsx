import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Play, Download, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface FormatResult {
  id: string;
  title: string;
  slug: string;
  status: string;
  url: string;
  modified_fields: string[];
  stats_before: {
    characters: number;
    sentences: number;
    paragraphs: number;
  };
  stats_after: {
    characters: number;
    sentences: number;
    paragraphs: number;
  };
  improvement: {
    characters_change: number;
    sentences_added: number;
    paragraphs_restructured: number;
  };
}

interface FormatResponse {
  success: boolean;
  processed_this_run: number;
  total_posts: number;
  remaining: number;
  results: FormatResult[];
  errors: any[];
  next_batch_ready: boolean;
  summary: {
    formatting_applied: string[];
    backup_created: boolean;
    posts_updated: number;
  };
}

const BlogFormatter: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<FormatResult[]>([]);
  const [totalProcessed, setTotalProcessed] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [errors, setErrors] = useState<any[]>([]);
  const [currentBatch, setCurrentBatch] = useState(1);

  const runFormatting = async (isAutoContinue = false, offset = 0) => {
    if (!isAutoContinue) {
      setIsRunning(true);
      setResults([]);
      setErrors([]);
      setTotalProcessed(0);
      setCurrentBatch(1);
      setProgress(0);
    }

    try {
      const { data, error } = await supabase.functions.invoke('blog-formatter', {
        body: { batchSize: 25, offset }
      });

      if (error) throw error;

      const response: FormatResponse = data;
      
      setResults(prev => [...prev, ...response.results]);
      setErrors(prev => [...prev, ...(response.errors || [])]);
      const newTotal = offset + response.processed_this_run;
      setTotalProcessed(newTotal);
      setTotalPosts(response.total_posts);
      setProgress(Math.min(100, (newTotal / response.total_posts) * 100));

      toast({
        title: `✅ Batch ${currentBatch} completato`,
        description: `${response.processed_this_run} articoli formattati. ${Math.max(0, response.total_posts - newTotal)} rimanenti.`,
      });

      // Auto-continue if there are remaining posts
      if (newTotal < response.total_posts && response.next_batch_ready) {
        setCurrentBatch(prev => prev + 1);
        setTimeout(() => runFormatting(true, newTotal), 1500); // Wait 1.5s between batches
      } else {
        setIsRunning(false);
        toast({
          title: "🎉 Formattazione completata!",
          description: `Tutti i ${response.total_posts} articoli sono stati formattati con successo.`,
        });
      }

    } catch (e: any) {
      setIsRunning(false);
      toast({
        title: "Errore nella formattazione",
        description: e?.message || String(e),
        variant: "destructive"
      });
    }
  };

  const downloadReport = () => {
    const csvData = [
      ['URL', 'Titolo', 'Status', 'Campi Modificati', 'Caratteri Prima', 'Caratteri Dopo', 'Frasi Aggiunte', 'Paragrafi Ristrutturati'],
      ...results.map(result => [
        result.url,
        result.title,
        result.status,
        result.modified_fields.join(', '),
        result.stats_before.characters,
        result.stats_after.characters,
        result.improvement.sentences_added,
        result.improvement.paragraphs_restructured
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blog-reformat-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>🚀 FORZA REFORMAT BLOG</span>
          <div className="text-sm text-muted-foreground">
            {totalProcessed}/{totalPosts} completati
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Formattazione Applicata:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Frasi ≤ 20 parole (split automatico)</li>
            <li>• Paragrafi ≤ 4 righe (2-4 frasi ciascuno)</li>
            <li>• H1 unico; H2/H3 ordinati (no salti)</li>
            <li>• Liste automatiche quando appropriato</li>
            <li>• Correzione punteggiatura completa</li>
            <li>• CTA finale personalizzata</li>
            <li>• Backup sicuro pre-modifica</li>
          </ul>
        </div>

        {totalPosts > 0 && (
          <div className="space-y-2">
            <Progress value={progress} className="h-3" />
            <div className="text-sm text-muted-foreground text-center">
              {progress.toFixed(1)}% completato - Batch {currentBatch} in corso
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={() => runFormatting(false, 0)} 
            disabled={isRunning}
            className="flex items-center gap-2 flex-1"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Formattazione in corso... (Batch {currentBatch})
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                AVVIA REFORMAT COMPLETO (Batch 25)
              </>
            )}
          </Button>
          
          {results.length > 0 && (
            <Button onClick={downloadReport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Report CSV
            </Button>
          )}
        </div>

        {/* Real-time Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold">Risultati Formattazione:</h4>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {results.map((result, index) => (
                <div key={result.id} className="border rounded-lg p-3 text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium truncate">{result.title}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant={result.status === 'published' ? 'default' : 'secondary'}>
                        {result.status}
                      </Badge>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                  
                  {result.modified_fields.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {result.modified_fields.map(field => (
                        <Badge key={field} variant="outline" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <div>Caratteri: {result.stats_before.characters} → {result.stats_after.characters}</div>
                    <div>Frasi: +{result.improvement.sentences_added}</div>
                    <div>§: {result.improvement.paragraphs_restructured}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Errori ({errors.length})
            </h4>
            <div className="space-y-1 text-sm text-red-700">
              {errors.map((error, index) => (
                <div key={index}>{error.title}: {error.error}</div>
              ))}
            </div>
          </div>
        )}

        {/* Completion Summary */}
        {!isRunning && totalProcessed > 0 && totalProcessed === totalPosts && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">✅ Formattazione Completata!</h4>
            <div className="text-sm text-green-700">
              <p><strong>{totalProcessed}</strong> articoli formattati con successo</p>
              <p>Report CSV scaricabile • Backup creato • Pronto per audit finale</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogFormatter;