import React from "react";
import AuthForm from "../components/AuthForm";
import { authService, firebaseInstance } from "../fbase";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    await authService.signInWithPopup(provider);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Google로 계속하기
        </button>
        <button onClick={onSocialClick} name="github">
          Github로 계속하기
        </button>
      </div>
    </div>
  );
};

export default Auth;
