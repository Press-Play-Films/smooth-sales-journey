import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App.tsx'
import './index.css'
import { debug, LogLevel, initGlobalErrorHandling, initNetworkMonitoring, getBrowserInfo, debugServiceWorker } from './utils/debugUtils'

// Safe DOM operations wrapper with more robust error handling
const safeDomOperations = (fn: () => void, fallback: () => void) => {
  try {
    fn();
  } catch (error) {
    debug('DOM operation failed', { error }, LogLevel.ERROR);
    fallback();
  }
};

// Initialize debugging utilities without circular dependencies
const initApp = () => {
  // Initialize core functionality first
  debug('Application starting', { timestamp: new Date().toISOString() }, LogLevel.INFO);
  
  // Initialize error handling and monitoring
  initGlobalErrorHandling();
  initNetworkMonitoring();
  getBrowserInfo();
  
  // Enhanced rendering with DOM node cleanup
  renderApp();
  
  // Register service worker safely in production only
  if (import.meta.env.PROD) {
    registerServiceWorker();
  } else {
    debug('ServiceWorker not registered in development mode', null, LogLevel.INFO);
  }
};

// Preload critical resources
const preloadResources = () => {
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
const registerServiceWorker = () => {
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

// Enhanced error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
  // Log the error when it occurs
  debug('Error boundary caught an error', {
    message: error.message,
    stack: error.stack
  }, LogLevel.ERROR);
  
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center p-6 max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <p className="text-gray-700 mb-4">{error.message}</p>
        <div className="bg-gray-100 p-4 rounded mb-4 text-left overflow-auto max-h-60">
          <pre className="text-xs text-gray-800">{error.stack}</pre>
        </div>
        <button
          onClick={() => {
            debug('Error boundary reset attempted', null, LogLevel.INFO);
            resetErrorBoundary();
          }}
          className="px-4 py-2 bg-brio-navy text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

// Improved rendering with DOM cleanup first
const renderApp = () => {
  // Log when the app starts rendering
  debug('Rendering application root component', null, LogLevel.INFO);

  // Find the root element
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    debug('Root element not found', null, LogLevel.ERROR);
    throw new Error("Failed to find the root element");
  }

  // Clean up any existing content before rendering
  try {
    // More thorough cleanup - remove all children one by one
    while (rootElement.firstChild) {
      rootElement.removeChild(rootElement.firstChild);
    }
    debug('Root element cleared successfully', null, LogLevel.DEBUG);
  } catch (error) {
    debug('Error clearing root element', { error }, LogLevel.WARN);
    // Try simple innerHTML clear as fallback
    rootElement.innerHTML = '';
  }

  // Create and render with proper error handling
  try {
    const root = createRoot(rootElement);
    root.render(
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onReset={() => {
          debug('Error boundary reset', null, LogLevel.INFO);
          // Use reload rather than navigation to ensure clean slate
          window.location.reload();
        }}
        onError={(error, info) => {
          debug('Error caught by ErrorBoundary', {
            error,
            componentStack: info.componentStack
          }, LogLevel.ERROR);
        }}
      >
        <App />
      </ErrorBoundary>
    );
    debug('Root component rendered successfully', null, LogLevel.INFO);
  } catch (error) {
    debug('Critical error during React rendering', { error }, LogLevel.ERROR);
    // Show a simple error message if React fails to render at all
    rootElement.innerHTML = `
      <div style="text-align: center; padding: 2rem; font-family: sans-serif;">
        <h2 style="color: #e11d48;">Unable to load application</h2>
        <p>Please try refreshing the page. If the problem persists, contact support.</p>
        <button style="margin-top: 1rem; padding: 0.5rem 1rem; background: #1e3a8a; color: white; border: none; border-radius: 0.25rem;"
          onclick="window.location.reload()">
          Refresh Page
        </button>
      </div>
    `;
  }
};

// Start the application
initApp();
