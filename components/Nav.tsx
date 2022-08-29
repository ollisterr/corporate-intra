import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Stack } from "styled-layout";
import { useRouter } from "next/router";

import { Button } from "../styles";
import { media } from "../styles/theme";
import MenuButton from "./common/MenuButton";

export type LinkType = {
  name: string;
  storyName: string;
  slug: string;
};

const Nav = ({ links }: { links: LinkType[] }) => {
  const router = useRouter();

  const [show, toggleShow] = useState(true);
  const [isOpen, toggleIsOpen] = useState(false);
  const lastScrollPosition = useRef(0);

  const handleScrollEvent = (e) => {
    const window = e.currentTarget;
    if (
      lastScrollPosition.current > window.scrollY + 20 ||
      window.scrollY < 100
    ) {
      window.requestAnimationFrame(() => toggleShow(true));
    } else if (lastScrollPosition.current < window.scrollY) {
      window.requestAnimationFrame(() => toggleShow(false));
    }
    lastScrollPosition.current = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  const navigate = (slug) => {
    router.push(slug).then(() => {
      toggleIsOpen(false);
    });
  };

  return (
    <NavWrapper show={isOpen || show} isOpen={isOpen}>
      <Logo src="/svg/logo.svg" onClick={() => navigate("/")} />

      <RightStack axis="x" align="center">
        <LinkStack
          axis={{ _: "x", sm: "y" }}
          spacing={{ _: "default", sm: "xsmall" }}
          align="center"
          justify="center"
          isOpen={isOpen}
          fluid
        >
          {links.map((link) => (
            <LinkButton key={link.slug} onClick={() => navigate(link.slug)}>
              {link.name}
            </LinkButton>
          ))}
        </LinkStack>

        <MenuButton show={isOpen} toggleShow={toggleIsOpen} />
      </RightStack>
    </NavWrapper>
  );
};

const NavWrapper = styled.div<{ show: boolean; isOpen: boolean }>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  max-width: 100vw;
  padding: ${(p) => p.theme.spacing.xsmall} ${(p) => p.theme.spacing.default};
  background-color: ${(p) => p.theme.colors.white};
  z-index: 10;
  transform: translateY(${(p) => (p.show ? "0" : "-100%")});
  transition: transform 0.5s ease-in-out;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);

  ${(p) => media.sm`
    &:before {
      content: "";
      position: absolute;
      top: 100%;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: ${p.theme.colors.white};
      transform: scaleY(${p.isOpen ? "1" : "0"});
      transform-origin: center top;
      z-index: -1;
      transition: transform 800ms ease-in-out;
      pointer-events: ${p.isOpen ? "auto" : "none"};
      overflow: hidden;
    }
  `}
`;

const Logo = styled.img`
  height: 4rem;
  padding: ${(p) => p.theme.spacing.small};
  color: ${(p) => p.theme.colors.alert};
  cursor: pointer;
`;

const RightStack = styled(Stack)`
  margin-left: auto;
`;

const LinkStack = styled(Stack)<{ isOpen: boolean }>`
  margin-left: auto;
  padding: ${(p) => p.theme.spacing.xxsmall};

  ${(p) => media.sm`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    opacity: ${p.isOpen ? 1 : 0};
    transform: translateY(${p.isOpen ? 0 : 4}rem);
    transition: transform 800ms ease-in-out, opacity 300ms ease-in-out;
    transition-delay: ${p.isOpen ? 200 : 0}ms;
    pointer-events: ${p.isOpen ? "auto" : "none"};
    z-index: -1;
  `}
`;

const LinkButton = styled(Button)`
  min-width: 8rem;
`;

export default Nav;
