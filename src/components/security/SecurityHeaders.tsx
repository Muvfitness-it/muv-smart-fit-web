import { Helmet } from 'react-helmet';

export const SecurityHeaders = () => {
  return (
    <Helmet>
      {/* Content Security Policy */}
      <meta httpEquiv="Content-Security-Policy" content="
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://cdn.jsdelivr.net;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https: blob:;
        connect-src 'self' https://baujoowgqeyraqnukkmw.supabase.co https://*.supabase.co wss://baujoowgqeyraqnukkmw.supabase.co wss://*.supabase.co https://api.ipify.org;
        worker-src 'self' blob:;
        frame-ancestors 'self' https://*.lovable.app https://*.lovable.dev;
        frame-src 'self' https:;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        upgrade-insecure-requests;
      " />
      
      {/* Prevent MIME type sniffing */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      
      {/* Prevent clickjacking - allow same origin for iframes */}
      
      
      {/* Referrer Policy */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Permissions Policy */}
      <meta httpEquiv="Permissions-Policy" content="
        camera=(),
        microphone=(),
        geolocation=(),
        interest-cohort=()
      " />
    </Helmet>
  );
};