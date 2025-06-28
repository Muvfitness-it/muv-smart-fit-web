
import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

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

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      // Invia il messaggio per navigare allo slug specifico se presente
      if (slug) {
        setTimeout(() => {
          iframe.contentWindow?.postMessage({
            type: 'navigate_to_article',
            slug: slug
          }, 'https://muvfit-blog-builder.lovable.app');
        }, 1000);
      }
      onIframeLoad?.();
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, [slug, onIframeLoad]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-800 rounded-lg">
        <div className="text-center">
          <p className="text-red-400 mb-2">Errore nel caricamento del blog</p>
          <p className="text-gray-400 text-sm">
            Riprova più tardi o contattaci se il problema persiste
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-gray-800 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-pink-600" />
            <span className="text-gray-300">Caricamento blog...</span>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        id="blog-iframe"
        src="https://muvfit-blog-builder.lovable.app/"
        className="w-full h-screen border-0"
        style={{ minHeight: '800px' }}
        title="MUV Fitness Blog"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        loading="lazy"
      />
    </div>
  );
};

export default BlogFrame;
