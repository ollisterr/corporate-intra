import { css } from "styled-components";
import theme, { Color } from "./theme";
import { gradientAnim } from "./keyframes";

// output random color
export const randomColor = (): Color => {
  const useless: Color[] = [
    "black",
    "white",
    "yellow",
    "alert",
    "success",
    "grey",
    "lightblue",
    "grey-light",
    "grey-dark",
  ];
  const alternatives = (Object.keys(theme.colors) as Color[]).filter(
    (c) => !useless.includes(c)
  );
  const randomIndex = Math.floor(Math.random() * alternatives.length);
  return alternatives[randomIndex];
};

// animate background color with given color parameters
export const vibrantColors = (...colors: Color[]) => css`
  background: linear-gradient(
    to right,
    ${(p) => colors.map((c) => p.theme.colors[c]).join(", ")}
  );
  background-size: ${() => colors.length * 100 + 1}% 100%;
  animation: ${gradientAnim} 6s ease-in-out infinite;
`;
