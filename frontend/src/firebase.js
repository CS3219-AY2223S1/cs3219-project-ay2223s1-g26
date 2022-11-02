import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "peerprep-userser.firebaseapp.com",
  projectId: "peerprep-userser",
  storageBucket: "peerprep-userser.appspot.com",
  messagingSenderId: "1017360607564",
  appId: "1:1017360607564:web:8c39c6b7831774746a87e9",
  measurementId: "G-PHPR5YLWSH",
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (result && result.user) {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signInWithGoogle, logout };
