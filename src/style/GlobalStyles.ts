import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset};

  /* scrollbar custom */
  body::-webkit-scrollbar,
  .scroll::-webkit-scrollbar {
      width: 10px;
  }

  /* background of the scrollbar except button or resizer */
  body::-webkit-scrollbar-track {
      background-color: #fff;
  }
  .scroll::-webkit-scrollbar-track {
    background-color: none;
  }

  /* scrollbar itself */
  body::-webkit-scrollbar-thumb,
  .scroll::-webkit-scrollbar-thumb {
      background-color: maroon;
      border-radius: 16px;
      border: 2px solid #fff;
  }
  body::-webkit-scrollbar-button,
  .scroll::-webkit-scrollbar-button {
      display:none;
  }

  * {
    box-sizing: border-box;
  }
  body {
    background-image:url('/paper.jpg');
    color:white;
    font-family: "Hahmlet", serif;
  }

  .container{
    border:1px solid red
  }
  .eng {
    font-family: "Cinzel Decorative", cursive;
    font-weight: bold;
  }
  a {
    color: maroon;
    text-decoration: none;

  }
  a:hover {
    color:maroon
  }

  input, textarea {
    font-family: "Hahmlet", serif;
    border-radius: 6px;

    &:focus {
      outline: 4px solid #80000060;
      border-color: #38040e;
    }
  }

  textarea {
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
  }

  button, input[type="submit"], .file-upload {
    transition: all 0.5s ease-in-out;
  }

  .file-upload {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 120px;
    color: maroon;
    font-size: 18px;
    border: 1.5px solid maroon;
    border-radius: 6px;
    overflow: hidden;

    &:hover {
      background-color: #ffd020;
    }
  }

  button {

  }


  .test-layout{
    /* columns: 25rem;
    gap: 1rem;
    counter-reset: grid; */display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

`;

export const Section = styled.section``;

export default GlobalStyles;
