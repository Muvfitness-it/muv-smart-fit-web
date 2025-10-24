import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

function updateSitemapLastmod() {
  console.log('📅 Updating sitemap lastmod dates...');
  
  const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
  const currentDate = new Date().toISOString().split('T')[0];
  
  try {
    let sitemap = readFileSync(sitemapPath, 'utf-8');
    
    // Replace all date patterns (YYYY-MM-DD) with current date
    const updatedSitemap = sitemap.replace(
      /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
      `<lastmod>${currentDate}</lastmod>`
    );
    
    writeFileSync(sitemapPath, updatedSitemap, 'utf-8');
    console.log(`✅ Updated sitemap.xml with lastmod: ${currentDate}`);
  } catch (error) {
    console.error('❌ Error updating sitemap:', error);
    process.exit(1);
  }
}

updateSitemapLastmod();
