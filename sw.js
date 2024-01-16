const version = 1.00

const cacheName = "demo-v1"

/*const filesToCache = [
  '/',
  'sw.js',
  '/index.html',
  'main.js',
  'manifest.json',
  'register-sw.js',
  '/icons/favicon.ico',
  '/icons/favicon-16x16.png',
  '/icons/favicon-32x32.png',
  '/icons/favicon-96x96.png',
  '/icons/favicon-256x256.png',
  'https://api.punkapi.com/v2/beers/random',
  'style.css'
]*/

const files2Cache2 = ['index.html']

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(cacheName)
  await cache.addAll(resources)
}

self.addEventListener('install', e => {
  console.log('Install SW version :' + version);
  e.waitUntil(
    addResourcesToCache(files2Cache2)
  )
  return self.skipWaiting()
})

self.addEventListener('activate', e => {
  console.log('Activate SW version :' + version);
  return self.clients.claim()
})

//Priorité au cache
const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request)

  return responseFromCache
}

//Priorité au réseau
const networkFirst = async (request) => {
  const responseFromNetwork = await fetch(request)
  .catch(() => {
    return caches.match(request)
  })
  return responseFromNetwork
}

///update cache
function updateCache(request) {
  return caches.open(cacheName).then(cache => {
      return fetch(request).then(response => {
          const resClone = response.clone()
          if (response.status < 400)
              return cache.put(request, resClone)
          return response
      })
  })
}

//simple fetch general
self.addEventListener('fetch', e => {
  const requestUrl = new URL(
      e.request.url
  )
  if(!requestUrl.href.includes("https://api")) {
      e.respondWith(cacheFirst(requestUrl))
  }
  else {
      e.respondWith(networkFirst(requestUrl))
  }
  updateCache(requestUrl)
})

//add push notifications
self.addEventListener('push', e => {
  if(!(self.Notification && self.Notification.permission === 'granted')) {
    return
  }

  console.log('test notification')
  const data = e.data.json() ?? {}
  //console.log(data)

  const myNotification = registration.showNotification(data.title, {
    body: data.message,
    tag:"simple-demo-notification",
    icon: "icons/favicon-96x96.png"
  })

  self.addEventListener('notificationclick', e => {
    e.notification.close()
    e.waitUntil(clients.openWindow(data.url))
  })
})