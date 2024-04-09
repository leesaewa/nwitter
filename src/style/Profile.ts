import styled from "styled-components";

export const Main = styled.main``;

export const Container = styled.div`
  max-width: 1800px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 2rem;
  padding-top: 100px;
`;

export const EditContainer = styled.div`
  width: 100%;
  position: relative;
  padding-top: 100px;
`;

// user infomation
export const UserInfo = styled.section`
  position: relative;
  border: 1px solid maroon;
`;

export const UserBox = styled.div`
  position: absolute;
  bottom: -4em;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Name = styled.span`
  height: 40px;
  text-align: center;
  color: maroon;
  font-size: 2em;
  margin-top: 1rem;
`;

export const NameInput = styled.input`
  all: unset;
  height: 100%;
  border: 1.5px solid maroon;
  border-radius: 8px;
`;

// avatar
export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: 3em;
  overflow: hidden;
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarUpload = styled.label`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: maroon;
  overflow: hidden;
`;

export const AvatarInput = styled.input`
  display: none;
`;

// cover
export const CoverWrapper = styled.div`
  width: 100%;
  height: 20em;
  overflow: hidden;
`;
export const CoverImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const CoverUpload = styled.label`
  cursor: pointer;
`;
export const CoverInput = styled.input`
  display: none;
`;

export const Tweets = styled.div``;

export const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  right: 0;
  z-index: 2;
`;

export const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 4px;
  width: 32px;
  height: 32px;
  border-radius: 3px;
  border: 1px solid transparent;
  font-size: 14px;
  color: white;
`;

export const EditBtn = styled(Button)`
  &.btn-save {
    background-color: #235caa;
  }
  &.btn-edit {
    background-color: maroon;
  }
  &.btn-cancel {
    background-color: #ffd020;
    color: maroon;
  }
`;
