import { useEffect } from 'react';

// CSS optimization and minification component
const CSSMinifier = () => {
  useEffect(() => {
    // Remove unused CSS classes and optimize delivery
    const optimizeCSS = () => {
      // Critical CSS that should load immediately
      const criticalCSS = `
        /* Critical mobile-first CSS - minified */
        *{box-sizing:border-box;margin:0;padding:0}
        html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
        body{font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#333;background:#000}
        .lcp-hero-container{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
        .lcp-bg-image-webp{position:absolute;inset:0;background-size:cover;background-position:center;will-change:transform;background-image:url('/images/fitness-professional-bg.jpg')}
        .lcp-bg-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,.7),rgba(0,0,0,.5))}
        .lcp-hero-content{position:relative;z-index:10;text-align:center;padding:0 1rem;max-width:1200px;margin:0 auto}
        .lcp-gradient{background:linear-gradient(135deg,#ff6b6b,#4ecdc4);-webkit-background-clip:text;background-clip:text;color:transparent}
        .text-white{color:#fff}
        .font-black{font-weight:900}
        .mb-8{margin-bottom:2rem}
        .leading-tight{line-height:1.25}
        .text-xl{font-size:1.25rem}
        .text-brand-accent{color:#4ecdc4}
        @media(min-width:768px){.md\\:text-2xl{font-size:1.5rem}.md\\:text-3xl{font-size:1.875rem}}
        @media(min-width:1024px){.lg\\:text-3xl{font-size:1.875rem}.lg\\:text-4xl{font-size:2.25rem}}
      `;

      // Inject critical CSS
      const criticalStyle = document.createElement('style');
      criticalStyle.setAttribute('data-critical', 'true');
      criticalStyle.textContent = criticalCSS;
      document.head.insertBefore(criticalStyle, document.head.firstChild);

      // Remove duplicate CSS
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      const seen = new Set();
      
      stylesheets.forEach(link => {
        const href = link.getAttribute('href');
        if (href && seen.has(href)) {
          link.remove();
        } else if (href) {
          seen.add(href);
        }
      });
    };

    // Remove unused CSS rules at runtime - DISABLED to prevent visual issues
    const removeUnusedCSS = () => {
      // Commenting out to prevent breaking the design
      // Only keep performance optimizations
      console.log('CSS unused rule removal disabled to preserve design');
    };

    // Defer non-critical CSS but preserve critical ones
    const deferNonCriticalCSS = () => {
      const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical]):not([href*="index.css"]):not([href*="tailwind"])');
      
      nonCriticalCSS.forEach(link => {
        const href = link.getAttribute('href');
        // Don't defer main stylesheets
        if (href && !href.includes('fonts.googleapis') && !href.includes('main') && !href.includes('app')) {
          // Convert to media="print" and load on window load
          link.setAttribute('media', 'print');
          link.addEventListener('load', () => {
            link.setAttribute('media', 'all');
          });
          
          // Fallback for browsers that don't fire load event
          setTimeout(() => {
            link.setAttribute('media', 'all');
          }, 100);
        }
      });
    };

    // Optimize font loading
    const optimizeFonts = () => {
      // Preload critical fonts
      const criticalFonts = [
        'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew7.woff2',
        'https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfedw.woff2'
      ];

      criticalFonts.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        link.href = href;
        document.head.appendChild(link);
      });

      // Add font-display: swap to existing font faces
      const fontCSS = document.createElement('style');
      fontCSS.textContent = `
        @font-face {
          font-family: 'Montserrat';
          font-display: swap;
        }
        @font-face {
          font-family: 'Poppins';
          font-display: swap;
        }
      `;
      document.head.appendChild(fontCSS);
    };

    // Inline small CSS files
    const inlineSmallCSS = () => {
      const smallStylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      
      smallStylesheets.forEach(async (link) => {
        const href = link.getAttribute('href');
        if (href && href.includes('component') && href.length < 100) {
          try {
            const response = await fetch(href);
            const css = await response.text();
            
            if (css.length < 2000) { // Only inline small CSS files
              const style = document.createElement('style');
              style.textContent = css;
              link.parentNode?.replaceChild(style, link);
            }
          } catch (error) {
            // Ignore errors, keep original link
          }
        }
      });
    };

    // Run safe optimizations only
    optimizeCSS();
    // removeUnusedCSS(); // DISABLED to prevent design issues
    deferNonCriticalCSS();
    optimizeFonts();
    
    // Delay non-critical optimizations
    setTimeout(inlineSmallCSS, 1000);

  }, []);

  return null;
};

export default CSSMinifier;
