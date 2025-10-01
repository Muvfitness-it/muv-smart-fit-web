/**
 * Unified Performance Optimizer
 * Replaces: CacheOptimizer, LCPOptimizer, MobileOptimizer, PerformanceMonitor, SafeResourceOptimizer
 * Single, efficient performance optimization component
 */

import { useEffect } from 'react';

interface PerformanceConfig {
  enableCaching?: boolean;
  enableLCPOptimization?: boolean;
  enableMobileOptimization?: boolean;
  enableMonitoring?: boolean;
  enableResourceHints?: boolean;
}

const defaultConfig: PerformanceConfig = {
  enableCaching: true,
  enableLCPOptimization: true,
  enableMobileOptimization: true,
  enableMonitoring: false, // Only enable in production if needed
  enableResourceHints: true
};

export const PerformanceOptimizer: React.FC<PerformanceConfig> = (config = defaultConfig) => {
  const finalConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // Resource Hints
    if (finalConfig.enableResourceHints) {
      const addResourceHints = () => {
        const hints = [
          { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
          { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
        ];

        hints.forEach(({ rel, href, crossorigin }) => {
          if (!document.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
            const link = document.createElement('link');
            link.rel = rel;
            link.href = href;
            if (crossorigin) link.setAttribute('crossorigin', crossorigin);
            document.head.appendChild(link);
          }
        });
      };

      addResourceHints();
    }

    // LCP Optimization
    if (finalConfig.enableLCPOptimization) {
      // Preload critical images (first hero image)
      const heroImage = document.querySelector('img[fetchpriority="high"]');
      if (heroImage && !document.querySelector('link[rel="preload"][as="image"]')) {
        const preload = document.createElement('link');
        preload.rel = 'preload';
        preload.as = 'image';
        preload.href = heroImage.getAttribute('src') || '';
        if (preload.href) document.head.appendChild(preload);
      }
    }

    // Mobile Optimization
    if (finalConfig.enableMobileOptimization && isMobile) {
      // Optimize viewport for mobile
      let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
      }
      viewport.content = 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes';

      // Reduce animation intensity on mobile
      const mobileCSS = document.createElement('style');
      mobileCSS.textContent = `
        @media (max-width: 768px) {
          * {
            animation-duration: 0.3s !important;
            transition-duration: 0.2s !important;
          }
          .animate-slow-zoom {
            animation: none !important;
          }
        }
      `;
      document.head.appendChild(mobileCSS);
    }

    // Performance Monitoring (optional)
    if (finalConfig.enableMonitoring && 'PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // Log key metrics
            if (entry.entryType === 'largest-contentful-paint') {
              console.log('LCP:', entry.startTime, 'ms');
            } else if (entry.entryType === 'first-input') {
              console.log('FID:', (entry as any).processingStart - entry.startTime, 'ms');
            } else if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
              console.log('CLS:', (entry as any).value);
            }
          }
        });

        observer.observe({ 
          entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
        });

        return () => observer.disconnect();
      } catch (e) {
        console.warn('Performance Observer not fully supported');
      }
    }

    // Service Worker for Caching (optional)
    if (finalConfig.enableCaching && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Silently fail if SW registration fails
      });
    }
  }, []);

  return null; // This is a logic-only component
};

export default PerformanceOptimizer;
