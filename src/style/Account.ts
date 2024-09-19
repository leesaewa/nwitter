import styled from "styled-components";
import { Button } from "./GlobalStyles";

export const Container = styled.main`
  display: flex;
  /* grid-template-columns: 1fr 1fr; */
  align-items: center;
  justify-content: center;
  /* gap: 2rem; */
  width: 100%;
  height: 100vh;
  max-width: 1800px;
  margin: 0 auto;
`;

export const Video = styled.video`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: -2;
`;

export const LeftSide = styled.section`
  overflow: hidden;
  position: relative;
  /* width: 100%;
  padding-bottom: 56.25%; */

  &::after {
    content: "";
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.6;
    z-index: -1;
  }

  /* iframe {
    position: absolute;
    top: -60px;
    bottom: -60px;
    left: 0;
    width: 100%;
    height: calc(100% + 120px);
    border: none;
  } */
`;
export const RightSide = styled.section`
  /* border: 1px solid red; */
  background-color: rgba(255, 255, 255, 0.86);
  border-radius: 10px;
  padding: 2rem;
`;
export const RightHeader = styled.header`
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  h2 {
    width: 100%;
    text-align: center;
    font-size: 3em;
    color: maroon;
    margin-top: 2rem;
    border-bottom: 1.5px solid #4c0202;
    padding-bottom: 2rem;
  }
`;
export const Logo = styled.img`
  width: 100px;
`;
export const LogoTitle = styled.h1`
  font-size: 3em;
  color: maroon;
`;

export const Form = styled.form`
  margin-top: 2rem;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;

  &::placeholder {
    color: #ddd;
  }

  &[type="submit"] {
    cursor: pointer;
    background-color: black;
    color: white;

    &:hover {
      background-color: white;
      color: black;
    }
  }
`;

export const ModalOpenBtn = styled(Button)``;

export const Error = styled.span`
  font-weight: bold;
  color: tomato;
`;

export const Switcher = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
  border-top: 1.5px solid #4c0202;
  padding-top: 1rem;

  em {
    margin-bottom: 1rem;
    color: #4c0202;
  }
`;

export const LinkButton = styled(Button)`
  width: 100%;
  height: 30px;
  background-color: transparent;
  border: 1.5px solid #4c0202;
  border-radius: 50px;
  color: #4c0202;
  font-size: 1rem;

  &:hover {
    background-color: #4c0202;
    color: white;
  }
`;

export const SocialBtnWrap = styled.p`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  em {
    text-align: center;
    color: maroon;
    margin: 2rem auto;
  }
`;
