
// Brio Sales Management Service Worker
const CACHE_NAME = 'brio-cache-v1';
const DEBUG = false;

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/favicon.ico',
  '/manifest.json'
];

// Environment detection
const isDevOrPreview = () => {
  return location.hostname === 'localhost' || 
         location.hostname.includes('lovable.') || 
         location.hostname.includes('lovableproject.com');
};

// Simple logging helper
const log = (message, data) => {
  if (DEBUG) {
    console.log(`[SW] ${message}`, data || '');
  }
};

// Skip caching for certain URLs
const shouldSkipCache = (url) => {
  return !url.startsWith('http') || 
         url.includes('/browser-sync/') || 
         url.includes('sockjs-node');
};

// Install handler - cache static assets
self.addEventListener('install', event => {
  if (isDevOrPreview()) {
    self.skipWaiting();
    return;
  }
  
  log('Installing service worker');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate handler - clean old caches
self.addEventListener('activate', event => {
  if (isDevOrPreview()) {
    caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key))));
    self.clients.claim();
    return;
  }
  
  log('Activating service worker');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch handler - stale-while-revalidate for most resources
self.addEventListener('fetch', event => {
  // Skip non-GET requests and development resources
  if (isDevOrPreview() || 
      event.request.method !== 'GET' || 
      shouldSkipCache(event.request.url)) {
    return;
  }
  
  // For navigation requests (HTML), try network first, fall back to cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request) || caches.match('/offline.html'))
    );
    return;
  }
  
  // For all other requests, try cache first, fall back to network
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Return cached response but update cache in background
          fetch(event.request)
            .then(response => {
              if (response.ok) {
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, response));
              }
            })
            .catch(() => {});
          return cachedResponse;
        }
        
        // If not in cache, get from network
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200) {
              return response;
            }
            // Add to cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));
            return response;
          });
      })
  );
});

// Handle message events (like skipWaiting)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

log('Service Worker initialized');
