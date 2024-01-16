if('serviceWorker' in navigator) {
  window.addEventListener('load', e => {
    navigator.serviceWorker.register('sw.js')
    .then((reg) => {
      console.log("notify", 'Service worker is started ' + reg.scope)
    .catch(error => {
      console.log('alert', 'Service worker registration failed :' + error)
    })
    })
  })
} else {
  console.log("Votre navigateur n'a pas les services Workers")
}