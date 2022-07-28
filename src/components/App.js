import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setisLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setisLoggedIn(false);
        setUserObj(null);
      }
      setInit(true); // 초기화 여부
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),});
  };

  return (
    <>
      {init && (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      )}
      {!init && "Initialzing....."}
      <footer>&copy; picpal</footer>
    </>
  );
}

export default App;
