import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDuLpHb3-mqwO-8myUIRr7BOgrhon3E8eg',
  authDomain: 'themenu-a947e.firebaseapp.com',
  projectId: 'themenu-a947e',
  storageBucket: 'themenu-a947e.appspot.com',
  messagingSenderId: '1086204701116',
  appId: '1:1086204701116:web:5f24a07feb681f508023b9',
  measurementId: 'G-ZKETQB33QW',
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const db = firebase.firestore();
