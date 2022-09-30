import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const { firebaseConfig, backendApi } = require('./.env.json')
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const axios = require('axios')

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (result && result.user) {
      const idToken = await result.user.getIdToken()
      // const userResponse = await axios.post(`${backendApi}/user/getUser`, {
      //   headers: {
      //     Authorization: 'Bearer ' + idToken
      //   }
      // })
      return true
    }
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logout,
};
