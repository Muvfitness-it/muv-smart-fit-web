#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { glob } from 'glob';
import * as cheerio from 'cheerio';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// SEO audit configuration
const DOMAIN = 'https://www.muvfitness.it';
const REQUIRED_PAGES = [
  '/',
  '/chi-siamo',
  '/contatti', 
  '/servizi',
  '/servizi/ems',
  '/servizi/pilates',
  '/servizi/hiit',
  '/servizi/nutrizione',
  '/servizi/massoterapia',
  '/servizi/psicologo',
  '/servizi/small-group',
  '/team',
  '/trasformazione-30-giorni',
  '/risultati',
  '/privacy',
  '/cookie-policy'
];

class SEOAuditor {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.results = [];
  }

  async auditPage(filePath, urlPath) {
    if (!existsSync(filePath)) {
      this.errors.push(`Missing file: ${filePath} for URL ${urlPath}`);
      return null;
    }

    const html = readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html);
    
    const result = {
      url: urlPath,
      file: filePath,
      title: $('title').text() || '',
      description: $('meta[name="description"]').attr('content') || '',
      canonical: $('link[rel="canonical"]').attr('href') || '',
      robots: $('meta[name="robots"]').attr('content') || '',
      ogTitle: $('meta[property="og:title"]').attr('content') || '',
      ogDescription: $('meta[property="og:description"]').attr('content') || '',
      ogImage: $('meta[property="og:image"]').attr('content') || '',
      structuredData: $('script[type="application/ld+json"]').length,
      internalLinks: $('a[href^="/"], a[href*="muvfitness.it"]').length,
      errors: [],
      warnings: []
    };

    // Critical errors that block indexing
    if (!result.title) {
      result.errors.push('Missing title tag');
    } else if (result.title.length > 65) {
      result.warnings.push(`Title too long: ${result.title.length} chars`);
    } else if (result.title.length < 30) {
      result.warnings.push(`Title too short: ${result.title.length} chars`);
    }

    if (!result.description) {
      result.errors.push('Missing meta description');
    } else if (result.description.length > 160) {
      result.warnings.push(`Description too long: ${result.description.length} chars`);
    } else if (result.description.length < 120) {
      result.warnings.push(`Description too short: ${result.description.length} chars`);
    }

    if (!result.canonical) {
      result.errors.push('Missing canonical URL');
    } else {
      // Check if canonical is self-referential and uses correct domain
      const expectedCanonical = `${DOMAIN}${urlPath === '/' ? '' : urlPath}`;
      if (result.canonical !== expectedCanonical) {
        result.errors.push(`Wrong canonical: got "${result.canonical}", expected "${expectedCanonical}"`);
      }
    }

    if (!result.robots.includes('index')) {
      result.warnings.push('Page may not be indexed (robots meta)');
    }

    if (!result.ogTitle || !result.ogDescription || !result.ogImage) {
      result.warnings.push('Incomplete Open Graph tags');
    }

    if (result.structuredData === 0) {
      result.warnings.push('Missing structured data');
    }

    if (result.internalLinks < 3) {
      result.warnings.push(`Too few internal links: ${result.internalLinks}`);
    }

    // Check for duplicate content indicators
    if (result.title.includes('Default') || result.description.includes('Default')) {
      result.errors.push('Contains default/placeholder content');
    }

    this.results.push(result);
    return result;
  }

  async scanBuildDirectory() {
    console.log('🔍 Starting SEO audit of build directory...\n');
    
    // Check if dist directory exists
    if (!existsSync('dist')) {
      this.errors.push('Build directory (dist/) not found. Run npm run build first.');
      return;
    }

    // Audit required pages
    for (const urlPath of REQUIRED_PAGES) {
      const filePath = urlPath === '/' 
        ? 'dist/index.html' 
        : `dist${urlPath}/index.html`;
      
      await this.auditPage(filePath, urlPath);
    }

    // Find additional HTML files
    const htmlFiles = glob.sync('dist/**/*.html', { ignore: 'dist/index.html' });
    for (const file of htmlFiles) {
      const urlPath = file
        .replace('dist', '')
        .replace('/index.html', '')
        .replace('.html', '') || '/';
      
      if (!REQUIRED_PAGES.includes(urlPath)) {
        await this.auditPage(file, urlPath);
      }
    }
  }

  checkDuplicates() {
    const titles = {};
    const descriptions = {};
    
    this.results.forEach(result => {
      if (result.title) {
        titles[result.title] = (titles[result.title] || []);
        titles[result.title].push(result.url);
      }
      
      if (result.description) {
        descriptions[result.description] = (descriptions[result.description] || []);
        descriptions[result.description].push(result.url);
      }
    });

    // Find duplicates
    Object.entries(titles).forEach(([title, urls]) => {
      if (urls.length > 1) {
        this.errors.push(`Duplicate title "${title}" on pages: ${urls.join(', ')}`);
      }
    });

    Object.entries(descriptions).forEach(([description, urls]) => {
      if (urls.length > 1) {
        this.errors.push(`Duplicate description on pages: ${urls.join(', ')}`);
      }
    });
  }

  generateReport() {
    const totalPages = this.results.length;
    const pagesWithErrors = this.results.filter(r => r.errors.length > 0).length;
    const pagesWithWarnings = this.results.filter(r => r.warnings.length > 0).length;
    const totalErrors = this.results.reduce((sum, r) => sum + r.errors.length, 0) + this.errors.length;
    const totalWarnings = this.results.reduce((sum, r) => sum + r.warnings.length, 0) + this.warnings.length;
    
    const status = totalErrors === 0 ? 'PASS' : 'FAIL';
    const score = Math.max(0, 100 - (totalErrors * 10) - (totalWarnings * 2));

    const report = `
SEO AUDIT REPORT - ${new Date().toISOString().slice(0, 19)}
================================================================

SUMMARY
-------
Status: ${status}
Score: ${score}/100
Total Pages: ${totalPages}
Pages with Errors: ${pagesWithErrors}
Pages with Warnings: ${pagesWithWarnings}
Total Errors: ${totalErrors}
Total Warnings: ${totalWarnings}

CRITICAL ERRORS
---------------
${this.errors.length > 0 ? this.errors.map(e => `❌ ${e}`).join('\n') : '✅ No critical errors found'}

PAGE ANALYSIS
-------------
${this.results.map(result => {
  const pageStatus = result.errors.length === 0 ? '✅' : '❌';
  return `${pageStatus} ${result.url}
   Title: ${result.title} (${result.title.length} chars)
   Description: ${result.description} (${result.description.length} chars)
   Canonical: ${result.canonical}
   Internal Links: ${result.internalLinks}
   Structured Data: ${result.structuredData} schemas
   ${result.errors.length > 0 ? '   Errors: ' + result.errors.join(', ') : ''}
   ${result.warnings.length > 0 ? '   Warnings: ' + result.warnings.join(', ') : ''}
`;
}).join('\n')}

RECOMMENDATIONS
---------------
${this.generateRecommendations()}

BUILD STATUS
------------
${totalErrors === 0 ? '✅ Build can proceed' : '❌ Build should be blocked due to critical errors'}
`;

    return report;
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.errors.length > 0) {
      recommendations.push('🚨 Fix all critical errors immediately - they prevent indexing');
    }
    
    const longTitles = this.results.filter(r => r.title.length > 65).length;
    if (longTitles > 0) {
      recommendations.push(`📏 Shorten ${longTitles} page titles to under 65 characters`);
    }
    
    const shortDescriptions = this.results.filter(r => r.description.length < 120).length;
    if (shortDescriptions > 0) {
      recommendations.push(`📝 Expand ${shortDescriptions} meta descriptions to 120-160 characters`);
    }
    
    const noStructuredData = this.results.filter(r => r.structuredData === 0).length;
    if (noStructuredData > 0) {
      recommendations.push(`🏗️ Add structured data to ${noStructuredData} pages`);
    }
    
    const fewLinks = this.results.filter(r => r.internalLinks < 3).length;
    if (fewLinks > 0) {
      recommendations.push(`🔗 Add more internal links to ${fewLinks} pages`);
    }

    return recommendations.length > 0 ? recommendations.join('\n') : '🎉 Site is well optimized!';
  }

  async run() {
    await this.scanBuildDirectory();
    this.checkDuplicates();
    
    const report = this.generateReport();
    console.log(report);
    
    // Save report
    writeFileSync('seo-audit-report.txt', report);
    console.log('\n📊 Full report saved to: seo-audit-report.txt');
    
    // Exit with error code if critical issues found
    const totalErrors = this.results.reduce((sum, r) => sum + r.errors.length, 0) + this.errors.length;
    if (totalErrors > 0) {
      console.log('\n❌ SEO audit failed. Fix errors before deploying.');
      process.exit(1);
    } else {
      console.log('\n✅ SEO audit passed. Site is ready for deployment.');
      process.exit(0);
    }
  }
}

// Run audit
const auditor = new SEOAuditor();
auditor.run().catch(error => {
  console.error('❌ SEO audit failed:', error);
  process.exit(1);
});