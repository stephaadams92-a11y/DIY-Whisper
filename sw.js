const CACHE_NAME = 'diy-whisper-v1';
const urlsToCache = [
  'index.html',
  'menu.html',
  'notes.html',
  'howto.html',
  'painting.html',
  'painting-results.html',
  'wallpapering.html',
  'wallpapering-results.html',
  'tiling.html',
  'tiling-results.html',
  'flooring.html',
  'flooring-results.html',
  'woodwork.html',
  'woodwork-results.html',
  'plastering.html',
  'plastering-results.html',
  'electrics.html',
  'electrics-results.html',
  'plumbing.html',
  'plumbing-results.html',
  'around-the-house.html',
  'around-the-house-results.html',
  'outdoors.html',
  'outdoors-results.html',
  'file-map.js',
  'main.js',
  'icon-192.png',
  'icon-512.png'
];

// Install event – cache all static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event – serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Activate event – clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});