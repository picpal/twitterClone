import React, { useState, useEffect } from "react";
import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";
import { dbService } from "../fbase";

const Home = (props) => {
  
  const [nweets, setNweets] = useState([]);
  

  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      // foreach 보다 map으로 사용하면 ReRendering이 발생하지 않아서 더 좋음.
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // 생성된 DB데이터 배열을 상태 설정
      setNweets(nweetArray);
    });
  }, []);

  
  return (
    <div>
      <NweetFactory userObj={props.userObj}/>
      <div>
        {nweets.map((nweet) => {
          nweet.isOwner = nweet.creatorId === props.userObj.uid;
          return <Nweet key={nweet.id} nweet={nweet} />;
        })}
      </div>
    </div>
  );
};

export default Home;
