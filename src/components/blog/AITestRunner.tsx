import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface AIResponse {
  success: boolean;
  post?: {
    id: string;
    title: string;
    slug: string;
    content: string;
    meta_title?: string;
    meta_description?: string;
    excerpt?: string;
  };
  qaChecks?: Record<string, boolean>;
  internal_links?: { anchor: string; url: string }[];
  message?: string;
  error?: string;
}

const extractHeadings = (html: string) => {
  const h1 = (html.match(/<h1[^>]*>(.*?)<\/h1>/i) || [])[1] || '';
  const h2 = Array.from(html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)).map((m) => m[1]);
  const h3 = Array.from(html.matchAll(/<h3[^>]*>(.*?)<\/h3>/gi)).map((m) => m[1]);
  return { h1, h2, h3 };
};

const AITestRunner: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [result1, setResult1] = useState<AIResponse | null>(null);
  const [result2, setResult2] = useState<AIResponse | null>(null);

  const runTest = async (title: string, action: 'write_from_title' | 'rewrite_from_title') => {
    const { data, error } = await supabase.functions.invoke('ai-article-writer', {
      body: { title, action }
    });
    if (error) throw error;
    return data as AIResponse;
  };

  const handleRun = async () => {
    setRunning(true);
    try {
      const r1 = await runTest('Dimagrire con Vacuum a Legnago: guida completa', 'write_from_title');
      setResult1(r1);
      const r2 = await runTest('Pancafit: benessere schiena', 'rewrite_from_title');
      setResult2(r2);
    } catch (e) {
      console.error('AI test error', e);
    } finally {
      setRunning(false);
    }
  };

  const renderResult = (label: string, res: AIResponse | null) => {
    if (!res) return null;
    const headings = res.post ? extractHeadings(res.post.content) : { h1: '', h2: [], h3: [] };
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>{label}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {res.success ? (
            <>
              <div className="flex flex-wrap gap-2">
                {Object.entries(res.qaChecks || {}).map(([k, v]) => (
                  <Badge key={k} variant={v ? 'default' : 'secondary'}>
                    {k}: {v ? 'OK' : 'KO'}
                  </Badge>
                ))}
              </div>
              <div><strong>H1:</strong> {headings.h1}</div>
              <div>
                <strong>H2:</strong> {headings.h2.join(' • ')}
              </div>
              <div>
                <strong>H3:</strong> {headings.h3.join(' • ')}
              </div>
              <div><strong>Slug:</strong> {res.post?.slug}</div>
              <div><strong>Meta title:</strong> {res.post?.meta_title}</div>
              <div><strong>Meta description:</strong> {res.post?.meta_description}</div>
              {res.internal_links && res.internal_links.length > 0 && (
                <div>
                  <strong>Link interni:</strong>
                  <ul className="list-disc pl-5">
                    {res.internal_links.map((l, i) => (
                      <li key={i}>{l.anchor} → {l.url}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div><strong>Messaggio:</strong> {res.message}</div>
            </>
          ) : (
            <div className="text-red-500">Errore: {res.error}</div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test IA (2 articoli)</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleRun} disabled={running}>
          {running ? 'Esecuzione…' : 'Esegui TEST #1 e #2'}
        </Button>
        {renderResult('TEST #1 — Nuovo articolo', result1)}
        {renderResult('TEST #2 — Riscrittura', result2)}
      </CardContent>
    </Card>
  );
};

export default AITestRunner;
