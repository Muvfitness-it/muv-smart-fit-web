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
}
const LazyImage = ({
  src,
  alt,
  className,
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjIi8+PC9zdmc+",
  onLoad,
  onError,
  priority = false
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
      rootMargin: '50px'
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
  return (
    <div ref={imgRef} className={cn("relative", className)}>
      {isInView && !hasError ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : !hasError ? (
        <img
          src={placeholder}
          alt={alt}
          className={cn("opacity-50", className)}
        />
      ) : (
        <div className={cn("bg-gray-200 flex items-center justify-center", className)}>
          <span className="text-gray-500 text-sm">Error loading image</span>
        </div>
      )}
    </div>
  );
};
export default LazyImage;