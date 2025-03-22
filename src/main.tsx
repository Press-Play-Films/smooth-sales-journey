
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

console.log('Application starting...');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
} else {
  const root = createRoot(rootElement);
  
  // Wrap in try/catch to log any rendering errors
  try {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('Application rendered successfully');
  } catch (error) {
    console.error('Failed to render application:', error);
  }
}
