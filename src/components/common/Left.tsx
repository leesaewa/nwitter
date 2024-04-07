import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";

const Container = styled.aside``;

const Custom = styled.div`
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1.5px solid maroon;
`;

const SlideWrapper = styled(Custom)``;

const SlideInner = styled.div`
  position: relative;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;

  &:hover {
    button {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const Slide = styled.ul`
  display: flex;
  transition: transform 0.5s ease;
`;

const SlideItem = styled.li`
  flex: 0 0 100%;
`;

const SlideImg = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
`;

const Button = styled.button`
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  border-radius: 2px;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.6);
  visibility: hidden;
  opacity: 0;
`;
const PrevBtn = styled(Button)`
  left: 0;
`;
const NextBtn = styled(Button)`
  right: 0;
`;

const Title = styled.h2`
  font-size: 3.5em;
  color: maroon;
  margin-bottom: 1rem;

  em {
    letter-spacing: 6px;
  }
`;

const RankingWrapper = styled(Custom)`
  margin-top: 2rem;
  h2 {
    em {
      font-size: 2.7rem;
      letter-spacing: inherit;
    }
  }
`;
const Ranking = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
  gap: 1rem;
`;
const RankingList = styled.li`
  text-align: center;

  a {
    display: block;
    &:hover {
      img {
        transform: scale(0.9);
      }
      span {
        font-weight: bold;
      }
    }
  }
`;
const UserImg = styled.p`
  background-color: white;
  padding: 0.2rem;
  border-radius: 6px;
  overflow: hidden;

  img {
    width: 100%;
    height: 57px;
    object-fit: cover;
    transition: all 0.5s ease-in-out;
  }
`;
const UserName = styled.span`
  font-size: 0.8rem;
  transition: all 0.5s ease-in-out;
`;

export default function Left() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    // 슬라이드에 추가할 이미지 경로들
    "/wanted01.jpg",
    "/wanted02.jpg",
    "/wanted03.jpg",
    "/wanted04.jpg",
  ];

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const rankingList = [
    { img: "/logo.png", username: "test name", link: "" },
    { img: "/logo.png", username: "test name2", link: "" },
    { img: "/logo.png", username: "test name3", link: "" },
    { img: "/logo.png", username: "test name4", link: "" },
    { img: "/logo.png", username: "test name5", link: "" },
    { img: "/logo.png", username: "test name6", link: "" },
  ];

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // 3초마다 슬라이드 전환
    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="container">
      <SlideWrapper>
        <Title className="eng">
          Have you seen this <em>WIZARD?</em>
        </Title>
        <SlideInner>
          <Slide style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <SlideItem key={index}>
                <SlideImg src={slide} alt={`Slide ${index}`} />
              </SlideItem>
            ))}
          </Slide>
          <PrevBtn onClick={prevSlide}>
            <HiChevronLeft />
          </PrevBtn>
          <NextBtn onClick={nextSlide}>
            <HiChevronRight />
          </NextBtn>
        </SlideInner>
      </SlideWrapper>

      <RankingWrapper>
        <Title className="eng">
          The most popular <em>journalist</em>
        </Title>

        <Ranking>
          {rankingList.map((list, index) => (
            <RankingList key={index}>
              <Link to={list.link}>
                <UserImg>
                  <img src={list.img} alt="" />
                </UserImg>
                <UserName>{list.username}</UserName>
              </Link>
            </RankingList>
          ))}
        </Ranking>
      </RankingWrapper>
    </Container>
  );
}
