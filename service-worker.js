const CACHE_NAME = "tournyx-cache-v1";

// Add ALL your important files here
const ASSETS_TO_CACHE = [
  "/tournyx/",
  "/tournyx/index.html",
  "/tournyx/style.css",
  "/tournyx/app.js",
  "/tournyx/icons/icon-192.png",
  "/tournyx/icons/icon-512.png"
];

// INSTALL — cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching app files...");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ACTIVATE — delete old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// FETCH — serve cached files when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
