import styled, { css } from "styled-components";

import { Color } from "./theme";
import { vibrantColors } from "./utils";

export const buttonStyle = css<{
  color?: Color;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(p) => p.theme.typography.action}
  padding: ${(p) => p.theme.spacing.default} ${(p) => p.theme.spacing.large};
  background: transparent;
  text-align: center;
  color: ${(p) => p.theme.colors[p.color || "seaweed"]};
  transition: color 0.2s 0.1s;

  &:before, &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  &:before {
    ${vibrantColors("seaweed", "purple")};
    transform: scaleX(0);
    transform-origin: center left;
    transition: transform 0.3s ease-in-out, border-color 0.2s;
  }

  &:after {
    box-sizing: content-box;
    padding: 2px;
    border: solid 2px ${(p) => p.theme.colors[p.color || "seaweed"]};
    transition: opacity 0.3s 0.1s;
    opacity: 0;
    z-index: -5;
  }

  &:hover {
    color: ${(p) => p.theme.colors.white};

    &:before {
      transform: scaleX(1);
    }
    &:after {
      opacity: 1;
    }
  }
`;

export const Button = styled.button.attrs({ type: "button" })`
  ${buttonStyle}
`;

export const ButtonSoft = styled.button<{ disabled?: boolean }>`
  ${(p) => p.theme.typography.action}
  width: 100%;
  padding: ${(p) => p.theme.spacing.default};
  border-radius: 5px;
  ${vibrantColors("seaweed", "turquoise")}
  color: ${(p) => p.theme.colors.white};
  transition-property: box-shadow, transform, background-color;
  transition-duration: 0.2s;
  cursor: pointer;

  ${(p) => p.disabled && `background-color: ${p.theme.colors.grey}`}

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const Divider = styled.div`
  width: 20rem;
  height: 0.1rem;
  background-color: ${(p) => p.theme.colors.grey};
  margin: ${(p) => p.theme.spacing.large} auto;
`;
