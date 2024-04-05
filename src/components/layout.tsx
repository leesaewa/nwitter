import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Ad from "./common/Ad";
import Navigation from "./common/Navigation";

const Main = styled.div`
  margin: 0 auto;
`;

const Footer = styled.footer``;

export default function Layout() {
  return (
    <Main className="root_container">
      <Navigation />

      <Outlet />

      <Ad />
      <Footer>footer</Footer>
    </Main>
  );
}
