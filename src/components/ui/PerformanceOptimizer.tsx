import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = [
      '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png', // Logo
      '/images/fitness-professional-bg.jpg' // Hero background
    ];

    preloadResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = resource;
      document.head.appendChild(link);
    });

    // DNS prefetch for external domains
    const dnsPrefetchDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://api.ipify.org'
    ];

    dnsPrefetchDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Reduce layout shift by setting font-display
    const fontDisplayLink = document.createElement('style');
    fontDisplayLink.textContent = `
      @font-face {
        font-display: swap;
      }
    `;
    document.head.appendChild(fontDisplayLink);

    // Clean up function
    return () => {
      const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
      preloadLinks.forEach(link => link.remove());
      
      const dnsPrefetchLinks = document.querySelectorAll('link[rel="dns-prefetch"]');
      dnsPrefetchLinks.forEach(link => link.remove());
      
      fontDisplayLink.remove();
    };
  }, []);

  // Register service worker for caching
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
  }, []);

  return null;
};

export default PerformanceOptimizer;