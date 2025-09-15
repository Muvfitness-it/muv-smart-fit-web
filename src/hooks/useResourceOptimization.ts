import { useEffect } from 'react';

export const useResourceOptimization = () => {
  useEffect(() => {
    // Simplified critical resource preloading - no aggressive DOM manipulation
    const preloadHeroImage = () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = '/images/fitness-professional-bg.jpg';
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    };

    // Only preload hero image - removed all other aggressive optimizations
    preloadHeroImage();
  }, []);
};