import React ,{useState} from 'react';
import { v4 as uuidv4 } from "uuid";
import { storageService,dbService } from '../fbase';

const NweetFactory = (props) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    let attachmentURL= "";
    if(attachment !== ""){
      // 임시파일
      const attachmentRef = storageService
        .ref()
        .child(`${props.userObj.uid}/${uuidv4()}`);
  
      const response = await attachmentRef.putString(attachment, "data_url");
      console.log(response);
  
      // 업로드된 파일이 있다면 파일을 먼저 업로드하고
      // 업로드된 파일의 경로를 받아서 데이터로 저장.
      attachmentURL = await response.ref.getDownloadURL();
    }

    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: props.userObj.uid,
      attachmentURL
    };

    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];

    //fileReader API사용
    const reader = new FileReader();
    reader.onloadend = (finishedEvt) => {
      const {
        currentTarget: { result },
      } = finishedEvt;
      setAttachment(result);
    };

    reader.readAsDataURL(theFile);
  };

  const onClearAttachmentClick = () => {
    setAttachment(null);
  };


  return (
    <form onSubmit={onSubmit}>
        <input
          type="text"
          value={nweet}
          onChange={onChange}
          placeholder="insert text"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Tweet" />
        {attachment && (
          <div>
            <img
              src={attachment}
              witdh="50px"
              height="50px"
              alt="test 이미지"
            />
            <button onClick={onClearAttachmentClick}>업로드취소</button>
          </div>
        )}
      </form>
  );
};

export default NweetFactory;