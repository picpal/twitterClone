import React from "react";
import {useHistory} from 'react-router-dom'
import { authService } from "../fbase";

const Profile = () => {
  const history = useHistory();
  history.push("/");

  const onLogoutClick = () => {
    authService.signOut();
  };

  return (
    <div>
      <button onClick={onLogoutClick}>Log Out</button>
    </div>
  );
};

export default Profile;
