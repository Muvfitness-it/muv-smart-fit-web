
export const prerenderRoutes = [
  '/',
  '/servizi',
  '/contatti',
  '/chi-siamo',
  '/blog',
  '/muv-planner',
  '/servizi/personal-training',
  '/servizi/ems',
  '/servizi/pilates',
  '/servizi/hiit',
  '/servizi/nutrizione',
  '/servizi/massoterapia',
  '/servizi/pancafit',
  '/servizi/psicologo',
  '/servizi/small-group',
  '/risultati',
  '/team',
  '/trasformazione-30-giorni',
  '/personal-trainer-legnago',
  '/allenamento-ems-legnago',
  '/pilates-legnago'
];

export const generateStaticSitemap = () => {
  const baseUrl = 'https://www.muvfitness.it';
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${prerenderRoutes.map(route => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
};

export const crawlerUserAgents = [
  'Googlebot',
  'Bingbot',
  'Slurp',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'facebookexternalhit',
  'Twitterbot',
  'LinkedInBot',
  'WhatsApp',
  'Applebot',
  'NotebookLM',
  'Google-Extended'
];

export const isCrawler = (userAgent: string): boolean => {
  return crawlerUserAgents.some(bot => 
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );
};
