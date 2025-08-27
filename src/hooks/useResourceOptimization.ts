import { useEffect } from 'react';

export const useResourceOptimization = () => {
  useEffect(() => {
    // Preload critical resources with WebP support
    const preloadCriticalResources = () => {
      const criticalImages = [
        {
          webp: '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.webp',
          fallback: '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png'
        },
        {
          webp: '/images/fitness-professional-bg.webp',
          fallback: '/images/fitness-professional-bg.jpg'
        }
      ];

      criticalImages.forEach(({ webp, fallback }) => {
        // Preload WebP if supported
        if (window.navigator.userAgent.includes('Chrome') || 
            window.navigator.userAgent.includes('Firefox') || 
            window.navigator.userAgent.includes('Safari')) {
          const webpLink = document.createElement('link');
          webpLink.rel = 'preload';
          webpLink.as = 'image';
          webpLink.href = webp;
          webpLink.fetchPriority = 'high';
          webpLink.type = 'image/webp';
          document.head.appendChild(webpLink);
        } else {
          // Fallback for older browsers
          const fallbackLink = document.createElement('link');
          fallbackLink.rel = 'preload';
          fallbackLink.as = 'image';
          fallbackLink.href = fallback;
          fallbackLink.fetchPriority = 'high';
          document.head.appendChild(fallbackLink);
        }
      });
    };

    // Optimize font loading
    const optimizeFontLoading = () => {
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.as = 'font';
      fontLink.href = 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2';
      fontLink.type = 'font/woff2';
      fontLink.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink);
    };

    // Defer non-critical JavaScript
    const deferNonCriticalJS = () => {
      const scripts = document.querySelectorAll('script[data-defer]');
      scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = script.getAttribute('src') || '';
        newScript.defer = true;
        document.head.appendChild(newScript);
      });
    };

    // Prefetch next pages
    const prefetchNextPages = () => {
      const nextPages = ['/servizi', '/contatti', '/blog'];
      nextPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
      });
    };

    preloadCriticalResources();
    optimizeFontLoading();
    deferNonCriticalJS();
    
    // Prefetch after initial load
    setTimeout(prefetchNextPages, 2000);

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