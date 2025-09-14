// Minimaler Push-Handler: zeigt Notification über die Notifications API
// MDN: ServiceWorkerRegistration.showNotification()  & Push API
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
// https://developer.mozilla.org/en-US/docs/Web/API/Push_API

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Web Push";
  const options = { body: data.body || "Hello from the server." };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  // Optional: Fokus/Öffnen der Seite
  event.waitUntil(clients.openWindow("/"));
});
