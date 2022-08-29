import React from "react";
import styled from "styled-components";

import { media } from "../../styles/theme";

const MenuButton = ({ show, toggleShow }) => (
  <Wrapper onClick={() => toggleShow((x) => !x)}>
    <Line show={show} />
    <Line show={show} />
    <Line show={show} />
    <Line show={show} />
  </Wrapper>
);

const Wrapper = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(p) => p.theme.rem(24)};
  height: ${(p) => p.theme.rem(16)};
  padding: 0;
  background-color: transparent;

  ${media.lg`
    display: none;
  `}
`;

const Line = styled.div<{ show: boolean }>`
  position: absolute;
  width: 100%;
  height: ${(p) => p.theme.rem(2)};
  border-radius: 999px;
  background-color: ${(p) => p.theme.colors.grey};
  transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.15);

  &:nth-of-type(1) {
    top: 0;
    ${(p) => p.show && `transform: translateY(${p.theme.rem(7)});`}
    opacity: ${(p) => (p.show ? 0 : 1)};
  }
  
  &:nth-of-type(2) {
    top: 50%;
    ${(p) => p.show && `transform: rotate(-45deg);`};
  }
  
  &:nth-of-type(3) {
    top: 50%;
    ${(p) => p.show && `transform: rotate(45deg);`};
  }
  
  &:nth-of-type(4) {
    top: 100%;
    ${(p) => p.show && `transform: translateY(${p.theme.rem(-9)});`};
    opacity: ${(p) => (p.show ? 0 : 1)};
  }
`;

export default MenuButton;
