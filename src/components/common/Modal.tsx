import React, { createContext, useContext, useState } from "react";

// 모달 관련 상태를 담을 새로운 Context 생성
const ModalContext = createContext();

// 모달 Provider 컴포넌트
export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // 모달 열기 함수
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, modalContent, openModal, closeModal }}
    >
      {children}
      {isModalOpen && (
        <div className="modal">
          {modalContent}
          <div onClick={closeModal} /> {/* overlay 추가 */}
          <button onClick={closeModal}>Close Modal</button>
        </div>
      )}
    </ModalContext.Provider>
  );
};

// useContext를 통해 모달 관련 상태와 함수를 사용할 수 있는 훅
export const useModal = () => useContext(ModalContext);
