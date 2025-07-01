
import React, { useEffect, useRef, useState } from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface BlogFrameProps {
  slug?: string;
  isLoading: boolean;
  error: string | null;
  onIframeLoad?: () => void;
}

const BlogFrame: React.FC<BlogFrameProps> = ({ 
  slug, 
  isLoading, 
  error,
  onIframeLoad 
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Costruisce l'URL diretto per l'articolo invece di caricare tutto il blog
  const getIframeUrl = () => {
    const baseUrl = 'https://muvfit-blog-builder.lovable.app';
    if (slug) {
      // Naviga direttamente all'articolo
      return `${baseUrl}/article/${slug}`;
    }
    return baseUrl;
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    console.log('BlogFrame: Setting up iframe for URL:', getIframeUrl());

    const handleLoad = () => {
      console.log('BlogFrame: Iframe loaded successfully');
      setIframeLoaded(true);
      onIframeLoad?.();
    };

    const handleError = () => {
      console.error('BlogFrame: Iframe failed to load');
      setIframeLoaded(false);
    };

    iframe.addEventListener('load', handleLoad);
    iframe.addEventListener('error', handleError);

    // Timeout ridotto per feedback più veloce
    const timeout = setTimeout(() => {
      if (!iframeLoaded) {
        console.log('BlogFrame: Iframe loading timeout reached');
        setLoadingTimeout(true);
      }
    }, 5000); // Ridotto da 8s a 5s per caricamento più rapido

    return () => {
      iframe.removeEventListener('load', handleLoad);
      iframe.removeEventListener('error', handleError);
      clearTimeout(timeout);
    };
  }, [slug, onIframeLoad, iframeLoaded]);

  const handleRetry = () => {
    console.log('BlogFrame: Retrying iframe load');
    setIframeLoaded(false);
    setLoadingTimeout(false);
    if (iframeRef.current) {
      // Force reload con cache busting
      const newUrl = getIframeUrl() + '?t=' + Date.now();
      iframeRef.current.src = newUrl;
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-800 rounded-lg">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 mb-2">Errore nel caricamento dell'articolo</p>
          <p className="text-gray-400 text-sm mb-4">
            Riprova più tardi o contattaci se il problema persiste
          </p>
          <button
            onClick={handleRetry}
            className="flex items-center space-x-2 mx-auto px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Riprova</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-gray-800 rounded-lg overflow-hidden">
      {(isLoading || !iframeLoaded) && !loadingTimeout && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-pink-600" />
            <span className="text-gray-300">
              {slug ? 'Caricamento articolo...' : 'Caricamento blog...'}
            </span>
          </div>
        </div>
      )}
      
      {loadingTimeout && !iframeLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <p className="text-yellow-400 mb-2">
              {slug ? 'L\'articolo sta impiegando più tempo del solito' : 'Il blog sta impiegando più tempo del solito'}
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Controlla la tua connessione internet
            </p>
            <button
              onClick={handleRetry}
              className="flex items-center space-x-2 mx-auto px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Riprova</span>
            </button>
          </div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        id="blog-iframe"
        src={getIframeUrl()}
        className="w-full border-0"
        style={{ 
          minHeight: '800px',
          height: 'calc(100vh - 200px)',
          opacity: iframeLoaded ? 1 : 0,
          transition: 'opacity 0.15s ease-in-out' // Transizione più veloce
        }}
        title={slug ? `Articolo: ${slug}` : "MUV Fitness Blog"}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
        loading="eager" // Caricamento immediato
        allow="fullscreen"
      />
    </div>
  );
};

export default BlogFrame;
