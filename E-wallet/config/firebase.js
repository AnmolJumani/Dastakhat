import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAqrG4olBQ5HvWp824M3rNysrQzWUgIzvA",
  authDomain: "dastakhat-86ccb.firebaseapp.com",
  projectId: "dastakhat-86ccb",
  storageBucket: "dastakhat-86ccb.appspot.com",
  messagingSenderId: "747664542931",
  appId: "1:747664542931:web:ad410a7ea9dd267ee0d826",
  measurementId: "G-5D00SH9S89"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};