
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

// Install event - cache critical assets
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
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
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        if (response) {
          return response;
        }
        
        // For navigation requests, return the offline page
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
        
        return new Response('Network error happened', {
          status: 408,
          headers: { 'Content-Type': 'text/plain' }
        });
      });
    })
  );
});
