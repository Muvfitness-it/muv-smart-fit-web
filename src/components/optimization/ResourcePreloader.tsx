import { useEffect } from 'react';

interface ResourcePreloaderProps {
  criticalImages?: string[];
  criticalCSS?: string[];
  criticalJS?: string[];
  fonts?: string[];
  prefetchPages?: string[];
}

const ResourcePreloader = ({
  criticalImages = [],
  criticalCSS = [],
  criticalJS = [],
  fonts = [],
  prefetchPages = []
}: ResourcePreloaderProps) => {
  useEffect(() => {
    // Preload critical images with high priority
    criticalImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });

    // Preload critical CSS
    criticalCSS.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });

    // Preload critical JavaScript
    criticalJS.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });

    // Preload fonts
    fonts.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Prefetch next pages after a delay
    setTimeout(() => {
      prefetchPages.forEach((href) => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
      });
    }, 2000);

    // DNS prefetch for external domains
    const externalDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.googletagmanager.com',
      'https://api.ipify.org'
    ];

    externalDomains.forEach((domain) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Cleanup function
    return () => {
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      const prefetchLinks = document.querySelectorAll('link[rel="prefetch"]');
      const dnsPrefetchLinks = document.querySelectorAll('link[rel="dns-prefetch"]');
      
      preloadLinks.forEach(link => {
        if (link.getAttribute('href')?.includes('http') && !link.getAttribute('href')?.includes('fonts')) {
          link.remove();
        }
      });
      prefetchLinks.forEach(link => link.remove());
      dnsPrefetchLinks.forEach(link => link.remove());
    };
  }, [criticalImages, criticalCSS, criticalJS, fonts, prefetchPages]);

  return null;
};

export default ResourcePreloader;