
/**
 * Web Application Configuration
 * Ensures the app behaves as a web application, not a standalone app
 */

export const webAppConfig = {
  // Disable PWA features for web-only behavior
  enablePWA: false,
  
  // Web-specific settings
  allowExternalLinks: true,
  enableAnalytics: true,
  enableSEO: true,
  
  // Demo mode settings
  demoMode: true,
  simulateBackend: true,
  showDemoIndicators: true,
  
  // API configuration for demo
  apiBaseUrl: window.location.origin + '/api', // Would point to real backend
  wsUrl: 'wss://' + window.location.host + '/ws', // Would point to real WebSocket
  
  // Features enabled in demo
  features: {
    realTimeUpdates: true,
    clientEngagement: true,
    salesTracking: true,
    teamManagement: true,
    analytics: true,
    browserCompatibility: true
  }
};

// Initialize web app specific behaviors
export const initializeWebApp = () => {
  console.log('🌐 Initializing Web Application');
  
  // Remove any app-like behaviors
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister();
        console.log('🌐 Unregistered service worker for web app mode');
      });
    });
  }
  
  // Set web app meta tags
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
  }
  
  // Remove app manifest to prevent "add to home screen" prompts
  const manifest = document.querySelector('link[rel="manifest"]');
  if (manifest) {
    manifest.remove();
    console.log('🌐 Removed app manifest for web app mode');
  }
  
  // Add web app identifier
  document.documentElement.classList.add('web-app-mode');
  
  console.log('🌐 Web Application initialized successfully');
};
