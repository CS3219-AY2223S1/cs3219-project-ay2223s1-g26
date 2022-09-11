import React, { useEffect, useState } from "react";
import { signInWithGoogle } from "../firebase";

import "./Login.css";
function Login() {
  return (
    <div className="login">
      <div className="login__container">
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
      </div>
    </div>
  );
}
export default Login;