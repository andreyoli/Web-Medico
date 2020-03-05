import styled from "styled-components";

export const Container = styled.div`
  width: 1000px;
  height: 800px;
  padding: 20px;
  border-radius: 20px;
  overflow-y: scroll;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    input {
      margin-right: 20px;
      padding: 5px;
      border: none;
      border-radius: 5px;
      background-color: #f6f6f6;
      font-size: 18px;
      &::placeholder {
        color: rgba(5, 5, 5, 0.5);
      }
    }
  }
`;

export const CheckContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px;
  label {
    margin: 30px;
    white-space: nowrap;
  }
  input {
    margin-left: 20px;
  }
`;
