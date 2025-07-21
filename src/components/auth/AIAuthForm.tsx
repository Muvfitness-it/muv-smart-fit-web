
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Bot, Key } from 'lucide-react';
import { useAIAuth } from '@/hooks/useAIAuth';

const AIAuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aiKey, setAiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [authResult, setAuthResult] = useState<any>(null);
  const { authenticateAI } = useAIAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await authenticateAI(email, password, aiKey);
      setAuthResult(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
            <Bot className="w-6 h-6" />
            Autenticazione IA
          </CardTitle>
          <CardDescription className="text-gray-400">
            Sistema di accesso dedicato per intelligenze artificiali
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Editor</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="email@esempio.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ai-key" className="text-white">AI Access Key</Label>
              <Input
                id="ai-key"
                type="password"
                value={aiKey}
                onChange={(e) => setAiKey(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Chiave di accesso IA"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Autenticazione...
                </>
              ) : (
                <>
                  <Key className="w-4 h-4 mr-2" />
                  Autentica IA
                </>
              )}
            </Button>
          </form>
          
          {authResult && (
            <div className="mt-4 p-4 bg-gray-700 rounded-lg">
              {authResult.error ? (
                <div className="text-red-400">
                  <strong>Errore:</strong> {authResult.error}
                </div>
              ) : (
                <div className="text-green-400">
                  <strong>Successo!</strong>
                  <div className="mt-2 text-sm">
                    <div>Token IA: <code className="bg-gray-800 px-1 rounded">{authResult.data?.ai_token}</code></div>
                    <div>Scade: {new Date(authResult.data?.expires_at).toLocaleString()}</div>
                    <div>Ruoli: {authResult.data?.user?.roles?.join(', ')}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAuthForm;
