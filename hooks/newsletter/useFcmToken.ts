// "use client";

// import { useEffect, useState, useCallback } from "react";
// import {
//   getMessaging,
//   getToken,
//   onMessage,
//   type Messaging,
// } from "firebase/messaging";
// import { firebaseApp } from "@/lib/firebase";
// import { useNotificationStore } from "@/store/notificationStore";

// export const useFcmToken = () => {
//   const [fcmToken, setFcmToken] = useState<string | null>(null);
//   const setHasNewNotification = useNotificationStore(
//     (s) => s.setHasNewNotification,
//   );

//   const getMessagingInstance = useCallback((): Messaging | null => {
//     if (typeof window === "undefined") return null;

//     try {
//       return getMessaging(firebaseApp);
//     } catch (error) {
//       console.error("Firebase Messaging initialization failed:", error);
//       return null;
//     }
//   }, []);

//   useEffect(() => {
//     const messaging = getMessagingInstance();
//     if (!messaging) return;

//     const fetchToken = async () => {
//       try {
//         if (!("Notification" in window) || !("serviceWorker" in navigator)) {
//           console.warn(
//             "This browser does not support notifications or service workers.",
//           );
//           return;
//         }

//         const permission = await Notification.requestPermission();
//         console.log("Permission:", Notification.permission);
//         if (permission !== "granted") {
//           console.warn("Notification permission was not granted.");
//           return;
//         }

//         const registration = await navigator.serviceWorker.register(
//           "/firebase-messaging-sw.js",
//           { scope: "/" },
//         );

//         await navigator.serviceWorker.ready;

//         const token = await getToken(messaging, {
//           vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
//           serviceWorkerRegistration: registration,
//         });

//         if (token) {
//           setFcmToken(token);
//         } else {
//           console.warn("No FCM registration token available.");
//         }
//       } catch (error) {
//         console.error("FCM Token Error:", error);
//       }
//     };

//     fetchToken();

//     // const unsubscribe = onMessage(messaging, async (payload) => {
//     //   setHasNewNotification(true);

//     //   try {
//     //     const registration = await navigator.serviceWorker.ready;

//     //     const title =
//     //       payload.notification?.title || payload.data?.title || "Clothify";

//     //     const body =
//     //       payload.notification?.body ||
//     //       payload.data?.body ||
//     //       "New update available";

//     //     const options: NotificationOptions = {
//     //       body,
//     //       icon: "/favicon.ico",
//     //       badge: "/favicon.ico",
//     //       requireInteraction: true,
//     //       data: {
//     //         url: payload.data?.url || "/",
//     //       },
//     //     };

//     //     const image = payload.data?.imageUrl;

//     //     if (image) {
//     //       (options as NotificationOptions & { image: string }).image = image;
//     //     }

//     //     await registration.showNotification(title, options);
//     //   } catch (error) {
//     //     console.error("Foreground notification display failed:", error);
//     //   }
//     // });

//     const unsubscribe = onMessage(messaging, async (payload) => {
//       console.log("FCM MESSAGE RECEIVED:", payload);
//       setHasNewNotification(true);

//       try {
//         const registration = await navigator.serviceWorker.ready;

//         const title =
//           payload.notification?.title || payload.data?.title || "Clothify";

//         const body =
//           payload.notification?.body ||
//           payload.data?.body ||
//           "New update available";

//         await registration.showNotification(title, {
//           body,
//           icon: "/favicon.ico",
//           data: {
//             url: payload.data?.url || "/",
//           },
//         });
//       } catch (error) {
//         console.error("Foreground notification error:", error);
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [getMessagingInstance, setHasNewNotification]);

//   return { fcmToken };
// };

"use client";

import { useEffect, useState } from "react";
import {
  getMessaging,
  getToken,
  onMessage,
  type Messaging,
} from "firebase/messaging";
import { firebaseApp } from "@/lib/firebase";
import { useNotificationStore } from "@/store/notificationStore";

export const useFcmToken = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const setHasNewNotification = useNotificationStore(
    (s) => s.setHasNewNotification,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    let messaging: Messaging;

    try {
      messaging = getMessaging(firebaseApp);
    } catch (error) {
      console.error("Firebase Messaging initialization failed:", error);
      return;
    }

    const fetchToken = async () => {
      try {
        if (!("Notification" in window) || !("serviceWorker" in navigator)) {
          console.warn(
            "This browser does not support notifications or service workers.",
          );
          return;
        }

        const permission = await Notification.requestPermission();
        console.log("Permission:", Notification.permission);

        if (permission !== "granted") {
          console.warn("Notification permission was not granted.");
          return;
        }

        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
          { scope: "/" },
        );

        await navigator.serviceWorker.ready;

        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: registration,
        });

        if (token) {
          setFcmToken(token);
        } else {
          console.warn("No FCM registration token available.");
        }
      } catch (error) {
        console.error("FCM Token Error:", error);
      }
    };

    fetchToken();

    const unsubscribe = onMessage(messaging, async (payload) => {
      console.log("FCM MESSAGE RECEIVED:", payload);
      setHasNewNotification(true);

      try {
        const registration = await navigator.serviceWorker.ready;

        const title =
          payload.notification?.title || payload.data?.title || "Clothify";

        const body =
          payload.notification?.body ||
          payload.data?.body ||
          "New update available";

        await registration.showNotification(title, {
          body,
          icon: "/favicon.ico",
          badge: "/favicon.ico",
          requireInteraction: true,
          data: {
            url: payload.data?.url || "/",
          },
        });
      } catch (error) {
        console.error("Foreground notification error:", error);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setHasNewNotification]);

  return { fcmToken };
};
