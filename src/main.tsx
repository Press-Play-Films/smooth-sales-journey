
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App.tsx'
import './index.css'

// Preload critical resources
const preloadResources = () => {
  const links = [
    '/lovable-uploads/6ad16794-edeb-45cd-bc70-cbf5842c34aa.png',
    '/lovable-uploads/05981032-1579-4d42-815d-7970b7d6939a.png',
    '/lovable-uploads/c3826d58-1386-4834-9056-11611e468d2a.png'
  ];
  
  links.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

// Execute preload
preloadResources();

// Register service worker - conditionally based on environment
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('ServiceWorker registration successful:', registration);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, skip waiting
              newWorker.postMessage('skipWaiting');
            }
          });
        }
      });
      
      // Reload when the new Service Worker takes over
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  });
}

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center p-6 max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <p className="text-gray-700 mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-brio-navy text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

// Render the app
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  );
} else {
  console.error("Root element not found");
}
