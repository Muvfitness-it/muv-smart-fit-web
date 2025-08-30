import { useEffect } from 'react';

const CriticalCSS = () => {
  useEffect(() => {
    // Comprehensive critical CSS for above-the-fold content
    const criticalCSS = document.createElement('style');
    criticalCSS.textContent = `
      /* CSS Variables - Essential tokens */
      :root {
        --background: 224 71% 4%;
        --foreground: 213 31% 91%;
        --brand-primary: 334 89% 45%;
        --brand-secondary: 260 100% 50%;
        --brand-accent: 213 100% 50%;
        --header-height: 80px;
      }
      
      /* Critical font loading - prevent FOIT/FOUT */
      @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 700 900;
        font-display: swap;
        src: local('Montserrat'), url('https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-Y3tcoqK5.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      
      /* Base styles */
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Critical layout classes */
      .min-h-screen { min-height: 100vh; min-height: 100dvh; }
      .relative { position: relative; }
      .flex { display: flex; }
      .flex-col { flex-direction: column; }
      .items-center { align-items: center; }
      .justify-center { justify-content: center; }
      .w-full { width: 100%; }
      .h-full { height: 100%; }
      .max-w-7xl { max-width: 80rem; }
      .mx-auto { margin-left: auto; margin-right: auto; }
      .px-4 { padding-left: 1rem; padding-right: 1rem; }
      .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
      .text-center { text-align: center; }
      .z-50 { z-index: 50; }
      
      /* Critical navigation styles */
      .fixed { position: fixed; }
      .top-0 { top: 0; }
      .left-0 { left: 0; }
      .right-0 { right: 0; }
      .backdrop-blur-md { backdrop-filter: blur(12px); }
      .bg-background\\/80 { background-color: hsl(var(--background) / 0.8); }
      
      /* Critical hero section styles */
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
      
      /* Critical typography */
      .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
      .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
      .font-bold { font-weight: 700; }
      .font-extrabold { font-weight: 800; }
      .font-black { font-weight: 900; }
      .leading-tight { line-height: 1.25; }
      .tracking-tight { letter-spacing: -0.025em; }
      
      /* Responsive typography */
      @media (min-width: 640px) { 
        .sm\\:text-5xl { font-size: 3rem; line-height: 1; }
        .sm\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
      }
      @media (min-width: 768px) { 
        .md\\:text-6xl { font-size: 3.75rem; line-height: 1; }
        .md\\:py-12 { padding-top: 3rem; padding-bottom: 3rem; }
      }
      @media (min-width: 1024px) { 
        .lg\\:text-7xl { font-size: 4.5rem; line-height: 1; }
        .lg\\:py-16 { padding-top: 4rem; padding-bottom: 4rem; }
      }
      @media (min-width: 1280px) { 
        .xl\\:text-8xl { font-size: 6rem; line-height: 1; }
      }
      
      /* Critical gradient styles */
      .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
      .from-brand-primary { --tw-gradient-from: hsl(var(--brand-primary)); --tw-gradient-to: hsl(var(--brand-primary) / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
      .via-brand-secondary { --tw-gradient-to: hsl(var(--brand-secondary) / 0); --tw-gradient-stops: var(--tw-gradient-from), hsl(var(--brand-secondary)), var(--tw-gradient-to); }
      .to-brand-accent { --tw-gradient-to: hsl(var(--brand-accent)); }
      .bg-clip-text { -webkit-background-clip: text; background-clip: text; }
      .text-transparent { color: transparent; }
      
      /* Critical hero text styles */
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
      
      /* Shadow effects */
      .drop-shadow-2xl { filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15)); }
      
      /* Dark overlay */
      .bg-black\\/40 { background-color: rgb(0 0 0 / 0.4); }
      .absolute { position: absolute; }
      .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
      
      /* Flex utilities for hero */
      .flex-1 { flex: 1 1 0%; }
      .space-y-6 > * + * { margin-top: 1.5rem; }
      .space-y-8 > * + * { margin-top: 2rem; }
      
      /* Button critical styles */
      .inline-flex { display: inline-flex; }
      .items-center { align-items: center; }
      .justify-center { justify-content: center; }
      .px-8 { padding-left: 2rem; padding-right: 2rem; }
      .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
      .rounded-full { border-radius: 9999px; }
      .bg-brand-primary { background-color: hsl(var(--brand-primary)); }
      .text-white { color: rgb(255 255 255); }
      .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
      .hover\\:scale-105:hover { transform: scale(1.05); }
      
      /* Critical loading state */
      .loading-spinner {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border: 2px solid #ffffff33;
        border-radius: 50%;
        border-top-color: #ffffff;
        animation: spin 1s ease-in-out infinite;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      /* Prevent FOUC */
      .app-loading {
        background: hsl(var(--background));
        color: hsl(var(--foreground));
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