const installBtn = document.querySelector('.install')
const beerList = document.querySelector('.beers')

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
if(beerList) {

fetch('https://api.punkapi.com/v2/beers/random')
.then(resp => resp.json())
.then(resp => {
  resp.forEach((beer) => {
    let template = ``
    template = `
    <li id="${beer.id}">${beer.name}</li>
    `
  beerList.innerHTML += template
  })
})
}

//NOTIFICATION
const notifyMe = () => {
  const options = {
    body: "Envoyé par Hazem",
    icon: "/icons/favicon-32x32.png",
    vibrate: [200,100,200,100,200,100,200],
    url: "https://www.lesoir.be"
  }
  if(!("Notification" in window)) {
    alert('Pas de notification dans ce navigateur')
  } else if (Notification.permission === "granted") {
    console.log("Notification possible");
    let myNotification = new Notification('Hi me!', options)
  } else { //demande de permission
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Modification possible")
        let myNotification = new Notification('Oh, thank you!', options)
      }
    })
  }
}

if(Notification.permission !== 'granted') {
  if(confirm('Recevoir notifications ?')) {
    notifyMe()
  }
}

const $btnNotify = document.querySelector('.notification').addEventListener('click', e => {
  e.preventDefault()
  notifyMe()
})