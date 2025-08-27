const CACHE_NAME = 'muv-fitness-v4';
const STATIC_CACHE = 'muv-static-v4';
const DYNAMIC_CACHE = 'muv-dynamic-v4';
const IMAGE_CACHE = 'muv-images-v4';

const urlsToCache = [
  '/',
  '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.webp',
  '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png',
  '/images/fitness-professional-bg.webp',
  '/images/fitness-professional-bg.jpg',
  '/manifest.json'
];

const STATIC_ASSETS = [
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css'
];

const MAX_CACHE_SIZE = 50;
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

// Helper function to limit cache size
const limitCacheSize = async (name, size) => {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  if (keys.length > size) {
    await cache.delete(keys[0]);
    await limitCacheSize(name, size);
  }
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

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and different origins
  if (request.method !== 'GET' || url.origin !== location.origin) {
    return;
  }

  // Enhanced Images strategy - Cache with WebP support
  if (request.destination === 'image' || request.url.includes('.webp')) {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) return response;
        
        return fetch(request).then(fetchResponse => {
          if (!fetchResponse || fetchResponse.status !== 200) {
            return fetchResponse;
          }
          
          const responseClone = fetchResponse.clone();
          caches.open(IMAGE_CACHE).then(cache => {
            cache.put(request, responseClone);
            limitCacheSize(IMAGE_CACHE, MAX_CACHE_SIZE);
          });
          
          return fetchResponse;
        }).catch(() => {
          // Fallback to placeholder if image fails
          return caches.match('/placeholder.svg');
        });
      })
    );
    return;
  }

  // Static assets strategy - Cache first
  if (url.pathname.match(/\.(js|css|woff|woff2|ttf|svg)$/)) {
    event.respondWith(
      caches.match(request).then(response => {
        return response || fetch(request).then(fetchResponse => {
          if (fetchResponse.status === 200) {
            const responseClone = fetchResponse.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return fetchResponse;
        });
      })
    );
    return;
  }

  // Pages strategy - Network first with cache fallback
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
                      const responseClone = finalResponse.clone();
                      caches.open(DYNAMIC_CACHE).then(cache => {
                        cache.put(request, responseClone);
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
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseClone);
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
  const cacheWhitelist = [CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
  
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