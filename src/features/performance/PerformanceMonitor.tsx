/**
 * Advanced Performance Monitor
 * Tracks Core Web Vitals and custom performance metrics
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export const PerformanceMonitor = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    const metrics: PerformanceMetrics = {};

    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
        
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.log('LCP:', metrics.lcp.toFixed(2), 'ms', 
            metrics.lcp < 2500 ? '✅' : metrics.lcp < 4000 ? '⚠️' : '❌');
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Silently fail if not supported
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          metrics.fid = entry.processingStart - entry.startTime;
          
          if (process.env.NODE_ENV === 'development') {
            console.log('FID:', metrics.fid.toFixed(2), 'ms',
              metrics.fid < 100 ? '✅' : metrics.fid < 300 ? '⚠️' : '❌');
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // Silently fail
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            metrics.cls = clsValue;
          }
        }
        
        if (process.env.NODE_ENV === 'development') {
          console.log('CLS:', metrics.cls?.toFixed(3),
            (metrics.cls || 0) < 0.1 ? '✅' : (metrics.cls || 0) < 0.25 ? '⚠️' : '❌');
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Silently fail
    }

    // First Contentful Paint (FCP) and Time to First Byte (TTFB)
    try {
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
            metrics.fcp = entry.startTime;
            
            if (process.env.NODE_ENV === 'development') {
              console.log('FCP:', metrics.fcp.toFixed(2), 'ms',
                metrics.fcp < 1800 ? '✅' : metrics.fcp < 3000 ? '⚠️' : '❌');
            }
          }
        });
      });
      navigationObserver.observe({ entryTypes: ['paint'] });

      // TTFB from navigation timing
      const navTiming = performance.getEntriesByType('navigation')[0] as any;
      if (navTiming) {
        metrics.ttfb = navTiming.responseStart - navTiming.requestStart;
        
        if (process.env.NODE_ENV === 'development') {
          console.log('TTFB:', metrics.ttfb.toFixed(2), 'ms',
            metrics.ttfb < 800 ? '✅' : metrics.ttfb < 1800 ? '⚠️' : '❌');
        }
      }
    } catch (e) {
      // Silently fail
    }

    // Track route changes
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Performance monitoring active for:', location.pathname);
    }

    return () => {
      // Cleanup observers handled by browser
    };
  }, [location.pathname]);

  return null;
};

export default PerformanceMonitor;
