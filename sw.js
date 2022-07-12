const VERSION = 'v1';

self.addEventListener('install', event => { // self es como el this para los service workers y ponemos un escucha para install que es cuando el navegador instala los service workers
  event.waitUntil(precache()); // espera a completar el precache
});

self.addEventListener('fetch', event => { // escuchamos cuando se realize una petición
  const request = event.request; // capturamos la petición
  // solo me interesa las peticiones get porque las demás conllevan datos del usuario
  if (request.method !== 'GET') {
    console.log ('No es una petición GET');
    return // si no es get entonces no hago nada
  }
  // dado que es un get buscamos en el cache
  event.respondWith(cacheResponse(request));

  // actualizemos el cache
  event.waitUntil(updateCache(request));

});

async function precache() {
  const cache = await caches.open(VERSION); // devuelve una promesa que es la instancia de un cache
  return cache.addAll( // estas son todos mis archivos o recursos
    [
      './index.html',
      './assets/index.js',
      './assets/MediaPlayer.js',
      './assets/plugins/AutoPlay.js',
      './assets/plugins/AutoPause.js',
      './assets/index.css',
      './assets/BigBuckBunny.mp4',
    ]
  );
}

async function cacheResponse(request) {
  const cache = await caches.open(VERSION); // abro el cache 
  const response = await cache.match(request); // devuelvo lo que coincida con la petición que este en el cache , si no hay devuelve null
  if (response) {
    console.log("I have an answer in the cache");
    return response;
  } else {
    console.log("I don't have an answer in the cache");
    return fetch(request); 
  }// si no hay en el cache entonces mejor hago la petición al servidor
}

// The reason this error is because the video is being partially loaded and it seems that cache.put does not support partial requests (status code 206). So, I added a ternary operator which caches only the responses which status is 200.
async function updateCache(request) {
  const cache = await caches.open(VERSION); // abro el cache
  const response = await fetch(request); // hago la petición al servidor
  return response.status === 200
        ? cache.put(request, response) // actualizo el cache con la petición y la respuesta
        : new Promise ( (resolve, reject) => resolve("Ups") ); // si la respuesta no es 200 no actualizo el cache
}