import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ExternalForm = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Load the external script once
    const existing = document.querySelector('script[src="https://link.drewcompany.it/js/form_embed.js"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://link.drewcompany.it/js/form_embed.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="relative w-full min-h-[700px] rounded-lg overflow-hidden bg-gray-800">
        <iframe
          src="https://link.drewcompany.it/widget/form/CtTtu1r7yFEMPXlPJQEy"
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '4px', minHeight: '700px' }}
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
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {(!loaded || error) && (
        <div className="mt-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 text-gray-200">
              <p className="mb-4">Se il modulo non è visibile, aprilo in una nuova scheda:</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://link.drewcompany.it/widget/form/CtTtu1r7yFEMPXlPJQEy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button className="w-full sm:w-auto">Apri il modulo</Button>
                </a>
                <a href="https://wa.me/393291070374" target="_blank" rel="noopener noreferrer" className="inline-flex">
                  <Button variant="outline" className="w-full sm:w-auto">Scrivici su WhatsApp</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ExternalForm;