const installBtn = document.querySelector('.install')

let deferredPrompt = null

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault()
  deferredPrompt = e
  installBtn.classList.remove('hidden')
})

installBtn.addEventListener('click', e => {
  e.preventDefault()
  installBtn.classList.add('hidden')
  deferredPrompt.prompt()
})