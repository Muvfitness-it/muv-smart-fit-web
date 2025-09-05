#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const runSSGBuild = async () => {
  console.log('🚀 Starting SSG build pipeline...\n');
  
  try {
    // Step 1: Vite build
    console.log('📦 Building with Vite...');
    await execAsync('npm run build');
    console.log('✅ Vite build completed\n');
    
    // Step 2: Prerender heads
    console.log('🎭 Prerendering heads...');
    await execAsync('node scripts/prerender-head.js');
    console.log('✅ Head prerendering completed\n');
    
    // Step 3: Generate sitemaps
    console.log('🗺️ Generating sitemaps...');
    await execAsync('node scripts/generateStaticSitemap.js');
    console.log('✅ Sitemaps generated\n');
    
    // Step 4: SEO lint
    console.log('🔍 Running SEO lint...');
    try {
      await execAsync('node scripts/seoLint.js');
      console.log('✅ SEO lint passed\n');
    } catch (lintError) {
      console.log('⚠️ SEO lint found issues (build continues):\n');
      console.log(lintError.stdout);
    }
    
    console.log('🎉 SSG build pipeline completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Deploy the dist/ folder');
    console.log('2. Verify robots.txt is served correctly');
    console.log('3. Check page source for unique meta tags');
    console.log('4. Submit sitemaps in Search Console\n');
    
  } catch (error) {
    console.error('❌ SSG build failed:', error.message);
    if (error.stdout) console.log('STDOUT:', error.stdout);
    if (error.stderr) console.log('STDERR:', error.stderr);
    process.exit(1);
  }
};

runSSGBuild();