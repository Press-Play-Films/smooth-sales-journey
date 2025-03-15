
// Service Worker for Brio Sales Management
const CACHE_NAME = 'brio-sales-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/lovable-uploads/6ad16794-edeb-45cd-bc70-cbf5842c34aa.png',
  '/lovable-uploads/05981032-1579-4d42-815d-7970b7d6939a.png',
  '/lovable-uploads/c3826d58-1386-4834-9056-11611e468d2a.png'
];

// Skip service worker in preview environments
if (self.location.hostname.includes('lovable.ai') || 
    self.location.hostname.includes('lovable.app')) {
  self.addEventListener('install', () => {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', () => {
    self.clients.claim();
  });
  
  // Passthrough fetch for preview environments
  self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request));
  });
} else {
  // Normal service worker for production
  
  // Install event - cache key assets
  self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.addAll(urlsToCache);
        })
        .catch(err => console.error('Cache installation error:', err))
    );
  });

  // Activate event - clean up old caches
  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return cacheName !== CACHE_NAME;
          }).map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
    );
    // Ensure service worker takes control immediately
    return self.clients.claim();
  });

  // Fetch event - serve from cache, fall back to network
  self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Skip browser-sync and other dev resources
    if (event.request.url.includes('/browser-sync/') || 
        event.request.url.includes('sockjs-node')) return;
    
    // Basic network-first strategy with fallbacks
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          // Cache the new resource
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            })
            .catch(err => console.error('Cache put error:', err));
            
          return response;
        })
        .catch(() => {
          // Fall back to cache
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // If offline and requesting a page, show offline page
              if (event.request.mode === 'navigate') {
                return caches.match('/offline.html');
              }
              
              // No cached response
              return new Response('Network error', {
                status: 408,
                headers: { 'Content-Type': 'text/plain' }
              });
            });
        })
    );
  });
}
