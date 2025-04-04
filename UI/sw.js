const CACHE_NAME = '8787-cache-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    'https://raw.githubusercontent.com/manik1312006/8787/refs/heads/main/LOGO.webp'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => name !== CACHE_NAME)
                        .map(name => caches.delete(name))
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                return cachedResponse || fetch(event.request);
            })
    );
});

// Push notification event
self.addEventListener('push', event => {
    const options = {
        body: event.data.text(),
        icon: 'https://raw.githubusercontent.com/manik1312006/8787/refs/heads/main/LOGO.webp',
        badge: 'https://raw.githubusercontent.com/manik1312006/8787/refs/heads/main/LOGO.webp',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '8787-notification'
        }
    };

    event.waitUntil(
        self.registration.showNotification('8787', options)
    );
});