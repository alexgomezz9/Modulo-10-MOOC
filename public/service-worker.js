const CACHE_NAME = 'shooter-game-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/game.css',
  '/main.js',
  '/assets/icon-192x192.png',
  '/assets/icon-512x512.png',
  '/Game.js',
  '/Entity.js',
  '/Character.js',
  '/Player.js',
  '/Opponent.js',
  '/Shot.js'
];

// Instalación del Service Worker y cacheo de recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Fallo en cachear recursos durante la instalación:', error);
      })
  );
});

// Intercepción de solicitudes y servir recursos cacheados
self.addEventListener('fetch', event => {
  if (event.request.url.startsWith('chrome-extension') || event.request.url.includes('chrome-extension')) {
    return; // Ignorar las solicitudes de las extensiones de Chrome
  }
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return networkResponse;
        }).catch(error => {
          console.error('Fallo en la solicitud de red:', error);
          // Opcionalmente, devolver un recurso de reserva o un mensaje de error
          return new Response('Error en la solicitud de red', {
            status: 404,
            statusText: 'Not Found'
          });
        });
      }).catch(error => {
        console.error('Fallo en el fetch handler:', error);
        // Opcionalmente, devolver un recurso de reserva o un mensaje de error
        return new Response('Error en el fetch handler', {
          status: 404,
          statusText: 'Not Found'
        });
      })
  );
});

// Activación del Service Worker y limpieza de caches antiguas
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
