import React, { useEffect } from 'react';

interface PerformanceOptimizerProps {
  enablePrefetch?: boolean;
  enableServiceWorker?: boolean;
  enableResourceHints?: boolean;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  enablePrefetch = true,
  enableServiceWorker = true,
  enableResourceHints = true
}) => {
  useEffect(() => {
    // Precarica le pagine più importanti
    if (enablePrefetch) {
      const importantPages = [
        '/contatti',
        '/servizi',
        '/chi-siamo',
        '/muv-planner'
      ];

      const prefetchPages = () => {
        importantPages.forEach(page => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = page;
          document.head.appendChild(link);
        });
      };

      // Prefetch dopo il caricamento iniziale
      setTimeout(prefetchPages, 2000);
    }

    // Ottimizza le immagini con intersezione observer
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      // Osserva tutte le immagini lazy
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    // Resource hints per prestazioni
    if (enableResourceHints) {
      const addResourceHint = (rel: string, href: string, type?: string) => {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        if (type) link.type = type;
        document.head.appendChild(link);
      };

      // DNS prefetch per domini esterni
      addResourceHint('dns-prefetch', '//fonts.googleapis.com');
      addResourceHint('dns-prefetch', '//www.google-analytics.com');
      addResourceHint('dns-prefetch', '//images.unsplash.com');
      
      // Preconnect per risorse critiche
      addResourceHint('preconnect', 'https://fonts.gstatic.com');
    }

    // Service Worker registration
    if (enableServiceWorker && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js?v=4')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Ottimizza scroll performance
    let ticking = false;
    const optimizeScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Performance monitoring per scroll
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizeScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', optimizeScroll);
    };
  }, [enablePrefetch, enableServiceWorker, enableResourceHints]);

  // Critical CSS injection per above-the-fold content
  useEffect(() => {
    const criticalCSS = `
      .above-fold {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .hero-section {
        background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
      }
      .loading-skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default PerformanceOptimizer;