import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBnvt0-jNsKGr3KArbBDAIb-CBMcvKrx3g",
  authDomain: "wayeapp-dcb13.firebaseapp.com",
  projectId: "wayeapp-dcb13",
  storageBucket: "wayeapp-dcb13.appspot.com",
  messagingSenderId: "118008527619",
  appId: "1:118008527619:web:7d57070299e1280bd58736",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const { auth } = firebase;
export default firebase;
