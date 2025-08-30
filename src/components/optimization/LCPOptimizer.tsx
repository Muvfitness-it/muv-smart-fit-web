import { useEffect } from 'react';

const LCPOptimizer = () => {
  useEffect(() => {
    // Preload critical hero image
    const heroImageLink = document.createElement('link');
    heroImageLink.rel = 'preload';
    heroImageLink.as = 'image';
    heroImageLink.href = '/images/fitness-professional-bg.jpg';
    heroImageLink.fetchPriority = 'high';
    document.head.appendChild(heroImageLink);

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

    // Optimize LCP element specifically
    const optimizeLCP = () => {
      const lcpElement = document.querySelector('h1 .block.leading-tight.drop-shadow-2xl');
      if (lcpElement) {
        // Optimize critical rendering properties
        (lcpElement as HTMLElement).style.willChange = 'auto';
        (lcpElement as HTMLElement).style.contain = 'layout style paint';
        (lcpElement as HTMLElement).style.fontKerning = 'normal';
        (lcpElement as HTMLElement).style.textRendering = 'optimizeLegibility';
      }
    };

    // Run optimization immediately and after DOM updates
    optimizeLCP();
    const observer = new MutationObserver(optimizeLCP);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      // Clean up preload links
      [heroImageLink, ...document.querySelectorAll('link[rel="preload"][as="font"]')]
        .forEach(link => link.remove());
    };
  }, []);

  return null;
};

export default LCPOptimizer;