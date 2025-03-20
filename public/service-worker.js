
// Service Worker for Brio Sales Management
const CACHE_NAME = 'brio-sales-cache-v3'; // Incremented cache version
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

// Enhanced safe operation helper with timeout
const safeOperation = (fn, fallback, timeout = 5000) => {
  return new Promise((resolve) => {
    // Create timeout to prevent hanging operations
    const timeoutId = setTimeout(() => {
      debug('Operation timed out after ' + timeout + 'ms');
      if (typeof fallback === 'function') {
        resolve(fallback());
      } else {
        resolve(null);
      }
    }, timeout);
    
    // Attempt the operation
    try {
      const result = fn();
      
      // Handle both Promise and non-Promise returns
      if (result && typeof result.then === 'function') {
        result
          .then(data => {
            clearTimeout(timeoutId);
            resolve(data);
          })
          .catch(err => {
            clearTimeout(timeoutId);
            debug('Operation failed', err);
            if (typeof fallback === 'function') {
              resolve(fallback(err));
            } else {
              resolve(null);
            }
          });
      } else {
        // For synchronous functions
        clearTimeout(timeoutId);
        resolve(result);
      }
    } catch (error) {
      clearTimeout(timeoutId);
      debug('Operation threw exception', error);
      if (typeof fallback === 'function') {
        resolve(fallback(error));
      } else {
        resolve(null);
      }
    }
  });
};

// Installation event - cache key assets
self.addEventListener('install', event => {
  debug('Service Worker installing');
  
  // Force activation without waiting for all tabs to close
  self.skipWaiting();
  
  event.waitUntil(
    safeOperation(
      () => caches.open(CACHE_NAME)
        .then(cache => {
          debug('Cache opened, adding resources', urlsToCache);
          // Use addAll with error handling for individual files
          return Promise.all(
            urlsToCache.map(url => 
              cache.add(url).catch(err => {
                debug(`Failed to cache: ${url}`, err);
                // Continue despite individual file failures
                return Promise.resolve();
              })
            )
          );
        })
        .then(() => {
          debug('Initial cache complete');
        }),
      () => debug('Cache installation failed completely')
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  debug('Service Worker activating');
  
  event.waitUntil(
    safeOperation(
      () => caches.keys().then(cacheNames => {
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
      }),
      () => debug('Cache activation failed')
    )
  );
});

// Communicate with clients
const notifyClients = (message) => {
  safeOperation(
    () => {
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          debug('Sending message to client', { clientId: client.id, message });
          client.postMessage(message);
        });
      });
    }
  );
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
  
  // Skip chrome-extension URLs and other non-http/https URLs
  if (!event.request.url.startsWith('http')) {
    return;
  }
  
  // Debug request
  debug('Fetch event for', event.request.url);
  
  // Basic network-first strategy with fallbacks
  event.respondWith(
    safeOperation(
      () => fetch(event.request.clone())
        .then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            debug('Non-cacheable response', {
              status: response?.status,
              type: response?.type,
              url: response?.url
            });
            return response;
          }
          
          debug('Network response ok, caching', response.url);
          
          // Clone the response
          const responseToCache = response.clone();
          
          // Cache the new resource
          safeOperation(
            () => caches.open(CACHE_NAME)
              .then(cache => {
                debug('Updating cache for', event.request.url);
                return cache.put(event.request, responseToCache);
              })
              .catch(err => {
                debug('Cache put error', err);
              })
          );
            
          return response;
        })
        .catch(error => {
          debug('Network request failed, trying cache', {
            url: event.request.url,
            error: error.message
          });
          
          // Fall back to cache
          return safeOperation(
            () => caches.match(event.request)
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
              }),
            () => new Response('Service worker error', { 
              status: 500, 
              headers: { 'Content-Type': 'text/plain' } 
            })
          );
        }),
      () => new Response('Service worker critical error', { 
        status: 500, 
        headers: { 'Content-Type': 'text/plain' } 
      })
    )
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
    safeOperation(() => {
      event.ports[0].postMessage({
        type: 'PONG',
        timestamp: Date.now()
      });
    });
  }
});

debug('Service Worker script evaluated');
