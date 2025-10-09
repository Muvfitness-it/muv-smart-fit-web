import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resolveRedirect, shouldRedirect } from '@/utils/redirectMap';

/**
 * Component per gestire redirect 301 client-side
 * Implementa la mappa redirect legacy → nuove URL
 */
const RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    
    // Verifica se il path corrente richiede redirect
    if (shouldRedirect(pathname)) {
      const newPath = resolveRedirect(pathname);
      
      if (newPath) {
        console.log(`[REDIRECT] ${pathname} → ${newPath}`);
        // Replace per evitare di inserire il vecchio path nello storico
        navigate(newPath, { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  return null;
};

export default RedirectHandler;
