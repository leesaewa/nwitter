import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TextArea = styled.textarea`
  background-color: black;
  border: 1px solid aliceblue;
  border-radius: 6px;
  resize: none;
  color: aliceblue;
  height: 100px;
  margin-bottom: 20px;

  &::placeholder {
    font-size: 16px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  &:focus {
    outline: 2px solid #f0f8ff88;
    border-color: aliceblue;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  column-gap: 20px;
`;

const AttackFileButton = styled.label`
  cursor: pointer;
  width: 40%;
  background-color: aliceblue;
  color: maroon;
  border-radius: 6px;
  text-align: center;
`;

const AttackFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  cursor: pointer;
  width: 100%;
  background-color: black;
  border: 1px solid aliceblue;
  border-radius: 6px;
  color: aliceblue;
  padding: 6px 0;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: aliceblue;
    border-color: black;
    color: black;
  }
`;

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxFileSize = 1024 * 1024 * 2; // 2MB로 설정
    if (files && files.length === 1) {
      const selectedFile = files[0];
      if (selectedFile.size <= maxFileSize) {
        setFile(selectedFile);
      } else {
        alert("파일 크기가 너무 큽니다. 2MB 이하의 파일을 선택해주세요.");
      }
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user || isLoading || tweet === "" || tweet.length > 180) return;

    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      }); //새로운 document 생성
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, { photo: url });
      }
      setTweet("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="What is happening?"
        required
      />
      <ButtonWrapper>
        <AttackFileButton htmlFor="addPhoto">
          {file ? "Photo added" : "Add photo"}
        </AttackFileButton>
        <AttackFileInput
          onChange={onFileChange}
          type="file"
          id="addPhoto"
          accept="image/*"
        />
        <SubmitBtn
          type="submit"
          value={isLoading ? "Posting..." : "Post Tweet"}
        />
      </ButtonWrapper>
    </Form>
  );
}
