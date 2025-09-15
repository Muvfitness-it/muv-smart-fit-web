// Enhanced Service Worker with aggressive caching for performance
const CACHE_NAME = 'muv-fitness-v2';
const STATIC_CACHE = 'muv-static-v2';
const DYNAMIC_CACHE = 'muv-dynamic-v2';

// Critical resources that must be cached immediately
const CRITICAL_RESOURCES = [
  '/',
  '/src/index.css',
  '/images/fitness-professional-bg.jpg',
  '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png',
  // Critical fonts
  'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew7.woff2',
  'https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfedw.woff2'
];

// Resources to cache on demand
const CACHE_PATTERNS = [
  /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
  /\.(?:js|css)$/,
  /\.(?:woff|woff2|ttf|eot)$/,
  /^https:\/\/fonts\.(googleapis|gstatic)\.com/
];

// Install event - cache critical resources immediately
self.addEventListener('install', event => {
  console.log('SW: Installing enhanced service worker');
  
  event.waitUntil(
    Promise.all([
      // Cache critical static resources
      caches.open(STATIC_CACHE).then(cache => {
        console.log('SW: Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  console.log('SW: Activating enhanced service worker');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE) {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients immediately
      self.clients.claim()
    ])
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(handleRequest(request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Strategy 1: Cache First for static assets
  if (CACHE_PATTERNS.some(pattern => pattern.test(url.pathname)) || 
      url.hostname.includes('fonts.g')) {
    return cacheFirst(request);
  }
  
  // Strategy 2: Network First for HTML pages
  if (request.headers.get('accept')?.includes('text/html')) {
    return networkFirst(request);
  }
  
  // Strategy 3: Stale While Revalidate for API calls
  if (url.pathname.startsWith('/api/')) {
    return staleWhileRevalidate(request);
  }
  
  // Default: Network First
  return networkFirst(request);
}

// Cache First Strategy (for static assets)
async function cacheFirst(request) {
  try {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

// Network First Strategy (for HTML pages)
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

// Stale While Revalidate Strategy (for API calls)
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      const cache = caches.open(DYNAMIC_CACHE);
      cache.then(c => c.put(request, response.clone()));
    }
    return response;
  });
  
  return cached || fetchPromise;
}

// Background sync for better performance
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(performBackgroundSync());
  }
});

async function performBackgroundSync() {
  // Clean up old cache entries
  const caches_to_clean = [DYNAMIC_CACHE];
  
  for (const cacheName of caches_to_clean) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    // Remove entries older than 1 hour
    const now = Date.now();
    const maxAge = 60 * 60 * 1000; // 1 hour
    
    for (const request of requests) {
      const response = await cache.match(request);
      const dateHeader = response?.headers.get('date');
      
      if (dateHeader) {
        const responseTime = new Date(dateHeader).getTime();
        if (now - responseTime > maxAge) {
          await cache.delete(request);
        }
      }
    }
  }
}

// Message handling for cache updates
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.urls;
    event.waitUntil(
      caches.open(STATIC_CACHE).then(cache => {
        return cache.addAll(urls);
      })
    );
  }
});