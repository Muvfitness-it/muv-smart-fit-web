import { useEffect } from 'react';

const CriticalCSS = () => {
  useEffect(() => {
    // Inline critical CSS for above-the-fold content
    const criticalCSS = document.createElement('style');
    criticalCSS.textContent = `
      /* Critical hero section styles */
      .hero-critical {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, hsl(var(--background)), hsl(var(--background)/0.8));
      }
      
      /* Critical button styles */
      .btn-critical {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.5rem;
        border-radius: 0.375rem;
        background: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
        text-decoration: none;
        transition: all 0.2s;
      }
      
      .btn-critical:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px hsla(var(--primary), 0.3);
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