
// Service Worker for Brio Sales Management
const CACHE_NAME = 'brio-sales-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/lovable-uploads/6ad16794-edeb-45cd-bc70-cbf5842c34aa.png',
  '/lovable-uploads/05981032-1579-4d42-815d-7970b7d6939a.png',
  '/lovable-uploads/c3826d58-1386-4834-9056-11611e468d2a.png'
];

// Basic passthrough service worker
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.claim();
});

// Passthrough fetch for all environments
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
