import { useEffect } from 'react';

const CriticalCSS = () => {
  useEffect(() => {
    // Inline critical CSS for above-the-fold content
    const criticalCSS = document.createElement('style');
    criticalCSS.textContent = `
      /* Critical font loading - prevent FOIT/FOUT */
      @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 700 900;
        font-display: swap;
        src: local('Montserrat'), url('https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-Y3tcoqK5.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      
      /* Critical LCP hero styles - exact selector from audit */
      .text-3xl .block.leading-tight.drop-shadow-2xl,
      h1 .block.leading-tight.drop-shadow-2xl {
        font-family: 'Montserrat', 'Inter', ui-sans-serif, system-ui, sans-serif;
        font-weight: 900;
        line-height: 1.1;
        letter-spacing: -0.025em;
        text-rendering: optimizeLegibility;
        font-feature-settings: "kern" 1, "liga" 1;
        will-change: transform;
        contain: layout style paint;
      }
      
      /* Critical hero section styles - prevent layout shift */
      section[class*="min-h-screen"] {
        min-height: 100vh;
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        contain: layout style;
      }
      
      /* Background image optimization */
      div[style*="background-image"] {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        will-change: auto;
        backface-visibility: hidden;
      }
      
      /* Critical text sizing - prevent CLS */
      .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
      @media (min-width: 640px) { .sm\\:text-5xl { font-size: 3rem; line-height: 1; } }
      @media (min-width: 768px) { .md\\:text-6xl { font-size: 3.75rem; line-height: 1; } }
      @media (min-width: 1024px) { .lg\\:text-7xl { font-size: 4.5rem; line-height: 1; } }
      @media (min-width: 1280px) { .xl\\:text-8xl { font-size: 6rem; line-height: 1; } }
      
      /* Critical gradient - LCP element optimization */
      .bg-gradient-to-r.from-brand-primary.via-brand-secondary.to-brand-accent {
        background: linear-gradient(to right, hsl(334 89% 45%), hsl(260 100% 50%), hsl(213 100% 50%));
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
      }
      
      /* Prevent FOUC */
      .app-loading {
        background: hsl(var(--background));
        color: hsl(var(--foreground));
      }
      
      /* Critical navigation styles */
      .nav-critical {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 50;
        background: hsla(var(--background), 0.9);
        backdrop-filter: blur(8px);
      }
    `;
    
    criticalCSS.setAttribute('data-critical', 'true');
    document.head.insertBefore(criticalCSS, document.head.firstChild);
    
    return () => {
      const criticalStyles = document.querySelector('[data-critical="true"]');
      if (criticalStyles) {
        criticalStyles.remove();
      }
    };
  }, []);

  return null;
};

export default CriticalCSS;