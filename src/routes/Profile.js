import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../fbase";

const Profile = (props) => {
  const [newDisplayName, setNewDisplayName] = useState(
    props.userObj.displayName
  );

  const history = useHistory();
  const onLogoutClick = () => {
    authService.signOut();
    history.push("/");
  };

  // 내가 쓴 글 가져오기 ( query 사용 )
  const getMyNweet = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", props.userObj.uid)
      .orderBy("createdAt", "asc")
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (newDisplayName !== props.userObj.displayName) {
      await props.userObj.updateProfile({
        displayName: newDisplayName,
      });

      props.refreshUser();
    }
  };

  useEffect(() => {
    getMyNweet();
  }, [getMyNweet]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="이름 보이기"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value="프로필 수정" />
      </form>
      <button onClick={onLogoutClick}>Log Out</button>
    </div>
  );
};

export default Profile;
