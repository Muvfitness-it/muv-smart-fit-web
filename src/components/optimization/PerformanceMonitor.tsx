import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  processingEnd: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

const PerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const metrics: PerformanceMetrics = {};

    // Observe Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime;
            }
            break;
          case 'largest-contentful-paint':
            metrics.lcp = entry.startTime;
            break;
          case 'first-input':
            const fidEntry = entry as PerformanceEventTiming;
            metrics.fid = fidEntry.processingStart - fidEntry.startTime;
            break;
          case 'layout-shift':
            const clsEntry = entry as LayoutShiftEntry;
            if (!clsEntry.hadRecentInput) {
              metrics.cls = (metrics.cls || 0) + clsEntry.value;
            }
            break;
          case 'navigation':
            const navEntry = entry as PerformanceNavigationTiming;
            metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
            break;
        }
      }
    });

    // Observe different entry types
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift', 'navigation'] });
    } catch (e) {
      console.warn('Performance Observer not fully supported');
    }

    // Report metrics after page load
    const reportMetrics = () => {
      // Only report in production and with user consent
      const consent = localStorage.getItem('muv_cookie_consent');
      const consentData = consent ? JSON.parse(consent) : null;
      
      if (!consentData?.analytics || process.env.NODE_ENV !== 'production') {
        return;
      }

      // Report to Google Analytics if available
      if (window.gtag) {
        Object.entries(metrics).forEach(([metric, value]) => {
          if (value !== undefined) {
            window.gtag('event', 'web_vitals', {
              metric_name: metric,
              metric_value: Math.round(value),
              custom_parameter: window.location.pathname
            });
          }
        });
      }

      // Performance metrics collected and sent to analytics
    };

    // Report metrics when page is loaded
    if (document.readyState === 'complete') {
      setTimeout(reportMetrics, 1000);
    } else {
      window.addEventListener('load', () => setTimeout(reportMetrics, 1000));
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default PerformanceMonitor;