import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface SecurityEvent {
  event_type: string;
  event_data?: Record<string, any>;
  user_id?: string;
}

export const useSecurityAudit = () => {
  const { user } = useAuth();

  const logSecurityEvent = useCallback(async (event: SecurityEvent) => {
    try {
      // Get client info
      const userAgent = navigator.userAgent;
      const ipAddress = await fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => data.ip)
        .catch(() => 'unknown');

      await supabase.functions.invoke('security-audit', {
        body: {
          ...event,
          user_id: event.user_id || user?.id,
          ip_address: ipAddress,
          user_agent: userAgent
        }
      });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }, [user?.id]);

  return {
    logLoginAttempt: (success: boolean, email?: string) => 
      logSecurityEvent({
        event_type: success ? 'login_success' : 'login_failed',
        event_data: { email }
      }),

    logRoleChange: (targetUserId: string, newRole: string, oldRole?: string) =>
      logSecurityEvent({
        event_type: 'role_change',
        event_data: { target_user_id: targetUserId, new_role: newRole, old_role: oldRole }
      }),

    logPasswordChange: () =>
      logSecurityEvent({
        event_type: 'password_change'
      }),

    logSuspiciousActivity: (activity: string, details?: Record<string, any>) =>
      logSecurityEvent({
        event_type: 'suspicious_activity',
        event_data: { activity, ...details }
      }),

    logDataAccess: (resource: string, action: string) =>
      logSecurityEvent({
        event_type: 'data_access',
        event_data: { resource, action }
      })
  };
};