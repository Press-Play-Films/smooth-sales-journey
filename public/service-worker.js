
// Service Worker for Brio Sales Management
const CACHE_NAME = 'brio-sales-cache-v3'; // Incremented cache version
const DEBUG = false; // Set to false for production

// Environment detection
const isDevOrPreview = () => {
  return location.hostname.includes('localhost') || 
         location.hostname.includes('lovable.ai') || 
         location.hostname.includes('lovable.app') ||
         location.hostname.includes('lovableproject.com');
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

// Development environment handlers
const setupDevEnvironment = () => {
  debug('Development environment detected, skipping service worker installation');
  
  // Installation handler for development
  self.addEventListener('install', event => {
    self.skipWaiting();
  });
  
  // Activation handler for development - self-destruct
  self.addEventListener('activate', event => {
    debug('Development environment detected, self-destructing service worker');
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }).then(() => self.registration.unregister())
        .then(() => self.clients.claim())
    );
  });
  
  // Empty fetch handler to prevent caching in development
  self.addEventListener('fetch', event => {
    // No-op: let the browser handle all requests normally
    return;
  });
  
  debug('Service worker inactive for development/preview environment');
};

// Production environment setup
const setupProdEnvironment = () => {
  debug('Setting up production service worker');
  
  // Installation handler
  self.addEventListener('install', handleInstall);
  
  // Activation handler
  self.addEventListener('activate', handleActivate);
  
  // Fetch event handler
  self.addEventListener('fetch', handleFetch);
};

// Handle install event for production
const handleInstall = (event) => {
  debug('Service Worker installing');
  
  // Force activation without waiting for all tabs to close
  self.skipWaiting();
  
  event.waitUntil(
    safeOperation(
      () => caches.open(CACHE_NAME)
        .then(cache => {
          debug('Cache opened, adding resources');
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
};

// Handle activate event for production
const handleActivate = (event) => {
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
};

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

// Network request handler
const handleFetch = (event) => {
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
  
  // Network-first strategy
  event.respondWith(fetchFromNetworkFirst(event.request));
};

// Network-first fetch strategy with fallbacks
const fetchFromNetworkFirst = (request) => {
  return safeOperation(
    () => fetch(request.clone())
      .then(response => handleNetworkResponse(request, response))
      .catch(error => {
        debug('Network request failed, trying cache', {
          url: request.url,
          error: error.message
        });
        
        // Fall back to cache
        return fetchFromCache(request);
      }),
    () => new Response('Service worker critical error', { 
      status: 500, 
      headers: { 'Content-Type': 'text/plain' } 
    })
  );
};

// Handle successful network response
const handleNetworkResponse = (request, response) => {
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
        debug('Updating cache for', request.url);
        return cache.put(request, responseToCache);
      })
      .catch(err => {
        debug('Cache put error', err);
      })
  );
    
  return response;
};

// Fetch from cache with offline fallbacks
const fetchFromCache = (request) => {
  return safeOperation(
    () => caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          debug('Serving from cache', request.url);
          return cachedResponse;
        }
        
        debug('No cache found for', request.url);
        
        // If offline and requesting a page, show offline page
        if (request.mode === 'navigate') {
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
};

// Handle message events
const handleMessage = (event) => {
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
};

// List of URLs to cache on install
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/favicon.ico',
  '/manifest.json'
];

// Initialize service worker based on environment
if (isDevOrPreview()) {
  setupDevEnvironment();
} else {
  setupProdEnvironment();
}

// Message event handler
self.addEventListener('message', handleMessage);

debug('Service Worker script evaluated');
