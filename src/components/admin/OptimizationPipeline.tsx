import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Play, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';

interface PipelineStep {
  id: string;
  name: string;
  description: string;
  function: string;
  completed: boolean;
  running: boolean;
  result?: any;
}

const OptimizationPipeline: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<PipelineStep[]>([
    {
      id: 'slug',
      name: 'Normalizzazione Slug',
      description: 'Ottimizza slug lunghi e crea redirect 301',
      function: 'slug-normalizer',
      completed: false,
      running: false
    },
    {
      id: 'batch',
      name: 'Retro-ottimizzazione Batch',
      description: 'Applica ottimizzazioni SEO a tutti i contenuti',
      function: 'auto-optimizer',
      completed: false,
      running: false
    },
    {
      id: 'images',
      name: 'Pipeline Immagini',
      description: 'Converte immagini a responsive con srcset e WebP',
      function: 'image-optimizer',
      completed: false,
      running: false
    },
    {
      id: 'jsonld',
      name: 'JSON-LD Article/FAQ',
      description: 'Aggiunge schema structured data',
      function: 'jsonld-optimizer',
      completed: false,
      running: false
    },
    {
      id: 'linking',
      name: 'Internal Linking',
      description: 'Aggiunge link interni strategici',
      function: 'internal-linker',
      completed: false,
      running: false
    }
  ]);

  const runStep = async (stepIndex: number): Promise<boolean> => {
    const step = steps[stepIndex];
    
    setSteps(prev => prev.map((s, i) => 
      i === stepIndex ? { ...s, running: true } : s
    ));

    try {
      console.log(`Invoking function: ${step.function}`);
      
      const { data, error } = await supabase.functions.invoke(step.function, {
        body: { batchSize: step.function === 'auto-optimizer' ? 25 : 15 }
      });

      if (error) {
        console.error(`Function ${step.function} error:`, error);
        throw new Error(`${error.message || 'Unknown error'}`);
      }

      setSteps(prev => prev.map((s, i) => 
        i === stepIndex ? { 
          ...s, 
          running: false, 
          completed: true, 
          result: data 
        } : s
      ));

      toast({
        title: `${step.name} completato`,
        description: `${data?.processed || 0} elementi processati`,
      });

      return true;
    } catch (e) {
      setSteps(prev => prev.map((s, i) => 
        i === stepIndex ? { ...s, running: false } : s
      ));

      toast({
        title: `Errore in ${step.name}`,
        description: e.message,
        variant: "destructive"
      });

      return false;
    }
  };

  const runFullPipeline = async () => {
    setIsRunning(true);
    setCurrentStep(0);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      const success = await runStep(i);
      
      if (!success) {
        toast({
          title: "Pipeline interrotta",
          description: `Errore al passo ${i + 1}: ${steps[i].name}`,
          variant: "destructive"
        });
        break;
      }

      // Small delay between steps
      if (i < steps.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Final sitemap update
    try {
      await supabase.functions.invoke('update-sitemaps', {
        body: { action: 'update_all_sitemaps', trigger: 'pipeline_complete' }
      });
      
      toast({
        title: "🎉 Pipeline completata!",
        description: "Tutte le ottimizzazioni sono state applicate e la sitemap è stata aggiornata.",
      });
    } catch (e) {
      console.warn('Sitemap update failed:', e);
    }

    setIsRunning(false);
    setCurrentStep(-1);
  };

  const resetPipeline = () => {
    setSteps(prev => prev.map(s => ({ 
      ...s, 
      completed: false, 
      running: false, 
      result: undefined 
    })));
    setCurrentStep(0);
  };

  const completedSteps = steps.filter(s => s.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Pipeline Ottimizzazione Completa
          <div className="text-sm text-muted-foreground">
            {completedSteps}/{steps.length} completati
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Progress value={progress} className="h-3" />
          <div className="text-sm text-muted-foreground text-center">
            {progress.toFixed(0)}% completato
          </div>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                currentStep === index ? 'border-primary bg-primary/5' :
                step.completed ? 'border-green-200 bg-green-50' :
                'border-border'
              }`}
            >
              <div className="flex-shrink-0">
                {step.running ? (
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : step.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-medium">{step.name}</div>
                <div className="text-sm text-muted-foreground">{step.description}</div>
                {step.result && (
                  <div className="text-xs text-green-600 mt-1">
                    ✓ {step.result.processed || 0} elementi processati
                    {step.result.errors?.length > 0 && (
                      <span className="text-red-600 ml-2">
                        ({step.result.errors.length} errori)
                      </span>
                    )}
                  </div>
                )}
              </div>

              {!isRunning && !step.completed && (
                <Button
                  onClick={() => runStep(index)}
                  variant="outline"
                  size="sm"
                  disabled={step.running}
                >
                  Esegui
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {!isRunning ? (
            <>
              <Button 
                onClick={runFullPipeline} 
                className="flex items-center gap-2 flex-1"
                disabled={completedSteps === steps.length}
              >
                <Play className="w-4 h-4" />
                {completedSteps === 0 ? 'Avvia Pipeline Completa' : 'Continua Pipeline'}
              </Button>
              
              {completedSteps > 0 && (
                <Button onClick={resetPipeline} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              )}
            </>
          ) : (
            <Button variant="outline" className="flex-1" disabled>
              Pipeline in esecuzione... ({currentStep + 1}/{steps.length})
            </Button>
          )}
        </div>

        {completedSteps === steps.length && (
          <div className="text-center text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
            🎉 Pipeline completata! Il sito è ora completamente ottimizzato.
            <br />
            Procedi con la <strong>Verifica GO/NO-GO</strong> per confermare il risultato.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OptimizationPipeline;