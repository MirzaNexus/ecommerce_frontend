importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js",
);

self.addEventListener("install", () => {
  self.skipWaiting();
});

firebase.initializeApp({
  apiKey: "AIzaSyCAN3aM9dovgsZdmYrsGnj8EjfMcqMZYi4",
  authDomain: "clothify-ecommerce.firebaseapp.com",
  projectId: "clothify-ecommerce",
  storageBucket: "clothify-ecommerce.firebasestorage.app",
  messagingSenderId: "845985983288",
  appId: "1:845985983288:web:9ed6321f14dc7163b1efcd",
  measurementId: "G-YKWXSCY1MK",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("🔥 BACKGROUND MESSAGE RECEIVED:", payload);

  // ✅ Support BOTH notification + data payloads
  const title =
    payload.notification?.title || payload.data?.title || "Clothify";

  const body =
    payload.notification?.body || payload.data?.body || "New update available";

  const image = payload.data?.imageUrl;

  const options = {
    body,
    icon: "/favicon.ico",
    requireInteraction: true,

    // optional image (web support varies)
    ...(image ? { image } : {}),

    data: {
      url: payload.data?.url || "/",
    },
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(url) && "focus" in client) {
            return client.focus();
          }
        }
        return clients.openWindow(url);
      }),
  );
});
