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
  deferredPrompt.userChoice.
    then(choice => {
      if (choice === 'accepted') {
        console.log("Installation accepted")
      } else {
        console.log("Installation refused")
      }
      deferredPrompt = null
    })
})

//affichage bieres
const beersList = document.querySelector('.beers')

fetch('https://api.punkapi.com/v2/beers?per_page=10')
.then(resp => resp.json())
.then(resp => {
  resp.forEach((beer) => {
    let template = ``
    template = `
    <li id="${beer.id}">${beer.name}</li>
    `
  beersList.innerHTML += template
  })
})