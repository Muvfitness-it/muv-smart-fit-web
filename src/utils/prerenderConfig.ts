
export const prerenderRoutes = [
  '/',
  '/servizi',
  '/contatti',
  '/chi-siamo',
  '/blog',
  '/prezzi',
  '/recensioni',
  '/risultati',
  '/team',
  
  '/servizi/personal-training',
  '/servizi/ems',
  '/servizi/pilates',
  '/servizi/hiit',
  '/servizi/nutrizione',
  '/servizi/massoterapia',
  '/servizi/pancafit',
  '/servizi/psicologo',
  '/servizi/small-group',
  
  // Local SEO pages
  '/personal-trainer-legnago',
  '/allenamento-ems-legnago',
  '/pilates-legnago',
  '/palestra-legnago',
  '/dimagrire-legnago', 
  '/mal-di-schiena-legnago',
  '/massaggio-sportivo-legnago',
  
  // Nearby towns pages
  '/cerea-fitness',
  '/bovolone-fitness',
  '/san-bonifacio-fitness',
  
  '/trasformazione-30-giorni'
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
  'Google-Extended',
  'GPTBot',
  'ChatGPT-User',
  'CCBot',
  'anthropic-ai'
];

export const isCrawler = (userAgent: string): boolean => {
  return crawlerUserAgents.some(bot => 
    userAgent.toLowerCase().includes(bot.toLowerCase())
  );
};

// Enhanced IndexNow submission for faster indexing
export const submitToIndexNow = async (urls: string[]) => {
  const indexNowPayload = {
    host: 'www.muvfitness.it',
    key: 'muv-fitness-index-key-2024',
    keyLocation: 'https://www.muvfitness.it/indexnow-key.txt',
    urlList: urls
  };

  try {
    // Submit to Bing/Yandex IndexNow
    await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(indexNowPayload)
    });

    // Ping Google sitemap
    await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent('https://www.muvfitness.it/sitemap.xml')}`, 
      { mode: 'no-cors' });
    
    console.log('URLs submitted for indexing:', urls.length);
  } catch (error) {
    console.log('Indexing submission completed (some may be blocked by CORS)');
  }
};
