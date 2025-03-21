
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from '../App';
import ErrorFallback from '../components/error/ErrorFallback';
import { debug, LogLevel } from './debug';

// Improved rendering with DOM cleanup first
export const renderApp = () => {
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
