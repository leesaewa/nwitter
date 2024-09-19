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
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  UserWrapper,
  Username,
  InputBox,
  InputBoxLabel,
  InputBoxInput,
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
  PostWrapper,
  UploadWrap,
  UploadInner,
} from "../style/Tweet";
import { useModal } from "./common/Modal";

import {
  ModalWrapper,
  ModalContent,
  ModalHeader,
  ModalTitle,
  Overlay,
  ModalButtonContainer,
  EditDelete,
} from "../style/Modal";
import {
  HiOutlineTrash,
  HiOutlineCog8Tooth,
  HiOutlineCheck,
  HiMiniXMark,
} from "react-icons/hi2";
import { EditBtn } from "../style/Profile";
import { DeleteBtn } from "../style/Button";

const TextArea = styled.textarea``;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FileBtn = styled.label`
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const Time = styled.p`
  margin-top: 0.6rem;
  font-size: 0.7em;
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
  createdAt,
}: ITweet) {
  const user = auth.currentUser;
  const [edit, setEdit] = useState(false);
  const [editedTweet, setEditedTweet] = useState(tweet);
  const [editedHeadline, setEditedHeadline] = useState(headline);
  const [editedSubhead, setEditedSubhead] = useState(subhead);
  const [editPhoto, setEditPhoto] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openModal } = useModal();

  // Delete tweet
  const onDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this tweet?"
    );
    if (!confirmDelete || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (editPhoto) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
      alert("삭제했습니다.");
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
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Cancel tweet editing and revert to the previous state
  const onEditCancel = () => {
    setEdit(false);
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // Save the edited tweet and update it in Firestore
  const onEditSave = async () => {
    try {
      const confirmSave = confirm("수정하시겠습니까?");
      if (!confirmSave || user?.uid !== userId) return;

      if (
        !user ||
        editedTweet === "" ||
        editedTweet.length > 8000 ||
        editedTweet.length < 400 ||
        editedHeadline.length < 20 ||
        !editPhoto
      ) {
        let errorMessage = "";

        if (!user) {
          errorMessage = "로그인이 필요합니다.";
        } else if (editedTweet === "" && editedHeadline === "") {
          errorMessage = "Headline과 기사 내용을 입력해주세요";
        } else if (editedTweet.length > 8000) {
          errorMessage = "기사 내용을 8000자 이내로 작성해주세요.";
        } else if (editedTweet.length < 400) {
          errorMessage = "기사 내용을 최소 400자 이상으로 작성해주세요.";
        } else if (editedHeadline.length < 20) {
          errorMessage = "Headline은 20자 이상으로 작성해주세요.";
        } else if (!editPhoto) {
          errorMessage = "기사 이미지를 첨부해주세요";
        }

        openModal(errorMessage);
        return;
      }

      const updates: Record<string, any> = {};
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

      setIsModalOpen(false);
      document.body.style.overflow = "auto";
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

  const onDeletePhoto = () => {
    setEditPhoto(null);
    setThumbnail(null);
  };

  const isEnglish = (str: string): boolean => /[a-zA-Z]/.test(str);

  // 업로드 시간 표기
  const getFormattedTime = (timestamp: number): string => {
    const now = new Date();
    const timestampDate = new Date(timestamp);

    const diff = now.getTime() - timestampDate.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let formattedTime = "";
    if (days > 0) {
      formattedTime = timestampDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } else if (hours > 0) {
      formattedTime = `${hours}시간 전`;
    } else if (minutes > 0) {
      formattedTime = `${minutes}분 전`;
    } else {
      formattedTime = "방금 전";
    }

    return formattedTime;
  };
  const formattedCreatedAt = getFormattedTime(createdAt);

  return (
    <ReportContainer
      className={
        tweet.length <= 800
          ? "short"
          : tweet.length <= 1999
          ? "middle"
          : tweet.length >= 2000
          ? "long"
          : ""
      }
    >
      <ReportHeadline>
        <div>
          <Headline className={`headline ${isEnglish(headline) ? "eng" : ""}`}>
            {headline}
          </Headline>
          {subhead && (
            <Subhead className={`subhead ${isEnglish(subhead) ? "eng" : ""}`}>
              {subhead}
            </Subhead>
          )}
        </div>

        <Option>
          <UserWrapper>
            <Link to={`/profile/${userId}`}>
              <Avatar
                src={avatar || "/logo.png"}
                className={avatar ? "" : "no-img"}
              />
              <div>
                <em className="eng">Journalist</em>
                <p>
                  <Username>{username}</Username>
                  <Username className="hover">{username}</Username>
                </p>
                <Time>{formattedCreatedAt} </Time>
              </div>
            </Link>
          </UserWrapper>

          {user?.uid === userId ? (
            <ButtonContainer>
              <EditBtn onClick={onEdit} className="btn-edit">
                <HiOutlineCog8Tooth />
              </EditBtn>
              <EditDelete onClick={onDelete}>
                <HiOutlineTrash />
              </EditDelete>
            </ButtonContainer>
          ) : null}
        </Option>
      </ReportHeadline>

      <ReportFigure>
        {photo && <FileThumbnail src={photo} />}

        <ReportCaption>
          <ReportCont className={isEnglish(tweet.charAt(0)) ? "en" : "ko"}>
            {tweet.length > 0 && (
              <>
                <em className={isEnglish(tweet.charAt(0)) ? "eng" : ""}>
                  {tweet.charAt(0)}
                </em>
                {tweet.slice(1)}
              </>
            )}
          </ReportCont>
        </ReportCaption>
      </ReportFigure>

      {edit && isModalOpen && (
        <ModalWrapper>
          <Overlay onClick={onEditCancel} />
          <ModalContent className="edit-modal">
            <ModalHeader>
              <ModalTitle>기사 수정</ModalTitle>
            </ModalHeader>

            <>
              <div>
                <InputBox>
                  <InputBoxLabel htmlFor="headline">Headline</InputBoxLabel>
                  <InputBoxInput
                    value={editedHeadline}
                    onChange={onTitleChange}
                  />
                </InputBox>
                <InputBox>
                  {editedSubhead && (
                    <>
                      <InputBoxLabel htmlFor="subhead">Subhead</InputBoxLabel>
                      <InputBoxInput
                        value={editedSubhead}
                        onChange={onSubheadChange}
                      />
                    </>
                  )}
                </InputBox>
              </div>

              <PostWrapper>
                <TextareaWrap>
                  <TextArea
                    className="scroll"
                    maxLength={8000}
                    value={editedTweet}
                    onChange={onChange}
                  />
                  <em>{editedTweet.length}/8000</em>
                </TextareaWrap>
                <UploadWrap>
                  <UploadInner>
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
                  </UploadInner>
                </UploadWrap>
              </PostWrapper>

              <ModalButtonContainer>
                <EditBtn className="btn-save" onClick={onEditSave}>
                  <HiOutlineCheck /> Save
                </EditBtn>
                <EditBtn className="btn-cancel" onClick={onEditCancel}>
                  <HiMiniXMark /> Cancel
                </EditBtn>
              </ModalButtonContainer>
            </>
          </ModalContent>
        </ModalWrapper>
      )}
    </ReportContainer>
  );
}
