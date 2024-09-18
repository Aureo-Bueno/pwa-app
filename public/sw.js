const CACHE_NAME = "my-cache";

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        cache.addAll(["/index.html"]).then(() => self.skipWaiting())
      )
  );
});

self.addEventListener("fetch", (event) => {
  console.log(`Service Worker fetching: ${event.request.url}`);
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cacheResponse) => {
        const response = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return cacheResponse || response;
      });
    })
  );
});

const firstCache = async (request) => {
  const cacheResponse = await caches.match(request);

  if (cacheResponse) {
    return cacheResponse;
  }

  const response = await fetch(request);
  updateCache(request, response.clone());

  return response;
};

const firstNetwork = async (request) => {
  const response = await fetch(request);

  if (response) {
    updateCache(request, response.clone());
  }

  const responseCache = await caches.match(request);

  return responseCache;
};

const updateCache = async (request, response) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};
