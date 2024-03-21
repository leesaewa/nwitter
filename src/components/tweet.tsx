import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { ChangeEvent, useState } from "react";

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
`;

const Button = styled.button`
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid transparent;
  font-size: 14px;
  padding: 4px 10px;
  &:hover {
    background-color: aliceblue;
  }
`;

const DeleteBtn = styled(Button)`
  background-color: maroon;
  color: white;

  &:hover {
    color: maroon;
  }
`;

const EditBtn = styled(Button)`
  background-color: cadetblue;
  &.btn-save {
    background-color: cornflowerblue;
  }
  &.btn-cancel {
    background-color: cornsilk;
  }
`;

const FileBtn = styled.label``;

const FileInput = styled.input``;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const [edit, setEdit] = useState(false);
  const [editedTweet, setEditedTweet] = useState(tweet);
  const [editPhoto, setEditPhoto] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  // Delete tweet
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

  // When the tweet content changes
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedTweet(e.target.value);
  };

  // Activate tweet editing
  const onEdit = () => {
    setEdit(true);
  };

  // Cancel tweet editing and revert to the previous state
  const onEditCancel = () => {
    setEdit(false);
    setEditedTweet(tweet);
    setEditPhoto(null);
  };

  // Save the edited tweet and update it in Firestore
  const onEditSave = async () => {
    try {
      const confirmSave = confirm("수정하시겠습니까?");

      if (!confirmSave || user?.uid !== userId) return;

      if (editPhoto) {
        const locationRef = ref(storage, `tweets/${user.uid}/${id}`);
        const result = await uploadBytes(locationRef, editPhoto);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc(db, "tweets", id), {
          photo: url,
          tweet: editedTweet,
        });
      } else {
        await updateDoc(doc(db, "tweets", id), { tweet: editedTweet });
      }

      alert("수정했습니다.");
      setEdit(false);
    } catch (error) {
      console.error("Error updating tweet", error);
    }
  };

  // Modify the image uploaded in the tweet
  const onEditPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if the file size exceeds 2MB
    const maxFileSize = file.size / (1024 * 1024);
    if (maxFileSize > 2) {
      alert("파일 크기가 너무 큽니다. 2MB 이하의 파일을 선택해주세요.");
      e.target.value = "";
      setEditPhoto(null);
      return;
    }
    // Display a thumbnail preview of the image
    const thumbnail = new FileReader();
    thumbnail.onload = () => {
      if (thumbnail.result) {
        const thumbnailUrl = thumbnail.result.toString();
        setThumbnail(thumbnailUrl);
      }
    };
    thumbnail.readAsDataURL(file);

    setEditPhoto(file);
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {user?.uid === userId && edit ? (
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

      {user?.uid === userId && edit ? (
        <Column>
          <FileBtn htmlFor="file">
            {thumbnail ? (
              <Photo src={thumbnail} />
            ) : (
              <Photo src={photo}></Photo>
            )}
          </FileBtn>
          <FileInput
            onChange={onEditPhoto}
            type="file"
            id="file"
            accept="image/*"
          />
        </Column>
      ) : (
        <Column>{photo ? <Photo src={photo}></Photo> : null}</Column>
      )}
    </Wrapper>
  );
}
