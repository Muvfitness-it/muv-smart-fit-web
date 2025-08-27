import { useEffect } from 'react';

const FontOptimizer = () => {
  useEffect(() => {
    // Add critical font display CSS
    const fontDisplayCSS = document.createElement('style');
    fontDisplayCSS.textContent = `
      /* Phase 2: Font Display Optimization */
      @font-face {
        font-family: 'Montserrat';
        font-display: swap;
        font-weight: 400 700;
        src: local('Montserrat');
      }
      
      @font-face {
        font-family: 'Poppins';
        font-display: swap;
        font-weight: 400 600;
        src: local('Poppins');
      }
      
      /* Reduce font loading shift */
      body {
        font-family: 'Poppins', system-ui, -apple-system, sans-serif;
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
      }
      
      /* Optimize text rendering */
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }
    `;
    
    document.head.appendChild(fontDisplayCSS);
    
    return () => {
      fontDisplayCSS.remove();
    };
  }, []);

  return null;
};

export default FontOptimizer;