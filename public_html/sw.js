
//
//
/* global caches, Promise, url, fetch, cache, urlsToPrefetch */
//
var self=this;
//asignar nombre y versión de la cache
const CACHE_NAME= "v1_cache_cocinado_con";
//archivos a guardar en cache
var urlsToCache=[
    "./",
    "./css/styles.css",
    "./img/facebook.png",
    "./img/favicon.png",
    "./img/instagram.png",
    "./img/favicon.png",
    "./img/favicon.png",
    "./img/favicon.png",
    "./img/plato1.png",
    "./img/plato2.png",
    "./img/plato3.png",
    "./img/plato4.png",
    "./img/plato5.png",
    "./img/twitter.png",
    "./img/favicon-1024.png",
    "./img/favicon-256.png",
    "./img/favicon-32.png",
    "./img/favicon-512.png",
    "./img/favicon-144.png"            
];
//
//self.addEventListener('install', function(event) {
//  // Perform install steps
//  event.waitUntil(
//    caches.open(CACHE_NAME)
//      .then(function(cache) {
//        console.log('Opened cache');
//        return cache.addAll(urlsToCache);
//      })
//  );
//});
//
//self.addEventListener('fetch', function(event) {
//  event.respondWith(
//    caches.match(event.request)
//      .then(function(response) {
//        // Cache hit - return response
//        if (response) {
//          return response;
//        }
//        return fetch(event.request);
//      }
//    )
//  );
//});
//
//self.addEventListener('fetch', function(event) {
//  event.respondWith(
//    caches.match(event.request)
//      .then(function(response) {
//        // Cache hit - return response
//        if (response) {
//          return response;
//        }
//        // IMPORTANT: Clone the request. A request is a stream and
//        // can only be consumed once. Since we are consuming this
//        // once by cache and once by the browser for fetch, we need
//        // to clone the response.
//        var fetchRequest = event.request.clone();
//
//        return fetch(fetchRequest).then(
//          function(response) {
//            // Check if we received a valid response
//            if(!response || response.status !== 200 || response.type !== 'basic') {
//              return response;
//            }
//
//            // IMPORTANT: Clone the response. A response is a stream
//            // and because we want the browser to consume the response
//            // as well as the cache consuming the response, we need
//            // to clone it so we have two streams.
//            var responseToCache = response.clone();
//
//            caches.open(CACHE_NAME)
//              .then(function(cache) {
//                cache.put(event.request, responseToCache);
//              });
//
//            return response;
//          }
//        );
//      })
//    );
//});
//
//self.addEventListener('activate', function(event) {
//
//  var cacheAllowlist = ['pages-cache-v1', 'blog-posts-cache-v1'];
//
//  event.waitUntil(
//    caches.keys().then(function(cacheNames) {
//      return Promise.all(
//        cacheNames.map(function(cacheName) {
//          if (cacheAllowlist.indexOf(cacheName) === -1) {
//            return caches.delete(cacheName);
//          }
//        })
//      );
//    })
//  );
//});
//
//fetch(url, {
//  credentials: 'include'
//});
//
//cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
//  return new Request(urlToPrefetch, { mode: 'no-cors' });
//})).then(function() {
//  console.log('All resources have been fetched and cached.');
//});

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');


///////
//Evento install
//self permite recoger lo que hace el service worker
self.addEventListener('install', e=>{
    e.waitUntil(
            caches.open(CACHE_NAME)
            .then(cache=> {
                return cache.addAll(urlsToCache)
                .then(() =>{
                    self.skipWaiting();
                });
                
            })
            .catch(err => {
                console.log('No se ha registrado el cache',err);
           })
        );    
});


//Evento activate
self.addEventListener('activate', e =>{
    const cacheWhitelist=[CACHE_NAME];
    e.waitUntil(
            caches.keys()
            .then(cacheNames => {
                return Promise.all(
                        cacheNames.map(cacheName => {
                            if(cacheWhitelist.indexOf(cacheName === -1)){
                                return caches.delete(cacheName);
                            }                        
                        })
                        );
                    })
            .then(() => {
                self.clients.claim();
            })
            );
} );
//Evento fetch
self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res =>{
            if(res){
                //devolver datos desde cache
                return res;
            }
            return fetch(e.request);
        })
    );
});

 
fetch(url, {
  credentials: 'include'
});

cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
  return new Request(urlToPrefetch, { mode: 'no-cors' });
})).then(function() {
  console.log('All resources have been fetched and cached.');
});
 