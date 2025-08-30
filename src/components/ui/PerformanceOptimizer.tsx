import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources with optimization
    const preloadResources = [
      { src: '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png', priority: 'high' },
      { src: '/images/fitness-professional-bg.jpg', priority: 'high' }
    ];

    preloadResources.forEach(({ src, priority }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = priority as RequestInit['priority'];
      document.head.appendChild(link);
    });

    // Enhanced DNS prefetch and preconnect
    const externalDomains = [
      { url: 'https://fonts.googleapis.com', type: 'preconnect' },
      { url: 'https://fonts.gstatic.com', type: 'preconnect', crossorigin: true },
      { url: 'https://api.ipify.org', type: 'dns-prefetch' },
      { url: 'https://www.googletagmanager.com', type: 'dns-prefetch' }
    ];

    externalDomains.forEach(({ url, type, crossorigin }) => {
      const link = document.createElement('link');
      link.rel = type;
      link.href = url;
      if (crossorigin) link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Enhanced font optimization and layout shift reduction
    const criticalStyles = document.createElement('style');
    criticalStyles.textContent = `
      @font-face {
        font-display: swap;
      }
      
      /* Prevent layout shift for images */
      img[width][height] {
        height: auto;
      }
      
      /* Critical CSS for above-the-fold content */
      .hero-section {
        contain: layout style paint;
        content-visibility: auto;
      }
      
      /* Optimize scrolling performance */
      * {
        scroll-behavior: smooth;
      }
      
      /* Reduce paint on scroll */
      .scroll-optimized {
        will-change: transform;
        transform: translateZ(0);
      }
    `;
    document.head.appendChild(criticalStyles);

    // Optimize images with requestAnimationFrame to prevent forced reflows
    const optimizeImages = () => {
      requestAnimationFrame(() => {
        const images = document.querySelectorAll('img:not([loading]):not([data-optimized])');
        
        // Batch DOM modifications to prevent layout thrashing
        const imagesToOptimize = Array.from(images).slice(3); // Skip first 3 images
        
        if (imagesToOptimize.length > 0) {
          imagesToOptimize.forEach((img) => {
            img.setAttribute('loading', 'lazy');
            img.setAttribute('decoding', 'async');
            img.setAttribute('data-optimized', 'true');
          });
        }
      });
    };

    // Use intersection observer instead of setTimeout for better performance
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            optimizeImages();
            imageObserver.disconnect(); // Run only once
          }
        });
      },
      { rootMargin: '100px' }
    );

    // Start observing after initial render
    setTimeout(() => {
      const heroSection = document.querySelector('section');
      if (heroSection) {
        imageObserver.observe(heroSection);
      } else {
        optimizeImages(); // Fallback if no hero section found
      }
    }, 100);

    // Clean up function
    return () => {
      imageObserver.disconnect();
      
      const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
      preloadLinks.forEach(link => link.remove());
      
      const dnsPrefetchLinks = document.querySelectorAll('link[rel="dns-prefetch"], link[rel="preconnect"]');
      dnsPrefetchLinks.forEach(link => link.remove());
      
      criticalStyles.remove();
    };
  }, []);

  // Register service worker for caching
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js?v=4').catch(console.error);
    }
  }, []);

  return null;
};

export default PerformanceOptimizer;