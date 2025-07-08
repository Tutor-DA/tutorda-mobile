import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyDrhlgmqCC3lmWQ6hmysBY-IG6oEO8Z3P8',
  authDomain: 'tutorda-mobile-app.firebaseapp.com',
  projectId: 'tutorda-mobile-app',
  storageBucket: 'tutorda-mobile-app.appspot.com',
  messagingSenderId: '11850336257',
  appId: '1:11850336257:web:66f849463182888b841800',
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth with persistent storage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// ✅ Firestore & Storage
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Export all services
export { app, auth, db, storage };
