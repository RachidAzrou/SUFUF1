const cacheName = 'sufuf-app-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/imam.html',
  '/vrijwilliger.html',
  '/styles.css',
  '/images/logo.png',
  '/images/icon-192x192.png',
  '/images/icon-512x512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return cacheResponse || fetch(event.request);
    })
  );
});
