export function registerServiceWorker() {
  window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then(() => console.log('Service Worker registered successfully.'))
        .catch((error) =>
          console.error('Service Worker registration failed:', error)
        );

      navigator.serviceWorker.ready.then((registration) => {
        console.log('Service Worker ready.');
        registration.update();
      });
    }
  });
}
