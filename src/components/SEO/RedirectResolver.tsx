import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const RedirectResolver: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    const checkRedirect = async () => {
      try {
        const fromPath = location.pathname;
        const { data, error } = await supabase
          .from('url_redirects')
          .select('to_path, status_code')
          .eq('from_path', fromPath)
          .maybeSingle();

        if (!active) return;
        if (error) return;
        if (data?.to_path && data.to_path !== fromPath) {
          // Client-side redirect (SPA). Not a HTTP 301, but keeps UX smooth.
          navigate(data.to_path, { replace: true });
        }
      } catch {
        // ignore
      }
    };
    checkRedirect();
    return () => { active = false; };
  }, [location.pathname, navigate]);

  return null;
};

export default RedirectResolver;
