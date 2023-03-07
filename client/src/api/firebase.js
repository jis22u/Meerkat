
import { initializeApp } from "firebase/app";
import { getMessaging , getToken , onMessage } from "firebase/messaging" ; 

const firebaseConfig = {
    apiKey: "AIzaSyA12FoQ6AFA8jRk-1PrG9Vn7DnWHI44lmY",
    authDomain: "howruthere-27527.firebaseapp.com",
    projectId: "howruthere-27527",
    storageBucket: "howruthere-27527.appspot.com",
    messagingSenderId: "702337522983",
    appId: "1:702337522983:web:86a16dfa4bed1721cadd02",
    measurementId: "G-7NS44FG21B"
  };


const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
export { firebaseApp };

export const fetchToken = async () => {
  let tokenObj = {};
  await getToken(messaging, {vapidKey: 'BOsBHugfTQm8zXmpBSr2F_2foe5YXBQmEXAeutBOr6oPnDFzGK1yGKtjnKkAJR9n-Ke7lFJTxA1TIZ611JiMtFA'}).then((currentToken) => {
    if (currentToken) {
      tokenObj = {currentToken}
    } 
  }).catch((err) => {
    console.log(err);
  });
  return tokenObj;
}


export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
        resolve(payload);
    });
});
