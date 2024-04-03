import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Ad from "./common/Ad";
import Navigation from "./common/Navigation";

const Main = styled.main``;

const Footer = styled.footer``;

export default function Layout() {
  return (
    <Main>
      <Navigation />

      <Outlet />

      <Ad />
      <Footer>footer</Footer>
    </Main>
  );
}
