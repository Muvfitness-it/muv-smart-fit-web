import { useEffect } from 'react';

export const useResourceOptimization = () => {
  useEffect(() => {
    // Enhanced critical resource preloading
    const preloadCriticalResources = () => {
      // Preload hero image with highest priority
      const heroImagePreload = () => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = '/images/fitness-professional-bg.jpg';
        link.fetchPriority = 'high';
        link.type = 'image/jpeg';
        document.head.appendChild(link);
      };

      // Preload critical fonts
      const fontPreloads = [
        {
          href: 'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew7.woff2',
          type: 'font/woff2'
        },
        {
          href: 'https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfedw.woff2', 
          type: 'font/woff2'
        }
      ];
      
      fontPreloads.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.href = font.href;
        link.type = font.type;
        link.crossOrigin = 'anonymous';
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      });

      // Preload critical CSS
      const cssPreload = document.createElement('link');
      cssPreload.rel = 'preload';
      cssPreload.as = 'style';
      cssPreload.href = '/src/index.css';
      document.head.appendChild(cssPreload);

      heroImagePreload();
    };

    // Performance-focused optimizations
    const performanceOptimizations = () => {
      // Reduce main thread blocking
      const reduceMainThreadWork = () => {
        // Use scheduler to break up long tasks
        if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
          const scheduler = (window as any).scheduler;
          
          // Defer non-critical DOM operations
          scheduler.postTask(() => {
            // Lazy load below-the-fold images
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
              (img as HTMLImageElement).loading = 'lazy';
            });
          }, { priority: 'background' });
        }
      };

      // Optimize CSS delivery
      const optimizeCSSDelivery = () => {
        // Inline critical CSS is already handled by FCPOptimizer
        // Defer non-critical CSS
        const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
        nonCriticalCSS.forEach(link => {
          const mediaValue = link.getAttribute('media');
          if (!mediaValue || mediaValue === 'all') {
            link.setAttribute('media', 'print');
            link.setAttribute('onload', "this.media='all'");
          }
        });
      };

      // Reduce JavaScript bundle size impact
      const optimizeJSDelivery = () => {
        // Mark non-critical scripts for deferred loading
        const scripts = document.querySelectorAll('script[src]:not([data-critical])');
        scripts.forEach(script => {
          if (!script.hasAttribute('async') && !script.hasAttribute('defer')) {
            script.setAttribute('defer', '');
          }
        });
      };

      reduceMainThreadWork();
      optimizeCSSDelivery();
      optimizeJSDelivery();
    };

    // Smart prefetching based on user intent
    const intelligentPrefetching = () => {
      // Prefetch critical pages immediately
      const criticalPages = ['/servizi', '/contatti'];
      criticalPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
      });

      // Prefetch secondary pages on hover or after delay
      setTimeout(() => {
        const secondaryPages = ['/chi-siamo', '/recensioni', '/risultati'];
        secondaryPages.forEach(page => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = page;
          document.head.appendChild(link);
        });
      }, 3000);
    };

    // Network-aware loading
    const networkAwareLoading = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        
        // Reduce preloading on slow connections
        if (connection && connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          // Skip non-essential preloads
          return;
        }
      }
      
      // Full preloading for fast connections
      intelligentPrefetching();
    };

    preloadCriticalResources();
    performanceOptimizations();
    
    // Delay non-critical optimizations
    setTimeout(networkAwareLoading, 1000);

    return () => {
      // Cleanup preload links if needed
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach(link => {
        if (link.getAttribute('href')?.includes('images/') || 
            link.getAttribute('href')?.includes('lovable-uploads/')) {
          link.remove();
        }
      });
    };
  }, []);
};