import React from 'react';

interface ImageSEOProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
}

const ImageSEO: React.FC<ImageSEOProps> = ({
  src,
  alt,
  title,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}) => {
  // Ottimizza l'attributo alt per SEO
  const optimizedAlt = alt || 'Immagine MUV Fitness Legnago';
  
  // Genera title se non fornito
  const optimizedTitle = title || alt || 'MUV Fitness - Centro fitness a Legnago';

  return (
    <img
      src={src}
      alt={optimizedAlt}
      title={optimizedTitle}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : loading}
      sizes={sizes}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      style={{
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        objectFit: 'cover'
      }}
    />
  );
};

export default ImageSEO;