import { useEffect } from 'react';

const ExternalForm = () => {
  useEffect(() => {
    // Load the external script
    const script = document.createElement('script');
    script.src = 'https://link.drewcompany.it/js/form_embed.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      const existingScript = document.querySelector('script[src="https://link.drewcompany.it/js/form_embed.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="w-full min-h-[600px]">
      <iframe
        src="https://link.drewcompany.it/widget/form/CtTtu1r7yFEMPXlPJQEy"
        style={{width:'100%',height:'100%',border:'none',borderRadius:'4px', minHeight: '600px'}}
        id="inline-CtTtu1r7yFEMPXlPJQEy" 
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="landing"
        data-height="undefined"
        data-layout-iframe-id="inline-CtTtu1r7yFEMPXlPJQEy"
        data-form-id="CtTtu1r7yFEMPXlPJQEy"
        title="landing"
      />
    </div>
  );
};

export default ExternalForm;