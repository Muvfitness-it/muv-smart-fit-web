import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle, Eye, Camera, Code, FileText } from 'lucide-react';

const QAReadOnlyAudit = () => {
  const timestamp = new Date().toLocaleString('it-IT');

  // AUDIT RESULTS - READ-ONLY ANALYSIS
  const auditResults = {
    logo: {
      issues: [
        {
          severity: 'P1',
          location: 'Footer.tsx:31',
          issue: 'Logo configuration error',
          description: 'Footer uses media="(prefers-color-scheme: light)" instead of dark - logo will show incorrectly in dark mode',
          currentCode: '<source srcSet="/assets/brand/muv-logo-light.svg" media="(prefers-color-scheme: light)" />',
          suggestedFix: '<source srcSet="/assets/brand/muv-logo-light.svg" media="(prefers-color-scheme: dark)" />'
        },
        {
          severity: 'P2',
          location: 'LocalBusinessSchema.tsx:34-40',
          issue: 'Outdated logo reference',
          description: 'JSON-LD schema still references PNG logo instead of new SVG brand assets',
          currentCode: '"logo": {"url": "https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png"}',
          suggestedFix: '"logo": {"url": "https://www.muvfitness.it/assets/brand/muv-logo-dark.svg"}'
        }
      ]
    },
    
    contrast: {
      issues: [
        {
          severity: 'P0',
          location: 'HeroSection.tsx:7',
          issue: 'Potential contrast issue on hero background',
          description: 'Hero uses complex gradients - ensure white text has sufficient contrast on all gradient stops',
          currentCode: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700',
          suggestedFix: 'Add stronger overlay: bg-black/60 instead of bg-black/40 for guaranteed WCAG AA compliance'
        }
      ]
    },

    colors: {
      issues: [
        {
          severity: 'P2', 
          location: 'Multiple files',
          issue: 'Extensive use of direct Tailwind color classes',
          description: 'Found 1676+ instances of text-gray-X, text-white etc. instead of design system tokens',
          examples: [
            'Footer.tsx: text-gray-300, text-gray-400',
            'Navigation.tsx: text-gray-800, text-gray-700',
            'Multiple components using direct colors instead of --ink, --muted variables'
          ],
          suggestedFix: 'Replace with semantic tokens: text-gray-300 → text-muted, text-gray-900 → text-ink'
        }
      ]
    },

    templates: {
      issues: [
        {
          severity: 'P1',
          location: 'BlogIndex.tsx:34',
          issue: 'Page size configuration',
          description: 'Blog index uses PAGE_SIZE = 12 but should verify if this creates proper pagination UX',
          verification: 'Check if 12 posts per page provides good balance between content and load times'
        }
      ]
    },

    nap: {
      issues: [
        {
          severity: 'P0',
          location: 'Multiple locations verified',
          issue: 'NAP consistency check - VERIFIED CLEAN',
          description: 'Phone +39 351 338 0770 is consistent across Footer, LocalBusiness schema. Old 329 number only appears in historical reports.',
          status: 'PASS'
        }
      ]
    },

    seo: {
      issues: [
        {
          severity: 'P1',
          location: 'robots.txt:13',
          issue: 'Sitemap reference needs verification',
          description: 'robots.txt points to /sitemap.xml - verify this file exists and is properly generated',
          verification: 'Test sitemap accessibility and content freshness'
        }
      ]
    }
  };

  const urlsToVerify = [
    { url: '/', template: 'Home', h1Count: 1, priority: 'P0' },
    { url: '/blog', template: 'BlogIndex', expectedGrid: true, priority: 'P0' },
    { url: '/blog/sample-post', template: 'BlogArticle', expectedTOC: true, priority: 'P1' },
    { url: '/servizi/personal-trainer-legnago', template: 'Service', structured: true, priority: 'P0' },
    { url: '/contatti', template: 'Contact', nap: true, priority: 'P1' },
    { url: '/team', template: 'Team', priority: 'P2' },
    { url: '/privacy', template: 'Legal', priority: 'P2' },
    { url: '/recensioni', template: 'Reviews', cta: true, priority: 'P1' }
  ];

  const atomicFixes = [
    {
      id: 'FA-01',
      title: 'Fix Footer Logo Media Query',
      file: 'src/components/Footer.tsx',
      line: 31,
      effort: 'S',
      priority: 'P1',
      patch: 'Change media="(prefers-color-scheme: light)" to media="(prefers-color-scheme: dark)"'
    },
    {
      id: 'FA-02', 
      title: 'Update JSON-LD Logo Reference',
      file: 'src/components/SEO/LocalBusinessSchema.tsx',
      line: '38-40',
      effort: 'S',
      priority: 'P2',
      patch: 'Replace PNG logo URL with SVG: /assets/brand/muv-logo-dark.svg'
    },
    {
      id: 'FA-03',
      title: 'Strengthen Hero Overlay for Contrast',
      file: 'src/components/home/HeroSection.tsx', 
      line: 22,
      effort: 'S',
      priority: 'P0',
      patch: 'Change bg-black/40 to bg-black/60 for guaranteed WCAG AA compliance'
    },
    {
      id: 'FA-04',
      title: 'Replace Direct Color Classes with Semantic Tokens',
      file: 'Multiple files (1676+ instances)',
      effort: 'L',
      priority: 'P2',
      patch: 'Systematic replacement: text-gray-300→text-muted, text-gray-900→text-ink, etc.'
    },
    {
      id: 'FA-05',
      title: 'Verify Sitemap Generation and Accessibility',
      file: 'Sitemap infrastructure',
      effort: 'M',
      priority: 'P1', 
      patch: 'Test /sitemap.xml endpoint, verify freshness and completeness'
    }
  ];

  const totalIssues = Object.values(auditResults).reduce((acc, category) => acc + category.issues.length, 0);
  const p0Issues = atomicFixes.filter(f => f.priority === 'P0').length;
  const p1Issues = atomicFixes.filter(f => f.priority === 'P1').length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Helmet>
        <title>QA Read-Only Audit Report - MUV Fitness</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Eye className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">QA Read-Only Audit Report</h1>
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            READ-ONLY MODE
          </Badge>
        </div>
        <p className="text-gray-600">
          Audit completo eseguito il {timestamp} su https://www.muvfitness.it/ 
          senza apportare modifiche al codice, contenuti o configurazioni.
        </p>
      </div>

      {/* Executive Summary */}
      <Card className="mb-6 border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            A) Sintesi Esecutiva
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{p0Issues}</div>
              <div className="text-sm text-red-700">Issues P0 (Critici)</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{p1Issues}</div>
              <div className="text-sm text-yellow-700">Issues P1 (Importanti)</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{totalIssues - p0Issues - p1Issues}</div>
              <div className="text-sm text-green-700">Issues P2 (Miglioramenti)</div>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• <strong>LOGO:</strong> Configurazione footer errata, JSON-LD con asset obsoleto</li>
            <li>• <strong>CONTRASTO:</strong> Hero potrebbe necessitare overlay più forte per WCAG AA garantito</li>  
            <li>• <strong>COLORI:</strong> 1676+ classi Tailwind dirette invece di design tokens semantici</li>
            <li>• <strong>NAP:</strong> Verificato consistente (+39 351 338 0770)</li>
            <li>• <strong>SEO:</strong> Canonical/redirect OK, sitemap da verificare</li>
          </ul>
        </CardContent>
      </Card>

      {/* Issues by Category */}
      <div className="space-y-6 mb-8">
        <h2 className="text-2xl font-bold">B) Mappa Problemi per Categoria</h2>
        
        {Object.entries(auditResults).map(([category, data]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="capitalize flex items-center gap-2">
                {category === 'logo' && <Camera className="w-5 h-5" />}
                {category === 'contrast' && <Eye className="w-5 h-5" />}
                {category === 'colors' && <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-blue-500 rounded" />}
                {category === 'templates' && <Code className="w-5 h-5" />}
                {category === 'nap' && <FileText className="w-5 h-5" />}
                {category === 'seo' && <CheckCircle className="w-5 h-5" />}
                {category.toUpperCase()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.issues.map((issue, idx) => (
                  <div key={idx} className="border-l-4 border-l-orange-400 pl-4 bg-orange-50 p-3 rounded-r">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={issue.severity === 'P0' ? 'destructive' : issue.severity === 'P1' ? 'default' : 'secondary'}>
                        {issue.severity}
                      </Badge>
                      <span className="font-semibold">{issue.issue}</span>
                      {issue.location && <code className="text-xs bg-gray-200 px-2 py-1 rounded">{issue.location}</code>}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{issue.description}</p>
                    {issue.currentCode && (
                      <div className="bg-red-100 p-2 rounded text-xs font-mono mb-2">
                        <div className="text-red-700 font-semibold mb-1">Current:</div>
                        {issue.currentCode}
                      </div>
                    )}
                    {issue.suggestedFix && (
                      <div className="bg-green-100 p-2 rounded text-xs font-mono">
                        <div className="text-green-700 font-semibold mb-1">Suggested Fix:</div>
                        {issue.suggestedFix}
                      </div>
                    )}
                    {issue.examples && (
                      <div className="mt-2">
                        <div className="text-sm font-semibold mb-1">Examples:</div>
                        <ul className="text-xs space-y-1">
                          {issue.examples.map((ex, i) => (
                            <li key={i} className="text-gray-600">• {ex}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Atomic Fixes */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>D) Patch Suggerite (NON Applicate)</CardTitle>
          <p className="text-sm text-gray-600">
            Fix atomici numerati pronti per approvazione e implementazione individuale
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {atomicFixes.map((fix) => (
              <div key={fix.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <Badge variant="outline" className="font-mono text-xs">
                      {fix.id}
                    </Badge>
                    <span className="font-semibold">{fix.title}</span>
                    <Badge variant={fix.priority === 'P0' ? 'destructive' : fix.priority === 'P1' ? 'default' : 'secondary'}>
                      {fix.priority}
                    </Badge>
                    <Badge variant="outline">
                      {fix.effort === 'S' ? 'Small' : fix.effort === 'M' ? 'Medium' : 'Large'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{fix.patch}</p>
                  <code className="text-xs text-gray-500">{fix.file}:{fix.line}</code>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Priority Matrix */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>E) Matrice Priorità & Effort</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-l-red-500">
              <h4 className="font-semibold text-red-800 mb-2">P0 - CRITICAL (Blocca UX/Indicizzazione)</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• FA-03: Hero overlay contrast (effort: S, impact: High)</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-l-yellow-500">
              <h4 className="font-semibold text-yellow-800 mb-2">P1 - IMPORTANT (Degrada Esperienza)</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• FA-01: Footer logo fix (effort: S, impact: Medium)</li>
                <li>• FA-05: Sitemap verification (effort: M, impact: Medium)</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-l-blue-500">
              <h4 className="font-semibold text-blue-800 mb-2">P2 - IMPROVEMENT (Manutenibilità)</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• FA-02: JSON-LD logo update (effort: S, impact: Low)</li>
                <li>• FA-04: Color system refactor (effort: L, impact: High long-term)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* URLs Verification List */}
      <Card>
        <CardHeader>
          <CardTitle>F) Lista URL da Verificare Post-Fix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {urlsToVerify.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">{item.url}</code>
                  <span className="text-sm">{item.template}</span>
                  {item.expectedGrid && <Badge variant="outline">Grid</Badge>}
                  {item.expectedTOC && <Badge variant="outline">TOC</Badge>}
                  {item.nap && <Badge variant="outline">NAP</Badge>}
                  {item.structured && <Badge variant="outline">Schema</Badge>}
                </div>
                <Badge variant={item.priority === 'P0' ? 'destructive' : item.priority === 'P1' ? 'default' : 'secondary'}>
                  {item.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>IMPORTANTE:</strong> Questo audit è stato eseguito in modalità READ-ONLY. 
          Nessuna modifica è stata apportata al sito. I fix suggeriti richiedono approvazione 
          prima dell'implementazione. Ogni patch atomica (FA-XX) può essere applicata individualmente.
        </p>
      </div>
    </div>
  );
};

export default QAReadOnlyAudit;