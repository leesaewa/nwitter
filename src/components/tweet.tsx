import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { ChangeEvent, useState } from "react";

const Wrapper = styled.div`
  border: 1px solid green;
  display: grid;
  grid-template-columns: 1fr 0.2fr;
`;

const Column = styled.div`
  border: 1px solid blue;
  position: relative;
`;

const Username = styled.span`
  display: block;
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px dashed aliceblue;
`;

const Payload = styled.p`
  padding-top: 5px;
`;

const Photo = styled.img`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  button {
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid transparent;
    font-size: 14px;
    padding: 4px 10px;
  }
`;

const DeleteBtn = styled.button`
  background-color: maroon;
  color: white;

  &:hover {
    background-color: aliceblue;
    color: maroon;
  }
`;

const EditBtn = styled.button`
  background-color: cadetblue;
  &:hover {
    background-color: aliceblue;
  }
  &.btn-save {
    background-color: cornflowerblue;
  }
  &.btn-cancel {
    background-color: cornsilk;
  }
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const [edit, setEdit] = useState(false);
  const [editedTweet, setEditedTweet] = useState(tweet);

  const onDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this tweet?"
    );
    if (!confirmDelete || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedTweet(e.target.value);
  };

  const onEdit = () => {
    setEdit(true);
  };
  const onEditCancel = () => {
    setEdit(false);
    setEditedTweet(tweet);
  };
  const onEditSave = async () => {
    console.log("save");
    try {
      const confirmSave = confirm("수정하시겠습니까?");
      if (!confirmSave || user?.uid !== userId) return;
      await updateDoc(doc(db, "tweets", id), {
        tweet: editedTweet,
      });
      setEdit(false);
    } catch (error) {
      console.error("Error updating tweet", error);
    }
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {edit ? (
          <textarea value={editedTweet} onChange={onChange}></textarea>
        ) : (
          <Payload>{tweet}</Payload>
        )}
        {user?.uid === userId ? (
          <ButtonWrapper>
            {edit ? (
              <>
                <EditBtn className="btn-save" onClick={onEditSave}>
                  Save
                </EditBtn>
                <EditBtn className="btn-cancel" onClick={onEditCancel}>
                  Cancel
                </EditBtn>
              </>
            ) : (
              <EditBtn onClick={onEdit}>Edit</EditBtn>
            )}
            <DeleteBtn onClick={onDelete}>Delete</DeleteBtn>
          </ButtonWrapper>
        ) : null}
      </Column>

      <Column>{photo ? <Photo src={photo}></Photo> : null}</Column>
    </Wrapper>
  );
}
