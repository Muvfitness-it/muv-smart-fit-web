
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createSampleBlogPosts } from '@/utils/createSampleBlogPosts';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const CreateSamplePosts = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreatePosts = async () => {
    setIsCreating(true);
    setError(null);
    setSuccess(false);
    
    try {
      const result = await createSampleBlogPosts();
      if (result) {
        setSuccess(true);
        console.log('Created posts:', result);
      } else {
        setError('Errore durante la creazione dei post');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Crea Post di Esempio</CardTitle>
            <p className="text-gray-400">
              Genera post di esempio per popolare il blog con contenuti sui temi fitness, nutrizione e benessere.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {!success && !error && (
              <Button 
                onClick={handleCreatePosts} 
                disabled={isCreating}
                className="w-full"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creazione in corso...
                  </>
                ) : (
                  'Crea Post di Esempio'
                )}
              </Button>
            )}

            {success && (
              <div className="flex items-center gap-2 p-4 bg-green-900/50 border border-green-600 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-green-400 font-medium">Post creati con successo!</p>
                  <p className="text-green-300 text-sm">
                    Vai alla pagina <a href="/blog" className="underline hover:text-green-200">Blog</a> per visualizzarli.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-900/50 border border-red-600 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-red-400 font-medium">Errore durante la creazione</p>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <h3 className="font-medium text-white mb-2">Post che verranno creati:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• EMS Training: Il Futuro del Fitness è Già Qui</li>
                <li>• Pancafit: Ritrova il Benessere della Tua Schiena</li>
                <li>• Alimentazione e Allenamento: La Guida Completa</li>
                <li>• 5 Ricette Post-Allenamento per il Recupero Muscolare</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateSamplePosts;
