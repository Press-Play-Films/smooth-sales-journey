
// Service Worker for Brio Sales Management
const CACHE_NAME = 'brio-sales-cache-v4'; // Incremented cache version
const DEBUG = false; // Set to false for production

// Environment detection - simplified and more robust
const isDevOrPreview = () => {
  try {
    return location.hostname === 'localhost' || 
           location.hostname.includes('lovable.') || 
           location.hostname.includes('lovableproject.com');
  } catch (e) {
    return false; // Safer fallback
  }
};

// Debug helper with fallbacks to prevent errors
const debug = (message, data) => {
  if (DEBUG) {
    try {
      const timestamp = new Date().toISOString();
      if (data) {
        console.log(`[ServiceWorker][${timestamp}] ${message}`, data);
      } else {
        console.log(`[ServiceWorker][${timestamp}] ${message}`);
      }
    } catch (e) {
      // Silent fail to prevent breaking in production
    }
  }
};

// Safe operation helper to catch and handle errors
const safeOperation = (operation, fallback) => {
  try {
    return operation();
  } catch (error) {
    debug('Operation failed', error);
    if (typeof fallback === 'function') {
      return fallback(error);
    }
    return null;
  }
};

// Handle fetch event with stale-while-revalidate strategy for better performance
const handleFetch = (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip browser-sync and other dev resources
  if (event.request.url.includes('/browser-sync/') || 
      event.request.url.includes('sockjs-node')) return;
  
  // Skip chrome-extension URLs and other non-http/https URLs
  if (!event.request.url.startsWith('http')) return;
  
  // Apply stale-while-revalidate for HTML navigation requests
  if (event.request.mode === 'navigate' ||
      (event.request.method === 'GET' && 
       event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return fetch(event.request).then(networkResponse => {
          // Update cache with fresh content
          if (networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => {
          // Fallback to cache if network fails
          return caches.match(event.request);
        });
      })
    );
    return;
  }
  
  // For other requests, try network first with cache fallback
  event.respondWith(
    fetch(event.request).then(response => {
      // Check if valid response and cache it
      if (response && response.status === 200) {
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
      }
      return response;
    }).catch(() => {
      return caches.match(event.request);
    })
  );
};

// Handle activate event to clean up old caches
const handleActivate = (event) => {
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
};

// Handle install event
const handleInstall = (event) => {
  self.skipWaiting();
  
  const urlsToCache = [
    '/',
    '/index.html',
    '/offline.html',
    '/favicon.ico',
    '/manifest.json'
  ];
  
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
};

// Self-destructing service worker for development/preview
const setupDevEnvironment = () => {
  self.addEventListener('install', event => {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }).then(() => self.registration.unregister())
        .then(() => self.clients.claim())
    );
  });
  
  self.addEventListener('fetch', event => {
    // Let browser handle requests normally in dev
    return;
  });
};

// Production environment setup
const setupProdEnvironment = () => {
  self.addEventListener('install', handleInstall);
  self.addEventListener('activate', handleActivate);
  self.addEventListener('fetch', handleFetch);
};

// Initialize based on environment
if (isDevOrPreview()) {
  setupDevEnvironment();
} else {
  setupProdEnvironment();
}

// Handle message events
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

debug('Service Worker initialized');
