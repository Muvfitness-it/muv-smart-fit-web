import { useEffect } from 'react';

// Safe performance optimizer that doesn't interfere with design
const SafePerformanceOptimizer = () => {
  useEffect(() => {
    // Only perform optimizations that won't break visual design
    const safeOptimizations = () => {
      // 1. Safe image loading optimization
      const optimizeImageLoading = () => {
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach((img, index) => {
          const image = img as HTMLImageElement;
          
          // First 2 images get high priority
          if (index < 2) {
            image.loading = 'eager';
            image.fetchPriority = 'high';
          } else {
            image.loading = 'lazy';
            image.fetchPriority = 'low';
          }
        });
      };

      // 2. Safe font preloading
      const preloadCriticalFonts = () => {
        const criticalFonts = [
          'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew7.woff2',
          'https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfedw.woff2'
        ];

        criticalFonts.forEach(href => {
          const existing = document.querySelector(`link[href="${href}"]`);
          if (!existing) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.href = href;
            document.head.appendChild(link);
          }
        });
      };

      // 3. Safe analytics deferring
      const deferAnalytics = () => {
        const analyticsScripts = document.querySelectorAll('script[src*="gtag"], script[src*="analytics"]');
        analyticsScripts.forEach(script => {
          if (!script.hasAttribute('defer')) {
            script.setAttribute('defer', '');
          }
        });
      };

      // 4. Safe content visibility for below-fold
      const optimizeBelowFold = () => {
        const belowFoldElements = document.querySelectorAll('.below-fold');
        belowFoldElements.forEach(el => {
          const element = el as HTMLElement;
          element.style.contentVisibility = 'auto';
          element.style.containIntrinsicSize = '1px 300px';
        });
      };

      // 5. Safe prefetching
      const prefetchCriticalPages = () => {
        const criticalPages = ['/servizi', '/contatti'];
        criticalPages.forEach(page => {
          const existing = document.querySelector(`link[href="${page}"][rel="prefetch"]`);
          if (!existing) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
          }
        });
      };

      // Run optimizations with delays to avoid blocking
      optimizeImageLoading();
      preloadCriticalFonts();
      
      setTimeout(() => {
        deferAnalytics();
        optimizeBelowFold();
      }, 100);
      
      setTimeout(() => {
        prefetchCriticalPages();
      }, 2000);
    };

    safeOptimizations();
  }, []);

  return null;
};

export default SafePerformanceOptimizer;