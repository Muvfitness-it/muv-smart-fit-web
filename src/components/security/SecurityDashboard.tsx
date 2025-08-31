import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock, Users, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SecurityMetrics {
  total_events: number;
  failed_logins: number;
  suspicious_activities: number;
  data_anonymizations: number;
  rate_limit_violations: number;
}

interface DataRetentionPolicy {
  id: string;
  table_name: string;
  retention_days: number;
  anonymize_after_days: number;
  last_cleanup: string | null;
}

export const SecurityDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null);
  const [policies, setPolicies] = useState<DataRetentionPolicy[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    try {
      // Load security metrics
      const { data: eventsData } = await supabase
        .from('security_audit_log')
        .select('event_type')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      // Load data retention policies
      const { data: policiesData } = await supabase
        .from('data_retention_policies')
        .select('*')
        .order('table_name');

      if (eventsData) {
        const eventStats = eventsData.reduce((acc, event) => {
          acc.total_events++;
          if (event.event_type.includes('login') && event.event_type.includes('failed')) {
            acc.failed_logins++;
          }
          if (event.event_type.includes('suspicious')) {
            acc.suspicious_activities++;
          }
          if (event.event_type.includes('rate_limit')) {
            acc.rate_limit_violations++;
          }
          return acc;
        }, {
          total_events: 0,
          failed_logins: 0,
          suspicious_activities: 0,
          data_anonymizations: 0,
          rate_limit_violations: 0
        });

        setMetrics(eventStats);
      }

      if (policiesData) {
        setPolicies(policiesData);
      }
    } catch (error) {
      console.error('Error loading security data:', error);
      toast({
        title: "Error",
        description: "Failed to load security data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const runDataAnonymization = async () => {
    try {
      const { error } = await supabase.rpc('anonymize_old_data');
      
      if (error) throw error;

      toast({
        title: "Success",
        description: "Data anonymization completed successfully",
      });

      loadSecurityData();
    } catch (error) {
      console.error('Error running data anonymization:', error);
      toast({
        title: "Error",
        description: "Failed to run data anonymization",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Security Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor security events and manage data protection
          </p>
        </div>
        <Button onClick={runDataAnonymization} className="gap-2">
          <Shield className="h-4 w-4" />
          Run Data Cleanup
        </Button>
      </div>

      {/* Security Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events (7d)</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.total_events || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Logins</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {metrics?.failed_logins || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspicious Activity</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              {metrics?.suspicious_activities || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rate Limit Violations</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              {metrics?.rate_limit_violations || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Retention Policies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Data Retention Policies
          </CardTitle>
          <CardDescription>
            Automatic data anonymization and cleanup policies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {policies.map((policy) => (
              <div key={policy.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{policy.table_name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Anonymize after {policy.anonymize_after_days} days • 
                    Delete after {policy.retention_days} days
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {policy.last_cleanup ? (
                    <Badge variant="outline" className="gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Last: {new Date(policy.last_cleanup).toLocaleDateString()}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      Never run
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};