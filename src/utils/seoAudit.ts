// SEO Audit and Quality Control Utilities
export interface PageAuditResult {
  url: string;
  title: string;
  titleLength: number;
  description: string;
  descriptionLength: number;
  hasCanonical: boolean;
  hasMetaRobots: boolean;
  hasOgTags: boolean;
  hasStructuredData: boolean;
  internalLinks: number;
  errors: string[];
  warnings: string[];
  score: number;
}

export const auditPage = (url: string, document: Document): PageAuditResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Title check
  const title = document.title || '';
  const titleLength = title.length;
  if (titleLength === 0) errors.push('Missing title tag');
  else if (titleLength > 60) warnings.push('Title too long (>60 chars)');
  else if (titleLength < 30) warnings.push('Title too short (<30 chars)');
  
  // Description check
  const metaDesc = document.querySelector('meta[name="description"]');
  const description = metaDesc?.getAttribute('content') || '';
  const descriptionLength = description.length;
  if (descriptionLength === 0) errors.push('Missing meta description');
  else if (descriptionLength > 160) warnings.push('Description too long (>160 chars)');
  else if (descriptionLength < 120) warnings.push('Description too short (<120 chars)');
  
  // Canonical check
  const canonical = document.querySelector('link[rel="canonical"]');
  const hasCanonical = !!canonical;
  if (!hasCanonical) errors.push('Missing canonical URL');
  
  // Meta robots check
  const metaRobots = document.querySelector('meta[name="robots"]');
  const hasMetaRobots = !!metaRobots;
  if (!hasMetaRobots) warnings.push('Missing robots meta tag');
  
  // Open Graph check
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  const hasOgTags = !!(ogTitle && ogDesc && ogImage);
  if (!hasOgTags) warnings.push('Incomplete Open Graph tags');
  
  // Structured Data check
  const structuredData = document.querySelector('script[type="application/ld+json"]');
  const hasStructuredData = !!structuredData;
  if (!hasStructuredData) warnings.push('Missing structured data');
  
  // Internal links check
  const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="https://www.muvfitness.it"]').length;
  if (internalLinks < 3) warnings.push('Too few internal links (<3)');
  
  // Calculate score (100 - penalties)
  let score = 100;
  score -= errors.length * 20; // Major penalties for errors
  score -= warnings.length * 5; // Minor penalties for warnings
  score = Math.max(0, score);
  
  return {
    url,
    title,
    titleLength,
    description,
    descriptionLength,
    hasCanonical,
    hasMetaRobots,
    hasOgTags,
    hasStructuredData,
    internalLinks,
    errors,
    warnings,
    score
  };
};

export const generateAuditReport = (results: PageAuditResult[]): string => {
  const totalPages = results.length;
  const avgScore = results.reduce((sum, r) => sum + r.score, 0) / totalPages;
  const errorsCount = results.reduce((sum, r) => sum + r.errors.length, 0);
  const warningsCount = results.reduce((sum, r) => sum + r.warnings.length, 0);
  
  const goNoGo = avgScore >= 85 && errorsCount === 0 ? 'GO' : 'NO-GO';
  
  return `
SEO AUDIT REPORT - ${new Date().toISOString().slice(0, 10)}

SUMMARY:
- Total Pages: ${totalPages}
- Average Score: ${avgScore.toFixed(1)}/100
- Total Errors: ${errorsCount}
- Total Warnings: ${warningsCount}
- Status: ${goNoGo}

TOP ISSUES:
${getTopIssues(results)}

RECOMMENDATIONS:
${getRecommendations(results)}
`;
};

const getTopIssues = (results: PageAuditResult[]): string => {
  const allIssues = results.flatMap(r => [...r.errors, ...r.warnings]);
  const issueCount = allIssues.reduce((acc, issue) => {
    acc[issue] = (acc[issue] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(issueCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([issue, count]) => `- ${issue}: ${count} pages`)
    .join('\n');
};

const getRecommendations = (results: PageAuditResult[]): string => {
  const recommendations: string[] = [];
  
  if (results.some(r => r.errors.length > 0)) {
    recommendations.push('- Fix all critical errors first');
  }
  
  if (results.some(r => r.titleLength > 60)) {
    recommendations.push('- Shorten overly long titles');
  }
  
  if (results.some(r => r.descriptionLength > 160)) {
    recommendations.push('- Optimize meta descriptions length');
  }
  
  if (results.some(r => r.internalLinks < 3)) {
    recommendations.push('- Add more internal links between pages');
  }
  
  if (results.some(r => !r.hasStructuredData)) {
    recommendations.push('- Add structured data markup');
  }
  
  return recommendations.join('\n') || '- Site is well optimized!';
};