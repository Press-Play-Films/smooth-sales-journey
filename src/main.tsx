
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App.tsx'
import './index.css'
import { debug, LogLevel, initGlobalErrorHandling, initNetworkMonitoring, getBrowserInfo, debugServiceWorker } from './utils/debugUtils'

// Safe DOM operations wrapper
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
  
  // Preload critical resources - wrapped in safe operation
  safeDomOperations(
    preloadResources,
    () => debug('Skipped resource preloading due to DOM issues', null, LogLevel.WARN)
  );
  
  // Register service worker safely
  if (import.meta.env.PROD) {
    registerServiceWorker();
  } else {
    debug('ServiceWorker not registered in development mode', null, LogLevel.INFO);
  }
  
  // Render the application with additional safeguards
  safeDomOperations(
    renderApp,
    () => {
      // Last resort rendering if normal rendering fails
      debug('Attempting emergency rendering...', null, LogLevel.WARN);
      const rootElement = document.getElementById("root");
      if (rootElement) {
        try {
          // Clear the root element first
          rootElement.innerHTML = '';
          const root = createRoot(rootElement);
          root.render(<App />);
          debug('Emergency rendering completed', null, LogLevel.INFO);
        } catch (error) {
          debug('Emergency rendering failed', { error }, LogLevel.ERROR);
          document.body.innerHTML = '<div class="error-fallback"><h1>Something went wrong</h1><p>The application could not be loaded. Please try refreshing the page.</p></div>';
        }
      }
    }
  );
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

// Render the application
const renderApp = () => {
  // Log when the app starts rendering
  debug('Rendering application root component', null, LogLevel.INFO);

  // Use createRoot for React 18
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    debug('Root element not found', null, LogLevel.ERROR);
    throw new Error("Failed to find the root element");
  }

  // Clean up any existing content before rendering
  if (rootElement.hasChildNodes()) {
    debug('Clearing root element before rendering', null, LogLevel.INFO);
    rootElement.innerHTML = '';
  }

  const root = createRoot(rootElement);
  root.render(
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onReset={() => {
        debug('Error boundary reset', null, LogLevel.INFO);
        window.location.href = '/';
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

  debug('Root component rendered', null, LogLevel.INFO);
};

// Start the application
initApp();
