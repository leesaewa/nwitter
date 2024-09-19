import styled from "styled-components";

// form
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* background-color: #ffffff; */
  padding: 1rem;
  border-radius: 8px;
  border: 1.5px solid maroon;
`;

export const InputBox = styled.div`
  margin-bottom: 10px;
`;

export const InputBoxLabel = styled.label`
  display: block;
  font-family: "Cinzel Decorative", cursive;
  color: maroon;
  font-weight: bold;
  margin-bottom: 0.4rem;
`;

export const InputBoxInput = styled.input`
  background-color: maroon;
  border: 1.5px solid transparent;
  width: 100%;
  color: white;
  padding: 4px;

  &.login-input {
    border: 1px solid red;
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
  grid-column: span 5;

  em {
    position: absolute;
    bottom: 0;
    right: 0;
    color: black;
    font-size: 16px;
  }
`;

export const UserWrapper = styled.div`
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

export const Headline = styled.h2`
  &.headline {
    color: maroon;
    font-size: 4em;
    line-height: 5rem;
  }
`;
export const Subhead = styled.h3`
  &.subhead {
    color: #4c0202;
    font-size: 3em;
    border-top: 1px solid maroon;
    padding-top: 1rem;
    margin-top: 1rem;
    line-height: 4rem;
  }
`;

export const Option = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1.5px solid maroon;
  border-bottom: 1.5px solid maroon;
`;

// post
export const ReportContainer = styled.article`
  break-inside: avoid;
  border-radius: 0.75rem;
  border: 1.5px solid maroon;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  &:first-of-type {
    column-span: all !important;
    column-count: 1 !important;

    figure {
      column-count: 3 !important;
    }

    .headline {
      font-size: 7em;
      line-height: 7rem;
    }
    .subhead {
      font-size: 5em;
      line-height: 6rem;
    }

    p {
      em {
        display: block;
        font-size: 10em;
      }
    }
  }

  &.short:first-child {
    figure {
      column-count: 2 !important;
    }
  }

  &.short {
    column-span: all;

    figure {
      column-count: 2;
    }
  }
  &.middle {
    column-count: 2;
    column-span: all;
  }
  &.long {
    column-span: all;

    figure {
      column-count: 3;
    }
  }
`;
export const ReportHeadline = styled.div`
  position: relative;

  > div {
    padding: 1.4rem;
  }
`;
export const ReportFigure = styled.figure`
  padding: 1rem;
  > img {
    border-radius: 8px;
  }
`;
export const ReportCaption = styled.figcaption``;

export const ReportCont = styled.div`
  line-height: 1.8rem;
  color: maroon;
  word-break: break-word;

  &:first-child {
    &:first-letter {
      font-size: 72px;
      float: left;
      padding: 10px 2rem 10px 0;
      margin-right: 10px;
      color: #ffd020;
      text-shadow: 2px 2px 0 maroon;
      line-height: 70px;
      text-transform: uppercase;
    }
    &:first-line {
      font-weight: bold;
      font-size: 24px;
    }
  }

  &.ko {
    &:first-letter {
      margin-right: 0;
      padding: 0 1rem 10px 0;
      line-height: 60px;
    }
  }
`;
