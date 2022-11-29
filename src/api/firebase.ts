import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBgn60V13OE9EXe_ibL7s_NUCcT97y82Es',
  authDomain: 'toeicvoca-87530.firebaseapp.com',
  databaseURL:
    'https://toeicvoca-87530-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'toeicvoca-87530',
  storageBucket: 'toeicvoca-87530.appspot.com',
  messagingSenderId: '1049970744385',
  appId: '1:1049970744385:web:7892ffa9bab04a2206bac0',
  measurementId: 'G-LP98E755KZ',
};
const app = initializeApp(firebaseConfig);

export default async function getVocas() {
  const database = getDatabase(app);
  return get(ref(database, 'voca'))
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
