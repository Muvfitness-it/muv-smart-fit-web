import { createClient } from '@supabase/supabase-js';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://baujoowgqeyraqnukkmw.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhdWpvb3dncWV5cmFxbnVra213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NDE3NDMsImV4cCI6MjA1MDExNzc0M30.FuOhwJEOeePy7QLwfmg3-mBEa3nKYNKYR25XCJpPQPU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function prerenderBlogArticles() {
  console.log('🚀 Starting blog articles pre-rendering...');
  
  // Fetch all published articles
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, meta_title, meta_description, featured_image, published_at, updated_at, author_name, category_id, reading_time')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('❌ Error fetching posts:', error);
    process.exit(1);
  }

  if (!posts || posts.length === 0) {
    console.log('⚠️  No published posts found');
    return;
  }

  console.log(`📝 Found ${posts.length} published articles`);

  // Ensure dist directory exists
  const distDir = join(process.cwd(), 'dist');
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }

  // Generate static HTML for each post
  for (const post of posts) {
    const title = post.meta_title || `${post.title} - Blog MUV Fitness Legnago`;
    const description = post.meta_description || post.excerpt || 'Articolo del blog MUV Fitness Legnago';
    const canonical = `https://www.muvfitness.it/${post.slug}`;
    const ogImage = post.featured_image || 'https://www.muvfitness.it/lovable-uploads/professional-bg.jpg';
    
    // JSON-LD Article Schema
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": description,
      "image": ogImage,
      "datePublished": post.published_at,
      "dateModified": post.updated_at || post.published_at,
      "author": {
        "@type": "Person",
        "name": post.author_name || "MUV Fitness Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "MUV Fitness Legnago",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.muvfitness.it/lovable-uploads/muv-logo-transparent.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonical
      }
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.muvfitness.it/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://www.muvfitness.it/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": canonical
        }
      ]
    };

    const html = `<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>${escapeHtml(title)}</title>
    <meta name="title" content="${escapeHtml(title)}" />
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:site_name" content="MUV Fitness Legnago" />
    <meta property="article:published_time" content="${post.published_at}" />
    ${post.updated_at ? `<meta property="article:modified_time" content="${post.updated_at}" />` : ''}
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${canonical}" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${ogImage}" />
    
    <!-- SEO -->
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow" />
    
    <!-- Geo Tags -->
    <meta name="geo.region" content="IT-VR" />
    <meta name="geo.placename" content="Legnago" />
    <meta name="geo.position" content="45.1940;11.3100" />
    <meta name="ICBM" content="45.1940, 11.3100" />
    
    <!-- Structured Data -->
    <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

    const filename = `${post.slug}.html`;
    const filepath = join(distDir, filename);
    
    writeFileSync(filepath, html, 'utf-8');
    console.log(`✅ Generated: ${filename}`);
  }

  console.log(`\n🎉 Successfully pre-rendered ${posts.length} blog articles!`);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

prerenderBlogArticles().catch(err => {
  console.error('❌ Pre-rendering failed:', err);
  process.exit(1);
});
