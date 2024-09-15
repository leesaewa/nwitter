import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  Form,
  TextareaWrap,
  InputBox,
  PostWrapper,
  UploadWrap,
  UploadInner,
  FileInput,
  FileThumbnail,
} from "../style/Tweet";
import { SubmitBtn, DeleteBtn } from "../style/Button";
import { useModal } from "./common/Modal";

const TextArea = styled.textarea``;

export default function PostTweetForm({
  onCloseModal,
}: {
  onCloseModal: Function;
}) {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [headline, setHeadline] = useState("");
  const [subhead, setSubhead] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const { openModal }: any = useModal();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFirstTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeadline(e.target.value);
  };
  const onAccentTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubhead(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxFileSize = 1024 * 1024 * 2; // 2MB로 설정
      if (file.size <= maxFileSize) {
        setFile(file);

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
        openModal(
          <>
            <span>파일 크기가 너무 큽니다. </span>2MB 이하의 파일을
            선택해주세요.
          </>
        );
      }
    } else {
      return;
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (
      !user ||
      isLoading ||
      tweet === "" ||
      tweet.length > 8000 ||
      tweet.length < 400 ||
      headline.length < 20 ||
      !file
    ) {
      let errorMessage = "";

      if (!user) {
        errorMessage = "로그인이 필요합니다.";
      } else if (tweet === "" && headline === "") {
        errorMessage = "Headline과 기사 내용을 입력해주세요";
      } else if (tweet.length > 8000) {
        errorMessage = "기사 내용을 8000자 이내로 작성해주세요.";
      } else if (tweet.length < 400) {
        errorMessage = "기사 내용을 최소 400자 이상으로 작성해주세요.";
      } else if (headline.length < 20) {
        errorMessage = "Headline은 20자 이상으로 작성해주세요.";
      } else if (!file) {
        errorMessage = "기사 이미지를 첨부해주세요";
      }

      openModal(errorMessage);
      return;
    }

    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
        avatar: user.photoURL || null,
        headline,
        subhead,
      }); //새로운 document 생성
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, { photo: url });
      }

      setTweet("");
      setHeadline("");
      setSubhead("");
      setFile(null);
      setThumbnail(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }

    onCloseModal();
  };
  const onDeletePhoto = () => {
    setFile(null);
    setThumbnail(null);
  };

  return (
    <Form onSubmit={onSubmit}>
      <InputBox>
        <label htmlFor="headline">Headline</label>
        <input value={headline} onChange={onFirstTitle} id="headline" />
      </InputBox>
      <InputBox>
        <label htmlFor="subhead">Subhead</label>
        <input value={subhead} onChange={onAccentTitle} id="subhead" />
      </InputBox>
      <PostWrapper>
        <TextareaWrap>
          <TextArea
            className="scroll"
            maxLength={8000}
            onChange={onChange}
            value={tweet}
            placeholder="What is happening?"
          />
          <em>{tweet.length}/8000</em>
        </TextareaWrap>
        <UploadWrap>
          <UploadInner>
            <label htmlFor="addPhoto" className="file-upload">
              {file && thumbnail !== null ? (
                <FileThumbnail src={thumbnail} />
              ) : (
                "이미지 첨부"
              )}
            </label>
            <FileInput
              onChange={onFileChange}
              type="file"
              id="addPhoto"
              accept="image/*"
            />
            {file && (
              <DeleteBtn type="button" onClick={onDeletePhoto}>
                X
              </DeleteBtn>
            )}
          </UploadInner>
        </UploadWrap>
      </PostWrapper>
      <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Submit!"} />
    </Form>
  );
}
