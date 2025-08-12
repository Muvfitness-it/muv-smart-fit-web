import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface OptimizerReport {
  ok: boolean;
  cleanup?: any;
  linker?: any;
  jsonld?: any;
  images?: any;
  sitemaps?: any;
  timestamp?: string;
  error?: string;
}

const AdminSEOReport: React.FC = () => {
  const [report, setReport] = useState<OptimizerReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Add noindex for this admin page
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke('site-optimizer', { body: {} });
        if (error) throw error;
        setReport(data as OptimizerReport);
      } catch (e: any) {
        setError(e?.message || 'Errore durante l\'esecuzione dell\'ottimizzatore.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-[60vh] container mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">SEO Autopilot • Report</h1>
      {loading && <p>Analisi in corso…</p>}
      {error && <p className="text-red-400">{error}</p>}
      {report && (
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-medium mb-2">Stato generale</h2>
            <pre className="bg-black/30 p-4 rounded-md overflow-auto text-sm">{JSON.stringify({ ok: report.ok, timestamp: report.timestamp }, null, 2)}</pre>
          </section>
          <section>
            <h2 className="text-xl font-medium mb-2">Pulizia contenuti</h2>
            <pre className="bg-black/30 p-4 rounded-md overflow-auto text-sm">{JSON.stringify(report.cleanup, null, 2)}</pre>
          </section>
          <section>
            <h2 className="text-xl font-medium mb-2">Internal linking</h2>
            <pre className="bg-black/30 p-4 rounded-md overflow-auto text-sm">{JSON.stringify(report.linker, null, 2)}</pre>
          </section>
          <section>
            <h2 className="text-xl font-medium mb-2">JSON-LD</h2>
            <pre className="bg-black/30 p-4 rounded-md overflow-auto text-sm">{JSON.stringify(report.jsonld, null, 2)}</pre>
          </section>
          <section>
            <h2 className="text-xl font-medium mb-2">Ottimizzazione immagini</h2>
            <pre className="bg-black/30 p-4 rounded-md overflow-auto text-sm">{JSON.stringify(report.images, null, 2)}</pre>
          </section>
          <section>
            <h2 className="text-xl font-medium mb-2">Sitemaps</h2>
            <pre className="bg-black/30 p-4 rounded-md overflow-auto text-sm">{JSON.stringify(report.sitemaps, null, 2)}</pre>
          </section>
        </div>
      )}
    </div>
  );
};

export default AdminSEOReport;
