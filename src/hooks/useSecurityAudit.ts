import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

interface SecurityEvent {
  event_type: string;
  event_data?: Record<string, any>;
  user_id?: string;
}

export const useSecurityAudit = (user?: User | null) => {

  const logSecurityEvent = useCallback(async (event: SecurityEvent) => {
    try {
      // Use PII-safe logging through database function
      const { error } = await supabase.rpc('log_security_event_pii_safe', {
        event_type_param: event.event_type,
        event_data_param: event.event_data || null,
        ip_param: null, // Let function handle IP extraction
        user_agent_param: null // Let function handle user agent extraction
      });
      
      if (error) {
        console.error('Failed to log security event:', error);
      }
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }, []);

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
      }),

    logAdminAction: (action: string, details?: Record<string, any>) =>
      logSecurityEvent({
        event_type: 'admin_action',
        event_data: { action, ...details }
      }),

    logFailedAuthorization: (resource: string, attemptedAction: string) =>
      logSecurityEvent({
        event_type: 'failed_authorization',
        event_data: { resource, attempted_action: attemptedAction }
      }),

    logSystemEvent: (event: string, details?: Record<string, any>) =>
      logSecurityEvent({
        event_type: 'system_event',
        event_data: { event, ...details }
      })
  };
};