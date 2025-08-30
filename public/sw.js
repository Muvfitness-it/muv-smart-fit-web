const CACHE_NAME = 'muv-fitness-v5';
const STATIC_CACHE = 'muv-static-v5';
const DYNAMIC_CACHE = 'muv-dynamic-v5';
const IMAGE_CACHE = 'muv-images-v5';
const ASSETS_CACHE = 'muv-assets-v5';

const urlsToCache = [
  '/',
  '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.webp',
  '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png',
  '/lovable-uploads/80ae4a77-9aab-42ac-90cc-32152298a358.png',
  '/lovable-uploads/29b9c5b1-c958-454c-9d7f-5d1c1b4f38ff.png',
  '/images/fitness-professional-bg.webp',
  '/images/fitness-professional-bg.jpg',
  '/manifest.json'
];

const STATIC_ASSETS = [
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css'
];

const MAX_CACHE_SIZE = 100;
const IMAGE_CACHE_SIZE = 50;
const ASSETS_CACHE_SIZE = 30;

// Cache durations (in milliseconds)
const CACHE_DURATIONS = {
  STATIC_ASSETS: 30 * 24 * 60 * 60 * 1000, // 30 days for JS/CSS bundles
  IMAGES: 7 * 24 * 60 * 60 * 1000,         // 7 days for images
  PAGES: 1 * 60 * 60 * 1000,               // 1 hour for pages
  FONTS: 30 * 24 * 60 * 60 * 1000          // 30 days for fonts
};

// Helper function to limit cache size
const limitCacheSize = async (name, size) => {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  if (keys.length > size) {
    await cache.delete(keys[0]);
    await limitCacheSize(name, size);
  }
};

// Helper function to check if cache entry is expired
const isExpired = (response, maxAge) => {
  if (!response) return true;
  const dateHeader = response.headers.get('date');
  const date = dateHeader ? new Date(dateHeader).getTime() : 0;
  return (Date.now() - date) > maxAge;
};

// Helper function to add cache headers
const addCacheHeaders = (response, maxAge) => {
  const headers = new Headers(response.headers);
  headers.set('sw-cache-time', Date.now().toString());
  headers.set('sw-max-age', maxAge.toString());
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
};

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)),
      caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS))
    ])
  );
  self.skipWaiting();
});

// Fetch event - enhanced caching with TTL
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and different origins
  if (request.method !== 'GET' || url.origin !== location.origin) {
    return;
  }

  // Enhanced Images strategy with long-term caching
  if (request.destination === 'image' || 
      request.url.includes('.webp') || 
      request.url.includes('.jpg') || 
      request.url.includes('.jpeg') || 
      request.url.includes('.png') ||
      url.pathname.startsWith('/lovable-uploads/') ||
      url.pathname.startsWith('/images/')) {
    
    event.respondWith(
      caches.open(IMAGE_CACHE).then(cache => 
        cache.match(request).then(response => {
          // Check if cached version is still valid (7 days)
          if (response && !isExpired(response, CACHE_DURATIONS.IMAGES)) {
            return response;
          }
          
          return fetch(request).then(fetchResponse => {
            if (!fetchResponse || fetchResponse.status !== 200) {
              return response || fetchResponse; // Return cached version if fetch fails
            }
            
            // Cache with long TTL for images
            const responseWithHeaders = addCacheHeaders(fetchResponse.clone(), CACHE_DURATIONS.IMAGES);
            cache.put(request, responseWithHeaders);
            limitCacheSize(IMAGE_CACHE, IMAGE_CACHE_SIZE);
            
            return fetchResponse;
          }).catch(() => response || caches.match('/placeholder.svg'));
        })
      )
    );
    return;
  }

  // Static assets strategy with long-term caching (JS, CSS, fonts)
  if (url.pathname.match(/\.(js|css|woff|woff2|ttf|svg|ico)$/) ||
      url.pathname.includes('/assets/')) {
    
    event.respondWith(
      caches.open(ASSETS_CACHE).then(cache =>
        cache.match(request).then(response => {
          // Check if cached version is still valid (30 days for assets)
          if (response && !isExpired(response, CACHE_DURATIONS.STATIC_ASSETS)) {
            return response;
          }
          
          return fetch(request).then(fetchResponse => {
            if (fetchResponse.status === 200) {
              const responseWithHeaders = addCacheHeaders(fetchResponse.clone(), CACHE_DURATIONS.STATIC_ASSETS);
              cache.put(request, responseWithHeaders);
              limitCacheSize(ASSETS_CACHE, ASSETS_CACHE_SIZE);
            }
            return fetchResponse;
          }).catch(() => response); // Return cached version if fetch fails
        })
      )
    );
    return;
  }

  // Font strategy with long-term caching
  if (request.destination === 'font' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(STATIC_CACHE).then(cache =>
        cache.match(request).then(response => {
          if (response && !isExpired(response, CACHE_DURATIONS.FONTS)) {
            return response;
          }
          
          return fetch(request).then(fetchResponse => {
            if (fetchResponse.status === 200) {
              const responseWithHeaders = addCacheHeaders(fetchResponse.clone(), CACHE_DURATIONS.FONTS);
              cache.put(request, responseWithHeaders);
            }
            return fetchResponse;
          }).catch(() => response);
        })
      )
    );
    return;
  }

  // Pages strategy - Network first with short-term cache fallback
  event.respondWith(
    fetch(request)
      .then(response => {
        // Handle 404s by checking for redirects
        if (response.status === 404) {
          return fetch(`https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/redirect-handler${url.pathname}`)
            .then(redirectResponse => {
              if (redirectResponse.status === 301 || redirectResponse.status === 302) {
                const location = redirectResponse.headers.get('Location');
                if (location) {
                  return fetch(location).then(finalResponse => {
                    if (finalResponse.status === 200) {
                      const responseWithHeaders = addCacheHeaders(finalResponse.clone(), CACHE_DURATIONS.PAGES);
                      caches.open(DYNAMIC_CACHE).then(cache => {
                        cache.put(request, responseWithHeaders);
                        limitCacheSize(DYNAMIC_CACHE, 20);
                      });
                    }
                    return finalResponse;
                  });
                }
              }
              return response; // Return original 404 if no redirect
            })
            .catch(() => response); // Fallback to original 404
        }
        
        if (response.status === 200) {
          const responseWithHeaders = addCacheHeaders(response.clone(), CACHE_DURATIONS.PAGES);
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseWithHeaders);
            limitCacheSize(DYNAMIC_CACHE, 20);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request).then(response => {
          return response || caches.match('/');
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE, ASSETS_CACHE];
  
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim()
    ])
  );
});

// Background sync for performance analytics
self.addEventListener('sync', (event) => {
  if (event.tag === 'performance-sync') {
    event.waitUntil(syncPerformanceData());
  }
});

const syncPerformanceData = async () => {
  // Send cached performance data when online
  try {
    const cache = await caches.open('performance-data');
    const requests = await cache.keys();
    for (const request of requests) {
      await fetch(request.url);
      await cache.delete(request);
    }
  } catch (error) {
    console.log('Sync failed:', error);
  }
};