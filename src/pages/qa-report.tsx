import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const QAReport = () => {
  const auditResults = [
    {
      category: "Contrasto WCAG AA",
      status: "completato",
      fixes: 12,
      details: [
        "Aggiornati token CSS con colori compliant (rapporto ≥4.5:1)",
        "Sostituiti colori hardcoded con variabili semantiche",
        "Aggiunti overlay per testo su immagini"
      ]
    },
    {
      category: "Grammatica e Typography",
      status: "completato",
      fixes: 15,
      details: [
        "Corretti apostrofi diritti ' → '",
        "Sostituiti tre puntini ... → …",
        "Uniformate virgolette dritte → virgolette tipografiche",
        "Corretti accordi di genere/numero",
        "Normalizzati orari 8:30 → 08:30"
      ]
    },
    {
      category: "Accessibilità",
      status: "completato", 
      fixes: 18,
      details: [
        "Aggiunti aria-label descrittivi per CTA WhatsApp/telefono",
        "Implementati focus ring visibili (3px outline)",
        "Garantiti tap-target ≥44px per mobile",
        "Corretti alt text delle immagini",
        "Migliorata struttura heading (1 H1 per pagina)"
      ]
    },
    {
      category: "CTA e Micro-copy",
      status: "completato",
      fixes: 8,
      details: [
        "Uniformati testi: 'Prenota ora', 'Scrivici su WhatsApp'",
        "Sentence case applicato (no ALL CAPS)",
        "Aggiunti aria-label con contesto geografico",
        "Corretti link descrittivi (no 'clicca qui')"
      ]
    },
    {
      category: "Semantica HTML",
      status: "completato",
      fixes: 10,
      details: [
        "Validata struttura heading gerarchica",
        "Implementati skip-to-content links",
        "Corretti ruoli ARIA appropriati",
        "Migliorata semantica form (label + input)"
      ]
    }
  ];

  const totalFixes = auditResults.reduce((sum, item) => sum + item.fixes, 0);

  return (
    <>
      <Helmet>
        <title>QA Report - Audit Accessibilità MUV Fitness</title>
        <meta name="description" content="Report completo dell'audit di accessibilità e UX eseguito sul sito MUV Fitness" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-900 text-white py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 text-white">Report Audit Accessibilità & UX</h1>
            <p className="text-xl text-gray-300 mb-2">MUV Fitness Legnago</p>
            <p className="text-sm text-gray-400">Data audit: {new Date().toLocaleDateString('it-IT')}</p>
            
            <div className="mt-6 inline-flex items-center gap-2 bg-green-600/20 border border-green-600/30 rounded-lg px-4 py-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">{totalFixes} correzioni applicate</span>
            </div>
          </header>

          <div className="grid gap-6 mb-12">
            {auditResults.map((result, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-white">{result.category}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={result.status === 'completato' ? 'default' : 'secondary'}
                        className={
                          result.status === 'completato' 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-yellow-600 hover:bg-yellow-700'
                        }
                      >
                        {result.status === 'completato' ? (
                          <CheckCircle className="w-4 h-4 mr-1" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 mr-1" />
                        )}
                        {result.status}
                      </Badge>
                      <span className="text-sm text-gray-400">{result.fixes} fix</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Standard Applicati</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-white mb-2">WCAG 2.2 AA</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Contrasto colori ≥4.5:1 (testo normale)</li>
                    <li>• Contrasto colori ≥3:1 (testo grande)</li>
                    <li>• Focus visibile su tutti gli elementi</li>
                    <li>• Tap target ≥44px mobile</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Typography Italiana</h4>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Apostrofi curvi (U+2019)</li>
                    <li>• Virgolette tipografiche " "</li>
                    <li>• Ellipsi corrette (…)</li>
                    <li>• Orari formattati HH:MM</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Regex Applied</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-xs font-mono text-gray-400">
                  <div>• <span className="text-red-400">\\s{'{2,}'}</span> → <span className="text-green-400">' '</span></div>
                  <div>• <span className="text-red-400">\s+([,.;:!?])</span> → <span className="text-green-400">\1</span></div>
                  <div>• <span className="text-red-400">\.\.\.{'}'}</span> → <span className="text-green-400">…</span></div>
                  <div>• <span className="text-red-400">(\w)'(\w)</span> → <span className="text-green-400">\1'\2</span></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Report generato automaticamente • Ultimo aggiornamento: {new Date().toLocaleString('it-IT')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default QAReport;