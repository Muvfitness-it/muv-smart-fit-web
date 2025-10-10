import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSecurityAudit } from '@/hooks/useSecurityAudit';

interface CSRFContextType {
  token: string;
  validateSubmission: (formData: FormData) => boolean;
  generateNonce: () => string;
}

const CSRFContext = createContext<CSRFContextType | null>(null);

export const useCSRFProtection = () => {
  const context = useContext(CSRFContext);
  if (!context) {
    throw new Error('useCSRFProtection must be used within CSRFProtectionProvider');
  }
  return context;
};

interface CSRFProtectionProviderProps {
  children: ReactNode;
}

export const CSRFProtectionProvider: React.FC<CSRFProtectionProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const { logSuspiciousActivity } = useSecurityAudit();

  // Generate secure random token
  const generateToken = (): string => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  // Generate nonce for additional security
  const generateNonce = (): string => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  // Validate form submission with CSRF protection
  const validateSubmission = (formData: FormData): boolean => {
    const submittedToken = formData.get('csrf_token') as string;
    const submittedTimestamp = formData.get('csrf_timestamp') as string;
    
    // Check if token exists and matches
    if (!submittedToken || submittedToken !== token) {
      logSuspiciousActivity('csrf_token_validation_failed', {
        expected_token_length: token.length,
        submitted_token_length: submittedToken?.length || 0,
        user_agent: navigator.userAgent
      });
      return false;
    }

    // Check if form submission is within reasonable time window (5 minutes)
    if (submittedTimestamp) {
      const timestamp = parseInt(submittedTimestamp);
      const now = Date.now();
      const timeDiff = now - timestamp;
      
      // Reject if older than 5 minutes or from future
      if (timeDiff > 5 * 60 * 1000 || timeDiff < 0) {
        logSuspiciousActivity('csrf_timestamp_validation_failed', {
          time_difference: timeDiff,
          submitted_timestamp: timestamp,
          current_timestamp: now
        });
        return false;
      }
    }

    return true;
  };

  // Generate new token on mount and periodically refresh
  useEffect(() => {
    const newToken = generateToken();
    setToken(newToken);

    // Refresh token every 10 minutes for security
    const interval = setInterval(() => {
      const refreshedToken = generateToken();
      setToken(refreshedToken);
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Add security headers via meta tags
  useEffect(() => {
    // Add or update CSRF meta tag
    let csrfMeta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
    if (!csrfMeta) {
      csrfMeta = document.createElement('meta');
      csrfMeta.name = 'csrf-token';
      document.head.appendChild(csrfMeta);
    }
    csrfMeta.content = token;
  }, [token]);

  const value: CSRFContextType = {
    token,
    validateSubmission,
    generateNonce
  };

  return (
    <CSRFContext.Provider value={value}>
      {children}
    </CSRFContext.Provider>
  );
};

// HOC for protecting form components
export function withCSRFProtection<T extends object>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<T> {
  return function CSRFProtectedComponent(props: T) {
    return (
      <CSRFProtectionProvider>
        <WrappedComponent {...props} />
      </CSRFProtectionProvider>
    );
  };
}