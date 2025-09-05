#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { staticRoutes } from '../src/utils/seoRoutes.js';

const baseUrl = 'https://www.muvfitness.it';
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

// Generate sitemap index
const generateSitemapIndex = () => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-main.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-blog.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
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
} catch (error) {
  console.error('❌ Error generating static sitemaps:', error);
  process.exit(1);
}