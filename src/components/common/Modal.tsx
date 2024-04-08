import React, { createContext, useContext, useState } from "react";
import {
  ModalWrapper,
  ModalContent,
  ModalHeader,
  ModalTitle,
  Overlay,
  ConfirmBtn,
  BasicText,
} from "../../style/Modal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    document.body.style.overflow = "auto";
  };

  const modalContextValue = {
    isModalOpen,
    modalContent,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
      {isModalOpen && (
        <ModalWrapper>
          <Overlay onClick={closeModal} />
          <ModalContent className="basic-modal-cont">
            <ModalHeader>
              <ModalTitle>알림"</ModalTitle>
            </ModalHeader>

            <BasicText>{modalContent}</BasicText>

            <ConfirmBtn onClick={closeModal}>확인</ConfirmBtn>
          </ModalContent>
        </ModalWrapper>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
