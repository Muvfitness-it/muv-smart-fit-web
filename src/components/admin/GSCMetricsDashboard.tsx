import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { RefreshCw, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface MetricData {
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

interface Alert {
  id: string;
  alert_date: string;
  severity: 'warning' | 'critical';
  metric_name: string;
  current_value: number;
  previous_value: number;
  change_percentage: number;
  alert_message: string;
  email_sent: boolean;
}

const GSCMetricsDashboard = () => {
  const [metricsData, setMetricsData] = useState<MetricData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    
    try {
      // Fetch last 30 days metrics
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data: metrics, error: metricsError } = await supabase
        .from('gsc_metrics_history')
        .select('*')
        .eq('metric_type', 'site')
        .gte('check_date', thirtyDaysAgo.toISOString())
        .order('check_date', { ascending: true });

      if (metricsError) throw metricsError;

      if (metrics) {
        setMetricsData(metrics.map(m => ({
          date: new Date(m.check_date).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' }),
          impressions: m.impressions,
          clicks: m.clicks,
          ctr: m.ctr,
          position: m.position,
        })));
      }

      // Fetch recent alerts
      const { data: recentAlerts, error: alertsError } = await supabase
        .from('gsc_alert_history')
        .select('*')
        .order('alert_date', { ascending: false })
        .limit(10);

      if (alertsError) throw alertsError;

      if (recentAlerts) {
        setAlerts(recentAlerts as Alert[]);
      }
    } catch (error: any) {
      console.error('Error loading GSC data:', error);
      toast.error('Errore nel caricamento dei dati GSC');
    } finally {
      setLoading(false);
    }
  };

  const handleManualRefresh = async () => {
    setRefreshing(true);
    try {
      const { error } = await supabase.functions.invoke('gsc-metrics-tracker');
      if (error) throw error;
      
      toast.success('Metriche aggiornate con successo');
      await loadData();
    } catch (error: any) {
      console.error('Error refreshing metrics:', error);
      toast.error('Errore nell\'aggiornamento delle metriche');
    } finally {
      setRefreshing(false);
    }
  };

  const latestMetrics = metricsData[metricsData.length - 1];
  const sevenDaysAgoMetrics = metricsData[metricsData.length - 8];

  const calculateChange = (current?: number, previous?: number) => {
    if (!current || !previous || previous === 0) return null;
    return ((current - previous) / previous) * 100;
  };

  const renderChangeIndicator = (current?: number, previous?: number) => {
    const change = calculateChange(current, previous);
    if (change === null) return null;

    const isPositive = change > 0;
    return (
      <div className={`text-xs flex items-center gap-1 mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? (
          <><TrendingUp className="h-3 w-3" /> +{change.toFixed(1)}%</>
        ) : (
          <><TrendingDown className="h-3 w-3" /> {change.toFixed(1)}%</>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="text-center py-8">Caricamento metriche GSC...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📊 Metriche Google Search Console</h2>
        <Button onClick={handleManualRefresh} disabled={refreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Aggiorna Ora
        </Button>
      </div>

      {/* Alert Banner */}
      {alerts.length > 0 && (
        <Card className="border-red-300 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Alert Recenti ({alerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {alerts.slice(0, 5).map(alert => (
              <div key={alert.id} className="flex items-start gap-2">
                <Badge variant={alert.severity === 'critical' ? 'destructive' : 'default'}>
                  {alert.severity === 'critical' ? '🔴' : '🟡'} {alert.metric_name}
                </Badge>
                <span className="text-sm flex-1">{alert.alert_message}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(alert.alert_date).toLocaleDateString('it-IT')}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      {metricsData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Impression</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{latestMetrics?.impressions.toLocaleString() || '0'}</div>
              {renderChangeIndicator(latestMetrics?.impressions, sevenDaysAgoMetrics?.impressions)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Click</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{latestMetrics?.clicks.toLocaleString() || '0'}</div>
              {renderChangeIndicator(latestMetrics?.clicks, sevenDaysAgoMetrics?.clicks)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">CTR</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{latestMetrics?.ctr.toFixed(2)}%</div>
              {renderChangeIndicator(latestMetrics?.ctr, sevenDaysAgoMetrics?.ctr)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Posizione Media</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{latestMetrics?.position.toFixed(1)}</div>
              {renderChangeIndicator(sevenDaysAgoMetrics?.position, latestMetrics?.position)}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts */}
      {metricsData.length > 0 ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Trend Impression (30 giorni)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metricsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="impressions" stroke="#8884d8" strokeWidth={2} name="Impression" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Trend Click</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={metricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="clicks" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trend CTR (%)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={metricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="ctr" stroke="#ffc658" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Posizione Media nel Tempo</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={metricsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis reversed domain={[1, 'dataMax']} />
                  <Tooltip />
                  <Line type="monotone" dataKey="position" stroke="#ff7c7c" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Nessun dato disponibile. Il tracking inizierà automaticamente domani alle 2:00 AM.
            </p>
            <Button onClick={handleManualRefresh} disabled={refreshing}>
              Esegui Tracking Manuale
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GSCMetricsDashboard;
