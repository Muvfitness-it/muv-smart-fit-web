import { useEffect } from 'react';

const SafeResourceOptimizer = () => {
  useEffect(() => {
    // Only safe, essential optimizations
    const preloadHeroImage = () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = '/images/fitness-professional-bg.jpg';
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    };

    // Safe font preloading
    const preloadFonts = () => {
      const fonts = [
        'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew7.woff2',
        'https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfedw.woff2'
      ];

      fonts.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.href = fontUrl;
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Only execute safe optimizations
    preloadHeroImage();
    preloadFonts();

    return () => {
      // Cleanup function - remove preload links when component unmounts
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach(link => {
        if (link.getAttribute('href')?.includes('images/') || 
            link.getAttribute('href')?.includes('fonts.gstatic.com')) {
          link.remove();
        }
      });
    };
  }, []);

  return null;
};

export default SafeResourceOptimizer;