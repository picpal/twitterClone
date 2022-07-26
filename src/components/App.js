import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [init,setInit] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setisLoggedIn(true);      
      }else{
        setisLoggedIn(false);
      }
      setInit(true); // 초기화 여부
    });
  },[]);

  return (
    <>
      {init && <AppRouter isLoggedIn={isLoggedIn} />}
      {!init && "Initialzing....."}
      <footer>&copy; picpal</footer>
    </>
  );
}

export default App;
