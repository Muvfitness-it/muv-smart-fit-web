import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const Web3FormsSettings: React.FC = () => {
  const [accessKey, setAccessKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load existing key on mount
    const existingKey = localStorage.getItem('web3forms_access_key') || '';
    setAccessKey(existingKey);
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (accessKey.trim()) {
        localStorage.setItem('web3forms_access_key', accessKey.trim());
        toast({
          title: "Chiave salvata",
          description: "La chiave Web3Forms è stata salvata con successo",
        });
      } else {
        localStorage.removeItem('web3forms_access_key');
        toast({
          title: "Chiave rimossa",
          description: "La chiave Web3Forms è stata rimossa",
        });
      }
    } catch (error) {
      toast({
        title: "Errore",
        description: "Errore nel salvare la chiave",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTest = async () => {
    if (!accessKey.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci prima una chiave di accesso",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey.trim(),
          name: "Test MUV Fitness",
          email: "test@muvfitness.it",
          message: "Test di configurazione Web3Forms",
          subject: "Test configurazione"
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        toast({
          title: "Test riuscito",
          description: "La chiave Web3Forms funziona correttamente",
        });
      } else {
        toast({
          title: "Test fallito",
          description: data.message || "Chiave non valida",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Errore di rete",
        description: "Impossibile testare la connessione",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Configurazione Web3Forms
        </CardTitle>
        <CardDescription>
          Configura la chiave di accesso per Web3Forms. La chiave viene salvata localmente nel browser.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="web3forms-key">Chiave di accesso Web3Forms</Label>
          <div className="flex gap-2 mt-1">
            <div className="relative flex-1">
              <Input
                id="web3forms-key"
                type={showKey ? "text" : "password"}
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="Inserisci la tua chiave Web3Forms"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Ottieni la tua chiave gratuita su{' '}
            <a 
              href="https://web3forms.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              web3forms.com
            </a>
          </p>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleSave} 
            disabled={isLoading}
          >
            Salva Chiave
          </Button>
          <Button 
            variant="outline" 
            onClick={handleTest} 
            disabled={isLoading || !accessKey.trim()}
          >
            Testa Connessione
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Sicurezza:</strong> La chiave viene salvata solo nel browser locale e non viene mai trasmessa ai nostri server. 
            Se non configurata, il sistema utilizzerà automaticamente il servizio di backup Supabase.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};