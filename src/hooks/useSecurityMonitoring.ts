import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SecurityAlert {
  id: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  type: string;
  message: string;
  timestamp: string;
  details?: any;
}

interface SecurityMetrics {
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  activeThreats: number;
  blockedAttempts: number;
  recentAlerts: SecurityAlert[];
}

export const useSecurityMonitoring = () => {
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    threatLevel: 'LOW',
    activeThreats: 0,
    blockedAttempts: 0,
    recentAlerts: []
  });
  const [isMonitoring, setIsMonitoring] = useState(false);
  const { toast } = useToast();

  const analyzeSecurityEvents = useCallback(async () => {
    try {
      // Get recent security events (last hour)
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      
      const { data: recentEvents, error } = await supabase
        .from('security_audit_log')
        .select('*')
        .gte('created_at', oneHourAgo)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!recentEvents) return;

      const alerts: SecurityAlert[] = [];
      let threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
      let activeThreats = 0;
      let blockedAttempts = 0;

      // Analyze failed login attempts
      const failedLogins = recentEvents.filter(e => e.event_type === 'login_failed');
      const uniqueFailedIPs = new Set(failedLogins.map(e => e.ip_address)).size;

      if (failedLogins.length > 10) {
        alerts.push({
          id: `alert-${Date.now()}-1`,
          severity: 'HIGH',
          type: 'BRUTE_FORCE_ATTEMPT',
          message: `${failedLogins.length} tentativi di login falliti nell'ultima ora`,
          timestamp: new Date().toISOString(),
          details: { count: failedLogins.length, unique_ips: uniqueFailedIPs }
        });
        activeThreats++;
        threatLevel = 'HIGH';
      }

      // Analyze suspicious activities
      const suspiciousEvents = recentEvents.filter(e => 
        e.event_type.includes('suspicious') || 
        e.event_type === 'unauthorized_access_attempt'
      );

      if (suspiciousEvents.length > 0) {
        alerts.push({
          id: `alert-${Date.now()}-2`,
          severity: 'MEDIUM',
          type: 'SUSPICIOUS_ACTIVITY',
          message: `${suspiciousEvents.length} attività sospette rilevate`,
          timestamp: new Date().toISOString(),
          details: { events: suspiciousEvents.slice(0, 5) }
        });
        activeThreats++;
        if (threatLevel === 'LOW') threatLevel = 'MEDIUM';
      }

      // Check rate limit violations
      const { data: rateLimitViolations } = await supabase
        .from('enhanced_rate_limits')
        .select('*')
        .gte('created_at', oneHourAgo)
        .gte('requests_count', 3);

      if (rateLimitViolations && rateLimitViolations.length > 5) {
        alerts.push({
          id: `alert-${Date.now()}-3`,
          severity: 'MEDIUM',
          type: 'RATE_LIMIT_ABUSE',
          message: `${rateLimitViolations.length} violazioni del rate limit`,
          timestamp: new Date().toISOString(),
          details: { violations: rateLimitViolations.length }
        });
        blockedAttempts = rateLimitViolations.reduce((sum, v) => sum + v.requests_count, 0);
      }

      // Check for admin actions from unusual locations
      const adminActions = recentEvents.filter(e => e.event_type === 'admin_action');
      if (adminActions.length > 20) {
        alerts.push({
          id: `alert-${Date.now()}-4`,
          severity: 'LOW',
          type: 'HIGH_ADMIN_ACTIVITY',
          message: `Attività amministrativa elevata: ${adminActions.length} azioni`,
          timestamp: new Date().toISOString(),
          details: { count: adminActions.length }
        });
      }

      setMetrics({
        threatLevel,
        activeThreats,
        blockedAttempts,
        recentAlerts: alerts.sort((a, b) => {
          const severityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
          return severityOrder[b.severity] - severityOrder[a.severity];
        }).slice(0, 10)
      });

      // Show critical alerts
      alerts
        .filter(a => a.severity === 'CRITICAL' || a.severity === 'HIGH')
        .forEach(alert => {
          toast({
            title: '⚠️ Allarme Sicurezza',
            description: alert.message,
            variant: 'destructive'
          });
        });

    } catch (error) {
      console.error('Security monitoring error:', error);
    }
  }, [toast]);

  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    analyzeSecurityEvents();
    
    // Monitor every 2 minutes
    const interval = setInterval(analyzeSecurityEvents, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, [analyzeSecurityEvents]);

  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  const runSecurityAudit = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke('automated-security-audit');
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Security audit error:', error);
      toast({
        title: 'Errore Audit Sicurezza',
        description: 'Impossibile eseguire l\'audit di sicurezza',
        variant: 'destructive'
      });
      return null;
    }
  }, [toast]);

  const runDataRetention = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke('data-retention-automation');
      
      if (error) throw error;
      
      toast({
        title: 'Data Retention Completato',
        description: `Anonymized: ${data.summary.total_records_anonymized}, Deleted: ${data.summary.total_records_deleted}`,
      });
      
      return data;
    } catch (error) {
      console.error('Data retention error:', error);
      toast({
        title: 'Errore Data Retention',
        description: 'Impossibile eseguire la pulizia dei dati',
        variant: 'destructive'
      });
      return null;
    }
  }, [toast]);

  useEffect(() => {
    const cleanup = startMonitoring();
    return cleanup;
  }, [startMonitoring]);

  return {
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    runSecurityAudit,
    runDataRetention,
    analyzeSecurityEvents
  };
};
