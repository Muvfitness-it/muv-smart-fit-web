#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = 'https://baujoowgqeyraqnukkmw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhdWpvb3dncWV5cmFxbnVra213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzcwNTYsImV4cCI6MjA2NTY1MzA1Nn0.pmeNPLBZVJjXwYGJP_T2vorYnw7LJ-DdE5RfD3VfIrw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function generateBlogSitemap() {
  try {
    console.log('Fetching published blog posts...');
    
    // Fetch published blog posts
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, published_at, updated_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return;
    }

    console.log(`Found ${posts?.length || 0} published posts`);

    // Generate XML sitemap
    const baseUrl = 'https://www.muvfitness.it';
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    if (posts && posts.length > 0) {
      posts.forEach(post => {
        const lastmod = new Date(post.updated_at || post.published_at).toISOString().split('T')[0];
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/${post.slug}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      });
    }

    xml += '</urlset>\n';

    // Write to public directory
    const outputPath = path.join(process.cwd(), 'public', 'sitemap-blog.xml');
    fs.writeFileSync(outputPath, xml, 'utf8');
    
    console.log(`Blog sitemap generated successfully at ${outputPath}`);
    console.log(`Sitemap contains ${posts?.length || 0} URLs`);

  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    process.exit(1);
  }
}

// Run the script
generateBlogSitemap();