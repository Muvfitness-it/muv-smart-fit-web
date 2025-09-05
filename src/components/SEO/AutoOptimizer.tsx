import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_OG_IMAGE = 'https://www.muvfitness.it/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png';

// Utility: trim string by word boundary within limit
const trimTo = (str: string, limit: number) => {
  if (!str) return str;
  if (str.length <= limit) return str;
  const sliced = str.slice(0, limit - 1);
  const lastSpace = sliced.lastIndexOf(' ');
  const base = lastSpace > 40 ? sliced.slice(0, lastSpace) : sliced;
  return base + '…';
};

const ensureMeta = (selector: string, attr: 'name' | 'property', content: string) => {
  if (!content) return;
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${selector}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, selector);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const createOrUpdateScript = (id: string, json: any) => {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(json);
};

const injectSkipLink = () => {
  if (document.getElementById('muv-skip-link')) return;
  const a = document.createElement('a');
  a.id = 'muv-skip-link';
  a.href = '#main';
  a.textContent = 'Salta al contenuto principale';
  a.className = 'sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground';
  document.body.prepend(a);
};

const enhanceImages = () => {
  const imgs = Array.from(document.images);
  imgs.forEach((img, idx) => {
    if (!img.getAttribute('loading')) {
      // Keep first image potentially as LCP (no lazy)
      if (idx > 0) img.setAttribute('loading', 'lazy');
    }
    if (!img.getAttribute('decoding')) img.setAttribute('decoding', 'async');
    if (!img.getAttribute('width') && img.naturalWidth) img.setAttribute('width', String(img.naturalWidth));
    if (!img.getAttribute('height') && img.naturalHeight) img.setAttribute('height', String(img.naturalHeight));
    if (!img.getAttribute('alt')) {
      const src = img.currentSrc || img.src || '';
      const name = src.split('/').pop()?.split('.')[0]?.replace(/[-_]/g, ' ') || 'immagine decorativa';
      img.setAttribute('alt', name);
    }
  });
};

const injectBreadcrumbs = (baseUrl: string, path: string) => {
  if (path === '/') {
    const existing = document.getElementById('muv-breadcrumb-json');
    if (existing) existing.remove();
    return;
  }
  const segments = path.split('/').filter(Boolean);
  const itemListElement = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
    ...segments.map((seg, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: seg.replace(/-/g, ' '),
      item: `${baseUrl}/${segments.slice(0, i + 1).join('/')}`
    }))
  ];
  createOrUpdateScript('muv-breadcrumb-json', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  });
};

const normalizeMeta = (baseUrl: string, path: string) => {
  // Title and description length normalization
  if (document.title) {
    document.title = trimTo(document.title, 60);
  }
  const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (desc?.content) desc.setAttribute('content', trimTo(desc.content, 155));

  // Canonical fallback
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  if (!canonical.href) canonical.href = `${baseUrl}${path}`;

  // OG/Twitter fallbacks
  ensureMeta('og:title', 'property', document.title);
  ensureMeta('og:description', 'property', desc?.content || '');
  ensureMeta('og:url', 'property', canonical.href);
  ensureMeta('og:image', 'property', DEFAULT_OG_IMAGE);
  ensureMeta('og:image:width', 'property', '1200');
  ensureMeta('og:image:height', 'property', '630');
  ensureMeta('twitter:card', 'name', 'summary_large_image');
  ensureMeta('twitter:title', 'name', document.title);
  ensureMeta('twitter:description', 'name', desc?.content || '');
  ensureMeta('twitter:image', 'name', DEFAULT_OG_IMAGE);
};

const injectInternalLinks = (path: string) => {
  if (!path.startsWith('/blog/')) return;
  if (document.getElementById('muv-internal-links')) return;

  const container = document.querySelector('main, article, #root');
  if (!container) return;

  const aside = document.createElement('aside');
  aside.id = 'muv-internal-links';
  aside.setAttribute('role', 'complementary');
  aside.className = 'mt-8 p-6 rounded-lg border border-border bg-card text-card-foreground';

  const title = document.createElement('h2');
  title.className = 'text-xl font-semibold mb-3';
  title.textContent = 'Prossimi passi consigliati';
  aside.appendChild(title);

  const links: { href: string; text: string }[] = [
    { href: '/servizi/hiit', text: 'Dimagrimento rapido con HIIT' },
    { href: '/servizi/pancafit', text: 'Postura e mal di schiena: scopri Pancafit' },
    { href: '/servizi/ems', text: 'Tecnologia EMS: risultati in meno tempo' },
    { href: '/servizi/pilates', text: 'Pilates: stabilità e forza del core' },
    { href: '/servizi/personal-training', text: 'Personal Trainer a Legnago' },
  ];

  const ul = document.createElement('ul');
  ul.className = 'list-disc pl-5 space-y-2';
  links.slice(0, 4).forEach(l => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = l.href;
    a.textContent = l.text;
    a.className = 'text-primary underline underline-offset-2 hover:no-underline';
    a.setAttribute('rel', 'noopener');
    li.appendChild(a);
    ul.appendChild(li);
  });
  aside.appendChild(ul);

  // Append near end of main content
  container.appendChild(aside);
};

const AutoOptimizer: React.FC = () => {
  const location = useLocation();
  const baseUrl = 'https://www.muvfitness.it';

  useEffect(() => {
    // Run immediate fixes on route change
    try {
      injectSkipLink();
      normalizeMeta(baseUrl, location.pathname);
      injectBreadcrumbs(baseUrl, location.pathname);
      enhanceImages();
      injectInternalLinks(location.pathname);
    } catch (e) {
      console.warn('AutoOptimizer run warning:', e);
    }

    // Schedule periodic light re-run (every 15 min) as fail-safe
    const interval = setInterval(() => {
      try {
        normalizeMeta(baseUrl, location.pathname);
        enhanceImages();
      } catch { }
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [location.pathname]);

  return null;
};

export default AutoOptimizer;
