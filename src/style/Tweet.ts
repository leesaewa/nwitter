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
  color: maroon;
`;
export const Subhead = styled.h3`
  color: maroon;
`;

export const Option = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 0;
  padding: 1rem 0;
  border-top: 1.5px solid maroon;
  border-bottom: 1.5px solid maroon;
`;

// post
export const ReportContainer = styled.article`
  /* break-inside: avoid; */
  /* aspect-ratio: 4 / 3; */
  /* background: pink;
  padding: 1rem;
  border-radius: 0.75rem; */
  /* flex: 0 0 calc((100% - 2rem) / 3);
  aspect-ratio: 4 / 3; */
  /* background: pink; */
  padding: 1rem;
  border-radius: 0.75rem;
  /* break-inside: avoid; */
  border: 1.5px solid maroon;

  /* &::before {
    counter-increment: grid;
    content: counter(grid);
  } */

  &:first-of-type {
    /* aspect-ratio: 1; */
    /* flex-basis: calc(100% - 1rem);  */
    /* margin: 0 0 1em; 
    break-inside: avoid; */
    grid-column: 1/-1;

    figure {
      column-count: 2;

      figcaption {
        .first {
          font-size: 5em;
        }
      }
    }

    h2 {
      font-size: 7em;
    }
    h3 {
      font-size: 5em;
    }

    p {
      em {
        display: block;
        font-size: 10em;
      }
    }
  }

  &.short {
    /* background-color: red; */
    /* column-count: 1; */

    &.img {
      /* column-count: 2; */
      grid-column: span 2;
    }
  }
  &.middle {
    /* background-color: blue; */
    /* column-count: 2; */
  }
  &.long {
    /* background-color: violet; */
    grid-column: 1/-1;
    column-count: 2;

    h2 {
      font-size: 4em;
    }
    h3 {
      font-size: 2em;
    }
  }
`;
export const ReportHeadline = styled.div`
  position: relative;
`;
export const ReportFigure = styled.figure`
  > img {
    border-radius: 8px;
  }
`;
export const ReportCaption = styled.figcaption``;

export const ReportCont = styled.div`
  line-height: 1.4rem;
  color: maroon;
`;
