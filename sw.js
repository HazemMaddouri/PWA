const version = 1.00

const cacheName = "demo-v1"

const filesToCache = [
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
  'https://api.punkapi.com/v2/beers?per_page=10',
  'style.css'
]

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(cacheName)
  await cache.addAll(resources)
}

self.addEventListener('install', e => {
  console.log('Install SW version :' + version);
  e.waitUntil(
    addResourcesToCache(filesToCache)
  )
  return self.skipWaiting()
})

self.addEventListener('activate', e => {
  console.log('Activate SW version :' + version);
  return self.clients.claim()
})

//simple fetch general
self.addEventListener('fetch', e => {
  const requestUrl = new URL(
    e.request.url
  )
  console.log(requestUrl);
  e.respondWith(caches.match(requestUrl))
})