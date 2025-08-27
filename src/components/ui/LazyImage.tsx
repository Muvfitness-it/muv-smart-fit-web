import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  sizes?: string;
  srcSet?: string;
  width?: number;
  height?: number;
}
const LazyImage = ({
  src,
  alt,
  className,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjIi8+PC9zdmc+",
  onLoad,
  onError,
  priority = false,
  sizes,
  srcSet,
  width,
  height
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (priority) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      });
    }, {
      rootMargin: '100px',
      threshold: 0.1
    });
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => observer.disconnect();
  }, [priority]);
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };
  const handleError = () => {
    setHasError(true);
    onError?.();
  };
  // Generate WebP source with fallback
  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.includes('.jpg') || originalSrc.includes('.jpeg') || originalSrc.includes('.png')) {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return originalSrc;
  };

  // Generate srcSet for WebP with different sizes
  const getWebPSrcSet = (originalSrcSet: string) => {
    return originalSrcSet.replace(/\.(jpg|jpeg|png)/gi, '.webp');
  };

  return (
    <div 
      ref={imgRef} 
      className={cn("relative", className)}
      style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
    >
      {isInView && !hasError ? (
        <picture>
          <source 
            srcSet={srcSet ? getWebPSrcSet(srcSet) : getWebPSrc(src)} 
            sizes={sizes}
            type="image/webp" 
          />
          <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "transition-opacity duration-500 ease-out w-full h-full object-cover",
              isLoaded ? "opacity-100" : "opacity-0",
              className
            )}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
          />
        </picture>
      ) : !hasError ? (
        <div 
          className={cn("animate-pulse bg-muted", className)}
          style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
        >
          {/* Blur placeholder with better UX */}
          <div className="w-full h-full bg-gradient-to-r from-muted to-muted/50 rounded" />
        </div>
      ) : (
        <div className={cn("bg-muted flex items-center justify-center", className)}>
          <div className="w-full h-full bg-muted/60" aria-hidden="true" />
        </div>
      )}
    </div>
  );
};
export default LazyImage;