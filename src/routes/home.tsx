import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await auth.signOut();
      navigate("/login"); // 로그아웃 후에 로그인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 중 에러 발생:", error);
    }
  };

  return <button onClick={logOut}>Log Out</button>;
}
