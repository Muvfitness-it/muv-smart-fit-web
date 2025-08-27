import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, XCircle, Download, Zap, Image, Palette, Globe } from 'lucide-react';

interface OptimizationIssue {
  type: 'error' | 'warning' | 'success';
  category: 'performance' | 'seo' | 'accessibility' | 'images' | 'css' | 'js';
  message: string;
  suggestion?: string;
  impact: 'high' | 'medium' | 'low';
}

interface OptimizationReportProps {
  title?: string;
  onRunOptimization?: () => void;
}

const OptimizationReport = ({ title = "Report Ottimizzazioni", onRunOptimization }: OptimizationReportProps) => {
  const [issues, setIssues] = useState<OptimizationIssue[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [performanceScore, setPerformanceScore] = useState<number | null>(null);

  useEffect(() => {
    runAnalysis();
  }, []);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    
    const detectedIssues: OptimizationIssue[] = [];

    // Analisi immagini
    const images = document.querySelectorAll('img');
    let webpCount = 0;
    let lazyCount = 0;
    
    images.forEach(img => {
      if (img.src.includes('.webp')) webpCount++;
      if (img.loading === 'lazy') lazyCount++;
      
      if (!img.alt) {
        detectedIssues.push({
          type: 'error',
          category: 'accessibility',
          message: `Immagine senza attributo alt: ${img.src.substring(0, 50)}...`,
          suggestion: 'Aggiungi attributi alt descrittivi per tutte le immagini',
          impact: 'high'
        });
      }
      
      if (!img.width || !img.height) {
        detectedIssues.push({
          type: 'warning',
          category: 'performance',
          message: 'Immagine senza dimensioni specificate causa layout shift',
          suggestion: 'Specifica sempre width e height per le immagini',
          impact: 'medium'
        });
      }
    });

    if (webpCount < images.length * 0.8) {
      detectedIssues.push({
        type: 'warning',
        category: 'images',
        message: `Solo ${webpCount}/${images.length} immagini utilizzano formato WebP`,
        suggestion: 'Converti tutte le immagini in WebP per ridurre la dimensione',
        impact: 'high'
      });
    }

    if (lazyCount < images.length * 0.7) {
      detectedIssues.push({
        type: 'warning',
        category: 'performance',
        message: `Solo ${lazyCount}/${images.length} immagini utilizzano lazy loading`,
        suggestion: 'Implementa lazy loading per immagini non critiche',
        impact: 'medium'
      });
    }

    // Analisi H1
    const h1Elements = document.querySelectorAll('h1');
    if (h1Elements.length > 1) {
      detectedIssues.push({
        type: 'error',
        category: 'seo',
        message: `Trovati ${h1Elements.length} tag H1 nella pagina`,
        suggestion: 'Usa un solo H1 per pagina per una migliore SEO',
        impact: 'high'
      });
    } else if (h1Elements.length === 1) {
      detectedIssues.push({
        type: 'success',
        category: 'seo',
        message: 'Un solo H1 presente nella pagina',
        impact: 'low'
      });
    }

    // Analisi meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      const content = metaDesc.getAttribute('content') || '';
      if (content.length > 160) {
        detectedIssues.push({
          type: 'warning',
          category: 'seo',
          message: `Meta description troppo lunga: ${content.length} caratteri`,
          suggestion: 'Mantieni la meta description sotto i 160 caratteri',
          impact: 'medium'
        });
      } else if (content.length < 120) {
        detectedIssues.push({
          type: 'warning',
          category: 'seo',
          message: `Meta description troppo corta: ${content.length} caratteri`,
          suggestion: 'Usa almeno 120 caratteri per la meta description',
          impact: 'medium'
        });
      } else {
        detectedIssues.push({
          type: 'success',
          category: 'seo',
          message: 'Meta description ottimizzata',
          impact: 'low'
        });
      }
    }

    // Analisi font
    const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    fontLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (!href.includes('display=swap')) {
        detectedIssues.push({
          type: 'warning',
          category: 'performance',
          message: 'Font senza font-display: swap',
          suggestion: 'Aggiungi display=swap ai font per evitare FOIT',
          impact: 'medium'
        });
      }
    });

    // Analisi Google Analytics
    const gaScript = document.querySelector('script[src*="googletagmanager.com"]');
    if (gaScript) {
      detectedIssues.push({
        type: 'success',
        category: 'seo',
        message: 'Google Analytics configurato',
        impact: 'low'
      });
    } else {
      detectedIssues.push({
        type: 'warning',
        category: 'seo',
        message: 'Google Analytics non rilevato',
        suggestion: 'Configura Google Analytics 4 per il tracking',
        impact: 'medium'
      });
    }

    // Analisi performance
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        if (loadTime > 3000) {
          detectedIssues.push({
            type: 'error',
            category: 'performance',
            message: `Tempo di caricamento elevato: ${Math.round(loadTime)}ms`,
            suggestion: 'Ottimizza immagini, CSS e JavaScript per ridurre i tempi',
            impact: 'high'
          });
        } else if (loadTime > 2000) {
          detectedIssues.push({
            type: 'warning',
            category: 'performance',
            message: `Tempo di caricamento accettabile: ${Math.round(loadTime)}ms`,
            suggestion: 'Continua ad ottimizzare per migliorare le performance',
            impact: 'medium'
          });
        } else {
          detectedIssues.push({
            type: 'success',
            category: 'performance',
            message: `Ottimo tempo di caricamento: ${Math.round(loadTime)}ms`,
            impact: 'low'
          });
        }

        // Calcola performance score
        const score = Math.max(0, Math.min(100, 100 - (loadTime / 50)));
        setPerformanceScore(Math.round(score));
      }
    }

    setIssues(detectedIssues);
    setIsAnalyzing(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return <Zap className="w-4 h-4" />;
      case 'images': return <Image className="w-4 h-4" />;
      case 'css': return <Palette className="w-4 h-4" />;
      case 'seo': return <Globe className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      performanceScore,
      issues: issues.map(issue => ({
        type: issue.type,
        category: issue.category,
        message: issue.message,
        suggestion: issue.suggestion,
        impact: issue.impact
      }))
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `optimization-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const errorCount = issues.filter(issue => issue.type === 'error').length;
  const warningCount = issues.filter(issue => issue.type === 'warning').length;
  const successCount = issues.filter(issue => issue.type === 'success').length;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            {title}
          </CardTitle>
          <div className="flex gap-2">
            <Button onClick={runAnalysis} disabled={isAnalyzing} variant="outline" size="sm">
              {isAnalyzing ? 'Analizzando...' : 'Aggiorna'}
            </Button>
            <Button onClick={exportReport} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Esporta
            </Button>
          </div>
        </div>
        
        {performanceScore !== null && (
          <div className="flex items-center gap-4 mt-4">
            <div className="text-2xl font-bold">
              Score: {performanceScore}/100
            </div>
            <div className="flex gap-2">
              <Badge variant="destructive">{errorCount} errori</Badge>
              <Badge variant="secondary">{warningCount} avvisi</Badge>
              <Badge variant="default">{successCount} successi</Badge>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {isAnalyzing ? (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Analizzando le ottimizzazioni...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {issues.map((issue, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(issue.type)}
                    {getCategoryIcon(issue.category)}
                    <span className="font-medium">{issue.message}</span>
                  </div>
                  <Badge className={getImpactColor(issue.impact)}>
                    {issue.impact}
                  </Badge>
                </div>
                {issue.suggestion && (
                  <p className="text-sm text-muted-foreground ml-6">
                    💡 {issue.suggestion}
                  </p>
                )}
              </div>
            ))}
            
            {onRunOptimization && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Vuoi ottimizzare automaticamente?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Posso applicare automaticamente alcune delle ottimizzazioni rilevate.
                </p>
                <Button onClick={onRunOptimization} className="w-full">
                  Applica Ottimizzazioni Automatiche
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OptimizationReport;