import { Link } from "react-router-dom";
import styled from "styled-components";

// form
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

export const InputBox = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 1fr;
  align-items: center;
  margin-bottom: 10px;

  label {
    font-family: "Cinzel Decorative", cursive;
    color: maroon;
    font-weight: bold;
  }
  input {
    background-color: maroon;
    border: 1.5px solid transparent;
    width: 100%;
    color: white;
    padding: 4px;
  }
`;

export const PostWrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 10px;
`;

export const UploadWrap = styled.div`
  display: flex;
  column-gap: 20px;
  width: 100%;
`;

export const UploadInner = styled.div`
  cursor: pointer;
  position: relative;
  width: 100%;
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileThumbnail = styled.img`
  width: 100%;
  height: inherit;
  object-fit: contain;
`;

export const TextareaWrap = styled.div`
  position: relative;
  grid-column: span 4;

  em {
    position: absolute;
    bottom: 0;
    right: 0;
    color: black;
    font-size: 16px;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 6px 8px;
  margin-bottom: 20px;
  color: white;
  background-color: maroon;
  border: 1px solid transparent;
  resize: none;

  &::placeholder {
    color: #ddd;
  }
`;

export const UserWrapper = styled.div`
  border: 1px solid green;

  a {
    display: inline-flex;
    align-items: center;
    gap: 10px;

    > div {
      position: relative;
      display: flex;
      flex-direction: column;

      em {
        font-size: 12px;
        margin-bottom: 4px;
      }
    }

    &:hover {
      span {
        &.hover {
          width: 100%;
        }
      }
    }
  }
`;

export const Avatar = styled.img`
  max-width: 100%;
  width: 60px;
  height: 60px;
  object-fit: cover;
  background-color: white;
  border-radius: 6px;
  border: 2px solid maroon;

  &.no-img {
    padding: 4px;
  }
`;
export const Username = styled.span`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 6px;

  &.hover {
    position: absolute;
    left: 0;
    display: inline-block;
    width: 0;
    color: black;
    transition: width 500ms;
    overflow: hidden;
    white-space: pre;
    border-bottom: 1px solid;
  }
`;

export const Title = styled.h2`
  font-size: 9em;
`;
