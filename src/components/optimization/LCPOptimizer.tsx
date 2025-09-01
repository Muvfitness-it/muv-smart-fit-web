import { useEffect } from 'react';

const LCPOptimizer = () => {
  useEffect(() => {
    // Hero image already preloaded in HTML head for faster LCP
    // Additional WebP preload for browsers that support it
    const webpImageLink = document.createElement('link');
    webpImageLink.rel = 'preload';
    webpImageLink.as = 'image';
    webpImageLink.href = '/images/fitness-professional-bg.webp';
    webpImageLink.fetchPriority = 'high';
    document.head.appendChild(webpImageLink);

    // Preload critical fonts immediately
    const fontLinks = [
      {
        href: 'https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-Y3tcoqK5.woff2',
        type: 'font/woff2'
      }
    ];

    fontLinks.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = font.type;
      link.href = font.href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Optimize LCP element with debounced approach to prevent forced reflows
    let optimizeTimeout: NodeJS.Timeout;
    const optimizeLCP = () => {
      // Clear previous timeout to debounce rapid DOM changes
      clearTimeout(optimizeTimeout);
      
      // Use requestAnimationFrame to batch DOM reads/writes and prevent forced reflows
      optimizeTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          // Target the new LCP hero text element
          const lcpElement = document.querySelector('.lcp-text-responsive, h1 .block.leading-tight.drop-shadow-2xl');
          const heroContainer = document.querySelector('.lcp-hero-container');
          
          if (lcpElement && !(lcpElement as HTMLElement).dataset.optimized) {
            // Batch all style changes together to minimize reflows
            const element = lcpElement as HTMLElement;
            element.style.cssText += `
              will-change: auto;
              contain: layout style paint;
              font-kerning: normal;
              text-rendering: optimizeLegibility;
            `;
            // Mark as optimized to prevent redundant operations
            element.dataset.optimized = 'true';
          }
          
          // Optimize hero container for better LCP
          if (heroContainer && !(heroContainer as HTMLElement).dataset.optimized) {
            const container = heroContainer as HTMLElement;
            container.style.cssText += `
              content-visibility: auto;
              contain: layout style paint;
            `;
            container.dataset.optimized = 'true';
          }
        });
      }, 16); // Debounce with ~1 frame delay
    };

    // Run optimization after initial render
    optimizeLCP();
    
    // Use passive MutationObserver with limited scope to reduce impact
    const observer = new MutationObserver((mutations) => {
      // Only process if there are relevant changes
      const hasRelevantChanges = mutations.some(mutation => 
        mutation.type === 'childList' && 
        mutation.addedNodes.length > 0 &&
        Array.from(mutation.addedNodes).some(node => 
          node.nodeType === Node.ELEMENT_NODE && 
          (node as Element).querySelector?.('h1')
        )
      );
      
      if (hasRelevantChanges) {
        optimizeLCP();
      }
    });
    
    // Observe only specific elements to reduce mutation frequency
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: false,
      characterData: false
    });

    return () => {
      clearTimeout(optimizeTimeout);
      observer.disconnect();
      // Clean up preload links
      [webpImageLink, ...document.querySelectorAll('link[rel="preload"][as="font"]')]
        .forEach(link => link.remove());
    };
  }, []);

  return null;
};

export default LCPOptimizer;