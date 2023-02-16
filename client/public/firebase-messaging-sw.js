// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyA12FoQ6AFA8jRk-1PrG9Vn7DnWHI44lmY",
    authDomain: "howruthere-27527.firebaseapp.com",
    projectId: "howruthere-27527",
    storageBucket: "howruthere-27527.appspot.com",
    messagingSenderId: "702337522983",
    appId: "1:702337522983:web:86a16dfa4bed1721cadd02",
    measurementId: "G-7NS44FG21B"
  };

  firebase.initializeApp(firebaseConfig);
  
  // Retrieve firebase messaging
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(messaging, (payload) => {
    console.log('[Firebase-messaging-sw.js] Received background message ', payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "./favicon.ico",
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
    self.addEventListener('notificationclick', event => {
      event.notification.close();
      event.waitUntil(self.clients.openWindow('https://www.naver.com'))
    })
  });
