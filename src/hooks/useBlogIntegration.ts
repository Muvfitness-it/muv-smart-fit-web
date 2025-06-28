
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

    try {
      switch (type) {
        case 'navigate':
          console.log('useBlogIntegration: Navigate message received:', data);
          if (data?.slug) {
            navigate(`/blog/${data.slug}`);
          } else {
            navigate('/blog');
          }
          setError(null); // Clear any previous errors
          break;
        
        case 'loaded':
          console.log('useBlogIntegration: Loaded message received:', data);
          setIsLoading(false);
          setError(null);
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

        default:
          console.log('useBlogIntegration: Unknown message type:', type);
      }
    } catch (err) {
      console.error('useBlogIntegration: Error handling message:', err);
      setError('Errore nella comunicazione con il blog');
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    console.log('useBlogIntegration: Setting up message listener for slug:', currentSlug);
    
    // Reset states when slug changes
    setIsLoading(true);
    setError(null);
    
    window.addEventListener('message', handleMessage);
    
    // Timeout per gestire il caso in cui l'iframe non risponda
    const timeout = setTimeout(() => {
      console.log('useBlogIntegration: Timeout reached, checking if still loading');
      setIsLoading(false);
      // Don't set error here, let the BlogFrame component handle timeout display
    }, 12000);

    // Test message sending capability
    const testMessage = setTimeout(() => {
      console.log('useBlogIntegration: Testing message sending capability');
      sendMessageToIframe({ type: 'ping', timestamp: Date.now() });
    }, 2000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeout);
      clearTimeout(testMessage);
    };
  }, [handleMessage, currentSlug]);

  const sendMessageToIframe = useCallback((message: any) => {
    console.log('useBlogIntegration: Sending message to iframe:', message);
    try {
      const iframe = document.querySelector('#blog-iframe') as HTMLIFrameElement;
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage(message, 'https://muvfit-blog-builder.lovable.app');
        console.log('useBlogIntegration: Message sent successfully');
      } else {
        console.log('useBlogIntegration: Iframe not found or not ready');
      }
    } catch (err) {
      console.error('useBlogIntegration: Error sending message:', err);
    }
  }, []);

  return {
    isLoading,
    error,
    articleMeta,
    sendMessageToIframe
  };
};
