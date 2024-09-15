import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navigation from "./common/Navigation";
import PostTweetForm from "./post-tweet-form.tsx";
import { Button } from "../style/GlobalStyles";
import { HiMiniPencilSquare, HiMiniXMark } from "react-icons/hi2";

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

const Footer = styled.footer`
  text-align: center;
  padding: 2rem 0;
  color: maroon;
  border-top: 1.5px solid maroon;
  margin-top: 2rem;
`;

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기
  const handleOpenModal = () => {
    setIsModalOpen(true);
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

      <Outlet />

      {/* <Ad /> */}
      <Footer>The Daily Prophet</Footer>
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
