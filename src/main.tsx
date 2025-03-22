
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import './index.css';
import App from './App';
import ErrorFallback from './components/error/ErrorFallback';

// Very simple initialization to prevent any circular dependencies
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
  document.body.innerHTML = '<div>Could not find root element</div>';
} else {
  try {
    console.log('Application starting...');
    
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary 
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.reload()}
        >
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    
    console.log('Application rendered successfully');
  } catch (error) {
    console.error('Critical initialization error:', error);
    rootElement.innerHTML = `
      <div style="text-align: center; padding: 2rem; font-family: sans-serif;">
        <h2 style="color: #e11d48;">Application Error</h2>
        <p>There was a problem loading the application.</p>
        <button 
          style="margin-top: 1rem; padding: 0.5rem 1rem; background: #1e3a8a; color: white; border: none; border-radius: 0.25rem;"
          onclick="window.location.reload()">
          Refresh Page
        </button>
      </div>
    `;
  }
}
