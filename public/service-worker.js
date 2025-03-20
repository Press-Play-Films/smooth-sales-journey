// Service Worker for Brio Sales Management
const CACHE_NAME = 'brio-sales-cache-v1';
const DEBUG = false; // Set to false for production

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

// Resources to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/lovable-uploads/6ad16794-edeb-45cd-bc70-cbf5842c34aa.png',
  '/lovable-uploads/05981032-1579-4d42-815d-7970b7d6939a.png',
  '/lovable-uploads/c3826d58-1386-4834-9056-11611e468d2a.png'
];

// Installation event - cache key assets
self.addEventListener('install', event => {
  debug('Service Worker installing');
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        debug('Cache opened, adding resources', urlsToCache);
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        debug('Initial cache complete');
      })
      .catch(err => {
        debug('Cache installation error', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  debug('Service Worker activating');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      debug('Found caches', cacheNames);
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          debug('Deleting old cache', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      debug('Service Worker activated and controlling');
      return self.clients.claim();
    })
  );
});

// Communicate with clients
const notifyClients = (message) => {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      debug('Sending message to client', { clientId: client.id, message });
      client.postMessage(message);
    });
  });
};

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    debug('Ignoring non-GET request', event.request.method);
    return;
  }
  
  // Skip browser-sync and other dev resources
  if (event.request.url.includes('/browser-sync/') || 
      event.request.url.includes('sockjs-node')) {
    debug('Ignoring dev resource', event.request.url);
    return;
  }
  
  // Debug request
  debug('Fetch event for', event.request.url);
  
  // Basic network-first strategy with fallbacks
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          debug('Non-cacheable response', {
            status: response.status,
            type: response.type,
            url: response.url
          });
          return response;
        }
        
        debug('Network response ok, caching', response.url);
        
        // Clone the response
        const responseToCache = response.clone();
        
        // Cache the new resource
        caches.open(CACHE_NAME)
          .then(cache => {
            debug('Updating cache for', event.request.url);
            cache.put(event.request, responseToCache);
          })
          .catch(err => {
            debug('Cache put error', err);
            console.error('Cache put error:', err);
          });
          
        return response;
      })
      .catch(error => {
        debug('Network request failed, trying cache', {
          url: event.request.url,
          error: error.message
        });
        
        // Fall back to cache
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              debug('Serving from cache', event.request.url);
              return cachedResponse;
            }
            
            debug('No cache found for', event.request.url);
            
            // If offline and requesting a page, show offline page
            if (event.request.mode === 'navigate') {
              debug('Returning offline page for navigation request');
              return caches.match('/offline.html');
            }
            
            // No cached response
            debug('No offline fallback, returning error response');
            return new Response('Network error', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  debug('Received message from client', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    debug('Skip waiting command received');
    self.skipWaiting();
  }
  
  // Ping/pong for debugging service worker connectivity
  if (event.data && event.data.type === 'PING') {
    debug('Ping received, sending pong');
    event.ports[0].postMessage({
      type: 'PONG',
      timestamp: Date.now()
    });
  }
});

debug('Service Worker script evaluated');
