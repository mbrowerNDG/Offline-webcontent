const filesToCache = [
  '/',
  'assets/offline-style.css',
  'assets/style.css',
  'index.html',
  '/assets/offline.min.js',
  '/assets/js.js',
  'https://fonts.googleapis.com/css?family=Roboto',
  'https://homes.heritageshores.com/wp-content/uploads/2017/08/Slide-1.png',


];

const staticCacheName = 'offline-content';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      console.log('success')
      console.log(cache)
      return cache.addAll(filesToCache);

    })
  );
});
self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)


    }).catch(error => {

     return false;

    })
  );
});
