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
import {
  Avatar,
  UserWrapper,
  Username,
  InputBox,
  Headline,
  Subhead,
  ReportContainer,
  ReportCaption,
  ReportFigure,
  ReportHeadline,
  FileThumbnail,
  Option,
  ReportCont,
  TextareaWrap,
} from "../style/Tweet";

const TextArea = styled.textarea``;

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
  headline,
  subhead,
  userId,
  id,
  avatar,
}: ITweet) {
  const user = auth.currentUser;
  const [edit, setEdit] = useState(false);
  const [editedTweet, setEditedTweet] = useState(tweet);
  const [editedHeadline, setEditedHeadline] = useState(headline);
  const [editedSubhead, setEditedSubhead] = useState(subhead);
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
    }
  };

  // When the tweet content changes
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedTweet(e.target.value);
  };
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedHeadline(e.target.value);
  };
  const onSubheadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedSubhead(e.target.value);
  };

  // Activate tweet editing
  const onEdit = () => {
    setEdit(true);
  };

  // Cancel tweet editing and revert to the previous state
  const onEditCancel = () => {
    setEdit(false);
    setEditedTweet(tweet);
    setEditedHeadline(headline);
    setEditedSubhead(subhead);
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
      if (editedHeadline !== headline) {
        updates.headline = editedHeadline;
        isUpdate = true;
      }
      if (editedSubhead !== subhead) {
        updates.subhead = editedSubhead;
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

  const isEnglish = (str) => /[a-zA-Z]/.test(str);

  return (
    <ReportContainer className="container">
      <ReportHeadline>
        {user?.uid === userId && edit ? (
          <>
            <InputBox>
              <label htmlFor="headline">Headline</label>
              <input value={editedHeadline} onChange={onTitleChange} />
            </InputBox>
            <InputBox>
              {editedSubhead && (
                <>
                  <label htmlFor="subhead">Subhead</label>
                  <input value={editedSubhead} onChange={onSubheadChange} />
                </>
              )}
            </InputBox>
          </>
        ) : (
          <>
            <Headline className={isEnglish(headline) ? "eng" : ""}>
              {headline}
            </Headline>
            <Subhead className={isEnglish(subhead) ? "eng" : ""}>
              {subhead}
            </Subhead>
          </>
        )}

        <Option>
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

          <UserWrapper>
            <Link to={`/profile/${userId}`}>
              <Avatar
                src={avatar || "/logo.png"}
                className={avatar ? "" : "no-img"}
              />
              <div>
                <em className="eng">reporter</em>
                <p>
                  <Username>{username}</Username>
                  <Username className="hover">{username}</Username>
                </p>
              </div>
            </Link>
          </UserWrapper>
        </Option>
      </ReportHeadline>

      {/* tweet.length가 800 이하인 경우: short 클래스 추가
      tweet.length가 1999 이하인 경우: middle 클래스 추가
      tweet.length가 2000 이상인 경우: long 클래스 추가 */}
      <ReportFigure
        className={`${
          tweet.length <= 800
            ? "short "
            : tweet.length <= 1999
            ? "middle"
            : tweet.length >= 2000
            ? "long"
            : ""
        } ${photo ? "img" : ""}`}
      >
        {photo && user?.uid === userId && edit && (
          <>
            <FileBtn htmlFor="editThumbnail" className="file-upload">
              {thumbnail ? (
                <FileThumbnail src={thumbnail} />
              ) : (
                <FileThumbnail src={photo} />
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
          </>
        )}

        {(!photo || !(user?.uid === userId && edit)) && (
          <>{photo && <FileThumbnail src={photo} />}</>
        )}

        <ReportCaption>
          {user?.uid === userId && edit ? (
            <TextareaWrap>
              <TextArea
                className="scroll"
                maxLength={8000}
                value={editedTweet}
                onChange={onChange}
              />
              <em>{tweet.length}/8000</em>
            </TextareaWrap>
          ) : (
            <ReportCont>
              {tweet.length > 0 && (
                <>
                  <em className={`first ${isEnglish ? "eng" : ""}`}>
                    {tweet.charAt(0)}
                  </em>
                  {tweet.slice(1)}
                </>
              )}
            </ReportCont>
          )}
        </ReportCaption>
      </ReportFigure>
    </ReportContainer>
  );
}
