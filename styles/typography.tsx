import styled from "styled-components";

import { Color } from "./theme";

export const BaseText = styled.span<{
  color?: Color;
  size?: number;
  align?: "left" | "center" | "right";
  bolded?: boolean;
  italic?: boolean;
}>`
  color: inherit;
  margin: 0;
  padding: 0;
  color: ${(p) => (p.color ? p.theme.colors[p.color] : "inherit")};
  ${(p) => p.size && `font-size: ${p.size};`}
  text-align: ${(p) => p.align || "inherit"};
  ${(p) => p.bolded && "font-weight: bold !important;"}
  ${(p) => p.italic && "font-style: italic !important;"}
  max-width: 70ch;
`;

export const Title = styled(BaseText).attrs({ as: "h2" })`
  ${(p) => p.theme.typography.title}
  padding-top: ${(p) => p.theme.spacing.default};
  `;

export const Subtitle = styled(BaseText).attrs({ as: "h3" })`
  ${(p) => p.theme.typography.subtitle}
  padding-top: ${(p) => p.theme.spacing.default};
`;

export const Text = styled(BaseText).attrs({ as: "p" })`
  ${(p) => p.theme.typography.body}
`;

export const Small = styled(BaseText).attrs({ as: "p" })`
  ${(p) => p.theme.typography.small};
  color: ${(p) => p.theme.colors["grey-dark"]};
`;

export const ListItem = styled(BaseText).attrs({ as: "li" })`
  ${(p) => p.theme.typography.body}
  padding-bottom: ${(p) => p.theme.spacing.default};
`;
