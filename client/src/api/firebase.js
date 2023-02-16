// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging , getToken , onMessage } from "firebase/messaging" ; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA12FoQ6AFA8jRk-1PrG9Vn7DnWHI44lmY",
  authDomain: "howruthere-27527.firebaseapp.com",
  projectId: "howruthere-27527",
  storageBucket: "howruthere-27527.appspot.com",
  messagingSenderId: "702337522983",
  appId: "1:702337522983:web:86a16dfa4bed1721cadd02",
  measurementId: "G-7NS44FG21B"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
export { firebaseApp };

export const fetchToken = async () => {
  let tokenObj = {};
  await getToken(messaging, {vapidKey: 'BOsBHugfTQm8zXmpBSr2F_2foe5YXBQmEXAeutBOr6oPnDFzGK1yGKtjnKkAJR9n-Ke7lFJTxA1TIZ611JiMtFA'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      tokenObj = {currentToken}
      // 키쌍
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
  return tokenObj;
}


export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
        resolve(payload);
    });
});