import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  Form,
  TextArea,
  TextareaWrap,
  InputBox,
  PostWrapper,
  UploadWrap,
  UploadInner,
  FileInput,
  FileThumbnail,
} from "../style/Tweet";
import { SubmitBtn, DeleteBtn } from "../style/Button";

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [headline, setHeadline] = useState("");
  const [subhead, setSubhead] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

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
        alert("파일 크기가 너무 큽니다. 2MB 이하의 파일을 선택해주세요.");
      }
    } else {
      return;
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user || isLoading || tweet === "" || tweet.length > 8000) return;

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
  };
  const onDeletePhoto = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFile(null);
    setThumbnail(null);
  };

  return (
    <Form onSubmit={onSubmit}>
      <InputBox>
        <label htmlFor="headline">Headline</label>
        <input
          value={headline}
          onChange={onFirstTitle}
          id="headline"
          required
        />
      </InputBox>
      <InputBox>
        <label htmlFor="subhead">Subhead</label>
        <input value={subhead} onChange={onAccentTitle} id="subhead" />
      </InputBox>
      <PostWrapper>
        <TextareaWrap>
          <TextArea
            maxLength={8000}
            onChange={onChange}
            value={tweet}
            placeholder="What is happening?"
            required
          />
          <em>{tweet.length}/8000</em>
        </TextareaWrap>
        <UploadWrap>
          <UploadInner>
            <label htmlFor="addPhoto" className="file-upload">
              {file ? <FileThumbnail src={thumbnail} /> : "이미지 첨부"}
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

        <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Submit!"} />
      </PostWrapper>
    </Form>
  );
}
