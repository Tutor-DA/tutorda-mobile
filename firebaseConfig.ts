import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDrhlgmqCC3lmWQ6hmysBY-IG6oEO8Z3P8",
authDomain: "tutorda-mobile-app.firebaseapp.com",
projectId: "tutorda-mobile-app",
storageBucket: "tutorda-mobile-app.firebasestorage.app",
messagingSenderId: "11850336257",
appId: "1:11850336257:web:66f849463182888b841800",
//measurementId: "G-4KQB4XH8TK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
