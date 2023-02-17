// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyC7kIss1ZK8vT2kyG5hB-DBgGfNdiqEjNk",
  authDomain: "ssafy-chat-97b5d.firebaseapp.com",
  databaseURL: "https://ssafy-chat-97b5d-default-rtdb.firebaseio.com",
  projectId: "ssafy-chat-97b5d",
  storageBucket: "ssafy-chat-97b5d.appspot.com",
  messagingSenderId: "168935071254",
  appId: "1:168935071254:web:c80eedbc158da3492c5f37"
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
  });
