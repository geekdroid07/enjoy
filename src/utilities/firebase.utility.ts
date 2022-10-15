import { initializeApp } from 'firebase/app';
import { getAuth, browserSessionPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCdQF5lrTjEsnooERe2PyPgw032rvJpdkk",
  authDomain: "bonum-admins.firebaseapp.com",
  projectId: "bonum-admins",
  storageBucket: "bonum-admins.appspot.com",
  messagingSenderId: "879077123868",
  appId: "1:879077123868:web:f855313d42bacfbd1d7cd9"
};

export function translateFirebaseErrors(firebaseError) {
  let message = '';
  switch (firebaseError) {
    case 'auth/wrong-password': {
      message = 'La contraseña es incorrecta';
      break;
    }

    case 'auth/user-not-found': {
      message = 'El usuario no existe';
      break;
    }

    default: {
      message = 'Error, contacte al administrador';
      break;
    }
  }

  return message;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

const setAuthPersistence = async () => {
  try {
    const persistence = await auth.setPersistence(browserSessionPersistence);
    console.log(
      '🚀 ~ file: firebase.utilities.js ~ line 46 ~ setAuthPersistence ~ persistence',
      persistence
    );
  } catch (error) {
    console.log(error);
  }
};

export { auth, firestore, storage, setAuthPersistence };
