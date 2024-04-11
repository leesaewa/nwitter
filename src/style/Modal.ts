import styled from "styled-components";
import { Button } from "./Profile";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ModalContent = styled.div`
  position: relative;
  width: 800px;
  height: fit-content;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 1rem;
  z-index: 9999;

  &.basic-modal-cont {
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    color: maroon;
    text-align: center;
    padding: 0;
    overflow: hidden;

    > div {
      display: block;
      border-bottom: 1px solid maroon;
      padding: 1rem 0;
      margin-bottom: 0;
    }
  }

  &.edit-modal {
    > div {
      display: block;
      border-bottom: 1px solid maroon;
      padding: 0 0 1rem;
      margin-bottom: 1rem;
    }
  }
`;

export const EditDelete = styled(Button)`
  background-color: maroon;
`;

export const ModalButtonContainer = styled.p`
  margin-top: 1rem;
  display: flex;

  button {
    border-radius: 0;
    display: flex;
    align-items: center;
    width: auto;
    flex: 1;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const ModalTitle = styled.h2`
  color: maroon;
  font-size: 2em;
`;

export const BasicText = styled.p`
  margin: 4rem 0;
  padding: 0 1rem;
  font-size: 1.4em;
  line-height: 1.5;

  span {
    display: block;
  }
`;

export const ModalCloseBtn = styled(Button)`
  width: 36px;
  height: 36px;
  background-color: black;
  border-radius: 4px;
  color: white;
  font-size: 1em;
`;

export const ConfirmBtn = styled(Button)`
  height: 40px;
  background-color: maroon;
  color: white;
  font-size: 1em;

  &:hover {
    background-color: #4c0202;
  }
`;

export const Overlay = styled.div`
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const CancelButton = styled.button``;
