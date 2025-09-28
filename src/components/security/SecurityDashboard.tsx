import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSecurityAudit } from '@/hooks/useSecurityAudit';
import { supabase } from '@/integrations/supabase/client';
import { Shield, AlertTriangle, Eye, Clock, Users, Activity } from 'lucide-react';

interface SecurityEvent {
  id: string;
  event_type: string;
  created_at: string;
  event_data?: any;
  ip_address?: string;
}

interface SecurityMetrics {
  total_events: number;
  suspicious_activities: number;
  failed_logins: number;
  admin_actions: number;
  recent_events: SecurityEvent[];
}

export const SecurityDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    total_events: 0,
    suspicious_activities: 0,
    failed_logins: 0,
    admin_actions: 0,
    recent_events: []
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { logSystemEvent } = useSecurityAudit();

  const fetchSecurityMetrics = async () => {
    try {
      setRefreshing(true);
      
      // Get security audit logs (last 7 days)
      const { data: events, error } = await supabase
        .from('security_audit_log')
        .select('*')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      if (events) {
        const totalEvents = events.length;
        const suspiciousActivities = events.filter(e => e.event_type.includes('suspicious')).length;
        const failedLogins = events.filter(e => e.event_type === 'login_failed').length;
        const adminActions = events.filter(e => e.event_type === 'admin_action').length;
        
        setMetrics({
          total_events: totalEvents,
          suspicious_activities: suspiciousActivities,
          failed_logins: failedLogins,
          admin_actions: adminActions,
          recent_events: events.slice(0, 10)
        });
      }
    } catch (error) {
      console.error('Error fetching security metrics:', error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecurityMetrics();
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchSecurityMetrics, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    logSystemEvent('security_dashboard_refresh');
    fetchSecurityMetrics();
  };

  const getEventIcon = (eventType: string) => {
    if (eventType.includes('suspicious')) return <AlertTriangle className="h-4 w-4 text-red-500" />;
    if (eventType.includes('login')) return <Users className="h-4 w-4 text-blue-500" />;
    if (eventType.includes('admin')) return <Shield className="h-4 w-4 text-purple-500" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  const getEventSeverity = (eventType: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (eventType.includes('suspicious') || eventType.includes('failed')) return 'destructive';
    if (eventType.includes('admin')) return 'secondary';
    return 'outline';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-muv-primary">Dashboard Sicurezza</h2>
        <Button 
          onClick={handleManualRefresh} 
          disabled={refreshing}
          variant="outline"
          size="sm"
        >
          <Clock className="h-4 w-4 mr-2" />
          {refreshing ? 'Aggiornamento...' : 'Aggiorna'}
        </Button>
      </div>

      {/* Security Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventi Totali</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muv-primary">{metrics.total_events}</div>
            <p className="text-xs text-muted-foreground">Ultimi 7 giorni</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attività Sospette</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{metrics.suspicious_activities}</div>
            <p className="text-xs text-muted-foreground">Richiede attenzione</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Login Falliti</CardTitle>
            <Users className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{metrics.failed_logins}</div>
            <p className="text-xs text-muted-foreground">Tentativi bloccati</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Azioni Admin</CardTitle>
            <Shield className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{metrics.admin_actions}</div>
            <p className="text-xs text-muted-foreground">Modifiche sistema</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Eventi Recenti
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics.recent_events.length > 0 ? (
              metrics.recent_events.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getEventIcon(event.event_type)}
                    <div>
                      <p className="font-medium text-sm">{event.event_type.replace(/_/g, ' ')}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.created_at).toLocaleString('it-IT')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getEventSeverity(event.event_type)}>
                      {event.event_type.split('_')[0]}
                    </Badge>
                    {event.ip_address && (
                      <span className="text-xs text-muted-foreground font-mono">
                        {event.ip_address}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Shield className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Nessun evento di sicurezza rilevato</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};