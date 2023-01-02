/* eslint-disable no-console */
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, remove } from 'firebase/database';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { Voca, WrongVoca } from '../models/voca';

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

// auth
const provider = new GoogleAuthProvider();
export type CustomUser = Pick<User, 'photoURL' | 'uid'>;

export const login = (): void => {
  const auth = getAuth();
  signInWithPopup(auth, provider).catch((error) => {
    console.log(error);
  });
};

export const logout = (): void => {
  const auth = getAuth();
  signOut(auth).catch((error) => {
    console.log(error);
  });
};

export const onUserChange = (
  callback: (user: CustomUser | null) => void
): void => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      callback(null);
      return;
    }
    const { uid, photoURL } = user;
    const customUser = {
      uid,
      photoURL,
    };
    callback(customUser);
  });
};

// All Vocas
export const getVocas = async (): Promise<Voca[]> => {
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
};

export const shownCountPlusOne = (answer: Voca | undefined): void => {
  const database = getDatabase(app);
  set(ref(database, `vocas/${answer?.id}`), {
    ...answer,
    shownCount: answer && answer.shownCount + 1,
  });
};

export const wrongCountPlusOne = (answer: Voca | undefined): void => {
  const database = getDatabase(app);
  set(ref(database, `vocas/${answer?.id}`), {
    ...answer,
    shownCount: answer && answer.shownCount + 1,
    wrongCount: answer && answer.wrongCount + 1,
  });
};

// Wrong Vocas
export const getWrongs = async (
  userId: string | undefined
): Promise<WrongVoca[]> => {
  const database = getDatabase(app);
  return get(ref(database, `wrongs/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return [];
    })
    .catch((error) => {
      console.error(error);
    });
};

export const addWrong = (userId: string, answer: Voca | undefined): void => {
  const database = getDatabase(app);
  set(ref(database, `wrongs/${userId}/${answer?.id}`), {
    id: answer?.id,
    eng: answer?.eng,
    kor: answer?.kor,
    addedDate: new Date().getTime(),
    isImportant: false,
  });
};

export const updateWrong = async (
  userId: string | undefined,
  voca: WrongVoca
): Promise<void> => {
  const database = getDatabase(app);
  set(ref(database, `wrongs/${userId}/${voca?.id}`), voca);
};

export const removeWrong = async (
  userId: string | undefined,
  voca: WrongVoca
): Promise<void> => {
  const database = getDatabase(app);
  return remove(ref(database, `wrongs/${userId}/${voca.id}`));
};
