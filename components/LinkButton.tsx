import React from "react";
import NextLink from "next/link";
import styled from "styled-components";

import { vibrantColors } from "../styles/utils";
import { ButtonSoft } from "../styles";

const LinkButton = ({ label, href }) => {
  const link =
    href.linktype === "url"
      ? `${href.url}?utm_source=jayna-site&utm_medium=button-link`
      : href?.story.full_slug + (href.anchor ? `#${href.anchor}` : "");

  return (
    <NextLink href={link}>
      <LinkStyle>{label}</LinkStyle>
    </NextLink>
  );
};

const LinkStyle = styled(ButtonSoft).attrs({ as: "div" })`
  display: flex;
  align-items: center;
  width: auto;
  padding: ${(p) => p.theme.spacing.default} ${(p) => p.theme.spacing.large};
  ${vibrantColors("purple", "red")}
  font-size: 16px;
`;

export default LinkButton;
