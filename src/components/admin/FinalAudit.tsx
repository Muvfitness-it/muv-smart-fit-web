import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, AlertTriangle, XCircle, Search, Download } from 'lucide-react';

interface AuditSummary {
  total_pages: number;
  pass_count: number;
  warn_count: number;
  fail_count: number;
  pass_percentage: number;
  warn_percentage: number;
  fail_percentage: number;
  go_no_go: 'GO' | 'NO-GO';
  go_no_go_reason: string;
}

interface TopIssue {
  issue: string;
  count: number;
  impact: 'ALTA' | 'MEDIA' | 'BASSA';
}

const FinalAudit: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [auditSummary, setAuditSummary] = useState<AuditSummary | null>(null);
  const [topIssues, setTopIssues] = useState<TopIssue[]>([]);
  const [optimizationStatus, setOptimizationStatus] = useState<any>(null);
  const [auditResults, setAuditResults] = useState<any[]>([]);

  const runFinalAudit = async () => {
    setIsRunning(true);
    
    try {
      toast({
        title: "Avvio verifica finale",
        description: "Analisi completa di tutti i contenuti in corso...",
      });

      const { data, error } = await supabase.functions.invoke('final-audit');

      if (error) throw error;

      setAuditSummary(data.audit_summary);
      setTopIssues(data.top_issues || []);
      setOptimizationStatus(data.optimization_status);
      setAuditResults(data.audit_results || []);

      toast({
        title: data.audit_summary.go_no_go === 'GO' ? "🎉 Audit PASSED!" : "⚠️ Audit FAILED",
        description: data.audit_summary.go_no_go_reason,
        variant: data.audit_summary.go_no_go === 'GO' ? "default" : "destructive"
      });

    } catch (e) {
      console.error('Audit error:', e);
      toast({
        title: "Errore durante l'audit",
        description: e.message,
        variant: "destructive"
      });
    } finally {
      setIsRunning(false);
    }
  };

  const exportReport = () => {
    const report = {
      audit_summary: auditSummary,
      top_issues: topIssues,
      optimization_status: optimizationStatus,
      audit_results: auditResults,
      generated_at: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `muv-fitness-audit-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Verifica Finale GO/NO-GO
          {auditSummary && (
            <Badge variant={auditSummary.go_no_go === 'GO' ? 'default' : 'destructive'}>
              {auditSummary.go_no_go}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Button 
            onClick={runFinalAudit} 
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            {isRunning ? 'Verifica in corso...' : 'Avvia Verifica Finale'}
          </Button>
          
          {auditSummary && (
            <Button onClick={exportReport} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Esporta Report
            </Button>
          )}
        </div>

        {auditSummary && (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-700">{auditSummary.pass_count}</div>
                <div className="text-sm text-green-600">PASS ({auditSummary.pass_percentage}%)</div>
              </div>
              
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-center mb-2">
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-yellow-700">{auditSummary.warn_count}</div>
                <div className="text-sm text-yellow-600">WARN ({auditSummary.warn_percentage}%)</div>
              </div>
              
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center justify-center mb-2">
                  <XCircle className="w-6 h-6 text-red-500" />
                </div>
                <div className="text-2xl font-bold text-red-700">{auditSummary.fail_count}</div>
                <div className="text-sm text-red-600">FAIL ({auditSummary.fail_percentage}%)</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Qualità Complessiva</span>
                <span>{auditSummary.pass_percentage}% PASS</span>
              </div>
              <Progress 
                value={auditSummary.pass_percentage} 
                className={`h-3 ${auditSummary.pass_percentage >= 95 ? 'text-green-500' : 'text-red-500'}`} 
              />
              <div className="text-xs text-muted-foreground">
                Soglia per GO: ≥95% PASS e 0 FAIL
              </div>
            </div>

            {/* GO/NO-GO Result */}
            <div className={`p-4 rounded-lg border text-center ${
              auditSummary.go_no_go === 'GO' 
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="text-lg font-semibold">
                {auditSummary.go_no_go === 'GO' ? '✅ SITO PRONTO PER IL RILASCIO' : '❌ SITO NON PRONTO'}
              </div>
              <div className="text-sm mt-1">{auditSummary.go_no_go_reason}</div>
            </div>

            {/* Top Issues */}
            {topIssues.length > 0 && (
              <div>
                <h4 className="font-medium mb-3">Top 10 Problemi Riscontrati</h4>
                <div className="space-y-2">
                  {topIssues.slice(0, 5).map((issue, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                      <span className="text-sm">{issue.issue}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          issue.impact === 'ALTA' ? 'destructive' : 
                          issue.impact === 'MEDIA' ? 'secondary' : 'outline'
                        }>
                          {issue.impact}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{issue.count}×</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optimization Status */}
            {optimizationStatus && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Post ottimizzati:</span>
                  <div className="font-medium">
                    {optimizationStatus.posts_optimized}/{optimizationStatus.total_posts} 
                    ({optimizationStatus.coverage_percentage}%)
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Redirect 301:</span>
                  <div className="font-medium">{optimizationStatus.redirects_count} attivi</div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinalAudit;