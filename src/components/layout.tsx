import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Ad from "./common/Ad";
import Navigation from "./common/Navigation";
import { useModal } from "./common/Modal";
import PostTweetForm from "./post-tweet-form";
import { Button } from "../style/GlobalStyles";
import { HiMiniPencilSquare, HiMiniXMark } from "react-icons/hi2";
import Left from "./common/Left";
import {
  ModalWrapper,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalCloseBtn,
  Overlay,
} from "../style/Modal";
import ScrollToTop from "./common/ScrollToTop";

const Main = styled.div`
  margin: 0 auto;
`;

const Container = styled.main`
  max-width: 1800px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 2rem;
  padding-top: 100px;
`;

const Footer = styled.footer``;

const ModalOpenBtn = styled(Button)`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  background-color: maroon;
  color: white;
  border-radius: 50%;
  font-size: 1em;

  &:hover {
    background-color: #4c0202;
  }
`;

export default function Layout() {
  const { openModal } = useModal(); // 모달 열기 함수를 가져옴
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기
  const handleOpenModal = () => {
    setIsModalOpen(true);
    // openModal("", true);
    document.body.style.overflow = "hidden";
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <Main className="root_container">
      <Navigation />

      <Container className="main-container">
        <Left />
        <Outlet />
      </Container>
      <Ad />
      <Footer>footer</Footer>
      <ScrollToTop />

      <ModalOpenBtn onClick={handleOpenModal}>
        <HiMiniPencilSquare />
      </ModalOpenBtn>

      {isModalOpen && (
        <ModalWrapper>
          <Overlay onClick={handleCloseModal} />
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Post!</ModalTitle>
              <ModalCloseBtn onClick={handleCloseModal}>
                <HiMiniXMark />
              </ModalCloseBtn>
            </ModalHeader>
            <PostTweetForm onCloseModal={handleCloseModal} />
          </ModalContent>
        </ModalWrapper>
      )}
    </Main>
  );
}
