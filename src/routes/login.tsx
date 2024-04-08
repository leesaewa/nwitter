import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
  Container,
  Form,
  Input,
  Switcher,
  LeftSide,
  RightSide,
  Error,
  Logo,
  LogoTitle,
  RightHeader,
  LinkButton,
  SocialBtnWrap,
} from "../style/Account";
import GithubButton from "../components/github-btn";
import { InputBox } from "../style/Tweet";
import CreateAccount from "./create-account";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isCreate, setIsCreate] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="container">
      <LeftSide>
        <iframe
          width="100%"
          height="100vh"
          src="https://www.youtube.com/embed/FPtubly5siQ?start=4&autoplay=1&mute=1&loop=1&controls=0&si=U3i87Wgs5KO1bViT"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </LeftSide>

      <RightSide>
        <RightHeader>
          <div>
            <Logo src="/logo.png" alt="" />
            <LogoTitle className="eng">
              THE DAILY <em>P</em>ROPHET
            </LogoTitle>
          </div>
          <h2 className="eng">{isCreate ? "Join Us" : "Log In"}</h2>
        </RightHeader>

        {!isCreate ? (
          <>
            <Form onSubmit={onSubmit}>
              <InputBox>
                <label htmlFor="email" className="eng">
                  Email
                </label>
                <Input
                  onChange={onChange}
                  name="email"
                  value={email}
                  placeholder="Email"
                  type="email"
                  id="email"
                  required
                />
              </InputBox>
              <InputBox>
                <label htmlFor="password" className="eng">
                  Password
                </label>
                <Input
                  onChange={onChange}
                  value={password}
                  name="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                  required
                />
              </InputBox>
              <Input
                type="submit"
                value={isLoading ? "Loading..." : "Log in"}
                className="eng"
              />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}

            <SocialBtnWrap>
              <em className="eng">OR</em>
              <GithubButton isCreate={isCreate} setIsCreate={setIsCreate} />
            </SocialBtnWrap>
          </>
        ) : (
          <CreateAccount isCreate={isCreate} setIsCreate={setIsCreate} />
        )}

        <Switcher>
          {isCreate ? (
            <>
              <em className="eng">Already an account?</em>
              <LinkButton onClick={() => setIsCreate(false)} className="eng">
                Log in
              </LinkButton>
            </>
          ) : (
            <>
              <em className="eng">Dont'have an account?</em>
              <LinkButton onClick={() => setIsCreate(true)} className="eng">
                Create one
              </LinkButton>
            </>
          )}
        </Switcher>
      </RightSide>
    </Container>
  );
}
