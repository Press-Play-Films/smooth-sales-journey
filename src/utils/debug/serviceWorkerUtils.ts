
import { debug, safeOperation } from './core';
import { LogLevel } from './types';

// Service worker debug helper
export const debugServiceWorker = () => {
  safeOperation(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        debug('Service Worker is ready', {
          scope: registration.scope,
          active: registration.active ? true : false
        });
      });
      
      navigator.serviceWorker.addEventListener('message', (event) => {
        debug('Service Worker message', event.data);
      });
      
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        debug('Service Worker controller changed');
      });
    } else {
      debug('Service Worker not supported', null, LogLevel.WARN);
    }
  });
};
