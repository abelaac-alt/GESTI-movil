const CACHE_NAME = "finanzas-cache-v3";

const ASSETS = [
  "/Finanzas-personales/",
  "/Finanzas-personales/index.html",
  "/Finanzas-personales/manifest.json",
  "/Finanzas-personales/icon-192.png",
  "/Finanzas-personales/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
