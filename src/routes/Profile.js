import React from "react";
import { authService } from "../fbase";

const Profile = () => {
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
