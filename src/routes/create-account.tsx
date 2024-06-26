import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Form, Input, Error, SocialBtnWrap } from "../style/Account";
import { InputBox } from "../style/Tweet";
import GithubButton from "../components/github-btn";
import { doc, getFirestore, setDoc } from "@firebase/firestore";

export default function CreateAccount({ isCreate, setIsCreate }) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cover, setCover] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "cover") {
      setCover(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      // create an account
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const defaultPhotoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=random`;

      await updateProfile(credentials.user, {
        displayName: name,
        photoURL: defaultPhotoURL,
      });

      const userDocRef = doc(getFirestore(), "users", credentials.user.uid);
      await setDoc(userDocRef, {
        displayName: name,
        email: email,
        cover: cover || "/cover.webp",
        photoURL: defaultPhotoURL,
      });
      console.log(credentials.user);

      navigate("/");
    } catch (e) {
      // setError
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <InputBox>
          <label htmlFor="name">Name</label>
          <Input
            onChange={onChange}
            name="name"
            value={name}
            placeholder="Name"
            type="text"
            required
            id="name"
          />
        </InputBox>
        <InputBox>
          <label htmlFor="email">Email</label>
          <Input
            onChange={onChange}
            name="email"
            value={email}
            placeholder="Email"
            type="email"
            required
            id="email"
          />
        </InputBox>
        <InputBox>
          <label htmlFor="password">Password</label>
          <Input
            onChange={onChange}
            value={password}
            name="password"
            placeholder="Password"
            type="password"
            required
            id="password"
          />
        </InputBox>
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
          className="eng"
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <SocialBtnWrap>
        <em className="eng">OR</em>
        <GithubButton isCreate={isCreate} setIsCreate={setIsCreate} />
      </SocialBtnWrap>
    </>
  );
}
