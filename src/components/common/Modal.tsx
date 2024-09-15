import { ReactNode, createContext, useContext, useState } from "react";
import {
  ModalWrapper,
  ModalContent,
  ModalHeader,
  ModalTitle,
  Overlay,
  ConfirmBtn,
  BasicText,
} from "../../style/Modal";

// createContext의 기본값으로 undefined를 설정
const ModalContext = createContext<
  | {
      isModalOpen: boolean;
      modalContent: React.ReactNode | null;
      openModal: (content: ReactNode) => void;
      closeModal: () => void;
    }
  | undefined
>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  const openModal = (content: ReactNode) => {
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
              <ModalTitle>알림</ModalTitle>
            </ModalHeader>

            <BasicText>{modalContent}</BasicText>

            <ConfirmBtn onClick={closeModal}>확인</ConfirmBtn>
          </ModalContent>
        </ModalWrapper>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
