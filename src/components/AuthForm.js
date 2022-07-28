import React, { useState } from "react";
import { authService } from "../fbase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(`email : ${email} , password : ${password}`);
      let data;
      if (newAccount) {
        // 계정생성
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // 로그인
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Email"
          required
          name="email"
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log in"} />
      </form>
      <p>{error}</p>
      <span onClick={toggleAccount}>
        {newAccount ? "Log in" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
