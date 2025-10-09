import React from 'react';

interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

/**
 * Loading State Component
 * Skeleton loaders e feedback visivi durante caricamento
 */
const LoadingState: React.FC<LoadingStateProps> = ({
  size = 'md',
  text,
  fullScreen = false
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} rounded-full border-4 border-muted`} />
        
        {/* Spinning segment */}
        <div 
          className={`
            absolute inset-0
            ${sizeClasses[size]} 
            rounded-full 
            border-4 border-transparent 
            border-t-primary 
            animate-spin
          `}
        />
      </div>
      
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

// Skeleton Loader Components
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-muted rounded-lg p-6 animate-pulse ${className}`}>
    <div className="w-12 h-12 bg-muted-foreground/20 rounded-full mb-4" />
    <div className="h-6 bg-muted-foreground/20 rounded mb-3 w-3/4" />
    <div className="h-4 bg-muted-foreground/20 rounded mb-2" />
    <div className="h-4 bg-muted-foreground/20 rounded mb-2" />
    <div className="h-4 bg-muted-foreground/20 rounded w-5/6" />
  </div>
);

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className = '' 
}) => (
  <div className={`space-y-2 animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div 
        key={i}
        className="h-4 bg-muted-foreground/20 rounded"
        style={{ width: i === lines - 1 ? '80%' : '100%' }}
      />
    ))}
  </div>
);

export const SkeletonImage: React.FC<{ aspectRatio?: string; className?: string }> = ({ 
  aspectRatio = '16/9',
  className = '' 
}) => (
  <div 
    className={`bg-muted animate-pulse rounded-lg ${className}`}
    style={{ aspectRatio }}
  />
);

export default LoadingState;
