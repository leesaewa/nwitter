import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset};
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


`;

export const Section = styled.section``;

export default GlobalStyles;
