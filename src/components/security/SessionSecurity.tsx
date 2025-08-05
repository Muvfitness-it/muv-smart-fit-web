import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSecurityAudit } from '@/hooks/useSecurityAudit';

interface SessionSecurityProps {
  children: React.ReactNode;
}

export const SessionSecurity: React.FC<SessionSecurityProps> = ({ children }) => {
  const { logSuspiciousActivity } = useSecurityAudit();
  
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    let isIdle = false;
    
    // Session timeout after 30 minutes of inactivity
    const IDLE_TIMEOUT = 30 * 60 * 1000; // 30 minutes
    
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      if (isIdle) {
        isIdle = false;
      }
      
      idleTimer = setTimeout(() => {
        isIdle = true;
        handleSessionTimeout();
      }, IDLE_TIMEOUT);
    };
    
    const handleSessionTimeout = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        logSuspiciousActivity('session_timeout', { 
          timeout_duration: IDLE_TIMEOUT,
          forced_logout: true 
        });
        
        // Sign out the user
        await supabase.auth.signOut();
      }
    };
    
    // Monitor for suspicious activity patterns
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, pause idle timer
        clearTimeout(idleTimer);
      } else {
        // Page is visible again, reset timer
        resetIdleTimer();
      }
    };
    
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'sb-' && event.newValue === null) {
        // Session storage has been cleared, might be suspicious
        logSuspiciousActivity('session_storage_cleared', {
          key: event.key,
          origin: event.url
        });
      }
    };
    
    // Monitor for developer tools opening (basic detection)
    const detectDevTools = () => {
      const threshold = 160;
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        logSuspiciousActivity('dev_tools_detected', {
          window_dimensions: {
            outer: { width: window.outerWidth, height: window.outerHeight },
            inner: { width: window.innerWidth, height: window.innerHeight }
          }
        });
      }
    };
    
    // Activity events that reset the idle timer
    const activities = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    // Set up event listeners
    activities.forEach(activity => {
      document.addEventListener(activity, resetIdleTimer, true);
    });
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('resize', detectDevTools);
    
    // Initial timer setup
    resetIdleTimer();
    
    // Cleanup
    return () => {
      clearTimeout(idleTimer);
      activities.forEach(activity => {
        document.removeEventListener(activity, resetIdleTimer, true);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('resize', detectDevTools);
    };
  }, [logSuspiciousActivity]);
  
  // Check for session integrity on mount
  useEffect(() => {
    const checkSessionIntegrity = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Check if session token is close to expiry
        const now = Date.now() / 1000;
        const expiresAt = session.expires_at || 0;
        const timeUntilExpiry = expiresAt - now;
        
        if (timeUntilExpiry < 5 * 60) { // Less than 5 minutes
          logSuspiciousActivity('session_near_expiry', {
            expires_at: session.expires_at,
            time_until_expiry: timeUntilExpiry
          });
        }
      }
    };
    
    checkSessionIntegrity();
  }, [logSuspiciousActivity]);
  
  return <>{children}</>;
};