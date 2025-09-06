#!/usr/bin/env node

import seoData from '../src/utils/seoRoutes.data.json' assert { type: 'json' };

const { baseUrl } = seoData;

const submitSitemaps = async () => {
  console.log('🚀 Submitting sitemaps to search engines...\n');
  
  const sitemaps = [
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/sitemap-main.xml`,
    `${baseUrl}/sitemap-blog.xml`
  ];
  
  const searchEngines = [
    {
      name: 'Google',
      endpoint: (sitemapUrl) => `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
    },
    {
      name: 'Bing',
      endpoint: (sitemapUrl) => `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
    }
  ];
  
  for (const sitemap of sitemaps) {
    console.log(`📤 Submitting: ${sitemap}`);
    
    for (const engine of searchEngines) {
      try {
        const response = await fetch(engine.endpoint(sitemap), {
          method: 'GET',
          headers: {
            'User-Agent': 'MUV-Fitness-Sitemap-Submitter/1.0'
          }
        });
        
        if (response.ok) {
          console.log(`  ✅ ${engine.name}: Submitted successfully`);
        } else {
          console.log(`  ⚠️ ${engine.name}: Response ${response.status}`);
        }
      } catch (error) {
        console.log(`  ⚠️ ${engine.name}: ${error.message}`);
      }
    }
    console.log('');
  }
  
  console.log('🎉 Sitemap submission completed!');
  console.log('\n📝 Manual verification steps:');
  console.log('1. Check Google Search Console for new sitemap detections');
  console.log('2. Verify sitemap accessibility at:');
  sitemaps.forEach(url => console.log(`   - ${url}`));
  console.log('3. Monitor indexing status in Search Console\n');
};

submitSitemaps().catch(console.error);