import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../firebase";
import {
  HiMiniUserCircle,
  HiOutlineArrowLeftOnRectangle,
  HiMiniMagnifyingGlass,
} from "react-icons/hi2";
import { useEffect, useState } from "react";

const Header = styled.header`
  position: fixed;
  width: 100%;
  border-bottom: 1.5px solid maroon;
  transition: all 0.5s ease-in-out;
  z-index: 1;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1800px;
    width: 100%;
    margin: 0 auto;
    padding: 10px 0;
    transition: all 0.5s ease-in-out;
  }

  &.scrolled {
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(6px);
    z-index: 9;

    > div {
      padding: 4px 0;
    }
    img {
      width: 50px;
    }

    h1 {
      font-size: 1.4em;
    }
  }
`;

const LogoWrap = styled.div`
  max-width: 580px;
  a {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
const Logo = styled.img`
  width: 70px;
  transition: all 0.5s ease-in-out;
`;
const LogoTitle = styled.h1`
  font-size: 2em;
  width: 100%;
  transition: all 0.5s ease-in-out;

  em {
    color: #ffd020;
    -webkit-text-stroke: 1px maroon;
  }
`;

const Menu = styled.nav``;

const MenuInner = styled.ul`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const MenuItem = styled.li`
  font-size: 2.3em;

  a {
    display: flex;
    align-items: center;
    flex-direction: column;

    &:hover {
      color: black;
    }
  }
`;

const MenuText = styled.span`
  display: block;
  padding-top: 2px;
  font-size: 10px;
  font-weight: 400;
`;

export default function Navigation() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const onLogOut = async () => {
    const ok = confirm("Are you sure you want to log out?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Header className={scrolled ? "scrolled" : ""}>
      <div>
        <LogoWrap>
          <Link to="/">
            <Logo src="/logo.png" alt="" />
            <LogoTitle className="eng">
              THE DAILY <em>P</em>ROPHET
            </LogoTitle>
          </Link>
        </LogoWrap>
        <Menu>
          <MenuInner>
            <MenuItem>
              <Link to="/profile">
                <HiMiniUserCircle />
                <MenuText className="eng">My Page</MenuText>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/">
                <HiMiniMagnifyingGlass />
                <MenuText className="eng">Search</MenuText>
              </Link>
            </MenuItem>
            <MenuItem className="log-out" onClick={onLogOut}>
              <Link to="">
                <HiOutlineArrowLeftOnRectangle />
                <MenuText className="eng">Logout</MenuText>
              </Link>
            </MenuItem>
          </MenuInner>
        </Menu>
      </div>
    </Header>
  );
}
