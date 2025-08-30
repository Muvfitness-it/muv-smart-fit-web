import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  fallbackSrc?: string;
  loading?: 'eager' | 'lazy';
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fallbackSrc,
  loading,
  onLoad,
  onError
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLDivElement>(null);

  // Generate WebP source
  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.includes('.jpg') || originalSrc.includes('.jpeg') || originalSrc.includes('.png')) {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return originalSrc;
  };

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

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
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
      onError?.();
    }
  };

  return (
    <div 
      ref={imgRef}
      className={cn("relative overflow-hidden", className)}
      style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
    >
      {isInView && !hasError ? (
        <picture>
          <source 
            srcSet={getWebPSrc(currentSrc)} 
            sizes={sizes}
            type="image/webp" 
          />
          <img
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            className={cn(
              "w-full h-full object-contain transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={handleLoad}
            onError={handleError}
            loading={loading || (priority ? "eager" : "lazy")}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
          />
        </picture>
      ) : !hasError ? (
        <div 
          className={cn(
            "w-full h-full bg-gradient-to-br from-muted to-muted/50 animate-pulse",
            className
          )}
          style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}
        />
      ) : (
        <div className={cn("w-full h-full bg-muted/60 flex items-center justify-center", className)}>
          <div className="text-muted-foreground text-sm">Image unavailable</div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;