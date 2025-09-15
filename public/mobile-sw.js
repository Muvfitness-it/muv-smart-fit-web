// Mobile-optimized Service Worker
const MOBILE_CACHE_NAME = 'muv-mobile-v1';
const MOBILE_STATIC_CACHE = 'muv-mobile-static-v1';
const MOBILE_DYNAMIC_CACHE = 'muv-mobile-dynamic-v1';

// Mobile-optimized critical resources
const MOBILE_CRITICAL_RESOURCES = [
  '/',
  '/src/index.css',
  '/images/fitness-professional-bg.jpg',
  // Mobile-specific smaller images
  '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png?w=400&h=300&quality=70',
];

// Mobile-specific cache strategies
const MOBILE_CACHE_STRATEGIES = {
  // Aggressive caching for mobile images
  images: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxEntries: 50
  },
  // Shorter cache for HTML on mobile (faster updates)
  pages: {
    maxAge: 2 * 60 * 60 * 1000, // 2 hours
    maxEntries: 20
  },
  // Extended cache for fonts and CSS
  static: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxEntries: 100
  }
};

// Install - cache mobile-optimized resources
self.addEventListener('install', event => {
  console.log('Mobile SW: Installing');
  
  event.waitUntil(
    caches.open(MOBILE_STATIC_CACHE)
      .then(cache => {
        console.log('Mobile SW: Caching critical mobile resources');
        return cache.addAll(MOBILE_CRITICAL_RESOURCES);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate - cleanup and take control
self.addEventListener('activate', event => {
  console.log('Mobile SW: Activating');
  
  event.waitUntil(
    Promise.all([
      // Clean old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName.includes('muv-') && 
                !cacheName.includes('mobile-') &&
                cacheName !== MOBILE_CACHE_NAME &&
                cacheName !== MOBILE_STATIC_CACHE &&
                cacheName !== MOBILE_DYNAMIC_CACHE) {
              console.log('Mobile SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch - mobile-optimized strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip non-HTTP requests
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(handleMobileRequest(request));
});

async function handleMobileRequest(request) {
  const url = new URL(request.url);
  
  // Mobile image optimization strategy
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
    return handleMobileImage(request);
  }
  
  // Mobile HTML strategy - Network first with aggressive fallback
  if (request.headers.get('accept')?.includes('text/html')) {
    return handleMobileHTML(request);
  }
  
  // Mobile CSS/JS strategy - Cache first with background update
  if (url.pathname.match(/\.(css|js)$/)) {
    return handleMobileStatic(request);
  }
  
  // Font strategy - Cache first, long-term
  if (url.pathname.match(/\.(woff|woff2|ttf|otf)$/) || url.hostname.includes('fonts.g')) {
    return handleMobileFont(request);
  }
  
  // Default mobile strategy
  return handleMobileDefault(request);
}

// Mobile image handling with compression
async function handleMobileImage(request) {
  const cached = await caches.match(request);
  
  if (cached) {
    // Serve cached, update in background
    updateImageCache(request);
    return cached;
  }
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      // Cache the image
      const cache = await caches.open(MOBILE_DYNAMIC_CACHE);
      
      // Only cache reasonably sized images for mobile
      const contentLength = response.headers.get('content-length');
      if (!contentLength || parseInt(contentLength) < 500000) { // 500KB limit
        cache.put(request, response.clone());
      }
    }
    
    return response;
  } catch {
    // Return placeholder for mobile
    return new Response(
      `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
        <rect width="300" height="200" fill="#f0f0f0"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#666">📱 Immagine non disponibile</text>
      </svg>`,
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
}

// Mobile HTML handling - Fast network, quick fallback
async function handleMobileHTML(request) {
  try {
    // Try network first with short timeout for mobile
    const networkPromise = fetch(request);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Mobile timeout')), 2000)
    );
    
    const response = await Promise.race([networkPromise, timeoutPromise]);
    
    if (response.ok) {
      // Cache for mobile
      const cache = await caches.open(MOBILE_DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch {
    // Fallback to cache
    const cached = await caches.match(request);
    return cached || await caches.match('/');
  }
}

// Mobile static files - Cache first
async function handleMobileStatic(request) {
  const cached = await caches.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(MOBILE_STATIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch {
    return new Response('/* Offline - CSS unavailable */', {
      headers: { 'Content-Type': 'text/css' }
    });
  }
}

// Mobile font handling
async function handleMobileFont(request) {
  const cached = await caches.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(MOBILE_STATIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch {
    // System font fallback
    return new Response('', { status: 404 });
  }
}

// Default mobile handling
async function handleMobileDefault(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(MOBILE_DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch {
    return caches.match(request);
  }
}

// Background image cache update
async function updateImageCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(MOBILE_DYNAMIC_CACHE);
      cache.put(request, response);
    }
  } catch {
    // Ignore background update errors
  }
}

// Mobile-specific background sync
self.addEventListener('sync', event => {
  if (event.tag === 'mobile-cache-cleanup') {
    event.waitUntil(cleanupMobileCaches());
  }
});

async function cleanupMobileCaches() {
  const cache = await caches.open(MOBILE_DYNAMIC_CACHE);
  const requests = await cache.keys();
  const now = Date.now();
  
  // More aggressive cleanup for mobile
  for (const request of requests) {
    const response = await cache.match(request);
    const dateHeader = response?.headers.get('date');
    
    if (dateHeader) {
      const responseTime = new Date(dateHeader).getTime();
      // Clean up images older than 3 days on mobile
      if (now - responseTime > 3 * 24 * 60 * 60 * 1000) {
        await cache.delete(request);
      }
    }
  }
}

// Handle mobile-specific messages
self.addEventListener('message', event => {
  if (event.data?.type === 'MOBILE_OPTIMIZATION') {
    const { imageQuality, enableDataSaver } = event.data;
    
    // Store mobile preferences
    self.mobileSettings = {
      imageQuality: imageQuality || 70,
      dataSaver: enableDataSaver || false
    };
  }
  
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});