#!/usr/bin/env node

import { existsSync, readFileSync } from 'fs';
import seoData from '../src/utils/seoRoutes.data.json' assert { type: 'json' };

const { baseUrl } = seoData;

const verifySitemaps = () => {
  console.log('🔍 Verifying sitemap files...\n');
  
  const files = [
    { path: 'public/sitemap.xml', name: 'Sitemap Index' },
    { path: 'public/sitemap-main.xml', name: 'Main Sitemap' },
    { path: 'public/sitemap-blog.xml', name: 'Blog Sitemap' },
    { path: 'public/robots.txt', name: 'Robots.txt' }
  ];
  
  let allValid = true;
  
  files.forEach(file => {
    if (!existsSync(file.path)) {
      console.log(`❌ ${file.name}: File not found at ${file.path}`);
      allValid = false;
      return;
    }
    
    try {
      const content = readFileSync(file.path, 'utf8');
      
      if (content.length === 0) {
        console.log(`❌ ${file.name}: File is empty`);
        allValid = false;
        return;
      }
      
      // Verify content format
      if (file.path.includes('.xml')) {
        if (!content.includes('<?xml') || !content.includes('xmlns')) {
          console.log(`❌ ${file.name}: Invalid XML format`);
          allValid = false;
          return;
        }
        
        // Count URLs in sitemaps
        const urlCount = (content.match(/<url>/g) || []).length;
        const sitemapCount = (content.match(/<sitemap>/g) || []).length;
        
        if (file.path.includes('sitemap.xml')) {
          console.log(`✅ ${file.name}: Valid (${sitemapCount} sitemaps referenced)`);
        } else {
          console.log(`✅ ${file.name}: Valid (${urlCount} URLs)`);
        }
      } else if (file.path.includes('robots.txt')) {
        if (!content.includes('Sitemap:')) {
          console.log(`⚠️ ${file.name}: No sitemap references found`);
        } else {
          const sitemapRefs = content.match(/Sitemap: .*/g)?.length || 0;
          console.log(`✅ ${file.name}: Valid (${sitemapRefs} sitemap references)`);
        }
      }
    } catch (error) {
      console.log(`❌ ${file.name}: Error reading file - ${error.message}`);
      allValid = false;
    }
  });
  
  console.log('\n📊 Verification Summary:');
  console.log(`Status: ${allValid ? '✅ All files valid' : '❌ Issues found'}`);
  console.log(`Base URL: ${baseUrl}`);
  
  if (allValid) {
    console.log('\n🎯 Next steps for Search Console:');
    console.log('1. Submit sitemap index URL:');
    console.log(`   ${baseUrl}/sitemap.xml`);
    console.log('2. Individual sitemaps (optional):');
    console.log(`   ${baseUrl}/sitemap-main.xml`);
    console.log(`   ${baseUrl}/sitemap-blog.xml`);
    console.log('3. Monitor indexing status in Coverage report');
  }
  
  return allValid;
};

const isValid = verifySitemaps();
process.exit(isValid ? 0 : 1);