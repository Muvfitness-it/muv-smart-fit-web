import { useEffect } from 'react';

export const SecureDataHandler = () => {
  useEffect(() => {
    // Override console methods in production to prevent PII leakage
    if (process.env.NODE_ENV === 'production') {
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;

      console.log = (...args: any[]) => {
        // Filter out potential PII
        const sanitizedArgs = args.map(arg => {
          if (typeof arg === 'string') {
            // Remove email patterns
            arg = arg.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]');
            // Remove phone patterns
            arg = arg.replace(/(\+?\d{1,4}[-.\s]?)?(\(?\d{1,3}\)?[-.\s]?)?[\d\s.-]{7,}/g, '[PHONE]');
            // Remove potential credit card patterns
            arg = arg.replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, '[CARD]');
          }
          return arg;
        });
        originalLog.apply(console, sanitizedArgs);
      };

      console.error = (...args: any[]) => {
        const sanitizedArgs = args.map(arg => {
          if (typeof arg === 'string') {
            arg = arg.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]');
            arg = arg.replace(/(\+?\d{1,4}[-.\s]?)?(\(?\d{1,3}\)?[-.\s]?)?[\d\s.-]{7,}/g, '[PHONE]');
          }
          return arg;
        });
        originalError.apply(console, sanitizedArgs);
      };

      console.warn = (...args: any[]) => {
        const sanitizedArgs = args.map(arg => {
          if (typeof arg === 'string') {
            arg = arg.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]');
            arg = arg.replace(/(\+?\d{1,4}[-.\s]?)?(\(?\d{1,3}\)?[-.\s]?)?[\d\s.-]{7,}/g, '[PHONE]');
          }
          return arg;
        });
        originalWarn.apply(console, sanitizedArgs);
      };
    }

    // Data retention policy enforcement
    const clearOldData = () => {
      const storage = window.localStorage;
      const keys = Object.keys(storage);
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

      keys.forEach(key => {
        try {
          const item = storage.getItem(key);
          if (item) {
            const parsed = JSON.parse(item);
            if (parsed.timestamp && parsed.timestamp < thirtyDaysAgo) {
              storage.removeItem(key);
            }
          }
        } catch {
          // Ignore parsing errors
        }
      });
    };

    clearOldData();
    
    // Set up periodic cleanup
    const cleanupInterval = setInterval(clearOldData, 24 * 60 * 60 * 1000); // Daily

    return () => {
      clearInterval(cleanupInterval);
    };
  }, []);

  return null;
};