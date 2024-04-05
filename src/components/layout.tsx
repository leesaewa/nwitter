import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Ad from "./common/Ad";
import Navigation from "./common/Navigation";
import { useModal } from "./common/Modal";
import PostTweetForm from "./post-tweet-form";
import { Button } from "../style/GlobalStyles";
import { HiMiniPencilSquare, HiMiniXMark } from "react-icons/hi2";

const Main = styled.div`
  margin: 0 auto;
`;

const Footer = styled.footer``;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ModalContent = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
  z-index: 9999;
`;

const ModalOpenBtn = styled(Button)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`;
const ModalCloseBtn = styled(Button)``;

const Overlay = styled.div`
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

export default function Layout() {
  const { openModal } = useModal(); // 모달 열기 함수를 가져옴
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Main className="root_container">
      <Navigation />

      <Outlet />

      <Ad />
      <Footer>footer</Footer>

      {/* 전역 modal 추가 // floating 예정 */}
      <ModalOpenBtn onClick={handleOpenModal}>
        <HiMiniPencilSquare />
      </ModalOpenBtn>
      {isModalOpen && (
        <ModalWrapper>
          <Overlay onClick={handleCloseModal} />
          <ModalContent>
            <PostTweetForm />
            <ModalCloseBtn onClick={handleCloseModal}>
              <HiMiniXMark />
            </ModalCloseBtn>
          </ModalContent>
        </ModalWrapper>
      )}
      {/* 전역 modal 추가 // floating 예정 */}
    </Main>
  );
}
