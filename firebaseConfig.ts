import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDrhlgmqCC3lmWQ6hmysBY-IG6oEO8Z3P8',
  authDomain: 'tutorda-mobile-app.firebaseapp.com',
  projectId: 'tutorda-mobile-app',
  storageBucket: 'tutorda-mobile-app.appspot.com',
  messagingSenderId: '11850336257',
  appId: '1:11850336257:web:8ad996eaaf70a7d2841800',
  measurementId: 'G-NWGMN7ZG7T',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };