import { Link } from "react-router-dom";
import styled from "styled-components";

// form

export const UserWrapper = styled.div`
  border: 1px solid green;

  a {
    display: inline-flex;
    align-items: center;
    gap: 10px;

    > div {
      position: relative;
      display: flex;
      flex-direction: column;

      em {
        font-size: 12px;
        margin-bottom: 4px;
      }
    }

    &:hover {
      span {
        &.hover {
          width: 100%;
        }
      }
    }
  }
`;

export const Avatar = styled.img`
  max-width: 100%;
  width: 60px;
  height: 60px;
  object-fit: cover;
  background-color: white;
  border-radius: 6px;
  border: 2px solid maroon;

  &.no-img {
    padding: 4px;
  }
`;
export const Username = styled.span`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 6px;

  &.hover {
    position: absolute;
    left: 0;
    display: inline-block;
    width: 0;
    color: black;
    transition: width 500ms;
    overflow: hidden;
    white-space: pre;
    border-bottom: 1px solid;
  }
`;

export const Title = styled.h2`
  font-size: 9em;
`;
