import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-image:url('/public/paper.jpg');
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
`;

export default GlobalStyles;
