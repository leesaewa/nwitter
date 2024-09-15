import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  background-color: maroon;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  font-weight: bold;
  color: white;
  transition: all 0.5s ease-in-out;

  &:hover {
    background-color: #4c0202;
  }
`;

const Logo = styled.img`
  height: 25px;
  filter: invert(1) brightness(150%);
`;

export default function GithubButton({
  isCreate,
  setIsCreate,
}: {
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);

      if (!isCreate) {
        navigate("/");
      } else {
        setIsCreate(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button onClick={onClick} className="eng">
      <Logo src="/github-logo.svg" />
      {isCreate ? "Sign up with Github" : "Log in with Github"}
    </Button>
  );
}
