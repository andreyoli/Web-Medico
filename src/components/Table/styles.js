import styled from "styled-components";

export const Container = styled.div`
  width: 1000px;
  height: 800px;
  padding: 20px;
  border-radius: 20px;
  background-color: #74b9ff;
  overflow-y: scroll;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;

  h1 {
    color: #f6f6f6;
  }
  table {
    margin-top: 20px;
    width: 100%;
    border-spacing: 0;
    border-bottom: 1px solid rgba(5, 5, 5, 0.2);
    background-color: #e6e6e6;
    border-radius: 5px;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid rgba(5, 5, 5, 0.2);
      border-right: 1px solid rgba(5, 5, 5, 0.2);

      button {
        background-color: transparent;
        &:hover {
          box-shadow: none;
        }
      }

      :last-child {
        border-right: 0;
        text-align: center;
      }
    }
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  input {
    margin-right: 20px;
    width: 100%;
    padding: 5px;
    border: none;
    border-radius: 5px;
    background-color: #f6f6f6;
    font-size: 18px;
    &::placeholder {
      color: rgba(5, 5, 5, 0.5);
    }
  }
`;
