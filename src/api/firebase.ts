import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { Voca } from '../models/voca';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);

export default async function getVocas(): Promise<Voca[]> {
  const database = getDatabase(app);
  return get(ref(database, 'vocas'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return [];
    })
    .catch((error) => {
      console.error(error);
    });
}

// auth
const provider = new GoogleAuthProvider();
export function login(): void {
  const auth = getAuth();
  signInWithPopup(auth, provider).catch((error) => {
    console.log(error);
  });
}
export function logout(): void {
  const auth = getAuth();
  signOut(auth).catch((error) => {
    console.log(error);
  });
}
export function onUserChange(callback: (user: any) => void): void {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
