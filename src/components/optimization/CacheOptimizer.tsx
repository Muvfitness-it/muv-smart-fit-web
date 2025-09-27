import { useEffect } from 'react';

// Component to implement aggressive caching strategies
const CacheOptimizer = () => {
  useEffect(() => {
    // Service Worker registration for caching
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }

    // Implement resource caching headers
    const implementCaching = () => {
      // Add cache control headers via meta tags for static resources
      const cacheHints = [
        { name: 'Cache-Control', content: 'public, max-age=31536000, immutable' },
        { name: 'Expires', content: new Date(Date.now() + 31536000000).toUTCString() }
      ];

      cacheHints.forEach(hint => {
        const meta = document.createElement('meta');
        meta.httpEquiv = hint.name;
        meta.content = hint.content;
        document.head.appendChild(meta);
      });
    };

    // Preload next page resources
    const preloadNextPages = () => {
      const criticalPages = ['/servizi', '/contatti'];
      const prefetchPages = ['/chi-siamo', '/recensioni', '/risultati'];

      // Preload critical pages
      criticalPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = page;
        link.as = 'document';
        document.head.appendChild(link);
      });

      // Prefetch less critical pages
      setTimeout(() => {
        prefetchPages.forEach(page => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = page;
          document.head.appendChild(link);
        });
      }, 2000);
    };

    // Implement localStorage caching for API responses
    const cacheAPIResponses = () => {
      const originalFetch = window.fetch;
      window.fetch = async (...args) => {
        const url = args[0] as string;
        
        // Cache GET requests for static content
        if (args[1]?.method === 'GET' || !args[1]?.method) {
          const cacheKey = `cache_${url}`;
          const cached = localStorage.getItem(cacheKey);
          
          if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            // Cache valid for 5 minutes
            if (Date.now() - timestamp < 300000) {
              return new Response(JSON.stringify(data));
            }
          }
        }

        const response = await originalFetch(...args);
        
        // Cache successful GET responses
        if (response.ok && (args[1]?.method === 'GET' || !args[1]?.method)) {
          const clone = response.clone();
          clone.json().then(data => {
            const cacheKey = `cache_${url}`;
            localStorage.setItem(cacheKey, JSON.stringify({
              data,
              timestamp: Date.now()
            }));
          }).catch(() => {
            // Ignore cache errors for non-JSON responses
          });
        }

        return response;
      };
    };

    // Resource hints for better performance
    const addResourceHints = () => {
      const hints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
      ];

      hints.forEach(hint => {
        const link = document.createElement('link');
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.crossOrigin) link.crossOrigin = hint.crossOrigin;
        document.head.appendChild(link);
      });
    };

    implementCaching();
    addResourceHints();
    preloadNextPages();
    cacheAPIResponses();

  }, []);

  return null;
};

export default CacheOptimizer;