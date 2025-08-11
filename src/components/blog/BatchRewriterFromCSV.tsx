import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';

interface BatchResult {
  title: string;
  ok: boolean;
  slug?: string;
  error?: string;
}

const parseCsvTitles = (csv: string): string[] => {
  const lines = csv.split(/\r?\n/).slice(1).filter(Boolean);
  const titles: string[] = [];
  for (const line of lines) {
    const m = line.match(/^"(.+)",\s*".*",\s*".*"$/);
    if (m && m[1]) titles.push(m[1]);
  }
  return titles;
};

const BatchRewriterFromCSV: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<BatchResult[]>([]);

  const runBatch = async () => {
    setRunning(true);
    setResults([]);
    setProgress(0);
    try {
      const res = await fetch('/backup/muv-blog-titoli.csv');
      const text = await res.text();
      const titles = parseCsvTitles(text);
      let done = 0;
      for (const title of titles) {
        try {
          const { data, error } = await supabase.functions.invoke('ai-article-writer', {
            body: { title, action: 'rewrite_from_title' }
          });
          if (error) throw error as any;
          setResults((r) => [...r, { title, ok: data?.success, slug: data?.post?.slug, error: data?.error }]);
        } catch (e: any) {
          setResults((r) => [...r, { title, ok: false, error: e?.message || 'Errore sconosciuto' }]);
        }
        done += 1;
        setProgress(Math.round((done / titles.length) * 100));
        // Piccolo delay per evitare rate limit
        await new Promise((res) => setTimeout(res, 500));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRunning(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riscrittura Batch da CSV</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">Usa /public/backup/muv-blog-titoli.csv come fonte dei titoli.</p>
        <Button onClick={runBatch} disabled={running}>
          {running ? 'In corso…' : 'Avvia Batch Riscrittura'}
        </Button>
        <div className="mt-2">
          <Progress value={progress} />
        </div>
        {results.length > 0 && (
          <ul className="list-disc pl-5 text-sm">
            {results.map((r, i) => (
              <li key={i} className={r.ok ? 'text-green-500' : 'text-red-500'}>
                {r.ok ? 'OK' : 'KO'} — {r.title} {r.slug ? `→ /blog/${r.slug}` : ''} {r.error ? `(${r.error})` : ''}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default BatchRewriterFromCSV;
