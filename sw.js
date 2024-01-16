const version = 1.00

self.addEventListener('install', e => {
  console.log('Install SW version :' + version);
  return self.skipWaiting()
})

self.addEventListener('activate', e => {
  console.log('Activate SW version :' + version);
})