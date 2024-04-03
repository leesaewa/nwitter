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
import { Link } from "react-router-dom";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.2fr;
  margin-top: 30px;
  column-gap: 20px;
`;

const Column = styled.div`
  position: relative;
`;

const Username = styled(Link)`
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

const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  height: 80%;
`;

const ButtonContainer = styled.div`
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

const FileBtn = styled.label`
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

export default function Tweet({
  username,
  photo,
  tweet,
  tweetTitle,
  userId,
  id,
  avatar,
}: ITweet) {
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

      const updates = {};
      let isUpdate = false;

      if (editPhoto) {
        const locationRef = ref(storage, `tweets/${user.uid}/${id}`);
        const result = await uploadBytes(locationRef, editPhoto);
        const url = await getDownloadURL(result.ref);
        updates.photo = url;
        isUpdate = true;
      }

      if (editedTweet !== tweet) {
        updates.tweet = editedTweet;
        isUpdate = true;
      }

      if (isUpdate) {
        await updateDoc(doc(db, "tweets", id), updates);
        alert("수정했습니다.");
        setEdit(false);
      } else {
        alert("변경된 내용이 없습니다.");
      }
    } catch (error) {
      console.error("Error updating tweet", error);
    }
  };

  // Modify the image uploaded in the tweet
  const onEditPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxFileSize = 1024 * 1024 * 2; // 2MB로 설정
      if (file.size <= maxFileSize) {
        setEditPhoto(file);

        // Display a thumbnail preview of the image
        const thumbnail = new FileReader();
        thumbnail.onload = () => {
          if (thumbnail.result) {
            const thumbnailUrl = thumbnail.result.toString();
            setThumbnail(thumbnailUrl);
          }
        };
        thumbnail.readAsDataURL(file);
      } else {
        alert("파일 크기가 너무 큽니다. 2MB 이하의 파일을 선택해주세요.");
      }
    } else {
      return;
    }
  };

  const onDeletePhoto = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEditPhoto(null);
    setThumbnail(null);
  };

  return (
    <Container className="container">
      <Column>
        <h2>{tweetTitle}</h2>
        <img src={avatar} />
        <Username to={`/profile/${userId}`}>{username}</Username>
        {user?.uid === userId && edit ? (
          <Textarea value={editedTweet} onChange={onChange} />
        ) : (
          <Payload>{tweet}</Payload>
        )}
        {user?.uid === userId ? (
          <ButtonContainer>
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
          </ButtonContainer>
        ) : null}
      </Column>

      {/* 이미지가 존재하고, 현재 사용자의 id가 트윗을 작성한 사용자의 ID와 동일하며, 수정 버튼을 클릭했을 때 표시 */}
      {photo && user?.uid === userId && edit && (
        <Column>
          <FileBtn htmlFor="editThumbnail">
            {thumbnail ? (
              <Photo src={thumbnail} />
            ) : (
              <Photo src={photo}></Photo>
            )}
          </FileBtn>
          <FileInput
            onChange={onEditPhoto}
            type="file"
            id="editThumbnail"
            accept="image/*"
          />
          {thumbnail && (
            <DeleteBtn type="button" onClick={onDeletePhoto}>
              X
            </DeleteBtn>
          )}
        </Column>
      )}
      {/* 트윗을 작성한 사용자가 아니거나 수정 버튼을 클릭하지 않았을 때 트윗의 사진을 보여줌 */}
      {(!photo || !(user?.uid === userId && edit)) && (
        <Column>{photo && <Photo src={photo}></Photo>}</Column>
      )}
    </Container>
  );
}
