import { Helmet } from 'react-helmet';
import { useMemo } from 'react';

export const SecurityHeaders = () => {
  // Generate dynamic nonces for better security
  const nonces = useMemo(() => ({
    script: btoa(Math.random().toString()).substring(0, 16),
    style: btoa(Math.random().toString()).substring(0, 16)
  }), []);

  return (
    <Helmet>
      {/* Content Security Policy - Hardened security with nonces */}
      <meta httpEquiv="Content-Security-Policy" content={`
        default-src 'self';
        script-src 'self' 'nonce-${nonces.script}' https://www.googletagmanager.com https://www.google-analytics.com;
        style-src 'self' 'nonce-${nonces.style}' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https://baujoowgqeyraqnukkmw.supabase.co https://www.google.com;
        connect-src 'self' https://baujoowgqeyraqnukkmw.supabase.co https://*.supabase.co wss://baujoowgqeyraqnukkmw.supabase.co wss://*.supabase.co https://api.ipify.org https://www.google-analytics.com;
        worker-src 'self' blob:;
        frame-ancestors 'self' https://*.lovable.app https://*.lovable.dev;
        frame-src 'self' https://www.youtube.com;
        object-src 'none';
        base-uri 'self';
        form-action 'self' https://baujoowgqeyraqnukkmw.supabase.co;
        upgrade-insecure-requests;
        block-all-mixed-content;
      `} />
      
      {/* Prevent MIME type sniffing */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      
      {/* Prevent clickjacking */}
      <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      
      {/* Strict Transport Security */}
      <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains" />
      
      
      {/* Referrer Policy */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Permissions Policy - Enhanced */}
      <meta httpEquiv="Permissions-Policy" content="
        camera=(),
        microphone=(),
        geolocation=(),
        interest-cohort=(),
        payment=(),
        usb=(),
        magnetometer=(),
        accelerometer=(),
        gyroscope=(),
        fullscreen=(self),
        picture-in-picture=()
      " />
      
      {/* Cross-Origin Policies */}
      <meta httpEquiv="Cross-Origin-Embedder-Policy" content="credentialless" />
      <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin" />
      <meta httpEquiv="Cross-Origin-Resource-Policy" content="same-site" />
    </Helmet>
  );
};