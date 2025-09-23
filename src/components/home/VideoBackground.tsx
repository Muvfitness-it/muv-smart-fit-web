import React, { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImage: string;
  className?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoSrc, 
  fallbackImage, 
  className = "" 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setVideoError(true);
      return;
    }

    const handleLoadedData = () => {
      setVideoLoaded(true);
    };

    const handleError = () => {
      setVideoError(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  if (videoError || !videoLoaded) {
    return (
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 ${className}`}
        style={{
          backgroundImage: `url('${fallbackImage}')`
        }}
      />
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover opacity-15 ${className}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setVideoError(true)}
        style={{
          filter: 'blur(1px) brightness(0.7)'
        }}
      >
        <source src={`${videoSrc}.mp4`} type="video/mp4" />
        <source src={`${videoSrc}.webm`} type="video/webm" />
      </video>
      
      {/* Screen reader description */}
      <div className="sr-only">
        Video di sfondo che mostra allenamenti fitness con EMS, Pilates e personal training
      </div>
    </>
  );
};

export default VideoBackground;