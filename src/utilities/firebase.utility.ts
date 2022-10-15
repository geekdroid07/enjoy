import { initializeApp } from 'firebase/app';
import { getAuth, browserSessionPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCeNEFTLsckkCDf_lP2exGq_Oxh1AZR31Q",
  authDomain: "enjoy-49209.firebaseapp.com",
  projectId: "enjoy-49209",
  storageBucket: "enjoy-49209.appspot.com",
  messagingSenderId: "192818746777",
  appId: "1:192818746777:web:e4051ac9843a9e21d1ef08",
  measurementId: "G-0NZDB8N5T3"
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
