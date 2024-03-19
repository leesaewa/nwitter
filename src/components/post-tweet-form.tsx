import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TextArea = styled.textarea`
  background-color: black;
  border: 1px solid aliceblue;
  border-radius: 6px;
  resize: none;

  &::placeholder {
    font-size: 16px;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  &:focus {
    outline: 2px solid #f0f8ff88;
    border-color: aliceblue;
  }
`;

const AttackFileButton = styled.label``;

const AttackFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.button`
  cursor: pointer;
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
  const submitBtn = (e) => {
    e.preventDefault();
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  return (
    <Form>
      <TextArea
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="What is happening?"
      />
      <AttackFileButton htmlFor="file">
        {file ? "Photo added" : "Add photo"}
      </AttackFileButton>
      <AttackFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      <SubmitBtn type="submit" onClick={submitBtn}>
        {isLoading ? "Loading..." : "Post!"}
      </SubmitBtn>
    </Form>
  );
}
