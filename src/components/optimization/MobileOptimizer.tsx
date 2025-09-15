import { useEffect } from 'react';

// Mobile-specific performance optimizations
const MobileOptimizer = () => {
  useEffect(() => {
    // Detect mobile device
    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile) return;

    // Mobile-specific optimizations
    const optimizeForMobile = () => {
      // 1. Aggressive image optimization for mobile
      const optimizeMobileImages = () => {
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
          const image = img as HTMLImageElement;
          
          // Only first image (hero) gets eager loading on mobile
          if (index === 0) {
            image.loading = 'eager';
            image.fetchPriority = 'high';
            
            // Create mobile-optimized hero image preload
            const mobileHeroPreload = document.createElement('link');
            mobileHeroPreload.rel = 'preload';
            mobileHeroPreload.as = 'image';
            mobileHeroPreload.href = '/images/fitness-professional-bg.jpg';
            mobileHeroPreload.media = '(max-width: 768px)';
            mobileHeroPreload.fetchPriority = 'high';
            document.head.appendChild(mobileHeroPreload);
          } else {
            image.loading = 'lazy';
            image.fetchPriority = 'low';
          }
          
          // Add dimensions to prevent layout shift
          if (!image.width || !image.height) {
            image.style.aspectRatio = '16/9';
            image.style.width = '100%';
            image.style.height = 'auto';
          }
        });
      };

      // 2. Reduce JavaScript execution for mobile
      const optimizeMobileJS = () => {
        // Defer non-critical scripts on mobile
        const nonCriticalScripts = document.querySelectorAll('script[src*="analytics"], script[src*="gtag"], script[src*="tracking"]');
        nonCriticalScripts.forEach(script => {
          script.setAttribute('defer', '');
        });

        // Reduce intersection observer rootMargin for mobile
        const observers = document.querySelectorAll('[data-observer]');
        observers.forEach(el => {
          el.setAttribute('data-root-margin', '10px');
        });
      };

      // 3. Mobile-specific CSS optimizations
      const optimizeMobileCSS = () => {
        const mobileCSS = document.createElement('style');
        mobileCSS.textContent = `
            /* Mobile performance CSS - preserve design */
            @media (max-width: 768px) {
              /* Optimize animations duration for mobile */
              * {
                animation-duration: 0.2s !important;
                transition-duration: 0.2s !important;
              }
              
              /* Optimize fonts for mobile */
              body {
                font-display: swap;
                text-rendering: optimizeSpeed;
              }
            
            /* Reduce shadows and effects on mobile */
            .shadow-2xl { box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.15) !important; }
            .drop-shadow-lg { filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1)) !important; }
            
            /* Optimize hero for mobile LCP */
            .lcp-hero-container {
              min-height: 80vh;
              contain: layout style paint;
            }
            
            /* Lazy load below-fold content */
            .below-fold {
              content-visibility: auto;
              contain-intrinsic-size: 1px 300px;
            }
            
            /* Reduce gradient complexity on slow mobile only */
            @media (max-width: 480px) and (connection: slow-2g) {
              .bg-gradient-to-r {
                background: hsl(var(--brand-primary)) !important;
              }
            }
          }
        `;
        document.head.appendChild(mobileCSS);
      };

      // 4. Network-aware loading for mobile
      const networkAwareOptimization = () => {
        if ('connection' in navigator) {
          const connection = (navigator as any).connection;
          
          if (connection) {
            // Reduce preloading on slow connections
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
              // Cancel non-critical preloads
              const preloads = document.querySelectorAll('link[rel="preload"]:not([data-critical])');
              preloads.forEach(link => link.remove());
              
              // Increase lazy loading threshold
              const lazyImages = document.querySelectorAll('img[loading="lazy"]');
              lazyImages.forEach(img => {
                (img as HTMLImageElement).setAttribute('data-threshold', '50px');
              });
            }
            
            // Save data mode
            if (connection.saveData) {
              // Remove non-essential images
              const decorativeImages = document.querySelectorAll('img[alt=""], img:not([alt])');
              decorativeImages.forEach(img => {
                (img as HTMLElement).style.display = 'none';
              });
            }
          }
        }
      };

      // 5. Touch optimization
      const optimizeTouch = () => {
        // Ensure all interactive elements meet 44px minimum
        const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
        interactiveElements.forEach(el => {
          const element = el as HTMLElement;
          const rect = element.getBoundingClientRect();
          if (rect.height < 44) {
            element.style.minHeight = '44px';
            element.style.padding = '12px';
          }
        });

        // Add touch-action for better scrolling
        document.body.style.touchAction = 'manipulation';
      };

      optimizeMobileImages();
      optimizeMobileJS();
      optimizeMobileCSS();
      networkAwareOptimization();
      optimizeTouch();
    };

    // Apply optimizations immediately for mobile
    optimizeForMobile();

    // Monitor LCP specifically for mobile
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const lcp = entry.startTime;
          if (lcp > 2500) { // 2.5s threshold for mobile
            console.warn('Poor mobile LCP detected:', lcp, 'Target: <2.5s');
            
            // Emergency LCP optimization
            const heroContainer = document.querySelector('.lcp-hero-container');
            if (heroContainer) {
              (heroContainer as HTMLElement).style.contentVisibility = 'visible';
              (heroContainer as HTMLElement).style.willChange = 'auto';
            }
          }
        }
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    }

  }, []);

  return null;
};

export default MobileOptimizer;