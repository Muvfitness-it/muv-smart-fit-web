
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface BlogMessage {
  type: 'navigate' | 'loaded' | 'error';
  data?: {
    slug?: string;
    title?: string;
    description?: string;
    url?: string;
  };
}

export const useBlogIntegration = (currentSlug?: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [articleMeta, setArticleMeta] = useState<{
    title?: string;
    description?: string;
  }>({});
  const navigate = useNavigate();

  const handleMessage = useCallback((event: MessageEvent<BlogMessage>) => {
    // Verifica che il messaggio provenga dal dominio del blog
    if (!event.origin.includes('lovable.app')) return;

    const { type, data } = event.data;

    switch (type) {
      case 'navigate':
        if (data?.slug) {
          navigate(`/blog/${data.slug}`);
        } else {
          navigate('/blog');
        }
        break;
      
      case 'loaded':
        setIsLoading(false);
        if (data?.title || data?.description) {
          setArticleMeta({
            title: data.title,
            description: data.description
          });
        }
        break;
      
      case 'error':
        setIsLoading(false);
        setError('Errore nel caricamento del blog');
        break;
    }
  }, [navigate]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  const sendMessageToIframe = useCallback((message: any) => {
    const iframe = document.querySelector('#blog-iframe') as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(message, 'https://muvfit-blog-builder.lovable.app');
    }
  }, []);

  return {
    isLoading,
    error,
    articleMeta,
    sendMessageToIframe
  };
};
