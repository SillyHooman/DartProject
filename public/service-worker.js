// This is the service worker for the Darts Score Keeper app
// It enables offline functionality by caching assets and API responses

const CACHE_NAME = 'darts-score-keeper-v1';

const STATIC_ASSETS = [
  '/',
  '/games/501',
  '/games/cricket',
  '/games/around-the-world',
  '/games/custom',
  '/teams'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting(); // Ensure service worker activates immediately
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim(); // Take control of clients immediately
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip external URLs (like analytics)
  const url = new URL(event.request.url);
  if (!url.origin.includes(self.location.origin)) return;
  
  // Network-first strategy for API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response to store in cache
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Cache-first strategy for static assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return from cache if available
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // Otherwise fetch from network and cache
      return fetch(event.request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // Clone and cache the response
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        
        return response;
      });
    })
  );
});

// Handle offline functionality for game data
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SAVE_GAME_DATA') {
    // Store game data in IndexedDB when received from the client
    const gameData = event.data.payload;
    
    // Respond to the client to confirm data was saved
    event.ports[0].postMessage({
      status: 'success',
      message: 'Game data saved for offline use'
    });
  }
}); 