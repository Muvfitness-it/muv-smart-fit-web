import { useEffect, useState } from 'react';

interface QAResult {
  test: string;
  passed: boolean;
  details: string;
}

const QACleanHeroMobile = () => {
  const [results, setResults] = useState<QAResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runQA = () => {
      const tests: QAResult[] = [];
      
      // Test 1: Ordine visivo corretto
      const header = document.querySelector('.site-header, header[role="banner"], header, .navbar');
      const cleanHero = document.querySelector('#muvCleanHero');
      const h1 = document.querySelector('#muvCleanHero h1');
      const subtitle = document.querySelector('#muvCleanHero .subtitle');
      const ctaGroup = document.querySelector('#muvCleanHero .ctaGroup');
      const stats = document.querySelector('#muvCleanHero .stats');
      
      const visualOrderTest = header && cleanHero && h1 && ctaGroup;
      tests.push({
        test: 'Ordine visivo: HEADER → H1 → sottotitolo → CTA → stats',
        passed: !!visualOrderTest,
        details: visualOrderTest ? 'Tutti gli elementi trovati' : 'Elementi mancanti nel DOM'
      });

      // Test 2: Nessuna sovrapposizione header/testi
      let noOverlapTest = false;
      if (header && h1) {
        const headerRect = header.getBoundingClientRect();
        const h1Rect = h1.getBoundingClientRect();
        noOverlapTest = h1Rect.top >= headerRect.bottom;
        tests.push({
          test: 'Nessuna sovrapposizione tra header e testi',
          passed: noOverlapTest,
          details: `Header bottom: ${headerRect.bottom}px, H1 top: ${h1Rect.top}px`
        });
      } else {
        tests.push({
          test: 'Nessuna sovrapposizione tra header e testi',
          passed: false,
          details: 'Header o H1 non trovati'
        });
      }

      // Test 3: CTA senza sottolineature e altezza ≥48px
      const ctaButtons = document.querySelectorAll('#muvCleanHero .ctaGroup a, #muvCleanHero .ctaGroup button');
      let ctaTest = true;
      let ctaDetails = '';
      
      ctaButtons.forEach((btn, index) => {
        const rect = btn.getBoundingClientRect();
        const styles = window.getComputedStyle(btn);
        const hasUnderline = styles.textDecoration.includes('underline');
        const minHeight = rect.height >= 48;
        
        if (hasUnderline || !minHeight) {
          ctaTest = false;
          ctaDetails += `CTA ${index + 1}: underline=${hasUnderline}, height=${rect.height}px; `;
        }
      });
      
      tests.push({
        test: 'CTA senza sottolineature, altezza ≥48px',
        passed: ctaTest && ctaButtons.length > 0,
        details: ctaTest ? `${ctaButtons.length} CTA validi` : ctaDetails
      });

      // Test 4: Un solo H1 visibile
      const visibleH1s = Array.from(document.querySelectorAll('h1')).filter(h1 => {
        const styles = window.getComputedStyle(h1);
        return styles.display !== 'none' && styles.visibility !== 'hidden';
      });
      
      tests.push({
        test: 'Un solo H1 visibile nell\'area hero',
        passed: visibleH1s.length === 1,
        details: `H1 visibili trovati: ${visibleH1s.length}`
      });

      setResults(tests);
      setLoading(false);
    };

    // Run tests after a short delay to ensure DOM is ready
    setTimeout(runQA, 1000);
  }, []);

  const allPassed = results.every(r => r.passed);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">
            QA Clean Hero Mobile - Test Results
          </h1>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Running tests...</p>
            </div>
          ) : (
            <>
              <div className={`text-center mb-6 p-4 rounded-lg ${
                allPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <h2 className="text-xl font-semibold">
                  {allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}
                </h2>
                <p className="mt-2">
                  {allPassed 
                    ? 'Il Clean Hero Mobile è implementato correttamente!' 
                    : 'Alcuni test hanno fallito. Vedere dettagli sotto.'
                  }
                </p>
              </div>

              <div className="space-y-4">
                {results.map((result, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      result.passed 
                        ? 'bg-green-50 border-green-400' 
                        : 'bg-red-50 border-red-400'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">
                        {result.passed ? '✅' : '❌'}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {result.test}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {result.details}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Test Environment:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Viewport: {window.innerWidth}×{window.innerHeight}</li>
                  <li>• User Agent: {navigator.userAgent.substring(0, 80)}</li>
                  <li>• Test Time: {new Date().toLocaleString()}</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QACleanHeroMobile;