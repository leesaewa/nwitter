import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
  Container,
  Form,
  InputBoxInput,
  InputButton,
  Switcher,
  LeftSide,
  RightSide,
  Error,
  Logo,
  LogoTitle,
  RightHeader,
  LinkButton,
  SocialBtnWrap,
  Video,
} from "../style/Account";
import GithubButton from "../components/github-btn";
import { InputBox, InputBoxLabel } from "../style/Tweet";
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
        <Video autoPlay loop muted>
          <source src="/main.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </Video>
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
                <InputBoxLabel htmlFor="email" className="eng">
                  Email
                </InputBoxLabel>
                <InputBoxInput
                  onChange={onChange}
                  name="email"
                  value={email}
                  placeholder="Please enter your email."
                  type="email"
                  id="email"
                  required
                />
              </InputBox>
              <InputBox>
                <InputBoxLabel htmlFor="password" className="eng">
                  Password
                </InputBoxLabel>
                <InputBoxInput
                  onChange={onChange}
                  value={password}
                  name="password"
                  placeholder="Please enter your password."
                  type="password"
                  id="password"
                  required
                />
              </InputBox>
              <InputButton type="submit" className="eng">
                {isLoading ? "Loading..." : "Log in"}
              </InputButton>
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
              <em className="eng">Already have an account?</em>
              <LinkButton onClick={() => setIsCreate(false)} className="eng">
                Log in
              </LinkButton>
            </>
          ) : (
            <>
              <em className="eng">Don't have an account?</em>
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
