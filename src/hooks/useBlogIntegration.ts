
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
    console.log('useBlogIntegration: Received message:', event.data, 'from origin:', event.origin);
    
    // Verifica che il messaggio provenga dal dominio del blog
    if (!event.origin.includes('lovable.app')) {
      console.log('useBlogIntegration: Ignoring message from unknown origin:', event.origin);
      return;
    }

    const { type, data } = event.data;

    switch (type) {
      case 'navigate':
        console.log('useBlogIntegration: Navigate message received:', data);
        if (data?.slug) {
          navigate(`/blog/${data.slug}`);
        } else {
          navigate('/blog');
        }
        break;
      
      case 'loaded':
        console.log('useBlogIntegration: Loaded message received:', data);
        setIsLoading(false);
        if (data?.title || data?.description) {
          setArticleMeta({
            title: data.title,
            description: data.description
          });
        }
        break;
      
      case 'error':
        console.log('useBlogIntegration: Error message received:', data);
        setIsLoading(false);
        setError('Errore nel caricamento del blog');
        break;
    }
  }, [navigate]);

  useEffect(() => {
    console.log('useBlogIntegration: Setting up message listener for slug:', currentSlug);
    window.addEventListener('message', handleMessage);
    
    // Timeout per gestire il caso in cui l'iframe non risponda
    const timeout = setTimeout(() => {
      console.log('useBlogIntegration: Timeout reached, setting loading to false');
      setIsLoading(false);
    }, 10000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeout);
    };
  }, [handleMessage, currentSlug]);

  const sendMessageToIframe = useCallback((message: any) => {
    console.log('useBlogIntegration: Sending message to iframe:', message);
    const iframe = document.querySelector('#blog-iframe') as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(message, 'https://muvfit-blog-builder.lovable.app');
    } else {
      console.log('useBlogIntegration: Iframe not found or not ready');
    }
  }, []);

  return {
    isLoading,
    error,
    articleMeta,
    sendMessageToIframe
  };
};
