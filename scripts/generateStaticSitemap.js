#!/usr/bin/env node

import { writeFileSync, readFileSync, existsSync } from 'fs';
import seoData from '../src/utils/seoRoutes.data.json' assert { type: 'json' };

const { baseUrl, routes: staticRoutes } = seoData;
const currentDate = new Date().toISOString().split('T')[0];

// Generate main sitemap with static routes
const generateMainSitemap = () => {
  const urlEntries = staticRoutes.map(route => {
    const lastmod = route.lastmod || currentDate;
    return `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

// Generate sitemap index (simplified - only static sitemaps)
const generateSitemapIndex = () => {
  const sitemaps = [
    `  <sitemap>
    <loc>${baseUrl}/sitemap-main.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`,
    `  <sitemap>
    <loc>${baseUrl}/sitemap-blog.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`
  ];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.join('\n')}
</sitemapindex>`;
};

// Generate robots.txt
const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Block admin and private areas
Disallow: /admin/
Disallow: /dashboard/
Disallow: /auth/
Disallow: /ai-auth/
Disallow: /api/

# Block search and filters to save crawl budget  
Disallow: /blog?*
Disallow: /blog/tag/
Disallow: /search*
Disallow: /*?search=*
Disallow: /*?filter=*
Disallow: /*?utm_*

# Allow important pages explicitly
Allow: /blog
Allow: /blog/
Allow: /servizi/
Allow: /contatti
Allow: /chi-siamo
Allow: /team
Allow: /risultati
Allow: /trasformazione-30-giorni

# Crawl delay for polite crawling
Crawl-delay: 1

# Sitemap locations
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-main.xml  
Sitemap: ${baseUrl}/sitemap-blog.xml

# Additional bot directives
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Google-Extended
Disallow: /`;
};

// Write files
try {
  const mainSitemap = generateMainSitemap();
  const sitemapIndex = generateSitemapIndex();
  const robotsTxt = generateRobotsTxt();

  writeFileSync('public/sitemap-main.xml', mainSitemap);
  writeFileSync('public/sitemap.xml', sitemapIndex);
  writeFileSync('public/robots.txt', robotsTxt);

  console.log('✅ Static sitemaps and robots.txt generated successfully');
  console.log(`📊 Generated ${staticRoutes.length} URLs in sitemap-main.xml`);
  
  // Verify generated files
  console.log('\n🔍 Verifying generated files...');
  
  const verifyFile = (path, expectedContent) => {
    try {
      const content = readFileSync(path, 'utf8');
      if (content.includes(expectedContent)) {
        console.log(`✅ ${path}: Valid`);
        return true;
      } else {
        console.log(`❌ ${path}: Missing expected content`);
        return false;
      }
    } catch (error) {
      console.log(`❌ ${path}: ${error.message}`);
      return false;
    }
  };
  
  const allValid = [
    verifyFile('public/sitemap-main.xml', '<urlset'),
    verifyFile('public/sitemap.xml', '<sitemapindex'),
    verifyFile('public/robots.txt', 'Sitemap:')
  ].every(Boolean);
  
  if (allValid) {
    console.log('\n🎉 All files generated and verified successfully!');
    console.log(`🌐 Sitemap index: ${baseUrl}/sitemap.xml`);
  } else {
    console.log('\n⚠️ Some files may have issues. Check the logs above.');
  }
  
} catch (error) {
  console.error('❌ Error generating static sitemaps:', error);
  process.exit(1);
}