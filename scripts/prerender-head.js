#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import seoData from '../src/utils/seoRoutes.data.json' assert { type: 'json' };

const { baseUrl, defaultOgImage, routes } = seoData;

// Generate meta tags for a specific route
const generateMetaTags = (route) => {
  const canonical = `${baseUrl}${route.path}`;
  const ogImage = route.ogImage || defaultOgImage;
  
  return `    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    ${route.keywords ? `<meta name="keywords" content="${route.keywords}" />` : ''}
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <link rel="canonical" href="${canonical}" />
    
    <!-- Open Graph -->
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:locale" content="it_IT" />
    <meta property="og:site_name" content="MUV Fitness" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${ogImage}" />`;
};

// Prerender head for all routes
const prerenderHeads = () => {
  try {
    // Read the base template from dist/index.html
    const templatePath = 'dist/index.html';
    const template = readFileSync(templatePath, 'utf-8');
    
    console.log('🚀 Starting head prerendering...');
    
    let processedRoutes = 0;
    
    for (const route of routes) {
      try {
        // Generate route-specific meta tags
        const metaTags = generateMetaTags(route);
        
        // Replace the default SEO block with route-specific tags
        const routeHtml = template.replace(
          /<!-- Default SEO - Will be replaced by SSG -->[\s\S]*?<!-- \/Default SEO -->/,
          `<!-- SSG Generated SEO for ${route.path} -->\n${metaTags}\n    <!-- /SSG Generated SEO -->`
        );
        
        // Determine output path
        let outputPath;
        if (route.path === '/') {
          outputPath = 'dist/index.html';
        } else {
          const routePath = route.path.replace(/^\//, '');
          outputPath = `dist/${routePath}/index.html`;
          
          // Create directory if it doesn't exist
          const dir = dirname(outputPath);
          mkdirSync(dir, { recursive: true });
        }
        
        // Write the route-specific HTML
        writeFileSync(outputPath, routeHtml);
        processedRoutes++;
        
        console.log(`✅ Generated: ${outputPath}`);
      } catch (routeError) {
        console.error(`❌ Error processing route ${route.path}:`, routeError.message);
      }
    }
    
    console.log(`🎉 Head prerendering completed! Processed ${processedRoutes}/${routes.length} routes`);
    
  } catch (error) {
    console.error('❌ Fatal error during head prerendering:', error);
    process.exit(1);
  }
};

// Run the prerendering
prerenderHeads();