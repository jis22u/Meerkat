
import { initializeApp } from "firebase/app";
import { getMessaging , getToken , onMessage } from "firebase/messaging" ; 

const firebaseConfig = {
  apiKey: "AIzaSyC7kIss1ZK8vT2kyG5hB-DBgGfNdiqEjNk",
  authDomain: "ssafy-chat-97b5d.firebaseapp.com",
  databaseURL: "https://ssafy-chat-97b5d-default-rtdb.firebaseio.com",
  projectId: "ssafy-chat-97b5d",
  storageBucket: "ssafy-chat-97b5d.appspot.com",
  messagingSenderId: "168935071254",
  appId: "1:168935071254:web:c80eedbc158da3492c5f37"
};


const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
export { firebaseApp };

export const fetchToken = async () => {
  let tokenObj = {};
  await getToken(messaging, {vapidKey: 'BEf1kJoCSU3jr11pXBUnqyzFr6osycs0PSAiE8n9rRHFXF6qrms2i7ML_17xpWKtF4wHnXph9qApKLInVSrW3IU'}).then((currentToken) => {
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
