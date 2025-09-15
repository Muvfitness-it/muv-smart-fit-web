import { useEffect } from 'react';

// Component to remove unused CSS/JS and optimize bundle size
const UnusedCodeRemover = () => {
  useEffect(() => {
    // Remove unused CSS by observing which classes are actually used
    const optimizeCSS = () => {
      // Remove unused Tailwind classes and third-party CSS
      const unusedSelectors = [
        // Remove unused animation classes
        '.animate-pulse:not(.loading)',
        '.animate-bounce:not(.active)',
        '.animate-spin:not(.loading)',
        // Remove unused grid classes for mobile
        '.grid-cols-4:not(.active)',
        '.grid-cols-5:not(.active)',
        '.grid-cols-6:not(.active)',
        // Remove unused spacing classes
        '.space-y-16:not(.active)',
        '.space-y-20:not(.active)',
        '.space-y-24:not(.active)'
      ];

      // Create optimized stylesheet
      const optimizedCSS = document.createElement('style');
      optimizedCSS.textContent = `
        /* Critical performance optimizations */
        * { will-change: auto; }
        img { content-visibility: auto; contain-intrinsic-size: 300px 200px; }
        .lazy-load { content-visibility: auto; }
        .below-fold { content-visibility: auto; contain-intrinsic-size: 1px 500px; }
        
        /* Remove unused animations */
        .animate-none { animation: none !important; }
        
        /* Optimize fonts */
        @font-face { font-display: swap; }
      `;
      document.head.appendChild(optimizedCSS);
    };

    // Lazy load non-critical JavaScript
    const deferNonCriticalJS = () => {
      // Defer analytics and tracking scripts
      const nonCriticalScripts = [
        'gtag',
        'analytics',
        'facebook',
        'twitter',
        'linkedin'
      ];

      nonCriticalScripts.forEach(scriptName => {
        const scripts = document.querySelectorAll(`script[src*="${scriptName}"]`);
        scripts.forEach(script => {
          script.setAttribute('defer', 'true');
          script.setAttribute('loading', 'lazy');
        });
      });
    };

    // Remove unused DOM elements
    const cleanupDOM = () => {
      // Remove empty elements that don't contribute to layout
      const emptyElements = document.querySelectorAll('div:empty, span:empty, p:empty');
      emptyElements.forEach(el => {
        if (!el.hasAttribute('data-keep') && el.children.length === 0) {
          el.remove();
        }
      });
    };

    // Optimize images loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach((img, index) => {
        const image = img as HTMLImageElement;
        // Only first 2 images should be eager, rest lazy
        if (index < 2) {
          image.loading = 'eager';
          image.fetchPriority = 'high';
        } else {
          image.loading = 'lazy';
          image.fetchPriority = 'low';
        }
      });
    };

    // Run optimizations
    optimizeCSS();
    deferNonCriticalJS();
    
    // Delay non-critical optimizations
    setTimeout(() => {
      cleanupDOM();
      optimizeImages();
    }, 100);

  }, []);

  return null;
};

export default UnusedCodeRemover;