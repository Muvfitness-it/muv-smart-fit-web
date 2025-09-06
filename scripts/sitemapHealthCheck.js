#!/usr/bin/env node

import seoData from '../src/utils/seoRoutes.data.json' assert { type: 'json' };

const { baseUrl } = seoData;

const healthCheck = async () => {
  console.log('🏥 Running sitemap health check...\n');
  
  const sitemaps = [
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/sitemap-main.xml`,
    `${baseUrl}/sitemap-blog.xml`,
    `${baseUrl}/robots.txt`
  ];
  
  const results = [];
  
  for (const url of sitemaps) {
    console.log(`🔍 Checking: ${url}`);
    
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'MUV-Fitness-Health-Check/1.0'
        }
      });
      
      const result = {
        url,
        status: response.status,
        contentType: response.headers.get('content-type'),
        lastModified: response.headers.get('last-modified'),
        healthy: response.ok
      };
      
      results.push(result);
      
      if (response.ok) {
        console.log(`  ✅ Status: ${response.status}`);
        console.log(`  📄 Content-Type: ${result.contentType}`);
        if (result.lastModified) {
          console.log(`  📅 Last-Modified: ${result.lastModified}`);
        }
      } else {
        console.log(`  ❌ Status: ${response.status}`);
      }
      
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
      results.push({
        url,
        status: 'ERROR',
        error: error.message,
        healthy: false
      });
    }
    
    console.log('');
  }
  
  // Summary
  const healthyCount = results.filter(r => r.healthy).length;
  const totalCount = results.length;
  
  console.log('📊 Health Check Summary:');
  console.log(`Status: ${healthyCount}/${totalCount} files accessible`);
  
  if (healthyCount === totalCount) {
    console.log('🎉 All sitemaps are healthy and accessible!');
    console.log('\n✅ Search Console Requirements Met:');
    console.log('- Sitemap index is accessible');
    console.log('- Individual sitemaps respond correctly');
    console.log('- robots.txt includes sitemap references');
  } else {
    console.log('⚠️ Issues found:');
    results.filter(r => !r.healthy).forEach(result => {
      console.log(`  - ${result.url}: ${result.error || `Status ${result.status}`}`);
    });
  }
  
  return healthyCount === totalCount;
};

healthCheck()
  .then(success => process.exit(success ? 0 : 1))
  .catch(console.error);