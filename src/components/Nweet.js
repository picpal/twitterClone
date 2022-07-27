import { isEditable } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import { dbService } from "../fbase";

const Nweet = (props) => {
  const {
    nweet: { id, text, isOwner },
  } = props;

  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(text);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`nweets/${id}`).delete();
    }
  };

  const toggleEditing = async () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await dbService.doc(`nweets/${id}`).update({
      text : newNweet,
    })

    setEditing(false); // 수정이 끝났다고 상태 변경
  };
  

  const onChange = (event) => {
    const {target:{value}} = event;
    setNewNweet(value)
  };
  

  return (
    <div>
      <h4>{text}</h4>
      {editing && (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" value={newNweet} onChange={onChange} required />
            <input type="submit" value="수정"/>
          </form>
          <button onClick={toggleEditing}>취소</button>
          
        </>
      )}
      {!editing && isOwner && (
        <>
          <button onClick={onDeleteClick}>삭제</button>
          <button onClick={toggleEditing}>수정</button>
        </>
      )}
    </div>
  );
};

export default Nweet;
