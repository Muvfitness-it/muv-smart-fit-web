#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const distDir = 'dist';
const seoReport = {
  errors: [],
  warnings: [],
  info: [],
  urlsAnalyzed: 0
};

const analyzeHTMLFile = (filePath, relativeUrl) => {
  try {
    const content = readFileSync(filePath, 'utf-8');
    
    // Check for title
    const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
      seoReport.errors.push(`Missing or empty title: ${relativeUrl}`);
    } else if (titleMatch[1].length > 60) {
      seoReport.warnings.push(`Title too long (${titleMatch[1].length} chars): ${relativeUrl}`);
    }
    
    // Check for meta description
    const descMatch = content.match(/<meta\s+name=["\']description["\']\s+content=["\']([^"\']*)["\'][^>]*>/i);
    if (!descMatch || !descMatch[1].trim()) {
      seoReport.errors.push(`Missing or empty meta description: ${relativeUrl}`);
    } else if (descMatch[1].length > 160) {
      seoReport.warnings.push(`Meta description too long (${descMatch[1].length} chars): ${relativeUrl}`);
    }
    
    // Check for canonical URL
    const canonicalMatch = content.match(/<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']*)["\'][^>]*>/i);
    if (!canonicalMatch) {
      seoReport.errors.push(`Missing canonical URL: ${relativeUrl}`);
    }
    
    // Check for robots meta
    const robotsMatch = content.match(/<meta\s+name=["\']robots["\']\s+content=["\']([^"\']*)["\'][^>]*>/i);
    if (!robotsMatch) {
      seoReport.warnings.push(`Missing robots meta tag: ${relativeUrl}`);
    }
    
    // Check for Open Graph
    const ogTitleMatch = content.match(/<meta\s+property=["\']og:title["\']\s+content=["\']([^"\']*)["\'][^>]*>/i);
    const ogDescMatch = content.match(/<meta\s+property=["\']og:description["\']\s+content=["\']([^"\']*)["\'][^>]*>/i);
    const ogImageMatch = content.match(/<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']*)["\'][^>]*>/i);
    
    if (!ogTitleMatch) seoReport.warnings.push(`Missing og:title: ${relativeUrl}`);
    if (!ogDescMatch) seoReport.warnings.push(`Missing og:description: ${relativeUrl}`);
    if (!ogImageMatch) seoReport.warnings.push(`Missing og:image: ${relativeUrl}`);
    
    // Check for H1 tags
    const h1Matches = content.match(/<h1[^>]*>/gi);
    if (!h1Matches) {
      seoReport.warnings.push(`No H1 tag found: ${relativeUrl}`);
    } else if (h1Matches.length > 1) {
      seoReport.warnings.push(`Multiple H1 tags (${h1Matches.length}): ${relativeUrl}`);
    }
    
    // Check for structured data
    const structuredDataMatch = content.match(/<script\s+type=["\']application\/ld\+json["\'][^>]*>/i);
    if (!structuredDataMatch) {
      seoReport.info.push(`No structured data found: ${relativeUrl}`);
    }
    
    // Check for default SEO placeholder (should be replaced by SSG)
    if (content.includes('<!-- Default SEO - Will be replaced by SSG -->')) {
      seoReport.errors.push(`Still contains default SEO placeholder (SSG didn't run): ${relativeUrl}`);
    }
    
    seoReport.urlsAnalyzed++;
    
  } catch (error) {
    seoReport.errors.push(`Error analyzing ${relativeUrl}: ${error.message}`);
  }
};

const scanDirectory = (dir, baseDir = dir) => {
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath, baseDir);
    } else if (extname(item) === '.html' || item === 'index.html') {
      const relativeUrl = fullPath
        .replace(baseDir, '')
        .replace(/\\/g, '/')
        .replace(/\/index\.html$/, '/')
        .replace(/\.html$/, '');
      
      analyzeHTMLFile(fullPath, relativeUrl || '/');
    }
  }
};

// Check if dist directory exists
try {
  statSync(distDir);
} catch (error) {
  console.error('❌ Dist directory not found. Run build first.');
  process.exit(1);
}

console.log('🔍 Starting SEO analysis...\n');

scanDirectory(distDir);

// Report results
console.log(`📊 SEO Analysis Results (${seoReport.urlsAnalyzed} URLs analyzed)\n`);

if (seoReport.errors.length > 0) {
  console.log('❌ ERRORS:');
  seoReport.errors.forEach(error => console.log(`   ${error}`));
  console.log('');
}

if (seoReport.warnings.length > 0) {
  console.log('⚠️  WARNINGS:');
  seoReport.warnings.forEach(warning => console.log(`   ${warning}`));
  console.log('');
}

if (seoReport.info.length > 0) {
  console.log('ℹ️  INFO:');
  seoReport.info.forEach(info => console.log(`   ${info}`));
  console.log('');
}

// Summary
const totalIssues = seoReport.errors.length + seoReport.warnings.length;
if (totalIssues === 0) {
  console.log('✅ No SEO issues found!');
  process.exit(0);
} else {
  console.log(`🔥 Found ${seoReport.errors.length} errors and ${seoReport.warnings.length} warnings`);
  if (seoReport.errors.length > 0) {
    console.log('❌ Build failed due to SEO errors');
    process.exit(1);
  }
  process.exit(0);
}