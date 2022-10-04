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

<<<<<<< HEAD
const { firebaseConfig, backendApi } = require("./.env.json");
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const axios = require("axios");
=======
const { firebaseConfig } = require('./.env.json')
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
>>>>>>> origin/feat/auth

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (result && result.user) {
<<<<<<< HEAD
      const idToken = await result.user.getIdToken();
      window.location.href("/test");
      const userResponse = await axios.post(`${backendApi}/user/getUser`, {
        headers: {
          Authorization: "Bearer " + idToken,
        },
      });
      return true;
    }

    // const user = res.user;
    // const q = query(collection(db, "users"), where("uid", "==", user.uid));
    // const docs = await getDocs(q);
    // if (docs.docs.length === 0) {
    //   await addDoc(collection(db, "users"), {
    //     uid: user.uid,
    //     name: user.displayName,
    //     authProvider: "google",
    //     email: user.email,
    //   });
    // }
=======
      return true
    }
>>>>>>> origin/feat/auth
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signInWithGoogle, logout };
