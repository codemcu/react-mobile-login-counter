const self = this;

const CACHE_NAME = "mobile-login-counter";
const urlsToCache = ["index.html", "offline.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cachesNames) =>
      Promise.all(
        cachesNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          } else {
            return caches;
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request, { ignoreSearch: true })
      .then((response) => {
        return (
          response ||
          fetch(event.request).catch(() => caches.match("offline.html"))
        );
      })
      .catch((err) => console.log(err, event.request))
  );
});
