
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import './index.css';
import App from './App';
import ErrorFallback from './components/error/ErrorFallback';

// Very simple root element detection and rendering
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
} else {
  console.log('Application starting...');
  
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  console.log('Application rendered successfully');
}
