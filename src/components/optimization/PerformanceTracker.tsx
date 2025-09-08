import { useEffect } from 'react';

interface PerformanceTracker {
  trackCLS: () => void;
  trackLCP: () => void;
  trackFID: () => void;
  trackFCP: () => void;
}

const PerformanceTracker = (): null => {
  useEffect(() => {
    // Track Core Web Vitals
    const trackCLS = () => {
      let cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as any;
          if (layoutShiftEntry.hadRecentInput) continue;
          cls += layoutShiftEntry.value;
        }
        if (cls > 0.25) {
          console.warn('Poor CLS detected:', cls);
        }
      }).observe({ type: 'layout-shift', buffered: true });
    };

    const trackLCP = () => {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const lcp = entry.startTime;
          if (lcp > 4000) {
            console.warn('Poor LCP detected:', lcp);
          }
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    };

    const trackFCP = () => {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fcp = entry.startTime;
          if (fcp > 3000) {
            console.warn('Poor FCP detected:', fcp);
          }
        }
      }).observe({ type: 'paint', buffered: true });
    };

    // Initialize tracking
    trackCLS();
    trackLCP();
    trackFCP();

    // Page load performance
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = perfData.loadEventEnd - perfData.fetchStart;
      
      if (loadTime > 5000) {
        console.warn('Slow page load detected:', loadTime);
      }
    });

  }, []);

  return null;
};

export default PerformanceTracker;