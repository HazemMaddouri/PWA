if ("serviceWorker" in navigator) {
  window.addEventListener("load", (e) => {
    navigator.serviceWorker
      .register("sw.js")
      .then((reg) => {
        console.log("Service worker is registered. Scope: " + reg.scope);
      })
      .catch((error) => {
        console.error("Service worker registration failed: " + error);
      });
  });
} else {
  console.log("Votre navigateur n'a pas les services Workers");
}
