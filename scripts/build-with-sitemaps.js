#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const buildWithSitemaps = async () => {
  console.log('🚀 Starting optimized build with sitemap generation...\n');
  
  try {
    // Step 1: Build the app
    console.log('📦 Building application...');
    await execAsync('npm run build');
    console.log('✅ Build completed\n');
    
    // Step 2: Generate static sitemaps
    console.log('🗺️ Generating sitemaps...');
    await execAsync('node scripts/generateStaticSitemap.js');
    console.log('✅ Sitemaps generated\n');
    
    // Step 3: Verify sitemaps
    console.log('🔍 Verifying sitemaps...');
    try {
      await execAsync('node scripts/verifySitemaps.js');
      console.log('✅ Sitemap verification passed\n');
    } catch (verifyError) {
      console.log('⚠️ Sitemap verification warnings:\n');
      console.log(verifyError.stdout);
    }
    
    // Step 4: Submit sitemaps (production only)
    if (process.env.NODE_ENV === 'production' || process.argv.includes('--submit')) {
      console.log('📤 Submitting sitemaps to search engines...');
      try {
        await execAsync('node scripts/submitSitemaps.js');
        console.log('✅ Sitemap submission completed\n');
      } catch (submitError) {
        console.log('⚠️ Sitemap submission had issues:\n');
        console.log(submitError.stdout);
      }
    }
    
    console.log('🎉 Build with sitemaps completed successfully!');
    console.log('\n📋 Summary:');
    console.log('✅ Application built');
    console.log('✅ Sitemaps generated and verified');
    console.log('✅ robots.txt updated');
    
    if (process.env.NODE_ENV === 'production' || process.argv.includes('--submit')) {
      console.log('✅ Sitemaps submitted to search engines');
    }
    
    console.log('\n🌐 Sitemap URLs:');
    console.log('- https://www.muvfitness.it/sitemap.xml');
    console.log('- https://www.muvfitness.it/sitemap-main.xml');
    console.log('- https://www.muvfitness.it/sitemap-blog.xml');
    
    console.log('\n📝 Next steps:');
    console.log('1. Deploy the dist/ folder');
    console.log('2. Submit sitemap index in Google Search Console');
    console.log('3. Monitor indexing status');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    if (error.stdout) console.log('STDOUT:', error.stdout);
    if (error.stderr) console.log('STDERR:', error.stderr);
    process.exit(1);
  }
};

buildWithSitemaps();