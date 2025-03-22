
import { debug, LogLevel, initGlobalErrorHandling, initNetworkMonitoring, getBrowserInfo, debugServiceWorker } from './debug';

// Safe DOM operations wrapper with more robust error handling
export const safeDomOperations = (fn: () => void, fallback: () => void) => {
  try {
    fn();
  } catch (error) {
    debug('DOM operation failed', { error }, LogLevel.ERROR);
    fallback();
  }
};

// Aggressively unregister any existing service workers
export const forceUnregisterServiceWorkers = () => {
  if ('serviceWorker' in navigator) {
    debug('Forcefully unregistering all service workers', null, LogLevel.INFO);
    navigator.serviceWorker.getRegistrations()
      .then(registrations => {
        const unregisterPromises = registrations.map(registration => {
          debug('Unregistering service worker', { scope: registration.scope }, LogLevel.INFO);
          return registration.unregister();
        });
        return Promise.all(unregisterPromises);
      })
      .then(results => {
        debug('Service worker unregistration complete', { count: results.length }, LogLevel.INFO);
        if (results.some(result => result === true)) {
          // Reload the page if any service workers were unregistered to clear cache
          window.location.reload();
        }
      })
      .catch(error => {
        debug('Error unregistering service workers', { error }, LogLevel.ERROR);
      });
  }
};

// Initialize debugging utilities without circular dependencies
export const initApp = () => {
  try {
    // Initialize core functionality first
    debug('Application starting', { timestamp: new Date().toISOString() }, LogLevel.INFO);
    
    // Always check for and unregister service workers in development/preview
    const isDevOrPreviewEnv = window.location.hostname.includes('localhost') || 
                             window.location.hostname.includes('lovable.ai') || 
                             window.location.hostname.includes('lovable.app') || 
                             window.location.hostname.includes('lovableproject.com');
    
    if (isDevOrPreviewEnv) {
      forceUnregisterServiceWorkers();
    }
    
    // Initialize error handling and monitoring
    initGlobalErrorHandling();
    initNetworkMonitoring();
    getBrowserInfo();
    
    // Register service worker safely in production only, never in dev/preview environments
    if (import.meta.env.PROD && !isDevOrPreviewEnv) {
      registerServiceWorker();
    } else {
      debug('ServiceWorker not registered in development/preview mode', null, LogLevel.INFO);
    }
  } catch (error) {
    console.error('Critical error during application initialization:', error);
    // Show a simple error message if initialization fails completely
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="text-align: center; padding: 2rem; font-family: sans-serif;">
          <h2 style="color: #e11d48;">Application Initialization Failed</h2>
          <p>Please try refreshing the page. If the problem persists, contact support.</p>
          <button style="margin-top: 1rem; padding: 0.5rem 1rem; background: #1e3a8a; color: white; border: none; border-radius: 0.25rem;"
            onclick="window.location.reload()">
            Refresh Page
          </button>
        </div>
      `;
    }
  }
};

// Unregister any existing service workers
export const unregisterServiceWorkers = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let registration of registrations) {
        registration.unregister();
        debug('ServiceWorker unregistered', { scope: registration.scope }, LogLevel.INFO);
      }
    }).catch(error => {
      debug('Error unregistering ServiceWorker', { error }, LogLevel.ERROR);
    });
  }
};

// Preload critical resources
export const preloadResources = () => {
  const links = [
    '/lovable-uploads/6ad16794-edeb-45cd-bc70-cbf5842c34aa.png',
    '/lovable-uploads/05981032-1579-4d42-815d-7970b7d6939a.png',
    '/lovable-uploads/c3826d58-1386-4834-9056-11611e468d2a.png'
  ];
  
  debug('Preloading resources', { count: links.length }, LogLevel.DEBUG);
  
  links.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'image';
    document.head.appendChild(link);
  });
  
  debug('Resources preloaded successfully', null, LogLevel.DEBUG);
};

// Register service worker safely
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && 
      location.hostname !== 'localhost') {
    window.addEventListener('load', () => {
      debug('Registering service worker...', null, LogLevel.INFO);
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          debug('ServiceWorker registration successful', {
            scope: registration.scope
          }, LogLevel.INFO);
          
          // Debug service worker status
          debugServiceWorker();
        })
        .catch(error => {
          debug('ServiceWorker registration failed', error, LogLevel.ERROR);
        });
    });
  } else {
    debug('ServiceWorker not registered - either not supported or on localhost', null, LogLevel.WARN);
  }
};
