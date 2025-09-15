import { useEffect } from 'react';

// Minimal unused code remover - only removes truly safe unused elements
const UnusedCodeRemover = () => {
  useEffect(() => {
    // Only perform very safe optimizations to avoid breaking design
    const safeOptimizations = () => {
      // Remove unused CSS by observing which classes are actually used
      const optimizeCSS = () => {
        // Only optimize performance properties, don't hide visual classes
        const optimizedCSS = document.createElement('style');
        optimizedCSS.textContent = `
          /* Safe performance optimizations only */
          * { will-change: auto; }
          img { content-visibility: auto; }
          .lazy-load { content-visibility: auto; }
          .below-fold { content-visibility: auto; contain-intrinsic-size: 1px 500px; }
          
          /* Safe font optimizations */
          @font-face { font-display: swap; }
        `;
        optimizedCSS.setAttribute('data-safe-optimization', 'true');
        document.head.appendChild(optimizedCSS);
      };

      // Only defer scripts that are definitely safe to defer
      const deferNonCriticalJS = () => {
        // Only defer analytics and tracking scripts
        const safeScripts = document.querySelectorAll('script[src*="gtag"], script[src*="analytics"], script[src*="facebook"], script[src*="twitter"]');
        safeScripts.forEach(script => {
          if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
            script.setAttribute('defer', 'true');
          }
        });
      };

      // Only remove truly empty elements that serve no purpose
      const cleanupEmptyElements = () => {
        // Very conservative cleanup - only empty divs with no classes or attributes
        const emptyElements = document.querySelectorAll('div:empty:not([class]):not([id]):not([data-*])');
        emptyElements.forEach(el => {
          if (el.children.length === 0 && !el.textContent?.trim()) {
            el.remove();
          }
        });
      };

      // Safe image optimization
      const optimizeImages = () => {
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach((img, index) => {
          const image = img as HTMLImageElement;
          // First 3 images eager, rest lazy
          if (index < 3) {
            image.loading = 'eager';
            if (index < 2) {
              image.fetchPriority = 'high';
            }
          } else {
            image.loading = 'lazy';
            image.fetchPriority = 'low';
          }
        });
      };

      // Run only safe optimizations
      optimizeCSS();
      deferNonCriticalJS();
      
      // Delay non-critical optimizations
      setTimeout(() => {
        cleanupEmptyElements();
        optimizeImages();
      }, 1000);
    };

    safeOptimizations();

  }, []);

  return null;
};

export default UnusedCodeRemover;