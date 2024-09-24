import { useState, useEffect } from "react";
import styled from "styled-components";
import { HiArrowSmallUp } from "react-icons/hi2";
import { Button } from "../../style/GlobalStyles";

const ScrollTopBtn = styled(Button)`
  position: fixed;
  bottom: 4rem;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: black;
  color: white;
  font-size: 1em;
  visibility: hidden;
  opacity: 0;
  z-index: 999;

  @media screen and (max-width: 991px) {
    bottom: 7rem;
  }

  &.visible {
    opacity: 1;
    visibility: visible;
  }

  &:hover {
    background-color: maroon;
  }
`;

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const ScrollY = window.scrollY;
    if (ScrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 최상단으로 스크롤하는 함수
  const onScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ScrollTopBtn className={isVisible ? "visible" : ""} onClick={onScrollTop}>
      <HiArrowSmallUp />
    </ScrollTopBtn>
  );
}
