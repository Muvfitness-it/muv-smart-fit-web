import { useEffect } from 'react';

// Aggressive image optimization component
const ImageCompressor = () => {
  useEffect(() => {
    // Create WebP versions and optimize loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      
      images.forEach((img, index) => {
        const image = img as HTMLImageElement;
        const src = image.src;
        
        // Skip if already optimized
        if (src.includes('.webp') || image.hasAttribute('data-optimized')) {
          return;
        }

        // Create WebP version if original is JPG/PNG
        if (src.match(/\.(jpg|jpeg|png)(\?|$)/i)) {
          const webpSrc = src.replace(/\.(jpg|jpeg|png)(\?|$)/i, '.webp$2');
          
          // Create picture element for WebP fallback
          const picture = document.createElement('picture');
          
          // WebP source
          const webpSource = document.createElement('source');
          webpSource.srcset = webpSrc;
          webpSource.type = 'image/webp';
          
          // Clone original image as fallback
          const fallbackImg = image.cloneNode(true) as HTMLImageElement;
          
          // Replace original image with picture element
          picture.appendChild(webpSource);
          picture.appendChild(fallbackImg);
          image.parentNode?.replaceChild(picture, image);
          
          // Mark as optimized
          fallbackImg.setAttribute('data-optimized', 'true');
          
          // Set loading priority
          if (index < 2) {
            fallbackImg.loading = 'eager';
            fallbackImg.fetchPriority = 'high';
          } else {
            fallbackImg.loading = 'lazy';
            fallbackImg.fetchPriority = 'low';
          }
        }

        // Add dimensions to prevent CLS
        if (!image.style.aspectRatio && !image.width && !image.height) {
          // Default aspect ratio for images without dimensions
          image.style.aspectRatio = '16/9';
          image.style.width = '100%';
          image.style.height = 'auto';
        }
      });
    };

    // Compress existing images by reducing quality on slow connections
    const adaptiveImageQuality = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        
        if (connection && (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g')) {
          // Use lower quality images for slow connections
          const images = document.querySelectorAll('img');
          images.forEach(img => {
            const image = img as HTMLImageElement;
            const src = image.src;
            
            // Add quality parameter for supported images
            if (src.includes('lovable-uploads/') && !src.includes('?')) {
              image.src = src + '?quality=60&format=webp';
            }
          });
        }
      }
    };

    // Preload critical images
    const preloadCriticalImages = () => {
      const criticalImages = [
        '/images/fitness-professional-bg.webp',
        '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.webp'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.type = 'image/webp';
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      });
    };

    // Lazy load images with intersection observer
    const setupLazyLoading = () => {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            
            // Start loading the image
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    };

    // Run optimizations
    optimizeImages();
    adaptiveImageQuality();
    preloadCriticalImages();
    setupLazyLoading();

    // Monitor for new images added dynamically
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const newImages = element.querySelectorAll('img');
            if (newImages.length > 0) {
              // Re-run optimization for new images
              setTimeout(optimizeImages, 100);
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default ImageCompressor;