import styled from "styled-components";

export const DeleteBtn = styled.button`
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 8px;
  border: 0;
  background-color: maroon;
  color: white;
  border-radius: 4px;
`;

export const SubmitBtn = styled.input`
  cursor: pointer;
  width: 100%;
  background-color: #ffd020;
  border: 0;
  border-radius: 6px;
  color: maroon;
  font-size: 18px;
  padding: 6px 0;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: black;
    color: white;
  }
`;
