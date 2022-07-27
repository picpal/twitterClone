import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [init,setInit] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userObj,setUserObj] = useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setisLoggedIn(true);      
        setUserObj(user)
      }else{
        setisLoggedIn(false);
      }
      setInit(true); // 초기화 여부
    });
  },[]);

  return (
    <>
      {init && <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />}
      {!init && "Initialzing....."}
      <footer>&copy; picpal</footer>
    </>
  );
}

export default App;
