import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, RefreshCw, Send, FileEdit, Unlock, CheckCircle, Key, ArrowLeft } from "lucide-react";
import GSCMetricsDashboard from "@/components/admin/GSCMetricsDashboard";

interface SEOLog {
  id: string;
  post_id: string;
  url: string;
  title: string;
  indexing_status: string;
  days_in_current_status: number;
  issues_detected: string[];
  suggestions: string[];
  check_date: string;
  gsc_verdict?: string | null;
  gsc_coverage_state?: string | null;
  gsc_last_crawl_time?: string | null;
  blog_posts: { slug: string };
}

interface Summary {
  total_articles: number;
  indexed_articles: number;
  crawled_not_indexed: number;
  critical_articles: number;
}

const SEOMonitorDashboard = () => {
  const { isAdmin, loading: authLoading } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [logs, setLogs] = useState<SEOLog[]>([]);
  const [summary, setSummary] = useState<Summary>({
    total_articles: 0,
    indexed_articles: 0,
    crawled_not_indexed: 0,
    critical_articles: 0
  });
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [monitoring, setMonitoring] = useState(false);
  const [gscAuthorized, setGscAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!isAdmin) {
        navigate('/admin-control');
      } else {
        loadData();
        checkGSCAuth();
      }
    }
  }, [isAdmin, authLoading, navigate]);

  const checkGSCAuth = async () => {
    setCheckingAuth(true);
    try {
      const { data } = await supabase
        .from('gsc_oauth_tokens')
        .select('refresh_token')
        .eq('id', 1)
        .maybeSingle();
      
      setGscAuthorized(!!data?.refresh_token);
    } catch (error) {
      console.error('Error checking GSC auth:', error);
      setGscAuthorized(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleAuthorizeGSC = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('gsc-oauth-init');
      
      if (error) throw error;
      if (!data?.authUrl) throw new Error('No auth URL received');

      // Open OAuth flow in new window
      const width = 600;
      const height = 700;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      
      window.open(
        data.authUrl,
        'GSC Authorization',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      toast({
        title: "🔐 Autorizzazione in corso",
        description: "Completa l'autorizzazione nella finestra popup",
      });
      
      // Check auth status after 10 seconds
      setTimeout(() => {
        checkGSCAuth();
      }, 10000);
      
    } catch (error: any) {
      console.error('Error authorizing GSC:', error);
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const loadData = async () => {
    setLoading(true);
    
    try {
      // Fetch summary
      const { data: summaryData } = await supabase
        .from('seo_monitoring_summary')
        .select('metric_name, metric_value');
      
      if (summaryData) {
        setSummary({
          total_articles: summaryData.find(s => s.metric_name === 'total_articles')?.metric_value || 0,
          indexed_articles: summaryData.find(s => s.metric_name === 'indexed_articles')?.metric_value || 0,
          crawled_not_indexed: summaryData.find(s => s.metric_name === 'crawled_not_indexed')?.metric_value || 0,
          critical_articles: summaryData.find(s => s.metric_name === 'critical_articles')?.metric_value || 0
        });
      }

      // Fetch latest logs with unique post_id (most recent check per article)
      const { data: logsData } = await supabase
        .from('seo_monitoring_log')
        .select(`
          id,
          post_id,
          url,
          title,
          indexing_status,
          days_in_current_status,
          issues_detected,
          suggestions,
          check_date,
          gsc_verdict,
          gsc_coverage_state,
          gsc_last_crawl_time,
          blog_posts!inner(slug)
        `)
        .order('check_date', { ascending: false });

      if (logsData) {
        // Get unique posts (most recent log per post)
        const uniqueLogs = logsData.reduce((acc: any[], log: any) => {
          if (!acc.find(l => l.post_id === log.post_id)) {
            acc.push(log);
          }
          return acc;
        }, []);
        
        setLogs(uniqueLogs as any);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare i dati",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestIndexing = async (slug: string) => {
    try {
      const { error } = await supabase.functions.invoke('indexnow-submitter', {
        body: { urls: [`https://www.muvfitness.it/${slug}`] }
      });

      if (error) throw error;

      toast({
        title: "✅ Richiesta inviata",
        description: `Articolo inviato ai motori di ricerca`,
      });
    } catch (error: any) {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRunMonitor = async () => {
    try {
      setMonitoring(true);
      
      const { data, error } = await supabase.functions.invoke('seo-monitor');
      
      if (error) throw error;
      
      toast({
        title: "✅ Scansione completata",
        description: data 
          ? `Indicizzati: ${data.indexed} | Non indicizzati: ${data.crawledNotIndexed} | Critici: ${data.critical}`
          : "I dati sono stati aggiornati",
      });
      
      // Reload data after monitoring
      await loadData();
    } catch (error: any) {
      toast({
        title: "Errore",
        description: error.message || "Errore durante la scansione",
        variant: "destructive",
      });
    } finally {
      setMonitoring(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    if (filter === "all") return true;
    if (filter === "indexed") return log.indexing_status === "indexed";
    if (filter === "not_indexed") return log.indexing_status === "crawled_not_indexed" || log.indexing_status === "pending_first_check";
    if (filter === "critical") return (log.indexing_status === "crawled_not_indexed" || log.indexing_status === "pending_first_check") && log.days_in_current_status > 14;
    return true;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      indexed: { variant: "default", label: "✅ Indicizzato", className: "bg-green-100 text-green-800 border-green-300" },
      crawled_not_indexed: { variant: "secondary", label: "⏳ Non indicizzato", className: "bg-orange-100 text-orange-800 border-orange-300" },
      pending_first_check: { variant: "outline", label: "🔄 In attesa", className: "bg-blue-100 text-blue-800 border-blue-300" },
      error: { variant: "destructive", label: "❌ Errore", className: "bg-red-100 text-red-800 border-red-300" }
    };
    return variants[status] || { variant: "outline", label: status, className: "bg-gray-100 text-gray-800" };
  };

  const indexedPercentage = summary.total_articles > 0 
    ? Math.round((summary.indexed_articles / summary.total_articles) * 100) 
    : 0;

  if (authLoading || (loading && logs.length === 0)) {
    return (
      <main className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <main className="container mx-auto px-4 py-10 max-w-7xl">
      <Helmet>
        <title>SEO Monitor - Dashboard Admin MUV</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin-control')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna a Admin Control
          </Button>
          <div>
            <h1 className="text-3xl font-bold">📊 SEO Monitor</h1>
            <p className="text-muted-foreground mt-1">Monitoraggio indicizzazione articoli blog</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {!gscAuthorized && !checkingAuth && (
            <Button 
              onClick={handleAuthorizeGSC}
              variant="outline"
              size="lg"
            >
              <Unlock className="mr-2 h-4 w-4" />
              Autorizza GSC
            </Button>
          )}
          {gscAuthorized && (
            <Badge variant="default" className="gap-1 px-3 py-2 text-sm">
              <CheckCircle className="h-4 w-4" />
              GSC Autorizzato
            </Badge>
          )}
          <Button onClick={handleRunMonitor} disabled={monitoring} size="lg">
            {monitoring ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scansione...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Esegui Scansione
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Totale Articoli</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{summary.total_articles}</div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700">✅ Indicizzati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{summary.indexed_articles}</div>
            <p className="text-xs text-green-600 mt-1 font-medium">
              {indexedPercentage}% del totale
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-700">⏳ Non Indicizzati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{summary.crawled_not_indexed}</div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-red-700">⚠️ Critici (&gt;14gg)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{summary.critical_articles}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="articles" className="mt-8">
        <TabsList>
          <TabsTrigger value="articles">📄 Articoli</TabsTrigger>
          <TabsTrigger value="metrics">📊 Metriche GSC</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="mt-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              onClick={() => setFilter("all")}
              size="sm"
            >
              Tutti ({logs.length})
            </Button>
            <Button 
              variant={filter === "indexed" ? "default" : "outline"} 
              onClick={() => setFilter("indexed")}
              size="sm"
            >
              ✅ Indicizzati ({logs.filter(l => l.indexing_status === "indexed").length})
            </Button>
            <Button 
              variant={filter === "not_indexed" ? "default" : "outline"} 
              onClick={() => setFilter("not_indexed")}
              size="sm"
            >
              ⏳ Non Indicizzati ({logs.filter(l => l.indexing_status === "crawled_not_indexed" || l.indexing_status === "pending_first_check").length})
            </Button>
            <Button 
              variant={filter === "critical" ? "default" : "outline"} 
              onClick={() => setFilter("critical")}
              size="sm"
            >
              ⚠️ Critici ({logs.filter(l => (l.indexing_status === "crawled_not_indexed" || l.indexing_status === "pending_first_check") && l.days_in_current_status > 14).length})
            </Button>
          </div>

      {/* Articles List */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : filteredLogs.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">Nessun articolo trovato per questo filtro</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredLogs.map((log) => {
            const statusBadge = getStatusBadge(log.indexing_status);
            const isCritical = (log.indexing_status === "crawled_not_indexed" || log.indexing_status === "pending_first_check") && log.days_in_current_status > 14;

            return (
              <Card key={log.id} className={isCritical ? "border-red-300 bg-red-50/30" : ""}>
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                    <div className="flex-1 w-full">
                      {/* Title and badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <h3 className="font-semibold text-lg">{log.title}</h3>
                        <Badge className={statusBadge.className}>
                          {statusBadge.label}
                        </Badge>
                        {log.gsc_verdict && (
                          <Badge 
                            variant={
                              log.gsc_verdict === 'PASS' ? 'default' : 
                              log.gsc_verdict === 'PARTIAL' ? 'secondary' : 
                              'destructive'
                            }
                            className="gap-1"
                          >
                            <Key className="h-3 w-3" />
                            GSC: {log.gsc_verdict}
                          </Badge>
                        )}
                        {isCritical && (
                          <Badge variant="destructive" className="bg-red-600">
                            🚨 CRITICO
                          </Badge>
                        )}
                      </div>
                      
                      {/* URL */}
                      <div className="text-sm text-muted-foreground mb-3">
                        <a 
                          href={log.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:underline hover:text-primary transition-colors"
                        >
                          {log.url}
                        </a>
                      </div>

                      {/* GSC Last Crawl */}
                      {log.gsc_last_crawl_time && (
                        <div className="text-sm mb-3">
                          <span className="text-muted-foreground">Ultimo crawl Google: </span>
                          <strong>{new Date(log.gsc_last_crawl_time).toLocaleString('it-IT')}</strong>
                        </div>
                      )}

                      {/* Days in status */}
                      {log.days_in_current_status > 0 && (
                        <div className="text-sm mb-3">
                          Stato attuale da: <strong className={isCritical ? "text-red-600" : ""}>{log.days_in_current_status} giorni</strong>
                        </div>
                      )}

                      {/* Issues */}
                      {log.issues_detected && log.issues_detected.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-3">
                          <div className="text-sm font-semibold text-yellow-800 mb-2">⚠️ Problemi rilevati:</div>
                          <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
                            {log.issues_detected.map((issue, idx) => (
                              <li key={idx}>{issue}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Suggestions */}
                      {log.suggestions && log.suggestions.length > 0 && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="text-sm font-semibold text-blue-800 mb-2">💡 Suggerimenti:</div>
                          <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                            {log.suggestions.map((sug, idx) => (
                              <li key={idx}>{sug}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto">
                      <Button asChild variant="outline" size="sm" className="flex-1 lg:flex-none">
                        <Link to={`/admin/blog/${log.post_id}`}>
                          <FileEdit className="mr-2 h-4 w-4" />
                          Modifica
                        </Link>
                      </Button>
                      <Button 
                        onClick={() => handleRequestIndexing(log.blog_posts.slug)} 
                        variant="secondary" 
                        size="sm"
                        className="flex-1 lg:flex-none"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Richiedi Indicizzazione
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
        </TabsContent>

        <TabsContent value="metrics" className="mt-6">
          <GSCMetricsDashboard />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default SEOMonitorDashboard;
