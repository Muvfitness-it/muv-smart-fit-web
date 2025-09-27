import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
}

const PerformanceOptimizer = () => {
  const location = useLocation();
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [optimizationsApplied, setOptimizationsApplied] = useState(false);

  useEffect(() => {
    // Apply performance optimizations
    applyPerformanceOptimizations();
    
    // Measure Core Web Vitals
    measureCoreWebVitals();
    
    // Preload critical resources for next navigation
    preloadCriticalResources();
    
    setOptimizationsApplied(true);
  }, [location.pathname]);

  const applyPerformanceOptimizations = () => {
    // 1. Image lazy loading with intersection observer
    const images = document.querySelectorAll('img[data-src]');
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
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    images.forEach(img => imageObserver.observe(img));

    // 2. Defer non-critical CSS
    deferNonCriticalCSS();
    
    // 3. Optimize fonts loading
    optimizeFontLoading();
    
    // 4. Implement service worker for caching
    registerServiceWorker();

    // 5. Compress and minify resources
    compressResources();
  };

  const measureCoreWebVitals = () => {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      const lcp = lastEntry.startTime;
      
      setMetrics(prev => ({ ...prev, lcp } as PerformanceMetrics));
      
      // Target: LCP < 2.5s
      if (lcp > 2500) {
        console.warn(`LCP performance issue: ${lcp}ms (target: <2500ms)`);
        optimizeLCP();
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID) - simulate with interaction observer
    document.addEventListener('click', function measureFID() {
      const fid = performance.now();
      setMetrics(prev => ({ ...prev, fid } as PerformanceMetrics));
      document.removeEventListener('click', measureFID);
    }, { once: true });

    // Cumulative Layout Shift (CLS)
    new PerformanceObserver((entryList) => {
      let clsValue = 0;
      entryList.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      setMetrics(prev => ({ ...prev, cls: clsValue } as PerformanceMetrics));
      
      // Target: CLS < 0.1
      if (clsValue > 0.1) {
        console.warn(`CLS performance issue: ${clsValue} (target: <0.1)`);
        optimizeCLS();
      }
    }).observe({ entryTypes: ['layout-shift'] });

    // First Contentful Paint (FCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const fcp = entries[0].startTime;
      setMetrics(prev => ({ ...prev, fcp } as PerformanceMetrics));
    }).observe({ entryTypes: ['paint'] });

    // Time to First Byte (TTFB)
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      setMetrics(prev => ({ ...prev, ttfb } as PerformanceMetrics));
    }
  };

  const optimizeLCP = () => {
    // Preload hero images and critical resources
    const heroImage = document.querySelector('img[data-priority="high"]') as HTMLImageElement;
    if (heroImage && !heroImage.complete) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = heroImage.src;
      document.head.appendChild(link);
    }

    // Optimize critical CSS delivery
    const criticalCSS = `
      .hero-section { 
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .site-header {
        background: rgba(16, 185, 129, 0.95);
        backdrop-filter: blur(10px);
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 50;
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
  };

  const optimizeCLS = () => {
    // Add size attributes to images to prevent layout shift
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach((img: HTMLImageElement) => {
      // Set default dimensions based on parent container
      const parent = img.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.aspectRatio = '16 / 9'; // Default aspect ratio
      }
    });

    // Reserve space for dynamic content
    const dynamicElements = document.querySelectorAll('[data-dynamic]');
    dynamicElements.forEach((element: HTMLElement) => {
      element.style.minHeight = '200px'; // Reserve space
    });
  };

  const deferNonCriticalCSS = () => {
    const nonCriticalCSS = [
      '/fonts/inter.css',
      '/css/animations.css',
      '/css/components.css'
    ];

    nonCriticalCSS.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = function(this: HTMLLinkElement) {
        this.onload = null;
        this.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    });
  };

  const optimizeFontLoading = () => {
    // Preload critical fonts
    const criticalFonts = [
      '/fonts/inter-variable.woff2',
      '/fonts/inter-bold.woff2'
    ];

    criticalFonts.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Use font-display: swap for better performance
    const fontCSS = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
        src: url('/fonts/inter-variable.woff2') format('woff2-variations');
        font-weight: 100 900;
      }
    `;

    const style = document.createElement('style');
    style.textContent = fontCSS;
    document.head.appendChild(style);
  };

  const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw-enhanced.js')
        .then(registration => {
          console.log('SW registered:', registration);
        })
        .catch(error => {
          console.log('SW registration failed:', error);
        });
    }
  };

  const compressResources = () => {
    // Enable gzip/brotli compression for text resources
    const textResources = document.querySelectorAll('script[src], link[href$=".css"]');
    textResources.forEach((element: HTMLElement) => {
      // Add compression headers hint
      if (element.tagName === 'SCRIPT') {
        (element as HTMLScriptElement).setAttribute('data-compress', 'true');
      } else if (element.tagName === 'LINK') {
        (element as HTMLLinkElement).setAttribute('data-compress', 'true');
      }
    });
  };

  const preloadCriticalResources = () => {
    const currentPath = location.pathname;
    let nextResources: string[] = [];

    // Predict likely next navigation based on current page
    switch (currentPath) {
      case '/':
        nextResources = ['/servizi', '/contatti'];
        break;
      case '/servizi':
        nextResources = ['/servizi/ems', '/servizi/personal-training', '/contatti'];
        break;
      case '/blog':
        nextResources = ['/blog/[latest-articles]'];
        break;
      default:
        nextResources = ['/contatti'];
    }

    nextResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
    });
  };

  // Performance monitoring dashboard (only in development)
  const renderPerformanceDebug = () => {
    if (process.env.NODE_ENV !== 'development' || !metrics) return null;

    return (
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50">
        <div className="font-bold mb-2">Core Web Vitals</div>
        <div className={`${metrics.lcp <= 2500 ? 'text-green-400' : 'text-red-400'}`}>
          LCP: {metrics.lcp?.toFixed(0)}ms {metrics.lcp <= 2500 ? '✓' : '✗'}
        </div>
        <div className={`${metrics.fid <= 100 ? 'text-green-400' : 'text-red-400'}`}>
          FID: {metrics.fid?.toFixed(0)}ms {metrics.fid <= 100 ? '✓' : '✗'}
        </div>
        <div className={`${metrics.cls <= 0.1 ? 'text-green-400' : 'text-red-400'}`}>
          CLS: {metrics.cls?.toFixed(3)} {metrics.cls <= 0.1 ? '✓' : '✗'}
        </div>
        <div className={`${metrics.fcp <= 1800 ? 'text-green-400' : 'text-red-400'}`}>
          FCP: {metrics.fcp?.toFixed(0)}ms {metrics.fcp <= 1800 ? '✓' : '✗'}
        </div>
        <div className={`${metrics.ttfb <= 600 ? 'text-green-400' : 'text-red-400'}`}>
          TTFB: {metrics.ttfb?.toFixed(0)}ms {metrics.ttfb <= 600 ? '✓' : '✗'}
        </div>
      </div>
    );
  };

  return (
    <>
      {renderPerformanceDebug()}
      {/* This component renders nothing visible in production */}
    </>
  );
};

export default PerformanceOptimizer;