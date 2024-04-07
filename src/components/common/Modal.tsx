import React, { createContext, useContext, useState } from "react";
import { HiMiniPencilSquare, HiMiniXMark } from "react-icons/hi2";
import {
  ModalWrapper,
  ModalContent,
  ModalHeader,
  ModalTitle,
  Overlay,
  ModalCloseBtn,
  ConfirlBtn,
  BasicText,
} from "../../style/Modal";
import PostTweetForm from "../post-tweet-form";

// 모달 관련 상태를 담을 새로운 Context 생성
const ModalContext = createContext();

// 모달 Provider 컴포넌트
export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isForm, setIsForm] = useState(false);

  // 모달 열기 함수
  const openModal = (content, tweetForm = false) => {
    setModalContent(content);
    setIsModalOpen(true);
    setIsForm(tweetForm);
    document.body.style.overflow = "hidden";
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setIsForm(false);
    document.body.style.overflow = "auto";
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, modalContent, openModal, closeModal }}
    >
      {children}
      {isModalOpen && (
        <ModalWrapper>
          <Overlay onClick={closeModal} />
          <ModalContent className="basic-modal-cont">
            <ModalHeader>
              <ModalTitle>{isForm ? "Post!" : "알림"}</ModalTitle>
              {isForm && (
                <ModalCloseBtn onClick={closeModal}>
                  <HiMiniXMark />
                </ModalCloseBtn>
              )}
            </ModalHeader>
            {isForm && <PostTweetForm onCloseModal={closeModal} />}
            <BasicText>{modalContent}</BasicText>
            <ConfirlBtn onClick={closeModal}>확인</ConfirlBtn>
          </ModalContent>
        </ModalWrapper>
      )}
    </ModalContext.Provider>
  );
};

// useContext를 통해 모달 관련 상태와 함수를 사용할 수 있는 훅
export const useModal = () => useContext(ModalContext);
