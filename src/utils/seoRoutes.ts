// Static route definitions for SEO and sitemap generation
import seoData from './seoRoutes.data.json';

export interface SEORouteConfig {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastmod?: string;
  ogImage?: string;
  structuredData?: Record<string, any>;
}

const baseUrl = seoData.baseUrl;
const defaultOgImage = seoData.defaultOgImage;

export const staticRoutes: SEORouteConfig[] = seoData.routes.map(route => ({
  ...route,
  ogImage: route.ogImage || defaultOgImage,
  changefreq: route.changefreq as SEORouteConfig['changefreq']
}));

// Generate meta tags for a specific route
export const generateMetaTags = (route: SEORouteConfig): string => {
  const canonical = `${baseUrl}${route.path}`;
  const ogImage = route.ogImage || defaultOgImage;
  
  return `
    <title>${route.title}</title>
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
    <meta name="twitter:image" content="${ogImage}" />
  `.trim();
};

// Generate sitemap XML
export const generateStaticSitemap = (): string => {
  const currentDate = new Date().toISOString().split('T')[0];
  
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

// Get route config by path
export const getRouteConfig = (path: string): SEORouteConfig | undefined => {
  return staticRoutes.find(route => route.path === path);
};