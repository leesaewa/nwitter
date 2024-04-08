import React, { createContext, useContext, useState } from "react";
import { HiMiniPencilSquare, HiMiniXMark } from "react-icons/hi2";
import {
  ModalWrapper,
  ModalContent,
  ModalHeader,
  ModalTitle,
  Overlay,
  ModalCloseBtn,
  ConfirmBtn,
  BasicText,
  CancelButton,
} from "../../style/Modal";
import PostTweetForm from "../post-tweet-form";

// 모달 관련 상태를 담을 새로운 Context 생성
const ModalContext = createContext();

// 모달 Provider 컴포넌트
export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isForm, setIsForm] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(null);

  // 모달 열기 함수
  const openModal = (content, tweetForm = false, callback = null) => {
    setModalContent(content);
    setIsModalOpen(true);
    setIsForm(tweetForm);
    setConfirmCallback(callback);
    document.body.style.overflow = "hidden";
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setIsForm(false);
    setConfirmCallback(null);
    document.body.style.overflow = "auto";
  };

  const handleConfirm = () => {
    if (confirmCallback) {
      confirmCallback(); // confirmCallback 함수 실행
    }
    closeModal(); // 모달 닫기
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
              <ModalTitle>
                {isForm ? "Post!" : isCreate ? "회원가입" : "알림"}
              </ModalTitle>
              {isForm && (
                <ModalCloseBtn onClick={closeModal}>
                  <HiMiniXMark />
                </ModalCloseBtn>
              )}
            </ModalHeader>
            {isForm && <PostTweetForm onCloseModal={closeModal} />}

            <BasicText>{modalContent}</BasicText>

            {confirmCallback ? (
              <>
                <CancelButton onClick={closeModal}>취소</CancelButton>
                <ConfirmBtn onClick={handleConfirm} className="test">
                  확인
                </ConfirmBtn>
              </>
            ) : (
              <ConfirmBtn onClick={closeModal}>확인</ConfirmBtn>
            )}
          </ModalContent>
        </ModalWrapper>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
