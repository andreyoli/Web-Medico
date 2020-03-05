import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    color: #555;
  }
  body {
    font-size: 16px;
    background-color: #e6e6e6;
    -webkit-font-smoothing: antialiased !important;
  }
  html, body, #root {
    height: 100%;
  }
  button {
    background-color: #f6f6f6;
    border: none;
    padding: 5px;
    transition: all 500ms;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.3);
    }
  }
  input[type=submit] {
    &:hover {
      cursor: pointer;
    }
  }
`;
